from datetime import datetime, timezone
from uuid import UUID, uuid4

from sqlmodel import SQLModel, Field


class Base(SQLModel):
    id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
        index=True,
        unique=True
    )
    created_at: datetime = Field(
        sa_type=TIMESTAMP(timezone=True),  # type: ignore
        nullable=False,
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        sa_type=TIMESTAMP(timezone=True),  # type: ignore
        nullable=False,
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column_kwargs={
            "onupdate": lambda: datetime.now(timezone.utc)
        }
    )
