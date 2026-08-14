from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    DIRECT_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60
    JWT_REFRESH_EXPIRE_DAYS: int = 30
    RAZORPAY_KEY_ID: str
    RAZORPAY_KEY_SECRET: str
    OTP_PROVIDER: str = "development"
    OTP_API_KEY: str = ""
    OTP_SENDER_ID: str = "BOOMRS"
    OTP_EXPIRE_MINUTES: int = 5
    OTP_MAX_ATTEMPTS: int = 3
    OTP_RESEND_COOLDOWN_SECONDS: int = 60
    FRONTEND_URL: str = "http://localhost:5500"
    BACKEND_URL: str = "http://localhost:8000"
    ENVIRONMENT: str = "development"
    BOOKING_HOLD_MINUTES: int = 10

    model_config = SettingsConfigDict(env_file=".env")

    @property
    def is_development(self) -> bool:
        return self.ENVIRONMENT.lower() == "development"

settings = Settings()
