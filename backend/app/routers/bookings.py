from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import Any, Optional, List

from app.database import get_session
from app.models.user import User, AdminUser
from app.models.booking import Booking
from app.auth.jwt_handler import get_current_user, get_current_admin
from app.services.booking_service import BookingService

router = APIRouter(prefix="/bookings", tags=["bookings"])

class CreateBookingRequest(BaseModel):
    hold_id: str
    food_items: List[str] = []
    special_request: Optional[str] = None
    promo_code: Optional[str] = None

class CancelRequest(BaseModel):
    reason: str

@router.post("/")
def create_booking(req: CreateBookingRequest, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> Any:
    return BookingService.confirm_booking(req.hold_id, current_user.id, req.food_items, req.special_request, req.promo_code, session)

@router.get("/my")
def get_my_bookings(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> Any:
    return session.exec(select(Booking).where(Booking.user_id == current_user.id).order_by(Booking.created_at.desc())).all()

@router.get("/{booking_id}")
def get_booking(booking_id: str, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> Any:
    booking = session.get(Booking, booking_id)
    if not booking or booking.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.get("/verify/{token}")
def verify_booking(token: str, admin: AdminUser = Depends(get_current_admin), session: Session = Depends(get_session)) -> Any:
    booking = session.exec(select(Booking).where(Booking.verification_token == token)).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Invalid token")
    return booking

@router.patch("/{booking_id}/cancel")
def cancel_booking(booking_id: str, req: CancelRequest, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> Any:
    booking = session.get(Booking, booking_id)
    if not booking or booking.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Booking not found")
    return BookingService.cancel_booking(booking_id, req.reason, current_user.id, session)
