from typing import Optional
from uuid import UUID

from sqlalchemy.future import select

from app.models.user import User
from app.api.v1.schemas.user import UserCreate, UserUpdate
from app.core.database import Database
from app.repositories.abstract.base import BaseRepository


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
