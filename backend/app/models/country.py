from sqlmodel import Field, Relationship, JSON

from app.models.abstract.base import Base


class Country(Base, table=True):
    __tablename__ = "countries"

    id: str = Field(max_length=2, primary_key=True)
    name: str = Field(max_length=255, nullable=False, unique=True)
    info: dict = Field(sa_type=JSON, default={})

    districts: list["District"] = Relationship(back_populates="country")  # type: ignore
