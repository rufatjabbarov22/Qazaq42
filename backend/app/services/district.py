from typing import Dict, List
from uuid import UUID

from fastapi import Depends, HTTPException, status

from app.api.v1.schemas.district import DistrictCreate, DistrictRead, DistrictUpdate
from app.core.database import Database, get_database
from app.repositories.district import DistrictRepository
from app.services.abstract.base import BaseService


class DistrictService(BaseService[DistrictRepository]):
    def __init__(self, database: Database = Depends(get_database)):
        super().__init__(DistrictRepository(database))

    async def create_district(self, district_data: DistrictCreate) -> DistrictRead:
        created_district = await self.repository.create(**district_data.model_dump())
        return DistrictRead.model_validate(created_district)

    async def get_district_by_id(self, district_id: UUID) -> DistrictRead:
        district = await self.repository.get(district_id)
        if not district:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No district found with ID {district_id}"
            )
        return DistrictRead.model_validate(district)

    async def get_district_by_field_id(self, field_id: UUID) -> DistrictRead:
        district = await self.repository.get_district_by_field_id(field_id)
        if not district:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No district found with field ID {field_id}"
            )
        return DistrictRead.model_validate(district)

    async def get_district_by_country_id(self, country_id: str) -> List[DistrictRead]:
        districts = await self.repository.get_district_by_country_id(country_id)
        return [DistrictRead.model_validate(district) for district in districts]

    async def get_all_districts(self) -> List[DistrictRead]:
        districts = await self.repository.get_all()
        return [DistrictRead.model_validate(district) for district in districts]

    async def update_district(self, district_data: DistrictUpdate, district_id: UUID) -> DistrictRead:
        updated_district = await self.repository.update(district_id, **district_data.model_dump())
        if not updated_district:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No district found with ID {district_id}"
            )
        return DistrictRead.model_validate(updated_district)

    async def delete_district(self, district_id: UUID) -> Dict:
        deleted_district = await self.repository.delete(district_id)
        if not deleted_district:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No district found with ID {district_id}"
            )
        return {"detail": "District deleted successfully", "district": deleted_district}
