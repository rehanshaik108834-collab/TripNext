from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime, timezone
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import Flight, FlightCreate, User
from auth import get_current_user
from database import get_database
from destinations import check_trip_access

flights_router = APIRouter(prefix="/flights", tags=["flights"])

@flights_router.get("/trip/{trip_id}", response_model=List[Flight])
async def get_flights(
    trip_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all flights for a trip"""
    await check_trip_access(trip_id, str(current_user.id), db)
    
    flights = await db.flights.find({"tripId": trip_id}).sort("date", 1).to_list(1000)
    
    for flight in flights:
        flight["id"] = str(flight["_id"])
        flight["from"] = flight.get("from_", flight.get("from", ""))
    
    return [Flight(**flight) for flight in flights]

@flights_router.post("/trip/{trip_id}", response_model=Flight)
async def create_flight(
    trip_id: str,
    flight_data: FlightCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Add flight to trip"""
    await check_trip_access(trip_id, str(current_user.id), db)
    
    flight_dict = flight_data.dict()
    flight_dict["from_"] = flight_dict.pop("from")
    flight_dict["tripId"] = trip_id
    flight_dict["createdAt"] = datetime.now(timezone.utc)
    flight_dict["updatedAt"] = datetime.now(timezone.utc)
    
    result = await db.flights.insert_one(flight_dict)
    flight_dict["id"] = str(result.inserted_id)
    flight_dict["from"] = flight_dict.pop("from_")
    
    return Flight(**flight_dict)

@flights_router.put("/{flight_id}", response_model=Flight)
async def update_flight(
    flight_id: str,
    flight_data: FlightCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update flight"""
    try:
        flight = await db.flights.find_one({"_id": ObjectId(flight_id)})
    except:
        raise HTTPException(status_code=404, detail="Flight not found")
    
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    
    await check_trip_access(flight["tripId"], str(current_user.id), db)
    
    update_data = flight_data.dict(exclude_unset=True)
    if "from" in update_data:
        update_data["from_"] = update_data.pop("from")
    update_data["updatedAt"] = datetime.now(timezone.utc)
    
    await db.flights.update_one(
        {"_id": ObjectId(flight_id)},
        {"$set": update_data}
    )
    
    updated_flight = await db.flights.find_one({"_id": ObjectId(flight_id)})
    updated_flight["id"] = str(updated_flight["_id"])
    updated_flight["from"] = updated_flight.get("from_", updated_flight.get("from", ""))
    
    return Flight(**updated_flight)

@flights_router.delete("/{flight_id}")
async def delete_flight(
    flight_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete flight"""
    try:
        flight = await db.flights.find_one({"_id": ObjectId(flight_id)})
    except:
        raise HTTPException(status_code=404, detail="Flight not found")
    
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    
    await check_trip_access(flight["tripId"], str(current_user.id), db)
    
    await db.flights.delete_one({"_id": ObjectId(flight_id)})
    
    return {"message": "Flight deleted successfully"}