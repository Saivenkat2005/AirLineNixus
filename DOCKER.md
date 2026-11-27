# AIRLINE NEXUS — CONTAINERIZATION & DOCKER TOPOLOGY

## 1. Docker Compose Services

```yaml
version: '3.8'

services:
  mysql:          # Port 3307:3306 (InnoDB storage with init.sql)
  redis:          # Port 6379 (In-memory lock & cache)
  zookeeper:      # Port 2181 (Kafka coordination)
  kafka:          # Port 9092 / 29092 (Event streaming)
  prometheus:     # Port 9090 (Telemetry collection)
  grafana:        # Port 3000 (Operational dashboards)
  loki:           # Port 3100 (Centralized log aggregation)
  tempo:          # Port 3200 (Distributed tracing)
  api-gateway:    # Port 4000 (Express reverse proxy & rate limiting)
  core-service:   # Port 8080 (Spring Boot 3 REST APIs)
  ai-service:     # Port 8000 (FastAPI AI Copilot & NLP)
  frontend:       # Port 80 (Vite React spatial UI)
```

---

## 2. Network Segmentation
- `public-network`: Internet-facing ingress for Frontend and API Gateway.
- `internal-network`: Service-to-service communication between Gateway, Core, AI, and Observability.
- `data-network`: Isolated network connecting Core Service and AI Service to MySQL, Redis, and Kafka.

---

## 3. Launch Command
```bash
docker compose up --build
```
