from typing import Optional

from pydantic import EmailStr
from sqlmodel import Field

from app.models.abstract.base import Base


class User(Base, table=True):
    __tablename__ = "users"

    fname: str = Field(max_length=255, nullable=False)
    lname = Field(max_length=255, nullable=False)
    email: EmailStr = Field(nullable=False, unique=True, index=True)
    password: str = Field(nullable=False)
    profile_img_path: Optional[str] = Field(default=None)
    is_verified: bool = Field(default=False)
    is_admin: bool = Field(default=False)
