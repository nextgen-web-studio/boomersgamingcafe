from sqlmodel import Session
from app.models.announcement import AuditLog

class AuditService:
    @staticmethod
    def log(action: str, entity_type: str, entity_id: str, session: Session, old_value: str = None, new_value: str = None, admin_id: int = None, customer_id: int = None, ip: str = None):
        log_entry = AuditLog(
            action=action,
            entity_type=entity_type,
            entity_id=str(entity_id),
            old_value=old_value,
            new_value=new_value,
            admin_user_id=admin_id,
            customer_user_id=customer_id,
            ip_address=ip
        )
        session.add(log_entry)
        session.commit()
