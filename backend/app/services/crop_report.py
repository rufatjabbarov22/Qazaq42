from typing import List, Dict
from uuid import UUID

from wireup import service

from app.api.v1.schemas.crop_report import CropReportCreate, CropReportRead
from app.common.exceptions.crop_report import CropReportNotFound
from app.common.exceptions.field import FieldNotFound
from app.repositories.crop_report import CropReportRepository
from app.repositories.field import FieldRepository
from app.services.abstract.base import BaseService


@service
class CropReportService(BaseService[CropReportRepository]):
    def __init__(self, field_repository: FieldRepository, crop_report_repository: CropReportRepository):
        super().__init__(crop_report_repository)
        self.field_repository = field_repository

    async def create_crop_reports(self, device_id: UUID, results: List[List]) -> Dict:
        field = await self.field_repository.get_field_by_device_id(device_id)

        if not field:
            raise FieldNotFound()

        top_3_crops = [
            CropReportCreate(
                field_id=field.id,
                crop_name=crop_data[0],
                probability=crop_data[1]
            ) for crop_data in results
        ]

        created_reports = await self.repository.create_batch(field.id, top_3_crops)

        return {
            "status": "success",
            "message": "Crop reports created successfully",
            "data": {
                "device_id": str(device_id),
                "field_id": str(field.id),
                "reports": [CropReportRead.model_validate(report) for report in created_reports]
            }
        }

    async def get_all_crop_reports(self) -> List[CropReportRead]:
        crop_reports = await self.repository.get_all()
        return [CropReportRead.model_validate(report) for report in crop_reports]

    async def get_last_n_reports_by_field_id(self, field_id: UUID, n: int = 3) -> List[CropReportRead]:
        crop_reports = await self.repository.get_last_n_reports_by_field_id(field_id, n)
        return [CropReportRead.model_validate(report) for report in crop_reports]

    async def get_crop_reports_by_field_id(self, field_id: UUID) -> List[CropReportRead]:
        crop_reports = await self.repository.get_crop_report_by_field_id(field_id)
        return [CropReportRead.model_validate(report) for report in crop_reports]

    async def get_crop_reports_by_device_id(self, device_id: UUID) -> List[CropReportRead]:
        crop_reports = await self.repository.get_crop_reports_by_device_id(device_id)
        return [CropReportRead.model_validate(report) for report in crop_reports]

    async def delete_crop_report(self, report_id: UUID) -> Dict:
        report = await self.repository.delete(report_id)
        if not report:
            raise CropReportNotFound()
        return {"message": "Crop report deleted successfully"}
