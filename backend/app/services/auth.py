import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Dict

from wireup import service, ServiceLifetime

from app.api.v1.schemas.auth import ForgotPasswordSchema, ResetPasswordSchema
from app.api.v1.schemas.user import UserUpdate
from app.api.v1.schemas.user import UserRead
from app.api.v1.schemas.user import UserCreate, UserLogin
from app.common.exceptions.user import (
    UserAlreadyVerified,
    UserNotAuthenticated,
    UserNotFound,
    UserNotVerified,
    UserVerificationFailed
)
from app.core.caching import Caching
from app.utils.hash import hash_password, check_password
from app.models.user import User
from app.repositories.user import UserRepository
from app.services.abstract.base import BaseService
from app.services.user import UserService
from app.utils.helpers.verification import generate_otp
from config.settings import Settings


@service(lifetime=ServiceLifetime.TRANSIENT)
class AuthService(BaseService[UserRepository]):
    def __init__(
            self,
            caching: Caching,
            user_repository: UserRepository,
            user_service: UserService,
            settings: Settings
    ):
        super().__init__(user_repository)
        self.caching = caching
        self.user_service = user_service
        self.settings = settings

    async def sign_up(self, schema: UserCreate) -> UserRead:
        user = await self.user_service.create(schema)

        verification_code = generate_otp()
        await self.caching.set(
            f'verification_code_{user.email}',
            verification_code,
            ex=self.settings.config.EMAIL_VERIFICATION_EXPIRATION
        )

        self._send_verification_email(user.email, verification_code)

        return user

    async def resend_verification(self, email: str) -> Dict:
        user = await self.repository.get_user_by_email(email)
        if not user:
            raise UserNotFound()

        if user.is_verified:
            raise UserAlreadyVerified()

        verification_code = generate_otp()
        await self.caching.set(
            f'verification_code_{email}',
            verification_code,
            ex=self.settings.config.EMAIL_VERIFICATION_EXPIRATION
        )

        self._send_verification_email(email, verification_code)

        return {"message": "Verification code sent successfully"}

    async def verify(self, email: str, verification_code: int) -> UserRead:
        cached_code = await self.caching.get(f'verification_code_{email}')

        if not cached_code or cached_code != str(verification_code):
            raise UserVerificationFailed()

        user = await self.repository.get_user_by_email(email)
        if not user:
            raise UserNotFound()

        user = await self.repository.mark_user_as_verified(user.id)
        await self.caching.delete(f'verification_code_{email}')

        return UserRead.model_validate(user)

    async def sign_in(self, schema: UserLogin) -> User:
        user = await self.repository.get_user_by_email(schema.email)
        if not user:
            raise UserNotFound()

        if not check_password(schema.password, user.password):
            raise UserNotAuthenticated()

        if not user.is_verified:
            raise UserNotVerified()

        return user

    async def forgot_password(self, schema: ForgotPasswordSchema) -> Dict:
        email = schema.email
        user = await self.repository.get_user_by_email(email)
        if not user:
            raise UserNotFound()

        reset_token = generate_otp()
        await self.caching.set(
            f'password_reset_token_{email}',
            reset_token,
            ex=self.settings.config.PASSWORD_RESET_EXPIRATION
        )

        self._send_password_reset_email(email, reset_token)

        return {"message": "Password reset email sent successfully",
                "email": email
                }

    async def reset_password(self, schema: ResetPasswordSchema) -> Dict:
        email = schema.email
        reset_token = schema.reset_token
        new_password = schema.new_password
        await self.verify_password_reset_token(email, reset_token)

        user = await self.repository.get_user_by_email(email)
        if not user:
            raise UserNotFound()

        user_update = UserUpdate(password=new_password)
        user_update.password = hash_password(new_password)

        await self.repository.update(user.id, user_update)
        await self.caching.delete(f'password_reset_token_{email}')

        return {"message": "Password reset successfully"}

    async def verify_password_reset_token(self, email: str, reset_token: int) -> bool:
        cached_token = await self.caching.get(f'password_reset_token_{email}')
        reset_token = str(reset_token)

        if not cached_token or cached_token != reset_token:
            raise UserVerificationFailed()

        return True

    def _send_verification_email(self, email: str, verification_code: str):
        template = self._load_email_verification_template()

        content = template.replace('{{ verification_code }}', verification_code)

        msg = MIMEMultipart('alternative')
        msg['From'] = self.settings.secrets.SMTP_MAIL
        msg['To'] = email
        msg['Subject'] = 'Your Verification Code'

        msg.attach(MIMEText(content, 'html'))

        server = smtplib.SMTP(self.settings.secrets.SMTP_HOST, 587)
        try:
            server.starttls()
            server.login(self.settings.secrets.SMTP_MAIL, self.settings.secrets.SMTP_PASSWORD)
            server.send_message(msg)
        except Exception as e:
            print(f"Failed to send verification email: {e}")
        finally:
            server.quit()

    def _send_password_reset_email(self, email: str, reset_token: str):
        template = self._load_password_reset_template()

        content = template.replace('{{ verification_code }}', reset_token)

        msg = MIMEMultipart('alternative')
        msg['From'] = self.settings.secrets.SMTP_MAIL
        msg['To'] = email
        msg['Subject'] = 'Password Reset Request'

        msg.attach(MIMEText(content, 'html'))

        server = smtplib.SMTP(self.settings.secrets.SMTP_HOST, 587)
        try:
            server.starttls()
            server.login(self.settings.secrets.SMTP_MAIL, self.settings.secrets.SMTP_PASSWORD)
            server.send_message(msg)
        except Exception as e:
            print(f"Failed to send password reset email: {e}")
        finally:
            server.quit()

    def _load_email_verification_template(self):
        with open(self.settings.config.EMAIL_VERIFICATION_TEMPLATE_PATH, 'r') as file:
            template = file.read()
        return template

    def _load_password_reset_template(self):
        with open(self.settings.config.PASSWORD_RESET_TEMPLATE_PATH, 'r') as file:
            template = file.read()
        return template
