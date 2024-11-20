from pydantic import FilePath, DirectoryPath
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    APP_TITLE: str
    APP_VERSION: str
    APP_DESCRIPTION: str

    PASSWORD_RESET_TEMPLATE_PATH: FilePath
    PASSWORD_RESET_EXPIRATION: int

    EMAIL_VERIFICATION_TEMPLATE_PATH: FilePath
    EMAIL_VERIFICATION_EXPIRATION: int

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
