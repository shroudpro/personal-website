from fastapi import Header, HTTPException, status
from .config import get_settings


def verify_write_token(authorization: str | None = Header(default=None)) -> None:
    settings = get_settings()
    if not settings.api_write_token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="API_WRITE_TOKEN is not configured.",
        )

    expected = f"Bearer {settings.api_write_token}"
    if authorization != expected:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid write token.",
        )
