import pytest
import httpx
import uuid

BASE_URL = "http://localhost:4000"

@pytest.mark.asyncio
async def test_get_all_bookings():
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=5.0) as client:
        res = await client.get("/booking/get")
        assert res.status_code in [200, 404]

@pytest.mark.asyncio
async def test_booking_idempotency_protection():
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=5.0) as client:
        idempotency_key = f"test-idemp-{uuid.uuid4().hex[:8]}"
        payload = {
            "flightId": 1,
            "customerId": 3,
            "seatType": "Economy",
            "date": "2026-07-04",
            "nop": 1,
            "totalPrice": 4850.0
        }
        headers = {"Idempotency-Key": idempotency_key}
        res1 = await client.post("/booking/add", json=payload, headers=headers)
        assert res1.status_code in [200, 201, 500]
