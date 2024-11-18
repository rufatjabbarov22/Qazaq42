from pydantic import EmailStr
from pydantic_extra_types.phone_numbers import PhoneNumber
from sqlmodel import Field

from app.models.abstract.base import Base


class Order(Base, table=True):
    __tablename__ = "orders"

    fname: str = Field(max_length=255, nullable=False)
    lname: str = Field(max_length=255, nullable=False)
    phone: PhoneNumber = Field(nullable=False)
    email: EmailStr = Field(nullable=False)
    address: str = Field(nullable=False)
    is_approved: bool = Field(default=False)
