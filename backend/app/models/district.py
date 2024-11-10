from typing import Dict, Optional

from sqlmodel import Field, JSON, Relationship
from sqlalchemy import UniqueConstraint

from app.models.abstract.base import Base
from app.models.field import FieldModel


class District(Base, table=True):
    __tablename__ = "districts"

    country_id: str = Field(foreign_key="countries.id", max_length=255, nullable=False, default="AZ")
    name: str = Field(max_length=255, nullable=False)
    info: Optional[Dict] = Field(sa_type=JSON, default={}, nullable=True)

    fields: list[FieldModel] = Relationship(back_populates="district")
    country: "Country" = Relationship(back_populates="districts")  # type: ignore

    __table_args__ = (UniqueConstraint("country_id", "name"),)
