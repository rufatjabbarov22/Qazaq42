from pydantic import EmailStr
from typing import Dict, List
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError

from app.api.v1.schemas.user import UserRead, UserCreate, UserUpdate
from app.repositories.user import UserRepository
from app.services.abstract.base import BaseService


class UserService(BaseService[UserRepository]):
    def __init__(self):
        super().__init__(UserRepository)  # type: ignore

    async def create_user(self, user_data: UserCreate) -> UserRead:
        try:
            created_user = await self.repository.create(**user_data.model_dump())
            return UserRead.model_validate(created_user)

        except IntegrityError as e:
            if "unique constraint" in str(e.orig):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="A user with this email already exists."
                )
            raise

    async def get_user_by_id(self, user_id: UUID) -> UserRead:
        user = await self.repository.get(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No user found with ID {user_id}"
            )
        return UserRead.model_validate(user)

    async def get_user_by_email(self, email: EmailStr) -> UserRead:
        user = await self.repository.get_user_by_email(email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No user found with email {email}"
            )
        return UserRead.model_validate(user)

    async def get_all_users(self) -> Dict[str, List[UserRead]]:
        users = await self.repository.get_all()
        return {"users": [UserRead.model_validate(user) for user in users]}

    async def update_user(self, user_data: UserUpdate, user_id: UUID) -> UserRead:
        updated_user = await self.repository.update(user_id, **user_data.model_dump())
        if not updated_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No user found with ID {user_id}"
            )
        return UserRead.model_validate(updated_user)

    async def delete_user(self, user_id: UUID) -> Dict:
        deleted_user = await self.repository.delete(user_id)
        if not deleted_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No user found with ID {user_id}"
            )
        return {"message": "User deleted successfully", "user": deleted_user}
