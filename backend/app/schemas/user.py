import re

from datetime import datetime
from typing import Optional, List
from uuid import UUID

from fastapi import HTTPException, status
from pydantic import BaseModel, EmailStr, field_validator, Field

from app.schemas.device import DeviceRead


class UserCreate(BaseModel):
    fname: str = Field(min_length=1, max_length=255)
    lname: str = Field(min_length=1, max_length=255)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    profile_img_path: Optional[str] = None

    @field_validator("password", mode="before")
    def validate_password(self, value: str) -> str:
        return validate_password(value)

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    fname: Optional[str] = Field(None, min_length=1, max_length=255)
    lname: Optional[str] = Field(None, min_length=1, max_length=255)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8, max_length=128)
    profile_img_path: Optional[str] = None
    is_verified: Optional[bool] = None
    is_admin: Optional[bool] = None

    @field_validator("password", mode="before")
    def validate_password(self, value: Optional[str]) -> Optional[str]:
        if value:
            return validate_password(value)
        return value

    class Config:
        orm_mode = True


class UserRead(BaseModel):
    id: UUID
    fname: str
    lname: str
    email: EmailStr
    profile_img_path: Optional[str]
    devices: Optional[List[DeviceRead]] = None
    is_verified: Optional[bool]
    is_admin: Optional[bool]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


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
