from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.routes.predict import router as predict_router  # type: ignore
from app.core.config import settings  # type: ignore
from services.logging import logger  # type: ignore


app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,  # type: ignore
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, prefix="/api/v1")


@app.get("/")
async def read_root():
    return {"message": "Welcome to the Crop Prediction API!"}


@app.on_event("startup")
async def startup_event():
    logger.info("Application startup")


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutdown")
