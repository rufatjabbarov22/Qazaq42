from fastapi import APIRouter

from .ai_integration import router as ai_integration_router
from .auth import router as auth_router
from .country import router as country_router
from .crop_report import router as crop_report_router
from .device import router as device_router
from .district import router as district_router
from .field import router as field_router
from .order import router as order_router
from .report import router as report_router
from .telemetry import router as telemetry_router
from .user import router as user_router

router = APIRouter()

router.include_router(ai_integration_router, prefix="/ai", tags=["ai"])
router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(country_router, prefix="/countries", tags=["countries"])
router.include_router(crop_report_router, prefix="/crop-reports", tags=["crop-reports"])
router.include_router(device_router, prefix="/devices", tags=["devices"])
router.include_router(district_router, prefix="/districts", tags=["districts"])
router.include_router(field_router, prefix="/fields", tags=["fields"])
router.include_router(order_router, prefix="/orders", tags=["orders"])
router.include_router(report_router, prefix="/reports", tags=["reports"])
router.include_router(telemetry_router, prefix="/telemetry", tags=["telemetry"])
router.include_router(user_router, prefix="/users", tags=["users"])
