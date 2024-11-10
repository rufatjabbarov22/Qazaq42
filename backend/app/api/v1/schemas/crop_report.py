from datetime import datetime
from typing import Optional, List
from uuid import UUID

from pydantic import Field

from app.api.v1.schemas.abstract.base import BaseSchema


class CropReportCreate(BaseSchema):
    field_id: UUID
    crop_name: str
    probability: float


class CropReportUpdate(BaseSchema):
    pass


class CropReportRead(BaseSchema):
    id: UUID
    field_id: UUID
    crop_name: str
    probability: float
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class CropProbability(BaseSchema):
    crop: str = Field(..., description="The name of the crop")
    probability: float = Field(..., description="The probability percentage for the crop")
