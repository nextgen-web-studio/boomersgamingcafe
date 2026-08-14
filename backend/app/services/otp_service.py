import secrets
import bcrypt
from datetime import datetime, timedelta
from sqlmodel import Session, select
from fastapi import HTTPException
from app.models.user import User, OTPRecord
from app.config import settings

class OTPService:
    @staticmethod
    def generate_otp() -> str:
        return "".join(str(secrets.randbelow(10)) for _ in range(6))

    @staticmethod
    def hash_otp(otp: str) -> str:
        return bcrypt.hashpw(otp.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    @staticmethod
    def verify_otp_hash(otp: str, hashed: str) -> bool:
        try:
            return bcrypt.checkpw(otp.encode("utf-8"), hashed.encode("utf-8"))
        except Exception:
            return False

    @staticmethod
    def send_otp(phone: str, otp: str):
        if settings.OTP_PROVIDER == "development":
            print(f"=== DEV MODE OTP for {phone}: {otp} ===")
        else:
            if not settings.OTP_API_KEY:
                print("WARNING: OTP_API_KEY not configured. OTP not sent.")
            else:
                # Add real MSG91/Twilio logic here
                pass

    @classmethod
    def request_otp(cls, phone: str, session: Session) -> dict:
        # Check rate limit
        recent = session.exec(
            select(OTPRecord)
            .where(OTPRecord.phone == phone)
            .order_by(OTPRecord.created_at.desc())
        ).first()
        
        if recent and (datetime.utcnow() - recent.created_at).total_seconds() < settings.OTP_RESEND_COOLDOWN_SECONDS:
            raise HTTPException(status_code=429, detail="Please wait before requesting another OTP")

        otp = cls.generate_otp()
        otp_hash = cls.hash_otp(otp)
        
        record = OTPRecord(
            phone=phone,
            otp_hash=otp_hash,
            expires_at=datetime.utcnow() + timedelta(minutes=settings.OTP_EXPIRE_MINUTES),
            max_attempts=settings.OTP_MAX_ATTEMPTS
        )
        session.add(record)
        session.commit()
        
        cls.send_otp(phone, otp)
        return {"message": "OTP sent successfully"}

    @classmethod
    def verify_otp(cls, phone: str, otp_entered: str, session: Session) -> User:
        record = session.exec(
            select(OTPRecord)
            .where(OTPRecord.phone == phone)
            .where(OTPRecord.is_used == False)
            .order_by(OTPRecord.created_at.desc())
        ).first()
        
        if not record:
            raise HTTPException(status_code=400, detail="No active OTP found")
            
        if datetime.utcnow() > record.expires_at:
            raise HTTPException(status_code=400, detail="OTP expired")
            
        if record.attempts >= record.max_attempts:
            raise HTTPException(status_code=400, detail="Maximum attempts reached")
            
        record.attempts += 1
        
        if not cls.verify_otp_hash(otp_entered, record.otp_hash):
            session.add(record)
            session.commit()
            raise HTTPException(status_code=400, detail="Invalid OTP")
            
        record.is_verified = True
        record.is_used = True
        session.add(record)
        
        user = session.exec(select(User).where(User.phone == phone)).first()
        if not user:
            user = User(phone=phone)
            session.add(user)
            
        user.last_login = datetime.utcnow()
        session.add(user)
        session.commit()
        session.refresh(user)
        
        return user
