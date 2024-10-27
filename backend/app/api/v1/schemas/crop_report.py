from typing import Optional, List
from uuid import UUID

from pydantic import BaseModel, Field


class CropReportCreate(BaseModel):
    field_id: UUID
    crop_name: str
    probability: float


class CropReportUpdate(BaseModel):
    pass


class CropReportRead(BaseModel):
    id: UUID
    field_id: UUID
    crop_name: str
    probability: float
    created_at: Optional[str] = None
    updated_at: Optional[str] = None


class CropReportAIResponse(BaseModel):
    device_id: UUID
    top_3_crops: List[dict] = Field(
        ...,
        description="A list of dictionaries where each entry has a crop name and a probability."
    )


class CropProbability(BaseModel):
    crop: str = Field(..., description="The name of the crop")
    probability: float = Field(..., description="The probability percentage for the crop")
