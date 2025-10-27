from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime, timezone
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import Destination, DestinationCreate, User
from auth import get_current_user
from database import get_database

destinations_router = APIRouter(prefix="/destinations", tags=["destinations"])

async def check_trip_access(trip_id: str, user_id: str, db: AsyncIOMotorDatabase):
    """Check if user has access to trip"""
    try:
        trip = await db.trips.find_one({"_id": ObjectId(trip_id)})
    except:
        trip = await db.trips.find_one({"_id": trip_id})
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    has_access = trip["userId"] == user_id or any(
        c["userId"] == user_id for c in trip.get("collaborators", [])
    )
    if not has_access:
        raise HTTPException(status_code=403, detail="Access denied")
    
    return trip

@destinations_router.get("/trip/{trip_id}", response_model=List[Destination])
async def get_destinations(
    trip_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all destinations for a trip"""
    await check_trip_access(trip_id, str(current_user.id), db)
    
    destinations = await db.destinations.find({"tripId": trip_id}).sort("day", 1).sort("order", 1).to_list(1000)
    
    for dest in destinations:
        dest["id"] = str(dest["_id"])
    
    return [Destination(**dest) for dest in destinations]

@destinations_router.post("/trip/{trip_id}", response_model=Destination)
async def create_destination(
    trip_id: str,
    destination_data: DestinationCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Add destination to trip"""
    await check_trip_access(trip_id, str(current_user.id), db)
    
    dest_dict = destination_data.dict()
    dest_dict["tripId"] = trip_id
    dest_dict["createdAt"] = datetime.now(timezone.utc)
    dest_dict["updatedAt"] = datetime.now(timezone.utc)
    
    result = await db.destinations.insert_one(dest_dict)
    dest_dict["id"] = str(result.inserted_id)
    
    return Destination(**dest_dict)

@destinations_router.put("/{destination_id}", response_model=Destination)
async def update_destination(
    destination_id: str,
    destination_data: DestinationCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update destination"""
    try:
        destination = await db.destinations.find_one({"_id": ObjectId(destination_id)})
    except:
        raise HTTPException(status_code=404, detail="Destination not found")
    
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    
    await check_trip_access(destination["tripId"], str(current_user.id), db)
    
    update_data = destination_data.dict(exclude_unset=True)
    update_data["updatedAt"] = datetime.now(timezone.utc)
    
    await db.destinations.update_one(
        {"_id": ObjectId(destination_id)},
        {"$set": update_data}
    )
    
    updated_dest = await db.destinations.find_one({"_id": ObjectId(destination_id)})
    updated_dest["id"] = str(updated_dest["_id"])
    
    return Destination(**updated_dest)

@destinations_router.delete("/{destination_id}")
async def delete_destination(
    destination_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete destination"""
    try:
        destination = await db.destinations.find_one({"_id": ObjectId(destination_id)})
    except:
        raise HTTPException(status_code=404, detail="Destination not found")
    
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    
    await check_trip_access(destination["tripId"], str(current_user.id), db)
    
    await db.destinations.delete_one({"_id": ObjectId(destination_id)})
    
    return {"message": "Destination deleted successfully"}