from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

# ─── 1. AI Multi-City Trip Planner Schemas ─────────────────────────────────────
class MultiCitySegmentRequest(BaseModel):
    origin: str
    destination: str
    target_date: Optional[str] = None
    max_budget: Optional[float] = None

class MultiCityTripPlanRequest(BaseModel):
    cities: List[str] = Field(..., min_length=2, description="Sequence of cities (e.g. ['HYD', 'DEL', 'BOM', 'BLR'])")
    start_date: Optional[str] = "2026-07-04"
    total_budget: Optional[float] = None
    passengers: int = 1
    preference: Optional[str] = "balanced" # "cheapest", "fastest", "balanced"

class FlightSegmentPlan(BaseModel):
    segment_index: int
    origin: str
    destination: str
    flight_id: int
    flight_name: str
    departure_time: str
    arrival_time: str
    price: float
    layover_to_next_mins: Optional[int] = None
    layover_risk: Optional[str] = "LOW"
    aircraft: str

class DayItinerary(BaseModel):
    day: int
    city: str
    activities: List[str]
    lodging_tip: str

class MultiCityTripPlanResponse(BaseModel):
    itinerary_id: str
    total_price: float
    is_within_budget: bool
    budget_variance: float
    segments: List[FlightSegmentPlan]
    day_by_day_plan: List[DayItinerary]
    connection_advisories: List[str]
    disclaimer: str = "Verified schedules from live database inventory. Booking requires confirmation per segment."

# ─── 2. AI Booking Recovery Schemas ───────────────────────────────────────────
class BookingRecoveryRequest(BaseModel):
    user_id: int
    booking_id: Optional[int] = None
    last_known_status: Optional[str] = "PENDING"
    transaction_reference: Optional[str] = None

class BookingRecoveryResponse(BaseModel):
    recovery_status: str # "RECOVERED", "ACTION_REQUIRED", "FAILED", "ALREADY_CONFIRMED"
    booking_id: Optional[int] = None
    pnr: Optional[str] = None
    payment_status: str
    can_auto_recover: bool
    duplicate_payment_risk_prevented: bool
    resolution_steps: List[str]
    passenger_message: str

# ─── 3. AI Flight Change Impact Analyzer Schemas ──────────────────────────────
class FlightChangeAnalysisRequest(BaseModel):
    booking_id: int
    user_id: int
    desired_flight_id: int
    desired_seat_type: Optional[str] = None

class FlightChangeAnalysisResponse(BaseModel):
    booking_id: int
    current_flight: Dict[str, Any]
    proposed_flight: Dict[str, Any]
    fare_difference: float
    rescheduling_fee: float
    total_payable_or_refundable: float
    direction: str # "ADDITIONAL_PAYMENT", "REFUND_CREDIT", "EVEN_EXCHANGE"
    seat_availability_confirmed: bool
    schedule_impact_summary: str
    requires_passenger_confirmation: bool = True
    action_token: str

# ─── 4. Passenger Intent-to-Action Schemas ─────────────────────────────────────
class PassengerIntentActionRequest(BaseModel):
    user_id: int
    natural_instruction: str # "Reschedule flight NX-104 to tomorrow evening and keep window seat"
    booking_id: Optional[int] = None

class PassengerIntentActionResponse(BaseModel):
    detected_intent: str # "RESCHEDULE", "CANCEL", "SEAT_CHANGE", "BAGGAGE_ADD", "STATUS_CHECK"
    parameters: Dict[str, Any]
    preview_summary: str
    estimated_cost_change: float
    is_destructive: bool
    requires_confirmation: bool = True
    confirmation_payload: Optional[Dict[str, Any]] = None
    status: str = "AWAITING_CONFIRMATION"

# ─── 5. AI Airline Operations Copilot Schemas (Admin) ──────────────────────────
class OperationsCopilotRequest(BaseModel):
    admin_user_id: int
    query_type: str = "occupancy_and_disruptions" # "occupancy", "cancellations", "overbooking_risk", "complaints", "summary"
    flight_id: Optional[int] = None
    date_filter: Optional[str] = None

class OperationsCopilotResponse(BaseModel):
    report_title: str
    timestamp: str
    fleet_occupancy_avg_pct: float
    active_disruptions_count: int
    overbooking_risk_flags: List[Dict[str, Any]]
    cancellation_trends: Dict[str, Any]
    passenger_sentiment_summary: str
    actionable_operational_recommendations: List[str]
    disclaimer: str = "Official Airline Nexus Internal Operations Intelligence. Confidential."

# ─── 6. AI Booking Email & Communication Schemas ──────────────────────────────
class BookingEmailRequest(BaseModel):
    booking_id: int
    recipient_email: str
    recipient_name: Optional[str] = "Valued Traveler"
    language: str = "en" # "en", "te", "hi"
    template_type: str = "confirmation" # "confirmation", "cancellation", "disruption", "refund"

class BookingEmailResponse(BaseModel):
    booking_id: int
    language: str
    subject: str
    plain_text_body: str
    html_body: str
    generated_timestamp: str
    delivered: bool = False

# ─── 7. AI Seat Selection Recommendation Schemas ──────────────────────────────
class SeatRecommendationRequest(BaseModel):
    flight_id: int
    seat_type: str = "Economy" # "Economy", "Business", "First Class"
    preference: str = "window" # "window", "aisle", "extra_legroom", "family", "accessibility"
    passenger_count: int = 1
    has_infant: bool = False

class RecommendedSeat(BaseModel):
    seat_number: str
    seat_type: str
    position: str # "Window", "Aisle", "Middle"
    is_extra_legroom: bool
    is_available: bool
    price_addon: float
    explanation: str

class SeatRecommendationResponse(BaseModel):
    flight_id: int
    requested_preference: str
    recommendations: List[RecommendedSeat]
    safety_rule_notice: Optional[str] = None
    concurrency_notice: str = "Seats held for 5 minutes in Redis upon selection."

# ─── 8. AI Quality & Evaluation Report Schemas ────────────────────────────────
class AiEvaluationReportResponse(BaseModel):
    generated_at: str
    total_test_cases: int
    passed_tests: int
    failed_tests: int
    pass_rate_pct: float
    deepeval_metrics: Dict[str, float]
    ragas_metrics: Dict[str, float]
    promptfoo_security: Dict[str, Any]
    latency_summary_ms: Dict[str, float]
    token_usage: Dict[str, int]
    status: str
