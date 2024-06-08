import asyncio
import logging
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy.orm import Session

from app import marznode
from app.db import (
    GetDB,
    get_notification_reminder,
    get_users,
    start_user_expire,
    update_user_status,
)
from app.models.user import ReminderType, UserResponse, UserStatus
from app.utils import report
from app.utils.helpers import (
    calculate_expiration_days,
    calculate_usage_percent,
)
from config import (
    NOTIFY_DAYS_LEFT,
    NOTIFY_REACHED_USAGE_PERCENT,
    WEBHOOK_ADDRESS,
)

if TYPE_CHECKING:
    from app.db.models import User


logger = logging.getLogger(__name__)


def add_notification_reminders(
    db: Session, user: "User", now: datetime = datetime.utcnow()
) -> None:
    if user.data_limit:
        usage_percent = calculate_usage_percent(
            user.used_traffic, user.data_limit
        )
        if (usage_percent >= NOTIFY_REACHED_USAGE_PERCENT) and (
            not get_notification_reminder(db, user.id, ReminderType.data_usage)
        ):
            report.data_usage_percent_reached(
                db,
                usage_percent,
                UserResponse.model_validate(user),
                user.id,
                user.expire,
            )

    if user.expire and ((now - user.created_at).days >= NOTIFY_DAYS_LEFT):
        expire_days = calculate_expiration_days(user.expire)
        if (expire_days <= NOTIFY_DAYS_LEFT) and (
            not get_notification_reminder(
                db, user.id, ReminderType.expiration_date
            )
        ):
            report.expire_days_reached(
                db,
                expire_days,
                UserResponse.model_validate(user),
                user.id,
                user.expire,
            )


async def review_users():
    now = datetime.utcnow()
    with GetDB() as db:
        for user in get_users(db, status=UserStatus.active):

            limited = user.data_limit and user.used_traffic >= user.data_limit
            expired = user.expire and user.expire <= now
            if limited:
                status = UserStatus.limited
            elif expired:
                status = UserStatus.expired
            else:
                if WEBHOOK_ADDRESS:
                    add_notification_reminders(db, user, now)
                continue

            await marznode.operations.remove_user(user)
            update_user_status(db, user, status)

            asyncio.create_task(
                report.status_change(
                    user.username,
                    user.status,
                    UserResponse.model_validate(user),
                )
            )

            logger.info(f'User "{user.username}" status changed to {status}')

        for user in get_users(db, status=UserStatus.on_hold):

            if user.edit_at:
                base_time = user.edit_at
            else:
                base_time = user.created_at

            # Check if the user is online After or at 'base_time'
            if user.online_at and base_time <= user.online_at:
                status = UserStatus.active

            elif user.on_hold_timeout and (user.on_hold_timeout <= now):
                # If the user didn't connect within the timeout period, change status to "Active"
                status = UserStatus.active

            else:
                continue

            update_user_status(db, user, status)
            start_user_expire(db, user)
            asyncio.create_task(
                report.status_change(
                    user.username,
                    user.status,
                    UserResponse.model_validate(user),
                )
            )
            logger.info(f"on hold user `{user.username}` has been activated")
