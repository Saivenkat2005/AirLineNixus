# AIRLINE NEXUS — EVENT-DRIVEN NOTIFICATION SYSTEM

## 1. Event Schemas (Kafka Topic: `booking-events`)

```json
{
  "eventId": "evt_9a8b7c6d",
  "eventType": "BOOKING_CREATED",
  "timestamp": "2026-09-23T19:30:00Z",
  "correlationId": "c9b2e8a1-5d4f-4a3b-9a1c-8e2f3a4b5c6d",
  "payload": {
    "bookingId": 1,
    "pnr": "NX-100001",
    "customerId": 3,
    "flightId": 1,
    "flightName": "ANX 204",
    "origin": "DEL",
    "destination": "BOM",
    "seatType": "Economy Class",
    "totalPrice": 4850
  }
}
```

---

## 2. In-App Notification Center
- **Component**: `NotificationCenter.jsx` in React UI.
- **Features**:
  - Live toast alerts on booking confirmation and check-in status.
  - Persistent notification list with unread counter.
  - Priority flags (`CRITICAL`, `WARNING`, `INFO`).
  - Batch actions: "Mark All as Read", "Clear Notifications".
