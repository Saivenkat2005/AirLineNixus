import asyncio
import inspect
import logging
import time
from collections import deque
from typing import Callable, Dict, Any, Deque

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ai.tool.registry")

class SafeToolRegistry:
    _tools: Dict[str, Dict[str, Any]] = {}
    _audit_log: list = []

    @classmethod
    def register(
        cls,
        name: str,
        description: str,
        requires_auth: bool = False,
        timeout_sec: float = 5.0,
        rate_limit_per_minute: int = 60,
    ):
        if timeout_sec <= 0:
            raise ValueError("timeout_sec must be greater than zero")
        if rate_limit_per_minute <= 0:
            raise ValueError("rate_limit_per_minute must be greater than zero")

        def decorator(func: Callable):
            cls._tools[name] = {
                "name": name,
                "description": description,
                "func": func,
                "requires_auth": requires_auth,
                "timeout_sec": timeout_sec,
                "rate_limit_per_minute": rate_limit_per_minute,
                "calls": deque(),
            }
            return func
        return decorator

    @classmethod
    async def execute(cls, tool_name: str, **kwargs) -> Any:
        if tool_name not in cls._tools:
            raise ValueError(f"Unauthorized or unregistered AI tool: {tool_name}")

        tool_meta = cls._tools[tool_name]
        start_time = time.time()

        try:
            cls._enforce_rate_limit(tool_meta)
            func = tool_meta["func"]
            if not callable(func):
                raise TypeError(f"Registered AI tool is not callable: {tool_name}")

            result = func(**kwargs)
            if inspect.isawaitable(result):
                result = await asyncio.wait_for(result, timeout=tool_meta["timeout_sec"])

            duration_ms = (time.time() - start_time) * 1000
            cls._audit_log.append({
                "tool": tool_name,
                "status": "SUCCESS",
                "duration_ms": round(duration_ms, 2),
                "timestamp": time.time()
            })
            logger.info(f"Executed tool [{tool_name}] in {duration_ms:.2f}ms")
            return result
        except Exception as e:
            duration_ms = (time.time() - start_time) * 1000
            cls._audit_log.append({
                "tool": tool_name,
                "status": "FAILED",
                "error": str(e),
                "duration_ms": round(duration_ms, 2),
                "timestamp": time.time()
            })
            logger.error(f"Failed tool execution [{tool_name}]: {str(e)}")
            raise

    @classmethod
    def _enforce_rate_limit(cls, tool_meta: Dict[str, Any]) -> None:
        now = time.monotonic()
        calls: Deque[float] = tool_meta["calls"]
        while calls and now - calls[0] >= 60:
            calls.popleft()
        if len(calls) >= tool_meta["rate_limit_per_minute"]:
            raise RuntimeError(
                f"Rate limit exceeded for AI tool: {tool_meta['name']}"
            )
        calls.append(now)

    @classmethod
    def get_tool_list(cls):
        return [
            {
                "name": k,
                "description": v["description"],
                "requires_auth": v["requires_auth"],
                "timeout_sec": v["timeout_sec"],
                "rate_limit_per_minute": v["rate_limit_per_minute"],
            }
            for k, v in cls._tools.items()
        ]

    @classmethod
    def get_audit_log(cls, limit: int = 20):
        return cls._audit_log[-limit:]
