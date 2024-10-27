from typing import List
from sqlalchemy.future import select
from uuid import UUID

from app.api.v1.schemas.crop_report import CropReportCreate, CropReportUpdate
from app.models.crop_report import CropReport
from app.models.device import Device
from app.models.field import FieldModel
from app.repositories.abstract.base import BaseRepository


class CropReportRepository(BaseRepository[CropReport, CropReportCreate, CropReportUpdate]):
    def __init__(self, database):
        super().__init__(database, CropReport)  # type: ignore

    async def get_crop_report_by_field_id(self, field_id: UUID) -> List[CropReport]:
        async with self.produce_session() as session:
            stmt = select(CropReport).where(CropReport.field_id == field_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalars().all()

    async def get_crop_reports_by_device_id(self, device_id: UUID) -> List[CropReport]:
        async with self.produce_session() as session:
            stmt = (
                select(CropReport)
                .join(FieldModel, CropReport.field_id == FieldModel.id)  # type: ignore
                .join(Device, FieldModel.id == Device.field_id)
                .where(Device.id == device_id)
            )
            result = await session.execute(stmt)
            return result.scalars().all()
