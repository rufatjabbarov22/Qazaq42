from sqlmodel import Field, JSON, Relationship

from app.models.abstract.base import Base
from app.models.field import FieldModel


class District(Base, table=True):
    __tablename__ = "districts"

    country_id: str = Field(max_length=2, nullable=False, default="AZ")
    name: str = Field(max_length=255, nullable=False)
    info: dict = Field(sa_type=JSON, default={})

    fields: list[FieldModel] = Relationship(back_populates="district")
    country: "Country" = Relationship(back_populates="districts")  # type: ignore
