from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str
    HOST: str
    PORT: int
    ALLOWED_ORIGINS: list
    PROJECT_PATH: str

    class Config:
        env_file = ".env"


settings = Settings()
