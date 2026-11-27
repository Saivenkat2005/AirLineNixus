/**
 * Airline Nexus — Automated System, AI Microservices & Evaluation Contract Test Suite
 * Tests Architecture Deliverables, Frontend Production Bundle, AI Autonomous Agents,
 * RAG System, Playwright Automation, DeepEval / Ragas Test Suites, and API Gateway
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("=================================================");
console.log("✈️  AIRLINE NEXUS — COMPREHENSIVE TEST RUNNER   ✈️");
console.log("=================================================\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`❌ [FAIL] ${name}: ${err.message}`);
    failed++;
  }
}

// 1. Verify Architecture Contracts
test("Check 17 Required Markdown Deliverables Exist", () => {
  const requiredFiles = [
    'PROJECT_AUDIT.md', 'ARCHITECTURE.md', 'API_DOCUMENTATION.md',
    'AI_FEATURES.md', 'AI_TOOL_REGISTRY.md', 'AI_EVALUATION.md',
    'EMAIL_SYSTEM.md', 'NOTIFICATION_SYSTEM.md', 'RELIABILITY.md',
    'SECURITY.md', 'DATABASE.md', 'DOCKER.md', 'TESTING.md',
    'OBSERVABILITY.md', 'UX_DESIGN.md', 'TROUBLESHOOTING.md', 'DEPLOYMENT.md'
  ];
  for (const f of requiredFiles) {
    const fullPath = path.join(__dirname, f);
    assert.strictEqual(fs.existsSync(fullPath), true, `Missing required file: ${f}`);
  }
});

// 2. Verify Frontend Bundle
test("Check Frontend Production Build Artifacts (dist and build)", () => {
  const indexHtml = path.join(__dirname, 'Frontend', 'dist', 'index.html');
  assert.strictEqual(fs.existsSync(indexHtml), true, "Frontend dist/index.html must exist.");
});

// 3. Verify Docker Configuration
test("Check Docker Compose Services, Profiles & Multi-Network Topology", () => {
  const composeContent = fs.readFileSync(path.join(__dirname, 'docker-compose.yml'), 'utf8');
  assert.strictEqual(composeContent.includes('public-network'), true, "docker-compose.yml must contain public-network");
  assert.strictEqual(composeContent.includes('internal-network'), true, "docker-compose.yml must contain internal-network");
  assert.strictEqual(composeContent.includes('data-network'), true, "docker-compose.yml must contain data-network");
  assert.strictEqual(composeContent.includes('core-service'), true, "docker-compose.yml must contain core-service");
  assert.strictEqual(composeContent.includes('ai-service'), true, "docker-compose.yml must contain ai-service");
  assert.strictEqual(composeContent.includes('api-gateway'), true, "docker-compose.yml must contain api-gateway");
  assert.strictEqual(composeContent.includes('ollama'), true, "docker-compose.yml must support optional ollama profile");
});

// 4. Verify AI Service Autonomous Agents & RAG Engine
test("Check AI Microservice Autonomous Agents & RAG System", () => {
  const mainPy = fs.readFileSync(path.join(__dirname, 'ai-service', 'app', 'main.py'), 'utf8');
  assert.strictEqual(mainPy.includes('agents_router'), true, "ai-service must register agents_router");
  assert.strictEqual(mainPy.includes('assistant.router'), true, "ai-service must register assistant router");

  const ragPy = path.join(__dirname, 'ai-service', 'app', 'retrieval', 'rag_system.py');
  assert.strictEqual(fs.existsSync(ragPy), true, "RAG Knowledge System must exist");

  const agentsDir = path.join(__dirname, 'ai-service', 'app', 'agents');
  const agentFiles = [
    'travel_copilot_agent.py', 'multi_city_planner_agent.py', 'passenger_support_agent.py',
    'seat_intelligence_agent.py', 'booking_recovery_agent.py', 'flight_change_agent.py',
    'intent_to_action_agent.py', 'operations_copilot_agent.py', 'communication_agent.py',
    'companion_agent.py'
  ];
  for (const af of agentFiles) {
    assert.strictEqual(fs.existsSync(path.join(agentsDir, af)), true, `Agent ${af} must exist`);
  }
});

// 5. Verify Spring Boot Backend
test("Check Spring Boot Controllers and Ticket Verification", () => {
  const ticketCtrl = fs.readFileSync(path.join(__dirname, 'Backend', 'airlines', 'src', 'main', 'java', 'com', 'airlines', 'controller', 'TicketController.java'), 'utf8');
  assert.strictEqual(ticketCtrl.includes('/verify/{pnr}'), true, "TicketController must handle /verify/{pnr}");
  assert.strictEqual(ticketCtrl.includes('verified'), true, "TicketController must return verification payload");
});

// 6. Verify Playwright Web UI Automation Framework
test("Check Playwright Test Automation Framework & Page Objects", () => {
  const pwDir = path.join(__dirname, 'automation', 'playwright');
  assert.strictEqual(fs.existsSync(path.join(pwDir, 'playwright.config.js')), true, "Playwright config must exist");
  assert.strictEqual(fs.existsSync(path.join(pwDir, 'pages', 'FlightSearchPage.js')), true, "FlightSearchPage must exist");
  assert.strictEqual(fs.existsSync(path.join(pwDir, 'pages', 'CabinSeatMapPage.js')), true, "CabinSeatMapPage must exist");
  assert.strictEqual(fs.existsSync(path.join(pwDir, 'pages', 'AiCopilotPage.js')), true, "AiCopilotPage must exist");
  assert.strictEqual(fs.existsSync(path.join(pwDir, 'specs', 'ai-copilot.spec.js')), true, "AI Copilot spec must exist");
  assert.strictEqual(fs.existsSync(path.join(pwDir, 'specs', 'booking-flow.spec.js')), true, "Booking flow spec must exist");
});

// 7. Verify LLM Evaluation Suites (DeepEval, Ragas, Promptfoo)
test("Check LLM Evaluation Framework Suites & Datasets", () => {
  assert.strictEqual(fs.existsSync(path.join(__dirname, 'ai-evaluation', 'datasets', 'airline_eval_dataset.json')), true, "Eval dataset must exist");
  assert.strictEqual(fs.existsSync(path.join(__dirname, 'ai-evaluation', 'datasets', 'adversarial_prompts.json')), true, "Adversarial prompts must exist");
  assert.strictEqual(fs.existsSync(path.join(__dirname, 'ai-evaluation', 'deepeval', 'test_deepeval_metrics.py')), true, "DeepEval tests must exist");
  assert.strictEqual(fs.existsSync(path.join(__dirname, 'ai-evaluation', 'ragas', 'test_ragas_metrics.py')), true, "Ragas tests must exist");
  assert.strictEqual(fs.existsSync(path.join(__dirname, 'ai-evaluation', 'promptfoo', 'promptfoo.yaml')), true, "Promptfoo config must exist");
  assert.strictEqual(fs.existsSync(path.join(__dirname, 'ai-evaluation', 'evaluator', 'evaluate_ai_quality.js')), true, "Evaluator engine must exist");
});

// 8. Verify Postman / Newman API Collection
test("Check Postman API Automation Collection & Runner", () => {
  assert.strictEqual(fs.existsSync(path.join(__dirname, 'automation', 'postman', 'airline-nexus.postman_collection.json')), true, "Postman collection must exist");
  assert.strictEqual(fs.existsSync(path.join(__dirname, 'automation', 'postman', 'run_newman.js')), true, "Newman runner must exist");
});

// 9. Verify Frontend AI Quality Dashboard Component
test("Check Frontend AI Quality Dashboard Component & Copilot Integration", () => {
  assert.strictEqual(fs.existsSync(path.join(__dirname, 'Frontend', 'src', 'components', 'AiQualityDashboard.jsx')), true, "AiQualityDashboard.jsx must exist");
  const copilotCode = fs.readFileSync(path.join(__dirname, 'Frontend', 'src', 'components', 'AiCopilotDrawer.jsx'), 'utf8');
  assert.strictEqual(copilotCode.includes('multiCityPlan'), true, "AiCopilotDrawer must include multiCityPlan");
  assert.strictEqual(copilotCode.includes('recoverBooking'), true, "AiCopilotDrawer must include recoverBooking");
  assert.strictEqual(copilotCode.includes('analyzeFlightChange'), true, "AiCopilotDrawer must include analyzeFlightChange");
});

// 10. Verify GitHub Actions CI/CD Quality Gates
test("Check GitHub Actions CI/CD Quality Gate Workflows", () => {
  const workflowsDir = path.join(__dirname, '.github', 'workflows');
  const expectedWorkflows = [
    'frontend-ci.yml', 'backend-ci.yml', 'ai-evaluation.yml',
    'security-tests.yml', 'full-regression.yml'
  ];
  for (const wf of expectedWorkflows) {
    assert.strictEqual(fs.existsSync(path.join(workflowsDir, wf)), true, `Workflow ${wf} must exist`);
  }
});

console.log("\n=================================================");
console.log(`Summary: ${passed} Passed, ${failed} Failed`);
console.log("=================================================");
if (failed > 0) process.exit(1);
