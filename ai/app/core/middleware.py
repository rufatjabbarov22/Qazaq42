from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings  # type: ignore


def setup_middlewares(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,  # type: ignore
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
