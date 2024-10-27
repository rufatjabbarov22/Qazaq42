from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api import router
from app.core.container import wire
from app.core.middleware import setup_middlewares
from config.settings import config


wire()

app = FastAPI()

setup_middlewares(app)
app.mount("/uploads", StaticFiles(directory=config.MEDIA_DIRECTORY_PATH), name="uploads")

app.include_router(router)
