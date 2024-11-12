from typing import Any, Dict

from redis.asyncio import Redis
from wireup import service

from app.utils.decorators.excache import excache
from config.settings import Settings


@service
class Caching:
    def __init__(self, settings: Settings):
        self.redis = Redis(
            host=settings.secrets.REDIS_HOST,
            port=settings.secrets.REDIS_PORT,
            password=settings.secrets.REDIS_PASS
        )

    @excache
    async def set(self, key: str, value: str, ex: int | None = None) -> None:
        await self.redis.set(key, value, ex=ex)

    @excache
    async def get(self, key: str) -> str:
        data: bytes | None = await self.redis.get(key)
        if data is None:
            return None
        return data.decode()

    @excache
    async def delete(self, key: str) -> None:
        await self.redis.delete(key)

    @excache
    async def exists(self, key: str) -> bool:
        return await self.redis.exists(key)

    @excache
    async def expire(self, key: str, seconds: int) -> None:
        await self.redis.expire(key, seconds)

    @excache
    async def hset(self, key: str, value: Dict[str, Any]) -> None:
        await self.redis.hset(name=key, mapping=value)

    @excache
    async def hget(self, key: str, field: str) -> Any:
        return await self.redis.hget(key, field)
