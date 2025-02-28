from typing import Dict, List
from uuid import UUID

from sqlalchemy.exc import IntegrityError
from wireup import service

from app.api.v1.schemas.device import DeviceCreate, DeviceRead, DeviceUpdate
from app.common.exceptions.device import (
    DeviceAlreadyAssigned,
    DeviceAlreadyExists,
    DeviceCreationFailed,
    DeviceNotFound,
    InvalidSerialIDOrPin,
)
from app.common.exceptions.user import UserNotFound
from app.core.config import PREFIX_TYPE_MAP
from app.repositories.device import DeviceRepository
from app.repositories.user import UserRepository
from app.services.abstract.base import BaseService
from app.utils.helpers.device_helper import generate_pin, generate_serial_id


@service
class DeviceService(BaseService[DeviceRepository]):
    def __init__(self, user_repository: UserRepository, device_repository: DeviceRepository):
        super().__init__(device_repository)
        self.user_repository = user_repository

    async def create_device(self, device_data: DeviceCreate) -> DeviceRead:
        try:
            device_data.type = PREFIX_TYPE_MAP.get(device_data.prefix)
            if not device_data.type:
                raise ValueError("Invalid prefix; cannot determine device type.")

            device_data.serial_id = generate_serial_id(device_data.prefix)
            device_data.pin = generate_pin()
            if device_data.user_email:
                user = await self.user_repository.get_user_by_email(device_data.user_email)
                if not user:
                    raise UserNotFound()
                device_data.user_id = user.id
                device_data.is_assigned = True

            created_device = await self.repository.create(device_data)
            return DeviceRead.model_validate(created_device)

        except IntegrityError as e:
            if "unique constraint" in str(e.orig):
                raise DeviceAlreadyExists(device_data.serial_id)
            raise DeviceCreationFailed()

    async def assign_device_to_user(self, user_id: UUID, serial_id: str, provided_pin: str) -> DeviceRead:
        device = await self.repository.get_device_by_serial_id(serial_id)
        if not device or device.pin != provided_pin:
            raise InvalidSerialIDOrPin()

        if device.is_assigned:
            raise DeviceAlreadyAssigned()

        user = await self.user_repository.get(user_id)
        if not user:
            raise UserNotFound()

        device_update = DeviceUpdate(
            user_id=user_id,
            is_assigned=True
        )

        updated_device = await self.repository.update(device.id, device_update)

        return DeviceRead.model_validate(updated_device)

    async def get_device_by_id(self, device_id: UUID) -> DeviceRead:
        device = await self.repository.get(device_id)
        if not device:
            raise DeviceNotFound()
        return DeviceRead.model_validate(device)

    async def get_device_by_serial_id(self, serial_id: str) -> DeviceRead:
        device = await self.repository.get_device_by_serial_id(serial_id)
        if not device:
            raise DeviceNotFound()
        return DeviceRead.model_validate(device)

    async def get_devices_by_user_id(self, user_id: UUID) -> List[DeviceRead]:
        devices = await self.repository.get_devices_by_user_id(user_id)
        return [DeviceRead.model_validate(device) for device in devices]

    async def get_all_devices(self) -> List[DeviceRead]:
        devices = await self.repository.get_all()
        return [DeviceRead.model_validate(device) for device in devices]

    async def update_device(self, device_data: DeviceUpdate, device_id: UUID) -> DeviceRead:
        updated_device = await self.repository.update(device_id, device_data)
        if not updated_device:
            raise DeviceNotFound()
        return DeviceRead.model_validate(updated_device)

    async def delete_device(self, device_id: UUID) -> Dict:
        device = await self.repository.delete(device_id)
        if not device:
            raise DeviceNotFound()
        return {"message": "Device deleted successfully"}
