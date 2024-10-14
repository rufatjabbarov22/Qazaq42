from pydantic import BaseModel
from uuid import UUID


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
