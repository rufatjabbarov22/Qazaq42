from typing import Annotated, Dict, List
from uuid import UUID

from fastapi import APIRouter, status
from wireup import container, Inject

from app.api.v1.schemas.order import CreateOrder, ReadOrder
from app.services.order import OrderService


router = APIRouter()


@router.post("/", response_model=ReadOrder, status_code=status.HTTP_201_CREATED)
@container.autowire
async def create_order(order_data: CreateOrder, order_service: Annotated[OrderService, Inject()]):
    return await order_service.create(order_data)


@router.post("/{order_id}/approve", response_model=ReadOrder, status_code=status.HTTP_200_OK)
@container.autowire
async def approve_order(order_id: UUID, order_service: Annotated[OrderService, Inject()]):
    return await order_service.approve_order(order_id)


@router.get("/", response_model=List[ReadOrder], status_code=status.HTTP_200_OK)
@container.autowire
async def get_all_orders(order_service: Annotated[OrderService, Inject()]):
    return await order_service.get_all_orders()


@router.get("/not-approved", response_model=List[ReadOrder], status_code=status.HTTP_200_OK)
@container.autowire
async def get_not_approved_orders(order_service: Annotated[OrderService, Inject()]):
    return await order_service.get_not_approved_orders()


@router.get("/{order_id}", response_model=ReadOrder, status_code=status.HTTP_200_OK)
@container.autowire
async def get_order_by_id(order_id: UUID, order_service: Annotated[OrderService, Inject()]):
    return await order_service.get_order_by_id(order_id)


@router.delete("/{order_id}", response_model=Dict, status_code=status.HTTP_200_OK)
@container.autowire
async def delete_order(order_id: UUID, order_service: Annotated[OrderService, Inject()]):
    return await order_service.delete(order_id)
