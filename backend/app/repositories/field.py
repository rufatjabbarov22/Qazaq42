from typing import Optional, List
from uuid import UUID

from sqlalchemy.future import select

from app.api.v1.schemas.field import FieldCreate, FieldUpdate
from app.models.crop_report import CropReport
from app.models.device import Device
from app.models.field import FieldModel
from app.repositories.abstract.base import BaseRepository


class FieldRepository(BaseRepository[FieldModel, FieldCreate, FieldUpdate]):
    def __init__(self, database):
        super().__init__(database, FieldModel)  # type: ignore

    async def get_field_by_device_id(self, device_id: int) -> Optional[FieldModel]:
        async with self.produce_session() as session:
            stmt = select(FieldModel).join(Device, FieldModel.devices).where(Device.id == device_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalar_one_or_none()

    async def get_field_by_district_id(self, district_id: UUID) -> List[FieldModel]:
        async with self.produce_session() as session:
            stmt = select(FieldModel).where(FieldModel.district_id == district_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalars().all()

    async def get_field_by_crop_report_id(self, crop_report_id: UUID) -> Optional[FieldModel]:
        async with (self.produce_session() as session):
            stmt = (select(FieldModel).join(CropReport, FieldModel.crop_reports)  # type: ignore
                    .where(CropReport.id == crop_report_id))
            result = await session.execute(stmt)
            return result.scalar_one_or_none()
