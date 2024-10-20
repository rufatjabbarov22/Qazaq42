from uuid import UUID

from typing import Optional, List

from pydantic import BaseModel

from app.api.v1.schemas.field import FieldRead


class DistrictCreate(BaseModel):
    name: str
    info: Optional[dict] = None

    class Config:
        orm_mode = True


class DistrictUpdate(BaseModel):
    name: Optional[str] = None
    info: Optional[dict] = None

    class Config:
        orm_mode = True


class DistrictRead(BaseModel):
    id: UUID
    country_id: str
    name: str
    info: dict
    fields: Optional[List[FieldRead]] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        orm_mode = True
