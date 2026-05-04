from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from ..model.project import Project
from ..repository.project_repository import ProjectRepository
from ..schema.project import ProjectCreate, ProjectUpdate


class ProjectService:
    def __init__(self) -> None:
        self.repository = ProjectRepository()

    def list_public(self, db: Session) -> list[Project]:
        return self.repository.list_published(db)

    def get_public_by_slug(self, db: Session, slug: str) -> Project:
        project = self.repository.get_by_slug(db, slug)
        if project is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
        return project

    def create(self, db: Session, payload: ProjectCreate) -> Project:
        return self.repository.create(db, Project(**payload.model_dump()))

    def update(self, db: Session, item_id: int, payload: ProjectUpdate) -> Project:
        item = self.repository.get(db, item_id)
        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")

        for key, value in payload.model_dump(exclude_unset=True).items():
            if value is not None:
                setattr(item, key, value)
        db.commit()
        db.refresh(item)
        return item

    def delete(self, db: Session, item_id: int) -> None:
        item = self.repository.get(db, item_id)
        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
        self.repository.delete(db, item)
