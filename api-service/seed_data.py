from database import SessionLocal, engine
import models
from passlib.context import CryptContext

# Init DB
models.Base.metadata.create_all(bind=engine)
db = SessionLocal()

def seed():
    print("🌱 Seeding CuePoint Database...")
    
    # 1. Ensure System User (The "Store" Owner)
    system_user = db.query(models.User).filter(models.User.email == "store@cuepoint.ai").first()
    if not system_user:
        system_user = models.User(
            email="store@cuepoint.ai", 
            hashed_password="hashed_secret", 
            username="CuePointStore",
            bio="Official Music Store"
        )
        db.add(system_user)
        db.commit()
    
    print(f"✅ System User: {system_user.email} (ID: {system_user.id})")

    # 2. Seed Tracks (Open Source / Free / Creative Commons style)
    tracks_data = [
        {"title": "Cyberpunk City", "artist": "Synthwavey", "bpm": 128.0, "key": "4A", "genre": "Synthwave", "price": 0.0},
        {"title": "Neon Drive", "artist": "Retrowave", "bpm": 130.0, "key": "4A", "genre": "Synthwave", "price": 0.99},
        {"title": "Midnight Run", "artist": "Nightcall", "bpm": 128.0, "key": "5A", "genre": "Synthwave", "price": 1.49},
        {"title": "Analog Dreams", "artist": "Vapor", "bpm": 126.0, "key": "3A", "genre": "Lo-Fi", "price": 0.0},
        {"title": "Bass Drop", "artist": "Skrillexish", "bpm": 140.0, "key": "12B", "genre": "Dubstep", "price": 1.99},
        {"title": "Cosmic Journey", "artist": "TranceGod", "bpm": 138.0, "key": "11B", "genre": "Trance", "price": 2.99},
        {"title": "Deep Ocean", "artist": "Aquatic", "bpm": 124.0, "key": "8A", "genre": "Deep House", "price": 1.99},
        {"title": "Warehouse Vibes", "artist": "TechHead", "bpm": 125.0, "key": "8A", "genre": "Techno", "price": 1.99},
        {"title": "Liquid Gold", "artist": "DnB Master", "bpm": 174.0, "key": "9A", "genre": "Drum & Bass", "price": 0.0},
        {"title": "Chill Sunset", "artist": "Lofi Girl", "bpm": 85.0, "key": "1A", "genre": "Lo-Fi", "price": 0.0},
        {"title": "Hard Stylez", "artist": "GabberKing", "bpm": 150.0, "key": "6A", "genre": "Hardstyle", "price": 2.50},
        {"title": "Future Funk", "artist": "GrooveArmada", "bpm": 120.0, "key": "2A", "genre": "Funk", "price": 1.25}
    ]

    count = 0
    for t in tracks_data:
        exists = db.query(models.Track).filter(models.Track.title == t["title"]).first()
        if not exists:
            track = models.Track(
                title=t["title"],
                artist=t["artist"],
                filename=f"{t['title'].lower().replace(' ', '_')}.mp3", # Mock filename
                owner_id=system_user.id,
                bpm=t["bpm"],
                key=t["key"],
                genre=t["genre"],
                price=t["price"],
                is_public=True # All seed tracks are public/market ready
            )
            db.add(track)
            count += 1
            
    db.commit()
    print(f"✅ Added {count} new tracks to the Marketplace.")

if __name__ == "__main__":
    seed()
