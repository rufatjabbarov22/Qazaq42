from typing import Dict, List

from wireup import service

from app.api.v1.schemas.country import CountryCreate, CountryRead, CountryUpdate
from app.common.exceptions.country import CountryAlreadyExists, CountryCreationFailed, CountryNotFound
from app.repositories.country import CountryRepository
from app.services.abstract.base import BaseService


@service
class CountryService(BaseService[CountryRepository]):
    def __init__(self, country_repository: CountryRepository):
        super().__init__(country_repository)

    async def create_country(self, country_data: CountryCreate) -> CountryRead:
        try:
            created_country = await self.repository.create(country_data)
            return CountryRead.model_validate(created_country)

        except Exception as e:
            if "unique constraint" in str(e):
                raise CountryAlreadyExists(country_data.id)
            raise CountryCreationFailed()

    async def get_country_by_id(self, country_id: str) -> CountryRead:
        country = await self.repository.get(country_id)
        if not country:
            raise CountryNotFound()
        return CountryRead.model_validate(country)

    async def get_all_countries(self) -> List[CountryRead]:
        countries = await self.repository.get_all()
        return [CountryRead.model_validate(country) for country in countries]

    async def update_country(self, country_data: CountryUpdate, country_id: str) -> CountryRead:
        updated_country = await self.repository.update(country_id, country_data)
        if not updated_country:
            raise CountryNotFound()
        return CountryRead.model_validate(updated_country)

    async def delete_country(self, country_id: str) -> Dict:
        deleted_country = await self.repository.delete(country_id)
        if not deleted_country:
            raise CountryNotFound()
        return {"detail": "Country deleted successfully", "country": deleted_country}
