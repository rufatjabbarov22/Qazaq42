from enum import Enum
from typing import Optional

from uuid import UUID
from sqlmodel import Field

from app.models.abstract.base import Base


class DeviceTypeEnum(str, Enum):
    FIELD = "field"
    BASE = "base"


class Device(Base, table=True):
    __tablename__ = "devices"

    user_id: UUID = Field(foreign_key="users.id", nullable=False)
    field_id: Optional[UUID] = Field(foreign_key="fields.id", nullable=False)
    name: str = Field(max_length=255, nullable=False)
    type: DeviceTypeEnum = Field(nullable=False)

    user: "User" = Relationship(back_populates="devices")  # type: ignore
    field: "Field" = Relationship(back_populates="devices")  # type: ignore
    telemetries: "Telemetry" = Relationship(back_populates="device")  # type: ignore
