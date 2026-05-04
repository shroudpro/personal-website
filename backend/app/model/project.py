from datetime import datetime, timezone
from sqlalchemy import Boolean, DateTime, Integer, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from ..db import Base


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(180))
    type: Mapped[str] = mapped_column(String(120), default="Project")
    summary: Mapped[str] = mapped_column(Text)
    overview: Mapped[str] = mapped_column(Text, default="")
    role_items: Mapped[list[str]] = mapped_column(JSON, default=list)
    features: Mapped[list[str]] = mapped_column(JSON, default=list)
    tech_stack: Mapped[list[str]] = mapped_column(JSON, default=list)
    challenges: Mapped[list[dict[str, str]]] = mapped_column(JSON, default=list)
    result: Mapped[str] = mapped_column(Text, default="")
    cover_doodle: Mapped[str] = mapped_column(String(240), default="/images/doodles/browser-plant.png")
    github_url: Mapped[str | None] = mapped_column(String(300), nullable=True)
    demo_url: Mapped[str | None] = mapped_column(String(300), nullable=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    is_published: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    @property
    def links(self) -> dict[str, str | None]:
        return {
            "github": self.github_url,
            "demo": self.demo_url,
        }
