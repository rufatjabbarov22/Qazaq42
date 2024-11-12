from datetime import datetime
from uuid import UUID

from typing import Optional

from app.api.v1.schemas.abstract.base import BaseSchema


class FieldCreate(BaseSchema):
    name: str
    size: float
    district_id: UUID


class FieldRead(BaseSchema):
    id: UUID
    name: str
    size: float
    district_id: UUID
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class FieldUpdate(BaseSchema):
    name: Optional[str] = None
    size: Optional[float] = None
