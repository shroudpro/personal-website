from pydantic import BaseModel, ConfigDict, Field, HttpUrl
from .project import ProjectRead


class GitHubImportRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    repo_url: HttpUrl = Field(alias="repoUrl")


class GitHubImportResponse(BaseModel):
    project: ProjectRead
