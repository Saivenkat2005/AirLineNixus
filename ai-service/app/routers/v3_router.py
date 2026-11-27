from fastapi import APIRouter
from app.schemas.schemas_v3 import (
    TradeoffRequest, TradeoffResponse,
    SimulatorRequest, SimulatorResponse,
    ReadinessScoreRequest, ReadinessScoreResponse,
    FareTransparencyRequest, FareTransparencyResponse,
    DisruptionRequest, DisruptionResponse,
    AskBookingRequest, AskBookingResponse,
    AdminIncidentRequest, AdminIncidentResponse,
    ErrorExplanationRequest, ErrorExplanationResponse
)
from app.agents.tradeoff_agent import TradeoffAgent
from app.agents.simulator_agent import SimulatorAgent
from app.agents.fare_transparency_agent import FareTransparencyAgent
from app.agents.readiness_agent import ReadinessAgent
from app.agents.seat_agent import SeatAgent
from app.agents.disruption_agent import DisruptionAgent
from app.agents.booking_assistant_agent import BookingAssistantAgent
from app.agents.admin_incident_agent import AdminIncidentAgent

router = APIRouter()

# ─── 1. Trade-Off Engine ("What matters most?") ───────────────────────────────
@router.post("/tradeoffs", response_model=TradeoffResponse)
async def evaluate_tradeoffs(req: TradeoffRequest):
    return await TradeoffAgent.evaluate_tradeoffs(req)

# ─── 2. Trip Simulator ("What if?") ───────────────────────────────────────────
@router.post("/simulate", response_model=SimulatorResponse)
def simulate_trip(req: SimulatorRequest):
    return SimulatorAgent.simulate_trip(req)

# ─── 3. Fare Transparency ("Where is my money going?") ────────────────────────
@router.post("/fare-transparency", response_model=FareTransparencyResponse)
def explain_fare(req: FareTransparencyRequest):
    return FareTransparencyAgent.explain_fare(req)

# ─── 4. Travel Readiness Score & Checklist ────────────────────────────────────
@router.post("/readiness", response_model=ReadinessScoreResponse)
def calculate_readiness(req: ReadinessScoreRequest):
    return ReadinessAgent.calculate_readiness(req)

# ─── 5. Seat Intelligence & Context ───────────────────────────────────────────
@router.get("/seat-context/{seat_code}")
def explain_seat(seat_code: str):
    return SeatAgent.explain_seat_context(seat_code)

@router.post("/seat-intent")
def parse_seat_intent(query: str):
    return SeatAgent.parse_seat_intent(query)

# ─── 6. Flight Disruption & Connection Risk Analyzer ──────────────────────────
@router.post("/disruption", response_model=DisruptionResponse)
def analyze_disruption(req: DisruptionRequest):
    return DisruptionAgent.analyze_disruption(req)

# ─── 7. Contextual "Ask The Booking" ──────────────────────────────────────────
@router.post("/ask-booking", response_model=AskBookingResponse)
def ask_booking(req: AskBookingRequest):
    return BookingAssistantAgent.answer_booking_question(req)

# ─── 8. Admin Incident Explainer & Performance Analyst ────────────────────────
@router.post("/admin-incident", response_model=AdminIncidentResponse)
def analyze_admin_incident(req: AdminIncidentRequest):
    return AdminIncidentAgent.analyze_incident(req)

# ─── 9. Booking Error Explainer ───────────────────────────────────────────────
@router.post("/explain-error", response_model=ErrorExplanationResponse)
def explain_error(req: ErrorExplanationRequest):
    raw_msg = req.raw_error_message.lower()
    
    if "seat" in raw_msg or "unavailable" in raw_msg:
        title = "Selected Seat Unavailable"
        reason = "The chosen cabin seat is either held by another traveler or no longer available on this flight."
        action = "Please return to the seat map and choose another available green/blue seat."
    elif "profile" in raw_msg or "user" in raw_msg:
        title = "Passenger Profile Verification Required"
        reason = "Required traveler credentials (contact number or name) are incomplete."
        action = "Please review your passenger details before retrying."
    else:
        title = "Reservation Transmission Notice"
        reason = "The airline reservation system experienced a momentary communication delay."
        action = "Please check your network and retry your reservation."

    return ErrorExplanationResponse(
        user_friendly_title=title,
        possible_reason=reason,
        actionable_resolution=action,
        can_retry=True
    )
