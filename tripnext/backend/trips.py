from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime, timezone
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import Trip, TripCreate, TripResponse, User, Collaborator
from auth import get_current_user
from database import get_database

trips_router = APIRouter(prefix="/trips", tags=["trips"])

@trips_router.get("", response_model=List[TripResponse])
async def get_trips(
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all trips for current user"""
    user_id = str(current_user.id)
    
    # Find trips where user is owner or collaborator
    trips = await db.trips.find({
        "$or": [
            {"userId": user_id},
            {"collaborators.userId": user_id}
        ]
    }).to_list(1000)
    
    # Convert ObjectId to string and format dates
    result = []
    for trip in trips:
        trip["id"] = str(trip["_id"])
        if trip.get("startDate"):
            trip["startDate"] = trip["startDate"].isoformat() if isinstance(trip["startDate"], datetime) else trip["startDate"]
        if trip.get("endDate"):
            trip["endDate"] = trip["endDate"].isoformat() if isinstance(trip["endDate"], datetime) else trip["endDate"]
        result.append(TripResponse(**trip))
    
    return result

@trips_router.post("", response_model=TripResponse)
async def create_trip(
    trip_data: TripCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create new trip"""
    user_id = str(current_user.id)
    
    # Create trip document
    trip_dict = trip_data.dict(exclude={"collaboratorEmails"})
    trip_dict["userId"] = user_id
    trip_dict["spent"] = 0.0
    trip_dict["createdAt"] = datetime.now(timezone.utc)
    trip_dict["updatedAt"] = datetime.now(timezone.utc)
    
    # Add owner as first collaborator
    trip_dict["collaborators"] = [{
        "userId": user_id,
        "email": current_user.email,
        "name": current_user.name,
        "avatar": current_user.avatar,
        "role": "owner"
    }]
    
    # TODO: Add invited collaborators (would need to look up users by email)
    
    result = await db.trips.insert_one(trip_dict)
    trip_dict["id"] = str(result.inserted_id)
    
    # Format dates for response
    if trip_dict.get("startDate"):
        trip_dict["startDate"] = trip_dict["startDate"].isoformat() if isinstance(trip_dict["startDate"], datetime) else trip_dict["startDate"]
    if trip_dict.get("endDate"):
        trip_dict["endDate"] = trip_dict["endDate"].isoformat() if isinstance(trip_dict["endDate"], datetime) else trip_dict["endDate"]
    
    return TripResponse(**trip_dict)

@trips_router.get("/{trip_id}", response_model=TripResponse)
async def get_trip(
    trip_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get trip by ID"""
    user_id = str(current_user.id)
    
    try:
        trip = await db.trips.find_one({"_id": ObjectId(trip_id)})
    except:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    # Check if user has access
    has_access = trip["userId"] == user_id or any(
        c["userId"] == user_id for c in trip.get("collaborators", [])
    )
    if not has_access:
        raise HTTPException(status_code=403, detail="Access denied")
    
    trip["id"] = str(trip["_id"])
    if trip.get("startDate"):
        trip["startDate"] = trip["startDate"].isoformat() if isinstance(trip["startDate"], datetime) else trip["startDate"]
    if trip.get("endDate"):
        trip["endDate"] = trip["endDate"].isoformat() if isinstance(trip["endDate"], datetime) else trip["endDate"]
    
    return TripResponse(**trip)

@trips_router.put("/{trip_id}", response_model=TripResponse)
async def update_trip(
    trip_id: str,
    trip_data: TripCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update trip"""
    user_id = str(current_user.id)
    
    try:
        trip = await db.trips.find_one({"_id": ObjectId(trip_id)})
    except:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    # Check if user has access
    has_access = trip["userId"] == user_id or any(
        c["userId"] == user_id for c in trip.get("collaborators", [])
    )
    if not has_access:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Update trip
    update_data = trip_data.dict(exclude={"collaboratorEmails"}, exclude_unset=True)
    update_data["updatedAt"] = datetime.now(timezone.utc)
    
    await db.trips.update_one(
        {"_id": ObjectId(trip_id)},
        {"$set": update_data}
    )
    
    # Get updated trip
    updated_trip = await db.trips.find_one({"_id": ObjectId(trip_id)})
    updated_trip["id"] = str(updated_trip["_id"])
    
    if updated_trip.get("startDate"):
        updated_trip["startDate"] = updated_trip["startDate"].isoformat() if isinstance(updated_trip["startDate"], datetime) else updated_trip["startDate"]
    if updated_trip.get("endDate"):
        updated_trip["endDate"] = updated_trip["endDate"].isoformat() if isinstance(updated_trip["endDate"], datetime) else updated_trip["endDate"]
    
    return TripResponse(**updated_trip)

@trips_router.delete("/{trip_id}")
async def delete_trip(
    trip_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete trip"""
    user_id = str(current_user.id)
    
    try:
        trip = await db.trips.find_one({"_id": ObjectId(trip_id)})
    except:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    # Only owner can delete
    if trip["userId"] != user_id:
        raise HTTPException(status_code=403, detail="Only owner can delete trip")
    
    # Delete trip and related data
    await db.trips.delete_one({"_id": ObjectId(trip_id)})
    await db.destinations.delete_many({"tripId": trip_id})
    await db.flights.delete_many({"tripId": trip_id})
    await db.expenses.delete_many({"tripId": trip_id})
    
    return {"message": "Trip deleted successfully"}