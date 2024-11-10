from typing import List
from uuid import UUID

from pydantic import Field

from app.api.v1.schemas.abstract.base import BaseSchema


class CropReportAIResponse(BaseSchema):
    device_id: UUID
    results: List[List] = Field(
        ...,
        description="A list of dictionaries where each entry has a crop name and a probability."
    )
