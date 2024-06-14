import logging
from datetime import datetime as dt
from datetime import timedelta as td
from typing import Any, Dict, List

import aiohttp
from fastapi.encoders import jsonable_encoder
from requests import Session

from app import config
from app.db import GetDB
from app.db.models import NotificationReminder
from app.utils.notification import queue

logger = logging.getLogger(__name__)

session = Session()

headers = (
    {"x-webhook-secret": config.WEBHOOK_SECRET}
    if config.WEBHOOK_SECRET
    else None
)


async def send(data: List[Dict[Any, Any]]) -> bool:
    """Send the notification to the webhook address provided by config.WEBHOOK_ADDRESS

    Args:
        data (List[Dict[Any, Any]]): list of json encoded notifications

    Returns:
        bool: returns True if an ok response received
    """
    try:
        logger.debug(
            f"Sending {len(data)} webhook updates to {config.WEBHOOK_ADDRESS}"
        )

        r = await aiohttp.request(
            "post", config.WEBHOOK_ADDRESS, json=data, headers=headers
        )
        if r.ok:
            return True
        logger.error(r)
    except Exception as err:
        logger.error(err)
    return False


async def send_notifications():
    if not queue:
        return

    notifications_to_send = list()
    try:
        while notification := queue.popleft():
            if notification.tries > config.NUMBER_OF_RECURRENT_NOTIFICATIONS:
                continue
            if notification.send_at > dt.utcnow().timestamp():
                queue.append(
                    notification
                )  # add it to the queue again for the next check
                continue
            notifications_to_send.append(notification)
    except IndexError:  # if the queue is empty
        pass

    if not notifications_to_send:
        return
    if not await send(
        [jsonable_encoder(notif) for notif in notifications_to_send]
    ):
        for notification in notifications_to_send:
            if (
                notification.tries + 1
            ) > config.NUMBER_OF_RECURRENT_NOTIFICATIONS:
                continue
            notification.tries += 1
            notification.send_at = (
                (  # schedule notification for n seconds later
                    dt.utcnow()
                    + td(seconds=config.RECURRENT_NOTIFICATIONS_TIMEOUT)
                ).timestamp()
            )
            queue.append(notification)


def delete_expired_reminders() -> None:
    with GetDB() as db:
        db.query(NotificationReminder).filter(
            NotificationReminder.expires_at < dt.utcnow()
        ).delete()
        db.commit()
