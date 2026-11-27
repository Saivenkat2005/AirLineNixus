# ✈️ Airline Nexus 2.0 - Core API Documentation

## 1. Gateway Routing
The `api-gateway` (Node.js/Express) runs on port `4000` and forwards requests to the appropriate backend microservices.

### Routes:
* `/api/v1/auth/*` ➔ `http://backend:8080/auth/*`
* `/api/v1/flights/*` ➔ `http://backend:8080/flights/*`
* `/api/v1/seat/*` ➔ `http://backend:8080/seat/*`
* `/api/v1/booking/*` ➔ `http://backend:8080/booking/*`
* `/api/v1/media/*` ➔ `http://backend:8080/backgrounds/*`
* `/api/v1/ai/*` ➔ `http://ai-service:8000/*`

## 2. Seat Matrix & Concurrency Endpoints

### 2.1 Get Real-Time Seat Status
`GET /api/v1/seat/status/{flightId}/{seatType}`

Fetches the live status of all seats for a given flight and cabin class.
Computes occupancy by cross-referencing committed `Booking` entities and active `Redis` locks.

**Response (List of SeatStatusDTO):**
```json
[
  {
    "id": "1A",
    "number": "1A",
    "status": "OCCUPIED",
    "isPremium": true
  },
  {
    "id": "1B",
    "number": "1B",
    "status": "AVAILABLE",
    "isPremium": false
  }
]
```

### 2.2 Hold / Lock Specific Seat
`POST /api/v1/seat/hold/specific/{flightId}/{seatType}/{seatNumber}?userId={userId}`

Attempts to place an optimistic distributed lock (TTL: 5 minutes) on the seat to prevent race conditions during checkout.

**Response:**
* `200 OK`: Seat `{seatNumber}` held successfully for 5 minutes.
* `409 Conflict`: Seat is already held or unavailable.

## 3. Flight Operations Endpoints

### 3.1 Get All Flights
`GET /api/v1/flights/all`

Returns the global directory of scheduled flights.

### 3.2 Add Flight
`POST /api/v1/flights/add`

Creates a new flight corridor in the system.

## 4. Artificial Intelligence (Python AI Service)

### 4.1 Chat Assistant
`POST /api/v1/ai/chat`

Handles natural language queries, acting as the intelligent Travel Copilot. Features the Hallucination Firewall, ensuring it fetches the live `/flights/all` dataset before reasoning.

**Request:**
```json
{
  "message": "Find me a flight from Delhi to Mumbai tomorrow morning under 5000"
}
```

**Response (AssistantChatResponse):**
```json
{
  "reply": "Found 1 verified scheduled corridor(s) matching your request...",
  "intent": "FLIGHT_SEARCH",
  "filters": {
    "source": "Delhi",
    "destination": "Mumbai",
    "departure_period": "morning",
    "max_price": 5000.0
  },
  "flights": [ ... ]
}
```
