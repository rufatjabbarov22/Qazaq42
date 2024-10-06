from datetime import datetime, timezone
from uuid import UUID, uuid4

from pydantic import BaseModel
from sqlmodel import SQLModel, Field, TIMESTAMP


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

    def model_update(self, schema: BaseModel) -> None:
        for key, value in schema.model_dump(
            exclude_none=True
        ).items():
            if hasattr(self, key):
                if key != "password":
                    setattr(self, key, value)
                else:
                    setattr(self, key, self.validate_password(value))
        self.updated_at = datetime.now(timezone.utc)
