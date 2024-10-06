from typing import Optional

from sqlmodel import Field

from app.models.abstract.base import Base


class Crop(Base, table=True):
    __tablename__ = 'crop'

    name: str = Field(nullable=False)
    description: Optional[str] = Field(nullable=True)
    ideal_temperature: Optional[float] = Field(nullable=True)
    ideal_ph: Optional[float] = Field(nullable=True)
    ideal_soil_humidity: Optional[float] = Field(nullable=True)
    ideal_air_humidity: Optional[float] = Field(nullable=True)
    ideal_light_intensity: Optional[float] = Field(nullable=True)
    ideal_light_duration: Optional[float] = Field(nullable=True)
    ideal_co2: Optional[float] = Field(nullable=True)
    ideal_o2: Optional[float] = Field(nullable=True)
