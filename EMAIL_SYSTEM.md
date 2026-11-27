# AIRLINE NEXUS — AUTOMATED EMAIL DELIVERY & RESILIENCE

## 1. Automated Delivery Architecture

```
                      Booking Transaction Committed
                                    │
                                    ▼
                         Generate Digital Ticket
                                    │
                                    ▼
                      Publish Event to Kafka / Outbox
                                    │
                         ┌──────────┴──────────┐
                         ▼                     ▼
                  Java Mail Sender      Retry Queue (DLQ)
                  (Async Execution)     (Exponential Backoff)
                         │
                         ▼
                   Passenger Inbox
```

---

## 2. Asynchronous Decoupling Principle
- **Core Principle**: A failure in the email subsystem or SMTP timeout **NEVER rolls back a valid booking**.
- If SMTP fails, the booking transaction remains in `CONFIRMED` status, and the event is retained in the notification outbox for background retry.

---

## 3. Email Template Specifications

### Booking Confirmation
- **Subject**: `Your Airline Nexus Booking Confirmation — {PNR}`
- **Template Content**:
  - PNR and Flight Identifier (e.g. `NX-100001`, `ANX 204`)
  - Route corridor: Origin ➔ Destination
  - Scheduled departure and landing times
  - Seat assignment and cabin class
  - Passenger contact details
  - Attached Digital Ticket Summary
