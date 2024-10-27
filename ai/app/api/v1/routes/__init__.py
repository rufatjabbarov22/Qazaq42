from fastapi import APIRouter

from app.api.v1.routes.predict import router as predict_router  # type: ignore


router = APIRouter()

router.include_router(predict_router, prefix="/predict")
