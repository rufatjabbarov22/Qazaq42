from typing import Optional, override
from uuid import UUID

from sqlalchemy.future import select

from app.api.v1.schemas.country import CountryCreate, CountryUpdate
from app.models.country import Country
from app.models.district import District
from app.repositories.abstract.base import BaseRepository


class CountryRepository(BaseRepository[Country, CountryCreate, CountryUpdate]):
    def __init__(self, database):
        super().__init__(database, Country)  # type: ignore

    async def get_country_by_district_id(self, district_id: UUID) -> Optional[Country]:
        async with self.produce_session() as session:
            stmt = select(Country).join(District, Country.districts).where(District.id == district_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalar_one_or_none()

    @override
    async def get(self, id: str) -> Optional[Country]:
        async with self.produce_session() as session:

            stmt = select(self.model).where(self.model.id == id)  # type: ignore
            result = await session.execute(stmt)
            country = result.scalars().unique().one_or_none()

            return country

    @override
    async def update(self, id: str, schema: Country) -> Optional[Country]:
        async with self.produce_session() as session:

            stmt = select(self.model).where(self.model.id == id)  # type: ignore
            result = await session.execute(stmt)
            country = result.scalars().unique().one_or_none()

            if not country:
                return None

            country.model_update(schema)

            await session.commit()
            await session.refresh(country)
            return country

    @override
    async def delete(self, id: str) -> bool:
        async with self.produce_session() as session:

            stmt = select(self.model).where(self.model.id == id)  # type: ignore
            result = await session.execute(stmt)
            country = result.scalars().unique().one_or_none()

            if country is None:
                return False

            await session.delete(country)
            await session.commit()

            return True
