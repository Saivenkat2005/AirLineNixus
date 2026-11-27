/**
 * test_deployed_e2e.js
 * Comprehensive End-to-End Deployment Verification Test Suite
 * Tests live endpoints across:
 *  - API Gateway (:4000)
 *  - Core Spring Boot Service (:8080)
 *  - AI FastAPI Service (:8000)
 *  - Frontend Nginx Web Server (:80)
 *  - MySQL Database Seed & State Verification
 */

const http = require('http');

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const duration = Date.now() - startTime;
        let parsed = null;
        try {
          parsed = JSON.parse(body);
        } catch {
          parsed = body;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          duration,
          data: parsed
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(8000, () => {
      req.destroy(new Error('Request timed out after 8000ms'));
    });

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runDeployedTests() {
  console.log('='.repeat(80));
  console.log('   AIRLINE NEXUS X — END-TO-END DEPLOYMENT VERIFICATION TEST SUITE');
  console.log('='.repeat(80));
  console.log(`Timestamp: ${new Date().toISOString()}\n`);

  const results = [];

  function record(name, passed, details) {
    results.push({ name, passed, details });
    const mark = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${mark} | ${name.padEnd(45)} | ${details}`);
  }

  // 1. API Gateway /health
  try {
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/health',
      method: 'GET'
    });
    const pass = res.statusCode === 200 && res.data.status === 'UP';
    record('Gateway Health Probe', pass, `Status: ${res.statusCode}, Latency: ${res.duration}ms, Body: ${JSON.stringify(res.data)}`);
  } catch (err) {
    record('Gateway Health Probe', false, `Error: ${err.message}`);
  }

  // 2. API Gateway /ready
  try {
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/ready',
      method: 'GET'
    });
    const pass = res.statusCode === 200 && res.data.status === 'READY';
    record('Gateway Readiness Probe', pass, `Status: ${res.statusCode}, Upstream: ${JSON.stringify(res.data.upstream)}`);
  } catch (err) {
    record('Gateway Readiness Probe', false, `Error: ${err.message}`);
  }

  // 3. Core Spring Boot /actuator/health
  try {
    const res = await request({
      hostname: 'localhost',
      port: 8080,
      path: '/actuator/health',
      method: 'GET'
    });
    const pass = res.statusCode === 200 && res.data.status === 'UP';
    record('Core Spring Boot Actuator Health', pass, `Status: ${res.statusCode}, Latency: ${res.duration}ms, Health: ${JSON.stringify(res.data.status)}`);
  } catch (err) {
    record('Core Spring Boot Actuator Health', false, `Error: ${err.message}`);
  }

  // 4. Core Service Flight Retrieval via Gateway (/flights/all)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/flights/all',
      method: 'GET'
    });
    const count = Array.isArray(res.data) ? res.data.length : 0;
    const pass = res.statusCode === 200 && count > 0;
    record('Gateway -> Core Flight Inventory', pass, `Status: ${res.statusCode}, Count: ${count} flights, Latency: ${res.duration}ms`);
  } catch (err) {
    record('Gateway -> Core Flight Inventory', false, `Error: ${err.message}`);
  }

  // 5. Flight Telemetry & Radar Tracking Endpoint (/flights/track/PA-101)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/flights/track/PA-101',
      method: 'GET'
    });
    const pass = res.statusCode === 200 && res.data && res.data.flightNumber === 'PA-101';
    record('Gateway -> Flight Telemetry (PA-101)', pass, `Status: ${res.statusCode}, Progress: ${res.data.progressPercent}%, Altitude: ${res.data.altitudeFt}ft`);
  } catch (err) {
    record('Gateway -> Flight Telemetry (PA-101)', false, `Error: ${err.message}`);
  }

  // 6. Global Route Network Endpoint (/flights/routes)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/flights/routes',
      method: 'GET'
    });
    const count = Array.isArray(res.data) ? res.data.length : 0;
    const pass = res.statusCode === 200 && count > 0;
    record('Gateway -> Route Network (/flights/routes)', pass, `Status: ${res.statusCode}, Routes: ${count}, Latency: ${res.duration}ms`);
  } catch (err) {
    record('Gateway -> Route Network (/flights/routes)', false, `Error: ${err.message}`);
  }

  // 7. AI Service Health (/health)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 8000,
      path: '/health',
      method: 'GET'
    });
    const pass = res.statusCode === 200;
    record('AI Service Health Check', pass, `Status: ${res.statusCode}, Body: ${JSON.stringify(res.data)}`);
  } catch (err) {
    record('AI Service Health Check', false, `Error: ${err.message}`);
  }

  // 8. AI Conversational Assistant via Gateway (/api/v1/ai/assistant/chat)
  try {
    const chatPayload = JSON.stringify({
      message: "What flights are available from London to Delhi?",
      history: []
    });
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/api/v1/ai/assistant/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(chatPayload)
      }
    }, chatPayload);
    const pass = res.statusCode === 200 && res.data && (res.data.reply || res.data.response || res.data.answer);
    const replySnippet = (res.data.reply || res.data.response || res.data.answer || '').substring(0, 60);
    record('Gateway -> AI Assistant Chat', pass, `Status: ${res.statusCode}, Latency: ${res.duration}ms, Snippet: "${replySnippet}..."`);
  } catch (err) {
    record('Gateway -> AI Assistant Chat', false, `Error: ${err.message}`);
  }

  // 9. Seat Inventory Retrieval (/seat/all)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/seat/all',
      method: 'GET'
    });
    const count = Array.isArray(res.data) ? res.data.length : 0;
    const pass = res.statusCode === 200 && count > 0;
    record('Seat Inventory via Gateway (/seat/all)', pass, `Status: ${res.statusCode}, Seats configured: ${count}`);
  } catch (err) {
    record('Seat Inventory via Gateway (/seat/all)', false, `Error: ${err.message}`);
  }

  // 10. Digital Boarding Pass Ticket Verification (/tickets/verify/NX-1)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/tickets/verify/NX-1',
      method: 'GET'
    });
    const pass = res.statusCode === 200 && res.data && res.data.pnr === 'NX-1';
    record('Ticket Verification Endpoint (/tickets/verify/NX-1)', pass, `Status: ${res.statusCode}, Valid: ${res.data.valid}, Passenger: ${res.data.passengerName}`);
  } catch (err) {
    record('Ticket Verification Endpoint (/tickets/verify/NX-1)', false, `Error: ${err.message}`);
  }

  // 11. Transactional Booking Flow with Idempotency Key
  try {
    const idempotencyKey = 'test-idemp-' + Date.now();
    const dynamicSeat = Math.floor(Math.random() * 25 + 5) + ['A', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 5)];
    const bookingPayload = JSON.stringify({
      customerId: 3,
      flightId: 1,
      seatType: 'Economy',
      origin: 'New York (JFK)',
      destination: 'Los Angeles (LAX)',
      date: '2026-07-04',
      nop: 1,
      totalPrice: 150,
      seatNumbers: dynamicSeat
    });
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/booking/add',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bookingPayload),
        'Idempotency-Key': idempotencyKey
      }
    }, bookingPayload);
    const pass = res.statusCode === 200 || res.statusCode === 201;
    record('Transactional Booking with Idempotency', pass, `Status: ${res.statusCode}, Latency: ${res.duration}ms, Booking: ${JSON.stringify(res.data)}`);
  } catch (err) {
    record('Transactional Booking with Idempotency', false, `Error: ${err.message}`);
  }

  // 12. Frontend Web Server Delivery (:80)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 80,
      path: '/',
      method: 'GET'
    });
    const isHtml = typeof res.data === 'string' && (res.data.toLowerCase().includes('<!doctype html>') || res.data.includes('<html'));
    const pass = res.statusCode === 200 && isHtml;
    record('Frontend Nginx Delivery (Port 80)', pass, `Status: ${res.statusCode}, HTML Size: ${typeof res.data === 'string' ? res.data.length : 0} bytes`);
  } catch (err) {
    record('Frontend Nginx Delivery (Port 80)', false, `Error: ${err.message}`);
  }

  // 13. Autonomous AI Travel Copilot (/api/v1/ai/agents/travel-copilot)
  try {
    const payload = JSON.stringify({ message: 'Find the cheapest flight from Hyderabad to Delhi under 8000' });
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/api/v1/ai/agents/travel-copilot',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, payload);
    const pass = res.statusCode === 200 && res.data && res.data.reply;
    record('Autonomous AI Travel Copilot', pass, `Status: ${res.statusCode}, Intent: ${res.data?.intent}, Latency: ${res.duration}ms`);
  } catch (err) {
    record('Autonomous AI Travel Copilot', false, `Error: ${err.message}`);
  }

  // 14. AI Multi-City Trip Planner (/api/v1/ai/agents/multi-city-plan)
  try {
    const payload = JSON.stringify({ cities: ['HYD', 'DEL', 'BOM', 'BLR'], total_budget: 25000, passengers: 1 });
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/api/v1/ai/agents/multi-city-plan',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, payload);
    const pass = res.statusCode === 200 && res.data && res.data.segments?.length === 3;
    record('AI Multi-City Trip Planner', pass, `Status: ${res.statusCode}, Total Price: ₹${res.data?.total_price}, Segments: ${res.data?.segments?.length}`);
  } catch (err) {
    record('AI Multi-City Trip Planner', false, `Error: ${err.message}`);
  }

  // 15. AI Seat Selection Intelligence (/api/v1/ai/agents/seat-recommendations)
  try {
    const payload = JSON.stringify({ flight_id: 1, seat_type: 'Economy', preference: 'extra_legroom', has_infant: true });
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/api/v1/ai/agents/seat-recommendations',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, payload);
    const pass = res.statusCode === 200 && res.data && res.data.safety_rule_notice;
    record('AI Seat Intelligence & Infant Safety Regulation', pass, `Status: ${res.statusCode}, Safety Notice: Active`);
  } catch (err) {
    record('AI Seat Intelligence & Infant Safety Regulation', false, `Error: ${err.message}`);
  }

  // 16. AI Booking Recovery Intelligence (/api/v1/ai/agents/booking-recovery)
  try {
    const payload = JSON.stringify({ user_id: 3, booking_id: 104, transaction_reference: 'TXN-8821' });
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/api/v1/ai/agents/booking-recovery',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, payload);
    const pass = res.statusCode === 200 && res.data && res.data.duplicate_payment_risk_prevented;
    record('AI Booking Recovery & Duplicate Protection', pass, `Status: ${res.statusCode}, Recovery: ${res.data?.recovery_status}`);
  } catch (err) {
    record('AI Booking Recovery & Duplicate Protection', false, `Error: ${err.message}`);
  }

  // 17. AI Quality Dashboard Telemetry (/api/v1/ai/evaluation/report)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 4000,
      path: '/api/v1/ai/evaluation/report',
      method: 'GET'
    });
    const pass = res.statusCode === 200 && res.data && res.data.pass_rate_pct >= 95;
    record('AI Quality & Evaluation Telemetry Report', pass, `Status: ${res.statusCode}, Pass Rate: ${res.data?.pass_rate_pct}%, Faithfulness: ${res.data?.deepeval_metrics?.faithfulness}`);
  } catch (err) {
    record('AI Quality & Evaluation Telemetry Report', false, `Error: ${err.message}`);
  }

  console.log('\n' + '='.repeat(80));
  const passedCount = results.filter(r => r.passed).length;
  console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passedCount} | FAILED: ${results.length - passedCount}`);
  console.log('='.repeat(80));

  return passedCount === results.length;
}

if (require.main === module) {
  runDeployedTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(err => {
    console.error('Fatal test error:', err);
    process.exit(1);
  });
}

module.exports = { runDeployedTests };
