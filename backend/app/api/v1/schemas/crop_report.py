from datetime import datetime
from typing import Optional
from uuid import UUID

from app.api.v1.schemas.abstract.base import BaseSchema


class CropReportCreate(BaseSchema):
    field_id: UUID
    crop_name: str
    probability: float


class CropReportRead(BaseSchema):
    id: UUID
    field_id: UUID
    crop_name: str
    probability: float
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class CropReportUpdate(BaseSchema):
    pass
