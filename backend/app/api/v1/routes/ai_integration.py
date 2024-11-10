from typing import Dict
from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.services.ai_integration import AIIntegrationService


router = APIRouter()


@router.post("/predict", response_model=Dict, status_code=status.HTTP_200_OK)
async def predict_crop(telemetry_id: UUID, ai_service: AIIntegrationService = Depends()):
    return await ai_service.predict_crop(telemetry_id)
