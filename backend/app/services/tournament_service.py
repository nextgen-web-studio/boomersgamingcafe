from datetime import datetime
from sqlmodel import Session, select
from app.models.tournament import Tournament

class TournamentService:
    @staticmethod
    def compute_status(tournament: Tournament) -> str:
        if tournament.admin_override_status:
            return tournament.admin_override_status
            
        if not tournament.event_date:
            return 'DRAFT'
            
        now = datetime.utcnow()
        
        if tournament.registration_open and tournament.registration_open > now:
            return 'UPCOMING'
            
        if tournament.registration_open and tournament.registration_close and tournament.registration_open <= now < tournament.registration_close:
            return 'REGISTRATION_OPEN'
            
        if tournament.registration_close and tournament.event_date:
            if now < datetime.combine(tournament.event_date, datetime.min.time()):
                return 'REGISTRATION_CLOSED'
                
        if tournament.event_date and tournament.start_time and tournament.end_time:
            # Simplified logic for LIVE/COMPLETED based on date
            event_datetime = datetime.combine(tournament.event_date, datetime.strptime(tournament.start_time, "%H:%M").time())
            if now.date() == tournament.event_date.date():
                return 'LIVE'
            elif now > event_datetime:
                return 'COMPLETED'
                
        return 'DRAFT'

    @classmethod
    def get_active_tournament(cls, session: Session) -> dict | None:
        tournaments = session.exec(
            select(Tournament)
            .where(Tournament.is_published == True)
            .order_by(Tournament.created_at.desc())
        ).all()
        
        for t in tournaments:
            status = cls.compute_status(t)
            if status not in ['DRAFT', 'COMPLETED', 'CANCELLED']:
                t_dict = t.model_dump()
                t_dict['computed_status'] = status
                return t_dict
        return None

    @classmethod
    def get_all_tournaments(cls, session: Session) -> list:
        tournaments = session.exec(select(Tournament).where(Tournament.is_published == True)).all()
        res = []
        for t in tournaments:
            d = t.model_dump()
            d['computed_status'] = cls.compute_status(t)
            res.append(d)
        return res

    @staticmethod
    def create_tournament(data: dict, admin_id: int, session: Session) -> Tournament:
        t = Tournament(**data, created_by=admin_id)
        session.add(t)
        session.commit()
        session.refresh(t)
        return t

    @staticmethod
    def update_status(tournament_id: int, status: str, admin_id: int, session: Session) -> Tournament:
        t = session.get(Tournament, tournament_id)
        if t:
            t.admin_override_status = status
            session.add(t)
            session.commit()
            session.refresh(t)
        return t
