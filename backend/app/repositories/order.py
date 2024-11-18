from typing import List, Optional, Union
from uuid import UUID

from sqlalchemy.future import select
from wireup import service

from app.api.v1.schemas.order import CreateOrder, ReadOrder, UpdateOrder
from app.core.database import Database
from app.models.order import Order
from app.repositories.abstract.base import BaseRepository


@service
class OrderRepository(BaseRepository[CreateOrder, ReadOrder, UpdateOrder]):
    def __init__(self, database: Database):
        super().__init__(database, Order)  # type: ignore

    async def get_not_approved_orders(self) -> List[Order]:
        async with self.produce_session() as session:
            stmt = select(Order).where(Order.is_approved == False)  # noqa
            result = await session.execute(stmt)
            return result.scalars().all()

    async def mark_order_as_approved(self, order_id: UUID) -> Optional[Union[Order, bool]]:
        async with self.produce_session() as session:
            stmt = select(Order).where(Order.id == order_id)  # type: ignore
            result = await session.execute(stmt)
            order = result.scalar_one_or_none()

            if not order:
                return False

            order.is_approved = True
            await session.commit()
            return order
