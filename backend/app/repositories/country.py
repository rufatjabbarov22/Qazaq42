from typing import Optional
from sqlalchemy.future import select

from app.api.v1.schemas.country import CountryCreate, CountryUpdate
from app.models.country import Country
from app.models.district import District
from app.repositories.abstract.base import BaseRepository


class CountryRepository(BaseRepository[Country, CountryCreate, CountryUpdate]):
    def __init__(self, database):
        super().__init__(database, Country)  # type: ignore

    async def get_country_by_district_id(self, district_id: int) -> Optional[Country]:
        async with self.produce_session() as session:
            stmt = select(Country).join(District, Country.districts).where(District.id == district_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalar_one_or_none()
