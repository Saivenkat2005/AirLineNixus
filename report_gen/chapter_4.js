// Chapter 4: System Architecture, Data Design and Engineering Decisions (Pages 21 to 30 - Exactly 10 Pages)
const fs = require('fs');
const svgs = JSON.parse(fs.readFileSync('report_gen/svg_assets.json', 'utf8'));

function renderHeader(pageNum) {
  return `<div class="page-header">
    <span>Cloud-Native API Gateway and Service Mesh Architecture - Capstone Final Report</span>
    <span>KLEF CSE | Cluster A</span>
  </div>`;
}

function renderFooter(pageNum) {
  return `<div class="page-footer">
    <span>KLEF College of Engineering (Deemed to be University) &bull; Nov 2026</span>
    <span>Page ${pageNum} of 51</span>
  </div>`;
}

function getChapter4() {
  const pages = [];

  // ================= PAGE 21: CHAPTER 4 (4.1 - 4.2 & FIGURE 4.1) =================
  pages.push(`
  <section class="report-page" id="page-21" data-page="21">
    ${renderHeader(21)}
    <div class="page-content" style="justify-content: flex-start;">
      <h1 class="chapter-title">CHAPTER 4: SYSTEM ARCHITECTURE, DATA DESIGN AND ENGINEERING DECISIONS</h1>
      
      <h2 class="section-title">4.1 System Overview and Design Principles</h2>
      <p>
        The platform architecture implements a layered, cloud-native software topology that strictly bifurcates application business logic from infrastructure networking concerns. Built natively on Kubernetes, the system coordinates an edge Ingress API Gateway (managing North-South external traffic) with an Istio Service Mesh (governing East-West internal traffic across decoupled microservices supporting an enterprise flight booking system). The architecture is formulated upon six core principles:
      </p>
      <ul>
        <li><b>Decoupled Cross-Cutting Concerns:</b> Networking, mutual TLS, token validation, telemetry, and resilience logic are completely extracted from application source code into high-performance Envoy sidecar proxies.</li>
        <li><b>Zero-Trust Network Perimeter:</b> Every workload within the cluster must authenticate and authorize every invocation regardless of network location. Network locality implies zero inherent trust.</li>
        <li><b>Database-per-Service Isolation:</b> Each microservice maintains exclusive domain authority over its persistent datastore (MySQL/PostgreSQL) to prevent hidden transactional coupling.</li>
        <li><b>Observable by Default:</b> Every inter-service RPC call automatically generates metrics, access logs, and distributed trace spans without developer intervention.</li>
        <li><b>Resilience and Graceful Degradation:</b> Network and instance failures are treated as inevitable; circuit breaking, bounded timeouts, and retry policies prevent catastrophic cascading collapse.</li>
        <li><b>Declarative Configuration (GitOps):</b> 100% of the operational topology is declared as version-controlled Kubernetes Custom Resource Definitions (CRDs).</li>
      </ul>

      <h2 class="section-title">4.2 Overall C4 Container-Level Architecture</h2>
      <p style="margin-bottom: 2px;">
        Figure 4.1 illustrates the C4 Container-level system architecture, documenting the complete request traversal path from external clients (web browsers, mobile apps, and k6 load generators) through the Kong Ingress Gateway into the Istio Service Mesh, backend microservices, data persistence layers, and observability pipelines:
      </p>
      <div class="diagram-container">
        ${svgs['2']}
      </div>
      <div class="figure-caption">Figure 4.1: Comprehensive C4 Container-Level System Architecture and Zero-Trust Mesh Topology</div>
    </div>
    ${renderFooter(21)}
  </section>
  `);

  // ================= PAGE 22: CHAPTER 4 (4.3 ENHANCED CONCEPTUAL ARCHITECTURE - NEW EXTENSION PAGE) =================
  pages.push(`
  <section class="report-page" id="page-22" data-page="22">
    ${renderHeader(22)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">4.3 Enhanced Conceptual Architecture of the Air Ticket Booking System</h2>
      <p style="font-size: 8.8pt; line-height: 1.28; margin-bottom: 2px;">
        Figure 4.1B presents the complete conceptual architecture of the <b>Persistent Airways</b> platform, illustrating how external client requests transition from public internet protocols into zero-trust internal microservices. The architecture establishes a clear separation of operational concerns: external clients communicate exclusively through the API Gateway, completely eliminating direct exposure of internal microservices:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['15']}
      </div>
      <div class="figure-caption" style="margin-bottom: 4px;">Figure 4.1B: Enhanced Conceptual Architecture &ndash; Air Ticket Booking System</div>

      <p style="font-size: 8.5pt; line-height: 1.25; margin-bottom: 3px;">
        <b>Architectural Responsibilities of the Dual-Tier Ingress &amp; Mesh Gateway:</b>
      </p>
      <ul style="font-size: 8.2pt; line-height: 1.22; margin-bottom: 0;">
        <li><b>North-South Ingress Gateway (Kong / Envoy Ingress):</b> Acts as the single perimeter reverse-proxy, executing TLS 1.3 cryptographic termination, public RSA JWT validation, consumer token-bucket rate limiting (100 req/min/IP), CORS sanitization, and L7 URI prefix dispatch to backend microservices (<code>/api/v1/auth</code>, <code>/api/v1/flights</code>, <code>/api/v1/seats</code>, <code>/api/v1/bookings</code>, <code>/api/v1/payments</code>, <code>/api/v1/tickets</code>).</li>
        <li><b>East-West Service Mesh (Istio Envoy Sidecars):</b> Transparently intercepts inter-service RPC invocations via Linux <code>iptables</code>, enforcing SPIFFE X.509 mutual TLS, outlier detection circuit breaking, connection pooling, and W3C distributed trace propagation across Booking, Seat, Payment, and Notification services.</li>
      </ul>
    </div>
    ${renderFooter(22)}
  </section>
  `);

  // ================= PAGE 23: CHAPTER 4 (4.4 - 4.5 & FIGURE 4.3) =================
  pages.push(`
  <section class="report-page" id="page-23" data-page="23">
    ${renderHeader(23)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">4.4 API Gateway Ingress Design</h2>
      <p>
        The API Gateway acts as the single, hardened reverse-proxy entry point for all external traffic. Built on the Kong / Envoy Ingress architecture, it implements five pipeline stages: <b>(1) SSL/TLS Offloading:</b> High-performance TLS termination using ECDHE-ECDSA cipher suites, offloading cryptographic overhead from downstream microservices; <b>(2) Token-Bucket Rate Limiting:</b> Enforces client quotas (100 req/min with burst allowance of 20) synchronized via Redis; <b>(3) Ingress Authentication Filter:</b> Validates cryptographic signatures of inbound JWT tokens against an authorized RSA public key; <b>(4) L7 Path-Based Routing:</b> Dispatches URI prefixes to designated backend clusters (<code>/api/v1/auth</code> &rarr; Auth Service, <code>/api/v1/flights</code> &rarr; Flight Service, <code>/api/v1/orders</code> &rarr; Booking Service, <code>/api/v1/ai</code> &rarr; AI Service); <b>(5) Correlation ID Injection:</b> Generates unique <code>x-request-id</code> and W3C <code>traceparent</code> headers for end-to-end tracing.
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['3']}
      </div>
      <div class="figure-caption">Figure 4.3: API Gateway Ingress Request Validation and Offloading Pipeline</div>

      <h2 class="section-title" style="margin-top: 4px;">4.5 Microservices Bounded Contexts &amp; Domain Isolation</h2>
      <p>
        The backend microservices maintain strict Domain-Driven Design (DDD) bounded contexts: <b>Auth Service (Port 8001):</b> Manages passenger identities, salted BCrypt password hashes, and issues RS256 JWT tokens. <b>Flight Catalog Service (Port 8002):</b> Manages flight schedules, routes, and fare pricing with MySQL persistence and Redis caching. <b>Seat Service (Port 8005):</b> Manages interactive 2D/3D seat maps and executes 5-minute atomic distributed hold locks in Redis. <b>Booking Core (Port 8003):</b> Coordinates distributed checkout transactions via Saga orchestration. <b>Payment Service (Port 8006):</b> Validates cryptographic payment tokens. <b>Notification Service (Port 8004):</b> Dispatches WebSocket boarding alerts.
      </p>
    </div>
    ${renderFooter(23)}
  </section>
  `);

  // ================= PAGE 24: CHAPTER 4 (4.6 - 4.7 & FIGURES 4.4, 4.5) =================
  pages.push(`
  <section class="report-page" id="page-24" data-page="24">
    ${renderHeader(24)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">4.6 Service Mesh Control and Data Plane Interaction</h2>
      <p>
        Istio's control plane (<code>istiod</code>) consolidates Pilot (xDS dynamic discovery), Citadel (in-cluster CA issuing 24-hour X.509 certs), and Galley (CRD validation). The Envoy data plane intercepts all TCP traffic via Linux iptables, offloading mTLS, connection pooling, and circuit breaking from application code:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['4']}
      </div>
      <div class="figure-caption">Figure 4.4: Service Mesh Control Plane (istiod) and Data Plane (Envoy) Interaction</div>

      <h2 class="section-title" style="margin-top: 4px;">4.7 Communication Protocols and Request Lifecycle</h2>
      <p>
        The platform standardizes on modern protocols: <b>North-South:</b> HTTPS/1.1 and HTTP/2 over TLS 1.3, carrying JSON payloads conforming to OpenAPI 3.1. <b>East-West:</b> Multiplexed HTTP/2 streams carrying gRPC Protobuf payloads for latency-critical service-to-service calls (Booking &rarr; Flight Seat Reservation), and HTTP/1.1 REST for async event publishing. <b>Error Handling:</b> Standardized RFC 7807 Problem Details payloads with structured fields (type, title, status, detail, instance). Figure 4.5 traces an end-to-end flight booking checkout request:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['5']}
      </div>
      <div class="figure-caption">Figure 4.5: End-to-End Flight Checkout Request Sequence Diagram</div>
    </div>
    ${renderFooter(24)}
  </section>
  `);

  // ================= PAGE 25: CHAPTER 4 (4.8 KUBERNETES ORCHESTRATION - NEW EXTENSION PAGE) =================
  pages.push(`
  <section class="report-page" id="page-25" data-page="25">
    ${renderHeader(25)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">4.8 Kubernetes Cluster Architecture &amp; Workload Orchestration</h2>
      <p style="font-size: 8.8pt; line-height: 1.28; margin-bottom: 2px;">
        The Air Ticket Booking System is deployed as containerized microservices managed natively by a multi-node Kubernetes cluster. Kubernetes provides container orchestration, automated pod scheduling, self-healing, elastic autoscaling, and zero-downtime rolling updates:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['16']}
      </div>
      <div class="figure-caption" style="margin-bottom: 4px;">Figure 4.6B: Kubernetes Cluster Workload Orchestration &amp; Networking Topology</div>

      <p style="font-size: 8.5pt; line-height: 1.25; margin-bottom: 3px;">
        <b>Core Kubernetes Architectural Primitives in the Air Ticket Booking Platform:</b>
      </p>
      <ul style="font-size: 8.2pt; line-height: 1.22; margin-bottom: 0;">
        <li><b>Pods &amp; Dual-Container Pattern:</b> Each application pod pairs an application runtime (e.g., Spring Boot Booking Core) with an injected Envoy sidecar proxy sharing the same Linux network namespace (<code>localhost:15001</code>).</li>
        <li><b>Deployments &amp; Rolling Updates:</b> Declarative ReplicaSets enforce desired pod counts with rolling update parameters (<code>maxSurge: 25%</code>, <code>maxUnavailable: 0</code>), ensuring continuous availability during version upgrades.</li>
        <li><b>Health Checks (Liveness &amp; Readiness Probes):</b> Kubelet monitors HTTP endpoints (<code>/actuator/health/liveness</code> and <code>readiness</code>) at 10s intervals, isolating unready containers from Service routing.</li>
        <li><b>Horizontal Pod Autoscaler (HPA):</b> Heuristic autoscaling dynamically adjusts pod replicas between 2 and 10 based on real-time 70% CPU utilization thresholds, absorbing flash-sale surges without manual intervention.</li>
      </ul>
    </div>
    ${renderFooter(25)}
  </section>
  `);

  // ================= PAGE 26: CHAPTER 4 (4.9 - 4.10 & FIGURES 4.6, 4.7) =================
  pages.push(`
  <section class="report-page" id="page-26" data-page="26">
    ${renderHeader(26)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">4.9 Deployment Architecture and High Availability</h2>
      <p>
        The Kubernetes cluster operates across physical and virtual compute nodes. Multi-node scheduling employs pod anti-affinity rules to distribute microservice replicas across separate worker nodes, ensuring high availability even during worker node failures:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['6']}
      </div>
      <div class="figure-caption">Figure 4.6: Multi-Node Kubernetes Deployment and High-Availability Topology</div>

      <h2 class="section-title" style="margin-top: 4px;">4.10 Linux Network Namespace and Packet Redirection Mechanism</h2>
      <p>
        Transparent sidecar proxying relies on manipulating the pod's dedicated Linux network namespace (<code>netns</code>) during container initialization. The <code>istio-init</code> container configures iptables rules inside the <code>nat</code> table: inbound packets hitting <code>eth0</code> are intercepted by the <code>PREROUTING</code> chain and redirected to port <code>15006</code> (Envoy Inbound Listener). Outbound traffic generated by the application process is intercepted by the <code>OUTPUT</code> chain and redirected to port <code>15001</code> (Envoy Outbound Listener), while traffic originating from UID 1337 (the Envoy proxy user) is explicitly returned to prevent infinite loopback routing:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['7']}
      </div>
      <div class="figure-caption">Figure 4.7: Linux Network Namespace and iptables Packet Redirection Mechanism</div>
    </div>
    ${renderFooter(26)}
  </section>
  `);

  // ================= PAGE 27: CHAPTER 4 (4.11 SEAT LOCKING & SECURITY - NEW EXTENSION PAGE) =================
  pages.push(`
  <section class="report-page" id="page-27" data-page="27">
    ${renderHeader(27)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">4.11 Distributed Seat Locking, Saga Compensation &amp; Zero-Trust Security Pipeline</h2>
      <p style="font-size: 8.8pt; line-height: 1.28; margin-bottom: 2px;">
        High-concurrency airline reservations require absolute seat consistency paired with cryptographic perimeter security. The system integrates Redis distributed locking for temporary seat reservation with an end-to-end zero-trust transport channel:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['17']}
      </div>
      <div class="figure-caption" style="margin-bottom: 4px;">Figure 4.12: End-to-End Zero-Trust Security &amp; Cryptographic Identity Pipeline</div>

      <p style="font-size: 8.5pt; line-height: 1.25; margin-bottom: 3px;">
        <b>Seat Reservation Consistency &amp; Saga Rollback Protocol:</b>
      </p>
      <div style="background: #F8FAFC; border: 1px solid #CBD5E1; border-left: 3px solid #16A34A; padding: 4px 8px; margin: 2px 0 4px 0; font-size: 7.6pt; line-height: 1.25;">
        <b>Happy Path (Confirmed Booking):</b><br>
        Passenger selects Seat 12A &rarr; Seat Service executes Redis atomic lock: <code>SET seat_lock:PA-101:12A {passenger_id} NX EX 300</code> &rarr; Payment Authorization verified &rarr; Booking committed to PostgreSQL &rarr; Seat permanently reserved in MySQL &rarr; PNR Ticket issued.<br>
        <b>Failure Path (Payment Declined / Gateway Timeout):</b><br>
        Seat 12A is locked &rarr; Payment Service returns DECLINED &rarr; Saga Coordinator dispatches <code>PaymentFailedCompensation</code> &rarr; Seat Service executes <code>DEL seat_lock:PA-101:12A</code> &rarr; Seat immediately unlocked &rarr; Booking marked FAILED &rarr; Zero orphaned seat locks.
      </div>

      <p style="font-size: 8.2pt; line-height: 1.22; margin-bottom: 0;">
        <b>Cryptographic Identity Propagation:</b> External JWT tokens validated at the Kong API Gateway are mapped into internal SPIFFE X.509 identities (<code>spiffe://cluster.local/ns/prod/sa/&lt;service&gt;</code>) issued by Citadel. Istio AuthorizationPolicies enforce least-privilege RPC execution, preventing unauthorized cross-service database access.
      </p>
    </div>
    ${renderFooter(27)}
  </section>
  `);

  // ================= PAGE 28: CHAPTER 4 (4.12 - 4.13 & FIGURES 4.8, 4.2) =================
  pages.push(`
  <section class="report-page" id="page-28" data-page="28">
    ${renderHeader(28)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">4.12 Zero-Trust SPIFFE Identity Issuance &amp; Mutual TLS Handshake</h2>
      <p>
        To eliminate unauthenticated East-West traffic, every pod is provisioned with a cryptographic identity conforming to the SPIFFE standard. Istio Citadel acts as the in-cluster CA, issuing short-lived X.509 certificates (SVIDs) with SAN format <code>spiffe://cluster.local/ns/prod/sa/&lt;name&gt;</code> delivered via the Secret Discovery Service (SDS). During inter-pod handshakes, Envoy sidecars negotiate TLS 1.3 mutual authentication, exchange certificates, and enforce AuthorizationPolicies:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['8']}
      </div>
      <div class="figure-caption">Figure 4.8: Zero-Trust SPIFFE Identity Issuance and Mutual TLS Handshake Flow</div>

      <h2 class="section-title" style="margin-top: 4px;">4.13 Data Architecture &amp; Saga Transaction Orchestration</h2>
      <p>
        To guarantee transactional integrity across decoupled microservice boundaries without holding distributed two-phase commit database locks, the platform implements the <b>Saga Orchestration Pattern</b>. The Booking Core Service coordinates the distributed checkout lifecycle across four discrete steps: (1) creating the order in PENDING state; (2) reserving seat inventory via synchronous gRPC call to the Flight Catalog Service; (3) validating payment tokens; and (4) committing the booking and dispatching confirmation events. If payment validation fails, the orchestrator triggers automated compensating actions to restore seat inventory:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['9']}
      </div>
      <div class="figure-caption">Figure 4.2: Saga Distributed Transaction Coordination and Compensating Action Flow</div>
    </div>
    ${renderFooter(28)}
  </section>
  `);

  // ================= PAGE 29: CHAPTER 4 (4.14 - 4.15 & FIGURES 4.9, 4.10) =================
  pages.push(`
  <section class="report-page" id="page-29" data-page="29">
    ${renderHeader(29)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">4.14 Observability Pipeline Design</h2>
      <p>
        Telemetry collection operates via a push-pull pipeline combining Prometheus metrics, Grafana dashboards, and Jaeger distributed tracing. Envoy sidecars export Prometheus L7 metrics on port <code>15090</code> scraped at 15-second intervals. Distributed traces containing W3C <code>traceparent</code> contexts are forwarded to the Jaeger collector, reconstructing end-to-end directed acyclic graph (DAG) execution waterfalls with millisecond-accurate latency allocations per network hop:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['10']}
      </div>
      <div class="figure-caption">Figure 4.9: End-to-End Observability Pipeline (Prometheus, Grafana, Jaeger)</div>

      <h2 class="section-title" style="margin-top: 4px;">4.15 Circuit Breaking Outlier Detection State Machine</h2>
      <p>
        To prevent cascading failures across the distributed cluster, Envoy sidecars implement automated Outlier Detection. When a backend pod experiences repeated failures (3 consecutive 5xx errors), Envoy trips the circuit breaker from CLOSED to OPEN, immediately ejecting the unhealthy instance from the load balancing pool for a 30-second base ejection window. After the ejection window expires, the state enters HALF-OPEN probing mode, dispatching trial requests to evaluate pod recovery before resetting:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['11']}
      </div>
      <div class="figure-caption">Figure 4.10: Envoy Circuit Breaker Outlier Detection State Machine</div>
    </div>
    ${renderFooter(29)}
  </section>
  `);

  // ================= PAGE 30: CHAPTER 4 (4.16 - 4.17 & TABLES 4.1, 4.2) =================
  pages.push(`
  <section class="report-page" id="page-30" data-page="30">
    ${renderHeader(30)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">4.16 Architecture Decision Records (ADRs)</h2>
      <p style="margin-bottom: 2px;">
        Six formal Architecture Decision Records were approved during the Semester VII Preliminary Design Review (PDR):
      </p>
      <table class="data-table" style="font-size: 6.8pt; line-height: 1.15; margin: 2px 0;">
        <thead>
          <tr>
            <th style="width: 10%;">ADR ID</th>
            <th style="width: 20%;">Architectural Decision</th>
            <th style="width: 22%;">Alternatives Compared</th>
            <th style="width: 26%;">Selected Choice &amp; Rationale</th>
            <th style="width: 22%;">Consequences &amp; Risks</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><b>ADR-01</b></td><td>API Gateway Engine</td><td>NGINX Ingress vs Kong Gateway vs Emissary</td><td><b>Kong Gateway:</b> Superior declarative plugin ecosystem (JWT, rate-limiting, CORS) and dynamic routing.</td><td>Requires ~120MB RAM; mitigated via lightweight DB-less declarative mode.</td></tr>
          <tr><td><b>ADR-02</b></td><td>Service Mesh Platform</td><td>Istio vs Linkerd vs Consul Connect</td><td><b>Istio:</b> Industry standard, rich EnvoyFilter CRD support, native W3C tracing, automated SPIFFE mTLS.</td><td>Higher sidecar memory footprint (~46MB/pod); managed via resource limits.</td></tr>
          <tr><td><b>ADR-03</b></td><td>Mesh Architecture Topology</td><td>Envoy Sidecars vs Ambient (Sidecarless) Mesh</td><td><b>Sidecar Topology:</b> Highly mature, strictly isolated network namespaces per pod; edge kernel compatibility.</td><td>Two extra TCP network hops per invocation; mitigated via TCP keep-alives.</td></tr>
          <tr><td><b>ADR-04</b></td><td>Interservice Communication</td><td>REST JSON over HTTP/1.1 vs gRPC over HTTP/2</td><td><b>Hybrid Model:</b> External REST/JSON at edge; internal high-frequency calls (Booking &rarr; Seat) use gRPC.</td><td>Requires managing Protobuf schemas; compensated by 42% lower serialization latency.</td></tr>
          <tr><td><b>ADR-05</b></td><td>Distributed Transactions</td><td>Two-Phase Commit (2PC) vs Saga Orchestration</td><td><b>Saga Pattern:</b> Avoids blocking database locks across network calls; supports compensating rollbacks.</td><td>Eventual consistency required; transient state visibility handled in UI.</td></tr>
          <tr><td><b>ADR-06</b></td><td>Edge Testbed Platform</td><td>Full Enterprise Rack Server vs Raspberry Pi 4</td><td><b>Raspberry Pi 4 (4GB):</b> Low cost (&#8377;4,000), low power (15W), enables deterministic edge client testing.</td><td>ARM64 architecture requires multi-arch Docker image builds (linux/arm64).</td></tr>
        </tbody>
      </table>
      <div style="font-size: 6.8pt; color: #475569; text-align: center; margin-bottom: 2px;">Table 4.1: Architecture Decision Records (ADR-01 to ADR-06) Ratified at PDR Milestone</div>

      <h2 class="section-title" style="margin-top: 2px;">4.17 Architecture-to-Requirements Traceability Matrix</h2>
      <table class="data-table" style="font-size: 6.8pt; line-height: 1.15; margin: 2px 0;">
        <thead>
          <tr>
            <th style="width: 22%;">Architectural Component</th>
            <th style="width: 32%;">Primary Technical Mechanism</th>
            <th style="width: 24%;">Satisfied Requirements</th>
            <th style="width: 22%;">Quality Attribute Target</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>API Gateway Ingress Tier</b></td>
            <td>Kong DB-less Ingress Controller with TLS 1.3 offloading, Redis token-bucket rate limiter, and RSA JWT validator plugin.</td>
            <td>REQ-F-01, REQ-F-02, REQ-F-03</td>
            <td>SSL Labs Grade A; Rate limit &lt;100 req/min; Ingress auth reject &lt;5ms.</td>
          </tr>
          <tr>
            <td><b>Istio Data Plane Sidecars</b></td>
            <td>Envoy Proxy v1.30 injected into pod network namespaces via iptables packet redirection chains.</td>
            <td>REQ-F-07, REQ-F-08, REQ-F-09</td>
            <td>100% inter-pod mTLS; Outlier detection trip &lt;200ms; Canary variance &plusmn;1.5%.</td>
          </tr>
          <tr>
            <td><b>Istio Control Plane</b></td>
            <td>istiod v1.22 consolidating Pilot (xDS service discovery) and Citadel (in-cluster SPIFFE X.509 CA).</td>
            <td>REQ-F-07, REQ-F-08</td>
            <td>Automated X.509 certificate rotation every 24 hours; zero-downtime xDS pushes.</td>
          </tr>
          <tr>
            <td><b>Core Backend Microservices</b></td>
            <td>Polyglot services: Go Auth Service, FastAPI &amp; Spring Boot Flight/Seat Service, Spring Boot Saga Coordinator, Node.js Notify.</td>
            <td>REQ-F-04, REQ-F-05, REQ-F-06, REQ-F-12</td>
            <td>&gt;85% test coverage; Sub-15ms database read/write queries; Zero orphaned transactions.</td>
          </tr>
          <tr>
            <td><b>Observability Pipeline</b></td>
            <td>Prometheus v2.51 scraping Envoy :15090 stats, Grafana v10.4 dashboards, and Jaeger v1.55 distributed tracing.</td>
            <td>REQ-F-10, REQ-F-11</td>
            <td>100% W3C trace span capture; 15-second metric scraping; Alert MTTD &lt;25 seconds.</td>
          </tr>
          <tr>
            <td><b>Data Persistence Layer</b></td>
            <td>MySQL 8.0 ACID transaction ledger, PostgreSQL relational user stores, and Redis 7 in-memory cache &amp; distributed locks.</td>
            <td>REQ-F-04, REQ-F-05, REQ-F-06</td>
            <td>Sub-3ms Redis cache hit latency; 5-minute seat hold lock TTL; Zero data loss.</td>
          </tr>
          <tr>
            <td><b>Container Infrastructure</b></td>
            <td>Hardened Google Distroless multi-stage container images orchestrated via Kubernetes v1.30 and Flannel CNI.</td>
            <td>REQ-F-01 through REQ-F-16, NFR-PORT</td>
            <td>Container images &lt;65MB; 0 Critical/High CVEs; Automated K3s cluster bootstrap &lt;3 min.</td>
          </tr>
        </tbody>
      </table>
      <div style="font-size: 6.8pt; color: #475569; text-align: center; margin-bottom: 2px;">Table 4.2: Comprehensive Architecture-to-Requirements Traceability Matrix</div>

      <div class="callout-box" style="margin-top: 2px; font-size: 7.5pt; line-height: 1.2;">
        <b>Architectural Verification Summary:</b> The architectural design successfully decouples operational networking from application codebases. Every inbound client transaction traverses a verified cryptographic trust boundary at the Kong API Gateway, transitions into the mutual TLS zero-trust Istio mesh, executes transactional business logic across isolated microservice datastores, and yields deterministic distributed telemetry across all hops.
      </div>
    </div>
    ${renderFooter(30)}
  </section>
  `);

  return pages;
}

module.exports = { getChapter4 };
