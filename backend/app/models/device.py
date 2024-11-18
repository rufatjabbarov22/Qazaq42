from typing import Optional, List

from uuid import UUID
from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID as SAUUID
from sqlmodel import Field, Relationship

from app.models.abstract.base import Base
from app.utils.enums.device import DeviceTypeEnum


class Device(Base, table=True):
    __tablename__ = "devices"

    user_id: Optional[UUID] = Field(
        default=None,
        sa_column=Column(SAUUID, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    )
    field_id: Optional[UUID] = Field(
        default=None,
        sa_column=Column(SAUUID, ForeignKey("fields.id", ondelete="SET NULL"), nullable=True)
    )
    serial_id: str = Field(max_length=20, nullable=False, unique=True)
    pin: str = Field(max_length=20, nullable=False)
    name: Optional[str] = Field(max_length=255, nullable=True)
    description: Optional[str] = Field(max_length=255, nullable=True)
    type: DeviceTypeEnum = Field(nullable=False)
    is_assigned: bool = Field(default=False)

    user: Optional["User"] = Relationship(  # type: ignore
        back_populates="devices",
        sa_relationship_kwargs={"lazy": "joined"}
    )
    field: Optional["FieldModel"] = Relationship(  # type: ignore
        back_populates="devices",
        sa_relationship_kwargs={"lazy": "joined"}
    )
    telemetries: List["Telemetry"] = Relationship(  # type: ignore
        back_populates="device",
        sa_relationship_kwargs={"lazy": "joined", "cascade": "all, delete-orphan"}
    )
