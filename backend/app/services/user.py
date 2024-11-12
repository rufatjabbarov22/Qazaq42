from pydantic import EmailStr
from typing import Dict, List
from uuid import UUID

from wireup import service

from app.api.v1.schemas.user import UserCreate, UserRead, UserUpdate
from app.common.exceptions.user import UserAlreadyExists, UserCreationFailed, UserNotFound
from app.core.security import get_password_hash
from app.repositories.user import UserRepository
from app.services.abstract.base import BaseService


@service
class UserService(BaseService[UserRepository]):
    def __init__(self, user_repository: UserRepository):
        super().__init__(user_repository)

    async def create_user(self, user_data: UserCreate) -> UserRead:
        try:
            user_data.password = get_password_hash(user_data.password)
            created_user = await self.repository.create(user_data)
            return UserRead.model_validate(created_user)

        except Exception as e:
            if "unique constraint" in str(e):
                raise UserAlreadyExists(email=user_data.email)
            raise UserCreationFailed()

    async def get_user_by_id(self, user_id: UUID) -> UserRead:
        user = await self.repository.get(user_id)
        if not user:
            raise UserNotFound()
        return UserRead.model_validate(user)

    async def get_user_by_email(self, email: EmailStr) -> UserRead:
        user = await self.repository.get_user_by_email(email)
        if not user:
            raise UserNotFound()
        return UserRead.model_validate(user)

    async def get_user_by_device_id(self, device_id: UUID) -> UserRead:
        user = await self.repository.get_user_by_device_id(device_id)
        if not user:
            raise UserNotFound()
        return UserRead.model_validate(user)

    async def get_all_users(self) -> List[UserRead]:
        users = await self.repository.get_all()
        return [UserRead.model_validate(user) for user in users]

    async def update_user(self, user_data: UserUpdate, user_id: UUID) -> UserRead:
        if user_data.password:
            user_data.password = get_password_hash(user_data.password)
        updated_user = await self.repository.update(user_id, user_data)
        if not updated_user:
            raise UserNotFound()
        return UserRead.model_validate(updated_user)

    async def delete_user(self, user_id: UUID) -> Dict:
        deleted_user = await self.repository.delete(user_id)
        if not deleted_user:
            raise UserNotFound()
        return {"message": "User deleted successfully", "user": deleted_user}
