import re

from datetime import datetime
from typing import Optional

from pydantic import EmailStr, Field
from uuid import UUID

from app.api.v1.schemas.abstract.base import BaseSchema
from app.utils.enums.device import DeviceTypeEnum
from app.core.config import PREFIX_TYPE_MAP


class DeviceCreate(BaseSchema):
    prefix: str = Field(..., max_length=8)
    serial_id: Optional[str] = Field(None, max_length=20)
    pin: Optional[str] = Field(None, max_length=20)
    type: Optional[DeviceTypeEnum] = Field(None)
    name: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = Field(None, max_length=255)
    user_email: Optional[EmailStr] = Field(None)
    user_id: Optional[UUID] = Field(None)
    is_assigned: Optional[bool] = Field(False)


class DeviceRead(BaseSchema):
    id: UUID
    serial_id: str
    name: Optional[str]
    description: Optional[str]
    type: DeviceTypeEnum
    user_id: Optional[UUID] = None
    field_id: Optional[UUID] = None
    is_assigned: bool
    created_at: Optional[datetime]
    updated_at: Optional[datetime]


class DeviceUpdate(BaseSchema):
    user_id: Optional[UUID] = Field(None)
    name: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = Field(None, max_length=255)
    field_id: Optional[UUID] = None


def validate_serial_id(v: str, values: dict) -> str:
    if not re.match(r'^[A-Z]{3}\d{6}$', v):
        raise ValueError("serial_id must be in the format ABC123456 (3 letters followed by 6 digits)")

    prefix = v[:2]
    if prefix not in PREFIX_TYPE_MAP:
        raise ValueError(f"Invalid serial_id prefix '{prefix}'. Cannot determine device type.")
    values['type'] = PREFIX_TYPE_MAP[prefix]

    return v
