from fastapi import FastAPI
from api.v1.routes.predict import router as predict_router

app = FastAPI()

app.include_router(predict_router, prefix="/api/v1")
