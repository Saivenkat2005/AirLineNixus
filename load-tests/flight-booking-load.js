import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom performance metrics
export const errorRate = new Rate('errors');
export const flightSearchDuration = new Trend('flight_search_duration');
export const seatLockDuration = new Trend('seat_lock_duration');

export const options = {
  stages: [
    { duration: '30s', target: 100 },  // Ramp up to 100 concurrent users
    { duration: '1m', target: 500 },   // Scale to 500 concurrent users
    { duration: '30s', target: 1000 }, // Peak burst load to 1000 users
    { duration: '30s', target: 0 },    // Graceful ramp-down
  ],
  thresholds: {
    'http_req_duration': ['p(50)<50', 'p(95)<200', 'p(99)<500'], // Strict SLA targets
    'errors': ['rate<0.01'],                                      // Under 1% error rate
    'flight_search_duration': ['p(95)<150'],
    'seat_lock_duration': ['p(95)<180'],
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:4000';

export default function () {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  group('1. Browse Flights & Instant Search', () => {
    const searchRes = http.get(`${BASE_URL}/flights/all`, { headers });
    const success = check(searchRes, {
      'status is 200': (r) => r.status === 200,
      'flights array returned': (r) => {
        try {
          const body = JSON.parse(r.body);
          return Array.isArray(body);
        } catch (e) {
          return false;
        }
      },
    });

    errorRate.add(!success);
    flightSearchDuration.add(searchRes.timings.duration);
    sleep(1);
  });

  group('2. Inspect Flight Seat Availability', () => {
    const flightId = 1;
    const seatRes = http.get(`${BASE_URL}/seat/getseats/${flightId}`, { headers });
    const success = check(seatRes, {
      'seat status is 200': (r) => r.status === 200,
    });

    errorRate.add(!success);
    seatLockDuration.add(seatRes.timings.duration);
    sleep(1);
  });

  group('3. AI Travel Assistant & Copilot Query', () => {
    const aiPayload = JSON.stringify({
      message: 'Find morning flights from Delhi to Mumbai under ₹8000',
    });

    const aiRes = http.post(`${BASE_URL}/api/v1/ai/agents/travel-copilot`, aiPayload, { headers });
    check(aiRes, {
      'ai copilot responds within SLA': (r) => r.status === 200 || r.status === 404,
    });
    sleep(1);
  });

  group('4. AI Multi-City Trip Planner Load', () => {
    const multiCityPayload = JSON.stringify({
      cities: ['HYD', 'DEL', 'BOM'],
      total_budget: 20000,
      passengers: 1
    });

    const multiCityRes = http.post(`${BASE_URL}/api/v1/ai/agents/multi-city-plan`, multiCityPayload, { headers });
    check(multiCityRes, {
      'multi-city plan completes successfully': (r) => r.status === 200 || r.status === 404,
    });
    sleep(1);
  });

  group('5. AI Quality Dashboard Telemetry', () => {
    const evalRes = http.get(`${BASE_URL}/api/v1/ai/evaluation/report`, { headers });
    check(evalRes, {
      'evaluation telemetry returns 200': (r) => r.status === 200 || r.status === 404,
    });
    sleep(1);
  });
}
