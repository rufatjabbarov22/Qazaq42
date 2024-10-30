from typing import Optional, List

from app.api.v1.schemas.base import BaseSchema
from app.api.v1.schemas.district import DistrictRead


class CountryCreate(BaseSchema):
    id: str
    name: str


class CountryUpdate(BaseSchema):
    name: Optional[str] = None


class CountryRead(BaseSchema):
    id: str
    name: str
    districts: Optional[List[DistrictRead]] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
