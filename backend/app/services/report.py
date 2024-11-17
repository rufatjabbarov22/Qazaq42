from typing import List, Optional
from uuid import UUID

from wireup import service

from app.api.v1.schemas.report import ReportCreate, ReportRead, ReportUpdate
from app.common.exceptions.report import ReportNotFound, ReportCreationFailed
from app.repositories.report import ReportRepository
from app.services.abstract.base import BaseService


@service
class ReportService(BaseService[ReportRepository]):
    def __init__(self, report_repository: ReportRepository):
        super().__init__(report_repository)

    async def create(self, report: ReportCreate) -> ReportRead:
        try:
            report_in_db = await self.repository.create(report)  # type: ignore
            return ReportRead.model_validate(report_in_db)
        except Exception as e:
            raise ReportCreationFailed()

    async def get_all_reports(self) -> List[ReportRead]:
        reports = await self.repository.get_all()
        return [ReportRead.model_validate(report) for report in reports]

    async def get_report_by_id(self, report_id: UUID) -> Optional[ReportRead]:
        report = await self.repository.get(report_id)
        if not report:
            raise ReportNotFound()
        return ReportRead.model_validate(report)

    async def get_reports_by_user(self, user_id: UUID) -> List[ReportRead]:
        reports = await self.repository.get_reports_by_user(user_id)
        return [ReportRead.model_validate(report) for report in reports]

    async def get_not_reviewed_reports(self) -> List[ReportRead]:
        reports = await self.repository.get_not_reviewed_reports()
        return [ReportRead.model_validate(report) for report in reports]

    async def update(self, report: ReportUpdate, report_id: UUID) -> Optional[ReportRead]:
        updated_report = await self.repository.update(report_id, report)
        if not updated_report:
            raise ReportNotFound()
        return ReportRead.model_validate(updated_report)

    async def delete(self, report_id: UUID) -> Optional[ReportRead]:
        report = await self.repository.delete(report_id)
        if not report:
            raise ReportNotFound()
        return ReportRead.model_validate(report)

    async def review_report(self, report_id: UUID) -> Optional[ReportRead]:
        report = await self.repository.get(report_id)
        if not report:
            raise ReportNotFound()
        report = await self.repository.mark_report_as_reviewed(report_id)

        return ReportRead.model_validate(report)
