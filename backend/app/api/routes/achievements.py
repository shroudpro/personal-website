from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session
from ..deps import get_session
from ...core.security import verify_write_token
from ...schema.achievement import AchievementCreate, AchievementRead, AchievementUpdate
from ...service.achievement_service import AchievementService

router = APIRouter(prefix="/achievements", tags=["achievements"])
service = AchievementService()


@router.get("", response_model=list[AchievementRead])
def list_achievements(db: Session = Depends(get_session)):
    return service.list_public(db)


@router.post("", response_model=AchievementRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(verify_write_token)])
def create_achievement(payload: AchievementCreate, db: Session = Depends(get_session)):
    return service.create(db, payload)


@router.patch("/{item_id}", response_model=AchievementRead, dependencies=[Depends(verify_write_token)])
def update_achievement(item_id: int, payload: AchievementUpdate, db: Session = Depends(get_session)):
    return service.update(db, item_id, payload)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(verify_write_token)])
def delete_achievement(item_id: int, db: Session = Depends(get_session)):
    service.delete(db, item_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
