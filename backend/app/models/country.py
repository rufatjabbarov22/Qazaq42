from typing import Dict, Optional, List

from sqlmodel import Field, Relationship, JSON

from app.models.abstract.base import Base


class Country(Base, table=True):
    __tablename__ = "countries"

    id: str = Field(max_length=2, primary_key=True)
    name: str = Field(max_length=255, nullable=False, unique=True)
    info: Dict = Field(sa_type=JSON, default={})

    districts: Optional[List["District"]] = Relationship(  # type: ignore
        back_populates="country",
        sa_relationship_kwargs={"lazy": "joined", "cascade": "all, delete-orphan"}
    )
