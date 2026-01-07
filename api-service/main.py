from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta
import models, schemas, auth, database
from database import engine
import os
from celery import Celery

# Initialize DB
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CuePoint AI API")

# Redis/Celery config
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
celery_app = Celery("cuepoint_worker", broker=REDIS_URL, backend=REDIS_URL)

@app.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

# Module 2: Track Doctor - Upload for Analysis
@app.post("/tracks/analyze", response_model=schemas.Track)
def upload_track_for_analysis(
    title: str, 
    artist: str, 
    file: UploadFile = File(...), 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
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
def get_my_tracks(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Track).filter(models.Track.owner_id == current_user.id).all()

# Discovery Engine: Public Tracks
@app.get("/marketplace", response_model=List[schemas.Track])
def get_marketplace(db: Session = Depends(database.get_db)):
    return db.query(models.Track).filter(models.Track.is_public == True).all()

@app.post("/tracks/{track_id}/publish")
def publish_track(track_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_track = db.query(models.Track).filter(models.Track.id == track_id, models.Track.owner_id == current_user.id).first()
    if not db_track:
        raise HTTPException(status_code=404, detail="Track not found")
    db_track.is_public = True
    db.commit()
    return {"status": "published"}

# Module 1: Setlist Architect
@app.post("/setlists/generate")
def generate_setlist(setlist_data: schemas.SetlistCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
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
def get_my_setlists(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Setlist).filter(models.Setlist.owner_id == current_user.id).all()

# Module 4: Collab Hub (Projects, Forum, Messages)
@app.get("/projects", response_model=List[schemas.Project])
def get_projects(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Project).filter(models.Project.owner_id == current_user.id).all()

@app.get("/forum/posts", response_model=List[schemas.ForumPost])
def get_forum_posts(db: Session = Depends(database.get_db)):
    return db.query(models.ForumPost).all()

@app.post("/forum/posts", response_model=schemas.ForumPost)
def create_forum_post(post: schemas.ForumPostBase, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_post = models.ForumPost(title=post.title, content=post.content, author_id=current_user.id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.get("/messages", response_model=List[schemas.Message])
def get_messages(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Message).filter(
        (models.Message.sender_id == current_user.id) | (models.Message.receiver_id == current_user.id)
    ).all()

@app.post("/messages", response_model=schemas.Message)
def send_message(msg: schemas.MessageBase, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_msg = models.Message(content=msg.content, sender_id=current_user.id, receiver_id=msg.receiver_id)
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg
