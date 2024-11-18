from typing import Optional, List
from uuid import UUID

from sqlmodel import Field, Relationship

from app.models.abstract.base import Base


class FieldModel(Base, table=True):
    __tablename__ = "fields"

    name: str = Field(max_length=255, nullable=False)
    size: float = Field(nullable=False)
    district_id: UUID = Field(foreign_key="districts.id", nullable=False)

    district: "District" = Relationship(  # type: ignore
        back_populates="fields",
        sa_relationship_kwargs={"lazy": "joined"}
    )
    devices: Optional[List["Device"]] = Relationship(  # type: ignore
        back_populates="field",
        sa_relationship_kwargs={"lazy": "joined"}
    )
    crop_reports: Optional[List["CropReport"]] = Relationship(  # type: ignore
        back_populates="field",
        sa_relationship_kwargs={"lazy": "joined", "cascade": "all, delete-orphan"}
    )