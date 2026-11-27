const fs = require('fs');

// Generate SVG for Enhanced Conceptual Architecture of Air Ticket Booking System (Figure 4.1B)
function generateConceptualArchitectureSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 520" width="100%" height="auto" style="font-family: 'Times New Roman', Times, serif;">
  <defs>
    <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="grad-gw" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="grad-mesh" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#0D9488"/>
    </linearGradient>
    <linearGradient id="grad-svc" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#F1F5F9"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="1" dy="2" stdDeviation="3" flood-opacity="0.18"/>
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#1E293B"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7"/>
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669"/>
    </marker>
  </defs>

  <!-- Outer Canvas Card -->
  <rect x="5" y="5" width="950" height="510" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" filter="url(#shadow)"/>
  
  <!-- Header Title -->
  <rect x="5" y="5" width="950" height="34" rx="8" fill="#1A365D"/>
  <rect x="5" y="27" width="950" height="12" fill="#1A365D"/>
  <text x="480" y="27" fill="#FFFFFF" font-size="13" font-weight="bold" text-anchor="middle" letter-spacing="0.5">
    FIGURE 4.1B: ENHANCED CONCEPTUAL ARCHITECTURE &ndash; AIR TICKET BOOKING SYSTEM
  </text>

  <!-- Tier 1: Client Layer -->
  <rect x="350" y="48" width="260" height="42" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="480" y="66" fill="#1E3A8A" font-size="11" font-weight="bold" text-anchor="middle">React Single Page Application (PWA Frontend)</text>
  <text x="480" y="81" fill="#475569" font-size="9" text-anchor="middle">3D Cabin View &bull; Seat Selection &bull; Booking Wizard &bull; Boarding Pass</text>

  <!-- Flow 1: Client to Gateway -->
  <line x1="480" y1="90" x2="480" y2="120" stroke="#1E293B" stroke-width="2" marker-end="url(#arrow)"/>
  <rect x="420" y="98" width="120" height="15" rx="3" fill="#FFFFFF" stroke="#94A3B8" stroke-width="0.8"/>
  <text x="480" y="109" fill="#0F172A" font-size="8" font-weight="bold" text-anchor="middle">HTTPS / REST (TLS 1.3)</text>

  <!-- Tier 2: API Gateway Tier -->
  <rect x="180" y="122" width="600" height="66" rx="6" fill="url(#grad-gw)" stroke="#334155" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="480" y="142" fill="#38BDF8" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="0.5">
    API GATEWAY &ndash; NORTH-SOUTH INGRESS CONTROLLER (KONG / ENVOY)
  </text>
  <line x1="200" y1="150" x2="760" y2="150" stroke="#475569" stroke-width="0.8"/>
  <text x="235" y="165" fill="#F8FAFC" font-size="8.5" text-anchor="middle">&bull; TLS 1.3 Offloading</text>
  <text x="340" y="165" fill="#F8FAFC" font-size="8.5" text-anchor="middle">&bull; RS256 JWT Verify</text>
  <text x="450" y="165" fill="#F8FAFC" font-size="8.5" text-anchor="middle">&bull; Token Bucket Rate Limit</text>
  <text x="575" y="165" fill="#F8FAFC" font-size="8.5" text-anchor="middle">&bull; L7 URI Path Routing</text>
  <text x="690" y="165" fill="#F8FAFC" font-size="8.5" text-anchor="middle">&bull; CORS &amp; Trace Inject</text>
  <text x="480" y="179" fill="#94A3B8" font-size="8" text-anchor="middle">Endpoints: /api/v1/auth &bull; /api/v1/flights &bull; /api/v1/seats &bull; /api/v1/bookings &bull; /api/v1/payments &bull; /api/v1/tickets</text>

  <!-- Flow 2: Gateway to Service Mesh -->
  <line x1="480" y1="188" x2="480" y2="216" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>
  <rect x="400" y="196" width="160" height="15" rx="3" fill="#ECFDF5" stroke="#10B981" stroke-width="0.8"/>
  <text x="480" y="207" fill="#047857" font-size="8" font-weight="bold" text-anchor="middle">East-West Ingress (mTLS Tunnel)</text>

  <!-- Tier 3: Service Mesh Container Boundary -->
  <rect x="25" y="218" width="910" height="280" rx="8" fill="#F8FAFC" stroke="#0D9488" stroke-width="1.8" stroke-dasharray="6,4"/>
  <text x="50" y="236" fill="#0F766E" font-size="11" font-weight="bold">
    ISTIO SERVICE MESH CONTROL &amp; DATA PLANE BOUNDARY (EAST-WEST COMMUNICATION LAYER)
  </text>
  <text x="730" y="236" fill="#047857" font-size="9" font-weight="bold">Strict mTLS &bull; SPIFFE Workload Identity &bull; Envoy Outlier Detection</text>

  <!-- 5 Core Microservices -->
  <!-- 1. Auth Service -->
  <g transform="translate(40, 248)">
    <rect x="0" y="0" width="160" height="88" rx="6" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2" filter="url(#shadow)"/>
    <rect x="0" y="0" width="160" height="22" rx="6" fill="#DBEAFE"/>
    <text x="80" y="15" fill="#1E40AF" font-size="9.5" font-weight="bold" text-anchor="middle">AUTH SERVICE</text>
    <text x="80" y="36" fill="#0F172A" font-size="8" text-anchor="middle">Go 1.22 Runtime [Port 8001]</text>
    <text x="80" y="49" fill="#475569" font-size="7.5" text-anchor="middle">BCrypt Hashing &bull; RS256 JWT</text>
    <rect x="15" y="58" width="130" height="20" rx="3" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="80" y="72" fill="#0284C7" font-size="7.5" font-weight="bold" text-anchor="middle">Envoy Sidecar (:15001)</text>
  </g>

  <!-- 2. Flight Service -->
  <g transform="translate(220, 248)">
    <rect x="0" y="0" width="160" height="88" rx="6" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2" filter="url(#shadow)"/>
    <rect x="0" y="0" width="160" height="22" rx="6" fill="#DBEAFE"/>
    <text x="80" y="15" fill="#1E40AF" font-size="9.5" font-weight="bold" text-anchor="middle">FLIGHT SERVICE</text>
    <text x="80" y="36" fill="#0F172A" font-size="8" text-anchor="middle">FastAPI / Spring [Port 8002]</text>
    <text x="80" y="49" fill="#475569" font-size="7.5" text-anchor="middle">Schedules &bull; Fare Matrix &bull; Routes</text>
    <rect x="15" y="58" width="130" height="20" rx="3" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="80" y="72" fill="#0284C7" font-size="7.5" font-weight="bold" text-anchor="middle">Envoy Sidecar (:15001)</text>
  </g>

  <!-- 3. Seat Service -->
  <g transform="translate(400, 248)">
    <rect x="0" y="0" width="160" height="88" rx="6" fill="#FFFFFF" stroke="#059669" stroke-width="1.5" filter="url(#shadow)"/>
    <rect x="0" y="0" width="160" height="22" rx="6" fill="#D1FAE5"/>
    <text x="80" y="15" fill="#065F46" font-size="9.5" font-weight="bold" text-anchor="middle">SEAT SERVICE</text>
    <text x="80" y="36" fill="#0F172A" font-size="8" text-anchor="middle">FastAPI / Python [Port 8005]</text>
    <text x="80" y="49" fill="#047857" font-size="7.5" font-weight="bold" text-anchor="middle">5-Min Redis Distributed Lock</text>
    <rect x="15" y="58" width="130" height="20" rx="3" fill="#ECFDF5" stroke="#A7F3D0"/>
    <text x="80" y="72" fill="#059669" font-size="7.5" font-weight="bold" text-anchor="middle">Envoy Sidecar (:15001)</text>
  </g>

  <!-- 4. Booking Service -->
  <g transform="translate(580, 248)">
    <rect x="0" y="0" width="160" height="88" rx="6" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2" filter="url(#shadow)"/>
    <rect x="0" y="0" width="160" height="22" rx="6" fill="#DBEAFE"/>
    <text x="80" y="15" fill="#1E40AF" font-size="9.5" font-weight="bold" text-anchor="middle">BOOKING SERVICE</text>
    <text x="80" y="36" fill="#0F172A" font-size="8" text-anchor="middle">Spring Boot 3.2 [Port 8003]</text>
    <text x="80" y="49" fill="#1E3A8A" font-size="7.5" font-weight="bold" text-anchor="middle">Saga Orchestrator Coordinator</text>
    <rect x="15" y="58" width="130" height="20" rx="3" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="80" y="72" fill="#0284C7" font-size="7.5" font-weight="bold" text-anchor="middle">Envoy Sidecar (:15001)</text>
  </g>

  <!-- 5. Payment Service -->
  <g transform="translate(760, 248)">
    <rect x="0" y="0" width="160" height="88" rx="6" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.2" filter="url(#shadow)"/>
    <rect x="0" y="0" width="160" height="22" rx="6" fill="#DBEAFE"/>
    <text x="80" y="15" fill="#1E40AF" font-size="9.5" font-weight="bold" text-anchor="middle">PAYMENT SERVICE</text>
    <text x="80" y="36" fill="#0F172A" font-size="8" text-anchor="middle">Node.js / Express [Port 8006]</text>
    <text x="80" y="49" fill="#475569" font-size="7.5" text-anchor="middle">Token Verification &bull; Webhooks</text>
    <rect x="15" y="58" width="130" height="20" rx="3" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="80" y="72" fill="#0284C7" font-size="7.5" font-weight="bold" text-anchor="middle">Envoy Sidecar (:15001)</text>
  </g>

  <!-- Interservice Mesh Lines -->
  <!-- Booking to Seat (gRPC over mTLS) -->
  <path d="M 580 290 Q 565 290 560 290" stroke="#059669" stroke-width="1.8" stroke-dasharray="3,2" marker-end="url(#arrow-green)"/>
  <rect x="525" y="278" width="68" height="12" rx="2" fill="#ECFDF5" stroke="#10B981" stroke-width="0.5"/>
  <text x="559" y="287" fill="#047857" font-size="6.5" font-weight="bold" text-anchor="middle">gRPC / mTLS</text>

  <!-- Booking to Payment (REST over mTLS) -->
  <path d="M 740 290 Q 750 290 760 290" stroke="#0284C7" stroke-width="1.8" stroke-dasharray="3,2" marker-end="url(#arrow-blue)"/>
  <rect x="715" y="278" width="68" height="12" rx="2" fill="#EFF6FF" stroke="#3B82F6" stroke-width="0.5"/>
  <text x="749" y="287" fill="#1E40AF" font-size="6.5" font-weight="bold" text-anchor="middle">REST / mTLS</text>

  <!-- Tier 4: Persistence Layer -->
  <!-- DB Auth -->
  <g transform="translate(65, 360)">
    <rect x="0" y="0" width="110" height="42" rx="5" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/>
    <text x="55" y="18" fill="#92400E" font-size="8.5" font-weight="bold" text-anchor="middle">PostgreSQL Pod</text>
    <text x="55" y="32" fill="#78350F" font-size="7.5" text-anchor="middle">User Credentials DB</text>
    <line x1="55" y1="-24" x2="55" y2="0" stroke="#D97706" stroke-width="1.2" marker-end="url(#arrow)"/>
  </g>

  <!-- DB Flight -->
  <g transform="translate(245, 360)">
    <rect x="0" y="0" width="110" height="42" rx="5" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/>
    <text x="55" y="18" fill="#92400E" font-size="8.5" font-weight="bold" text-anchor="middle">MySQL 8.0 Pod</text>
    <text x="55" y="32" fill="#78350F" font-size="7.5" text-anchor="middle">Flight Inventory DB</text>
    <line x1="55" y1="-24" x2="55" y2="0" stroke="#D97706" stroke-width="1.2" marker-end="url(#arrow)"/>
  </g>

  <!-- Redis Seat Holds -->
  <g transform="translate(425, 360)">
    <rect x="0" y="0" width="110" height="42" rx="5" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.4"/>
    <text x="55" y="18" fill="#991B1B" font-size="8.5" font-weight="bold" text-anchor="middle">Redis 7 Cluster</text>
    <text x="55" y="32" fill="#B91C1C" font-size="7.5" font-weight="bold" text-anchor="middle">5m TTL Seat Holds</text>
    <line x1="55" y1="-24" x2="55" y2="0" stroke="#DC2626" stroke-width="1.4" marker-end="url(#arrow)"/>
  </g>

  <!-- DB Booking -->
  <g transform="translate(605, 360)">
    <rect x="0" y="0" width="110" height="42" rx="5" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/>
    <text x="55" y="18" fill="#92400E" font-size="8.5" font-weight="bold" text-anchor="middle">PostgreSQL Pod</text>
    <text x="55" y="32" fill="#78350F" font-size="7.5" text-anchor="middle">Saga Booking Ledger</text>
    <line x1="55" y1="-24" x2="55" y2="0" stroke="#D97706" stroke-width="1.2" marker-end="url(#arrow)"/>
  </g>

  <!-- DB Payment -->
  <g transform="translate(785, 360)">
    <rect x="0" y="0" width="110" height="42" rx="5" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/>
    <text x="55" y="18" fill="#92400E" font-size="8.5" font-weight="bold" text-anchor="middle">PostgreSQL Pod</text>
    <text x="55" y="32" fill="#78350F" font-size="7.5" text-anchor="middle">Transaction Audit DB</text>
    <line x1="55" y1="-24" x2="55" y2="0" stroke="#D97706" stroke-width="1.2" marker-end="url(#arrow)"/>
  </g>

  <!-- Event Bus / Kafka Tier -->
  <g transform="translate(320, 422)">
    <rect x="0" y="0" width="320" height="28" rx="4" fill="#312E81" stroke="#4338CA" stroke-width="1"/>
    <text x="160" y="18" fill="#E0E7FF" font-size="8.5" font-weight="bold" text-anchor="middle">
      Apache Kafka / RabbitMQ Distributed Event Bus
    </text>
  </g>
  <line x1="660" y1="336" x2="660" y2="422" stroke="#4338CA" stroke-width="1.2" stroke-dasharray="3,2" marker-end="url(#arrow)"/>
  <line x1="480" y1="450" x2="480" y2="466" stroke="#4338CA" stroke-width="1.2" marker-end="url(#arrow)"/>

  <!-- Tier 5: Notification Service -->
  <g transform="translate(360, 466)">
    <rect x="0" y="0" width="240" height="26" rx="4" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.2"/>
    <text x="120" y="17" fill="#15803D" font-size="8.5" font-weight="bold" text-anchor="middle">
      NOTIFICATION SERVICE &bull; WebSockets / Email / SMS Alerts
    </text>
  </g>
</svg>`;
}

// Generate SVG for Kubernetes Cluster Orchestration Topology (Figure 4.6B)
function generateKubernetesTopologySvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 480" width="100%" height="auto" style="font-family: 'Times New Roman', Times, serif;">
  <defs>
    <linearGradient id="k8s-head" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A365D"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
    <filter id="k8s-shadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="1" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>

  <rect x="5" y="5" width="950" height="470" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" filter="url(#k8s-shadow)"/>
  
  <rect x="5" y="5" width="950" height="34" rx="8" fill="#1A365D"/>
  <rect x="5" y="27" width="950" height="12" fill="#1A365D"/>
  <text x="480" y="27" fill="#FFFFFF" font-size="13" font-weight="bold" text-anchor="middle" letter-spacing="0.5">
    FIGURE 4.6B: KUBERNETES CLUSTER WORKLOAD ORCHESTRATION &amp; NETWORKING TOPOLOGY
  </text>

  <!-- Ingress Controller Banner -->
  <rect x="30" y="48" width="900" height="46" rx="6" fill="#F8FAFC" stroke="#334155" stroke-width="1.2"/>
  <text x="480" y="67" fill="#0F172A" font-size="10.5" font-weight="bold" text-anchor="middle">
    KUBERNETES INGRESS CONTROLLER &ndash; KONG GATEWAY PROXY (NAMESPACE: PROD)
  </text>
  <text x="480" y="83" fill="#475569" font-size="8.5" text-anchor="middle">
    LoadBalancer Service (Port 443) &bull; TLS Ingress Secret &bull; RateLimiting CRD &bull; Path Prefix Dispatcher
  </text>

  <!-- Control Plane Node Box -->
  <g transform="translate(30, 105)">
    <rect x="0" y="0" width="270" height="355" rx="6" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.5"/>
    <rect x="0" y="0" width="270" height="28" rx="6" fill="#0284C7"/>
    <text x="135" y="19" fill="#FFFFFF" font-size="10" font-weight="bold" text-anchor="middle">CONTROL PLANE NODE (MASTER)</text>
    
    <rect x="15" y="38" width="240" height="42" rx="4" fill="#FFFFFF" stroke="#BAE6FD"/>
    <text x="135" y="55" fill="#0369A1" font-size="8.5" font-weight="bold" text-anchor="middle">kube-apiserver &amp; etcd v3.5</text>
    <text x="135" y="70" fill="#64748b" font-size="7.5" text-anchor="middle">State store, cluster consensus, CRD registry</text>

    <rect x="15" y="90" width="240" height="42" rx="4" fill="#FFFFFF" stroke="#BAE6FD"/>
    <text x="135" y="107" fill="#0369A1" font-size="8.5" font-weight="bold" text-anchor="middle">kube-controller-manager &amp; HPA</text>
    <text x="135" y="122" fill="#64748b" font-size="7.5" text-anchor="middle">Replica reconciliation, 70% CPU autoscale</text>

    <rect x="15" y="142" width="240" height="42" rx="4" fill="#FFFFFF" stroke="#BAE6FD"/>
    <text x="135" y="159" fill="#0369A1" font-size="8.5" font-weight="bold" text-anchor="middle">istiod Control Plane v1.22</text>
    <text x="135" y="174" fill="#64748b" font-size="7.5" text-anchor="middle">Pilot xDS server, Citadel SPIFFE CA</text>

    <rect x="15" y="194" width="240" height="42" rx="4" fill="#FFFFFF" stroke="#BAE6FD"/>
    <text x="135" y="211" fill="#0369A1" font-size="8.5" font-weight="bold" text-anchor="middle">CoreDNS &amp; Flannel CNI Fabric</text>
    <text x="135" y="226" fill="#64748b" font-size="7.5" text-anchor="middle">Cluster overlay 10.244.0.0/16, VXLAN bridge</text>

    <rect x="15" y="246" width="240" height="96" rx="4" fill="#EFF6FF" stroke="#93C5FD"/>
    <text x="135" y="264" fill="#1E3A8A" font-size="8.5" font-weight="bold" text-anchor="middle">Observability &amp; Telemetry Stack</text>
    <text x="135" y="280" fill="#1E40AF" font-size="7.5" text-anchor="middle">&bull; Prometheus v2.51 (Scrape :15090 stats)</text>
    <text x="135" y="296" fill="#1E40AF" font-size="7.5" text-anchor="middle">&bull; Grafana v10.4 (Service mesh dashboards)</text>
    <text x="135" y="312" fill="#1E40AF" font-size="7.5" text-anchor="middle">&bull; Jaeger v1.55 (W3C DAG span collector)</text>
    <text x="135" y="328" fill="#1E40AF" font-size="7.5" text-anchor="middle">&bull; Alertmanager (Slack/Email thresholds)</text>
  </g>

  <!-- Worker Node 1 Box -->
  <g transform="translate(320, 105)">
    <rect x="0" y="0" width="300" height="355" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5"/>
    <rect x="0" y="0" width="300" height="28" rx="6" fill="#16A34A"/>
    <text x="150" y="19" fill="#FFFFFF" font-size="10" font-weight="bold" text-anchor="middle">WORKER NODE 1 (ZONE A)</text>

    <rect x="15" y="38" width="270" height="66" rx="4" fill="#FFFFFF" stroke="#86EFAC"/>
    <text x="150" y="55" fill="#15803D" font-size="8.5" font-weight="bold" text-anchor="middle">Auth Service Pod (v1) [Port 8001]</text>
    <text x="150" y="70" fill="#334155" font-size="7.5" text-anchor="middle">Container: Go 1.22 Binary | Envoy Sidecar (:15001)</text>
    <text x="150" y="85" fill="#64748B" font-size="7" text-anchor="middle">Limits: 256Mi RAM, 200m CPU &bull; Readiness Probe OK</text>

    <rect x="15" y="112" width="270" height="66" rx="4" fill="#FFFFFF" stroke="#86EFAC"/>
    <text x="150" y="129" fill="#15803D" font-size="8.5" font-weight="bold" text-anchor="middle">Flight Catalog Service Pod (v1) [Port 8002]</text>
    <text x="150" y="144" fill="#334155" font-size="7.5" text-anchor="middle">Container: FastAPI / Python | Envoy Sidecar (:15001)</text>
    <text x="150" y="159" fill="#64748B" font-size="7" text-anchor="middle">Limits: 384Mi RAM, 300m CPU &bull; Sub-10ms query cache</text>

    <rect x="15" y="186" width="270" height="66" rx="4" fill="#FFFFFF" stroke="#86EFAC"/>
    <text x="150" y="203" fill="#15803D" font-size="8.5" font-weight="bold" text-anchor="middle">Booking Core Service Pod (v1 Primary) [8003]</text>
    <text x="150" y="218" fill="#334155" font-size="7.5" text-anchor="middle">Container: Spring Boot 3.2 | Envoy Sidecar (:15001)</text>
    <text x="150" y="233" fill="#64748B" font-size="7" text-anchor="middle">Limits: 512Mi RAM, 500m CPU &bull; Saga Coordinator</text>

    <rect x="15" y="260" width="270" height="82" rx="4" fill="#FEFCE8" stroke="#FDE047"/>
    <text x="150" y="278" fill="#A16207" font-size="8.5" font-weight="bold" text-anchor="middle">Stateful Data Stores (Zone A)</text>
    <text x="150" y="296" fill="#854D0E" font-size="7.5" text-anchor="middle">&bull; MySQL 8.0 Primary (PVC 20Gi ext4)</text>
    <text x="150" y="312" fill="#854D0E" font-size="7.5" text-anchor="middle">&bull; PostgreSQL Relational User Store</text>
    <text x="150" y="328" fill="#854D0E" font-size="7.5" text-anchor="middle">&bull; PersistentVolumeClaim backed by NVMe</text>
  </g>

  <!-- Worker Node 2 Box -->
  <g transform="translate(640, 105)">
    <rect x="0" y="0" width="290" height="355" rx="6" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5"/>
    <rect x="0" y="0" width="290" height="28" rx="6" fill="#9333EA"/>
    <text x="145" y="19" fill="#FFFFFF" font-size="10" font-weight="bold" text-anchor="middle">WORKER NODE 2 (ZONE B - REPLICAS)</text>

    <rect x="15" y="38" width="260" height="66" rx="4" fill="#FFFFFF" stroke="#D8B4FE"/>
    <text x="130" y="55" fill="#7E22CE" font-size="8.5" font-weight="bold" text-anchor="middle">Seat Service Pod (v1) [Port 8005]</text>
    <text x="130" y="70" fill="#334155" font-size="7.5" text-anchor="middle">Container: Python FastAPI | Envoy Sidecar (:15001)</text>
    <text x="130" y="85" fill="#64748B" font-size="7" text-anchor="middle">Redis 5-min distributed seat hold mutex</text>

    <rect x="15" y="112" width="260" height="66" rx="4" fill="#FFFFFF" stroke="#D8B4FE"/>
    <text x="130" y="129" fill="#7E22CE" font-size="8.5" font-weight="bold" text-anchor="middle">Booking Service Pod (v2 Canary) [8003]</text>
    <text x="130" y="144" fill="#334155" font-size="7.5" text-anchor="middle">Container: Spring Boot 3.2 | Envoy Sidecar (:15001)</text>
    <text x="130" y="159" fill="#64748B" font-size="7" text-anchor="middle">VirtualService canary weight: 10% live traffic</text>

    <rect x="15" y="186" width="260" height="66" rx="4" fill="#FFFFFF" stroke="#D8B4FE"/>
    <text x="130" y="203" fill="#7E22CE" font-size="8.5" font-weight="bold" text-anchor="middle">Notification Service Pod (v1) [8004]</text>
    <text x="130" y="218" fill="#334155" font-size="7.5" text-anchor="middle">Container: Node.js 20 | Envoy Sidecar (:15001)</text>
    <text x="130" y="233" fill="#64748B" font-size="7" text-anchor="middle">WebSocket / Email asynchronous dispatch</text>

    <rect x="15" y="260" width="260" height="82" rx="4" fill="#FEF2F2" stroke="#FCA5A5"/>
    <text x="130" y="278" fill="#B91C1C" font-size="8.5" font-weight="bold" text-anchor="middle">In-Memory Cache &amp; Messaging</text>
    <text x="130" y="296" fill="#991B1B" font-size="7.5" text-anchor="middle">&bull; Redis 7.2 In-Memory Cluster</text>
    <text x="130" y="312" fill="#991B1B" font-size="7.5" text-anchor="middle">&bull; Sub-3ms query latency, 5m seat hold TTL</text>
    <text x="130" y="328" fill="#991B1B" font-size="7.5" text-anchor="middle">&bull; Apache Kafka Event Broker Pod</text>
  </g>
</svg>`;
}

// Generate SVG for Security Integration Flow (Figure 4.12)
function generateSecurityFlowSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 220" width="100%" height="auto" style="font-family: 'Times New Roman', Times, serif;">
  <defs>
    <marker id="sec-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0F172A"/>
    </marker>
  </defs>

  <rect x="5" y="5" width="950" height="210" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="5" y="5" width="950" height="28" rx="8" fill="#1E293B"/>
  <rect x="5" y="23" width="950" height="10" fill="#1E293B"/>
  <text x="480" y="23" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle">
    FIGURE 4.12: END-TO-END ZERO-TRUST SECURITY &amp; CRYPTOGRAPHIC IDENTITY PIPELINE
  </text>

  <!-- Step 1: External Client -->
  <g transform="translate(25, 48)">
    <rect x="0" y="0" width="130" height="60" rx="5" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.2"/>
    <text x="65" y="22" fill="#1E40AF" font-size="9" font-weight="bold" text-anchor="middle">1. Client Device</text>
    <text x="65" y="38" fill="#475569" font-size="7.5" text-anchor="middle">Browser / Mobile App</text>
    <text x="65" y="50" fill="#0284C7" font-size="7" font-weight="bold" text-anchor="middle">User Bearer Token</text>
  </g>

  <line x1="155" y1="78" x2="190" y2="78" stroke="#0F172A" stroke-width="1.8" marker-end="url(#sec-arrow)"/>
  <text x="172" y="72" fill="#64748B" font-size="7" font-weight="bold" text-anchor="middle">HTTPS</text>

  <!-- Step 2: API Gateway -->
  <g transform="translate(195, 48)">
    <rect x="0" y="0" width="150" height="60" rx="5" fill="#F1F5F9" stroke="#334155" stroke-width="1.2"/>
    <text x="75" y="22" fill="#0F172A" font-size="9" font-weight="bold" text-anchor="middle">2. API Gateway</text>
    <text x="75" y="38" fill="#475569" font-size="7.5" text-anchor="middle">TLS 1.3 Termination</text>
    <text x="75" y="50" fill="#059669" font-size="7" font-weight="bold" text-anchor="middle">Rate Limit + CORS</text>
  </g>

  <line x1="345" y1="78" x2="380" y2="78" stroke="#0F172A" stroke-width="1.8" marker-end="url(#sec-arrow)"/>
  <text x="362" y="72" fill="#64748B" font-size="7" font-weight="bold" text-anchor="middle">RS256</text>

  <!-- Step 3: JWT Validation -->
  <g transform="translate(385, 48)">
    <rect x="0" y="0" width="150" height="60" rx="5" fill="#FEF3C7" stroke="#D97706" stroke-width="1.2"/>
    <text x="75" y="22" fill="#92400E" font-size="9" font-weight="bold" text-anchor="middle">3. JWT Validation</text>
    <text x="75" y="38" fill="#78350F" font-size="7.5" text-anchor="middle">Public Key Signature</text>
    <text x="75" y="50" fill="#B45309" font-size="7" font-weight="bold" text-anchor="middle">Claims, Exp, Sub check</text>
  </g>

  <line x1="535" y1="78" x2="570" y2="78" stroke="#0F172A" stroke-width="1.8" marker-end="url(#sec-arrow)"/>
  <text x="552" y="72" fill="#64748B" font-size="7" font-weight="bold" text-anchor="middle">mTLS</text>

  <!-- Step 4: Istio Service Mesh -->
  <g transform="translate(575, 48)">
    <rect x="0" y="0" width="165" height="60" rx="5" fill="#ECFDF5" stroke="#059669" stroke-width="1.2"/>
    <text x="82" y="22" fill="#065F46" font-size="9" font-weight="bold" text-anchor="middle">4. Service Mesh</text>
    <text x="82" y="38" fill="#047857" font-size="7.5" text-anchor="middle">Envoy Sidecar Proxy</text>
    <text x="82" y="50" fill="#059669" font-size="7" font-weight="bold" text-anchor="middle">SPIFFE Workload ID</text>
  </g>

  <line x1="740" y1="78" x2="775" y2="78" stroke="#0F172A" stroke-width="1.8" marker-end="url(#sec-arrow)"/>
  <text x="757" y="72" fill="#64748B" font-size="7" font-weight="bold" text-anchor="middle">Strict</text>

  <!-- Step 5: Backend Microservices -->
  <g transform="translate(780, 48)">
    <rect x="0" y="0" width="150" height="60" rx="5" fill="#FAF5FF" stroke="#7E22CE" stroke-width="1.2"/>
    <text x="75" y="22" fill="#581C87" font-size="9" font-weight="bold" text-anchor="middle">5. Microservices</text>
    <text x="75" y="38" fill="#6B21A8" font-size="7.5" text-anchor="middle">Booking &bull; Seat &bull; Flight</text>
    <text x="75" y="50" fill="#7E22CE" font-size="7" font-weight="bold" text-anchor="middle">AuthorizationPolicy</text>
  </g>

  <!-- Bottom Explanatory Banner -->
  <rect x="25" y="122" width="905" height="78" rx="5" fill="#F8FAFC" stroke="#E2E8F0"/>
  <text x="40" y="142" fill="#0F172A" font-size="8.5" font-weight="bold">Core Security Controls &amp; Standards Alignment:</text>
  <text x="40" y="160" fill="#334155" font-size="8">&bull; <b>Edge Perimeter:</b> TLS 1.3 offload with ECDHE-ECDSA suites; automated IP rate limiting (100 req/min) prevents DoS/scraping.</text>
  <text x="40" y="176" fill="#334155" font-size="8">&bull; <b>Identity Transformation:</b> Validated JWT user identity is bridged to internal SPIFFE X.509 SVIDs (<code>spiffe://cluster.local/ns/prod/sa/&lt;svc&gt;</code>).</text>
  <text x="40" y="192" fill="#334155" font-size="8">&bull; <b>Internal Zero-Trust:</b> 100% inter-pod packets encrypted via TLS 1.3; Istio AuthorizationPolicies enforce least-privilege RPC invocations.</text>
</svg>`;
}

// Read existing svgs and add new ones
const svgsPath = 'report_gen/svg_assets.json';
const svgs = JSON.parse(fs.readFileSync(svgsPath, 'utf8'));

// Keys:
// 15: Figure 4.1B Enhanced Conceptual Architecture
// 16: Figure 4.6B Kubernetes Topology
// 17: Figure 4.12 Security Flow
svgs['15'] = generateConceptualArchitectureSvg();
svgs['16'] = generateKubernetesTopologySvg();
svgs['17'] = generateSecurityFlowSvg();

fs.writeFileSync(svgsPath, JSON.stringify(svgs, null, 2), 'utf8');
console.log('Successfully updated svg_assets.json with keys 15, 16, 17! Total keys:', Object.keys(svgs).length);
