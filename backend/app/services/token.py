from binascii import hexlify
from datetime import datetime, timedelta
from os import urandom
from typing import Dict
from uuid import UUID

from jwt import encode, decode, ExpiredSignatureError, InvalidTokenError
from wireup import container, service

from app.common.exceptions.jwt import ExpiredTokenException, InvalidTokenException
from app.core.caching import Caching
from app.models.user import User
from config.settings import Settings


@service
class TokenService:
    def __init__(self, settings: Settings):
        self.private_key = settings.secrets.JWT_PRIVATE_KEY
        self.public_key = settings.secrets.JWT_PUBLIC_KEY
        self.algorithm = settings.secrets.JWT_ALGORITHM
        self.access_token_ttl = settings.secrets.JWT_ACCESS_TOKEN_TTL
        self.refresh_token_ttl = settings.secrets.JWT_REFRESH_TOKEN_TTL

    def generate_access_token(self, user: User) -> str:
        sub = str(user.id)
        role = "admin" if user.is_admin else "user"
        is_verified = user.is_verified

        payload = {
            "sub": sub,
            "role": role,
            "is_verified": is_verified,
            "email": user.email,
            "exp": datetime.now() + timedelta(seconds=self.access_token_ttl),
        }

        token = encode(payload, self.private_key, algorithm=self.algorithm)
        return token

    def verify_access_token(self, token) -> Dict:
        try:
            data = decode(token, self.public_key, algorithms=[self.algorithm], leeway=15)
        except ExpiredSignatureError:
            raise ExpiredTokenException()
        except InvalidTokenError:
            raise InvalidTokenException()

        return {
            "sub": UUID(data["sub"]),
            "is_admin": data["role"],
            "is_verified": data["is_verified"],
            "email": data["email"]
        }

    @container.autowire
    async def generate_refresh_token(self, user: User, caching: Caching) -> str:
        jti = hexlify(urandom(32)).decode()
        sub = str(user.id)
        role = "admin" if user.is_admin else "user"

        payload = {
            "sub": sub,
            "role": role,
            "email": user.email,
            "is_verified": user.is_verified,
            "jti": jti,
            "exp": datetime.now() + timedelta(seconds=self.refresh_token_ttl),
        }
        token = encode(payload, self.private_key, algorithm=self.algorithm)

        await caching.set(jti, sub, ex=self.refresh_token_ttl * 24 * 60 * 60 + 15)
        return token

    @container.autowire
    async def verify_refresh_token(self, token: str, caching: Caching) -> Dict:
        try:
            data = decode(token, self.public_key, algorithms=[self.algorithm], leeway=15)
        except ExpiredSignatureError:
            raise ExpiredTokenException()
        except InvalidTokenError:
            raise InvalidTokenException()

        user_id = await caching.get(data["jti"])
        if user_id and user_id == data["sub"]:
            return {
                "sub": UUID(data["sub"]),
                "is_admin": data["role"],
                "is_verified": data["is_verified"],
                "email": data["email"]
            }
        raise InvalidTokenException()

    @container.autowire
    async def revoke_refresh_token(self, token: str, caching: Caching) -> None:
        try:
            data = decode(token, self.public_key, algorithms=[self.algorithm], leeway=15)
        except ExpiredSignatureError:
            raise ExpiredTokenException()
        except InvalidTokenError:
            raise InvalidTokenException()

        await caching.delete(data["jti"])
