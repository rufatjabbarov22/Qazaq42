from typing import Dict, List
from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.api.v1.schemas.telemetry import TelemetryCreate, TelemetryRead, TelemetryUpdate
from app.services.telemetry import TelemetryService


router = APIRouter()


@router.post("/", response_model=TelemetryRead, status_code=status.HTTP_201_CREATED)
async def create_telemetry(telemetry_data: TelemetryCreate, telemetry_service: TelemetryService = Depends()):
    return await telemetry_service.create_telemetry(telemetry_data)


@router.get("/", response_model=List[TelemetryRead], status_code=status.HTTP_200_OK)
async def get_telemetries(telemetry_service: TelemetryService = Depends()):
    return await telemetry_service.get_all_telemetry()


@router.get("/{telemetry_id}", response_model=TelemetryRead, status_code=status.HTTP_200_OK)
async def get_telemetry(telemetry_id: UUID, telemetry_service: TelemetryService = Depends()):
    return await telemetry_service.get_telemetry_by_id(telemetry_id)


@router.get("/device/{device_id}", response_model=List[TelemetryRead], status_code=status.HTTP_200_OK)
async def get_telemetry_by_device_id(device_id: UUID, telemetry_service: TelemetryService = Depends()):
    return await telemetry_service.get_telemetry_by_device_id(device_id)


@router.get("/field/{field_id}", response_model=List[TelemetryRead], status_code=status.HTTP_200_OK)
async def get_telemetry_by_field_id(field_id: UUID, telemetry_service: TelemetryService = Depends()):
    return await telemetry_service.get_telemetry_by_field_id(field_id)


@router.put("/{telemetry_id}", response_model=TelemetryRead, status_code=status.HTTP_200_OK)
async def update_telemetry(telemetry_id: UUID, telemetry_data: TelemetryUpdate,
                           telemetry_service: TelemetryService = Depends()):
    return await telemetry_service.update_telemetry(telemetry_data, telemetry_id)


@router.delete("/{telemetry_id}", response_model=Dict, status_code=status.HTTP_200_OK)
async def delete_telemetry(telemetry_id: UUID, telemetry_service: TelemetryService = Depends()):
    return await telemetry_service.delete_telemetry(telemetry_id)
