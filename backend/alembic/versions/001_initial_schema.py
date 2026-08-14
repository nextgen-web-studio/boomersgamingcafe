"""initial_schema

Revision ID: 001
Revises: 
Create Date: 2026-08-12 15:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel

revision = '001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Admin Users
    op.create_table('admin_users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(length=50), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('full_name', sa.String(length=100), nullable=False),
        sa.Column('role', sa.String(length=20), nullable=False),
        sa.Column('branch_id', sa.Integer(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.Column('last_login', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('username')
    )

    # Branches
    op.create_table('branches',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('slug', sa.String(length=50), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('address', sa.String(length=500), nullable=False),
        sa.Column('phone', sa.String(length=20), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=True),
        sa.Column('opening_time', sa.String(length=5), nullable=False),
        sa.Column('closing_time', sa.String(length=5), nullable=False),
        sa.Column('closed_days', sa.String(), nullable=False),
        sa.Column('holiday_dates', sa.String(), nullable=False),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('slug')
    )

    op.create_foreign_key('fk_admin_branch', 'admin_users', 'branches', ['branch_id'], ['id'])

    # Zones
    op.create_table('zones',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('branch_id', sa.Integer(), nullable=False),
        sa.Column('slug', sa.String(length=50), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('capacity', sa.Integer(), nullable=False),
        sa.Column('min_duration_minutes', sa.Integer(), nullable=False),
        sa.Column('max_duration_minutes', sa.Integer(), nullable=False),
        sa.Column('base_price_per_hour', sa.Float(), nullable=False),
        sa.Column('icon', sa.String(length=10), nullable=True),
        sa.Column('color', sa.String(length=20), nullable=True),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('sort_order', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['branch_id'], ['branches.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Stations
    op.create_table('stations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('zone_id', sa.Integer(), nullable=False),
        sa.Column('branch_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=50), nullable=False),
        sa.Column('display_name', sa.String(length=100), nullable=False),
        sa.Column('hardware_specs', sa.String(), nullable=True),
        sa.Column('base_price_override', sa.Float(), nullable=True),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('current_game', sa.String(length=100), nullable=True),
        sa.Column('sort_order', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['branch_id'], ['branches.id'], ),
        sa.ForeignKeyConstraint(['zone_id'], ['zones.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Pricing Rules
    op.create_table('pricing_rules',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('zone_id', sa.Integer(), nullable=True),
        sa.Column('station_id', sa.Integer(), nullable=True),
        sa.Column('branch_id', sa.Integer(), nullable=True),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('rule_type', sa.String(length=20), nullable=False),
        sa.Column('price_per_hour', sa.Float(), nullable=True),
        sa.Column('multiplier', sa.Float(), nullable=False),
        sa.Column('start_time', sa.String(length=5), nullable=True),
        sa.Column('end_time', sa.String(length=5), nullable=True),
        sa.Column('days_of_week', sa.String(), nullable=True),
        sa.Column('start_date', sa.Date(), nullable=True),
        sa.Column('end_date', sa.Date(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('priority', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['branch_id'], ['branches.id'], ),
        sa.ForeignKeyConstraint(['station_id'], ['stations.id'], ),
        sa.ForeignKeyConstraint(['zone_id'], ['zones.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Users
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('phone', sa.String(length=15), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=True),
        sa.Column('email', sa.String(length=255), nullable=True),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.Column('last_login', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )
    op.create_index(op.f('ix_users_phone'), 'users', ['phone'], unique=True)

    # OTP Records
    op.create_table('otp_records',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('phone', sa.String(length=15), nullable=False),
        sa.Column('otp_hash', sa.String(length=255), nullable=False),
        sa.Column('expires_at', sa.DateTime(), nullable=False),
        sa.Column('attempts', sa.Integer(), nullable=False),
        sa.Column('max_attempts', sa.Integer(), nullable=False),
        sa.Column('is_verified', sa.Boolean(), nullable=False),
        sa.Column('is_used', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_otp_records_phone'), 'otp_records', ['phone'], unique=False)

    # Booking Holds
    op.create_table('booking_holds',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('station_id', sa.Integer(), nullable=False),
        sa.Column('start_datetime', sa.DateTime(), nullable=False),
        sa.Column('end_datetime', sa.DateTime(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('expires_at', sa.DateTime(), nullable=False),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('razorpay_order_id', sa.String(length=100), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['station_id'], ['stations.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Bookings
    op.create_table('bookings',
        sa.Column('id', sa.String(length=20), nullable=False),
        sa.Column('hold_id', sa.String(length=36), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('station_id', sa.Integer(), nullable=False),
        sa.Column('branch_id', sa.Integer(), nullable=False),
        sa.Column('zone_id', sa.Integer(), nullable=False),
        sa.Column('booking_date', sa.Date(), nullable=False),
        sa.Column('start_time', sa.String(length=5), nullable=False),
        sa.Column('end_time', sa.String(length=5), nullable=False),
        sa.Column('duration_minutes', sa.Integer(), nullable=False),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('gaming_amount', sa.Float(), nullable=False),
        sa.Column('food_amount', sa.Float(), nullable=False),
        sa.Column('discount_amount', sa.Float(), nullable=False),
        sa.Column('tax_amount', sa.Float(), nullable=False),
        sa.Column('total_amount', sa.Float(), nullable=False),
        sa.Column('verification_token', sa.String(length=36), nullable=False),
        sa.Column('special_request', sa.String(), nullable=True),
        sa.Column('promo_code', sa.String(length=50), nullable=True),
        sa.Column('cancellation_reason', sa.String(), nullable=True),
        sa.Column('cancelled_at', sa.DateTime(), nullable=True),
        sa.Column('checked_in_at', sa.DateTime(), nullable=True),
        sa.Column('admin_notes', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['branch_id'], ['branches.id'], ),
        sa.ForeignKeyConstraint(['station_id'], ['stations.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['zone_id'], ['zones.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('verification_token')
    )

    # Payments
    op.create_table('payments',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('booking_id', sa.String(length=20), nullable=False),
        sa.Column('razorpay_order_id', sa.String(length=100), nullable=False),
        sa.Column('razorpay_payment_id', sa.String(length=100), nullable=True),
        sa.Column('razorpay_signature', sa.String(length=255), nullable=True),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('currency', sa.String(length=3), nullable=False),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('failure_reason', sa.String(), nullable=True),
        sa.Column('refund_id', sa.String(length=100), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['booking_id'], ['bookings.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('razorpay_order_id')
    )

    # Food Items
    op.create_table('food_items',
        sa.Column('id', sa.String(length=10), nullable=False),
        sa.Column('category', sa.String(length=50), nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False),
        sa.Column('description', sa.String(), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('prep_time_minutes', sa.Integer(), nullable=False),
        sa.Column('is_veg', sa.Boolean(), nullable=False),
        sa.Column('calories', sa.String(length=20), nullable=True),
        sa.Column('rating', sa.Float(), nullable=True),
        sa.Column('spice_level', sa.Integer(), nullable=False),
        sa.Column('ingredients', sa.String(), nullable=False),
        sa.Column('image_url', sa.String(length=255), nullable=False),
        sa.Column('is_available', sa.Boolean(), nullable=False),
        sa.Column('is_bestseller', sa.Boolean(), nullable=False),
        sa.Column('is_featured', sa.Boolean(), nullable=False),
        sa.Column('sort_order', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_food_items_category'), 'food_items', ['category'], unique=False)

    # Food Orders
    op.create_table('food_orders',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('booking_id', sa.String(length=20), nullable=True),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('total_amount', sa.Float(), nullable=False),
        sa.Column('notes', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['booking_id'], ['bookings.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Food Order Items
    op.create_table('food_order_items',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('order_id', sa.Integer(), nullable=False),
        sa.Column('food_item_id', sa.String(length=10), nullable=False),
        sa.Column('quantity', sa.Integer(), nullable=False),
        sa.Column('unit_price', sa.Float(), nullable=False),
        sa.Column('total_price', sa.Float(), nullable=False),
        sa.ForeignKeyConstraint(['food_item_id'], ['food_items.id'], ),
        sa.ForeignKeyConstraint(['order_id'], ['food_orders.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Tournaments
    op.create_table('tournaments',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=200), nullable=False),
        sa.Column('game', sa.String(length=100), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('poster_url', sa.String(length=500), nullable=True),
        sa.Column('branch_id', sa.Integer(), nullable=True),
        sa.Column('venue', sa.String(length=200), nullable=True),
        sa.Column('event_date', sa.Date(), nullable=True),
        sa.Column('start_time', sa.String(length=5), nullable=True),
        sa.Column('end_time', sa.String(length=5), nullable=True),
        sa.Column('registration_open', sa.DateTime(), nullable=True),
        sa.Column('registration_close', sa.DateTime(), nullable=True),
        sa.Column('format', sa.String(length=20), nullable=True),
        sa.Column('max_participants', sa.Integer(), nullable=True),
        sa.Column('current_participants', sa.Integer(), nullable=False),
        sa.Column('entry_fee', sa.Float(), nullable=False),
        sa.Column('prize_pool', sa.String(length=200), nullable=True),
        sa.Column('rules', sa.String(), nullable=True),
        sa.Column('organizer', sa.String(length=100), nullable=True),
        sa.Column('contact_info', sa.String(length=200), nullable=True),
        sa.Column('registration_url', sa.String(length=500), nullable=True),
        sa.Column('live_stream_url', sa.String(length=500), nullable=True),
        sa.Column('watch_count', sa.Integer(), nullable=False),
        sa.Column('winner', sa.String(length=200), nullable=True),
        sa.Column('results', sa.String(), nullable=True),
        sa.Column('status', sa.String(length=30), nullable=False),
        sa.Column('admin_override_status', sa.String(length=30), nullable=True),
        sa.Column('is_published', sa.Boolean(), nullable=False),
        sa.Column('created_by', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['branch_id'], ['branches.id'], ),
        sa.ForeignKeyConstraint(['created_by'], ['admin_users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Tournament Registrations
    op.create_table('tournament_registrations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('tournament_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('team_name', sa.String(length=100), nullable=True),
        sa.Column('player_details', sa.String(), nullable=False),
        sa.Column('payment_id', sa.Integer(), nullable=True),
        sa.Column('registration_id', sa.String(length=20), nullable=False),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['payment_id'], ['payments.id'], ),
        sa.ForeignKeyConstraint(['tournament_id'], ['tournaments.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('registration_id')
    )

    # Announcements
    op.create_table('announcements',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=200), nullable=False),
        sa.Column('message', sa.String(), nullable=False),
        sa.Column('type', sa.String(length=20), nullable=False),
        sa.Column('image_url', sa.String(length=500), nullable=True),
        sa.Column('start_date', sa.DateTime(), nullable=False),
        sa.Column('end_date', sa.DateTime(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('priority', sa.Integer(), nullable=False),
        sa.Column('branch_id', sa.Integer(), nullable=True),
        sa.Column('created_by', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['branch_id'], ['branches.id'], ),
        sa.ForeignKeyConstraint(['created_by'], ['admin_users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Audit Logs
    op.create_table('audit_logs',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('admin_user_id', sa.Integer(), nullable=True),
        sa.Column('customer_user_id', sa.Integer(), nullable=True),
        sa.Column('action', sa.String(length=50), nullable=False),
        sa.Column('entity_type', sa.String(length=50), nullable=False),
        sa.Column('entity_id', sa.String(length=50), nullable=False),
        sa.Column('old_value', sa.String(), nullable=True),
        sa.Column('new_value', sa.String(), nullable=True),
        sa.Column('ip_address', sa.String(length=45), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['admin_user_id'], ['admin_users.id'], ),
        sa.ForeignKeyConstraint(['customer_user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade() -> None:
    pass
