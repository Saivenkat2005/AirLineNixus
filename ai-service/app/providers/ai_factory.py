import os
from app.providers.base import BaseAiProvider
from app.providers.cloud_provider import CloudProvider
from app.providers.ollama_provider import OllamaProvider
from app.providers.deterministic_provider import DeterministicProvider

class AiProviderFactory:
    _cached_provider: BaseAiProvider = None
    _cached_provider_name: str = None

    @classmethod
    async def get_provider(cls) -> BaseAiProvider:
        if cls._cached_provider is not None:
            return cls._cached_provider

        force_deterministic = os.getenv("USE_DETERMINISTIC_AI", "false").lower() == "true"
        if force_deterministic:
            cls._cached_provider = DeterministicProvider()
            return cls._cached_provider

        ollama = OllamaProvider()
        if await ollama.is_available():
            cls._cached_provider = ollama
            return cls._cached_provider

        cloud = CloudProvider()
        if await cloud.is_available():
            cls._cached_provider = cloud
            return cls._cached_provider

        cls._cached_provider = DeterministicProvider()
        return cls._cached_provider

    @classmethod
    async def get_provider_name(cls) -> str:
        if cls._cached_provider_name is None:
            provider = await cls.get_provider()
            if isinstance(provider, OllamaProvider):
                cls._cached_provider_name = "ollama-local-model"
            elif isinstance(provider, CloudProvider):
                cls._cached_provider_name = f"{provider.provider}-cloud-model"
            else:
                cls._cached_provider_name = "nexus-deterministic-nlp-engine"
        return cls._cached_provider_name
