from typing import Iterable
from uuid import UUID

from sqlmodel import select

from app.core.database import Database
from app.models.abstract.base import Base
from app.repositories.abstract.repository import (
    IRepository,
    M, C, U
)


class BaseRepository(IRepository[M, C, U]):
    def __init__(
        self,
        database: Database,
        model: M,
    ) -> None:
        self.produce_session = database.produce_session
        self.model = model

    async def create(self, schema: C) -> M:
        async with self.produce_session() as session:
            obj = self.model.model_validate(schema, from_attributes=True)
            session.add(obj)
            await session.commit()
            await session.refresh(obj)
            return obj

    async def get(self, id: UUID) -> M:
        async with self.produce_session() as session:

            stmt = select(self.model).where(self.model.id == id)
            result = await session.execute(stmt)
            obj = result.scalars().unique().one_or_none()

            return obj

    async def update(self, id: UUID, schema: U) -> M:
        async with self.produce_session() as session:

            stmt = select(self.model).where(self.model.id == id)
            result = await session.execute(stmt)
            obj: Base = result.scalars().unique().one_or_none()

            if not obj:
                return None

            obj.model_update(schema)

            await session.commit()
            await session.refresh(obj)

            return obj

    async def delete(self, id: UUID) -> None:
        async with self.produce_session() as session:

            stmt = select(self.model).where(self.model.id == id)
            result = await session.execute(stmt)
            obj = result.scalars().unique().one_or_none()

            await session.delete(obj)
            await session.commit()

    async def get_all(self) -> Iterable[M]:
        async with self.produce_session() as session:

            stmt = select(self.model)
            result = await session.execute(stmt)
            objs = result.scalars().unique().all()

            return objs
