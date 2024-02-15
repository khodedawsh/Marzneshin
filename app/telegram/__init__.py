import importlib.util
from os.path import dirname
from config import TELEGRAM_API_TOKEN, TELEGRAM_PROXY_URL
from telebot.async_telebot import AsyncTeleBot
from telebot import asyncio_helper

bot = None
if TELEGRAM_API_TOKEN:
    asyncio_helper.proxy = TELEGRAM_PROXY_URL
    bot = AsyncTeleBot(TELEGRAM_API_TOKEN)

handler_names = ["admin", "user"]


async def start_bot():
    if bot:
        handler_dir = dirname(__file__) + "/handlers/"
        for name in handler_names:
            spec = importlib.util.spec_from_file_location(name, f"{handler_dir}{name}.py")
            spec.loader.exec_module(importlib.util.module_from_spec(spec))

        from app.telegram import utils # setup custom handlers
        utils.setup()
        await bot.polling()


from .handlers.report import (  # noqa
    report,
    report_new_user,
    report_user_modification,
    report_user_deletion,
    report_status_change,
    report_user_usage_reset,
    report_user_subscription_revoked
)

__all__ = [
    "bot",
    "report",
    "report_new_user",
    "report_user_modification",
    "report_user_deletion",
    "report_status_change",
    "report_user_usage_reset",
    "report_user_subscription_revoked"
]
