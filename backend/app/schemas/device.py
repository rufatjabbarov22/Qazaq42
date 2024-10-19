import re

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator
from uuid import UUID

from app.utils.enums.device import DeviceTypeEnum
from app.core.config import PREFIX_TYPE_MAP


class DeviceCreate(BaseModel):
    serial_id: str = Field(..., max_length=9)
    name: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = Field(None, max_length=255)
    field_id: Optional[UUID] = None

    @field_validator('serial_id', mode='before')
    def validate_serial_id(self, value: str, values: dict) -> str:
        return validate_serial_id(value, values)

    class Config:
        orm_mode = True


class DeviceUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = Field(None, max_length=255)
    field_id: Optional[UUID] = None

    class Config:
        orm_mode = True


class DeviceRead(BaseModel):
    id: UUID
    serial_id: str
    name: Optional[str]
    description: Optional[str]
    type: DeviceTypeEnum
    user_id: UUID
    field_id: Optional[UUID]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


def validate_serial_id(v: str, values: dict) -> str:
    if not re.match(r'^[A-Z]{3}\d{6}$', v):
        raise ValueError("serial_id must be in the format ABC123456 (3 letters followed by 6 digits)")

    prefix = v[:2]
    if prefix not in PREFIX_TYPE_MAP:
        raise ValueError(f"Invalid serial_id prefix '{prefix}'. Cannot determine device type.")
    values['type'] = PREFIX_TYPE_MAP[prefix]

    return v
