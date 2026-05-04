from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class ExperienceBase(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    period: str
    role: str
    org: str
    description: str
    sort_order: int = Field(default=0, alias="sortOrder")
    is_published: bool = Field(default=True, alias="isPublished")


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceUpdate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    period: str | None = None
    role: str | None = None
    org: str | None = None
    description: str | None = None
    sort_order: int | None = Field(default=None, alias="sortOrder")
    is_published: bool | None = Field(default=None, alias="isPublished")


class ExperienceRead(ExperienceBase):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
