# Wanderlog Clone - API Contracts & Integration Plan

## Overview
This document outlines the API contracts, database schema, and integration strategy for connecting the frontend to backend.

## Database Schema

### Users Collection
```
{
  _id: ObjectId,
  email: string,
  name: string,
  avatar: string,
  googleId: string,
  createdAt: datetime,
  updatedAt: datetime
}
```

### Trips Collection
```
{
  _id: ObjectId,
  userId: ObjectId (owner),
  name: string,
  destination: string,
  startDate: datetime,
  endDate: datetime,
  coverImage: string,
  budget: float,
  spent: float,
  collaborators: [
    {
      userId: ObjectId,
      email: string,
      name: string,
      avatar: string,
      role: string (owner/editor)
    }
  ],
  createdAt: datetime,
  updatedAt: datetime
}
```

### Destinations Collection
```
{
  _id: ObjectId,
  tripId: ObjectId,
  name: string,
  address: string,
  lat: float,
  lng: float,
  type: string (attraction/restaurant/hotel/beach/etc),
  day: int,
  time: string,
  notes: string,
  duration: int (minutes),
  order: int,
  createdAt: datetime,
  updatedAt: datetime
}
```

### Flights Collection
```
{
  _id: ObjectId,
  tripId: ObjectId,
  airline: string,
  flightNumber: string,
  from: string,
  to: string,
  departTime: string,
  arriveTime: string,
  date: datetime,
  terminal: string,
  gate: string,
  confirmation: string,
  price: float,
  status: string,
  createdAt: datetime,
  updatedAt: datetime
}
```

### Expenses Collection
```
{
  _id: ObjectId,
  tripId: ObjectId,
  category: string,
  amount: float,
  description: string,
  date: datetime,
  createdAt: datetime,
  updatedAt: datetime
}
```

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login/signup
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Trips
- `GET /api/trips` - Get all trips for user
- `POST /api/trips` - Create new trip
- `GET /api/trips/{trip_id}` - Get trip details
- `PUT /api/trips/{trip_id}` - Update trip
- `DELETE /api/trips/{trip_id}` - Delete trip
- `POST /api/trips/{trip_id}/collaborators` - Add collaborator
- `DELETE /api/trips/{trip_id}/collaborators/{user_id}` - Remove collaborator

### Destinations
- `GET /api/trips/{trip_id}/destinations` - Get all destinations for trip
- `POST /api/trips/{trip_id}/destinations` - Add destination
- `PUT /api/destinations/{destination_id}` - Update destination
- `DELETE /api/destinations/{destination_id}` - Delete destination

### Flights
- `GET /api/trips/{trip_id}/flights` - Get all flights for trip
- `POST /api/trips/{trip_id}/flights` - Add flight
- `PUT /api/flights/{flight_id}` - Update flight
- `DELETE /api/flights/{flight_id}` - Delete flight

### Expenses
- `GET /api/trips/{trip_id}/expenses` - Get all expenses for trip
- `POST /api/trips/{trip_id}/expenses` - Add expense
- `PUT /api/expenses/{expense_id}` - Update expense
- `DELETE /api/expenses/{expense_id}` - Delete expense

## Mock Data to Replace

### mockData.js
- `mockTrips` → API: GET /api/trips
- `mockDestinations` → API: GET /api/trips/{trip_id}/destinations
- `mockFlights` → API: GET /api/trips/{trip_id}/flights
- `mockUser` → API: GET /api/auth/me

### Components to Update
1. **App.js** - Replace localStorage auth with real API calls
2. **TripsPage.jsx** - Fetch trips from API
3. **NewTripPage.jsx** - POST to create trip endpoint
4. **TripDetailPage.jsx** - Fetch trip, destinations, flights from API
5. **BudgetView.jsx** - Fetch and manage expenses via API
6. **AuthPage.jsx** - Integrate Emergent Google OAuth

## Frontend Integration Steps
1. Create API service layer (src/services/api.js)
2. Implement JWT token management
3. Add axios interceptors for auth
4. Replace mock data calls with API calls
5. Add error handling and loading states
6. Test all CRUD operations

## Backend Implementation Order
1. Set up authentication with Emergent Google OAuth
2. Create database models
3. Implement trips CRUD endpoints
4. Implement destinations CRUD endpoints
5. Implement flights CRUD endpoints
6. Implement expenses CRUD endpoints
7. Add authorization middleware
8. Test all endpoints
