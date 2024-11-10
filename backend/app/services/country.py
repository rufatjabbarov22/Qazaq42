from typing import Dict, List

from fastapi import Depends, HTTPException, status

from app.api.v1.schemas.country import CountryCreate, CountryRead, CountryUpdate
from app.core.database import Database, get_database
from app.repositories.country import CountryRepository
from app.services.abstract.base import BaseService


class CountryService(BaseService[CountryRepository]):
    def __init__(self, database: Database = Depends(get_database)):
        super().__init__(CountryRepository(database))

    async def create_country(self, country_data: CountryCreate) -> CountryRead:
        try:
            created_country = await self.repository.create(country_data)

        except Exception as e:
            if "unique constraint" in str(e):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=f"Country with id {country_data.id} already exists",
                )
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Country creation failed due to an unexpected error.",
            )

        return CountryRead.model_validate(created_country)

    async def get_country_by_id(self, country_id: str) -> CountryRead:
        country = await self.repository.get(country_id)
        if not country:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No country found with ID {country_id}"
            )
        return CountryRead.model_validate(country)

    async def get_all_countries(self) -> List[CountryRead]:
        countries = await self.repository.get_all()
        return [CountryRead.model_validate(country) for country in countries]

    async def update_country(self, country_data: CountryUpdate, country_id: str) -> CountryRead:
        updated_country = await self.repository.update(country_id, country_data)
        if not updated_country:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No country found with ID {country_id}"
            )
        return CountryRead.model_validate(updated_country)

    async def delete_country(self, country_id: str) -> Dict:
        deleted_country = await self.repository.delete(country_id)
        if not deleted_country:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No country found with ID {country_id}"
            )
        return {"detail": "Country deleted successfully", "country": deleted_country}
