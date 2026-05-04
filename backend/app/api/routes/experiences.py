from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session
from ..deps import get_session
from ...core.security import verify_write_token
from ...schema.experience import ExperienceCreate, ExperienceRead, ExperienceUpdate
from ...service.experience_service import ExperienceService

router = APIRouter(prefix="/experiences", tags=["experiences"])
service = ExperienceService()


@router.get("", response_model=list[ExperienceRead])
def list_experiences(db: Session = Depends(get_session)):
    return service.list_public(db)


@router.post("", response_model=ExperienceRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(verify_write_token)])
def create_experience(payload: ExperienceCreate, db: Session = Depends(get_session)):
    return service.create(db, payload)


@router.patch("/{item_id}", response_model=ExperienceRead, dependencies=[Depends(verify_write_token)])
def update_experience(item_id: int, payload: ExperienceUpdate, db: Session = Depends(get_session)):
    return service.update(db, item_id, payload)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(verify_write_token)])
def delete_experience(item_id: int, db: Session = Depends(get_session)):
    service.delete(db, item_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
