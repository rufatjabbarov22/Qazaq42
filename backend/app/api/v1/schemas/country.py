from typing import Optional, List

from pydantic import BaseModel

from app.api.v1.schemas.district import DistrictRead


class CountryCreate(BaseModel):
    id: str
    name: str


class CountryUpdate(BaseModel):
    name: Optional[str] = None


class CountryRead(BaseModel):
    id: str
    name: str
    districts: Optional[List[DistrictRead]] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
