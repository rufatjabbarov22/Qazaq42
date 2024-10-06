from uuid import UUID
from sqlmodel import Field, Relationship

from app.models.abstract.base import Base


class CropReport(Base, table=True):
    __tablename__ = "crop_reports"

    field_id: UUID = Field(foreign_key="fields.id", nullable=False)
    crop_name: str = Field(max_length=255, nullable=False)
    probability: float = Field(nullable=False)

    field: "FieldModel" = Relationship(back_populates="crop_reports")  # type: ignore
