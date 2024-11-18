from typing import Dict, List
from uuid import UUID

from wireup import service

from app.api.v1.schemas.field import FieldCreate, FieldRead, FieldUpdate
from app.common.exceptions.district import DistrictNotFound
from app.common.exceptions.field import FieldAlreadyExists, FieldCreationFailed, FieldNotFound
from app.repositories.field import FieldRepository
from app.services.abstract.base import BaseService


@service
class FieldModelService(BaseService[FieldRepository]):
    def __init__(self, field_repository: FieldRepository):
        super().__init__(field_repository)

    async def create_field(self, field_data: FieldCreate) -> FieldRead:
        try:
            created_field = await self.repository.create(field_data)
            return FieldRead.model_validate(created_field)

        except Exception as e:
            if "unique constraint" in str(e):
                raise FieldAlreadyExists(field_data.district_id)
            elif "ForeignKeyViolationError" in str(e):
                raise DistrictNotFound()
            raise FieldCreationFailed()

    async def get_field_by_id(self, field_id: UUID) -> FieldRead:
        field = await self.repository.get(field_id)
        if not field:
            raise FieldNotFound()
        return FieldRead.model_validate(field)

    async def get_field_by_device_id(self, device_id: UUID) -> FieldRead:
        field = await self.repository.get_field_by_device_id(device_id)
        if not field:
            raise FieldNotFound()
        return FieldRead.model_validate(field)

    async def get_field_by_district_id(self, district_id: UUID) -> List[FieldRead]:
        fields = await self.repository.get_field_by_district_id(district_id)
        return [FieldRead.model_validate(field) for field in fields]

    async def get_field_by_crop_report_id(self, crop_report_id: UUID) -> FieldRead:
        field = await self.repository.get_field_by_crop_report_id(crop_report_id)
        if not field:
            raise FieldNotFound()
        return FieldRead.model_validate(field)

    async def get_field_by_user_id(self, user_id: UUID) -> List[FieldRead]:
        fields = await self.repository.get_field_by_user_id(user_id)
        return [FieldRead.model_validate(field) for field in fields]

    async def get_all_fields(self) -> List[FieldRead]:
        fields = await self.repository.get_all()
        return [FieldRead.model_validate(field) for field in fields]

    async def update_field(self, field_data: FieldUpdate, field_id: UUID) -> FieldRead:
        updated_field = await self.repository.update(field_id, field_data)
        if not updated_field:
            raise FieldNotFound()
        return FieldRead.model_validate(updated_field)

    async def delete_field(self, field_id: UUID) -> Dict:
        field = await self.repository.delete(field_id)
        if not field:
            raise FieldNotFound()
        return {"detail": "Field deleted successfully"}
