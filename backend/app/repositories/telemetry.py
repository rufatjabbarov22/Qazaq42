from typing import Optional
from uuid import UUID

from sqlalchemy.future import select

from app.api.v1.schemas.telemetry import TelemetryCreate, TelemetryUpdate
from app.models.telemetry import Telemetry
from app.repositories.abstract.base import BaseRepository


class TelemetryRepository(BaseRepository[Telemetry, TelemetryCreate, TelemetryUpdate]):
    def __init__(self, database):
        super().__init__(database, Telemetry)  # type: ignore

    async def get_telemetry_by_device_id(self, device_id: int) -> Optional[Telemetry]:
        async with self.produce_session() as session:
            stmt = select(Telemetry).where(Telemetry.device_id == device_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalars().all()
