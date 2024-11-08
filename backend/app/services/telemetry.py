from typing import Dict, List
from uuid import UUID

from fastapi import Depends, HTTPException, status

from app.api.v1.schemas.telemetry import TelemetryCreate, TelemetryRead, TelemetryUpdate
from app.core.database import Database, get_database
from app.repositories.telemetry import TelemetryRepository
from app.services.abstract.base import BaseService


class TelemetryService(BaseService[TelemetryRepository]):
    def __init__(self, database: Database = Depends(get_database)):
        super().__init__(TelemetryRepository(database))

    async def create_telemetry(self, telemetry_data: TelemetryCreate) -> TelemetryRead:
        created_telemetry = await self.repository.create(**telemetry_data.model_dump())
        return TelemetryRead.model_validate(created_telemetry)

    async def get_telemetry_by_id(self, telemetry_id: UUID) -> TelemetryRead:
        telemetry = await self.repository.get(telemetry_id)
        if not telemetry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No telemetry found with ID {telemetry_id}"
            )
        return TelemetryRead.model_validate(telemetry)

    async def get_telemetry_by_device_id(self, device_id: UUID) -> List[TelemetryRead]:
        telemetry = await self.repository.get_telemetry_by_device_id(device_id)
        if not telemetry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No telemetry found for device with device ID {device_id}"
            )
        return [TelemetryRead.model_validate(telemetry) for telemetry in telemetry]

    async def get_telemetry_by_field_id(self, field_id: UUID) -> List[TelemetryRead]:
        telemetry = await self.repository.get_telemetry_by_field_id(field_id)
        if not telemetry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No telemetry found for field with field ID {field_id}"
            )
        return [TelemetryRead.model_validate(telemetry) for telemetry in telemetry]

    async def get_all_telemetry(self) -> List[TelemetryRead]:
        telemetry = await self.repository.get_all()
        return [TelemetryRead.model_validate(telemetry) for telemetry in telemetry]

    async def update_telemetry(self, telemetry_data: TelemetryUpdate, telemetry_id: UUID) -> TelemetryRead:
        updated_telemetry = await self.repository.update(telemetry_id, **telemetry_data.model_dump())
        if not updated_telemetry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No telemetry found with ID {telemetry_id}"
            )
        return TelemetryRead.model_validate(updated_telemetry)

    async def delete_telemetry(self, telemetry_id: UUID) -> Dict:
        deleted_telemetry = await self.repository.delete(telemetry_id)
        if not deleted_telemetry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No telemetry found with ID {telemetry_id}"
            )
        return {"message": "Telemetry deleted successfully", "telemetry": deleted_telemetry}