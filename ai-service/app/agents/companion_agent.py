from typing import Dict, Any, List, Optional

class DigitalTravelCompanionAgent:
    """
    AI Digital Travel Companion.
    Keeps traveler connected with pre-flight checklist, mandatory document checks,
    connection risk buffers, and destination briefings.
    """

    @classmethod
    def get_trip_briefing(
        cls,
        origin: str = "DEL",
        destination: str = "BOM",
        departure_date: str = "2026-07-04",
        is_international: bool = False
    ) -> Dict[str, Any]:
        pre_flight_checklist = [
            {"task": "Verify Government Photo ID (Aadhaar / Passport)", "status": "REQUIRED", "due": "Before Airport Arrival"},
            {"task": "Complete Web Check-in & Download QR Boarding Pass", "status": "AVAILABLE_48H", "due": "T-60m"},
            {"task": "Ensure Power Banks & Laptops are in Cabin Bag Only", "status": "MANDATORY", "due": "During Packing"},
            {"task": "Check-in Luggage within 15 kg Allowance", "status": "RECOMMENDED", "due": "T-90m"}
        ]

        arrival_buffer_mins = 180 if is_international else 120
        buffer_str = f"{arrival_buffer_mins // 60} hours before departure"

        destination_brief = {
            "city": destination,
            "weather_forecast": "28°C Partly Cloudy with light afternoon breeze",
            "transit": "Airport Metro Express connects directly to downtown in 25 minutes",
            "timezone": "IST (UTC+5:30)" if not is_international else "Local Destination Time"
        }

        return {
            "origin": origin,
            "destination": destination,
            "departure_date": departure_date,
            "recommended_airport_arrival": buffer_str,
            "pre_flight_checklist": pre_flight_checklist,
            "destination_briefing": destination_brief,
            "fast_track_eligible": origin.upper() in ["DEL", "BOM", "BLR", "HYD"],
            "fast_track_service": "DigiYatra Biometric Priority Entry Available"
        }
