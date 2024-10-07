from uuid import UUID
from sqlmodel import Field, Relationship

from app.models.abstract.base import Base


class Telemetry(Base, table=True):
    __tablename__ = "telemetry"

    device_id: UUID = Field(foreign_key="devices.id", nullable=False)
    temperature: float = Field(nullable=False)
    ph: float = Field(nullable=False)
    soil_humidity: float = Field(nullable=False)
    air_humidity: float = Field(nullable=False)
    light_intensity: float = Field(nullable=False)
    light_duration: float = Field(nullable=False)
    co2: float = Field(nullable=False)
    o2: float = Field(nullable=False)

    device: "Device" = Relationship(back_populates="telemetries")  # type: ignore
