from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select, func
from typing import Any, Optional
from datetime import date

from app.database import get_session
from app.models.user import AdminUser
from app.models.booking import Booking
from app.models.station import Station
from app.models.tournament import Tournament
from app.models.menu import FoodItem
from app.models.announcement import Announcement, AuditLog
from app.auth.jwt_handler import get_current_admin, require_roles
from app.services.booking_service import BookingService
from app.services.tournament_service import TournamentService

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/dashboard")
def dashboard(admin: AdminUser = Depends(require_roles("SUPER_ADMIN", "MANAGER", "RECEPTION")), session: Session = Depends(get_session)) -> Any:
    today = date.today()
    bookings_today = session.exec(select(Booking).where(Booking.booking_date == today)).all()
    revenue = sum([b.total_amount for b in bookings_today if b.status in ['CONFIRMED', 'CHECKED_IN', 'COMPLETED']])
    
    stations = session.exec(select(Station)).all()
    available = len([s for s in stations if s.status == 'available'])
    occupied = len([s for s in stations if s.status == 'occupied'])
    maintenance = len([s for s in stations if s.status == 'maintenance'])
    
    return {
        "today_bookings_count": len(bookings_today),
        "today_revenue": revenue,
        "stations": {
            "total": len(stations),
            "available": available,
            "occupied": occupied,
            "maintenance": maintenance
        }
    }

@router.get("/bookings")
def get_bookings(
    page: int = 1, limit: int = 20, status: Optional[str] = None,
    admin: AdminUser = Depends(get_current_admin), session: Session = Depends(get_session)
) -> Any:
    query = select(Booking)
    if status:
        query = query.where(Booking.status == status)
    total = len(session.exec(query).all())
    bookings = session.exec(query.offset((page-1)*limit).limit(limit)).all()
    return {"data": bookings, "total": total, "page": page, "limit": limit}

@router.get("/bookings/{booking_id}")
def get_booking(booking_id: str, admin: AdminUser = Depends(get_current_admin), session: Session = Depends(get_session)) -> Any:
    booking = session.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Not found")
    return booking

@router.patch("/bookings/{booking_id}")
def update_booking(booking_id: str, status: Optional[str] = None, admin_notes: Optional[str] = None, admin: AdminUser = Depends(get_current_admin), session: Session = Depends(get_session)) -> Any:
    booking = session.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Not found")
    if status:
        booking.status = status
    if admin_notes:
        booking.admin_notes = admin_notes
    session.add(booking)
    session.commit()
    session.refresh(booking)
    return booking

@router.post("/bookings/{booking_id}/checkin")
def checkin_booking(booking_id: str, admin: AdminUser = Depends(require_roles("SUPER_ADMIN", "RECEPTION")), session: Session = Depends(get_session)) -> Any:
    return BookingService.check_in(booking_id, admin.id, session)

@router.get("/stations")
def get_admin_stations(admin: AdminUser = Depends(get_current_admin), session: Session = Depends(get_session)) -> Any:
    return session.exec(select(Station)).all()

@router.patch("/stations/{station_id}")
def update_station(station_id: int, status: str, admin: AdminUser = Depends(get_current_admin), session: Session = Depends(get_session)) -> Any:
    station = session.get(Station, station_id)
    if station:
        station.status = status
        session.add(station)
        session.commit()
        session.refresh(station)
    return station

@router.get("/tournaments")
def admin_tournaments(admin: AdminUser = Depends(get_current_admin), session: Session = Depends(get_session)) -> Any:
    return session.exec(select(Tournament)).all()

@router.post("/tournaments")
def create_tournament(data: dict, admin: AdminUser = Depends(require_roles("SUPER_ADMIN", "MANAGER")), session: Session = Depends(get_session)) -> Any:
    return TournamentService.create_tournament(data, admin.id, session)

@router.patch("/tournaments/{tournament_id}/status")
def update_tournament_status(tournament_id: int, status: str, admin: AdminUser = Depends(require_roles("SUPER_ADMIN", "MANAGER")), session: Session = Depends(get_session)) -> Any:
    return TournamentService.update_status(tournament_id, status, admin.id, session)

@router.get("/menu")
def admin_menu(admin: AdminUser = Depends(get_current_admin), session: Session = Depends(get_session)) -> Any:
    return session.exec(select(FoodItem)).all()

@router.get("/announcements")
def admin_announcements(admin: AdminUser = Depends(get_current_admin), session: Session = Depends(get_session)) -> Any:
    return session.exec(select(Announcement)).all()

@router.get("/audit-logs")
def get_audit_logs(admin: AdminUser = Depends(require_roles("SUPER_ADMIN")), session: Session = Depends(get_session)) -> Any:
    return session.exec(select(AuditLog).order_by(AuditLog.created_at.desc()).limit(100)).all()
