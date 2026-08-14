from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date, datetime

class Station(SQLModel, table=True):
    __tablename__ = 'stations'
    id: Optional[int] = Field(default=None, primary_key=True)
    zone_id: int = Field(foreign_key='zones.id')
    branch_id: int = Field(foreign_key='branches.id')
    name: str = Field(max_length=50)
    display_name: str = Field(max_length=100)
    hardware_specs: Optional[str] = Field(default=None)  # JSON
    base_price_override: Optional[float] = Field(default=None)
    status: str = Field(default='available', max_length=20)
    current_game: Optional[str] = Field(default=None, max_length=100)
    sort_order: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PricingRule(SQLModel, table=True):
    __tablename__ = 'pricing_rules'
    id: Optional[int] = Field(default=None, primary_key=True)
    zone_id: Optional[int] = Field(default=None, foreign_key='zones.id')
    station_id: Optional[int] = Field(default=None, foreign_key='stations.id')
    branch_id: Optional[int] = Field(default=None, foreign_key='branches.id')
    name: str = Field(max_length=100)
    rule_type: str = Field(max_length=20)  # peak/off_peak/weekend/holiday/special
    price_per_hour: Optional[float] = Field(default=None)
    multiplier: float = Field(default=1.0)
    start_time: Optional[str] = Field(default=None, max_length=5)
    end_time: Optional[str] = Field(default=None, max_length=5)
    days_of_week: Optional[str] = Field(default=None)  # JSON
    start_date: Optional[date] = Field(default=None)
    end_date: Optional[date] = Field(default=None)
    is_active: bool = Field(default=True)
    priority: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
