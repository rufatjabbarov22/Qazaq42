from fastapi import APIRouter, Depends, status

from app.api.v1.schemas.user import UserCreate, UserRead
from app.services.user import UserService


router = APIRouter()


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(user_data: UserCreate, user_service: UserService = Depends()):
    return await user_service.create_user(user_data)
