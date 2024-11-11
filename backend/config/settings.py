from pydantic import FilePath, HttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict

from config.config import Config, config


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
    AI_URL: HttpUrl
    AI_PREDICT_URL: str

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
