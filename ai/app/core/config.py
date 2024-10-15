from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str
    host: str
    port: int
    allowed_origins: list
    project_path: str

    class Config:
        env_file = ".env"


settings = Settings()
