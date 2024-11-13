import re

from datetime import datetime
from typing import Optional
from uuid import UUID

from fastapi import HTTPException, status
from pydantic import EmailStr, field_validator, Field

from app.api.v1.schemas.abstract.base import BaseSchema


class UserCreate(BaseSchema):
    fname: str = Field(min_length=1, max_length=255)
    lname: str = Field(min_length=1, max_length=255)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

    @field_validator("password", mode="before")
    @classmethod
    def validate_password(cls, value: str) -> str:
        return validate_password(value)


class UserRead(BaseSchema):
    id: UUID
    fname: str
    lname: str
    email: EmailStr
    is_verified: Optional[bool]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]


class UserUpdate(BaseSchema):
    fname: Optional[str] = Field(None, min_length=1, max_length=255)
    lname: Optional[str] = Field(None, min_length=1, max_length=255)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8, max_length=128)

    @field_validator("password", mode="before")
    @classmethod
    def validate_password(cls, value: Optional[str]) -> Optional[str]:
        if value:
            return validate_password(value)
        return value


class UserRead(BaseSchema):
    id: UUID
    fname: str
    lname: str
    email: EmailStr
    is_verified: Optional[bool]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]


class AdminUserUpdate(BaseSchema):
    is_admin: Optional[bool] = None


class UserLogin(BaseSchema):
    email: EmailStr
    password: str


def validate_password(value: str) -> str:
    if not re.search(r"[a-z]", value):
        raise HTTPException(
            detail="Password must contain at least one lowercase letter",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
    if not re.search(r"[A-Z]", value):
        raise HTTPException(
            detail="Password must contain at least one uppercase letter",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
    if not re.search(r"[0-9]", value):
        raise HTTPException(
            detail="Password must contain at least one digit",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
    if not re.search(r"[!@#$%^&*]", value):
        raise HTTPException(
            detail="Password must contain at least one special character (e.g., !@#$%^&*)",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

    return value
