from typing import Optional

from uuid import UUID
from sqlmodel import Field, Relationship

from app.models.abstract.base import Base
from app.utils.enums.device import DeviceTypeEnum


class Device(Base, table=True):
    __tablename__ = "devices"

    user_id: Optional[UUID] = Field(foreign_key="users.id", nullable=False)
    field_id: Optional[UUID] = Field(foreign_key="fields.id", nullable=True)
    serial_id: str = Field(max_length=255, nullable=False, unique=True)
    name: str = Field(max_length=255, nullable=True)
    description: Optional[str] = Field(max_length=255, nullable=True)
    type: DeviceTypeEnum = Field(nullable=False)

    user: Optional["User"] = Relationship(back_populates="devices")  # type: ignore
    field: Optional["FieldModel"] = Relationship(back_populates="devices")  # type: ignore
    telemetries: Optional["Telemetry"] = Relationship(back_populates="device")  # type: ignore
