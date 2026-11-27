from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import (
    search,
    compare,
    explain,
    trip_plan,
    baggage,
    faq,
    assistant,
    health,
    v3_router,
    agents_router
)
from app.tools import ai_tools

app = FastAPI(
    title="AIRLINE NEXUS X — AI INTELLIGENCE & AUTONOMOUS AGENTS 3.0",
    description="Autonomous, real-time, explainable, and production-ready airline travel intelligence platform.",
    version="3.0.0"
)

# Robust CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health routes
app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(health.router, prefix="/api/v1/ai/health", tags=["health"])
app.include_router(health.router, prefix="/api/ai/health", tags=["health"])

# Version 1 & 3 Core Endpoints (/api/v1/ai/*)
app.include_router(search.router, prefix="/api/v1/ai/search", tags=["search"])
app.include_router(compare.router, prefix="/api/v1/ai/compare", tags=["compare"])
app.include_router(explain.router, prefix="/api/v1/ai/explain", tags=["explain"])
app.include_router(trip_plan.router, prefix="/api/v1/ai/trip-plan", tags=["trip-plan"])
app.include_router(baggage.router, prefix="/api/v1/ai/baggage", tags=["baggage"])
app.include_router(faq.router, prefix="/api/v1/ai/faq", tags=["faq"])
app.include_router(assistant.router, prefix="/api/v1/ai/assistant", tags=["assistant"])

# Autonomous Agents & Quality Intelligence (/api/v1/ai/agents and /api/v1/ai/evaluation)
app.include_router(agents_router.router, prefix="", tags=["root-agents-eval"])
app.include_router(agents_router.router, prefix="/api/v1/ai/agents", tags=["agents"])
app.include_router(agents_router.router, prefix="/api/ai/agents", tags=["agents-alias"])
app.include_router(agents_router.router, prefix="/agents", tags=["agents-direct"])
app.include_router(agents_router.router, prefix="/api/v1/ai", tags=["ai-root-agents"])

# AI Intelligence 3.0 Specialized Suites (/api/v1/ai/* and /api/ai/*)
app.include_router(v3_router.router, prefix="/api/v1/ai", tags=["ai-3.0"])
app.include_router(v3_router.router, prefix="/api/ai", tags=["ai-3.0-alias"])

# Legacy Aliases
app.include_router(search.router, prefix="/api/ai/search", tags=["search"])
app.include_router(assistant.router, prefix="/api/ai/assistant", tags=["assistant"])
app.include_router(assistant.router, prefix="/ai", tags=["assistant-legacy"])

# Direct routes (if API Gateway strips /api/v1/ai)
app.include_router(search.router, prefix="/search", tags=["search"])
app.include_router(compare.router, prefix="/compare", tags=["compare"])
app.include_router(explain.router, prefix="/explain", tags=["explain"])
app.include_router(trip_plan.router, prefix="/trip-plan", tags=["trip-plan"])
app.include_router(baggage.router, prefix="/baggage", tags=["baggage"])
app.include_router(faq.router, prefix="/faq", tags=["faq"])
app.include_router(assistant.router, prefix="/assistant", tags=["assistant"])
app.include_router(v3_router.router, prefix="", tags=["ai-3.0-direct"])

@app.get("/")
def root():
    return {
        "service": "AIRLINE NEXUS AI INTELLIGENCE & AUTONOMOUS AGENTS 3.0",
        "status": "ONLINE",
        "docs": "/docs",
        "agents": [
            "TravelCopilotAgent",
            "MultiCityPlannerAgent",
            "PassengerSupportAgent",
            "SeatIntelligenceAgent",
            "BookingRecoveryAgent",
            "FlightChangeAgent",
            "IntentToActionAgent",
            "OperationsCopilotAgent",
            "BookingCommunicationAgent",
            "DigitalTravelCompanionAgent"
        ],
        "safety_firewall": "ACTIVE_READ_ONLY_GUARD"
    }
