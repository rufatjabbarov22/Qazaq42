from typing import Annotated, Dict

from fastapi import APIRouter, Request, status
from fastapi.params import Depends
from fastapi.responses import JSONResponse
from wireup import container, Inject

from app.api.v1.schemas.auth import ForgotPasswordSchema, ResetPasswordSchema
from app.api.v1.schemas.token import Token, TokenData
from app.api.v1.schemas.user import UserCreate, UserLogin, UserRead
from app.common.exceptions.user import UserNotAuthenticated
from app.core.dependencies import get_current_user_from_cookie
from app.services.auth import AuthService
from app.services.token import TokenService
from config.settings import Settings


router = APIRouter()


@router.post("/sign-up", response_model=UserRead, status_code=status.HTTP_201_CREATED)
@container.autowire
async def register(
        user_data: UserCreate,
        auth_service: Annotated[AuthService, Inject()]
):
    return await auth_service.sign_up(user_data)


@router.post("/verify", response_model=UserRead, status_code=status.HTTP_200_OK)
@container.autowire
async def verify(
        user_mail: str,
        otp_code: int,
        auth_service: Annotated[AuthService, Inject()]
):
    return await auth_service.verify(user_mail, otp_code)


@router.post("/resend-verification", response_model=Dict, status_code=status.HTTP_200_OK)
@container.autowire
async def resend_verification(
        user_mail: str,
        auth_service: Annotated[AuthService, Inject()]
):
    return await auth_service.resend_verification(user_mail)


@router.post("/sign-in", response_model=Token, status_code=status.HTTP_200_OK)
@container.autowire
async def login(
        user_credentials: UserLogin,
        auth_service: Annotated[AuthService, Inject()],
        token_service: Annotated[TokenService, Inject()],
        settings: Annotated[Settings, Inject()]
        ):
    user = await auth_service.sign_in(user_credentials)
    access_token = token_service.generate_access_token(user)
    refresh_token = await token_service.generate_refresh_token(user)
    response = JSONResponse(
        Token(
            access_token=access_token,
            token_type="bearer",
            user_id=str(user.id)
        ).model_dump()
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=settings.secrets.JWT_REFRESH_TOKEN_TTL * 24 * 60 * 60,
        samesite="strict",
        path="/api/v1/auth"
    )
    return response


@router.post("/forgot-password", response_model=Dict, status_code=status.HTTP_200_OK)
@container.autowire
async def forgot_password(
    schema: ForgotPasswordSchema,
    auth_service: Annotated[AuthService, Inject()]
):
    return await auth_service.forgot_password(schema)


@router.post("/reset-password", status_code=status.HTTP_200_OK)
@container.autowire
async def reset_password(
    schema: ResetPasswordSchema,
    auth_service: Annotated[AuthService, Inject()]
):
    return await auth_service.reset_password(schema)


@router.post("/token", response_model=Token)
@container.autowire
async def refresh_access_token(
        user: Annotated[TokenData, Depends(get_current_user_from_cookie)],
        token_service: Annotated[TokenService, Inject()]
):
    if not user:
        raise UserNotAuthenticated()
    access_token = token_service.generate_access_token(user)  # type: ignore
    return Token(
        access_token=access_token,
        token_type="bearer",
        user_id=str(user.id)
    )


@router.post("/token/refresh", response_model=Token)
@container.autowire
async def refresh_refresh_token(
        user: Annotated[TokenData, Depends(get_current_user_from_cookie)],
        token_service: Annotated[TokenService, Inject()],
        settings: Annotated[Settings, Inject()]
):
    if not user:
        raise UserNotAuthenticated()
    access_token = token_service.generate_access_token(user)  # type: ignore
    refresh_token = await token_service.generate_refresh_token(user)
    response = JSONResponse(
        Token(
            access_token=access_token,
            token_type="bearer",
            user_id=str(user.id)
        ).model_dump()
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=settings.secrets.JWT_REFRESH_TOKEN_TTL * 24 * 60 * 60,
        samesite="strict",
        path="/api/v1/auth"
    )
    return response


@router.post("/sign-out", status_code=status.HTTP_200_OK)
@container.autowire
async def logout(
        request: Request,
        token: Annotated[TokenData, Depends(get_current_user_from_cookie)],
        token_service: Annotated[TokenService, Inject()]
):
    if not token:
        raise UserNotAuthenticated()

    await token_service.revoke_refresh_token(request.cookies.get("refresh_token"))

    response = JSONResponse({"message": "Token revoked"})

    response.delete_cookie(
        key="refresh_token",
        httponly=True,
        samesite="strict",
        path="/api/v1/auth"
    )

    return response
