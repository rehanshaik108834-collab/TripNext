from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime, timezone
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import Expense, ExpenseCreate, User
from auth import get_current_user
from database import get_database
from destinations import check_trip_access

expenses_router = APIRouter(prefix="/expenses", tags=["expenses"])

@expenses_router.get("/trip/{trip_id}", response_model=List[Expense])
async def get_expenses(
    trip_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all expenses for a trip"""
    await check_trip_access(trip_id, str(current_user.id), db)
    
    expenses = await db.expenses.find({"tripId": trip_id}).sort("date", -1).to_list(1000)
    
    # Calculate total spent and update trip
    total_spent = sum(exp["amount"] for exp in expenses)
    await db.trips.update_one(
        {"_id": ObjectId(trip_id) if ObjectId.is_valid(trip_id) else trip_id},
        {"$set": {"spent": total_spent}}
    )
    
    for expense in expenses:
        expense["id"] = str(expense["_id"])
    
    return [Expense(**expense) for expense in expenses]

@expenses_router.post("/trip/{trip_id}", response_model=Expense)
async def create_expense(
    trip_id: str,
    expense_data: ExpenseCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Add expense to trip"""
    await check_trip_access(trip_id, str(current_user.id), db)
    
    expense_dict = expense_data.dict()
    expense_dict["tripId"] = trip_id
    expense_dict["createdAt"] = datetime.now(timezone.utc)
    expense_dict["updatedAt"] = datetime.now(timezone.utc)
    
    result = await db.expenses.insert_one(expense_dict)
    expense_dict["id"] = str(result.inserted_id)
    
    # Update trip's spent amount
    expenses = await db.expenses.find({"tripId": trip_id}).to_list(1000)
    total_spent = sum(exp["amount"] for exp in expenses)
    await db.trips.update_one(
        {"_id": ObjectId(trip_id) if ObjectId.is_valid(trip_id) else trip_id},
        {"$set": {"spent": total_spent}}
    )
    
    return Expense(**expense_dict)

@expenses_router.put("/{expense_id}", response_model=Expense)
async def update_expense(
    expense_id: str,
    expense_data: ExpenseCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update expense"""
    try:
        expense = await db.expenses.find_one({"_id": ObjectId(expense_id)})
    except:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    await check_trip_access(expense["tripId"], str(current_user.id), db)
    
    update_data = expense_data.dict(exclude_unset=True)
    update_data["updatedAt"] = datetime.now(timezone.utc)
    
    await db.expenses.update_one(
        {"_id": ObjectId(expense_id)},
        {"$set": update_data}
    )
    
    updated_expense = await db.expenses.find_one({"_id": ObjectId(expense_id)})
    updated_expense["id"] = str(updated_expense["_id"])
    
    # Update trip's spent amount
    trip_id = expense["tripId"]
    expenses = await db.expenses.find({"tripId": trip_id}).to_list(1000)
    total_spent = sum(exp["amount"] for exp in expenses)
    await db.trips.update_one(
        {"_id": ObjectId(trip_id) if ObjectId.is_valid(trip_id) else trip_id},
        {"$set": {"spent": total_spent}}
    )
    
    return Expense(**updated_expense)

@expenses_router.delete("/{expense_id}")
async def delete_expense(
    expense_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete expense"""
    try:
        expense = await db.expenses.find_one({"_id": ObjectId(expense_id)})
    except:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    await check_trip_access(expense["tripId"], str(current_user.id), db)
    
    trip_id = expense["tripId"]
    await db.expenses.delete_one({"_id": ObjectId(expense_id)})
    
    # Update trip's spent amount
    expenses = await db.expenses.find({"tripId": trip_id}).to_list(1000)
    total_spent = sum(exp["amount"] for exp in expenses)
    await db.trips.update_one(
        {"_id": ObjectId(trip_id) if ObjectId.is_valid(trip_id) else trip_id},
        {"$set": {"spent": total_spent}}
    )
    
    return {"message": "Expense deleted successfully"}