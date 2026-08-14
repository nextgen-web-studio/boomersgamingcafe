from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Announcement(SQLModel, table=True):
    __tablename__ = 'announcements'
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=200)
    message: str
    type: str = Field(max_length=20)  # OFFER/HAPPY_HOUR/TOURNAMENT/CLOSURE/MAINTENANCE/GENERAL
    image_url: Optional[str] = Field(default=None, max_length=500)
    start_date: datetime
    end_date: Optional[datetime] = Field(default=None)
    is_active: bool = Field(default=True)
    priority: int = Field(default=0)
    branch_id: Optional[int] = Field(default=None, foreign_key='branches.id')
    created_by: int = Field(foreign_key='admin_users.id')
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AuditLog(SQLModel, table=True):
    __tablename__ = 'audit_logs'
    id: Optional[int] = Field(default=None, primary_key=True)
    admin_user_id: Optional[int] = Field(default=None, foreign_key='admin_users.id')
    customer_user_id: Optional[int] = Field(default=None, foreign_key='users.id')
    action: str = Field(max_length=50)  # BOOKING_CREATED, etc.
    entity_type: str = Field(max_length=50)
    entity_id: str = Field(max_length=50)
    old_value: Optional[str] = Field(default=None)  # JSON
    new_value: Optional[str] = Field(default=None)  # JSON
    ip_address: Optional[str] = Field(default=None, max_length=45)
    created_at: datetime = Field(default_factory=datetime.utcnow)
