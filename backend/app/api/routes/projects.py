from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session
from ..deps import get_session
from ...core.security import verify_write_token
from ...schema.project import ProjectCreate, ProjectRead, ProjectUpdate
from ...service.project_service import ProjectService

router = APIRouter(prefix="/projects", tags=["projects"])
service = ProjectService()


@router.get("", response_model=list[ProjectRead])
def list_projects(db: Session = Depends(get_session)):
    return service.list_public(db)


@router.get("/{slug}", response_model=ProjectRead)
def get_project(slug: str, db: Session = Depends(get_session)):
    return service.get_public_by_slug(db, slug)


@router.post("", response_model=ProjectRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(verify_write_token)])
def create_project(payload: ProjectCreate, db: Session = Depends(get_session)):
    return service.create(db, payload)


@router.patch("/{item_id}", response_model=ProjectRead, dependencies=[Depends(verify_write_token)])
def update_project(item_id: int, payload: ProjectUpdate, db: Session = Depends(get_session)):
    return service.update(db, item_id, payload)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(verify_write_token)])
def delete_project(item_id: int, db: Session = Depends(get_session)):
    service.delete(db, item_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
