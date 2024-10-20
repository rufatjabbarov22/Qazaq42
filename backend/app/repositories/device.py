from typing import Optional, List
from uuid import UUID

from sqlalchemy.future import select

from app.api.v1.schemas.device import DeviceCreate, DeviceUpdate
from app.models.device import Device
from app.repositories.abstract.base import BaseRepository


class DeviceRepository(BaseRepository[Device, DeviceCreate, DeviceUpdate]):
    def __init__(self, database):
        super().__init__(database, Device)  # type: ignore

    async def get_device_by_serial_id(self, serial_id: str) -> Optional[Device]:
        async with self.produce_session() as session:
            stmt = select(Device).where(Device.serial_id == serial_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalar_one_or_none()

    async def get_device_by_user_id(self, user_id: UUID) -> Optional[Device]:
        async with self.produce_session() as session:
            stmt = select(Device).where(Device.user_id == user_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalars().all()

    async def get_device_by_field_id(self, field_id: UUID) -> Optional[Device]:
        async with self.produce_session() as session:
            stmt = select(Device).where(Device.field_id == field_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalars().all()
