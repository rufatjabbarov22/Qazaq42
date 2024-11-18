from typing import Annotated, Dict, List
from uuid import UUID

from fastapi import APIRouter, status
from wireup import container, Inject

from app.api.v1.schemas.report import CreateReport, ReadReport, UpdateReport
from app.services.report import ReportService


router = APIRouter()


@router.post("/", response_model=ReadReport, status_code=status.HTTP_201_CREATED)
@container.autowire
async def create_report(report_data: CreateReport, report_service: Annotated[ReportService, Inject()]):
    return await report_service.create(report_data)


@router.post("/{report_id}/review", response_model=ReadReport, status_code=status.HTTP_200_OK)
@container.autowire
async def review_report(report_id: UUID, report_service: Annotated[ReportService, Inject()]):
    return await report_service.review_report(report_id)


@router.get("/", response_model=List[ReadReport], status_code=status.HTTP_200_OK)
@container.autowire
async def get_reports(report_service: Annotated[ReportService, Inject()]):
    return await report_service.get_all_reports()


@router.get("/not-reviewed", response_model=List[ReadReport], status_code=status.HTTP_200_OK)
@container.autowire
async def get_not_reviewed_reports(report_service: Annotated[ReportService, Inject()]):
    return await report_service.get_not_reviewed_reports()


@router.get("/{report_id}", response_model=ReadReport, status_code=status.HTTP_200_OK)
@container.autowire
async def get_report(report_id: UUID, report_service: Annotated[ReportService, Inject()]):
    return await report_service.get_report_by_id(report_id)


@router.get("/user/{user_id}", response_model=List[ReadReport], status_code=status.HTTP_200_OK)
@container.autowire
async def get_reports_by_user(user_id: UUID, report_service: Annotated[ReportService, Inject()]):
    return await report_service.get_reports_by_user(user_id)


@router.put("/{report_id}", response_model=ReadReport, status_code=status.HTTP_200_OK)
@container.autowire
async def update_report(report_id: UUID, report_data: UpdateReport, report_service: Annotated[ReportService, Inject()]):
    return await report_service.update(report_data, report_id)


@router.delete("/{report_id}", response_model=Dict, status_code=status.HTTP_200_OK)
@container.autowire
async def delete_report(report_id: UUID, report_service: Annotated[ReportService, Inject()]):
    return await report_service.delete(report_id)
