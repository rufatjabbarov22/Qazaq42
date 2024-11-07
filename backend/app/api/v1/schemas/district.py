from uuid import UUID

from typing import Optional, List

from app.api.v1.schemas.abstract.base import BaseSchema
from app.api.v1.schemas.field import FieldRead


class DistrictCreate(BaseSchema):
    name: str
    info: Optional[dict] = None


class DistrictUpdate(BaseSchema):
    name: Optional[str] = None
    info: Optional[dict] = None


class DistrictRead(BaseSchema):
    id: UUID
    country_id: str
    name: str
    info: dict
    fields: Optional[List[FieldRead]] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
