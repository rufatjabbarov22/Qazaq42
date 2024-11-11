from typing import Optional
from uuid import UUID

from sqlalchemy.future import select
from wireup import service

from app.api.v1.schemas.district import DistrictCreate, DistrictUpdate
from app.core.database import Database
from app.models.country import Country
from app.models.district import District
from app.models.field import FieldModel
from app.repositories.abstract.base import BaseRepository


@service
class DistrictRepository(BaseRepository[District, DistrictCreate, DistrictUpdate]):
    def __init__(self, database: Database):
        super().__init__(database, District)  # type: ignore

    async def get_district_by_field_id(self, field_id: UUID) -> Optional[District]:
        async with self.produce_session() as session:
            stmt = select(District).join(District.fields).where(FieldModel.id == field_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalar_one_or_none()

    async def get_district_by_country_id(self, country_id: str) -> Optional[District]:
        async with self.produce_session() as session:
            stmt = (
                select(District)
                .join(Country, District.country_id == Country.id)  # type: ignore
                .where(Country.id == country_id)
            )
            result = await session.execute(stmt)
            districts = result.scalars().all()

            return districts if districts else None
