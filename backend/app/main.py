from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.api import router
from app.core.container import wire
from config.settings import config


wire()

app = FastAPI()
app.mount("/uploads", StaticFiles(directory=config.MEDIA_DIRECTORY_PATH), name="uploads")

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
