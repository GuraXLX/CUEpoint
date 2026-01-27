from sqlalchemy import Column, Integer, String, ForeignKey, Float, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    avatar_url = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    tracks = relationship("Track", back_populates="owner")
    setlists = relationship("Setlist", back_populates="owner")
    projects = relationship("Project", back_populates="owner")
    forum_posts = relationship("ForumPost", back_populates="author")
    sent_messages = relationship("Message", foreign_keys="Message.sender_id", back_populates="sender")
    received_messages = relationship("Message", foreign_keys="Message.receiver_id", back_populates="receiver")

class Track(Base):
    __tablename__ = "tracks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    artist = Column(String, index=True)
    filename = Column(String) 
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # Metadata
    bpm = Column(Float, nullable=True)
    key = Column(String, nullable=True) # Camelot or Musical
    energy_level = Column(Float, nullable=True)
    genre = Column(String, nullable=True)
    
    # Commerce
    price = Column(Float, default=1.99) # Default track price
    purchase_count = Column(Integer, default=0)
    
    is_public = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    owner = relationship("User", back_populates="tracks")
    analysis_report = relationship("TrackAnalysisReport", back_populates="track", uselist=False)

class TrackAnalysisReport(Base):
    __tablename__ = "track_analysis_reports"
    id = Column(Integer, primary_key=True, index=True)
    track_id = Column(Integer, ForeignKey("tracks.id"))
    status = Column(String, default="pending") # pending, processing, completed, failed
    
    # Scores (0-100)
    overall_grade = Column(String, nullable=True) # e.g. A-
    mix_clarity = Column(Float, nullable=True)
    low_end_power = Column(Float, nullable=True)
    stereo_width = Column(Float, nullable=True)
    dynamic_range = Column(Float, nullable=True)
    
    feedback_json = Column(Text, nullable=True) # Detailed AI feedback
    
    track = relationship("Track", back_populates="analysis_report")

class Setlist(Base):
    __tablename__ = "setlists"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # List of tracks with their position and transition notes
    tracks_json = Column(Text) 
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    owner = relationship("User", back_populates="setlists")

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="active")
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    owner = relationship("User", back_populates="projects")

class ForumPost(Base):
    __tablename__ = "forum_posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    author_id = Column(Integer, ForeignKey("users.id"))
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    author = relationship("User", back_populates="forum_posts")

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    sender_id = Column(Integer, ForeignKey("users.id"))
    receiver_id = Column(Integer, ForeignKey("users.id"))
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_messages")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_messages")

class Purchase(Base):
    __tablename__ = "purchases"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    track_id = Column(Integer, ForeignKey("tracks.id"))
    price_paid = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="purchases")
    track = relationship("Track")

# Update User relationship
User.purchases = relationship("Purchase", back_populates="user")
