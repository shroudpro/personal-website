from sqlalchemy import select
from sqlalchemy.orm import Session
from ..model.experience import Experience


class ExperienceRepository:
    def list_published(self, db: Session) -> list[Experience]:
        return list(db.scalars(select(Experience).where(Experience.is_published.is_(True)).order_by(Experience.sort_order)))

    def get(self, db: Session, item_id: int) -> Experience | None:
        return db.get(Experience, item_id)

    def create(self, db: Session, item: Experience) -> Experience:
        db.add(item)
        db.commit()
        db.refresh(item)
        return item

    def delete(self, db: Session, item: Experience) -> None:
        db.delete(item)
        db.commit()
