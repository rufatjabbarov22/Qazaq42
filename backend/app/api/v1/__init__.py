from fastapi import APIRouter

from app.api.v1.routes import router as v1_router


router = APIRouter(prefix="/v1")

router.include_router(v1_router)
