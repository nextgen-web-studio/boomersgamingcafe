from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class FoodItem(SQLModel, table=True):
    __tablename__ = 'food_items'
    id: str = Field(primary_key=True, max_length=10)  # f-1, f-2 etc
    category: str = Field(index=True, max_length=50)
    name: str = Field(max_length=150)
    description: str
    price: float
    prep_time_minutes: int = Field(default=5)
    is_veg: bool = Field(default=True)
    calories: Optional[str] = Field(default=None, max_length=20)
    rating: Optional[float] = Field(default=4.5)
    spice_level: int = Field(default=0)
    ingredients: str = Field(default='[]')  # JSON
    image_url: str = Field(max_length=255)
    is_available: bool = Field(default=True)
    is_bestseller: bool = Field(default=False)
    is_featured: bool = Field(default=False)
    sort_order: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class FoodOrder(SQLModel, table=True):
    __tablename__ = 'food_orders'
    id: Optional[int] = Field(default=None, primary_key=True)
    booking_id: Optional[str] = Field(default=None, foreign_key='bookings.id')
    status: str = Field(default='NEW', max_length=20)
    total_amount: float = Field(default=0.0)
    notes: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class FoodOrderItem(SQLModel, table=True):
    __tablename__ = 'food_order_items'
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: int = Field(foreign_key='food_orders.id')
    food_item_id: str = Field(foreign_key='food_items.id', max_length=10)
    quantity: int = Field(default=1)
    unit_price: float
    total_price: float
