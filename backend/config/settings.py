from typing import List

from pydantic import DirectoryPath, FilePath, HttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict
from toml import load


class Config(BaseSettings):
    APP_TITLE: str
    APP_VERSION: str
    APP_DESCRIPTION: str

    MEDIA_DIRECTORY_PATH: str
    MEDIA_ALLOWED_EXTENSIONS: List[str]

    # CELERY_CONFIG_PATH: FilePath

    LOG_DIRECTORY_PATH: DirectoryPath
    LOG_LEVEL: str

    ENVIRONMENT: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="allow"
    )

    def __init__(self):
        super().__init__()
        # self.CELERY_CONFIG = load(self.CELERY_CONFIG_PATH)


config = Config()


class Secrets(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASS: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int
    POSTGRES_DB: str

    # REDIS_HOST: str
    # REDIS_PORT: int
    # REDIS_PASS: str
    
    # RABBITMQ_USER: str
    # RABBITMQ_PASS: str
    # RABBITMQ_HOST: str
    # RABBITMQ_PORT: int

    JWT_PRIVATE_KEY_PATH: FilePath
    JWT_PUBLIC_KEY_PATH: FilePath
    JWT_PASS_PHRASE: str
    JWT_ALGORITHM: str
    JWT_ACCESS_TOKEN_TTL: int
    JWT_REFRESH_TOKEN_TTL: int
    
    # SMTP_HOST: str
    # SMTP_PORT: int
    # SMTP_USER: str
    # SMTP_PASS: str
    # SMTP_SECRET: str

    # OAUTH_GOOGLE_CLIENT_ID: str
    # OAUTH_GOOGLE_CLIENT_SECRET: str
    # OAUTH_GOOGLE_REDIRECT_URI: HttpUrl
    
    FRONTEND_URL: HttpUrl
    BACKEND_URL: HttpUrl

    model_config = SettingsConfigDict(
        env_file=f".env.{config.ENVIRONMENT.lower()}",
        extra="allow"
    )

    def __init__(self):
        super().__init__()
        with open(self.JWT_PRIVATE_KEY_PATH) as f:
            self.JWT_PRIVATE_KEY = f.read()
        with open(self.JWT_PUBLIC_KEY_PATH) as f:
            self.JWT_PUBLIC_KEY = f.read()
        self.POSTGRES_URI = "postgresql+asyncpg://{}:{}@{}:{}/{}".format(
            self.POSTGRES_USER,
            self.POSTGRES_PASS,
            self.POSTGRES_HOST,
            self.POSTGRES_PORT,
            self.POSTGRES_DB
        )
        # self.REDIS_URI = "redis://:{}@{}:{}/0".format(
        #     self.REDIS_PASS,
        #     self.REDIS_HOST,
        #     self.REDIS_PORT
        # )
        # self.RABBITMQ_URI = "amqp://{}:{}@{}:{}/".format(
        #     self.RABBITMQ_USER,
        #     self.RABBITMQ_PASS,
        #     self.RABBITMQ_HOST,
        #     self.RABBITMQ_PORT
        # )

secrets = Secrets()


class Settings:
    config: Config = config
    secrets: Secrets = secrets
