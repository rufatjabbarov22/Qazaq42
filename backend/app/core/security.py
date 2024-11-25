from fastapi import Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, APIKeyCookie

from app.common.exceptions.user import UserNotAuthenticated


class JWTHeaderBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request) -> HTTPAuthorizationCredentials | None:
        authorization = request.headers.get("Authorization")
        if not authorization:
            if self.auto_error:
                raise UserNotAuthenticated()
            else:
                return None

        scheme, _, credentials = authorization.partition(" ")
        if not (authorization and scheme and credentials):
            if self.auto_error:
                raise UserNotAuthenticated()
            else:
                return None

        if scheme.lower() != "bearer":
            if self.auto_error:
                raise UserNotAuthenticated()
            else:
                return None

        return HTTPAuthorizationCredentials(scheme=scheme, credentials=credentials)


class JWTCookieBearer(APIKeyCookie):
    def __init__(self, auto_error: bool = True):
        super().__init__(name="refresh_token", auto_error=auto_error)

    async def __call__(self, request: Request) -> HTTPAuthorizationCredentials:
        return HTTPAuthorizationCredentials(scheme="bearer", credentials=await super().__call__(request))
