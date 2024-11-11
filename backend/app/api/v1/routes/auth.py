from typing import Annotated

from fastapi import APIRouter, status
from wireup import container, Inject

from app.api.v1.schemas.user import UserCreate, UserRead
from app.services.user import UserService


router = APIRouter()


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
@container.autowire
async def create_user(user_data: UserCreate, user_service: Annotated[UserService, Inject()]):
    return await user_service.create_user(user_data)
