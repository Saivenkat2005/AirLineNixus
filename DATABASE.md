# AIRLINE NEXUS — DATABASE ARCHITECTURE & SCHEMA

## 1. Engine & Storage Overview
- **Database Engine**: MySQL 8.0 with InnoDB Storage Engine.
- **Connection Pool**: HikariCP configured for bounded connection limits and fast recycling.

---

## 2. Table Schemas & Indices

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_email VARCHAR(150) NOT NULL UNIQUE,
    user_phone VARCHAR(20),
    user_address VARCHAR(255)
);

CREATE TABLE flights (
    flight_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    flight_name VARCHAR(100) NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    take_off_time VARCHAR(20) NOT NULL,
    landing_time VARCHAR(20) NOT NULL,
    total_seats BIGINT NOT NULL,
    INDEX idx_flight_corridor (origin, destination),
    INDEX idx_flight_name (flight_name)
);

CREATE TABLE seat_details (
    seat_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    flight_id BIGINT NOT NULL,
    seat_type VARCHAR(50) NOT NULL,
    available_seats BIGINT NOT NULL,
    price BIGINT NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES flights(flight_id) ON DELETE CASCADE,
    INDEX idx_flight_seat_type (flight_id, seat_type)
);

CREATE TABLE bookings (
    booking_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    flight_id BIGINT NOT NULL,
    seat_type VARCHAR(50) NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    date VARCHAR(20) NOT NULL,
    nop BIGINT NOT NULL,
    total_price BIGINT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (flight_id) REFERENCES flights(flight_id) ON DELETE CASCADE,
    INDEX idx_booking_customer (customer_id),
    INDEX idx_booking_flight (flight_id)
);
```
