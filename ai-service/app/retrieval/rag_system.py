import re
import math
from typing import Dict, Any, List, Optional
from dataclasses import dataclass, asdict

@dataclass
class DocumentChunk:
    chunk_id: str
    doc_id: str
    title: str
    category: str
    content: str
    keywords: List[str]
    last_verified: str

VERIFIED_AIRLINE_KNOWLEDGE_BASE: List[DocumentChunk] = [
    DocumentChunk(
        chunk_id="bag-01",
        doc_id="DOC-BAG-2026",
        title="Baggage Allowances & Dimensions",
        category="baggage",
        content="Economy Class passengers are permitted 1 piece of cabin baggage up to 7 kg (max dimensions 55x35x25 cm) plus 1 small laptop bag or purse. Business Class passengers are permitted up to 10 kg across 2 cabin items. First Class passengers receive up to 14 kg cabin allowance. Checked baggage allowance is strictly 15 kg for standard Economy, 25 kg for Business Class, and 35 kg for First Class.",
        keywords=["cabin", "checked", "allowance", "weight", "dimensions", "laptop", "carry-on", "kg"],
        last_verified="2026-10-15"
    ),
    DocumentChunk(
        chunk_id="bag-02",
        doc_id="DOC-BAG-2026",
        title="Excess Baggage Fees & Restricted Items",
        category="baggage",
        content="Excess checked baggage is charged at a flat rate of ₹400 per kilogram at the airport desk, or discounted to ₹350 per kilogram when pre-booked online up to 3 hours prior to departure. Lithium batteries, power banks, e-cigarettes, and matchboxes are strictly restricted to cabin baggage and are prohibited in checked luggage under DGCA safety protocols.",
        keywords=["excess", "fee", "cost", "power bank", "lithium", "battery", "restricted", "prohibited"],
        last_verified="2026-10-15"
    ),
    DocumentChunk(
        chunk_id="ref-01",
        doc_id="DOC-REF-2026",
        title="24-Hour Grace Period & Free Cancellation",
        category="cancellation_and_refunds",
        content="Airline Nexus provides a 100% full refund with zero cancellation fees if the booking is cancelled within 24 hours of purchase, provided the flight departure is at least 7 days ahead. This statutory cooling-off rule applies to all fare classes including Economy Saver.",
        keywords=["cancel", "refund", "grace period", "24 hours", "cooling off", "penalty", "free"],
        last_verified="2026-10-20"
    ),
    DocumentChunk(
        chunk_id="ref-02",
        doc_id="DOC-REF-2026",
        title="Standard Cancellation Fees & Refund Processing",
        category="cancellation_and_refunds",
        content="Standard Economy cancellations requested more than 2 hours prior to scheduled departure incur a flat administrative fee of ₹1,500 per passenger per sector; the remaining balance is refunded. Flexi and Business Class fares feature 100% penalty-free cancellation. Verified refunds are credited back to the original payment source (UPI, Card, Net Banking) within 3 to 5 business days.",
        keywords=["fee", "cancellation fee", "deduction", "turnaround", "tat", "business days", "original payment", "refund time"],
        last_verified="2026-10-20"
    ),
    DocumentChunk(
        chunk_id="chk-01",
        doc_id="DOC-CHK-2026",
        title="Web Check-In & Boarding Timelines",
        category="checkin",
        content="Web check-in opens 48 hours prior to scheduled takeoff and closes 60 minutes before departure. Airport bag drop counters close 45 minutes prior for domestic flights and 60 minutes prior for international routes. Boarding gates close strictly 20 minutes prior to scheduled departure time.",
        keywords=["check-in", "web check-in", "gate", "cutoff", "bag drop", "time", "boarding"],
        last_verified="2026-10-10"
    ),
    DocumentChunk(
        chunk_id="chk-02",
        doc_id="DOC-CHK-2026",
        title="DigiYatra & Biometric Entry",
        category="checkin",
        content="Biometric express gate clearance via DigiYatra is active for all Airline Nexus flights departing from Delhi (DEL), Mumbai (BOM), Bangalore (BLR), and Hyderabad (HYD). Travelers with a validated boarding pass barcode and Aadhaar credentials can utilize dedicated priority security queues.",
        keywords=["digiyatra", "biometric", "delhi", "mumbai", "hyderabad", "bangalore", "fast track", "security"],
        last_verified="2026-10-10"
    ),
    DocumentChunk(
        chunk_id="seat-01",
        doc_id="DOC-SEAT-2026",
        title="Seat Selection & Concurrency Locks",
        category="seat_selection",
        content="Standard Economy seats are free of charge during booking and web check-in. Extra Legroom seats located in Exit Rows (Rows 14, 15, and 16) provide 35 inches of pitch and are available for an add-on fee of ₹600-₹1200. During seat selection, seats are locked in Redis for 5 minutes to prevent race conditions and duplicate allocation. Passengers traveling with infants or requiring mobility assistance are legally restricted from emergency exit rows.",
        keywords=["seat", "window", "aisle", "exit row", "legroom", "lock", "hold", "redis", "infant", "accessibility"],
        last_verified="2026-10-18"
    ),
    DocumentChunk(
        chunk_id="dis-01",
        doc_id="DOC-DIS-2026",
        title="Overbooking Resolution & Bumping Compensation",
        category="disruptions",
        content="In accordance with Civil Aviation Requirements and Nexus Fair-Seat policy, if a flight is overbooked, our automated system first seeks voluntary rescheduling. Volunteers receive a 150% flight credit travel voucher (or up to ₹40,000 / $500 flat compensation) plus a confirmed seat on the next immediate flight with complimentary cabin upgrade. Involuntary bumping triggers immediate statutory cash compensation and hotel accommodation.",
        keywords=["overbooking", "bumped", "volunteer", "compensation", "150%", "voucher", "upgrade", "denied boarding"],
        last_verified="2026-10-22"
    ),
    DocumentChunk(
        chunk_id="dis-02",
        doc_id="DOC-DIS-2026",
        title="Flight Delays & Missed Connection Protection",
        category="disruptions",
        content="For departures delayed by 2 hours or more, passengers receive complimentary food and beverage refreshment vouchers at the departure lounge. For overnight delays or cancellations attributable to the airline, 4-star hotel accommodations and airport shuttles are provided at zero cost. If an initial flight delay causes a missed connection on the same booking reference, Nexus automatically rebooks the onward leg at no charge.",
        keywords=["delay", "missed connection", "hotel", "food", "voucher", "compensation", "refreshment", "night"],
        last_verified="2026-10-22"
    ),
    DocumentChunk(
        chunk_id="doc-01",
        doc_id="DOC-ID-2026",
        title="Mandatory Travel Identification & Visa Requirements",
        category="documentation",
        content="All passengers traveling on domestic sectors must present an original, unexpired Government-issued photo ID (Aadhaar Card, Passport, Voter ID Card, or Driving License). For international sectors, passports must have at least 6 months validity from the date of travel, along with valid transit/entry visas where required by the destination government.",
        keywords=["id", "identification", "aadhaar", "passport", "visa", "documents", "validity", "driving license"],
        last_verified="2026-10-12"
    )
]

