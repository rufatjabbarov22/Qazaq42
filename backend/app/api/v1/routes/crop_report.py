from typing import Annotated, Dict, List
from uuid import UUID

from fastapi import APIRouter, status
from wireup import container, Inject

from app.api.v1.schemas.crop_report import CropReportRead
from app.services.crop_report import CropReportService


router = APIRouter()


@router.get("/", response_model=List[CropReportRead], status_code=status.HTTP_200_OK)
@container.autowire
async def get_crop_reports(crop_report_service: Annotated[CropReportService, Inject()]):
    return await crop_report_service.get_all_crop_reports()


@router.get("/field/{field_id}/last", response_model=List[CropReportRead], status_code=status.HTTP_200_OK)
@container.autowire
async def get_last_n_crop_reports_by_field_id(field_id: UUID,
                                              crop_report_service: Annotated[CropReportService, Inject()], n: int = 3):
    return await crop_report_service.get_last_n_reports_by_field_id(field_id, n)


@router.get("/field/{field_id}", response_model=List[CropReportRead], status_code=status.HTTP_200_OK)
@container.autowire
async def get_crop_reports_by_field_id(field_id: UUID, crop_report_service: Annotated[CropReportService, Inject()]):
    return await crop_report_service.get_crop_reports_by_field_id(field_id)


@router.get("/device/{device_id}", response_model=List[CropReportRead], status_code=status.HTTP_200_OK)
@container.autowire
async def get_crop_reports_by_device_id(device_id: UUID, crop_report_service: Annotated[CropReportService, Inject()]):
    return await crop_report_service.get_crop_reports_by_device_id(device_id)


@router.delete("/{report_id}", response_model=Dict, status_code=status.HTTP_200_OK)
@container.autowire
async def delete_crop_report(report_id: UUID, crop_report_service: Annotated[CropReportService, Inject()]):
    return await crop_report_service.delete_crop_report(report_id)
