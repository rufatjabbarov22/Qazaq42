from typing import Dict, List
from uuid import UUID

from wireup import service

from app.api.v1.schemas.district import DistrictCreate, DistrictRead, DistrictUpdate
from app.common.exceptions.country import CountryNotFound
from app.common.exceptions.district import DistrictAlreadyExists, DistrictCreationFailed, DistrictNotFound
from app.repositories.district import DistrictRepository
from app.services.abstract.base import BaseService


@service
class DistrictService(BaseService[DistrictRepository]):
    def __init__(self, district_repository: DistrictRepository):
        super().__init__(district_repository)

    async def create_district(self, district_data: DistrictCreate) -> DistrictRead:
        try:
            created_district = await self.repository.create(district_data)
            return DistrictRead.model_validate(created_district)

        except Exception as e:
            if "unique constraint" in str(e):
                raise DistrictAlreadyExists(district_data.country_id)
            elif "ForeignKeyViolationError" in str(e):
                raise CountryNotFound()
            raise DistrictCreationFailed()

    async def get_district_by_id(self, district_id: UUID) -> DistrictRead:
        district = await self.repository.get(district_id)
        if not district:
            raise DistrictNotFound()
        return DistrictRead.model_validate(district)

    async def get_district_by_field_id(self, field_id: UUID) -> DistrictRead:
        district = await self.repository.get_district_by_field_id(field_id)
        if not district:
            raise DistrictNotFound()
        return DistrictRead.model_validate(district)

    async def get_district_by_country_id(self, country_id: str) -> List[DistrictRead]:
        districts = await self.repository.get_district_by_country_id(country_id)
        return [DistrictRead.model_validate(district) for district in districts]

    async def get_all_districts(self) -> List[DistrictRead]:
        districts = await self.repository.get_all()
        return [DistrictRead.model_validate(district) for district in districts]

    async def update_district(self, district_data: DistrictUpdate, district_id: UUID) -> DistrictRead:
        updated_district = await self.repository.update(district_id, district_data)
        if not updated_district:
            raise DistrictNotFound()
        return DistrictRead.model_validate(updated_district)

    async def delete_district(self, district_id: UUID) -> Dict:
        district = await self.repository.delete(district_id)
        if not district:
            raise DistrictNotFound()
        return {"detail": "District deleted successfully"}
