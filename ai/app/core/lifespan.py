from contextlib import asynccontextmanager
from fastapi import FastAPI
from services.logging import logger  # type: ignore


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Application startup")
    yield
    logger.info("Application shutdown")
