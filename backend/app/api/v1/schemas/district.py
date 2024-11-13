from datetime import datetime
from typing import Dict, Optional
from uuid import UUID

from app.api.v1.schemas.abstract.base import BaseSchema


class DistrictCreate(BaseSchema):
    name: str
    country_id: str
    info: Optional[Dict] = None


class DistrictRead(BaseSchema):
    id: UUID
    country_id: str
    name: str
    info: Optional[Dict]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class DistrictUpdate(BaseSchema):
    name: Optional[str] = None
    info: Optional[dict] = None
