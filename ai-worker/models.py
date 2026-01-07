from sqlalchemy import Column, Integer, String, ForeignKey, Float, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    tracks = relationship("Track", back_populates="owner")
    setlists = relationship("Setlist", back_populates="owner")

class Track(Base):
    __tablename__ = "tracks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    artist = Column(String, index=True)
    filename = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    bpm = Column(Float, nullable=True)
    key = Column(String, nullable=True)
    energy_level = Column(Float, nullable=True)
    danceability = Column(Float, nullable=True)
    
    mix_clarity_score = Column(Float, nullable=True)
    low_end_score = Column(Float, nullable=True)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    owner = relationship("User", back_populates="tracks")

class Setlist(Base):
    __tablename__ = "setlists"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    tracks_json = Column(Text)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    owner = relationship("User", back_populates="setlists")
