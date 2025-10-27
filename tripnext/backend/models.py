from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")

# User Models
class User(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr
    name: str
    avatar: Optional[str] = None
    googleId: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    avatar: Optional[str] = None

# Session Models
class Session(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    userId: str
    sessionToken: str
    expiresAt: datetime
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Trip Models
class Collaborator(BaseModel):
    userId: str
    email: str
    name: str
    avatar: Optional[str] = None
    role: str = "editor"  # owner or editor

class TripBase(BaseModel):
    name: str
    destination: str
    startDate: Optional[datetime] = None
    endDate: Optional[datetime] = None
    coverImage: Optional[str] = None
    budget: float = 0.0

class TripCreate(TripBase):
    collaboratorEmails: Optional[List[str]] = []

class Trip(TripBase):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    userId: str
    spent: float = 0.0
    collaborators: List[Collaborator] = []
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, datetime: lambda v: v.isoformat()}

class TripResponse(BaseModel):
    id: str
    name: str
    destination: str
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    coverImage: Optional[str] = None
    budget: float
    spent: float
    collaborators: List[Collaborator]

# Destination Models
class DestinationBase(BaseModel):
    name: str
    address: str
    lat: float
    lng: float
    type: str = "attraction"
    day: int
    time: str
    notes: Optional[str] = None
    duration: int = 60  # minutes
    order: int = 0

class DestinationCreate(DestinationBase):
    pass

class Destination(DestinationBase):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    tripId: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, datetime: lambda v: v.isoformat()}

# Flight Models
class FlightBase(BaseModel):
    airline: str
    flightNumber: str
    from_: str = Field(..., alias="from")
    to: str
    departTime: str
    arriveTime: str
    date: datetime
    terminal: Optional[str] = None
    gate: Optional[str] = None
    confirmation: Optional[str] = None
    price: float = 0.0
    status: str = "Confirmed"

class FlightCreate(FlightBase):
    pass

class Flight(FlightBase):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    tripId: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, datetime: lambda v: v.isoformat()}

# Expense Models
class ExpenseBase(BaseModel):
    category: str
    amount: float
    description: str
    date: datetime = Field(default_factory=datetime.utcnow)

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    tripId: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, datetime: lambda v: v.isoformat()}