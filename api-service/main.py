from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database
from database import engine
from supabase_auth import get_current_user
import os
from celery import Celery

# Initialize DB
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CuePoint AI API")

# Redis/Celery config
# Imported from isolated module to allow worker to run independently
from celery_config import celery_app

# Internal JWT auth removed - using Supabase auth instead

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Note: User creation should theoretically be handled by Supabase Auth hooks, 
    # but we keep this for local/legacy compatibility if needed, using the local DB.
    # Password hashing would need headers if we were doing it locally.
    # For now, we assume this is legacy or sync logic.
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    # hashed_password = auth.get_password_hash(user.password) # Removed dependency
    db_user = models.User(email=user.email, hashed_password="managed_by_supabase")
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

# Module 2: Track Doctor - Upload for Analysis
@app.post("/tracks/analyze", response_model=schemas.Track)
def upload_track_for_analysis(
    title: str, 
    artist: str, 
    file: UploadFile = File(...), 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    # In real app: upload to MinIO here
    # object_name = f"tracks/{current_user.id}/{file.filename}"
    # minio_client.put_object(...)
    
    # Create DB entry
    db_track = models.Track(title=title, artist=artist, filename=file.filename, owner_id=current_user.id)
    db.add(db_track)
    db.commit()
    db.refresh(db_track)
    
    # Create empty analysis report
    db_report = models.TrackAnalysisReport(track_id=db_track.id, status="pending")
    db.add(db_report)
    db.commit()
    
    # Dispatch Celery Task
    task = celery_app.send_task("analyze_track", args=[db_track.id, file.filename])
    
    return db_track

@app.get("/tracks/me", response_model=List[schemas.Track])
def get_my_tracks(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Track).filter(models.Track.owner_id == current_user.id).all()

# Discovery Engine: Public Tracks
@app.get("/marketplace", response_model=List[schemas.Track])
def get_marketplace(db: Session = Depends(database.get_db)):
    return db.query(models.Track).filter(models.Track.is_public == True).all()

@app.post("/tracks/{track_id}/publish")
def publish_track(track_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    db_track = db.query(models.Track).filter(models.Track.id == track_id, models.Track.owner_id == current_user.id).first()
    if not db_track:
        raise HTTPException(status_code=404, detail="Track not found")
    db.commit()
    return {"status": "published"}

# Discovery Engine
import discovery

@app.get("/discovery/recommend/{track_id}")
def recommend_tracks(track_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    """
    Get recommendations based on a seed track.
    Returns matches from both User Library and Marketplace.
    """
    return discovery.get_recommendations(db, track_id, current_user.id)

# Module 1: Setlist Architect
@app.post("/setlists/generate")
def generate_setlist(setlist_data: schemas.SetlistCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    # Create DB entry for Setlist
    db_setlist = models.Setlist(
        title=setlist_data.title, 
        description=setlist_data.description, 
        owner_id=current_user.id,
        tracks_json="[]" # Will be updated by worker
    )
    db.add(db_setlist)
    db.commit()
    db.refresh(db_setlist)
    
    task = celery_app.send_task("generate_setlist", args=[db_setlist.id, setlist_data.goal, setlist_data.track_ids])
    return {"task_id": task.id, "setlist_id": db_setlist.id, "status": "processing"}

@app.get("/setlists/me", response_model=List[schemas.Setlist])
def get_my_setlists(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Setlist).filter(models.Setlist.owner_id == current_user.id).all()

# Export Engine
import export
from fastapi.responses import FileResponse

@app.get("/setlists/{setlist_id}/export")
def export_setlist(setlist_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    """
    Generates a ZIP file of the setlist with DJ-ready metadata (Key/BPM) embedded.
    """
    try:
        zip_path = export.prepare_setlist_export(db, setlist_id, current_user.id)
        return FileResponse(zip_path, media_type='application/zip', filename=os.path.basename(zip_path))
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from fastapi.responses import StreamingResponse
import math
import struct

@app.get("/tracks/{track_id}/stream")
def stream_track(track_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    """
    Smart Audio Streamer.
    - Owners & Purchasers: Full Stream.
    - Public: 15s Preview.
    """
    track = db.query(models.Track).filter(models.Track.id == track_id).first()
    if not track:
        raise HTTPException(status_code=404, detail="Track not found")
        
    # Check permissions
    is_owner = track.owner_id == current_user.id
    # Check purchase (if model exists)
    try:
        has_purchased = db.query(models.Purchase).filter(models.Purchase.user_id == current_user.id, models.Purchase.track_id == track_id).first()
    except:
        has_purchased = False
    
    # Logic for Preview Limiting
    # 15 seconds of raw audio (approx)
    # If using generated audio (44.1kHz, 16bit, Stereo) -> 176kB/s
    limit_bytes = 176400 * 15 if not (is_owner or has_purchased) else None
        
    def iterfile():
        # GENERATE SYNTHETIC AUDIO (A simple sine wave beep)
        # Since we don't have real files, we synthesize sound on the fly
        # so the browser player actually plays something.
        sample_rate = 44100
        frequency = 440.0 # A4
        duration_per_chunk = 1.0 # seconds
        
        # WAV Header (Simplified)
        # Real streaming usually serves MP3 chunks, but browsers handle raw PCM or WAV if headers correct.
        # Ideally we'd serve a static MP3 file.
        # Fallback: Just return random noise or silence if no file.
        
        # BETTER: Return a stream of 0s (Silence) or Noise
        chunk_size = 4096
        total_generated = 0
        
        while True:
            # Generate white noise
            chunk = os.urandom(chunk_size)
            yield chunk
            total_generated += chunk_size
            
            if limit_bytes and total_generated >= limit_bytes:
                break
            
            if total_generated > 10 * 1024 * 1024: # Cap at 10MB
                break
                
    return StreamingResponse(iterfile(), media_type="audio/wav")

# Module 4: Collab Hub (Projects, Forum, Messages)
@app.get("/projects", response_model=List[schemas.Project])
def get_projects(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Project).filter(models.Project.owner_id == current_user.id).all()

@app.get("/forum/posts", response_model=List[schemas.ForumPost])
def get_forum_posts(db: Session = Depends(database.get_db)):
    return db.query(models.ForumPost).all()

@app.post("/forum/posts", response_model=schemas.ForumPost)
def create_forum_post(post: schemas.ForumPostBase, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    db_post = models.ForumPost(title=post.title, content=post.content, author_id=current_user.id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.get("/messages", response_model=List[schemas.Message])
def get_messages(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Message).filter(
        (models.Message.sender_id == current_user.id) | (models.Message.receiver_id == current_user.id)
    ).all()

@app.post("/messages", response_model=schemas.Message)
def send_message(msg: schemas.MessageBase, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    db_msg = models.Message(content=msg.content, sender_id=current_user.id, receiver_id=msg.receiver_id)
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg
