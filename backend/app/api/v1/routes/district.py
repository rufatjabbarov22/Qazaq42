from typing import List, Dict
from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.api.v1.schemas.district import DistrictCreate, DistrictRead, DistrictUpdate
from app.services.district import DistrictService


router = APIRouter()


@router.post("/", response_model=DistrictRead, status_code=status.HTTP_201_CREATED)
async def create_district(district_data: DistrictCreate, district_service: DistrictService = Depends()):
    return await district_service.create_district(district_data)


@router.get("/", response_model=List[DistrictRead], status_code=status.HTTP_200_OK)
async def get_districts(district_service: DistrictService = Depends()):
    return await district_service.get_all_districts()


@router.get("/{district_id}", response_model=DistrictRead, status_code=status.HTTP_200_OK)
async def get_district(district_id: UUID, district_service: DistrictService = Depends()):
    return await district_service.get_district_by_id(district_id)


@router.put("/{district_id}", response_model=DistrictRead, status_code=status.HTTP_200_OK)
async def update_district(district_id: UUID, district_data: DistrictUpdate,
                          district_service: DistrictService = Depends()):
    return await district_service.update_district(district_data, district_id)


@router.delete("/{district_id}", response_model=Dict, status_code=status.HTTP_200_OK)
async def delete_district(district_id: UUID, district_service: DistrictService = Depends()):
    return await district_service.delete_district(district_id)
