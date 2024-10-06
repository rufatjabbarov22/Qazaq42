from uuid import UUID
from sqlmodel import Field, Relationship

from app.models.abstract.base import Base


class FieldModel(Base, table=True):
    __tablename__ = "fields"

    name: str = Field(max_length=255, nullable=False)
    size: float = Field(nullable=False)
    district_id: UUID = Field(foreign_key="districts.id", nullable=False)

    district: "District" = Relationship(back_populates="fields")  # type: ignore
    crop_reports: list["CropReport"] = Relationship(back_populates="field")  # type: ignore
