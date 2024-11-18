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

    fields: list[FieldModel] = Relationship(  # type: ignore
        back_populates="district",
        sa_relationship_kwargs={"lazy": "joined", "cascade": "all, delete-orphan"}
    )
    country: "Country" = Relationship(  # type: ignore
        back_populates="districts",
        sa_relationship_kwargs={"lazy": "joined"}
    )

    __table_args__ = (UniqueConstraint("country_id", "name"),)
