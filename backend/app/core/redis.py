import redis

from config.settings import secrets


redis_cli = redis.Redis(
    host=secrets.REDIS_HOST,
    port=secrets.REDIS_PORT,
    db=secrets.REDIS_DB,
    password=secrets.REDIS_PASSWORD,
    decode_responses=True,
)
