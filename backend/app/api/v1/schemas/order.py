from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import EmailStr
from pydantic_extra_types.phone_numbers import PhoneNumber

from app.api.v1.schemas.abstract.base import BaseSchema


class CreateOrder(BaseSchema):
    fname: str
    lname: str
    phone: PhoneNumber
    email: EmailStr
    address: str


class ReadOrder(BaseSchema):
    id: Optional[UUID]
    fname: str
    lname: str
    phone: PhoneNumber
    email: EmailStr
    address: str
    is_approved: Optional[bool]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]


class UpdateOrder(BaseSchema):
    pass
