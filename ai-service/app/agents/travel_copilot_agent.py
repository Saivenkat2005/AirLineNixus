import re
from typing import Dict, Any, List, Optional
from app.providers.ai_factory import AiProviderFactory
from app.services.flight_ai_service import FlightAiService
from app.retrieval.rag_system import RAGKnowledgeSystem
from app.safety.firewall import HallucinationFirewall

class TravelCopilotAgent:
    """
    Intelligent Conversational Travel Copilot.
    Handles multi-turn flight searches, budget queries, legroom requests,
    trip comparisons, and verified policy questions with grounded data.
    """

    # In-memory session store for conversation memory (isolated by session_id)
    _sessions: Dict[str, List[Dict[str, str]]] = {}

    @classmethod
    def get_or_create_history(cls, session_id: str) -> List[Dict[str, str]]:
        if session_id not in cls._sessions:
            cls._sessions[session_id] = []
        return cls._sessions[session_id]

    @classmethod
    async def chat(
        cls,
        message: str,
        session_id: str = "default",
        user_id: Optional[int] = None,
        language: str = "en"
    ) -> Dict[str, Any]:
        # 1. Safety & Injection Firewall Check
        is_safe, sanitized_or_reason = HallucinationFirewall.inspect_input(message)
        if not is_safe:
            return {
                "reply": sanitized_or_reason,
                "intent": "SECURITY_BLOCK",
                "flights": [],
                "session_id": session_id,
                "language": language
            }

        history = cls.get_or_create_history(session_id)
        history.append({"role": "user", "content": message})
        if len(history) > 10:
            history.pop(0)

        lower_msg = message.lower()
        provider = await AiProviderFactory.get_provider()

        # 2. Intent Classification
        # Case A: Flight Search / Corridor Query
        search_keywords = ["flight", "fly", "book", "find", "search", "go to", "from ", "to ", "cheapest", "under ₹", "under rs", "delhi", "mumbai", "hyderabad", "bangalore", "london", "new york"]
        is_search = any(k in lower_msg for k in search_keywords) and not ("baggage" in lower_msg or "cancel" in lower_msg or "refund" in lower_msg)

        if is_search:
            search_res = await FlightAiService.smart_search(message)
            flights = search_res.results
            count = len(flights)

            def get_flight_price(f):
                for k in ["price", "fare", "ticketPrice", "amount"]:
                    v = f.get(k)
                    if v is not None:
                        try:
                            return float(v)
                        except (ValueError, TypeError):
                            pass
                return 5500.0

            if count > 0:
                cheapest = min(flights, key=get_flight_price)
                c_price = get_flight_price(cheapest)
                f_name = cheapest.get('flightName') or cheapest.get('name') or 'Nexus Flight'
                orig = cheapest.get('origin') or 'Origin'
                dest = cheapest.get('destination') or 'Destination'
                ac_type = cheapest.get('aircraftType') or cheapest.get('type') or 'Boeing 737'
                reply = (
                    f"✈️ I found **{count} verified scheduled flight(s)** matching your request.\n\n"
                    f"• **Top Recommendation:** {f_name} from {orig} to {dest} "
                    f"starting at **₹{c_price:,.0f}** ({ac_type}).\n"
                    f"• All displayed options have live seat selection with 5-minute Redis locks. Select any flight card below to proceed."
                )
            else:
                reply = (
                    "I searched our live schedule database but could not find direct flights matching those exact criteria. "
                    "Try broadening your budget ceiling or selecting major hubs like Delhi (DEL), Mumbai (BOM), Hyderabad (HYD), or Bangalore (BLR)."
                )

            history.append({"role": "assistant", "content": reply})
            return {
                "reply": reply,
                "intent": "FLIGHT_SEARCH",
                "flights": flights[:5],
                "filters": search_res.extracted_params.dict() if hasattr(search_res.extracted_params, "dict") else {},
                "session_id": session_id,
                "language": language
            }

        # Case B: Flight Comparison Request
        if "compare" in lower_msg or "difference between" in lower_msg or "vs" in lower_msg:
            # Extract possible flight IDs
            fids = [int(m) for m in re.findall(r'\b\d+\b', message)]
            if len(fids) < 2:
                fids = [1, 2] # Compare default top corridors
            
            comp_res = await FlightAiService.compare_flights(fids)
            reply = (
                f"📊 **Flight Comparison Analysis:**\n"
                f"{comp_res.recommendation_summary}\n\n"
                f"Best overall value option is **Flight #{comp_res.best_value_flight_id}** considering fare, connection stability, and baggage inclusions."
            )
            history.append({"role": "assistant", "content": reply})
            return {
                "reply": reply,
                "intent": "FLIGHT_COMPARE",
                "flights": comp_res.flights,
                "session_id": session_id,
                "language": language
            }

        # Case C: Baggage, Cancellation, Refund, Seat, Policy Queries (RAG)
        rag_res = RAGKnowledgeSystem.answer_with_grounding(message)
        if rag_res.get("verified"):
            reply = rag_res["answer"]
            history.append({"role": "assistant", "content": reply})
            return {
                "reply": reply,
                "intent": "POLICY_RAG",
                "citations": rag_res.get("citations", []),
                "session_id": session_id,
                "language": language
            }

        # Case D: General Conversational Guidance
        general_prompt = (
            f"You are the Airline Nexus Intelligent Travel Copilot. Answer politely, concisely, and accurately.\n"
            f"User: {message}"
        )
        ai_reply = await provider.generate_response(general_prompt)
        validated_reply = HallucinationFirewall.validate_output(ai_reply)

        history.append({"role": "assistant", "content": validated_reply})
        return {
            "reply": validated_reply,
            "intent": "GENERAL_COPILOT",
            "session_id": session_id,
            "language": language
        }
