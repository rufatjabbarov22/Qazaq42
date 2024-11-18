from typing import List

from pydantic import EmailStr
from sqlmodel import Field, Relationship

from app.models.abstract.base import Base


class User(Base, table=True):
    __tablename__ = "users"

    fname: str = Field(max_length=255, nullable=False)
    lname: str = Field(max_length=255, nullable=False)
    email: EmailStr = Field(nullable=False, unique=True, index=True)
    password: str = Field(nullable=False)
    is_verified: bool = Field(default=False)
    is_admin: bool = Field(default=False)

    devices: List["Device"] = Relationship(  # type: ignore
        back_populates="user",
    )
    reports: List["Report"] = Relationship(  # type: ignore
        back_populates="user",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )
