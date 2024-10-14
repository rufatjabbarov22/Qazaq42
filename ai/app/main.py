from fastapi import FastAPI
from app.api.v1.routes.predict import router as predict_router  # type: ignore

app = FastAPI()

app.include_router(predict_router, prefix="/api/v1")
