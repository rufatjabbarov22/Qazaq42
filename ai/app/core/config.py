from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str
    host: str
    port: int
    allowed_origins: list

    class Config:
        env_file = ".env"


settings = Settings()
