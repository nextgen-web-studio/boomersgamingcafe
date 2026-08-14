from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from pydantic import BaseModel
from typing import Any
from datetime import datetime, timedelta

from app.database import get_session
from app.models.user import User
from app.auth.jwt_handler import get_current_user
from app.services.booking_service import BookingService
from app.models.station import Station
from app.models.branch import Branch

router = APIRouter(prefix="/availability", tags=["availability"])

class HoldRequest(BaseModel):
    station_id: int
    start_datetime: datetime
    end_datetime: datetime

@router.get("/time-slots")
def get_time_slots(station_id: int, date: str, duration_minutes: int, session: Session = Depends(get_session)) -> Any:
    station = session.get(Station, station_id)
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
        
    branch = session.get(Branch, station.branch_id)
    # Generate hourly slots from branch.opening_time to branch.closing_time
    slots = []
    # simplified slot generation
    try:
        start_t = datetime.strptime(branch.opening_time, "%H:%M")
        end_t = datetime.strptime(branch.closing_time, "%H:%M")
        if end_t < start_t:
            end_t += timedelta(days=1)
            
        current = start_t
        while current + timedelta(minutes=duration_minutes) <= end_t:
            st_str = current.strftime("%H:%M")
            start_dt = datetime.strptime(f"{date} {st_str}", "%Y-%m-%d %H:%M")
            end_dt = start_dt + timedelta(minutes=duration_minutes)
            
            avail = BookingService.check_availability(station_id, start_dt, end_dt, session)
            slots.append({
                "time": st_str,
                "label": current.strftime("%I:%M %p"),
                "available": avail
            })
            current += timedelta(hours=1)
    except Exception as e:
        pass
    
    return slots

@router.post("/holds")
def create_hold(req: HoldRequest, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> Any:
    return BookingService.create_hold(current_user.id, req.station_id, req.start_datetime, req.end_datetime, session)

@router.delete("/holds/{hold_id}")
def release_hold(hold_id: str, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> Any:
    BookingService.release_hold(hold_id, session)
    return {"message": "Hold released"}
