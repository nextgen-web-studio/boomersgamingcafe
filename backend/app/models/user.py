from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class User(SQLModel, table=True):
    __tablename__ = 'users'
    id: Optional[int] = Field(default=None, primary_key=True)
    phone: str = Field(unique=True, index=True, max_length=15)
    name: Optional[str] = Field(default=None, max_length=100)
    email: Optional[str] = Field(default=None, unique=True, max_length=255)
    status: str = Field(default='active', max_length=20)  # active/suspended/blocked
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = Field(default=None)

class OTPRecord(SQLModel, table=True):
    __tablename__ = 'otp_records'
    id: Optional[int] = Field(default=None, primary_key=True)
    phone: str = Field(index=True, max_length=15)
    otp_hash: str = Field(max_length=255)
    expires_at: datetime
    attempts: int = Field(default=0)
    max_attempts: int = Field(default=3)
    is_verified: bool = Field(default=False)
    is_used: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AdminUser(SQLModel, table=True):
    __tablename__ = 'admin_users'
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, max_length=50)
    email: str = Field(unique=True, max_length=255)
    password_hash: str = Field(max_length=255)
    full_name: str = Field(max_length=100)
    role: str = Field(max_length=20)  # SUPER_ADMIN/MANAGER/RECEPTION/KITCHEN/STAFF
    branch_id: Optional[int] = Field(default=None, foreign_key='branches.id')
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = Field(default=None)
