"""Module for Soil Pydantic model."""
from pydantic import BaseModel
from typing import Dict
from uuid import UUID
from datetime import datetime


class SoilSampleCreate(BaseModel):
    """Class for validating Soil Sample data."""
    ph: float
    moisture: float
    temperature: float
    nutrients: Dict[str, float]
    depth: float
    place: str
    device_id: UUID
    time: datetime
