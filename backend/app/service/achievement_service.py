from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from ..model.achievement import Achievement
from ..repository.achievement_repository import AchievementRepository
from ..schema.achievement import AchievementCreate, AchievementUpdate


class AchievementService:
    def __init__(self) -> None:
        self.repository = AchievementRepository()

    def list_public(self, db: Session) -> list[Achievement]:
        return self.repository.list_published(db)

    def create(self, db: Session, payload: AchievementCreate) -> Achievement:
        return self.repository.create(db, Achievement(**payload.model_dump()))

    def update(self, db: Session, item_id: int, payload: AchievementUpdate) -> Achievement:
        item = self.repository.get(db, item_id)
        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Achievement not found.")

        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(item, key, value)
        db.commit()
        db.refresh(item)
        return item

    def delete(self, db: Session, item_id: int) -> None:
        item = self.repository.get(db, item_id)
        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Achievement not found.")
        self.repository.delete(db, item)
