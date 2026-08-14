from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from datetime import datetime

from app.config import settings
from app.database import get_session
from app.services.booking_service import BookingService

from app.routers import (
    auth, branches, stations, availability, bookings, 
    payments, menu, tournaments, announcements, admin
)

app = FastAPI(
    title="Boomer's Gaming Cafe API",
    description="Backend API for Boomer's Gaming Cafe",
    version="1.0.0",
    docs_url="/docs" if settings.is_development else None,
    redoc_url="/redoc" if settings.is_development else None,
)

origins = [
    settings.FRONTEND_URL,
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(branches.router, prefix="/api/v1")
app.include_router(stations.router, prefix="/api/v1")
app.include_router(availability.router, prefix="/api/v1")
app.include_router(bookings.router, prefix="/api/v1")
app.include_router(payments.router, prefix="/api/v1")
app.include_router(menu.router, prefix="/api/v1")
app.include_router(tournaments.router, prefix="/api/v1")
app.include_router(announcements.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")

@app.on_event("startup")
def on_startup():
    # Typically would use APScheduler or similar for background tasks
    # For now, just run once on startup
    db = next(get_session())
    try:
        BookingService.expire_holds(db)
    finally:
        db.close()

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "environment": settings.ENVIRONMENT,
        "timestamp": datetime.utcnow().isoformat()
    }
