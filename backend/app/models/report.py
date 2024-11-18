from typing import Optional
from uuid import UUID

from sqlmodel import Field, Relationship

from app.models.abstract.base import Base


class Report(Base, table=True):
    __tablename__ = "reports"

    user_id: UUID = Field(foreign_key="users.id", nullable=False)
    message: str = Field(nullable=False)
    is_reviewed: bool = Field(default=False)

    user: Optional["User"] = Relationship(  # type: ignore
        back_populates="reports",
        sa_relationship_kwargs={"lazy": "joined"}
    )
