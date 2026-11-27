import pytest
import httpx

BASE_URL = "http://localhost:4000"

@pytest.mark.asyncio
async def test_ai_health():
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=5.0) as client:
        res = await client.get("/api/v1/ai/health")
        assert res.status_code in [200, 404]

@pytest.mark.asyncio
async def test_ai_travel_copilot():
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=8.0) as client:
        payload = {"message": "Find flight from Hyderabad to Delhi under ₹7000"}
        res = await client.post("/api/v1/ai/agents/travel-copilot", json=payload)
        assert res.status_code in [200, 404]
        if res.status_code == 200:
            data = res.json()
            assert "reply" in data
            assert data.get("intent") in ["FLIGHT_SEARCH", "GENERAL_COPILOT"]

@pytest.mark.asyncio
async def test_ai_multi_city_planner():
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=8.0) as client:
        payload = {
            "cities": ["HYD", "DEL", "BOM"],
            "total_budget": 20000,
            "passengers": 1
        }
        res = await client.post("/api/v1/ai/agents/multi-city-plan", json=payload)
        assert res.status_code in [200, 404]
        if res.status_code == 200:
            data = res.json()
            assert "segments" in data
            assert len(data["segments"]) == 2

@pytest.mark.asyncio
async def test_ai_evaluation_report():
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=5.0) as client:
        res = await client.get("/api/v1/ai/evaluation/report")
        assert res.status_code in [200, 404]
        if res.status_code == 200:
            data = res.json()
            assert "pass_rate_pct" in data
            assert "deepeval_metrics" in data
