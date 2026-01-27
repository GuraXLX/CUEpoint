import jwt
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from sqlalchemy.orm import Session
import os
import models
from database import get_db

security = HTTPBearer()

# Get Supabase JWT secret from environment
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

if not SUPABASE_JWT_SECRET:
    raise ValueError("SUPABASE_JWT_SECRET environment variable is required")

def verify_supabase_token(credentials: HTTPAuthCredentials = Security(security)):
    """Verify Supabase JWT token and return payload"""
    try:
        payload = jwt.decode(
            credentials.credentials,
            SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated"
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(
    token_payload: dict = Depends(verify_supabase_token),
    db: Session = Depends(get_db)
):
    """Get current user from Supabase token payload"""
    user_id = token_payload.get("sub")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    
    # Try to find user by Supabase ID (stored in email for now)
    # TODO: Add supabase_id column to users table for proper mapping
    user = db.query(models.User).filter(models.User.email == token_payload.get("email")).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user
