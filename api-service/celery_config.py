import os
from celery import Celery

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "cuepoint_worker",
    broker=REDIS_URL,
    backend=REDIS_URL,
    include=['tasks']  # Auto-register tasks from tasks.py
)

# Optional: Configure Celery for better reliability
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
)
