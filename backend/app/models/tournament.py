from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date, datetime

class Tournament(SQLModel, table=True):
    __tablename__ = 'tournaments'
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=200)
    game: str = Field(max_length=100)
    description: Optional[str] = Field(default=None)
    poster_url: Optional[str] = Field(default=None, max_length=500)
    branch_id: Optional[int] = Field(default=None, foreign_key='branches.id')
    venue: Optional[str] = Field(default=None, max_length=200)
    event_date: Optional[date] = Field(default=None)
    start_time: Optional[str] = Field(default=None, max_length=5)
    end_time: Optional[str] = Field(default=None, max_length=5)
    registration_open: Optional[datetime] = Field(default=None)
    registration_close: Optional[datetime] = Field(default=None)
    format: Optional[str] = Field(default=None, max_length=20)  # SOLO/DUO/SQUAD/TEAM
    max_participants: Optional[int] = Field(default=None)
    current_participants: int = Field(default=0)
    entry_fee: float = Field(default=0.0)
    prize_pool: Optional[str] = Field(default=None, max_length=200)
    rules: Optional[str] = Field(default=None)
    organizer: Optional[str] = Field(default=None, max_length=100)
    contact_info: Optional[str] = Field(default=None, max_length=200)
    registration_url: Optional[str] = Field(default=None, max_length=500)
    live_stream_url: Optional[str] = Field(default=None, max_length=500)
    watch_count: int = Field(default=0)
    winner: Optional[str] = Field(default=None, max_length=200)
    results: Optional[str] = Field(default=None)
    status: str = Field(default='DRAFT', max_length=30)
    admin_override_status: Optional[str] = Field(default=None, max_length=30)
    is_published: bool = Field(default=False)
    created_by: int = Field(foreign_key='admin_users.id')
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TournamentRegistration(SQLModel, table=True):
    __tablename__ = 'tournament_registrations'
    id: Optional[int] = Field(default=None, primary_key=True)
    tournament_id: int = Field(foreign_key='tournaments.id')
    user_id: int = Field(foreign_key='users.id')
    team_name: Optional[str] = Field(default=None, max_length=100)
    player_details: str = Field(default='{}')  # JSON
    payment_id: Optional[int] = Field(default=None, foreign_key='payments.id')
    registration_id: str = Field(unique=True, max_length=20)  # BGC-REG-XXXXXX
    status: str = Field(default='PENDING', max_length=20)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
