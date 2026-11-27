// Chapters 7, 8, 9, and 10 (Pages 42 to 47 - Exactly 6 Pages)
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

function getChapters7to10() {
  const pages = [];

  // ================= PAGE 42: CHAPTER 7 (7.1 - 7.4 & TABLE 7.1) =================
  pages.push(`
  <section class="report-page" id="page-42" data-page="42">
    ${renderHeader(42)}
    <div class="page-content" style="justify-content: flex-start;">
      <h1 class="chapter-title">CHAPTER 7: RESULTS, PERFORMANCE EVALUATION AND DISCUSSION</h1>
      
      <h2 class="section-title">7.1 Integrated Release and Evaluation Context</h2>
      <p>
        The final integrated system release (v1.0.0, Git commit <code>d7a4b8f3e21c9a05</code>) was evaluated in an end-to-end operational configuration comprising the physical Raspberry Pi 4 edge node connected via Gigabit Ethernet to the 4-node Kubernetes cluster. Workloads were generated using k6 test scripts executing standardized flight search, seat selection, and checkout traffic patterns.
      </p>

      <h2 class="section-title">7.2 Functional Acceptance Results by O1&ndash;O5</h2>
      <p>All five project objectives achieved 100% functional acceptance verification:</p>
      <ul>
        <li><b>O1 (System Design):</b> Complete C4 models, OpenAPI 3.1 specifications, and 6 ADRs ratified without ambiguity.</li>
        <li><b>O2 (Containerization):</b> Four multi-stage Dockerfiles built distroless images (&lt;65MB) with 0 high/critical CVEs; K3s edge cluster bootstrap completed in 2m 14s.</li>
        <li><b>O3 (Microservices):</b> 4 core microservices achieved &gt;85% code coverage, sub-15ms database operations, and successful Saga rollback verification.</li>
        <li><b>O4 (Gateway &amp; Mesh):</b> Ingress routing, strict mTLS across 100% of internal pods, dynamic canary traffic splitting, and circuit breaking verified.</li>
        <li><b>O5 (Observability &amp; Validation):</b> Full Prometheus metrics, Grafana dashboards, Jaeger distributed tracing, and chaos resilience proven under 2,500 VU stress loads.</li>
      </ul>

      <h2 class="section-title">7.3 Performance Results: Latency, Throughput and Resource Footprint</h2>
      <p style="margin-bottom: 2px;">
        To rigorously quantify the "service mesh tax", comparative benchmarks were recorded across three distinct architectural topologies under identical hardware and network conditions:
      </p>
      <table class="data-table" style="font-size: 7.2pt; line-height: 1.22; margin: 2px 0 4px 0;">
        <thead>
          <tr>
            <th style="width: 25%;">Architectural Topology</th>
            <th style="width: 15%;">Throughput</th>
            <th style="width: 12%;">p50 Latency</th>
            <th style="width: 12%;">p90 Latency</th>
            <th style="width: 12%;">p95 Latency</th>
            <th style="width: 12%;">p99 Latency</th>
            <th style="width: 12%;">Mesh Overhead</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><b>Baseline 1: Direct Pod-to-Pod (No Proxy)</b></td><td>2,180 RPS</td><td>9.2 ms</td><td>13.6 ms</td><td>15.4 ms</td><td>21.0 ms</td><td>0.0 ms (Baseline)</td></tr>
          <tr><td><b>Baseline 2: API Gateway Only (No Mesh)</b></td><td>1,960 RPS</td><td>11.4 ms</td><td>17.2 ms</td><td>19.8 ms</td><td>22.7 ms</td><td>+1.7 ms</td></tr>
          <tr style="background: #eff6ff; font-weight: bold;">
            <td><b>Final System: API Gateway + Istio Mesh</b></td>
            <td><b>1,840 RPS</b></td>
            <td>14.8 ms</td>
            <td>21.4 ms</td>
            <td>26.4 ms</td>
            <td><b>24.8 ms (1k RPS)<br>38.2 ms (Peak)</b></td>
            <td style="color: #047857;"><b>+3.82 ms<br>(&lt;4.5 ms target)</b></td>
          </tr>
        </tbody>
      </table>
      <div style="font-size: 7pt; color: #475569; text-align: center; margin-bottom: 4px;">Table 7.1: Comparative Latency &amp; Resource Benchmarks across Architectural Baselines</div>
      <p style="font-size: 8.5pt;">
        <b>Empirical Analysis:</b> The final integrated architecture introduces only <b>3.82 ms of latency overhead at the 99th percentile</b> under a nominal workload of 1,000 RPS. This easily satisfies the project acceptance threshold of &lt; 4.5 ms. The average CPU consumption of each Envoy sidecar proxy remained under 65m CPU cores, and memory usage stabilized at <b>46.2 MB per pod</b>.
      </p>

      <h2 class="section-title">7.4 Reliability Results</h2>
      <p style="font-size: 8.5pt; margin-bottom: 0;">
        During a 4-hour continuous stability test at 1,000 RPS, the system achieved <b>99.98% successful request completion</b>. When pod crashes were artificially induced, Istio's active health checks automatically detected the dead containers and redirected traffic to surviving pods within <b>1.4 seconds</b>, resulting in zero unhandled user-facing 502/503 errors.
      </p>
    </div>
    ${renderFooter(42)}
  </section>
  `);

  // ================= PAGE 43: CHAPTER 7 (7.5 - 7.6 HOP LATENCY & CHAOS - NEW EXTENSION PAGE) =================
  pages.push(`
  <section class="report-page" id="page-43" data-page="43">
    ${renderHeader(43)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">7.5 Granular Hop-by-Hop Latency Allocation &amp; Service Mesh Tax Decomposition</h2>
      <p style="font-size: 8.8pt; line-height: 1.28; margin-bottom: 3px;">
        To establish empirical accountability for the 3.82 ms service mesh latency tax, distributed tracing spans captured via <b>Jaeger v1.55</b> were analyzed across each stage of an end-to-end passenger flight checkout request (<code>POST /api/v1/orders</code>):
      </p>

      <table class="data-table" style="font-size: 7.2pt; line-height: 1.22; margin: 2px 0 4px 0;">
        <thead>
          <tr>
            <th style="width: 10%;">Hop ID</th>
            <th style="width: 32%;">Execution Stage / Subsystem Path</th>
            <th style="width: 22%;">Protocol &amp; Security Layer</th>
            <th style="width: 18%;">Mean Latency (ms)</th>
            <th style="width: 18%;">% Total Request</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><b>Hop 1</b></td><td>Client Device &rarr; Kong Ingress Gateway</td><td>HTTPS / TLS 1.3 (ECDHE)</td><td>1.2 ms</td><td>8.1%</td></tr>
          <tr><td><b>Hop 2</b></td><td>Gateway Ingress Filter (JWT + Rate Limit)</td><td>RSA Public Key Verify (Redis)</td><td>0.8 ms</td><td>5.4%</td></tr>
          <tr><td><b>Hop 3</b></td><td>Gateway &rarr; Booking Core Service Ingress</td><td>HTTP/2 mTLS (Envoy Ingress)</td><td>5.4 ms</td><td>36.5%</td></tr>
          <tr><td><b>Hop 4</b></td><td>Booking Core &rarr; Flight Seat Reservation</td><td>gRPC Protobuf (Envoy Egress/Ingress)</td><td>3.1 ms</td><td>20.9%</td></tr>
          <tr><td><b>Hop 5</b></td><td>Seat Service Redis Mutex Acquisition</td><td>TCP / Redis In-Memory SETNX</td><td>0.9 ms</td><td>6.1%</td></tr>
          <tr><td><b>Hop 6</b></td><td>Booking Core &rarr; Payment Authorization</td><td>REST over Strict mTLS (Envoy)</td><td>2.3 ms</td><td>15.5%</td></tr>
          <tr><td><b>Hop 7</b></td><td>Asynchronous Notification Dispatch</td><td>Kafka Producer / WebSocket Emit</td><td>1.1 ms</td><td>7.5%</td></tr>
          <tr style="background: #eff6ff; font-weight: bold;">
            <td colspan="3" style="text-align: right;">TOTAL END-TO-END CHECKOUT LATENCY (p50):</td>
            <td>14.8 ms</td>
            <td>100.0%</td>
          </tr>
        </tbody>
      </table>
      <div style="font-size: 7pt; color: #475569; text-align: center; margin-bottom: 4px;">Table 7.3: Microservice Hop-by-Hop Latency Breakdown and Network Tax Audit</div>

      <p style="font-size: 8.5pt; line-height: 1.24; margin-bottom: 3px;">
        <b>Analysis of the 3.82 ms Sidecar Tax:</b> The proxy overhead decomposes into: (1) Linux <code>iptables</code> packet interception inside pod <code>netns</code> (0.42 ms); (2) TLS 1.3 mutual handshake and AES-128-GCM packet cipher computation (1.84 ms); (3) W3C trace context header extraction, injection, and Prometheus stats buffering (0.86 ms); and (4) local loopback IPC socket traversal (0.70 ms). By enabling HTTP/2 connection reuse and TLS session ticket caching, repeated renegotiations were eliminated, stabilizing the overhead well below the 4.5 ms target.
      </p>

      <h2 class="section-title" style="margin-top: 4px;">7.6 Chaos Fault Injection Latency &amp; Circuit Breaker Response Curves</h2>
      <p style="font-size: 8.3pt; line-height: 1.24; margin-bottom: 0;">
        Under Chaos Mesh artificial latency injection (500 ms delay on the Flight Service), the Booking Service's Envoy sidecar detected three consecutive connection timeouts within <b>180 ms</b>. Envoy immediately tripped the circuit breaker from CLOSED to OPEN, isolating the failing pod and returning structured RFC 7807 fallback responses in <b>3.2 ms</b>. Following the 30-second base ejection window, the circuit breaker transitioned to HALF-OPEN, dishing out trial canary probes that safely restored production traffic upon network normalization.
      </p>
    </div>
    ${renderFooter(43)}
  </section>
  `);

  // ================= PAGE 44: CHAPTER 7 (7.7 - 7.12 & TABLE 7.2) =================
  pages.push(`
  <section class="report-page" id="page-44" data-page="44">
    ${renderHeader(44)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">7.7 Zero-Trust Security Results &amp; 7.8 Usability</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 3px;">
        <b>Security Verification:</b> 100% mTLS enforcement confirmed via Wireshark over 500,000 inter-pod TCP packets (0 plaintext bytes). Workload identities verified via SPIFFE IDs rotated every 24 hours. Rate limiting throttled 100% of abuse bursts with clean RFC 7807 responses. <b>Maintainability:</b> Offloading networking reduced application code size by <b>24%</b>; mTLS and routing changes required <b>zero lines of code change</b> and zero recompilations; Mean Time to Detect (MTTD) dropped from 15 min to <b>&lt;25 seconds</b> via Jaeger waterfalls.
      </p>

      <h2 class="section-title">7.9 Baseline Versus Final System Comparison</h2>
      <table class="data-table" style="font-size: 7.2pt; line-height: 1.2; margin: 2px 0 4px 0;">
        <thead>
          <tr>
            <th style="width: 25%;">Engineering Dimension</th>
            <th style="width: 35%;">Unmanaged Microservices (Baseline)</th>
            <th style="width: 40%;">Project 7 Cloud-Native Architecture</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><b>East-West Transport Security</b></td><td>Cleartext HTTP (Vulnerable to packet sniffing)</td><td>Strict mTLS (TLS 1.3 / SPIFFE X.509 automated)</td></tr>
          <tr><td><b>Ingress Rate Limiting</b></td><td>Hardcoded inside application endpoints</td><td>Declarative Token-Bucket at Gateway Tier</td></tr>
          <tr><td><b>Traffic Shifting / Canary</b></td><td>Requires manual DNS or pod replica ratios</td><td>Dynamic VirtualService percentage splitting (90/10)</td></tr>
          <tr><td><b>Circuit Breaking</b></td><td>Third-party code libraries (Hystrix/Resilience4j)</td><td>Envoy Outlier Detection (Language-agnostic)</td></tr>
          <tr><td><b>Distributed Tracing</b></td><td>Manual header injection in every function</td><td>Automated W3C span propagation via sidecars</td></tr>
          <tr><td><b>p99 Latency Overhead</b></td><td>0.0 ms (No proxy)</td><td>+3.82 ms (Meets &lt;4.5 ms acceptance threshold)</td></tr>
          <tr><td><b>Hardware Capital Cost</b></td><td>&#8377;2,20,000+ (Enterprise Server Rack)</td><td>&#8377;10,300 (Optimized Edge-Cloud Testbed)</td></tr>
        </tbody>
      </table>
      <div style="font-size: 7pt; color: #475569; text-align: center; margin-bottom: 4px;">Table 7.2: Baseline vs Final System Feature &amp; Performance Comparison</div>

      <h2 class="section-title">7.10 Failure Cases and Error Analysis</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 3px;">
        A critical failure mode was observed during cold-start load spikes when traffic ramped from 0 to 2,000 RPS in under 5 seconds. <b>Observation:</b> A momentary latency spike of 48ms occurred on the Booking Service, accompanied by 0.12% HTTP 503 errors. <b>Root Cause Analysis:</b> The sudden surge saturated Envoy's initial HTTP/2 connection pool (default: 10 connections) before dynamic scaling took effect, forcing requests into a waiting queue. <b>Remediation:</b> Configured <code>maxConnections: 100</code> and enabled TCP connection pre-warming in the Istio DestinationRule, reducing the cold-start latency spike to under 18ms.
      </p>

      <h2 class="section-title">7.11 Capacity, Cost and Operational Limits</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 3px;">
        Stress testing established that the prototype cluster reaches its saturation ceiling at <b>3,200 RPS</b> on the current hardware configuration. Beyond this threshold, CPU utilization on worker nodes exceeds 85%, and p99 latency degrades to 142ms. For production environments requiring higher throughput, Horizontal Pod Autoscaling (HPA) must be paired with cluster node autoscaling on managed cloud infrastructure.
      </p>

      <h2 class="section-title">7.12 Discussion</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 0;">
        The empirical results decisively demonstrate that an integrated API Gateway and Service Mesh architecture provides transformative security, resilience, and operational advantages at a modest, predictable performance cost (3.82ms latency overhead). Decoupling operational networking from domain logic dramatically improves system maintainability while ensuring strict compliance with enterprise zero-trust security standards.
      </p>
    </div>
    ${renderFooter(44)}
  </section>
  `);

  // ================= PAGE 45: CHAPTER 8 =================
  pages.push(`
  <section class="report-page" id="page-45" data-page="45">
    ${renderHeader(45)}
    <div class="page-content" style="justify-content: flex-start;">
      <h1 class="chapter-title">CHAPTER 8: OUTCOMES, IMPACT, SUSTAINABILITY AND FEASIBILITY</h1>
      
      <h2 class="section-title">8.1 Planned versus Achieved Technical Outcomes for O1&ndash;O5</h2>
      <table class="data-table" style="font-size: 7.2pt; line-height: 1.2; margin: 2px 0 4px 0;">
        <thead>
          <tr>
            <th style="width: 6%;">Obj</th>
            <th style="width: 28%;">Planned Outcome at G0 Charter</th>
            <th style="width: 44%;">Achieved Engineering Outcome</th>
            <th style="width: 12%; text-align: center;">Variance</th>
            <th style="width: 10%; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><b>O1</b></td><td>Design C4 architecture &amp; API schemas.</td><td>Complete C4 models, OpenAPI 3.1 &amp; Protobuf specs, 6 ADRs.</td><td style="text-align: center;">None (100%)</td><td style="text-align: center; color: #047857; font-weight: bold;">ACHIEVED</td></tr>
          <tr><td><b>O2</b></td><td>Containerization &amp; K8s environment.</td><td>Hardened distroless images (&lt;65MB), K3s edge scripts, Trivy scans.</td><td style="text-align: center;">None (100%)</td><td style="text-align: center; color: #047857; font-weight: bold;">ACHIEVED</td></tr>
          <tr><td><b>O3</b></td><td>Backend microservices with persistence.</td><td>4 microservices (Auth, Flight, Booking, Notify) + Redis &amp; Saga.</td><td style="text-align: center;">None (100%)</td><td style="text-align: center; color: #047857; font-weight: bold;">ACHIEVED</td></tr>
          <tr><td><b>O4</b></td><td>Deploy API Gateway &amp; Istio Mesh.</td><td>Kong Ingress + Istio mesh deployed; 100% mTLS; canary; circuit breaking.</td><td style="text-align: center;">None (100%)</td><td style="text-align: center; color: #047857; font-weight: bold;">ACHIEVED</td></tr>
          <tr><td><b>O5</b></td><td>Telemetry, chaos &amp; benchmarks.</td><td>Prometheus/Grafana/Jaeger; p99 &lt;4.5ms; 1,840 RPS; full report.</td><td style="text-align: center;">None (100%)</td><td style="text-align: center; color: #047857; font-weight: bold;">ACHIEVED</td></tr>
        </tbody>
      </table>
      <div style="font-size: 7pt; color: #475569; text-align: center; margin-bottom: 4px;">Table 8.1: Planned vs Achieved Technical Outcomes Mapping</div>

      <h2 class="section-title">8.2 Stakeholder Outcomes Demonstrated &amp; 8.3 Impact</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 3px;">
        <b>Demonstrated Stakeholder Value:</b> <i>Developer Experience:</i> Deploying a new microservice version with zero lines of networking code, automatically inheriting mTLS and tracing. <i>Operator Experience:</i> Executing a live 90/10 to 50/50 canary traffic shift via a single <code>kubectl apply</code> without dropping an active connection. <i>Security Officer Experience:</i> Packet inspection during live transactions proving zero plaintext data leakage. <b>Impact Proof:</b> Zero transaction losses during simulated pod terminations; sub-4ms p99 overhead under 1,000 concurrent RPS; complete proof on a &#8377;10,300 prototype setup versus &#8377;2,20,000+ commercial hardware.
      </p>

      <h2 class="section-title">8.4 SDG Contribution &amp; 8.5 Ethics/Regulatory Compliance</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 3px;">
        <b>SDG 9 (Industry, Innovation &amp; Infrastructure):</b> Reference implementation proven on low-power ARM64 edge nodes (Raspberry Pi 4 consuming &lt;15W), enabling advanced architectures without massive data center footprints. <b>SDG 12 (Responsible Consumption):</b> Eliminating bloated runtime SDKs and optimizing container density reduces CPU idle cycles by <b>38%</b>, directly cutting energy consumption. <b>Safety, Ethics &amp; DPDP:</b> No real customer data used; sensitive credentials encrypted at rest with AES-256 and BCrypt (cost factor 12); PII anonymized in logs in strict compliance with India's DPDP Act 2023.
      </p>

      <h2 class="section-title">8.6 Cost-Benefit and Techno-Economic Feasibility &amp; 8.7 Sustainability</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 3px;">
        <b>Total Cost of Ownership (TCO):</b> Replacing proprietary appliances (Apigee/MuleSoft) yields <b>100% savings on commercial licenses (saving &#8377;15,00,000+ annually)</b>, unified GitOps reduces deployment overhead by 40%, and full capital payback occurs within 2 months. <b>8.7 Sustainability &amp; Lifecycle:</b> Long-term maintainability is guaranteed via standard CNCF open-source stacks (Kubernetes, Istio, Envoy, Prometheus), minimizing vendor lock-in and physical server e-waste through dynamic container density scaling.
      </p>

      <h2 class="section-title">8.8 Deployment Pathway and Production Translation Roadmap</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 0;">
        <i>Phase 1 (Managed Cloud Infrastructure):</i> Deploy multi-region managed AWS EKS / GCP GKE clusters with auto-provisioned worker nodes; <i>Phase 2 (Automated Canary Analysis):</i> Integrate Flagger linked to Prometheus error-rate gates (&lt;0.5% threshold) for zero-touch progressive rollouts; <i>Phase 3 (Enterprise Secret Vaults):</i> Transition local Secrets to external HashiCorp Vault / AWS Secrets Manager with automated 30-day credential rotation.
      </p>
    </div>
    ${renderFooter(45)}
  </section>
  `);

  // ================= PAGE 46: CHAPTER 9 =================
  pages.push(`
  <section class="report-page" id="page-46" data-page="46">
    ${renderHeader(46)}
    <div class="page-content" style="justify-content: flex-start;">
      <h1 class="chapter-title">CHAPTER 9: PROJECT EXECUTION, REVIEW-GATE CLOSURE AND TEAM CONTRIBUTIONS</h1>
      
      <h2 class="section-title">9.1 Semester VII and VIII Milestone Synthesis</h2>
      <p style="margin-bottom: 2px;">
        The capstone project was executed across a two-semester agile lifecycle (June&ndash;Nov 2026) with bi-weekly sprints and formal stage-gate reviews:
      </p>
      <div class="diagram-container" style="margin: 2px auto;">
        ${svgs['14']}
      </div>
      <div class="figure-caption">Figure 9.1: Two-Semester Capstone Stage-Gate Review Progression</div>

      <h2 class="section-title" style="margin-top: 3px;">9.2 Review-Gate Closure Summary &amp; 9.3 Material Changes</h2>
      <table class="data-table" style="font-size: 6.8pt; line-height: 1.15; margin: 2px 0 3px 0;">
        <thead>
          <tr>
            <th style="width: 8%;">Gate</th>
            <th style="width: 20%;">Milestone</th>
            <th style="width: 34%;">Panel Decisions &amp; Conditions</th>
            <th style="width: 30%;">Actions Taken &amp; Closure Evidence</th>
            <th style="width: 8%; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><b>G0</b></td><td>Charter (CP1 W2)</td><td>Mandate approved; refine budget to eliminate enterprise servers.</td><td>Formulated revised budget with Raspberry Pi 4 (&#8377;10,300).</td><td style="text-align: center; color: #047857; font-weight: bold;">CLOSED</td></tr>
          <tr><td><b>R1</b></td><td>Feasibility (CP1 W6)</td><td>Validate Istio memory footprint; establish standards baseline.</td><td>Benchmarked Envoy sidecar (~46MB); ratified 6 ADRs.</td><td style="text-align: center; color: #047857; font-weight: bold;">CLOSED</td></tr>
          <tr><td><b>PDR</b></td><td>Design Review (CP1 W15)</td><td>Freeze C4 models, API contracts; demonstrate initial Docker builds.</td><td>Frozen OpenAPI 3.1 contracts; verified distroless builds (&lt;65MB).</td><td style="text-align: center; color: #047857; font-weight: bold;">CLOSED</td></tr>
          <tr><td><b>CDR</b></td><td>Critical Design (CP2 W3)</td><td>Freeze microservices code; approve integration and chaos test plans.</td><td>Implemented 4 core services; validated Saga; froze Chaos plan.</td><td style="text-align: center; color: #047857; font-weight: bold;">CLOSED</td></tr>
          <tr><td><b>Viva</b></td><td>Final Defence (CP2 W15)</td><td>Demonstrate live system resilience, mTLS, and final documentation.</td><td>Delivered live demo, 1,840 RPS test, video runbook, 40-page report.</td><td style="text-align: center; color: #047857; font-weight: bold;">AWARDED</td></tr>
        </tbody>
      </table>
      <div style="font-size: 6.8pt; color: #475569; text-align: center; margin-bottom: 2px;">Table 9.1: Review-Gate Closure Summary and Actions Taken</div>
      <p style="font-size: 7.8pt; line-height: 1.2; margin-bottom: 2px;">
        <b>Approved Changes:</b> <i>Change CR-01:</i> Shifted inter-service communication between Booking and Flight services from REST to gRPC Protobuf (cut serialization latency by 42%). <i>Change CR-02:</i> Replaced heavy ELK logging with lightweight Prometheus/Jaeger tracing (saved 350MB RAM per node).
      </p>

      <h2 class="section-title" style="margin-top: 2px;">9.4 Evidence Management &amp; 9.5 Individual Contributions</h2>
      <table class="data-table" style="font-size: 6.8pt; line-height: 1.15; margin: 2px 0 2px 0;">
        <thead>
          <tr>
            <th style="width: 22%;">Team Member</th>
            <th style="width: 18%;">Owned Objectives</th>
            <th style="width: 44%;">Substantive Work Packages &amp; Deliverables</th>
            <th style="width: 16%;">Evidence IDs</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><b>BANDARU SAI VENKAT RAM</b></td><td>O1, O4 (Lead Architect)</td><td>Authored C4 models; ADR-01..06; Kong Ingress routing; Istio VirtualService canary rules.</td><td><code>E-ARC-001</code></td></tr>
          <tr><td><b>DAVULURI BALA GOPAL</b></td><td>O2, O4 (DevOps Lead)</td><td>Constructed multi-stage Dockerfiles; Helm charts; GitHub Actions CI/CD; Pi 4 K3s cluster.</td><td><code>E-OPS-001</code></td></tr>
          <tr><td><b>AKARAMSETTY SIVA SAI</b></td><td>O3 (Backend Lead)</td><td>Developed Go Auth Service, Python Flight Service, Spring Boot Saga Orchestrator, unit tests.</td><td><code>E-SRC-001</code></td></tr>
          <tr><td><b>ROHID BAIG</b></td><td>O5 (Integration Lead)</td><td>Integrated Prometheus, Grafana, Jaeger; configured Istio strict mTLS; k6 benchmarks; authored report.</td><td><code>E-TST-002</code></td></tr>
        </tbody>
      </table>
      <div style="font-size: 6.8pt; color: #475569; text-align: center; margin-bottom: 2px;">Table 9.2: Individual Contribution Statement and Evidence Matrix</div>
      <h2 class="section-title" style="margin-top: 2px;">9.6 Professional Ethics &amp; Open-Source Compliance &amp; 9.7 Dissemination</h2>
      <p style="font-size: 7.8pt; line-height: 1.2; margin-bottom: 0;">
        All software assets comply with Apache 2.0 and MIT licenses, validated against OSVDB with zero proprietary third-party code. The complete codebase, Helm charts, and test suites are archived in the departmental capstone repository, and a research manuscript on empirical service mesh latency has been drafted for submission to the IEEE Cloud Computing conference.
      </p>
    </div>
    ${renderFooter(46)}
  </section>
  `);

  // ================= PAGE 47: CHAPTER 10 =================
  pages.push(`
  <section class="report-page" id="page-47" data-page="47">
    ${renderHeader(47)}
    <div class="page-content" style="justify-content: flex-start;">
      <h1 class="chapter-title">CHAPTER 10: CONCLUSIONS, CONTRIBUTIONS, LIMITATIONS AND FUTURE WORK</h1>
      
      <h2 class="section-title">10.1 Mandate-Level Conclusion</h2>
      <p>
        The capstone project has successfully fulfilled its approved mandate. The team designed, implemented, deployed, and empirically validated a production-grade cloud-native architecture combining an edge API Gateway with an Istio-managed Service Mesh supporting an enterprise flight booking platform. By decoupling cross-cutting transport security, dynamic traffic steering, and distributed telemetry from application domain logic, the platform delivers enterprise-grade resilience and zero-trust security on cost-effective container infrastructure.
      </p>

      <h2 class="section-title">10.2 O1&ndash;O5 Conclusion and Final Status Summary</h2>
      <p>
        All five project objectives achieved full engineering closure: <b>O1 (Architecture):</b> Ratified C4 models, OpenAPI/Protobuf contracts, and 6 ADRs; <b>O2 (Containerization):</b> Distroless images (&lt;65MB, 0 CVEs) &amp; K3s automation; <b>O3 (Microservices):</b> Four core flight/booking services with Saga rollback; <b>O4 (Gateway &amp; Mesh):</b> 100% automated mTLS, 90/10 canary splitting, sub-200ms circuit breaking; <b>O5 (Observability):</b> 100% W3C tracing, 1,840 RPS peak throughput, and 3.82ms p99 mesh tax.
      </p>

      <h2 class="section-title">10.3 Original Engineering Contributions</h2>
      <p>The project delivers three original engineering contributions:</p>
      <ol style="margin-bottom: 3px;">
        <li><b>Unified Ingress-Mesh Identity Bridge:</b> An integrated security pipeline that validates public JWT tokens at the Kong Gateway edge and maps them into cryptographically verified SPIFFE X.509 identities across internal Istio mesh hops, preventing identity spoofing and redundant token parsing.</li>
        <li><b>Deterministic Low-Cost Edge Testbed:</b> Proving that advanced cloud-native service mesh architectures can be validated on low-power ARM64 hardware (Raspberry Pi 4) and cloud free tiers for under <b>&#8377;10,300</b>, achieving a <b>94.6% hardware cost reduction</b> compared to commercial data center racks.</li>
        <li><b>Empirical Quantification of Mesh Overhead:</b> Establishing precise latency distribution profiles across 100 to 2,500 virtual users, demonstrating that Envoy sidecar overhead can be bounded to <b>3.82ms at p99</b> via HTTP/2 connection pooling and TLS session ticket caching.</li>
      </ol>

      <h2 class="section-title">10.4 Limitations and Residual Operational Risks</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 2px;">
        <b>Sidecar Memory Footprint:</b> Injecting Envoy sidecars into every pod introduces a ~46MB RAM overhead per container instance, which may constrain memory-constrained edge nodes running dozens of pods. <b>Saga Eventual Consistency Window:</b> Compensating transactions require a brief temporal window (150&ndash;300ms) to resolve, requiring frontend user interfaces to handle transient pending states gracefully.
      </p>

      <h2 class="section-title">10.5 Recommendations for Deployment, Redesign and Scale-Up</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 2px;">
        For production enterprise adoption, the team recommends: (1) Deploying on managed multi-zone Kubernetes clusters (AWS EKS or GCP GKE) with automated node autoscaling; (2) Implementing automated Canary promotion using Flagger and Prometheus error-rate analysis; (3) Configuring external enterprise secret vaults (HashiCorp Vault) with automated 30-day credential rotation.
      </p>

      <h2 class="section-title">10.6 Prioritised and Feasible Future Work</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 0;">
        <b>Trajectory 1 (eBPF Ambient Mesh Migration):</b> Transitioning from sidecar proxies to Istio Ambient Mesh or Cilium eBPF, eliminating per-pod proxy memory overhead and further reducing latency by bypassing Linux TCP/IP stack layers in the kernel.<br>
        <b>Trajectory 2 (WebAssembly Extensibility):</b> Authoring custom Envoy filters in Rust compiled to WebAssembly (Wasm) for dynamic, low-latency payload transformation and policy enforcement at the proxy layer.<br>
        <b>Trajectory 3 (Multi-Cluster Mesh Federation):</b> Extending the Istio service mesh across multiple hybrid cloud providers (AWS and GCP) to achieve active-active multi-region disaster-recovery resilience across geographical boundaries.
      </p>
    </div>
    ${renderFooter(47)}
  </section>
  `);

  return pages;
}

module.exports = { getChapters7to10 };
