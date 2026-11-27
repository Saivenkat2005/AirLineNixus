import json
import logging
import os
from typing import Any, Dict, Optional

import httpx

from app.providers.base import BaseAiProvider
from app.providers.deterministic_provider import DeterministicProvider

logger = logging.getLogger("ai.provider.cloud")


class CloudProvider(BaseAiProvider):
    def __init__(self) -> None:
        self.provider = os.getenv("AI_CLOUD_PROVIDER", "").lower()
        self.api_key = os.getenv("AI_CLOUD_API_KEY")
        if self.provider == "gemini":
            self.api_key = self.api_key or os.getenv("GEMINI_API_KEY")
        else:
            self.api_key = self.api_key or os.getenv("OPENAI_API_KEY")
        self.model = os.getenv("AI_CLOUD_MODEL", "gpt-4o-mini")
        self.base_url = os.getenv("AI_CLOUD_BASE_URL", "https://api.openai.com/v1")
        self._fallback = DeterministicProvider()

    async def is_available(self) -> bool:
        return bool(self.api_key and self.provider in {"openai", "gemini"})

    async def parse_natural_language_search(self, query: str) -> Dict[str, Any]:
        prompt = (
            "Extract flight search filters and return only JSON with keys "
            "source, destination, departure_period, max_price, checked_baggage, "
            f"passenger_count. Query: {query}"
        )
        try:
            response = await self._generate(prompt)
            return json.loads(response)
        except (json.JSONDecodeError, httpx.HTTPError, KeyError, ValueError) as error:
            logger.warning("Cloud search parsing failed; using deterministic fallback: %s", error)
            return await self._fallback.parse_natural_language_search(query)

    async def generate_response(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        try:
            return await self._generate(prompt, system_prompt)
        except (httpx.HTTPError, KeyError, ValueError) as error:
            logger.warning("Cloud response generation failed; using deterministic fallback: %s", error)
            return await self._fallback.generate_response(prompt, system_prompt)

    async def _generate(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        if self.provider == "gemini":
            return await self._generate_gemini(prompt, system_prompt)
        return await self._generate_openai(prompt, system_prompt)

    async def _generate_openai(self, prompt: str, system_prompt: Optional[str]) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.post(
                f"{self.base_url.rstrip('/')}/chat/completions",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={"model": self.model, "messages": messages, "temperature": 0},
            )
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"].strip()

    async def _generate_gemini(self, prompt: str, system_prompt: Optional[str]) -> str:
        contents = [{"role": "user", "parts": [{"text": prompt}]}]
        if system_prompt:
            contents.insert(0, {"role": "user", "parts": [{"text": system_prompt}]})
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.post(
                f"https://generativelanguage.googleapis.com/v1beta/models/"
                f"{self.model}:generateContent?key={self.api_key}",
                json={"contents": contents},
            )
            response.raise_for_status()
            data = response.json()
            return data["candidates"][0]["content"]["parts"][0]["text"].strip()
