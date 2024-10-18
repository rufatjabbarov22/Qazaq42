from sqlalchemy.future import select
from typing import Optional, List
from uuid import UUID

from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.database import Database
from app.repositories.abstract.base import BaseRepository


class UserRepository(BaseRepository[User, UserCreate, UserUpdate]):
    def __init__(self, database: Database):
        super().__init__(database, User)

    async def get_user_by_id(self, id: UUID) -> Optional[User]:
        async with self.produce_session() as session:
            stmt = select(User).where(User.id == id)
            result = await session.execute(stmt)
            return result.scalar_one_or_none()

    async def get_all_users(self) -> List[User]:
        async with self.produce_session() as session:
            stmt = select(User)
            result = await session.execute(stmt)
            return result.scalars().all()

    async def create_user(self, user_create: UserCreate) -> User:
        async with self.produce_session() as session:
            user = User(**user_create.dict())
            session.add(user)
            await session.commit()
            await session.refresh(user)
            return user

    async def update_user(self, id: UUID, user_update: UserUpdate) -> Optional[User]:
        async with self.produce_session() as session:
            user = await self.get_user_by_id(id)
            if user:
                for key, value in user_update.dict(exclude_unset=True).items():
                    setattr(user, key, value)
                await session.commit()
                await session.refresh(user)
                return user
            return None

    async def delete_user(self, id: UUID) -> bool:
        async with self.produce_session() as session:
            user = await self.get_user_by_id(id)
            if user:
                await session.delete(user)
                await session.commit()
                return True
            return False
