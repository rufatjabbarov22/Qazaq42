from typing import List
from uuid import UUID

from sqlalchemy import desc
from sqlalchemy.future import select
from wireup import service

from app.api.v1.schemas.crop_report import CropReportCreate, CropReportUpdate
from app.core.database import Database
from app.models.crop_report import CropReport
from app.models.device import Device
from app.models.field import FieldModel
from app.repositories.abstract.base import BaseRepository


@service
class CropReportRepository(BaseRepository[CropReport, CropReportCreate, CropReportUpdate]):
    def __init__(self, database: Database):
        super().__init__(database, CropReport)  # type: ignore

    async def create_batch(self, field_id: UUID, crops: List[CropReportCreate]) -> List[CropReport]:
        async with self.produce_session() as session:
            created_reports = []
            for crop_data in crops:
                crop_report = CropReport(
                    field_id=field_id,
                    crop_name=crop_data.crop_name,
                    probability=crop_data.probability / 100
                )
                session.add(crop_report)
                created_reports.append(crop_report)
            await session.commit()
            return created_reports

    async def get_last_n_reports_by_field_id(self, field_id: UUID, n: int = 3) -> List[CropReport]:
        async with self.produce_session() as session:
            stmt = (
                select(CropReport)
                .where(CropReport.field_id == field_id)  # type: ignore
                .order_by(desc(CropReport.created_at))
                .limit(n)
            )
            result = await session.execute(stmt)
            return result.scalars().all()

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
