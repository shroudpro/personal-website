from sqlalchemy import select
from sqlalchemy.orm import Session
from ..model.project import Project


class ProjectRepository:
    def list_published(self, db: Session) -> list[Project]:
        return list(db.scalars(select(Project).where(Project.is_published.is_(True)).order_by(Project.sort_order)))

    def get(self, db: Session, item_id: int) -> Project | None:
        return db.get(Project, item_id)

    def get_by_slug(self, db: Session, slug: str) -> Project | None:
        return db.scalar(select(Project).where(Project.slug == slug, Project.is_published.is_(True)))

    def create(self, db: Session, item: Project) -> Project:
        db.add(item)
        db.commit()
        db.refresh(item)
        return item

    def delete(self, db: Session, item: Project) -> None:
        db.delete(item)
        db.commit()
