# AIRLINE NEXUS — SECURITY & PII COMPLIANCE

## 1. Authentication & Role-Based Access Control (RBAC)
- **Roles**:
  - `ROLE_USER` (ID 3): Browse flights, select seats, book tickets, view personal boarding passes.
  - `ROLE_MANAGER` (ID 2): View manifests, manage assigned flight schedules, trigger check-in alerts.
  - `ROLE_ADMIN` (ID 1): Full operational oversight, add/edit/delete flights and seat inventories, view cluster telemetry.

---

## 2. API Security & Sanitization
- **Gateway Rate Limiting**: Express rate limiters applied per IP for search, auth, AI, and ticket verification.
- **SQL Injection Prevention**: 100% parameterized JPA / Hibernate queries.
- **CORS Configuration**: Restrictive allowed origins, headers, and HTTP methods across API Gateway and Spring Boot.
- **Secret Management**: No credentials hardcoded; all API keys and DB passwords loaded from `.env`.

---

## 3. PII Safety & QR Code Security
- QR codes generated on Digital Tickets contain only non-sensitive verification identifiers (`PNR`, `FLIGHT`, `SEAT`).
- Payment credentials (credit card numbers, CVVs) are strictly ephemeral in the payment form and never persisted in database logs.
