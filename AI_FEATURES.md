# AIRLINE NEXUS — AUTONOMOUS AI INTELLIGENCE & EVALUATION PLATFORM

## 1. Architectural Overview
Airline Nexus features a dedicated Python FastAPI intelligence service adhering to the **AI Hallucination Firewall**, **Tenant Isolation Boundary**, and **Zero Unconfirmed Mutation Guarantee**:
- Strictly read-only for database modifications without explicit passenger confirmation.
- Translates unstructured natural language into validated flight filters and safe application actions.
- Integrates with the existing Java Spring Boot backend, MySQL ACID database, and Redis distributed hold locks.
- Provider-independent LLM adapter supporting Google Gemini, OpenAI, local Ollama, and a 100% resilient Deterministic Engine.

---

## 2. Integrated Autonomous AI Agents

### 1. Intelligent Travel Copilot (`/api/v1/ai/agents/travel-copilot`)
- Multi-turn conversational travel copilot with session memory.
- Natural language flight search ("Find the cheapest flight from Hyderabad to Delhi tomorrow morning under ₹8,000").
- Flight comparison and trade-off explanations grounded in real database inventory.
- Multilingual support: English, Telugu (తెలుగు), and Hindi (हिन्दी).

### 2. AI Multi-City Trip Planner (`/api/v1/ai/agents/multi-city-plan`)
- Multi-city travel planning (e.g. HYD ➔ DEL ➔ BOM ➔ BLR).
- Real flight schedule integration and connection/layover analysis.
- Enforces passenger budget ceilings and calculates price variances.
- Generates day-by-day travel itineraries and destination activity blueprints.

### 3. Authenticated Passenger Support Agent (`/api/v1/ai/agents/passenger-support`)
- Retrieves verified booking details from MySQL for the authenticated passenger.
- Answers questions on baggage allowances, check-in deadlines, and flight disruptions.
- Grounded with official document citations (e.g., `[DOC-BAG-2026]`, `[DOC-REF-2026]`).
- Multilingual responses matching passenger preference.

### 4. AI Seat Selection Intelligence (`/api/v1/ai/agents/seat-recommendations`)
- Recommends seats based on ergonomic preferences: Window, Aisle, Extra Legroom (Exit Row 14-16), Family Cluster, Accessibility.
- Enforces DGCA/FAA Civil Aviation Safety Regulations: strictly alerts and prevents infants from being assigned to emergency exit rows.
- Explains reasons while validating against real-time seat inventory and 5-minute Redis hold locks.

### 5. AI Booking Recovery Agent (`/api/v1/ai/agents/booking-recovery`)
- Detects pending or interrupted checkout workflows.
- Reconciles payment gateway transaction tokens against the MySQL booking ledger.
- Prevents duplicate payment deduction and provides clear status transparency.
- Never independently marks a payment as successful without backend verification.

### 6. AI Flight Change Impact Analyzer (`/api/v1/ai/agents/flight-change`)
- Evaluates flight reschedule requests between real scheduled flights.
- Calculates exact fare differences and rescheduling fee schedules.
- Checks seat availability on the target flight.
- Generates an actionable preview requiring explicit passenger confirmation before execution.

### 7. Passenger Intent-to-Action Engine (`/api/v1/ai/agents/intent-action`)
- Converts natural-language instructions ("Change my flight to tomorrow evening and keep my window seat", "Cancel booking NX-104") into safe backend payloads.
- Generates preview summaries, calculates cost impacts, and requires explicit confirmation tokens.

### 8. AI Airline Operations Copilot (`/api/v1/ai/agents/operations-copilot`)
- Admin-only operational intelligence connected to live fleet data.
- Fleet occupancy analytics and on-time departure rates.
- Overbooking risk governor flagging flights with load factors >95%.
- Cancellation root cause analysis and actionable operational directives.

### 9. RAG Airline Knowledge System (`/api/v1/ai/retrieval/rag_system.py`)
- Ingests verified airline documentation: baggage rules, refund schedules, 24-hour statutory cooling-off, check-in cutoffs, and overbooking vouchers.
- Semantic token and keyword matching with source citations.
- Explicit fallback acknowledgment when an unverified policy is requested.

### 10. AI Booking Communication Agent (`/api/v1/ai/agents/generate-email`)
- Generates personalized booking confirmation emails, cancellation notices, and refund advisories.
- Formats clean plain-text and responsive HTML templates.
- Multilingual generation in English, Telugu, and Hindi.
- Triggered only after backend confirms a successful booking.

### 11. AI Digital Travel Companion (`/api/v1/ai/agents/travel-companion`)
- Personalized trip briefings, pre-flight checklists, check-in countdowns, and DigiYatra biometric guidance.

---

## 3. Safety Guard Matrix

| Action | AI Permission | Required User Action |
|---|---|---|
| Natural Language Flight Search | Allowed | Direct Execution |
| Flight Matrix Comparison | Allowed | Direct Execution |
| Fare & Baggage Explanation | Allowed | Direct Execution |
| Seat Selection Recommendation | Allowed | User selects / holds on 3D Seat Map |
| Reserve / Hold Seat (5 min) | Restricted | User triggers 5-minute Redis hold |
| Booking Confirmation | Prohibited | Explicit User Submit |
| Payment Processing | Prohibited | Explicit User Payment via Gateway |
| Flight Rescheduling / Cancellation | Prohibited | Explicit Confirmation Token Submit |
| Operations Intelligence Report | Admin Only | Authenticated Administrator Access |
