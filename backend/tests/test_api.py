from collections.abc import Generator
from pathlib import Path
import sys
from uuid import uuid4

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

sys.path.append(str(Path(__file__).resolve().parents[1]))

from app.api.deps import get_session
from app.core.config import get_settings
from app.db import Base
from app.main import create_app


def create_test_client(monkeypatch) -> TestClient:
    monkeypatch.setenv("API_WRITE_TOKEN", "test-write-token")
    get_settings.cache_clear()

    db_dir = Path(__file__).resolve().parent / "runtime"
    db_dir.mkdir(exist_ok=True)
    db_path = db_dir / f"test-{uuid4().hex}.db"
    engine = create_engine(f"sqlite:///{db_path}", connect_args={"check_same_thread": False})
    TestingSessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    Base.metadata.create_all(bind=engine)

    def override_session() -> Generator[Session, None, None]:
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app = create_app()
    app.dependency_overrides[get_session] = override_session
    return TestClient(app)


def auth_headers() -> dict[str, str]:
    return {"Authorization": "Bearer test-write-token"}


def test_public_get_endpoints_return_lists(monkeypatch):
    client = create_test_client(monkeypatch)

    assert client.get("/api/experiences").status_code == 200
    assert client.get("/api/projects").status_code == 200
    assert client.get("/api/achievements").status_code == 200
    assert client.get("/api/experiences").json() == []


def test_write_endpoint_requires_token(monkeypatch):
    client = create_test_client(monkeypatch)

    response = client.post(
        "/api/experiences",
        json={
            "period": "2026",
            "role": "Developer",
            "org": "Private Portfolio",
            "description": "Token protected write endpoint.",
        },
    )

    assert response.status_code == 401


def test_write_endpoint_creates_experience_with_token(monkeypatch):
    client = create_test_client(monkeypatch)

    create_response = client.post(
        "/api/experiences",
        headers=auth_headers(),
        json={
            "period": "2026",
            "role": "Developer",
            "org": "Private Portfolio",
            "description": "Token protected write endpoint.",
            "sortOrder": 1,
            "isPublished": True,
        },
    )

    assert create_response.status_code == 201
    assert create_response.json()["role"] == "Developer"
    list_response = client.get("/api/experiences")
    assert list_response.json()[0]["role"] == "Developer"


def test_github_import_rejects_invalid_repo_url(monkeypatch):
    client = create_test_client(monkeypatch)

    response = client.post(
        "/api/projects/import/github",
        headers=auth_headers(),
        json={"repoUrl": "https://example.com/not/github"},
    )

    assert response.status_code == 422
    assert "GitHub repository URL" in response.json()["detail"]
