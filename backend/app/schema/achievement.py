from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class AchievementBase(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    title: str
    description: str
    icon: str = "/images/doodles/trophy.png"
    sort_order: int = Field(default=0, alias="sortOrder")
    is_published: bool = Field(default=True, alias="isPublished")


class AchievementCreate(AchievementBase):
    pass


class AchievementUpdate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    title: str | None = None
    description: str | None = None
    icon: str | None = None
    sort_order: int | None = Field(default=None, alias="sortOrder")
    is_published: bool | None = Field(default=None, alias="isPublished")


class AchievementRead(AchievementBase):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
