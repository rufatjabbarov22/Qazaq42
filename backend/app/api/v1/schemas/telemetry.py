from uuid import UUID

from typing import Optional
from datetime import datetime

from pydantic import ConfigDict

from app.api.v1.schemas.abstract.base import BaseSchema


class TelemetryCreate(BaseSchema):
    device_id: UUID
    n: float
    p: float
    k: float
    temperature: float
    ph: float
    soil_humidity: float
    air_humidity: float
    light_intensity: float
    light_duration: float
    co2: float
    o2: float

    model_config = ConfigDict(extra="ignore")


class TelemetryRead(BaseSchema):
    id: UUID
    device_id: UUID
    n: float
    p: float
    k: float
    temperature: float
    ph: float
    soil_humidity: float
    air_humidity: float
    light_intensity: float
    light_duration: float
    co2: float
    o2: float
    created_at: datetime
    updated_at: datetime


class TelemetryUpdate(BaseSchema):
    n: Optional[float] = None
    p: Optional[float] = None
    k: Optional[float] = None
    temperature: Optional[float] = None
    ph: Optional[float] = None
    soil_humidity: Optional[float] = None
    air_humidity: Optional[float] = None
    light_intensity: Optional[float] = None
    light_duration: Optional[float] = None
    co2: Optional[float] = None
    o2: Optional[float] = None
