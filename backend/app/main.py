import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import achievements, experiences, github_import, projects
from .core.config import get_settings
from .db import init_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    logger.info("Content API database initialized.")
    yield


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title="Personal Portfolio Content API", lifespan=lifespan)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(experiences.router, prefix="/api")
    app.include_router(projects.router, prefix="/api")
    app.include_router(achievements.router, prefix="/api")
    app.include_router(github_import.router, prefix="/api")

    return app


app = create_app()
