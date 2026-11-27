# AIRLINE NEXUS — API SPECIFICATION & CONTRACT DOCUMENTATION

## 1. Base URLs
- **Direct API Gateway**: `http://localhost:4000/api/v1`
- **Core Service**: `http://localhost:8080`
- **AI Service**: `http://localhost:8000/api/v1/ai`

---

## 2. Common Headers

| Header | Required | Description | Example |
|---|---|---|---|
| `Content-Type` | Yes | Request mime type | `application/json` |
| `Authorization` | Conditional | Bearer JWT Token for protected endpoints | `Bearer eyJhbGciOi...` |
| `X-Correlation-ID` | Recommended | Distributed request correlation UUID | `c9b2e8a1-5d4f-4a3b-9a1c-8e2f3a4b5c6d` |
| `Idempotency-Key` | Recommended | Unique key preventing duplicate bookings | `idemp-98172648` |

---

## 3. Core Endpoints

### 3.1 Flight Management
#### `GET /api/v1/flights/all`
Returns all scheduled flights with current availability.

**Response `200 OK`**:
```json
[
  {
    "flightId": 1,
    "flightName": "ANX 204",
    "origin": "Delhi",
    "destination": "Mumbai",
    "takeOffTime": "06:30",
    "landingTime": "08:40",
    "totalSeats": 180,
    "price": 4850
  }
]
```

---

### 3.2 Ticket Verification (Section 23)
#### `GET /api/v1/tickets/verify/{pnr}`
Public and authorized ticket verification endpoint.

**Response `200 OK`**:
```json
{
  "verified": true,
  "pnr": "NX-100001",
  "bookingId": 1,
  "passenger": "Sai Venkat Ram",
  "flight": "ANX 204",
  "flightId": 1,
  "seat": "12A",
  "seatType": "Economy Class",
  "origin": "HYD",
  "destination": "DEL",
  "departure": "06:30",
  "date": "2026-10-15",
  "status": "CONFIRMED"
}
```

---

### 3.3 Dynamic Aviation Media
#### `GET /api/v1/media/aviation-backgrounds?category=aviation`
Returns cached, high-resolution aviation background image URLs.

**Response `200 OK`**:
```json
[
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
]
```

---

### 3.4 AI Travel Copilot
#### `POST /api/v1/ai/assistant/chat`
Autonomous flight query parsing and policy explanation.

**Request**:
```json
{
  "message": "Find a morning flight from Hyderabad to Delhi under 7000"
}
```

**Response `200 OK`**:
```json
{
  "reply": "Found 2 verified scheduled corridor(s) matching your request.",
  "intent": "FLIGHT_SEARCH",
  "filters": {
    "origin": "Hyderabad",
    "destination": "Delhi",
    "max_price": 7000,
    "time_preference": "morning"
  },
  "flights": [
    {
      "flightId": 1,
      "flightName": "ANX 204",
      "origin": "HYD",
      "destination": "DEL",
      "takeOffTime": "06:30",
      "price": 4850
    }
  ]
}
```
