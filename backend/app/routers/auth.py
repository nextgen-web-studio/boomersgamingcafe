from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import Any
import bcrypt
import re

from app.database import get_session
from app.models.user import User, AdminUser
from app.services.otp_service import OTPService
from app.auth.jwt_handler import create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

class OTPRequest(BaseModel):
    phone: str

class OTPVerify(BaseModel):
    phone: str
    otp: str

class GoogleAuthRequest(BaseModel):
    email: str
    name: str

class EmailAuthRequest(BaseModel):
    email: str
    password: str

@router.post("/customer/request-otp")
def request_otp(req: OTPRequest, session: Session = Depends(get_session)) -> Any:
    if not re.match(r"^\+91\d{10}$", req.phone):
        raise HTTPException(status_code=400, detail="Invalid Indian phone number format (+91XXXXXXXXXX)")
    return OTPService.request_otp(req.phone, session)

@router.post("/customer/verify-otp")
def verify_otp(req: OTPVerify, session: Session = Depends(get_session)) -> Any:
    user = OTPService.verify_otp(req.phone, req.otp, session)
    access_token = create_access_token(data={"sub": user.phone, "is_admin": False})
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@router.post("/customer/google-login")
def google_login(req: GoogleAuthRequest, session: Session = Depends(get_session)) -> Any:
    user = session.exec(select(User).where(User.phone == req.email)).first()
    if not user:
        user = User(phone=req.email, is_verified=True)
        session.add(user)
        session.commit()
        session.refresh(user)
    access_token = create_access_token(data={"sub": user.phone, "is_admin": False})
    return {"access_token": access_token, "token_type": "bearer", "user": {"id": user.id, "name": req.name, "email": req.email}}

@router.post("/admin/login")
def admin_login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)) -> Any:
    admin = session.exec(select(AdminUser).where(AdminUser.username == form_data.username)).first()
    is_valid = False
    if admin:
        try:
            is_valid = bcrypt.checkpw(form_data.password.encode("utf-8"), admin.password_hash.encode("utf-8"))
        except Exception:
            is_valid = False
    if not admin or not is_valid:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    if not admin.is_active:
        raise HTTPException(status_code=401, detail="Inactive admin account")
    
    access_token = create_access_token(data={"sub": admin.username, "is_admin": True})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)) -> Any:
    return current_user
