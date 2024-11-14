from typing import Annotated

from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials
from wireup import container, Inject

from app.api.v1.schemas.user import UserRead
from app.api.v1.schemas.token import TokenData
from app.core.security import JWTHeaderBearer, JWTCookieBearer
from app.services.token import TokenService


@container.autowire
async def get_current_user_from_header(
        token: Annotated[HTTPAuthorizationCredentials, Depends(JWTHeaderBearer())],
        token_service: Annotated[TokenService, Inject()]
) -> UserRead:
    return TokenData.model_validate(token_service.verify_access_token(token.credentials))  # type: ignore


@container.autowire
async def get_current_user_from_cookie(
        token: Annotated[HTTPAuthorizationCredentials, Depends(JWTCookieBearer())],
        token_service: Annotated[TokenService, Inject()]
) -> UserRead:
    return TokenData.model_validate(await token_service.verify_refresh_token(token.credentials))  # type: ignore
