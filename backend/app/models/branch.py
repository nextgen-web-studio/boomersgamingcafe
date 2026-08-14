from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Branch(SQLModel, table=True):
    __tablename__ = 'branches'
    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(unique=True, max_length=50)
    name: str = Field(max_length=100)
    address: str = Field(max_length=500)
    phone: str = Field(max_length=20)
    email: Optional[str] = Field(default=None, max_length=255)
    opening_time: str = Field(max_length=5)  # HH:MM
    closing_time: str = Field(max_length=5)  # HH:MM
    closed_days: str = Field(default='[]')   # JSON string list of day names
    holiday_dates: str = Field(default='[]') # JSON string list of YYYY-MM-DD
    status: str = Field(default='active', max_length=20)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Zone(SQLModel, table=True):
    __tablename__ = 'zones'
    id: Optional[int] = Field(default=None, primary_key=True)
    branch_id: int = Field(foreign_key='branches.id')
    slug: str = Field(max_length=50)
    name: str = Field(max_length=100)
    description: Optional[str] = Field(default=None)
    capacity: int = Field(default=10)
    min_duration_minutes: int = Field(default=60)
    max_duration_minutes: int = Field(default=240)
    base_price_per_hour: float = Field(default=100.0)
    icon: Optional[str] = Field(default=None, max_length=10)
    color: Optional[str] = Field(default=None, max_length=20)
    status: str = Field(default='active', max_length=20)
    sort_order: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
