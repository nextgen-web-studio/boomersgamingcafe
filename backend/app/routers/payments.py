from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from pydantic import BaseModel
from typing import Any, List, Optional
from datetime import datetime

from app.database import get_session
from app.models.user import User
from app.models.booking import BookingHold, Payment
from app.models.station import Station
from app.models.branch import Zone
from app.auth.jwt_handler import get_current_user
from app.services.booking_service import BookingService
from app.services.payment_service import PaymentService
from app.config import settings

router = APIRouter(prefix="/payments", tags=["payments"])
payment_service = PaymentService()

class CreateOrderRequest(BaseModel):
    hold_id: str
    food_items: List[str] = []

class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    hold_id: str
    food_items: List[str] = []
    special_request: Optional[str] = None

@router.post("/create-order")
def create_order(req: CreateOrderRequest, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> Any:
    hold = session.get(BookingHold, req.hold_id)
    if not hold or hold.user_id != current_user.id or hold.status != 'active':
        raise HTTPException(status_code=400, detail="Invalid hold")
        
    station = session.get(Station, hold.station_id)
    zone = session.get(Zone, station.zone_id)
    duration = int((hold.end_datetime - hold.start_datetime).total_seconds() / 60)
    
    pricing = BookingService.calculate_price(zone, station, duration, req.food_items, "", session)
    amount_paise = int(pricing['total_amount'] * 100)
    
    order = payment_service.create_order(amount_paise, "INR", req.hold_id)
    hold.razorpay_order_id = order['id']
    session.add(hold)
    session.commit()
    
    return {
        "razorpay_order_id": order['id'],
        "razorpay_key": settings.RAZORPAY_KEY_ID,
        "amount": amount_paise,
        "currency": "INR"
    }

@router.post("/verify")
def verify_payment(req: VerifyPaymentRequest, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> Any:
    if not payment_service.verify_signature(req.razorpay_order_id, req.razorpay_payment_id, req.razorpay_signature):
        raise HTTPException(status_code=400, detail="Invalid signature")
        
    booking = BookingService.confirm_booking(req.hold_id, current_user.id, req.food_items, req.special_request, "", session)
    
    payment = Payment(
        booking_id=booking.id,
        razorpay_order_id=req.razorpay_order_id,
        razorpay_payment_id=req.razorpay_payment_id,
        razorpay_signature=req.razorpay_signature,
        amount=booking.total_amount,
        status='SUCCESS'
    )
    session.add(payment)
    session.commit()
    
    return booking
