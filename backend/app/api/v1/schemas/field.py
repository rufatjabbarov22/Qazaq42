from uuid import UUID

from pydantic import BaseModel
from typing import Optional, List


class FieldCreate(BaseModel):
    name: str
    size: float
    district_id: UUID


class FieldUpdate(BaseModel):
    name: Optional[str] = None
    size: Optional[float] = None
    district_id: Optional[UUID] = None


class FieldRead(BaseModel):
    id: UUID
    name: str
    size: float
    district_id: UUID
    district: Optional["DistrictRead"] = None  # type: ignore
    devices: Optional[List["DeviceRead"]] = None  # type: ignore
    crop_reports: Optional[List["CropReportRead"]] = None  # type: ignore
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

