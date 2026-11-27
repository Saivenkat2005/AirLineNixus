import re
import logging
from typing import Dict, Any, Tuple, Optional, List

logger = logging.getLogger("ai.safety.firewall")

# Prompt injection & jailbreak patterns
INJECTION_PATTERNS = [
    r"ignore\s+(all\s+)?(previous|prior|above)\s+instructions?",
    r"disregard\s+(all\s+)?(previous|prior)\s+rules?",
    r"system\s*prompt\s*override",
    r"you\s+are\s+now\s+in\s+developer\s+mode",
    r"dan\s+mode",
    r"jailbreak",
    r"pretend\s+you\s+have\s+no\s+(rules|restrictions|safety|filters)",
    r"output\s+your\s+(initial|system)\s+prompt",
    r"reveal\s+(api\s*key|secret|password|credential)",
    r"drop\s+table",
    r"select\s+\*\s+from",
    r"delete\s+from\s+users",
    r"exec(ute)?\s*\(",
    r"union\s+select",
    r"insert\s+into",
    r"--\s*$",
    r"eval\s*\(",
    r"<script\b",
    r"javascript:"
]

# Sensitive PII patterns
PII_PATTERNS = {
    "credit_card": r"\b(?:\d{4}[-\s]?){3}\d{4}\b",
    "cvv": r"\bcvv\s*[:=]?\s*\d{3,4}\b",
    "ssn_or_aadhaar": r"\b\d{4}[-\s]?\d{4}[-\s]?\d{4}\b",
    "api_key": r"\b(?:sk-[a-zA-Z0-9]{20,}|AIza[0-9A-Za-z-_]{35}|ghp_[0-9a-zA-Z]{36})\b",
    "raw_password": r"\b(?:password|passwd)\s*[:=]\s*\S+\b"
}

class HallucinationFirewall:
    @staticmethod
    def inspect_input(user_prompt: str) -> Tuple[bool, str]:
        """
        Detects prompt injection, malicious SQL/command execution, and jailbreaks.
        Returns (is_safe, sanitized_text_or_rejection_reason).
        """
        if not user_prompt:
            return True, ""

        lower = user_prompt.lower()
        for pattern in INJECTION_PATTERNS:
            if re.search(pattern, lower, re.IGNORECASE):
                logger.warning(f"AI Safety Firewall intercepted attack pattern: '{pattern}' in prompt: '{user_prompt[:60]}'")
                return False, "Security Notice: Your query contains unauthorized instruction patterns or security overrides. Request blocked by AI Safety Firewall."

        return True, user_prompt

    @staticmethod
    def redact_pii(text: str) -> str:
        """
        Masks credit cards, CVVs, Aadhaar/SSN numbers, and credentials before responses leave application boundary.
        """
        sanitized = text
        for pii_type, pattern in PII_PATTERNS.items():
            if pii_type == "credit_card":
                sanitized = re.sub(pattern, "••••-••••-••••-••••", sanitized)
            elif pii_type == "cvv":
                sanitized = re.sub(pattern, "CVV: •••", sanitized, flags=re.IGNORECASE)
            elif pii_type == "ssn_or_aadhaar":
                sanitized = re.sub(pattern, "XXXX-XXXX-XXXX", sanitized)
            elif pii_type == "api_key":
                sanitized = re.sub(pattern, "[REDACTED_API_KEY]", sanitized)
            elif pii_type == "raw_password":
                sanitized = re.sub(pattern, "password: [REDACTED]", sanitized, flags=re.IGNORECASE)
        return sanitized

    @staticmethod
    def validate_tool_authorization(
        tool_name: str,
        user_id: Optional[int],
        requested_user_id: Optional[int],
        is_admin: bool = False
    ) -> Tuple[bool, str]:
        """
        Enforces tenant and passenger isolation: a passenger cannot view or mutate another passenger's bookings.
        Admin tools require verified admin status.
        """
        admin_tools = {"get_operations_summary", "analyze_admin_incident", "update_flight_schedule"}
        if tool_name in admin_tools and not is_admin:
            return False, f"Unauthorized: Tool '{tool_name}' requires verified airline operational administrator credentials."

        if requested_user_id is not None and user_id is not None:
            if user_id != requested_user_id and not is_admin:
                return False, f"Security Violation: Passenger ID {user_id} cannot access records for Passenger ID {requested_user_id}."

        return True, "Authorized"

    @staticmethod
    def validate_output(ai_response_text: str, grounded_facts: Optional[List[Any]] = None) -> str:
        """
        Validates output to prevent fabricated transaction confirmations and masks PII.
        """
        sanitized = HallucinationFirewall.redact_pii(ai_response_text)

        # Ensure AI never claims it independently charged a credit card or directly executed a refund
        lower = sanitized.lower()
        if "i have booked your ticket and charged" in lower:
            sanitized = "I have located your preferred flight options. Please review and click 'Proceed to Checkout' to complete the reservation safely."
        elif "i have debited your card" in lower:
            sanitized = "Payment processing is handled exclusively through our PCI-DSS compliant checkout screen. No direct AI charge was made."
        elif "i have cancelled your ticket and refunded" in lower:
            sanitized = "I can initiate a cancellation request for you. Please confirm the action in My Trips to execute the refund via our secure backend."

        return sanitized
