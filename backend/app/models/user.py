from typing import Optional

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

    devices: Optional["Device"] = Relationship(back_populates="user")  # type: ignore
    reports: Optional["Report"] = Relationship(back_populates="user")  # type: ignore
