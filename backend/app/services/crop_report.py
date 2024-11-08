from typing import List, Dict
from uuid import UUID

from fastapi import HTTPException, status
from wireup import container

from app.api.v1.schemas.crop_report import CropReportCreate, CropReportUpdate, CropReportRead
from app.repositories.crop_report import CropReportRepository
from app.repositories.field import FieldRepository
from app.services.abstract.base import BaseService


class CropReportService(BaseService[CropReportRepository]):
    def __init__(self, field_repository: FieldRepository):
        super().__init__(CropReportRepository)  # type: ignore
        self.field_repository = field_repository

    async def create_crop_reports(
            self,
            device_id: UUID,
            top_3_crops: List[CropReportCreate],
    ) -> Dict:
        field = await self.field_repository.get_field_by_device_id(device_id)

        if not field:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No field associated with device ID {device_id}"
            )

        created_reports = await self.repository.create_batch(field.id, top_3_crops)

        return {"message": "Crop reports created successfully", "reports": created_reports}

    async def get_crop_reports_by_field_id(self, field_id: UUID) -> List[CropReportRead]:
        crop_reports = await self.repository.get_crop_report_by_field_id(field_id)
        if not crop_reports:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No crop reports found for field ID {field_id}"
            )
        return [CropReportRead.model_validate(report) for report in crop_reports]

    async def get_crop_reports_by_device_id(self, device_id: UUID) -> List[CropReportRead]:
        crop_reports = await self.repository.get_crop_reports_by_device_id(device_id)
        if not crop_reports:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No crop reports found for device ID {device_id}"
            )
        return [CropReportRead.model_validate(report) for report in crop_reports]

    async def delete_crop_report(self, report_id: UUID) -> Dict:
        deleted_report = await self.repository.delete(report_id)
        if not deleted_report:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No crop report found with ID {report_id}"
            )
        return {"message": "Crop report deleted successfully", "report": deleted_report}
