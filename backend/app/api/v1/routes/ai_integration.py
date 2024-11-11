from typing import Annotated, Dict
from uuid import UUID

from fastapi import APIRouter, status
from wireup import container, Inject

from app.services.ai_integration import AIIntegrationService


router = APIRouter()


@router.post("/predict", response_model=Dict, status_code=status.HTTP_200_OK)
@container.autowire
async def predict_crop(telemetry_id: UUID, ai_service: Annotated[AIIntegrationService, Inject()]):
    return await ai_service.predict_crop(telemetry_id)
