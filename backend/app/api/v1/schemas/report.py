from datetime import datetime

from typing import Optional
from uuid import UUID

from app.api.v1.schemas.abstract.base import BaseSchema


class ReportCreate(BaseSchema):
    user_id: UUID
    message: str


class ReportRead(ReportCreate):
    id: Optional[UUID]
    user_id: UUID
    message: str
    is_reviewed: bool
    created_at: Optional[datetime]
    updated_at: Optional[datetime]


class ReportUpdate(ReportCreate):
    id: UUID
    message: str
