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
    
    # Dispatch Celery Task
    task = celery_app.send_task("analyze_track", args=[db_track.id, file.filename])
    
    return db_track

# Module 1: Setlist Architect
@app.post("/setlists/generate")
def generate_setlist(goal: str, track_ids: List[int], current_user: models.User = Depends(auth.get_current_user)):
    task = celery_app.send_task("generate_setlist", args=[goal, track_ids])
    return {"task_id": task.id, "status": "processing"}
