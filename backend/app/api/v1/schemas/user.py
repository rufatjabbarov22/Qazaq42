from pydantic import BaseModel
from typing import List
from uuid import UUID


class UserCreate(BaseModel):
    firstName: str
    lastName: str
    location: str
    email: str
    username: str
    password: str
    devices: List[UUID]
