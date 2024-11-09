from typing import Dict, List
from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.api.v1.schemas.user import UserCreate, UserRead, UserUpdate
from app.services.user import UserService


router = APIRouter()


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(user_data: UserCreate, user_service: UserService = Depends()):
    return await user_service.create_user(user_data)


@router.get("/", response_model=List[UserRead], status_code=status.HTTP_200_OK)
async def get_users(user_service: UserService = Depends()):
    return await user_service.get_all_users()


@router.get("/{user_id}", response_model=UserRead, status_code=status.HTTP_200_OK)
async def get_user(user_id: UUID, user_service: UserService = Depends()):
    return await user_service.get_user_by_id(user_id)


@router.get("/email/{email}", response_model=UserRead, status_code=status.HTTP_200_OK)
async def get_user_by_email(email: str, user_service: UserService = Depends()):
    return await user_service.get_user_by_email(email)


@router.put("/{user_id}", response_model=UserRead, status_code=status.HTTP_200_OK)
async def update_user(user_id: UUID, user_data: UserUpdate, user_service: UserService = Depends()):
    return await user_service.update_user(user_data, user_id)


@router.delete("/{user_id}", response_model=Dict, status_code=status.HTTP_200_OK)
async def delete_user(user_id: UUID, user_service: UserService = Depends()):
    return await user_service.delete_user(user_id)
