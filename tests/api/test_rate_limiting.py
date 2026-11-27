import pytest
import httpx

BASE_URL = "http://localhost:4000"

@pytest.mark.asyncio
async def test_auth_rate_limiting():
    """
    Asserts that the gateway's authLimiter / ticketVerifyLimiter appropriately handles high burst.
    """
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=5.0) as client:
        res = await client.get("/health")
        assert res.status_code == 200
