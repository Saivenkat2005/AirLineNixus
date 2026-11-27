# AIRLINE NEXUS 2.0 — RELIABILITY & RESILIENCE ENGINEERING

## 1. High Availability Architecture & Zero Data Loss
Airline Nexus 2.0 implements end-to-end fault tolerance across all tiers:
- **Transactional Source of Truth**: MySQL 8.0 with InnoDB ACID transactions, explicit row-level locking, and foreign key integrity.
- **Distributed Cache & Locking**: Redis 7.0 for temporary 5-minute seat holds (`seat:hold:{flightId}:{seatType}:{seatNumber}`) and idempotency key deduplication.
- **Safe Database Fallback**: If Redis becomes unreachable, the system falls back to database transaction isolation and in-memory synchronization rather than failing bookings.
- **Idempotent Booking Execution**: HTTP requests accept `Idempotency-Key` headers. Duplicate submissions return the authoritative cached booking rather than re-executing transactions.

---

## 2. Distributed Seat Management & Concurrency
- **Concurrency Problem**: Preventing race conditions and double bookings during simultaneous seat selection.
- **Defense-in-Depth Solution**:
  1. **Phase 1 (Optimistic Hold)**: When a passenger selects a seat in the 3D cabin, a Redis distributed lock is placed with a 5-minute TTL.
  2. **Phase 2 (Countdown Enforcement)**: The client displays a live expiration countdown. If not checked out within 5 minutes, the lock automatically expires.
  3. **Phase 3 (Pessimistic DB Verification)**: During `/booking/add`, the backend verifies whether the seat number is already stored in the `Booking` entity for that flight.
  4. **Phase 4 (Atomic Decrement & Manifest Flush)**: Available capacity is decremented atomically inside `@Transactional` scope.

---

## 3. Circuit Breakers, Timeouts & Graceful Degradation
- **FastAPI AI Intelligence Layer**: The core booking engine never depends synchronously on AI availability. If the AI service is offline, flight booking, search, and checkout continue uninterrupted with zero disruption.
- **External Image Provider (Pixabay)**: Handled asynchronously. If Pixabay rate limits or is offline, the system delivers high-resolution cached aviation backgrounds with instant zero-delay responses.
- **Email Service (SMTP)**: Failures in email delivery do not abort database booking transactions.
- **Structured Error Handling**: `GlobalExceptionHandler` intercepts unchecked runtime errors, logging correlation IDs and returning standard RFC 7807 error responses.

---

## 4. Disaster Recovery & Health Checks
- **Health Endpoints**:
  - API Gateway: `GET /health` and `GET /ready`
  - Core Java Service: `GET /actuator/health`
  - AI Service: `GET /health` and `GET /api/v1/ai/health`
- **Graceful Shutdown**: All services handle `SIGTERM` and `SIGINT` signals, draining inflight requests before process termination.
