from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import Any
import json
from datetime import datetime

from app.database import get_session
from app.models.branch import Branch, Zone

router = APIRouter(prefix="/branches", tags=["branches"])

@router.get("/")
def get_branches(session: Session = Depends(get_session)) -> Any:
    return session.exec(select(Branch).where(Branch.status == 'active')).all()

@router.get("/{branch_id}/zones")
def get_zones(branch_id: int, session: Session = Depends(get_session)) -> Any:
    return session.exec(select(Zone).where(Zone.branch_id == branch_id).where(Zone.status == 'active')).all()

@router.get("/{branch_id}/is-open")
def is_branch_open(branch_id: int, session: Session = Depends(get_session)) -> Any:
    branch = session.get(Branch, branch_id)
    if not branch or branch.status != 'active':
        return {"is_open": False, "reason": "Branch inactive or not found"}
        
    now = datetime.utcnow()
    # Basic check against closed days and holidays
    # Note: timezone logic would normally be used here
    try:
        closed_days = json.loads(branch.closed_days)
        holidays = json.loads(branch.holiday_dates)
    except:
        closed_days = []
        holidays = []
        
    day_name = now.strftime('%A')
    date_str = now.strftime('%Y-%m-%d')
    
    if day_name in closed_days or date_str in holidays:
        return {"is_open": False, "reason": "Holiday/Closed Day"}
        
    # Check time (ignoring TZ complexity for this stub)
    current_time_str = now.strftime('%H:%M')
    is_open_time = branch.opening_time <= current_time_str <= branch.closing_time
    if branch.closing_time < branch.opening_time: # closes past midnight
        is_open_time = current_time_str >= branch.opening_time or current_time_str <= branch.closing_time
        
    return {"is_open": is_open_time}
