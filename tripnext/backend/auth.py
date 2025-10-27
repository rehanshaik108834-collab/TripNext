from fastapi import APIRouter, HTTPException, Response, Request, Depends
from datetime import datetime, timezone, timedelta
import requests
import logging
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import User, Session, UserResponse
from database import get_database

logger = logging.getLogger(__name__)

auth_router = APIRouter(prefix="/auth", tags=["auth"])

EMERGENT_AUTH_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"

async def get_current_user(request: Request, db: AsyncIOMotorDatabase = Depends(get_database)) -> User:
    """Get current user from session token in cookie or Authorization header"""
    session_token = None
    
    # Check cookie first
    session_token = request.cookies.get("session_token")
    
    # Fallback to Authorization header
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
    
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Find session in database
    session = await db.sessions.find_one({"sessionToken": session_token})
    if not session or session["expiresAt"] < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired or invalid")
    
    # Get user
    user = await db.users.find_one({"_id": session["userId"]})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    user["_id"] = str(user["_id"])
    return User(**user)

@auth_router.post("/session")
async def create_session(request: Request, response: Response, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Process session_id from Emergent Auth and create session"""
    try:
        # Get session_id from header
        session_id = request.headers.get("X-Session-ID")
        if not session_id:
            raise HTTPException(status_code=400, detail="Session ID required")
        
        # Call Emergent Auth API
        headers = {"X-Session-ID": session_id}
        auth_response = requests.get(EMERGENT_AUTH_URL, headers=headers, timeout=10)
        
        if auth_response.status_code != 200:
            raise HTTPException(status_code=400, detail="Invalid session ID")
        
        auth_data = auth_response.json()
        
        # Check if user exists
        existing_user = await db.users.find_one({"email": auth_data["email"]})
        
        if existing_user:
            user_id = str(existing_user["_id"])
        else:
            # Create new user
            user_data = {
                "email": auth_data["email"],
                "name": auth_data["name"],
                "avatar": auth_data.get("picture"),
                "googleId": auth_data["id"],
                "createdAt": datetime.now(timezone.utc),
                "updatedAt": datetime.now(timezone.utc)
            }
            result = await db.users.insert_one(user_data)
            user_id = str(result.inserted_id)
        
        # Create session
        session_token = auth_data["session_token"]
        expires_at = datetime.now(timezone.utc) + timedelta(days=7)
        
        session_data = {
            "userId": user_id,
            "sessionToken": session_token,
            "expiresAt": expires_at,
            "createdAt": datetime.now(timezone.utc)
        }
        await db.sessions.insert_one(session_data)
        
        # Set cookie
        response.set_cookie(
            key="session_token",
            value=session_token,
            httponly=True,
            secure=True,
            samesite="none",
            max_age=7 * 24 * 60 * 60,  # 7 days
            path="/"
        )
        
        # Get user data
        user = await db.users.find_one({"_id": user_id})
        
        return {
            "id": user_id,
            "email": auth_data["email"],
            "name": auth_data["name"],
            "avatar": auth_data.get("picture")
        }
        
    except requests.RequestException as e:
        logger.error(f"Error calling Emergent Auth: {e}")
        raise HTTPException(status_code=500, detail="Authentication failed")
    except Exception as e:
        logger.error(f"Error creating session: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@auth_router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current user info"""
    return UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        name=current_user.name,
        avatar=current_user.avatar
    )

@auth_router.post("/logout")
async def logout(request: Request, response: Response, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Logout user"""
    session_token = request.cookies.get("session_token")
    
    if session_token:
        # Delete session from database
        await db.sessions.delete_one({"sessionToken": session_token})
    
    # Clear cookie
    response.delete_cookie(key="session_token", path="/")
    
    return {"message": "Logged out successfully"}