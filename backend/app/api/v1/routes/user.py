from typing import Annotated, Dict, List
from uuid import UUID

from fastapi import APIRouter, status
from wireup import container, Inject

from app.api.v1.schemas.user import UserCreate, UserRead, UserUpdate
from app.services.user import UserService


router = APIRouter()


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
@container.autowire
async def create_user(user_data: UserCreate, user_service: Annotated[UserService, Inject()]):
    return await user_service.create_user(user_data)


@router.get("/", response_model=List[UserRead], status_code=status.HTTP_200_OK)
@container.autowire
async def get_users(user_service: Annotated[UserService, Inject()]):
    return await user_service.get_all_users()


@router.get("/{user_id}", response_model=UserRead, status_code=status.HTTP_200_OK)
@container.autowire
async def get_user(user_id: UUID, user_service: Annotated[UserService, Inject()]):
    return await user_service.get_user_by_id(user_id)


@router.get("/email/{email}", response_model=UserRead, status_code=status.HTTP_200_OK)
@container.autowire
async def get_user_by_email(email: str, user_service: Annotated[UserService, Inject()]):
    return await user_service.get_user_by_email(email)


@router.put("/{user_id}", response_model=UserRead, status_code=status.HTTP_200_OK)
@container.autowire
async def update_user(user_id: UUID, user_data: UserUpdate, user_service: Annotated[UserService, Inject()]):
    return await user_service.update_user(user_data, user_id)


@router.delete("/{user_id}", response_model=Dict, status_code=status.HTTP_200_OK)
@container.autowire
async def delete_user(user_id: UUID, user_service: Annotated[UserService, Inject()]):
    return await user_service.delete_user(user_id)
