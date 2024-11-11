from typing import Annotated, Dict, List
from uuid import UUID

from fastapi import APIRouter, status
from wireup import container, Inject

from app.api.v1.schemas.district import DistrictCreate, DistrictRead, DistrictUpdate
from app.services.district import DistrictService


router = APIRouter()


@router.post("/", response_model=DistrictRead, status_code=status.HTTP_201_CREATED)
@container.autowire
async def create_district(district_data: DistrictCreate, district_service: Annotated[DistrictService, Inject()]):
    return await district_service.create_district(district_data)


@router.get("/", response_model=List[DistrictRead], status_code=status.HTTP_200_OK)
@container.autowire
async def get_districts(district_service: Annotated[DistrictService, Inject()]):
    return await district_service.get_all_districts()


@router.get("/{district_id}", response_model=DistrictRead, status_code=status.HTTP_200_OK)
@container.autowire
async def get_district(district_id: UUID, district_service: Annotated[DistrictService, Inject()]):
    return await district_service.get_district_by_id(district_id)


@router.put("/{district_id}", response_model=DistrictRead, status_code=status.HTTP_200_OK)
@container.autowire
async def update_district(district_id: UUID, district_data: DistrictUpdate,
                          district_service: Annotated[DistrictService, Inject()]):
    return await district_service.update_district(district_data, district_id)


@router.delete("/{district_id}", response_model=Dict, status_code=status.HTTP_200_OK)
@container.autowire
async def delete_district(district_id: UUID, district_service: Annotated[DistrictService, Inject()]):
    return await district_service.delete_district(district_id)
