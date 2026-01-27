from sqlalchemy.orm import Session
from sqlalchemy import or_
import models
from typing import List, Dict

CAMELOT_KEYS = {
    "1A": ["1A", "12A", "2A", "1B"],
    "2A": ["2A", "1A", "3A", "2B"],
    "3A": ["3A", "2A", "4A", "3B"],
    "4A": ["4A", "3A", "5A", "4B"],
    "5A": ["5A", "4A", "6A", "5B"],
    "6A": ["6A", "5A", "7A", "6B"],
    "7A": ["7A", "6A", "8A", "7B"],
    "8A": ["8A", "7A", "9A", "8B"],
    "9A": ["9A", "8A", "10A", "9B"],
    "10A": ["10A", "9A", "11A", "10B"],
    "11A": ["11A", "10A", "12A", "11B"],
    "12A": ["12A", "11A", "1A", "12B"],
    
    "1B": ["1B", "12B", "2B", "1A"],
    "2B": ["2B", "1B", "3B", "2A"],
    "3B": ["3B", "2B", "4B", "3A"],
    "4B": ["4B", "3B", "5B", "4A"],
    "5B": ["5B", "4B", "6B", "5A"],
    "6B": ["6B", "5B", "7B", "6A"],
    "7B": ["7B", "6B", "8B", "7A"],
    "8B": ["8B", "7B", "9B", "8A"],
    "9B": ["9B", "8B", "10B", "9A"],
    "10B": ["10B", "9B", "11B", "10A"],
    "11B": ["11B", "10B", "12B", "11A"],
    "12B": ["12B", "11B", "1B", "12A"],
}

def get_camelot_neighbors(key: str) -> List[str]:
    """Returns list of compatible keys for harmonic mixing."""
    return CAMELOT_KEYS.get(key, [])

def get_recommendations(db: Session, track_id: int, user_id: int) -> Dict[str, List[models.Track]]:
    """
    Hybrid Discovery Engine
    Suggests tracks from (1) User Library and (2) Global Marketplace
    based on BPM and Key compatibility.
    """
    
    # 1. Fetch Source Track
    seed_track = db.query(models.Track).filter(models.Track.id == track_id).first()
    if not seed_track or not seed_track.bpm or not seed_track.key:
        return {"library": [], "marketplace": [], "reason": "Seed track missing BPM/Key analysis"}

    # 2. Define Criteria
    compatible_keys = get_camelot_neighbors(seed_track.key)
    # Add the current key itself if not in neighbors (though logic above handles it)
    if seed_track.key not in compatible_keys:
        compatible_keys.append(seed_track.key)
        
    bpm_min = float(seed_track.bpm) * 0.92
    bpm_max = float(seed_track.bpm) * 1.08

    # 3. Query Personal Library (User's own tracks)
    library_matches = db.query(models.Track).filter(
        models.Track.owner_id == user_id,
        models.Track.id != seed_track.id, # Exclude self
        models.Track.bpm.between(bpm_min, bpm_max),
        models.Track.key.in_(compatible_keys)
    ).limit(5).all()

    # 4. Query Marketplace (Public tracks)
    # Note: Marketplace tracks might be owner's own public tracks, which is fine, but maybe exclude?
    # Let's keep them for now.
    marketplace_matches = db.query(models.Track).filter(
        models.Track.is_public == True,
        models.Track.owner_id != user_id, # Don't recommend my own tracks in 'Marketplace' section
        models.Track.bpm.between(bpm_min, bpm_max),
        models.Track.key.in_(compatible_keys)
    ).limit(5).all()

    return {
        "library": library_matches,
        "marketplace": marketplace_matches,
        "seed_track": {
            "title": seed_track.title,
            "bpm": seed_track.bpm,
            "key": seed_track.key
        }
    }
