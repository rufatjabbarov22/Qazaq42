import logging

from app.common.exceptions.caching import CacheException


def excache(func):
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except Exception as e:
            logging.error(f"Error in {func.__name__}: {e}")
            raise CacheException()

    return wrapper
