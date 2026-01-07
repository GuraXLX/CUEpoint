from worker import celery_app
import time
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
import models
import json
import random

# Create DB connection
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/cuepoint")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@celery_app.task(name="analyze_track")
def analyze_track(track_id: int, file_path: str):
    """
    Simulates AI audio analysis with a 10s delay.
    Populates the database with realistic mock data.
    """
    print(f"Starting Track Doctor analysis for track {track_id}")
    db = SessionLocal()
    
    # 1. Update status to processing
    report = db.query(models.TrackAnalysisReport).filter(models.TrackAnalysisReport.track_id == track_id).first()
    if report:
        report.status = "processing"
        db.commit()
    
    time.sleep(10) # Heavy processing simulation
    
    # 2. Generate detailed mock feedback
    mix_clarity = random.uniform(75, 95)
    low_end = random.uniform(60, 90)
    stereo_width = random.uniform(70, 92)
    dynamic_range = random.uniform(65, 88)
    
    overall_score = (mix_clarity + low_end + stereo_width + dynamic_range) / 4
    if overall_score > 90: grade = "A+"
    elif overall_score > 85: grade = "A"
    elif overall_score > 80: grade = "A-"
    elif overall_score > 75: grade = "B+"
    else: grade = "B"
    
    feedback = [
        {"metric": "Low-End Power", "score": low_end, "feedback": "Your kick drum is slightly masking the sub-bass around 60Hz. Try a 2dB dip on the bass synth or implement sidechain compression."},
        {"metric": "Mix Clarity", "score": mix_clarity, "feedback": "Excellent separation in the mid-range. The vocals sit perfectly in the center stage."},
        {"metric": "Stereo Width", "score": stereo_width, "feedback": "Strong mono compatibility, but consider adding some subtle Haas effect to the percussion for more air."},
        {"metric": "Dynamic Range", "score": dynamic_range, "feedback": "The master bus is slightly over-compressed. Back off the threshold by 1.5dB to let the transients breathe."}
    ]
    
    # 3. Update DB
    track = db.query(models.Track).filter(models.Track.id == track_id).first()
    if track:
        track.bpm = random.choice([122, 124, 126, 128, 130])
        track.key = random.choice(["1A", "4A", "8A", "11A", "1B", "5B"])
        track.energy_level = random.uniform(0.6, 0.95)
        track.genre = random.choice(["Techno", "House", "Melodic House", "Prog House"])
        
        if report:
            report.status = "completed"
            report.overall_grade = grade
            report.mix_clarity = mix_clarity
            report.low_end_power = low_end
            report.stereo_width = stereo_width
            report.dynamic_range = dynamic_range
            report.feedback_json = json.dumps(feedback)
            
        db.commit()
    
    db.close()
    return {"status": "completed", "track_id": track_id}

@celery_app.task(name="generate_setlist")
def generate_setlist(setlist_id: int, goal: str, track_ids: list):
    """
    Simulates AI setlist generation.
    """
    print(f"Generating Setlist Architect plan for setlist {setlist_id}")
    db = SessionLocal()
    
    time.sleep(5) # Simulation
    
    # Generate mock transitions and energy arc
    setlist_tracks = []
    energy_arc = []
    
    for i, tid in enumerate(track_ids):
        t = db.query(models.Track).filter(models.Track.id == tid).first()
        if t:
            setlist_tracks.append({
                "id": t.id,
                "title": t.title,
                "artist": t.artist,
                "bpm": t.bpm,
                "key": t.key,
                "transition": random.choice(["Filter Sweep", "Cut / Slam", "Echo Out", "Long Blend"]) if i < len(track_ids) - 1 else None
            })
            # Generate a 10-point energy curve for this track's segment
            start_energy = random.uniform(60, 90)
            for _ in range(10):
                energy_arc.append(round(start_energy + random.uniform(-5, 5), 2))

    db_setlist = db.query(models.Setlist).filter(models.Setlist.id == setlist_id).first()
    if db_setlist:
        db_setlist.tracks_json = json.dumps({
            "tracks": setlist_tracks,
            "energy_arc": energy_arc,
            "duration_minutes": 90 if "90" in goal else 60
        })
        db.commit()
        
    db.close()
    return {"status": "completed", "setlist_id": setlist_id}
