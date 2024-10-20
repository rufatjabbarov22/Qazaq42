from uuid import UUID

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TelemetryCreate(BaseModel):
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


class TelemetryUpdate(BaseModel):
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


class TelemetryRead(BaseModel):
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
