from sqlalchemy import select
from sqlalchemy.orm import Session
from ..model.achievement import Achievement


class AchievementRepository:
    def list_published(self, db: Session) -> list[Achievement]:
        return list(db.scalars(select(Achievement).where(Achievement.is_published.is_(True)).order_by(Achievement.sort_order)))

    def get(self, db: Session, item_id: int) -> Achievement | None:
        return db.get(Achievement, item_id)

    def create(self, db: Session, item: Achievement) -> Achievement:
        db.add(item)
        db.commit()
        db.refresh(item)
        return item

    def delete(self, db: Session, item: Achievement) -> None:
        db.delete(item)
        db.commit()
