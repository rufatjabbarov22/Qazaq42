from datetime import datetime

from typing import Optional

from app.api.v1.schemas.abstract.base import BaseSchema


class CountryCreate(BaseSchema):
    id: str
    name: str


class CountryRead(BaseSchema):
    id: str
    name: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class CountryUpdate(BaseSchema):
    name: Optional[str] = None
