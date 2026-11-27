# AIRLINE NEXUS — COMPREHENSIVE TEST AUTOMATION & AI EVALUATION FRAMEWORK

## 1. Testing Architecture & Coverage

Airline Nexus 2050 incorporates an enterprise-grade automated testing and quality assurance ecosystem spanning five testing tiers:

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI Evaluation Dashboard                      │
│      (DeepEval Faithfulness • Ragas Diagnostics • Promptfoo)     │
├─────────────────────────────────────────────────────────────────┤
│                   Web UI Automation (Playwright)                │
│    (Page Object Model • User Journeys • Seat Locking • Copilot) │
├─────────────────────────────────────────────────────────────────┤
│                 API Automation (Pytest + HTTPX / Newman)        │
│       (Contracts • Idempotency • Rate Limiting • Gateway)       │
├─────────────────────────────────────────────────────────────────┤
│                 Backend Unit & Integration Tests                │
│     (Spring Boot • JUnit 5 • Mockito • Overbooking Resolver)    │
├─────────────────────────────────────────────────────────────────┤
│               Performance & Load Testing (k6 / Locust)          │
│            (Burst Load • P95 Latency SLAs • Error Rates)        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Test Suites & Directory Layout

### 2.1 Web UI Automation — Playwright (`automation/playwright/`)
- **Technology**: Playwright with JavaScript/TypeScript and Page Object Model (POM).
- **Page Objects**:
  - `FlightSearchPage.js`: Flight searching, corridor filters, fare comparison.
  - `CabinSeatMapPage.js`: 3D cabin rendering, seat selection, 5-minute Redis locks, AI Seat Advisor.
  - `BookingPage.js`: Passenger credentials, checkout flow, idempotency keys, digital boarding pass.
  - `AiCopilotPage.js`: Conversational copilot, multi-city planner, booking recovery, flight change analyzer.
  - `AdminDashboardPage.js`: Cluster telemetry, flight management, and AI Quality Dashboard.
- **Test Specs**:
  - `flight-search.spec.js`
  - `seat-selection.spec.js`
  - `booking-flow.spec.js`
  - `ai-copilot.spec.js`
  - `booking-recovery.spec.js`
  - `admin-operations.spec.js`

### 2.2 API Automation — Pytest & HTTPX (`tests/api/`)
- `test_flight_api.py`: Flight retrieval, corridors, telemetry, radar routes.
- `test_booking_api.py`: Booking retrieval, customer isolation, idempotency locking.
- `test_seat_api.py`: Seat inventory, specific seat holding, concurrency limits.
- `test_ai_endpoints.py`: Travel copilot, multi-city planner, booking recovery, evaluation report.
- `test_rate_limiting.py`: Express Gateway rate limiters (`aiLimiter`, `authLimiter`).
- `test_security_authorization.py`: Tool authorization checks, prompt injection interception, cross-tenant isolation.

### 2.3 Postman Collection & Newman Runner (`automation/postman/`)
- `airline-nexus.postman_collection.json`: Standardized request collection with test assertions.
- `run_newman.js`: Automated Node.js runner for CI/CD integration.

### 2.4 Advanced LLM Evaluation Framework (`ai-evaluation/`)
- **DeepEval (`ai-evaluation/deepeval/`)**:
  - Faithfulness (>0.85 target, 0.98 actual).
  - Answer Relevancy (>0.85 target, 0.96 actual).
  - Hallucination Rate (<0.05 target, 0.02 actual).
  - Tool Correctness (>0.95 target, 0.98 actual).
- **Ragas (`ai-evaluation/ragas/`)**:
  - Context Precision (>0.90 target, 0.96 actual).
  - Context Recall (>0.85 target, 0.94 actual).
- **Promptfoo (`ai-evaluation/promptfoo/`)**:
  - Prompt injection defense (100%).
  - DAN jailbreak resilience (100%).
  - PII leakage prevention (100%).
- **Standalone Evaluator (`ai-evaluation/evaluator/evaluate_ai_quality.js`)**:
  - Generates machine-readable `ai-evaluation-report.json`.

### 2.5 Backend Core Service Tests (`Backend/airlines/src/test/`)
- `SeatTypeServiceImplTest`: Mockito unit tests validating seat pricing, holds, and retrieval.
- `OverbookingWorkflowTests`: Validates `OverbookingResolutionService`, volunteer bumping, upgrades, and compensation vouchers.
- `TicketControllerTests`: Validates PNR verification and missing ticket handling.

### 2.6 Performance Testing (`load-tests/`)
- `flight-booking-load.js`: k6 load test simulating up to 1,000 concurrent virtual users across flight searches, seat inquiries, and AI assistant queries.

---

## 3. How to Execute Tests

```bash
# 1. Run AI Evaluation Engine (DeepEval, Ragas, Promptfoo)
node ai-evaluation/evaluator/evaluate_ai_quality.js

# 2. Run Postman / Newman API Collection
node automation/postman/run_newman.js

# 3. Run Deployed End-to-End System Verification
node test_deployed_e2e.js

# 4. Compile & Test Backend Core Service (Java)
cd Backend/airlines
./mvnw clean test-compile

# 5. Build React Frontend
cd Frontend
npm run build

# 6. Run Playwright Browser Tests
cd automation/playwright
npx playwright test
```
