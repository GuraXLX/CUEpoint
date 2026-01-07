from pydantic import BaseModel
from typing import Optional, List
import datetime

class UserBase(BaseModel):
    email: str
    username: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class TrackAnalysisReportSchema(BaseModel):
    id: int
    status: str
    overall_grade: Optional[str] = None
    mix_clarity: Optional[float] = None
    low_end_power: Optional[float] = None
    stereo_width: Optional[float] = None
    dynamic_range: Optional[float] = None
    feedback_json: Optional[str] = None

    class Config:
        from_attributes = True

class TrackBase(BaseModel):
    title: str
    artist: str

class TrackCreate(TrackBase):
    pass

class Track(TrackBase):
    id: int
    owner_id: int
    bpm: Optional[float] = None
    key: Optional[str] = None
    energy_level: Optional[float] = None
    genre: Optional[str] = None
    is_public: bool
    created_at: datetime.datetime
    analysis_report: Optional[TrackAnalysisReportSchema] = None
    
    class Config:
        from_attributes = True

class SetlistBase(BaseModel):
    title: str
    description: Optional[str] = None

class SetlistCreate(SetlistBase):
    track_ids: List[int]
    goal: str

class Setlist(SetlistBase):
    id: int
    owner_id: int
    tracks_json: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    title: str

class Project(ProjectBase):
    id: int
    owner_id: int
    status: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class ForumPostBase(BaseModel):
    title: str
    content: str

class ForumPost(ForumPostBase):
    id: int
    author_id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class MessageBase(BaseModel):
    content: str
    receiver_id: int

class Message(MessageBase):
    id: int
    sender_id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
