from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config.env import SQLALCHEMY_DATABASE_URL

IS_SQLITE = SQLALCHEMY_DATABASE_URL.startswith("sqlite")

if IS_SQLITE:
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        connect_args={"check_same_thread": False},
        # echo=True
    )
else:
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        pool_size=10,
        max_overflow=30,
        pool_recycle=3600,
        pool_timeout=10,
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
