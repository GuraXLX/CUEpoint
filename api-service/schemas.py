from pydantic import BaseModel
from typing import Optional, List
import datetime

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime.datetime

    class Config:
        orm_mode = True

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
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
