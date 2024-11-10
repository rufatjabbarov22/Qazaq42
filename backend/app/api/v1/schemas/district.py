from datetime import datetime
from uuid import UUID

from typing import Optional

from app.api.v1.schemas.abstract.base import BaseSchema


class DistrictCreate(BaseSchema):
    name: str
    info: Optional[dict] = None


class DistrictUpdate(BaseSchema):
    name: Optional[str] = None
    info: Optional[dict] = None


class DistrictRead(BaseSchema):
    id: UUID
    country_id: str
    name: str
    info: dict
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
