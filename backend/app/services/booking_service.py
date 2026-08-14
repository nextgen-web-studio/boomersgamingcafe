import uuid
from datetime import datetime, timedelta, date
from sqlmodel import Session, select, or_, and_
from fastapi import HTTPException
from app.models.booking import Booking, BookingHold
from app.models.station import Station
from app.models.branch import Zone
from app.config import settings

class BookingService:
    @staticmethod
    def calculate_price(zone: Zone, station: Station, duration_minutes: int, food_items: list, promo_code: str, session: Session) -> dict:
        hours = duration_minutes / 60.0
        gaming_amount = (station.base_price_override or zone.base_price_per_hour) * hours
        
        food_amount = 0.0 # Calculate from food_items if implemented
        discount_amount = 0.0 # Calculate from promo_code if implemented
        
        subtotal = gaming_amount + food_amount - discount_amount
        tax_amount = subtotal * 0.18 # 18% GST
        
        return {
            "gaming_amount": round(gaming_amount, 2),
            "food_amount": round(food_amount, 2),
            "discount_amount": round(discount_amount, 2),
            "tax_amount": round(tax_amount, 2),
            "total_amount": round(subtotal + tax_amount, 2),
            "breakdown": []
        }

    @staticmethod
    def check_availability(station_id: int, start_dt: datetime, end_dt: datetime, session: Session) -> bool:
        # Check active holds
        holds = session.exec(
            select(BookingHold)
            .where(BookingHold.station_id == station_id)
            .where(BookingHold.status == 'active')
            .where(BookingHold.expires_at > datetime.utcnow())
            .where(
                or_(
                    and_(BookingHold.start_datetime < end_dt, BookingHold.end_datetime > start_dt)
                )
            )
        ).all()
        if holds: return False
        
        # Check bookings
        bookings = session.exec(
            select(Booking)
            .where(Booking.station_id == station_id)
            .where(Booking.status.in_(['CONFIRMED', 'CHECKED_IN']))
            .where(Booking.booking_date == start_dt.date())
        ).all()
        
        for b in bookings:
            b_start = datetime.combine(b.booking_date, datetime.strptime(b.start_time, "%H:%M").time())
            b_end = datetime.combine(b.booking_date, datetime.strptime(b.end_time, "%H:%M").time())
            if b_start < end_dt and b_end > start_dt:
                return False
                
        return True

    @classmethod
    def create_hold(cls, user_id: int, station_id: int, start_dt: datetime, end_dt: datetime, session: Session) -> BookingHold:
        cls.expire_holds(session)
        if not cls.check_availability(station_id, start_dt, end_dt, session):
            raise HTTPException(status_code=409, detail="Station not available for this time slot")
            
        hold = BookingHold(
            id=str(uuid.uuid4()),
            station_id=station_id,
            user_id=user_id,
            start_datetime=start_dt,
            end_datetime=end_dt,
            expires_at=datetime.utcnow() + timedelta(minutes=settings.BOOKING_HOLD_MINUTES)
        )
        session.add(hold)
        session.commit()
        session.refresh(hold)
        return hold

    @staticmethod
    def release_hold(hold_id: str, session: Session):
        hold = session.get(BookingHold, hold_id)
        if hold and hold.status == 'active':
            hold.status = 'released'
            session.add(hold)
            session.commit()

    @staticmethod
    def expire_holds(session: Session):
        active_expired = session.exec(
            select(BookingHold)
            .where(BookingHold.status == 'active')
            .where(BookingHold.expires_at <= datetime.utcnow())
        ).all()
        for h in active_expired:
            h.status = 'expired'
            session.add(h)
        if active_expired:
            session.commit()

    @staticmethod
    def generate_booking_id(session: Session) -> str:
        today = date.today()
        count = session.exec(
            select(Booking).where(Booking.booking_date == today)
        ).all()
        return f"BMR-{today.year}-{(len(count) + 1):06d}"

    @classmethod
    def confirm_booking(cls, hold_id: str, user_id: int, food_items: list, special_request: str, promo_code: str, session: Session) -> Booking:
        hold = session.get(BookingHold, hold_id)
        if not hold or hold.status != 'active' or hold.user_id != user_id:
            raise HTTPException(status_code=400, detail="Invalid or expired hold")
            
        station = session.get(Station, hold.station_id)
        zone = session.get(Zone, station.zone_id)
        duration = int((hold.end_datetime - hold.start_datetime).total_seconds() / 60)
        
        pricing = cls.calculate_price(zone, station, duration, food_items, promo_code, session)
        
        booking = Booking(
            id=cls.generate_booking_id(session),
            hold_id=hold_id,
            user_id=user_id,
            station_id=station.id,
            branch_id=station.branch_id,
            zone_id=zone.id,
            booking_date=hold.start_datetime.date(),
            start_time=hold.start_datetime.strftime("%H:%M"),
            end_time=hold.end_datetime.strftime("%H:%M"),
            duration_minutes=duration,
            status='CONFIRMED',
            gaming_amount=pricing['gaming_amount'],
            food_amount=pricing['food_amount'],
            discount_amount=pricing['discount_amount'],
            tax_amount=pricing['tax_amount'],
            total_amount=pricing['total_amount'],
            verification_token=str(uuid.uuid4()),
            special_request=special_request,
            promo_code=promo_code
        )
        
        hold.status = 'converted'
        session.add(hold)
        session.add(booking)
        session.commit()
        session.refresh(booking)
        return booking

    @staticmethod
    def cancel_booking(booking_id: str, reason: str, user_id: int, session: Session) -> Booking:
        booking = session.get(Booking, booking_id)
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        booking.status = 'CANCELLED'
        booking.cancellation_reason = reason
        booking.cancelled_at = datetime.utcnow()
        session.add(booking)
        session.commit()
        session.refresh(booking)
        return booking

    @staticmethod
    def check_in(booking_id: str, admin_user_id: int, session: Session) -> Booking:
        booking = session.get(Booking, booking_id)
        if not booking or booking.status != 'CONFIRMED':
            raise HTTPException(status_code=400, detail="Booking cannot be checked in")
        if booking.booking_date != date.today():
            raise HTTPException(status_code=400, detail="Can only check in on booking date")
            
        booking.status = 'CHECKED_IN'
        booking.checked_in_at = datetime.utcnow()
        session.add(booking)
        session.commit()
        session.refresh(booking)
        return booking
