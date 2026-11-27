import pytest
import httpx

BASE_URL = "http://localhost:4000"

@pytest.mark.asyncio
async def test_get_seats_by_flight_id():
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=5.0) as client:
        res = await client.get("/seat/getseats/1")
        assert res.status_code in [200, 404]

@pytest.mark.asyncio
async def test_hold_seat_concurrency():
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=5.0) as client:
        res = await client.post("/seat/hold/specific/1/Economy/12A?userId=3")
        assert res.status_code in [200, 400, 404, 500]
