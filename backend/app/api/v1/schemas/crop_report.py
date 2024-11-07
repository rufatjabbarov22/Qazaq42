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
    created_at: Optional[str] = None
    updated_at: Optional[str] = None


class CropReportAIResponse(BaseSchema):
    device_id: UUID
    top_3_crops: List[dict] = Field(
        ...,
        description="A list of dictionaries where each entry has a crop name and a probability."
    )


class CropProbability(BaseSchema):
    crop: str = Field(..., description="The name of the crop")
    probability: float = Field(..., description="The probability percentage for the crop")
