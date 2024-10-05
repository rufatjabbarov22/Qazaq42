from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional

import re


class UserCreate(BaseModel):
    fname: str = Field(..., min_length=1, max_length=255)
    lname: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    profile_img: str = None

    @field_validator("password", mode="before")
    def validate_password(self, value: str) -> str:
        return validate_password(value)


class UserUpdate(BaseModel):
    fname: Optional[str] = Field(None, min_length=1, max_length=255)
    lname: Optional[str] = Field(None, min_length=1, max_length=255)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8, max_length=128)
    profile_img: Optional[str] = None
    is_verified: Optional[bool] = None
    is_admin: Optional[bool] = None

    @field_validator("password", mode="before")
    def validate_password(self, value: Optional[str]) -> Optional[str]:
        if value:
            return validate_password(value)
        return value


def validate_password(value: str) -> str:
    if not re.search(r"[a-z]", value):
        raise ValueError("Password must contain at least one lowercase letter")
    if not re.search(r"[A-Z]", value):
        raise ValueError("Password must contain at least one uppercase letter")
    if not re.search(r"[0-9]", value):
        raise ValueError("Password must contain at least one digit")
    if not re.search(r"[!@#$%^&*]", value):
        raise ValueError("Password must contain at least one special character (e.g., !@#$%^&*)")
    return value
