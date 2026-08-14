import json
import bcrypt
from datetime import datetime, timedelta
from sqlmodel import Session, select

from app.database import engine, create_db_and_tables
from app.models.user import AdminUser
from app.models.branch import Branch, Zone
from app.models.station import Station
from app.models.menu import FoodItem
from app.models.tournament import Tournament
from app.models.announcement import Announcement

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def seed():
    create_db_and_tables()
    with Session(engine) as session:
        # Admin
        if not session.exec(select(AdminUser).where(AdminUser.username == "superadmin")).first():
            admin = AdminUser(
                username="superadmin",
                email="admin@boomers.cafe",
                password_hash=hash_password("Admin@BGC2026!"),
                role="SUPER_ADMIN",
                full_name="Super Admin"
            )
            session.add(admin)

        # Branches
        b_cbe = session.exec(select(Branch).where(Branch.slug == "coimbatore")).first()
        if not b_cbe:
            b_cbe = Branch(
                slug="coimbatore",
                name="Coimbatore",
                address="RS Puram, Coimbatore, Tamil Nadu",
                phone="+91-422-XXXXXXX",
                opening_time="10:00",
                closing_time="02:00"
            )
            session.add(b_cbe)

        b_pune = session.exec(select(Branch).where(Branch.slug == "pune")).first()
        if not b_pune:
            b_pune = Branch(
                slug="pune",
                name="Pune",
                address="Viman Nagar, Pune, Maharashtra",
                phone="+91-20-XXXXXXX",
                opening_time="10:00",
                closing_time="02:00"
            )
            session.add(b_pune)
            
        session.commit()
        session.refresh(b_cbe)
        session.refresh(b_pune)

        # Zones
        zones_data = [
            ("pc", "PC Arena", 100),
            ("console", "Console Lounge", 120),
            ("vip", "VIP Squad Room", 250),
            ("racing", "Racing Simulator", 150)
        ]
        
        for b in [b_cbe, b_pune]:
            for z_slug, z_name, price in zones_data:
                z = session.exec(select(Zone).where(Zone.branch_id == b.id, Zone.slug == z_slug)).first()
                if not z:
                    z = Zone(branch_id=b.id, slug=z_slug, name=z_name, base_price_per_hour=price)
                    session.add(z)
        session.commit()

        # Stations
        for b in [b_cbe, b_pune]:
            pc_zone = session.exec(select(Zone).where(Zone.branch_id == b.id, Zone.slug == "pc")).first()
            if pc_zone:
                for i in range(1, 12):
                    if not session.exec(select(Station).where(Station.zone_id == pc_zone.id, Station.name == f"PC-{i}")).first():
                        session.add(Station(zone_id=pc_zone.id, branch_id=b.id, name=f"PC-{i}", display_name=f"Gaming PC {i}"))
        session.commit()

        # Menu
        if not session.exec(select(FoodItem).where(FoodItem.id == "f-1")).first():
            items = [
                ("f-1", "xp-starters", "Fries", "Crispy french fries", 100),
                ("f-2", "xp-starters", "Wedges", "Potato wedges", 120),
                ("f-3", "burger", "Classic Veg", "Veg burger", 150)
            ]
            for id, cat, name, desc, price in items:
                session.add(FoodItem(id=id, category=cat, name=name, description=desc, price=price, image_url=""))
        session.commit()

        # Tournament
        if not session.exec(select(Tournament).where(Tournament.name == "BGC Valorant Invitational")).first():
            t = Tournament(
                name="BGC Valorant Invitational",
                game="VALORANT",
                status="UPCOMING",
                event_date=datetime.utcnow() + timedelta(days=21),
                registration_open=datetime.utcnow(),
                registration_close=datetime.utcnow() + timedelta(days=14),
                is_published=True,
                prize_pool="₹5000",
                max_participants=16,
                format="SQUAD",
                created_by=1
            )
            session.add(t)
        
        # Announcement
        if not session.exec(select(Announcement).where(Announcement.title == "Welcome to Boomer's Gaming Cafe")).first():
            a = Announcement(
                title="Welcome to Boomer's Gaming Cafe",
                message="Now open for bookings! Use our online booking system to reserve your station.",
                type="GENERAL",
                is_active=True,
                start_date=datetime.utcnow(),
                created_by=1
            )
            session.add(a)

        session.commit()
        print("Seeding complete.")

if __name__ == "__main__":
    seed()