class RAGKnowledgeSystem:
    """
    Retrieval-Augmented Generation (RAG) Engine with semantic keyword scoring,
    source citation grounding, and strict hallucination prevention.
    """

    @classmethod
    def retrieve(cls, query: str, top_k: int = 3, threshold: float = 0.15) -> Dict[str, Any]:
        q_tokens = set(re.findall(r'\b[a-zA-Z0-9_-]+\b', query.lower()))
        if not q_tokens:
            return {
                "grounded": False,
                "chunks": [],
                "citations": [],
                "disclaimer": "Query was empty. No verified policy could be retrieved."
            }

        scored_chunks = []
        for chunk in VERIFIED_AIRLINE_KNOWLEDGE_BASE:
            score = 0.0
            chunk_text = (chunk.title + " " + chunk.content + " " + " ".join(chunk.keywords) + " " + chunk.category).lower()
            
            # Exact keyword hits
            for kw in chunk.keywords:
                if kw in query.lower():
                    score += 1.5

            # Token overlap
            for token in q_tokens:
                if len(token) > 2 and token in chunk_text:
                    score += 0.5

            # Category boost
            if chunk.category in query.lower():
                score += 1.0

            if score > 0:
                scored_chunks.append((score, chunk))

        scored_chunks.sort(key=lambda x: x[0], reverse=True)
        top_matches = scored_chunks[:top_k]

        if not top_matches or top_matches[0][0] < threshold:
            return {
                "grounded": False,
                "message": "The requested policy could not be verified in official Airline Nexus documentation.",
                "chunks": [],
                "citations": []
            }

        citations = []
        result_chunks = []
        for score, ch in top_matches:
            result_chunks.append({
                "chunk_id": ch.chunk_id,
                "doc_id": ch.doc_id,
                "title": ch.title,
                "category": ch.category,
                "content": ch.content,
                "last_verified": ch.last_verified,
                "relevance_score": round(score, 2)
            })
            citations.append(f"[{ch.doc_id}] {ch.title} (Updated {ch.last_verified})")

        return {
            "grounded": True,
            "query": query,
            "citations": list(dict.fromkeys(citations)),
            "chunks": result_chunks
        }

    @classmethod
    def answer_with_grounding(cls, query: str) -> Dict[str, Any]:
        retrieval = cls.retrieve(query)
        if not retrieval.get("grounded"):
            return {
                "answer": "This specific policy could not be verified in the official Airline Nexus knowledge base. Please contact customer relations at support@nexusairlines.com.",
                "verified": False,
                "citations": []
            }

        best_chunk = retrieval["chunks"][0]
        answer = f"{best_chunk['content']}\n\n**Official Citation:** {retrieval['citations'][0]}"
        return {
            "answer": answer,
            "verified": True,
            "citations": retrieval["citations"],
            "top_category": best_chunk["category"]
        }
