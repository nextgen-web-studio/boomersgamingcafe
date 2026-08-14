from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import Any

from app.database import get_session
from app.models.user import User
from app.models.tournament import Tournament, TournamentRegistration
from app.auth.jwt_handler import get_current_user
from app.services.tournament_service import TournamentService

router = APIRouter(prefix="/tournaments", tags=["tournaments"])

@router.get("/active")
def get_active_tournament(session: Session = Depends(get_session)) -> Any:
    t = TournamentService.get_active_tournament(session)
    if not t:
        raise HTTPException(status_code=404, detail="No active tournament")
    return t

@router.get("/")
def get_all_tournaments(session: Session = Depends(get_session)) -> Any:
    return TournamentService.get_all_tournaments(session)

@router.get("/{tournament_id}")
def get_tournament(tournament_id: int, session: Session = Depends(get_session)) -> Any:
    tournament = session.get(Tournament, tournament_id)
    if not tournament or not tournament.is_published:
        raise HTTPException(status_code=404, detail="Tournament not found")
    res = tournament.model_dump()
    res['computed_status'] = TournamentService.compute_status(tournament)
    return res

@router.post("/{tournament_id}/register")
def register_tournament(tournament_id: int, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> Any:
    # Basic stub
    t = session.get(Tournament, tournament_id)
    if not t or not t.is_published:
        raise HTTPException(status_code=404, detail="Tournament not found")
        
    reg = TournamentRegistration(
        tournament_id=t.id,
        user_id=current_user.id,
        registration_id=f"BGC-REG-{current_user.id}{t.id}"
    )
    session.add(reg)
    session.commit()
    session.refresh(reg)
    return reg
