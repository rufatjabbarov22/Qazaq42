from typing import List

from pydantic import DirectoryPath
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
