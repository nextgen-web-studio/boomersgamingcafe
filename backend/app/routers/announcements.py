from fastapi import APIRouter, Depends
from sqlmodel import Session, select, or_
from typing import Any
from datetime import datetime

from app.database import get_session
from app.models.announcement import Announcement

router = APIRouter(prefix="/announcements", tags=["announcements"])

@router.get("/")
def get_announcements(session: Session = Depends(get_session)) -> Any:
    now = datetime.utcnow()
    query = select(Announcement).where(
        Announcement.is_active == True,
        Announcement.start_date <= now,
        or_(Announcement.end_date > now, Announcement.end_date == None)
    ).order_by(Announcement.priority.desc())
    return session.exec(query).all()
