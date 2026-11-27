import pytest
import httpx

BASE_URL = "http://localhost:4000"

@pytest.mark.asyncio
async def test_get_all_flights():
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=5.0) as client:
        res = await client.get("/flights/all")
        assert res.status_code in [200, 404]
        if res.status_code == 200:
            data = res.json()
            assert isinstance(data, list)
            if data:
                flight = data[0]
                assert "flightId" in flight
                assert "flightName" in flight
                assert "origin" in flight
                assert "destination" in flight

@pytest.mark.asyncio
async def test_get_flight_telemetry_and_routes():
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=5.0) as client:
        res = await client.get("/flights/routes")
        assert res.status_code in [200, 404]
        if res.status_code == 200:
            routes = res.json()
            assert isinstance(routes, list)
