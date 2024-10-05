from sqlmodel import Field, JSON

from app.models.abstract.base import Base


class District(Base, table=True):
    __tablename__ = "districts"

    name: str = Field(max_length=255, nullable=False)
    info: dict = Field(sa_type=JSON, default={})
