from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Iterable
from uuid import UUID

from pydantic import BaseModel

from app.models.abstract.base import Base


M = TypeVar('M', bound=Base)
C = TypeVar('C', bound=BaseModel)
U = TypeVar('U', bound=BaseModel)


class IRepository(ABC, Generic[M, C, U]):
    @abstractmethod
    async def create(self, model: C) -> M:
        ...

    @abstractmethod
    async def get(self, id: UUID) -> M:
        ...

    @abstractmethod
    async def update(self, id: UUID, model: U) -> M:
        ...

    @abstractmethod
    async def delete(self, id: UUID) -> None:
        ...

    @abstractmethod
    async def get_all(self) -> Iterable[M]:
        ...
