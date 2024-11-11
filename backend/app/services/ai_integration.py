from typing import Dict
from uuid import UUID

from httpx import AsyncClient
from fastapi import HTTPException, status
from wireup import service

from app.services.crop_report import CropReportService
from app.services.telemetry import TelemetryService
from config.settings import secrets


@service
class AIIntegrationService:
    def __init__(self, crop_report_service: CropReportService, telemetry_service: TelemetryService):
        self.ai_predict_url = secrets.AI_PREDICT_URL
        self.crop_report_service = crop_report_service
        self.telemetry_service = telemetry_service

    async def predict_crop(self, telemetry_id: UUID) -> Dict:
        telemetry_data = await self.telemetry_service.get_telemetry_by_id(telemetry_id)

        if not telemetry_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No telemetry data found for telemetry ID {telemetry_id}"
            )

        payload = telemetry_data.model_dump()
        payload.pop("id")
        payload["device_id"] = str(telemetry_data.device_id)
        payload.pop("created_at")
        payload.pop("updated_at")

        async with AsyncClient() as client:
            response = await client.post(self.ai_predict_url, json=payload)
            response.raise_for_status()
            results = response.json()

            if not results:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="AI service failed unexpectedly. Try again later."
                )

        device_id = results.get("device_id")
        crop_reports = results.get("results")

        return await self.crop_report_service.create_crop_reports(device_id, crop_reports)
