from typing import Generic, TypeVar

from app.repositories.abstract.base import BaseRepository


R = TypeVar("R", bound=BaseRepository)


class BaseService(Generic[R]):
    def __init__(self, repository: R):
        self.repository = repository
