import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings  # type: ignore

logger = logging.getLogger("ai_service")


def setup_middlewares(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,  # type: ignore
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
