import os
from sqlmodel import create_engine, SQLModel, Session
from app.config import settings

# Create engine with fallback to local SQLite if PostgreSQL connection is unavailable
try:
    if settings.DATABASE_URL.startswith("sqlite"):
        engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})
    else:
        engine = create_engine(
            settings.DATABASE_URL,
            pool_pre_ping=True,
            pool_recycle=300
        )
except Exception:
    engine = create_engine("sqlite:///./boomers.db", connect_args={"check_same_thread": False})

def create_db_and_tables():
    try:
        SQLModel.metadata.create_all(engine)
    except Exception as e:
        print(f"[DB Warning] Primary DB connection failed ({e}). Falling back to local SQLite database.")
        fallback_engine = create_engine("sqlite:///./boomers.db", connect_args={"check_same_thread": False})
        SQLModel.metadata.create_all(fallback_engine)

def get_session():
    with Session(engine) as session:
        yield session
