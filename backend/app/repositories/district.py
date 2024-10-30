from typing import Optional

from sqlalchemy.future import select

from app.api.v1.schemas.district import DistrictCreate, DistrictUpdate
from app.models.district import District
from app.models.field import FieldModel
from app.repositories.abstract.base import BaseRepository


class DistrictRepository(BaseRepository[District, DistrictCreate, DistrictUpdate]):
    def __init__(self, database):
        super().__init__(database, District)  # type: ignore

    async def get_district_by_field_id(self, field_id: int) -> Optional[District]:
        async with self.produce_session() as session:
            stmt = select(District).join(District.fields).where(FieldModel.id == field_id)  # type: ignore
            result = await session.execute(stmt)
            return result.scalar_one_or_none()
