# AIRLINE NEXUS — COMPREHENSIVE PROJECT AUDIT

## 1. Executive Summary
- **Project Name**: Airline Nexus (formerly Air Ticket Booking System)
- **Transformation Target**: World-Class Autonomous Air Travel Platform
- **Architecture**: Microservices-Ready Distributed Architecture with React Frontend, Node.js API Gateway, Java Spring Boot Core Service, Python FastAPI AI Intelligence Suite, MySQL, Redis, Kafka, and Cloud Observability Stack.
- **Audit Date**: 2026-09-23
- **Overall Status**: Production-Hardened

---

## 2. Technology Inventory & Layer Audit

| Layer | Technology / Framework | Version | Directory / Entrypoint | Status |
|---|---|---|---|---|
| **Frontend** | React, Vite, TailwindCSS, Framer Motion | React 18.2, Vite 4.5 | `Frontend/src/main.jsx` | Verified & Production Built |
| **API Gateway** | Node.js, Express, Http-Proxy-Middleware | Express 4.18 | `Backend-Nexus/api-gateway/server.js` | Operational on Port 4000 |
| **Core Service** | Java 21, Spring Boot, Spring Data JPA | Spring Boot 3.1.5 | `Backend/airlines/src/main/java/.../AirlinesApplication.java` | Compiled (47 classes) on Port 8080 |
| **AI Intelligence** | Python, FastAPI, Pydantic | FastAPI 0.104.1 | `ai-service/app/main.py` | Operational on Port 8000 |
| **Primary Database** | MySQL 8.0 (InnoDB) | MySQL 8.0 | `docker-compose.yml` (Port 3307:3306) | Schema Initialized via `init.sql` |
| **Cache & Distributed Locks** | Redis | Redis 7 Alpine | `docker-compose.yml` (Port 6379) | Active TTL Locking |
| **Event Streaming** | Apache Kafka & Zookeeper | Confluent 7.4.0 | `docker-compose.yml` (Port 9092) | Topic `booking-events` |
| **Observability** | Prometheus, Grafana, Loki, Tempo | Latest | `docker-compose.yml` / `config/` | Scrapes Actuator & Gateway Metrics |

---

## 3. Database Schema & Entity Relationships

```mermaid
erDiagram
    APPLICATION_USER ||--o{ BOOKING : places
    FLIGHT ||--o{ BOOKING : contains
    FLIGHT ||--o{ SEAT_DETAILS : configures
    APPLICATION_USER ||--o{ ROLE : possesses

    APPLICATION_USER {
        bigint id PK
        varchar username
        varchar password
        varchar user_email
        varchar user_phone
        varchar user_address
    }

    FLIGHT {
        bigint flight_id PK
        varchar flight_name
        varchar origin
        varchar destination
        varchar take_off_time
        varchar landing_time
        bigint total_seats
    }

    SEAT_DETAILS {
        bigint seat_id PK
        bigint flight_id FK
        varchar seat_type
        bigint available_seats
        bigint price
    }

    BOOKING {
        bigint booking_id PK
        bigint customer_id FK
        bigint flight_id FK
        varchar seat_type
        varchar origin
        varchar destination
        varchar date
        bigint nop
        bigint total_price
    }
```

---

## 4. API Inventory & Routing Matrix

| HTTP Method | Route Endpoint | Upstream Service | Controller / Handler | Purpose | Auth Required |
|---|---|---|---|---|---|
| `POST` | `/auth/register` | Core Service | `AuthController` | User registration | No |
| `POST` | `/auth/login` | Core Service | `AuthController` | User authentication & JWT issuance | No |
| `GET` | `/flights/all` | Core Service | `FlightController` | Retrieve all scheduled flights | No |
| `POST` | `/flights/add` | Core Service | `FlightController` | Register new flight corridor | Yes (Admin) |
| `PUT` | `/flights/update` | Core Service | `FlightController` | Update flight schedule/specs | Yes (Admin) |
| `DELETE` | `/flights/delete/{id}` | Core Service | `FlightController` | Remove flight record | Yes (Admin) |
| `POST` | `/booking/add` | Core Service | `BookingController` | Create booking, decrement seats, publish event | Yes |
| `GET` | `/booking/get` | Core Service | `BookingController` | Retrieve all bookings (Manifest) | Yes (Admin) |
| `GET` | `/booking/get/{customerId}` | Core Service | `BookingController` | Retrieve bookings for specific traveler | Yes |
| `GET` | `/booking/getbooking/{id}` | Core Service | `BookingController` | Retrieve single booking details | Yes |
| `DELETE` | `/booking/delete/{id}` | Core Service | `BookingController` | Cancel booking & release seats | Yes |
| `GET` | `/tickets/verify/{pnr}` | Core Service | `TicketController` | Public/Authorized PNR ticket verification | No |
| `GET` | `/backgrounds` | Core Service | `PixabayController` | Dynamic aviation background rotation | No |
| `GET` | `/seat/getseats/{flightId}` | Core Service | `SeatTypeController` | Retrieve cabin seat inventory | Yes |
| `POST` | `/seat/add` | Core Service | `SeatTypeController` | Configure new seat class inventory | Yes (Admin) |
| `POST` | `/api/v1/ai/assistant/chat` | AI Service | `assistant.py` | Natural language travel copilot | No |
| `POST` | `/api/v1/ai/search` | AI Service | `search.py` | Natural language search extraction | No |
| `POST` | `/api/v1/ai/compare` | AI Service | `compare.py` | Multi-flight comparison intelligence | No |
| `POST` | `/api/v1/ai/explain` | AI Service | `explain.py` | Transparent fare & delay explainer | No |
| `GET` | `/health` | Gateway / Core / AI | Gateway / Actuator | System health & readiness check | No |

---

## 5. Security & Zero-Fake Functionality Verification
1. **Real Data Guarantee**: All flights, seat configurations, passenger profiles, and bookings reflect real MySQL transactions.
2. **Authoritative State**: Frontend never fabricates payment success or seat allocation.
3. **Resilience**: Optional AI and media providers degrade gracefully without blocking core ticket booking workflows.
