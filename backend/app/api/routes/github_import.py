from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from ..deps import get_session
from ...core.security import verify_write_token
from ...schema.github_import import GitHubImportRequest, GitHubImportResponse
from ...service.github_import_service import GitHubImportService

router = APIRouter(prefix="/projects/import", tags=["github-import"])
service = GitHubImportService()


@router.post("/github", response_model=GitHubImportResponse, status_code=status.HTTP_201_CREATED, dependencies=[Depends(verify_write_token)])
def import_github_project(payload: GitHubImportRequest, db: Session = Depends(get_session)):
    project = service.import_project(db, payload)
    return {"project": project}
