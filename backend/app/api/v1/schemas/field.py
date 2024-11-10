from datetime import datetime
from uuid import UUID

from typing import Optional, List

from app.api.v1.schemas.abstract.base import BaseSchema
from app.api.v1.schemas.crop_report import CropReportRead
from app.api.v1.schemas.device import DeviceRead
from app.api.v1.schemas.district import DistrictRead


class FieldCreate(BaseSchema):
    name: str
    size: float
    district_id: UUID


class FieldUpdate(BaseSchema):
    name: Optional[str] = None
    size: Optional[float] = None


class FieldRead(BaseSchema):
    id: UUID
    name: str
    size: float
    district_id: UUID
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

