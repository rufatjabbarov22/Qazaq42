from typing import List

from fastapi import APIRouter, Depends, status

from app.api.v1.schemas.user import UserRead
from app.services.user import UserService


router = APIRouter()


@router.get("/", response_model=List[UserRead], status_code=status.HTTP_200_OK)
async def get_users(user_service: UserService = Depends()):
    return await user_service.get_all_users()
