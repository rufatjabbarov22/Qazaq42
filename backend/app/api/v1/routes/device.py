from typing import Annotated, Dict, List
from uuid import UUID

from fastapi import APIRouter, status
from wireup import container, Inject

from app.api.v1.schemas.device import DeviceCreate, DeviceRead, DeviceUpdate
from app.services.device import DeviceService

router = APIRouter()


@router.post("/", response_model=DeviceRead, status_code=status.HTTP_201_CREATED)
@container.autowire
async def create_device(device_data: DeviceCreate, device_service: Annotated[DeviceService, Inject()]):
    return await device_service.create_device(device_data)


@router.post("/assign", response_model=DeviceRead, status_code=status.HTTP_200_OK)
@container.autowire
async def assign_device_to_user(user_id: UUID, serial_id: str, provided_pin: str,
                                device_service: Annotated[DeviceService, Inject()]):
    return await device_service.assign_device_to_user(user_id, serial_id, provided_pin)


@router.get("/", response_model=List[DeviceRead], status_code=status.HTTP_200_OK)
@container.autowire
async def get_devices(device_service: Annotated[DeviceService, Inject()]):
    return await device_service.get_all_devices()


@router.get("/{device_id}", response_model=DeviceRead, status_code=status.HTTP_200_OK)
@container.autowire
async def get_device(device_id: UUID, device_service: Annotated[DeviceService, Inject()]):
    return await device_service.get_device_by_id(device_id)


@router.get("/serial/{serial_id}", response_model=DeviceRead, status_code=status.HTTP_200_OK)
@container.autowire
async def get_device_by_serial_id(serial_id: str, device_service: Annotated[DeviceService, Inject()]):
    return await device_service.get_device_by_serial_id(serial_id)


@router.put("/{device_id}", response_model=DeviceRead, status_code=status.HTTP_200_OK)
@container.autowire
async def update_device(device_id: UUID, device_data: DeviceUpdate, device_service: Annotated[DeviceService, Inject()]):
    return await device_service.update_device(device_data, device_id)


@router.delete("/{device_id}", response_model=Dict, status_code=status.HTTP_200_OK)
@container.autowire
async def delete_device(device_id: UUID, device_service: Annotated[DeviceService, Inject()]):
    return await device_service.delete_device(device_id)
