from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import Any, Optional

from app.database import get_session
from app.models.station import Station

router = APIRouter(prefix="/stations", tags=["stations"])

@router.get("/")
def get_stations(branch_id: Optional[int] = None, zone_id: Optional[int] = None, status: Optional[str] = None, session: Session = Depends(get_session)) -> Any:
    query = select(Station)
    if branch_id:
        query = query.where(Station.branch_id == branch_id)
    if zone_id:
        query = query.where(Station.zone_id == zone_id)
    if status:
        query = query.where(Station.status == status)
    return session.exec(query).all()

@router.get("/{station_id}")
def get_station(station_id: int, session: Session = Depends(get_session)) -> Any:
    station = session.get(Station, station_id)
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    return station
