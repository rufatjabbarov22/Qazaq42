from typing import Annotated, Dict, List

from fastapi import APIRouter, status
from wireup import container, Inject

from app.api.v1.schemas.country import CountryCreate, CountryRead, CountryUpdate
from app.services.country import CountryService

router = APIRouter()


@router.post("/", response_model=CountryRead, status_code=status.HTTP_201_CREATED)
@container.autowire
async def create_country(country_data: CountryCreate, country_service: Annotated[CountryService, Inject()]):
    return await country_service.create_country(country_data)


@router.get("/", response_model=List[CountryRead], status_code=status.HTTP_200_OK)
@container.autowire
async def get_countries(country_service: Annotated[CountryService, Inject()]):
    return await country_service.get_all_countries()


@router.get("/{country_id}", response_model=CountryRead, status_code=status.HTTP_200_OK)
@container.autowire
async def get_country(country_id: str, country_service: Annotated[CountryService, Inject()]):
    return await country_service.get_country_by_id(country_id)


@router.put("/{country_id}", response_model=CountryRead, status_code=status.HTTP_200_OK)
@container.autowire
async def update_country(country_id: str, country_data: CountryUpdate,
                         country_service: Annotated[CountryService, Inject()]):
    return await country_service.update_country(country_data, country_id)


@router.delete("/{country_id}", response_model=Dict, status_code=status.HTTP_200_OK)
@container.autowire
async def delete_country(country_id: str, country_service: Annotated[CountryService, Inject()]):
    return await country_service.delete_country(country_id)
