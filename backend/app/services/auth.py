import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from wireup import service, ServiceLifetime

from app.api.v1.schemas.user import UserRead
from app.api.v1.schemas.user import UserCreate, UserLogin
from app.common.exceptions.user import (
    UserNotAuthenticated,
    UserNotFound,
    UserNotVerified,
    UserVerificationFailed
)
from app.core.caching import Caching
from app.core.security import verify_password
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

    async def register(self, schema: UserCreate) -> UserRead:
        user = await self.user_service.create_user(schema)

        verification_code = generate_otp()
        await self.caching.set(
            f'verification_code_{user.email}',
            verification_code,
            ex=self.settings.config.EMAIL_VERIFICATION_EXPIRATION
        )

        self._send_verification_email(user.email, verification_code)

        return user

    async def verify(self, email: str, verification_code: int) -> User:
        cached_code = await self.caching.get(f'verification_code_{email}')

        if not cached_code or cached_code != str(verification_code):
            raise UserVerificationFailed()

        user = await self.repository.get_user_by_email(email)
        if not user:
            raise UserNotFound()

        await self.repository.mark_user_as_verified(user.id)
        await self.caching.delete(f'verification_code_{email}')

        return user

    async def login(self, schema: UserLogin) -> User:
        user = await self.repository.get_user_by_email(schema.email)
        if not user:
            raise UserNotFound()

        if not verify_password(schema.password, user.password):
            raise UserNotAuthenticated()

        if not user.is_verified:
            raise UserNotVerified()

        return user

    def _send_verification_email(self, email: str, verification_code: int):
        template = self._load_template()

        content = template.replace('{{ verification_code }}', str(verification_code))

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

    def _load_template(self):
        with open(self.settings.config.EMAIL_VERIFICATION_TEMPLATE_PATH, 'r') as file:
            template = file.read()
        return template
