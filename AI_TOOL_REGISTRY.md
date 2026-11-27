# AIRLINE NEXUS — AI TOOL REGISTRY & PROVIDER ABSTRACTION

## 1. Provider Abstraction Hierarchy
The AI Intelligence suite supports a 3-tier fallback architecture:
1. **Local LLM Provider**: Connects to locally running Ollama models (e.g. `llama3`, `mistral`).
2. **Cloud Provider**: Optional OpenAI / Gemini API integration via server-only
   `AI_CLOUD_PROVIDER`, `AI_CLOUD_API_KEY`, and `AI_CLOUD_MODEL` environment variables.
3. **Deterministic Fallback**: Rule-based regex parser and knowledge graph ensuring 100% uptime when external AI is offline.

---

## 2. Tool Registry

### `search_flights_tool`
- **Description**: Extracts structured origin, destination, date, and budget filters from natural language queries.
- **Timeout**: `3000ms` (enforced by `SafeToolRegistry`)
- **Rate Limit**: `30/min`
- **Fallback**: Regex keyword extractor (`extract_flight_params`)

### `fare_explain_tool`
- **Description**: Decomposes total price into itemized charges based on JPA SeatDetails pricing.
- **Timeout**: `2000ms` (enforced by `SafeToolRegistry`)
- **Rate Limit**: `60/min`
- **Fallback**: Fixed percentage decomposition formula (Base 80%, Taxes 12%, Fees 8%).

### `arrival_buffer_tool`
- **Description**: Computes recommended arrival time before departure.
- **Parameters**: `is_international` (boolean), `has_checked_bags` (boolean).
- **Rule**: Domestic: 120 mins (+30m with bags); International: 180 mins (+45m with bags).

All registered tools are read-only. Calls are audited, rejected when the per-minute
limit is exceeded, and asynchronous calls are cancelled when their configured timeout
expires.
