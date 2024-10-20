from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.crop_report import CropReport
from app.models.field import FieldModel
from app.models.device import Device


async def create_crop_reports(session: AsyncSession, device_id: UUID, top_3_crops: list):

    result = await session.execute(
        select(FieldModel).join(Device, Device.field_id == FieldModel.id).filter(Device.id == device_id)  # type: ignore
    )
    field = result.scalar_one_or_none()

    if not field:
        raise HTTPException(status_code=404, detail=f"No field associated with device ID {device_id}")

    for crop_data in top_3_crops:
        crop_report = CropReport(
            field_id=field.id,
            crop_name=crop_data["crop"],
            probability=crop_data["probability"] / 100
        )
        session.add(crop_report)

    await session.commit()
