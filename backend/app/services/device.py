from typing import Dict, List
from uuid import UUID

from sqlalchemy.exc import IntegrityError
from fastapi import Depends, HTTPException, status

from app.api.v1.schemas.device import DeviceCreate, DeviceRead, DeviceUpdate
from app.core.database import Database, get_database
from app.repositories.device import DeviceRepository
from app.services.abstract.base import BaseService


class DeviceService(BaseService[DeviceRepository]):
    def __init__(self, database: Database = Depends(get_database)):
        super().__init__(DeviceRepository(database))

    async def create_device(self, device_data: DeviceCreate) -> DeviceRead:
        try:
            created_device = await self.repository.create(**device_data.model_dump())
            return DeviceRead.model_validate(created_device)

        except IntegrityError as e:
            if "unique constraint" in str(e.orig):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="A device with this Serial ID already exists."
                )
            raise

        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Serial ID format. Serial ID must be in the format ABC123456"
            )

    async def get_device_by_id(self, device_id: UUID) -> DeviceRead:
        device = await self.repository.get(device_id)
        if not device:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No device found with ID {device_id}"
            )
        return DeviceRead.model_validate(device)

    async def get_all_devices(self) -> Dict[str, List[DeviceRead]]:
        devices = await self.repository.get_all()
        return {"devices": [DeviceRead.model_validate(device) for device in devices]}

    async def update_device(self, device_data: DeviceUpdate, device_id: UUID) -> DeviceRead:
        updated_device = await self.repository.update(device_id, **device_data.model_dump())
        if not updated_device:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No device found with ID {device_id}"
            )
        return DeviceRead.model_validate(updated_device)

    async def delete_device(self, device_id: UUID) -> Dict:
        deleted_device = await self.repository.delete(device_id)
        if not deleted_device:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No device found with ID {device_id}"
            )
        return {"message": "Device deleted successfully", "device": deleted_device}
