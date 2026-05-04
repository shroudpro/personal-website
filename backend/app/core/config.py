from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    从环境变量读取运行配置，生产环境应显式提供 PostgreSQL DATABASE_URL。
    """

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = Field(default="sqlite:///./portfolio.db", alias="DATABASE_URL")
    api_write_token: str | None = Field(default=None, alias="API_WRITE_TOKEN")
    github_token: str | None = Field(default=None, alias="GITHUB_TOKEN")
    cors_origins: str = Field(default="http://localhost:5173,http://127.0.0.1:5173", alias="CORS_ORIGINS")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
