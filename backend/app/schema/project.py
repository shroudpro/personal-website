from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class ProjectChallenge(BaseModel):
    title: str
    solution: str


class ProjectLinks(BaseModel):
    github: str | None = None
    demo: str | None = None


class ProjectBase(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    slug: str
    title: str
    type: str = "Project"
    summary: str
    overview: str = ""
    role_items: list[str] = Field(default_factory=list, alias="role")
    features: list[str] = Field(default_factory=list)
    tech_stack: list[str] = Field(default_factory=list, alias="stack")
    challenges: list[ProjectChallenge] = Field(default_factory=list)
    result: str = ""
    cover_doodle: str = Field(default="/images/doodles/browser-plant.png", alias="coverDoodle")
    github_url: str | None = Field(default=None, alias="githubUrl")
    demo_url: str | None = Field(default=None, alias="demoUrl")
    featured: bool = False
    sort_order: int = Field(default=0, alias="sortOrder")
    is_published: bool = Field(default=True, alias="isPublished")


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    slug: str | None = None
    title: str | None = None
    type: str | None = None
    summary: str | None = None
    overview: str | None = None
    role_items: list[str] | None = Field(default=None, alias="role")
    features: list[str] | None = None
    tech_stack: list[str] | None = Field(default=None, alias="stack")
    challenges: list[ProjectChallenge] | None = None
    result: str | None = None
    cover_doodle: str | None = Field(default=None, alias="coverDoodle")
    github_url: str | None = Field(default=None, alias="githubUrl")
    demo_url: str | None = Field(default=None, alias="demoUrl")
    featured: bool | None = None
    sort_order: int | None = Field(default=None, alias="sortOrder")
    is_published: bool | None = Field(default=None, alias="isPublished")


class ProjectRead(ProjectBase):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
    links: ProjectLinks
