from typing import Optional, Union
from uuid import UUID

from sqlalchemy.future import select
from wireup import service

from app.models.user import User
from app.api.v1.schemas.user import UserCreate, UserUpdate
from app.core.database import Database
from app.repositories.abstract.base import BaseRepository


@service
class UserRepository(BaseRepository[User, UserCreate, UserUpdate]):
    def __init__(self, database: Database):
        super().__init__(database, User)  # type: ignore

    async def get_user_by_email(self, email: str) -> Optional[User]:
        async with self.produce_session() as session:
            stmt = select(User).where(User.email == email)  # type: ignore
            result = await session.execute(stmt)
            return result.scalar_one_or_none()

    async def get_user_by_device_id(self, device_id: UUID) -> Optional[User]:
        async with self.produce_session() as session:
            stmt = select(User).where(User.devices.any(id=device_id))
            result = await session.execute(stmt)
            return result.scalar_one_or_none()

    async def mark_user_as_verified(self, user_id: UUID) -> Optional[Union[User, bool]]:
        async with self.produce_session() as session:
            stmt = select(User).where(User.id == user_id)  # type: ignore
            result = await session.execute(stmt)
            user = result.scalar_one_or_none()

            if not user:
                return False

            user.is_verified = True
            await session.commit()
            return user
