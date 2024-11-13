from uuid import UUID

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    sub: UUID
    is_admin: bool
    email: str
    is_verified: bool
