from typing import Dict, List, Optional
from uuid import UUID

from wireup import service

from app.api.v1.schemas.order import CreateOrder, ReadOrder
from app.common.exceptions.order import OrderCreationFailed, OrderNotFound
from app.repositories.order import OrderRepository
from app.services.abstract.base import BaseService


@service
class OrderService(BaseService[OrderRepository]):
    def __init__(self, order_repository: OrderRepository):
        super().__init__(order_repository)

    async def create(self, order: CreateOrder) -> ReadOrder:
        try:
            order_in_db = await self.repository.create(order)  # type: ignore
            return ReadOrder.model_validate(order_in_db)
        except Exception:
            raise OrderCreationFailed()

    async def get_all_orders(self) -> List[ReadOrder]:
        orders = await self.repository.get_all()
        return [ReadOrder.model_validate(order) for order in orders]

    async def get_order_by_id(self, order_id: UUID) -> Optional[ReadOrder]:
        order = await self.repository.get(order_id)
        if not order:
            raise OrderNotFound()
        return ReadOrder.model_validate(order)

    async def get_not_approved_orders(self) -> List[ReadOrder]:
        orders = await self.repository.get_not_approved_orders()
        return [ReadOrder.model_validate(order) for order in orders]

    async def delete(self, order_id: UUID) -> Dict:
        order = await self.repository.delete(order_id)
        if not order:
            raise OrderNotFound()
        return {"message": "Order deleted successfully"}

    async def approve_order(self, order_id: UUID) -> Optional[ReadOrder]:
        order = await self.repository.get(order_id)
        if not order:
            raise OrderNotFound()
        order = await self.repository.mark_order_as_approved(order_id)

        return ReadOrder.model_validate(order)
