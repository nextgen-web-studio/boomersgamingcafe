# Boomer's Gaming Cafe — Backend

## Stack
- FastAPI + SQLModel + SQLAlchemy
- PostgreSQL (Supabase)
- Alembic migrations
- Razorpay (test mode)
- JWT authentication
- Development OTP (mock)

## Setup
1. `cd backend`
2. `python -m venv venv`
3. `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and fill in values
6. `alembic upgrade head`
7. `python seed.py`
8. `uvicorn app.main:app --reload`

## Environment Variables
See `.env.example` for all required variables.

**Supabase database:**
- DATABASE_URL: Transaction pooler (port 6543) — use for app
- DIRECT_URL: Direct connection (port 5432) — use for migrations only

**Razorpay Test Mode:**
- Use test keys from Razorpay dashboard
- Test card: 4111 1111 1111 1111

**OTP Development Mode:**
- Set OTP_PROVIDER=development
- OTP will be printed to console (never in production)
- See console for OTP when testing

## Deployment (Render)
1. Create a Render Web Service
2. Set Build Command: `pip install -r requirements.txt && alembic upgrade head`
3. Set Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add all environment variables from .env.example
5. Set ENVIRONMENT=production
6. Set FRONTEND_URL to your frontend domain

## API Docs
- Development: http://localhost:8000/docs
- Production: disabled for security

## Default Admin Credentials
- Username: superadmin
- Password: Admin@BGC2026!
- **CHANGE IMMEDIATELY IN PRODUCTION**
