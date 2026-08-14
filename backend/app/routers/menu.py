from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import Any

from app.database import get_session
from app.models.menu import FoodItem

router = APIRouter(prefix="/menu", tags=["menu"])

@router.get("/")
def get_menu(session: Session = Depends(get_session)) -> Any:
    items = session.exec(select(FoodItem).where(FoodItem.is_available == True)).all()
    grouped = {}
    for item in items:
        if item.category not in grouped:
            grouped[item.category] = []
        grouped[item.category].append(item)
    return grouped

@router.get("/{item_id}")
def get_menu_item(item_id: str, session: Session = Depends(get_session)) -> Any:
    item = session.get(FoodItem, item_id)
    if not item or not item.is_available:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
