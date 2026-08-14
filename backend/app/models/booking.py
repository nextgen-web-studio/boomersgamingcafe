from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date, datetime

class BookingHold(SQLModel, table=True):
    __tablename__ = 'booking_holds'
    id: str = Field(primary_key=True, max_length=36)  # UUID
    station_id: int = Field(foreign_key='stations.id')
    start_datetime: datetime
    end_datetime: datetime
    user_id: int = Field(foreign_key='users.id')
    expires_at: datetime
    status: str = Field(default='active', max_length=20)  # active/expired/converted/released
    razorpay_order_id: Optional[str] = Field(default=None, max_length=100)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Booking(SQLModel, table=True):
    __tablename__ = 'bookings'
    id: str = Field(primary_key=True, max_length=20)  # BMR-YYYY-NNNNNN
    hold_id: Optional[str] = Field(default=None, max_length=36)
    user_id: int = Field(foreign_key='users.id')
    station_id: int = Field(foreign_key='stations.id')
    branch_id: int = Field(foreign_key='branches.id')
    zone_id: int = Field(foreign_key='zones.id')
    booking_date: date
    start_time: str = Field(max_length=5)  # HH:MM
    end_time: str = Field(max_length=5)
    duration_minutes: int
    status: str = Field(default='PENDING', max_length=20)
    gaming_amount: float
    food_amount: float = Field(default=0.0)
    discount_amount: float = Field(default=0.0)
    tax_amount: float
    total_amount: float
    verification_token: str = Field(unique=True, max_length=36)  # UUID for QR
    special_request: Optional[str] = Field(default=None)
    promo_code: Optional[str] = Field(default=None, max_length=50)
    cancellation_reason: Optional[str] = Field(default=None)
    cancelled_at: Optional[datetime] = Field(default=None)
    checked_in_at: Optional[datetime] = Field(default=None)
    admin_notes: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Payment(SQLModel, table=True):
    __tablename__ = 'payments'
    id: Optional[int] = Field(default=None, primary_key=True)
    booking_id: str = Field(foreign_key='bookings.id', max_length=20)
    razorpay_order_id: str = Field(unique=True, max_length=100)
    razorpay_payment_id: Optional[str] = Field(default=None, max_length=100)
    razorpay_signature: Optional[str] = Field(default=None, max_length=255)
    amount: float
    currency: str = Field(default='INR', max_length=3)
    status: str = Field(default='CREATED', max_length=20)
    failure_reason: Optional[str] = Field(default=None)
    refund_id: Optional[str] = Field(default=None, max_length=100)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
