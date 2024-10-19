from typing import List

from pydantic import DirectoryPath, FilePath, HttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    APP_TITLE: str
    APP_VERSION: str
    APP_DESCRIPTION: str

    MEDIA_DIRECTORY_PATH: str
    MEDIA_ALLOWED_EXTENSIONS: List[str]

    LOG_DIRECTORY_PATH: DirectoryPath
    LOG_LEVEL: str

    ENVIRONMENT: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="allow"
    )

    def __init__(self):
        super().__init__()


config = Config()


class Secrets(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASS: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int
    POSTGRES_DB: str

    JWT_PRIVATE_KEY_PATH: FilePath
    JWT_PUBLIC_KEY_PATH: FilePath
    JWT_PASS_PHRASE: str
    JWT_ALGORITHM: str
    JWT_ACCESS_TOKEN_TTL: int
    JWT_REFRESH_TOKEN_TTL: int
    
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


secrets = Secrets()


class Settings:
    config: Config = config
    secrets: Secrets = secrets
