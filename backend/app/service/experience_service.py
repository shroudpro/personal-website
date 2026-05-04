from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from ..model.experience import Experience
from ..repository.experience_repository import ExperienceRepository
from ..schema.experience import ExperienceCreate, ExperienceUpdate


class ExperienceService:
    def __init__(self) -> None:
        self.repository = ExperienceRepository()

    def list_public(self, db: Session) -> list[Experience]:
        return self.repository.list_published(db)

    def create(self, db: Session, payload: ExperienceCreate) -> Experience:
        return self.repository.create(db, Experience(**payload.model_dump()))

    def update(self, db: Session, item_id: int, payload: ExperienceUpdate) -> Experience:
        item = self.repository.get(db, item_id)
        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found.")

        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(item, key, value)
        db.commit()
        db.refresh(item)
        return item

    def delete(self, db: Session, item_id: int) -> None:
        item = self.repository.get(db, item_id)
        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found.")
        self.repository.delete(db, item)
