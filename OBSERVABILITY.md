# AIRLINE NEXUS — OBSERVABILITY & MONITORING PLATFORM

## 1. Metrics Collection (Prometheus)
- **Scrape Targets**:
  - Spring Boot Actuator (`http://core-service:8080/actuator/prometheus`)
  - Node.js API Gateway (`http://api-gateway:4000/metrics`)
- **Key Metrics**:
  - `http_server_requests_seconds_count`
  - `http_server_requests_seconds_sum` (p50, p95, p99 latency)
  - `jvm_memory_used_bytes`
  - `hikaricp_connections_active`

---

## 2. Dashboards (Grafana)
- **Pre-provisioned Dashboards**:
  - `Gateway Latency & Rate Limiting`
  - `Flight Booking Velocity & Conversion`
  - `Cluster Service Health & Container Memory`

---

## 3. Distributed Tracing (Tempo / Jaeger) & Central Logs (Loki)
- Injected `X-Correlation-ID` header allows tracing a user's booking journey end-to-end across Gateway, Spring Boot Core, MySQL database queries, and Kafka event publishing.
