from collections.abc import Generator
from sqlalchemy.orm import Session
from ..db import get_db


def get_session() -> Generator[Session, None, None]:
    yield from get_db()
