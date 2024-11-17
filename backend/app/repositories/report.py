from typing import List, Optional, Union
from uuid import UUID

from sqlalchemy.future import select
from wireup import service

from app.api.v1.schemas.report import ReportCreate, ReportRead, ReportUpdate
from app.core.database import Database
from app.models.report import Report
from app.repositories.abstract.base import BaseRepository


@service
class ReportRepository(BaseRepository[ReportCreate, ReportRead, ReportUpdate]):
    def __init__(self, database: Database):
        super().__init__(database, Report)  # type: ignore

    async def get_reports_by_user(self, user_id: UUID) -> List[Report]:
        async with self.produce_session() as session:
            stmt = select(Report).where(Report.user_id == user_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalars().all()

    async def get_not_reviewed_reports(self) -> List[Report]:
        async with self.produce_session() as session:
            stmt = select(Report).where(Report.is_reviewed == False)  # noqa
            result = await session.execute(stmt)
            return result.scalars().all()

    async def mark_report_as_reviewed(self, report_id: UUID) -> Optional[Union[Report, bool]]:
        async with self.produce_session() as session:
            stmt = select(Report).where(Report.id == report_id)  # type: ignore
            result = await session.execute(stmt)
            report = result.scalar_one_or_none()

            if not report:
                return False

            report.is_reviewed = True
            await session.commit()
            return report
