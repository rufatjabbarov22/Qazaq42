from uuid import UUID

from typing import Optional, List

from app.api.v1.schemas.abstract.base import BaseSchema


class FieldCreate(BaseSchema):
    name: str
    size: float
    district_id: UUID


class FieldUpdate(BaseSchema):
    name: Optional[str] = None
    size: Optional[float] = None
    district_id: Optional[UUID] = None


class FieldRead(BaseSchema):
    id: UUID
    name: str
    size: float
    district_id: UUID
    district: Optional["DistrictRead"] = None  # type: ignore
    devices: Optional[List["DeviceRead"]] = None  # type: ignore
    crop_reports: Optional[List["CropReportRead"]] = None  # type: ignore
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

