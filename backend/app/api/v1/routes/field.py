from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, status
from wireup import container, Inject

from app.api.v1.schemas.field import FieldCreate, FieldRead, FieldUpdate
from app.services.field import FieldModelService


router = APIRouter()


@router.post("/", response_model=FieldRead, status_code=status.HTTP_201_CREATED)
@container.autowire
async def create_field(field_data: FieldCreate, field_service: Annotated[FieldModelService, Inject()]):
    return await field_service.create_field(field_data)


@router.get("/", response_model=List[FieldRead], status_code=status.HTTP_200_OK)
@container.autowire
async def get_fields(field_service: Annotated[FieldModelService, Inject()]):
    return await field_service.get_all_fields()


@router.get("/{field_id}", response_model=FieldRead, status_code=status.HTTP_200_OK)
@container.autowire
async def get_field(field_id: UUID, field_service: Annotated[FieldModelService, Inject()]):
    return await field_service.get_field_by_id(field_id)


@router.put("/{field_id}", response_model=FieldRead, status_code=status.HTTP_200_OK)
@container.autowire
async def update_field(field_id: UUID, field_data: FieldUpdate, field_service: Annotated[FieldModelService, Inject()]):
    return await field_service.update_field(field_data, field_id)


@router.delete("/{field_id}", response_model=dict, status_code=status.HTTP_200_OK)
@container.autowire
async def delete_field(field_id: UUID, field_service: Annotated[FieldModelService, Inject()]):
    return await field_service.delete_field(field_id)
