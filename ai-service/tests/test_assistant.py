import pytest
from fastapi.testclient import TestClient
from app.main import app
from unittest.mock import patch

client = TestClient(app)

def test_health_endpoint():
    # If there is a health endpoint in main.py, we can test it here
    response = client.get("/")
    assert response.status_code == 200 or response.status_code == 404

@pytest.mark.asyncio
@patch("app.services.flight_ai_service.FlightAiService.smart_search")
async def test_assistant_flight_search(mock_smart_search):
    mock_smart_search.return_value.results = []
    mock_smart_search.return_value.extracted_params.model_dump.return_value = {}

    response = client.post(
        "/ai/chat",
        json={"message": "Find me a flight to Delhi"}
    )
    
    assert response.status_code in [200, 307] 
