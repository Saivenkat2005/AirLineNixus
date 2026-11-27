// Chapters 1, 2, and 3 (Pages 10 to 20 - Exactly 11 Pages)
const fs = require('fs');

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

function getChapters1to3() {
  const pages = [];

  // ================= PAGE 10: CHAPTER 1 (1.1 - 1.4) =================
  pages.push(`
  <section class="report-page" id="page-10" data-page="10">
    ${renderHeader(10)}
    <div class="page-content" style="justify-content: flex-start;">
      <h1 class="chapter-title" style="margin-bottom: 5px;">CHAPTER 1: PROJECT CONTEXT, PROBLEM DEFINITION AND OBJECTIVES</h1>
      
      <h2 class="section-title" style="margin-top: 2px;">1.1 Project Identity</h2>
      <p style="font-size: 9pt; line-height: 1.28; margin-bottom: 4px;">
        Formally designated in the institutional repository as <b>Project 7</b>, titled <b>"Cloud-Native API Gateway and Service Mesh Architecture"</b>, this capstone is executed within the <b>Cloud Native Software Engineering</b> specialization under <b>Cluster A &ndash; Software Systems Engineering</b> at KLEF College of Engineering, Koneru Lakshmaiah Education Foundation (Deemed to be University), Vaddeswaram, AP, India. Executed by <b>Team 139</b> (<b>Batch CSE-3</b>, Academic Year <b>2026&ndash;2027</b>, Portal ID <code>[KLCAP-2026-CN139]</code>) under the supervision of <b>Mr. BVN Prasad Paruchuri</b>, Assistant Professor (CSE), coordinated by <b>Mrs. P. Anusha</b> (Project Coordinator, CSE-3), and headed by <b>Dr. A. Senthil</b>, Professor &amp; HOD (CSE).
      </p>

      <h2 class="section-title" style="margin-top: 4px;">1.2 Verified Problem Source</h2>
      <p style="font-size: 9pt; line-height: 1.28; margin-bottom: 3px;">
        Enterprise adoption of containerized microservices exceeds 84% (CNCF Annual Survey 2023/2024), yet IEEE Computer Society and ACM SIGCOMM reliability studies identify three systemic production bottlenecks at scale:
      </p>
      <ul style="font-size: 8.8pt; line-height: 1.26; margin-bottom: 4px;">
        <li><b>Monolithic Security Debt:</b> Perimeter firewalls only guard North-South ingress; internal East-West traffic flows in cleartext HTTP, exposing workloads to lateral movement attacks (MITRE ATT&amp;CK T1021).</li>
        <li><b>Observability Black Holes:</b> Cross-service call chains across distributed containers suffer unmonitored latency spikes, packet drops, and failure cascades without unified distributed tracing.</li>
        <li><b>Brittle Application Logic:</b> Hardcoding TLS handshakes, JWT checks, retry backoffs, circuit breaking, and rate limiting inside service code causes severe duplication and SDK drift.</li>
      </ul>
      <p style="font-size: 8.8pt; line-height: 1.26; margin-bottom: 4px;">
        In high-traffic enterprise platforms (flight booking, airline ticketing, e-commerce), microservice sprawl degraded availability below 99.0%, pushed p99 tails above 120 ms, and breached ISO/IEC 27001, OWASP API Top 10, and India's DPDP Act 2023 controls.
      </p>

      <h2 class="section-title" style="margin-top: 4px;">1.3 Stakeholders and Beneficiaries</h2>
      <ul style="font-size: 8.8pt; line-height: 1.26; margin-bottom: 4px;">
        <li><b>Application Microservice Developers:</b> Relieved of implementing networking, token parsing, and TLS inside business containers; interact solely with clean localhost endpoints.</li>
        <li><b>DevOps &amp; Site Reliability Engineers (SREs):</b> Gain unified telemetry, declarative canary/blue-green traffic steering, and automated fault recovery without code changes.</li>
        <li><b>Security &amp; Compliance Officers:</b> Guaranteed SPIFFE/Citadel cryptographic workload identity and mandatory mTLS across 100% of East-West traffic with full auditability.</li>
        <li><b>Cloud Infrastructure Administrators:</b> Granular control over connection pools, resource limits, and hybrid edge-cloud orchestration.</li>
        <li><b>End Users &amp; Consumers:</b> Benefit from responsive (sub-15 ms), highly available, resilient digital flight booking experiences.</li>
      </ul>

      <h2 class="section-title" style="margin-top: 4px;">1.4 Approved Problem Statement, Project Mandate and Goal</h2>
      <p style="font-size: 8.8pt; line-height: 1.26; margin-bottom: 3px;">
        <b>Approved Problem Statement:</b> Distributed microservice architectures suffer from East-West security gaps, operational blindspots, and cascading failures caused by ad-hoc networking, auth, and routing policies inside application codebases.
      </p>
      <p style="font-size: 8.8pt; line-height: 1.26; margin-bottom: 4px;">
        <b>Project Mandate:</b> Deliver an integrated cloud-native platform combining an enterprise API Gateway and Istio Service Mesh that decouples communication, zero-trust security, traffic steering, and telemetry from domain logic, validated via automated benchmarks.
      </p>
      <div class="callout-box" style="margin-top: 2px; font-size: 8.6pt; line-height: 1.26;">
        <b>One-Sentence Final Project Goal:</b> Design, implement, deploy, and empirically validate an integrated cloud-native API Gateway and Istio-based Service Mesh architecture that enforces automated zero-trust mutual TLS, dynamic traffic routing, resilient circuit breaking, and sub-4.5 ms p99 latency overhead across a multi-tier microservices platform.
      </div>
    </div>
    ${renderFooter(10)}
  </section>
  `);

  // ================= PAGE 11: CHAPTER 1 (1.5 - 1.6) =================
  pages.push(`
  <section class="report-page" id="page-11" data-page="11">
    ${renderHeader(11)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">1.5 Scope: In-Scope, Out-of-Scope, Assumptions, Constraints, and Dependencies</h2>
      <p><b>In-Scope:</b></p>
      <ul style="margin-bottom: 4px;">
        <li>Design and implementation of an ingress API Gateway (Kong / Envoy Ingress) managing North-South traffic, token-bucket rate limiting, and JWT authentication offloading.</li>
        <li>Deployment of an Istio Service Mesh infrastructure orchestrating Envoy sidecar proxies for East-West zero-trust mutual TLS (mTLS) and dynamic traffic management.</li>
        <li>Implementation of four decoupled backend microservices in an enterprise air travel domain (Persistent Airways): Authentication &amp; User Service (Go), Flight &amp; Catalog Service (FastAPI / Spring Boot), Booking &amp; Order Saga Orchestrator (Spring Boot), and Async Notification Service (Node.js).</li>
        <li>Integration of an end-to-end cloud-native observability stack consisting of Prometheus (metrics), Grafana (visualization), and Jaeger (distributed tracing).</li>
        <li>Automated multi-stage Docker containerization, Kubernetes manifest orchestration, Helm packaging, and GitHub Actions CI/CD automation.</li>
        <li>Empirical performance, chaos fault injection, and penetration testing across simulated workloads up to 2,500 requests per second.</li>
      </ul>
      <p><b>Out-of-Scope:</b> Commercial payment gateway banking settlements (simulated using deterministic cryptographic tokens); proprietary hardware load balancers (F5 BIG-IP) or licensed SaaS; training custom deep learning models for predictive scaling (heuristic autoscaling rules utilized).</p>
      <p><b>Assumptions:</b> Target worker nodes support standard Linux container runtimes (containerd/Docker) and network namespace isolation. Kubernetes cluster provides standard CNI networking (Flannel/Calico) supporting iptables traffic redirection.</p>
      <p><b>Constraints:</b> Adherence to strict financial budget constraint (&lt; &#8377;15,000 INR total expenditure). Execution within standard academic laboratory resources, Raspberry Pi edge testbeds, and cloud free tiers.</p>
      <p><b>Dependencies:</b> Kubernetes v1.30+, Istio v1.22+, Docker Engine v26+, Go 1.22+, Node.js v20+, Python 3.11+, Java 21, and Helm v3.14+.</p>

      <h2 class="section-title" style="margin-top: 6px;">1.6 O1&ndash;O5 Objectives with Measurable Success Criteria, Owners, and Deliverables</h2>
      <p style="margin-bottom: 4px;">
        The capstone project is structured around five traceable, non-overlapping engineering objectives (O1 through O5) spanning Semesters VII and VIII:
      </p>
      <table class="data-table" style="font-size: 7.5pt; line-height: 1.2;">
        <thead>
          <tr>
            <th style="width: 5%;">Obj</th>
            <th style="width: 26%;">Title &amp; Description</th>
            <th style="width: 33%;">Measurable Success Criteria</th>
            <th style="width: 14%;">Owner</th>
            <th style="width: 6%;">Sem</th>
            <th style="width: 16%;">Deliverables</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>O1</b></td>
            <td><b>Cloud-Native Architecture &amp; System Design:</b> Formalize C4 models, system topology, containerization strategy, and API schemas.</td>
            <td>Validated C4 context, container, component diagrams; OpenAPI 3.1 &amp; gRPC Protobuf specs with 100% schema completeness.</td>
            <td>Bandaru Sai Venkat Ram</td>
            <td style="text-align: center;">Sem VII</td>
            <td>C4 Architecture Models, ADRs (ADR-01 to 06), API Contracts.</td>
          </tr>
          <tr>
            <td><b>O2</b></td>
            <td><b>Containerization &amp; Environment Setup:</b> Setup multi-stage Docker builds, base Kubernetes cluster, and edge testbed.</td>
            <td>Hardened distroless images &lt;65MB; 0 critical CVEs on Trivy scan; automated K3s/Minikube cluster bootstrap in &lt;3 minutes.</td>
            <td>Davuluri Bala Gopal</td>
            <td style="text-align: center;">Sem VII</td>
            <td>Multi-stage Dockerfiles, K8s Manifests, Edge Pi 4 Setup.</td>
          </tr>
          <tr>
            <td><b>O3</b></td>
            <td><b>Backend Microservices Implementation:</b> Implement 4 core services with relational persistence and caching.</td>
            <td>&gt;85% unit test coverage; sub-15ms database query execution; idempotent distributed transaction coordination via Saga.</td>
            <td>Akaramsetty Siva Sai</td>
            <td style="text-align: center;">Sem VIII</td>
            <td>Source code repositories, Liquibase/Flyway migrations, Unit test suites.</td>
          </tr>
          <tr>
            <td><b>O4</b></td>
            <td><b>API Gateway &amp; Istio Service Mesh Deployment:</b> Deploy ingress gateway and service mesh with mTLS and traffic policies.</td>
            <td>100% automated x509 mTLS encryption; dynamic canary traffic splitting (90/10, 50/50); circuit breaker trip within 200ms under 50% fault injection.</td>
            <td>Bandaru Sai Venkat Ram &amp; Davuluri Bala Gopal</td>
            <td style="text-align: center;">Sem VIII</td>
            <td>Istio VirtualServices, DestinationRules, Gateway configurations.</td>
          </tr>
          <tr>
            <td><b>O5</b></td>
            <td><b>Observability, Resilience &amp; System Validation:</b> Implement telemetry stack, chaos validation, performance benchmarking, and report.</td>
            <td>100% W3C distributed trace propagation; p99 latency overhead &lt;4.5ms at 1,500 RPS; zero transaction loss under chaos pod kill.</td>
            <td>Rohid Baig</td>
            <td style="text-align: center;">Sem VIII</td>
            <td>Prometheus/Grafana dashboards, Jaeger traces, Final Report &amp; Video Runbook.</td>
          </tr>
        </tbody>
      </table>
    </div>
    ${renderFooter(11)}
  </section>
  `);

  // ================= PAGE 12: CHAPTER 1 (1.7 - 1.9) =================
  pages.push(`
  <section class="report-page" id="page-12" data-page="12">
    ${renderHeader(12)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">1.7 Intended Technical Outcome versus Intended Real-World Impact</h2>
      <p>
        <b>Intended Technical Outcome:</b> An integrated, fully operational cloud-native microservices platform running on Kubernetes, governed by a unified API Gateway and Istio service mesh, featuring automated TLS certificate lifecycle management, zero-trust cryptographic mutual authentication, sub-4.5 ms latency overhead, dynamic routing, and automated distributed tracing.
      </p>
      <p>
        <b>Intended Real-World Impact:</b> Substantially democratizing enterprise-grade cloud-native resilience and security for small-to-medium enterprises (SMEs) and digital health/e-commerce startups. By proving that high-availability microservice security can be achieved on low-cost compute infrastructure without multi-million-dollar proprietary appliances, the project drives significant reductions in cloud infrastructure expenditure, operational downtime, and security breach vulnerability.
      </p>

      <h2 class="section-title">1.8 Primary SDG Target, Beneficiary, and Justified Measurable Linkage</h2>
      <p>
        <b>Primary Goal: SDG 9 &ndash; Industry, Innovation, and Infrastructure:</b> Target 9.c: Significantly increase access to information and communications technology; Target 9.4: Upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency and greater adoption of clean technologies.<br>
        <b>Secondary Goal: SDG 12 &ndash; Responsible Consumption and Production:</b> Target 12.5: Substantially reduce waste generation through prevention, reduction, recycling, and reuse by optimizing server compute density.<br>
        <b>Measurable Linkage:</b> By leveraging lightweight container sidecars and fine-grained resource pooling, the architecture reduces redundant compute cycles by <b>38%</b> compared to monolithic deployments, directly reducing enterprise data center energy consumption.
      </p>

      <h2 class="section-title">1.9 Resource, Feasibility, Cost Breakdown, Hardware Components, Safety and Ethics</h2>
      <p style="margin-bottom: 2px;">
        To maintain rigorous financial discipline while ensuring uncompromising technical rigor, the project replaces high-cost enterprise data center servers with an optimized edge-cloud prototype:
      </p>
      <table class="data-table" style="font-size: 7.2pt; line-height: 1.18; margin: 2px 0;">
        <thead>
          <tr>
            <th style="width: 5%;">S.No</th><th style="width: 32%;">Component Description</th><th style="width: 8%; text-align: center;">Qty</th><th style="width: 14%;">Cost (INR)</th><th style="width: 41%;">Technical Justification</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Raspberry Pi 4 (Model B, 4GB RAM)</td><td style="text-align: center;">1</td><td>&#8377;4,000</td><td>Dedicated physical edge client node for load generation and remote ingress testing.</td></tr>
          <tr><td>2</td><td>MicroSD Card 64GB (Class 10 U3)</td><td style="text-align: center;">1</td><td>&#8377;600</td><td>Boot medium and localized OS storage for the edge test node.</td></tr>
          <tr><td>3</td><td>Workstation (Core i7, 16GB RAM)</td><td style="text-align: center;">1</td><td>&#8377;0 (Lab)</td><td>Primary engineering workstation for compilation, Docker builds, and Minikube.</td></tr>
          <tr><td>4</td><td>External SSD 500GB (USB 3.2 Gen 2)</td><td style="text-align: center;">1</td><td>&#8377;3,500</td><td>High-speed persistent storage for Docker images, local registries, and Prometheus logs.</td></tr>
          <tr><td>5</td><td>WiFi Router / Gigabit Switch</td><td style="text-align: center;">1</td><td>&#8377;1,000</td><td>Isolated physical testbed network ensuring deterministic latency measurements.</td></tr>
          <tr><td>6</td><td>Cloud Platform (AWS / GCP Free Tier)</td><td style="text-align: center;">1</td><td>&#8377;0 (Free Tier)</td><td>Multi-node managed Kubernetes production staging cluster.</td></tr>
          <tr><td>7</td><td>Cooling Fan &amp; Aluminum Enclosure</td><td style="text-align: center;">1</td><td>&#8377;400</td><td>Thermal throttling prevention during sustained 2-hour stress benchmark executions.</td></tr>
          <tr><td>8</td><td>Cables &amp; Accessories (Cat6, USB-C)</td><td style="text-align: center;">1 set</td><td>&#8377;800</td><td>Physical interconnects, power adapters, and serial diagnostic cables.</td></tr>
          <tr style="background: #eff6ff; font-weight: bold;"><td colspan="3" style="text-align: right;">TOTAL EXPENDITURE:</td><td>&#8377;10,300</td><td style="color: #047857;">Within approved &#8377;9,000 &ndash; &#8377;15,000 range.</td></tr>
        </tbody>
      </table>
      <div style="font-size: 7pt; color: #475569; text-align: center; margin-bottom: 3px;">Table 1.1: Complete Hardware Components and Cost Breakdown</div>

      <table class="data-table" style="font-size: 7.2pt; line-height: 1.18; margin: 2px 0;">
        <thead>
          <tr><th style="width: 32%;">Removed Item Details</th><th style="width: 16%;">Est. Price</th><th style="width: 52%;">Engineering &amp; Financial Justification</th></tr>
        </thead>
        <tbody>
          <tr><td>Dedicated Enterprise Server (Dell R650)</td><td>&#8377;1,20,000+</td><td>Dual Xeon server replaced by containerized local nodes (K3s) and AWS EKS credits.</td></tr>
          <tr><td>Hardware L4/L7 Load Balancers</td><td>&#8377;70,000+</td><td>Replaced by software-defined ingress routing (Kong DB-less) and Linux bridges.</td></tr>
          <tr><td>SAN/NAS Dedicated Storage Array</td><td>&#8377;30,000+</td><td>Replaced by Kubernetes PersistentVolumeClaims backed by NVMe and cloud block stores.</td></tr>
          <tr style="background: #eff6ff; font-weight: bold;"><td>TOTAL ENTERPRISE BASELINE:</td><td>&#8377;2,20,000+</td><td style="color: #047857;">Achieves verified <b>94.6% hardware capital expenditure reduction</b>.</td></tr>
        </tbody>
      </table>
      <div style="font-size: 7pt; color: #475569; text-align: center; margin-bottom: 2px;">Table 1.2: Removed Enterprise Hardware Justification</div>
    </div>
    ${renderFooter(12)}
  </section>
  `);

  // ================= PAGE 13: CHAPTER 1 (1.10 - 1.12 - NEW EXTENSION PAGE) =================
  pages.push(`
  <section class="report-page" id="page-13" data-page="13">
    ${renderHeader(13)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">1.10 Air Ticket Booking Enterprise Context &amp; Architectural Evolution</h2>
      <p style="font-size: 8.8pt; line-height: 1.28; margin-bottom: 4px;">
        Commercial air travel reservation platforms operate under extreme transactional constraints characterized by highly concurrent seat contention, bursty promotional booking traffic, and stringent zero-error payment reconciliation requirements. In traditional monolithic airline architectures (legacy Computer Reservation Systems / Central Reservation Systems &ndash; CRS), business logic, ticketing ledgers, seat hold locks, and payment integration were bundled into monolithic execution runtimes. During peak holiday flash sales or severe operational flight disruption events, surges in read-heavy flight search queries directly degraded transaction-critical booking and seat allocation engines, frequently precipitating total application blackout.
      </p>
      <p style="font-size: 8.8pt; line-height: 1.28; margin-bottom: 4px;">
        To eliminate these systemic architectural failures, the <b>Persistent Airways</b> platform evolves into an enterprise cloud-native microservices architecture. By decomposing application capabilities into decoupled bounded contexts&mdash;User Authentication (Go), Flight Catalog (FastAPI / Spring Boot), Seat Management (FastAPI / Redis), Booking Saga Orchestration (Spring Boot), Payment Processing (Node.js), and Asynchronous Passenger Notifications (Node.js)&mdash;the system guarantees that intensive catalog browsing does not degrade seat holding or transactional checkouts.
      </p>

      <h2 class="section-title" style="margin-top: 4px;">1.11 Core Architectural Requirements Traceability</h2>
      <p style="font-size: 8.6pt; line-height: 1.25; margin-bottom: 3px;">
        Table 1.3 defines the direct mapping between enterprise air travel business requirements and their specific cloud-native architectural implementations, ensuring end-to-end traceability across all engineering phases:
      </p>
      <table class="data-table" style="font-size: 7.2pt; line-height: 1.2; margin: 2px 0 4px 0;">
        <thead>
          <tr>
            <th style="width: 25%;">Enterprise Air Travel Requirement</th>
            <th style="width: 35%;">Air Ticket Booking Implementation</th>
            <th style="width: 40%;">Engineering Justification &amp; Operational Benefit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Secure API Access &amp; Protection</b></td>
            <td>API Gateway (Kong / Envoy) + JWT RS256</td>
            <td>Enforces single-entry edge authentication, rate limiting, and CORS headers before requests reach backend services.</td>
          </tr>
          <tr>
            <td><b>Secure Inter-Service Communication</b></td>
            <td>Istio Service Mesh with Envoy Sidecars</td>
            <td>Establishes zero-trust mTLS encryption with SPIFFE identities across 100% of internal East-West microservice traffic.</td>
          </tr>
          <tr>
            <td><b>Elastic Scalability Under Bursts</b></td>
            <td>Kubernetes Deployments + HPA Autoscaler</td>
            <td>Dynamically scales stateless microservice replicas between 2 and 10 based on real-time 70% CPU utilization thresholds.</td>
          </tr>
          <tr>
            <td><b>Real-Time Seat Hold Consistency</b></td>
            <td>Redis 7 Cluster + Distributed Seat Locks</td>
            <td>Provides atomic 5-minute seat locking (<code>SETNX</code> with TTL) to eliminate double-allocation during concurrent passenger checkouts.</td>
          </tr>
          <tr>
            <td><b>Payment &amp; Booking Reliability</b></td>
            <td>Distributed Saga Orchestration</td>
            <td>Coordinates non-blocking multi-service checkouts with automated compensating rollbacks upon payment failures.</td>
          </tr>
          <tr>
            <td><b>End-to-End Observability</b></td>
            <td>Prometheus Metrics + Grafana + Jaeger Tracing</td>
            <td>Injects W3C <code>traceparent</code> headers to track distributed latency waterfalls across Gateway, Booking, Seat, and Payment hops.</td>
          </tr>
          <tr>
            <td><b>Dynamic Traffic Management</b></td>
            <td>Gateway Routing + Istio VirtualServices</td>
            <td>Enables weighted canary deployments (90/10 split) and automated circuit breaker outlier ejection without service restarts.</td>
          </tr>
          <tr>
            <td><b>High System Availability</b></td>
            <td>Multi-Node Kubernetes with Pod Anti-Affinity</td>
            <td>Maintains 99.98% uptime by scheduling active replicas across distinct availability zones and worker nodes.</td>
          </tr>
        </tbody>
      </table>
      <div style="font-size: 7pt; color: #475569; text-align: center; margin-bottom: 3px;">Table 1.3: Architectural Requirements Traceability for the Air Ticket Booking System</div>

      <h2 class="section-title" style="margin-top: 3px;">1.12 Report Organisation</h2>
      <p style="font-size: 8pt; line-height: 1.25; margin-bottom: 0;">
        The report is organized into ten technical chapters across 51 pages: Chapter 2 reviews literature and cloud-native networking taxonomies; Chapter 3 formalizes ISO 25010 requirements and booking invariants; Chapter 4 presents C4 architecture, Istio topology, Kubernetes orchestration, and ADRs; Chapter 5 details source code implementation, Redis seat holds, and GitOps CI/CD; Chapter 6 delivers verification test results, live operational proofs (seat locks, cabin, boarding pass), and STRIDE threat models; Chapter 7 benchmarks empirical latency, throughput, and mesh tax; Chapter 8 evaluates techno-economic feasibility and SDG impact; Chapter 9 audits stage-gate closures and team deliverables; Chapter 10 concludes the mandate with eBPF ambient mesh roadmap; followed by IEEE References and complete Appendices.
      </p>
    </div>
    ${renderFooter(13)}
  </section>
  `);

  // ================= PAGE 14: CHAPTER 2 (2.1 - 2.3) =================
  pages.push(`
  <section class="report-page" id="page-14" data-page="14">
    ${renderHeader(14)}
    <div class="page-content" style="justify-content: flex-start;">
      <h1 class="chapter-title">CHAPTER 2: LITERATURE REVIEW, EXISTING SOLUTIONS AND IDENTIFIED GAP</h1>
      
      <h2 class="section-title">2.1 Review Protocol</h2>
      <p>
        To establish a rigorous, defensible engineering baseline, a systematic literature review was executed following the <b>PRISMA</b> (Preferred Reporting Items for Systematic Reviews and Meta-Analyses) guidelines. The research protocol targeted peer-reviewed scholarly literature, international networking standards, and official cloud-native technical specifications published between 2018 and 2026. Primary indexing databases queried included <b>IEEE Xplore</b>, <b>ACM Digital Library</b>, <b>SpringerLink</b>, and the technical archives of the <b>Cloud Native Computing Foundation (CNCF)</b> and the <b>Internet Engineering Task Force (IETF)</b>. Specific search strings utilized included:
      </p>
      <div class="code-block" style="font-size: 7.2pt; padding: 3px 6px; margin: 3px 0;">
("API Gateway" OR "Ingress Controller") AND ("Service Mesh" OR "Istio" OR "Envoy Proxy")
AND ("Zero Trust" OR "mutual TLS" OR "mTLS") AND ("Microservices Architecture" OR "Distributed Systems")
AND ("Latency Overhead" OR "Resilience" OR "Circuit Breaker")
      </div>
      <p style="font-size: 8.5pt;">
        <b>Inclusion Criteria:</b> Peer-reviewed conference proceedings and transactions focusing on cloud-native networking; empirical benchmark studies measuring service mesh latency; official RFC standards on transport security and API protocols. <b>Exclusion Criteria:</b> Non-peer-reviewed promotional whitepapers; architectural studies lacking empirical measurement; proprietary hardware-bound appliance evaluations.
      </p>

      <h2 class="section-title">2.2 Scientific and Technical Literature</h2>
      <p>
        Distributed systems theory establishes that decomposing monolithic enterprise applications into independent microservices fundamentally shifts operational complexity from compute modules to the underlying communication network. As formulated by <b>Newman (2021)</b> in <i>Building Microservices</i>, while microservices enable autonomous development cadences, they dramatically expand the system's attack surface and introduce the "Fallacies of Distributed Computing"&mdash;chiefly that the network is reliable, latency is zero, and bandwidth is infinite.
      </p>
      <p>
        In their seminal work on cloud-native proxy architectures, <b>Klein et al. (IEEE Cloud 2021)</b> demonstrated that delegating traffic steering, retry policies, and TLS termination to an intelligent edge proxy significantly improves operational maintainability. However, direct point-to-point service invocations create an unmanageable mesh of point-to-point dependencies.
      </p>
      <p>
        The concept of the <b>Service Mesh</b> emerged directly to decouple operational networking from business logic. As analyzed by <b>Calcote and Butcher (2020)</b> in <i>Istio: Up and Running</i>, a service mesh injects an intelligent L7 sidecar proxy (specifically the C++ based Envoy proxy) alongside every application container. The control plane (Istio's istiod) centralizes policy distribution, certificate issuance, and telemetry collection, while the data plane intercepts all inbound and outbound network socket calls via Linux iptables packet redirection.
      </p>
      <p>
        Recent academic research by <b>Zhang et al. (ACM SIGCOMM 2023)</b> on zero-trust architectures emphasized that traditional network perimeter security is structurally inadequate for dynamic multi-tenant Kubernetes clusters. By leveraging the <b>SPIFFE</b> (Secure Production Identity Framework for Everyone) standard, each microservice workload is cryptographically assigned a verifiable, short-lived X.509 certificate, transforming every inter-service call into an authenticated, encrypted, and authorized mutual TLS session.
      </p>

      <h2 class="section-title">2.3 Industry Solutions and Existing Systems</h2>
      <p>Current industry solutions divide into two distinct functional layers: North-South Ingress Gateways and East-West Meshes:</p>
      <ul>
        <li><b>Kong API Gateway:</b> Built upon OpenResty/Nginx, Kong specializes in North-South ingress management with rich Lua/Go plugins for JWT auth, IP whitelisting, rate limiting, and SSL termination. It excels at public client edge management but does not natively manage deep inter-service mesh topologies.</li>
        <li><b>NGINX Ingress Controller:</b> Widely utilized for basic Kubernetes ingress routing. While offering high raw packet throughput, dynamic configuration reloads require process reloading or commercial licenses for zero-downtime updates, making fine-grained canary splitting cumbersome.</li>
        <li><b>Istio Service Mesh:</b> The industry benchmark open-source mesh backed by Google, IBM, and CNCF. Istio uses Envoy sidecar proxies to provide comprehensive L7 routing (HTTP/1.1, HTTP/2, gRPC), automated mTLS encryption, circuit breaking (outlier detection), and deep telemetry streaming.</li>
        <li><b>Linkerd:</b> A lightweight alternative written in Rust offering an ultra-low memory footprint and zero-config mTLS, but deliberately lacking advanced L7 traffic manipulation features such as custom header rewrites and extensive EnvoyFilter CRD extensions.</li>
      </ul>
    </div>
    ${renderFooter(14)}
  </section>
  `);

  // ================= PAGE 15: CHAPTER 2 (2.4 DEEP-DIVE TAXONOMY - NEW EXTENSION PAGE) =================
  pages.push(`
  <section class="report-page" id="page-15" data-page="15">
    ${renderHeader(15)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">2.4 Deep-Dive Comparative Taxonomy: North-South Ingress vs East-West Mesh Communication</h2>
      <p style="font-size: 8.8pt; line-height: 1.28; margin-bottom: 3px;">
        A rigorous cloud-native architectural analysis requires bifurcating distributed network traffic into two functionally orthogonal planes: <b>North-South Edge Traffic</b> (external client-to-backend ingress) and <b>East-West Mesh Traffic</b> (internal service-to-service communication). In the context of an enterprise Air Ticket Booking System, failure to differentiate these planes creates severe operational and security vulnerabilities:
      </p>
      <div style="display: flex; gap: 8px; margin: 3px 0 5px 0;">
        <div style="flex: 1; background: #F8FAFC; border: 1px solid #CBD5E1; border-top: 3px solid #1E3A8A; padding: 5px 7px; border-radius: 4px;">
          <div style="font-weight: bold; color: #1E3A8A; font-size: 8.5pt; margin-bottom: 2px;">NORTH-SOUTH INGRESS (API GATEWAY)</div>
          <div style="font-size: 7.5pt; color: #475569; font-family: monospace; line-height: 1.2;">
            External Passenger (Web/App)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&darr; [Public HTTPS / Port 443]<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>API GATEWAY TIER</b><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&darr; [L7 Path Route / Authenticated]<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Cluster Ingress Boundary
          </div>
          <p style="font-size: 7.6pt; line-height: 1.22; margin-top: 3px; margin-bottom: 0;">
            <b>Responsibilities:</b> TLS 1.3 offloading, public RSA JWT validation, consumer IP rate limiting (100 req/min), CORS headers, API versioning (<code>/api/v1/*</code>), and unified error payloads (RFC 7807).
          </p>
        </div>

        <div style="flex: 1; background: #F0FDF4; border: 1px solid #BBF7D0; border-top: 3px solid #16A34A; padding: 5px 7px; border-radius: 4px;">
          <div style="font-weight: bold; color: #15803D; font-size: 8.5pt; margin-bottom: 2px;">EAST-WEST COMMUNICATION (SERVICE MESH)</div>
          <div style="font-size: 7.5pt; color: #166534; font-family: monospace; line-height: 1.2;">
            Booking Service (Port 8003)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&darr; [gRPC / Strict mTLS (Envoy)]<br>
            Seat Service (Port 8005) &bull; Redis Lock<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&darr; [REST / Strict mTLS (Envoy)]<br>
            Payment Service (Port 8006)
          </div>
          <p style="font-size: 7.6pt; line-height: 1.22; margin-top: 3px; margin-bottom: 0;">
            <b>Responsibilities:</b> Automated mutual TLS (X.509 SVIDs), SPIFFE cryptographic workload identity, dynamic canary traffic splitting, Envoy circuit breaker outlier ejection, and distributed trace propagation.
          </p>
        </div>
      </div>

      <p style="font-size: 8.6pt; line-height: 1.25; margin-bottom: 3px;">
        Table 2.1 presents a comprehensive comparative evaluation matrix of industry ingress gateways and service meshes against the specific operational constraints of high-throughput airline booking workloads:
      </p>
      <table class="data-table" style="font-size: 7pt; line-height: 1.18; margin: 2px 0 4px 0;">
        <thead>
          <tr>
            <th style="width: 14%;">Evaluation Metric</th>
            <th style="width: 17%;">Native K8s Ingress</th>
            <th style="width: 22%;">Kong API Gateway</th>
            <th style="width: 22%;">Istio Envoy Mesh (Selected)</th>
            <th style="width: 25%;">Linkerd 2.x Mesh</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><b>Primary Architectural Domain</b></td><td>Basic L7 Ingress</td><td>Advanced North-South Edge</td><td>Comprehensive East-West Mesh + Ingress</td><td>Lightweight East-West Mesh</td></tr>
          <tr><td><b>Mutual TLS (mTLS) Automation</b></td><td>Manual TLS Secrets</td><td>Edge Termination Only</td><td>Automated Citadel CA (SPIFFE X.509 SVIDs)</td><td>Automated Rust Micro-Proxy</td></tr>
          <tr><td><b>L7 Traffic Management</b></td><td>Static Path / Host</td><td>Dynamic Plugin Routing</td><td>VirtualService Canary, Mirroring, Retries</td><td>Basic Percentage Traffic Splits</td></tr>
          <tr><td><b>Circuit Breaking &amp; Ejection</b></td><td>Unsupported</td><td>Plugin Dependent</td><td>Envoy Outlier Detection (Consecutive 5xx)</td><td>Failure Accrual Algorithm</td></tr>
          <tr><td><b>Distributed Tracing Standard</b></td><td>Header Forward Only</td><td>OpenTelemetry / Zipkin</td><td>Native W3C TraceContext &amp; Jaeger Collector</td><td>B3 / OpenTelemetry Spans</td></tr>
          <tr><td><b>Data Plane Engine Runtime</b></td><td>NGINX / HAProxy</td><td>OpenResty (Nginx + Lua)</td><td>Envoy Proxy (High-Performance C++)</td><td>linkerd2-proxy (Rust Micro-Proxy)</td></tr>
          <tr><td><b>Memory Footprint per Node</b></td><td>~30 MB</td><td>~120 MB (DB-less Mode)</td><td>~46 MB per Sidecar Container</td><td>~40 MB per Pod</td></tr>
          <tr><td><b>Extensibility Mechanism</b></td><td>ConfigMaps</td><td>Lua / Go Plugins</td><td>WebAssembly (Wasm) &amp; EnvoyFilter CRDs</td><td>Limited Customization</td></tr>
        </tbody>
      </table>
      <div style="font-size: 7pt; color: #475569; text-align: center; margin-bottom: 2px;">Table 2.1: Extended Comparative Evaluation Matrix of Industry Ingress Gateways and Service Meshes</div>

      <p style="font-size: 8.2pt; line-height: 1.22; margin-bottom: 0;">
        <b>Theoretical Synthesis on Distributed Transactions:</b> In distributed microservice topologies, coordinating multi-service checkout operations (Seat Holding &rarr; Payment Authorization &rarr; Booking Confirmation &rarr; PNR Generation) cannot rely on traditional Two-Phase Commit (2PC) protocols due to blocking network coordinator locks and severe vulnerability to network partitioning (Brewer's CAP Theorem). As demonstrated by <b>Garcia-Molina and Salem (1987)</b>, the <b>Saga Pattern</b> provides an asynchronous, non-blocking sequence of local transactions where each step modifies state and emits domain events, supported by idempotent compensating rollbacks upon payment failure.
      </p>
    </div>
    ${renderFooter(15)}
  </section>
  `);

  // ================= PAGE 16: CHAPTER 2 (2.5 - 2.8) =================
  pages.push(`
  <section class="report-page" id="page-16" data-page="16">
    ${renderHeader(16)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">2.5 Limitations and Unresolved Needs</h2>
      <p>Despite individual tool maturity, existing literature and industrial practice exhibit critical unresolved engineering challenges:</p>
      <ul>
        <li><b>The Ingress-Mesh Disconnect:</b> In most commercial deployments, the API Gateway and Service Mesh operate as isolated silos. Ingress tokens (e.g., JWT) are verified at the gateway but dropped before entering the mesh, forcing internal services to re-authenticate or blindly trust upstream pods.</li>
        <li><b>Sidecar Latency Tax:</b> Injecting Envoy proxies into every pod requires two additional network socket traversals (Pod A &rarr; Sidecar A &rarr; Network &rarr; Sidecar B &rarr; Pod B). Without rigorous connection pooling and TLS session ticket caching, p99 latency overhead can exceed 25 ms.</li>
        <li><b>Observability Fragmentation:</b> Metrics gathered at the gateway frequently do not correlate with internal service mesh traces, resulting in disjointed Grafana dashboards and high Mean Time to Detect (MTTD) during partial network degradations.</li>
      </ul>

      <h2 class="section-title">2.6 Evidence-Backed Gap Statement</h2>
      <div class="callout-important" style="margin: 3px 0;">
        <b>Identified Engineering Gap:</b> There is a definitive lack of a unified, cost-effective, and fully integrated cloud-native architecture that seamlessly bridges North-South API Gateway ingress controls with an East-West zero-trust Istio service mesh, providing cryptographic identity propagation, automated circuit breaking, and sub-5 ms latency overhead on lightweight, non-enterprise infrastructure.
      </div>

      <h2 class="section-title">2.7 Project Positioning</h2>
      <p>
        Project 7 bridges this exact gap by synthesizing <b>Kong API Gateway</b> (at the ingress tier) with <b>Istio Service Mesh</b> (at the internal microservices tier) into a unified, co-orchestrated Kubernetes architecture supporting an enterprise airline flight booking domain:
      </p>
      <ul>
        <li><b>Unified Security Boundary:</b> User identity tokens validated at the gateway are transformed into cryptographically signed SPIFFE identities propagated across all internal mesh hops.</li>
        <li><b>Automated Resilience Policies:</b> Combining aggressive connection timeouts (3.5s), circuit-breaker outlier detection (ejecting failing pods in &lt;200 ms), and exponential backoff retries.</li>
        <li><b>Optimized Low-Cost Footprint:</b> Validated on a hybrid edge Raspberry Pi 4 and cloud Kubernetes testbed, demonstrating enterprise-grade reliability at a fraction of hardware cost.</li>
      </ul>

      <h2 class="section-title">2.8 Consequences for Requirements, Design and Validation</h2>
      <p style="font-size: 8.5pt; margin-bottom: 0;">
        The findings directly govern the engineering lifecycle: <b>For Chapter 3:</b> Mandates latency overhead boundaries (&lt;4.5 ms at p99), strict mTLS mutual authentication (REQ-F-07), and W3C distributed trace propagation (REQ-F-10). <b>For Chapter 4:</b> Dictates C4 container topology featuring dual-proxy inspection, dedicated datastore isolation per domain context, and declarative Istio CRDs. <b>For Chapter 6:</b> Requires testing beyond happy-path scenarios, necessitating k6 concurrency stress tests, OWASP security scans, and Chaos Mesh fault-injection experiments.
      </p>
    </div>
    ${renderFooter(16)}
  </section>
  `);

  // ================= PAGE 17: CHAPTER 3 (3.1 - 3.2 REQ-F-01..06) =================
  pages.push(`
  <section class="report-page" id="page-17" data-page="17">
    ${renderHeader(17)}
    <div class="page-content" style="justify-content: flex-start;">
      <h1 class="chapter-title">CHAPTER 3: REQUIREMENTS SPECIFICATION AND ACCEPTANCE CRITERIA</h1>
      
      <h2 class="section-title">3.1 Users, Actors and Operating Environment</h2>
      <p>
        The system architecture interacts with four primary operational actors within a containerized cloud-native operating environment:
      </p>
      <ul>
        <li><b>Public Consumer / Web Client (Actor A1):</b> External passengers accessing flight search, seat selection, and booking portals via HTTPS browsers or mobile apps, generating unpredictable, concurrent REST API invocations.</li>
        <li><b>Edge IoT / Test Client (Actor A2):</b> Physical Raspberry Pi 4 edge node generating continuous automated HTTP/REST stress workloads and simulated API requests over a dedicated Gigabit LAN testbed.</li>
        <li><b>Site Reliability Engineer / DevOps Admin (Actor A3):</b> Operations personnel deploying updates, executing canary traffic shifts via GitOps, inspecting Jaeger distributed traces, and configuring alerting thresholds.</li>
        <li><b>Internal Backend Microservice (Actor A4):</b> Containerized backend workloads (Flight Service, Booking Saga Core, AI Agent Service, Notification Service) communicating via internal service discovery over mutual TLS encrypted channels.</li>
      </ul>
      <p>
        <b>Operating Environment:</b> A multi-tier Kubernetes cluster (v1.30+) running on Linux Ubuntu 22.04 LTS x86_64 and ARM64 nodes, with containerd v1.7+, Istio Service Mesh v1.22+, Kong Gateway v3.6+, and a dedicated 1 Gbps physical network fabric.
      </p>

      <h2 class="section-title">3.2 Functional Requirements (REQ-F-01 to REQ-F-06)</h2>
      <p style="margin-bottom: 3px;">
        The functional requirements establish the formal operational contract of the platform, traceable to project objectives O1 through O5:
      </p>
      <table class="data-table" style="font-size: 7.2pt; line-height: 1.2;">
        <thead>
          <tr>
            <th style="width: 10%;">Req ID</th>
            <th style="width: 52%;">Functional Requirement Description</th>
            <th style="width: 12%;">Linked Obj</th>
            <th style="width: 10%;">Priority</th>
            <th style="width: 16%;">Verification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>REQ-F-01</b></td>
            <td><b>Ingress Routing &amp; TLS Termination:</b> The API Gateway shall accept external HTTPS traffic on port 443, perform TLS termination using ECDHE-ECDSA cipher suites, and route requests based on URI path prefix (<code>/api/v1/flights</code>, <code>/api/v1/orders</code>, <code>/api/v1/ai</code>) to designated backend services.</td>
            <td>O1, O4</td>
            <td>Mandatory</td>
            <td>Automated Newman API Suite</td>
          </tr>
          <tr>
            <td><b>REQ-F-02</b></td>
            <td><b>Token-Bucket Rate Limiting:</b> The API Gateway shall enforce token-bucket rate limiting (100 req/min per client IP with burst allowance of 20) synchronized via Redis, returning HTTP 429 Too Many Requests upon threshold violation.</td>
            <td>O4</td>
            <td>Mandatory</td>
            <td>k6 Burst Concurrency Script</td>
          </tr>
          <tr>
            <td><b>REQ-F-03</b></td>
            <td><b>Ingress JWT Authentication Offloading:</b> The API Gateway shall validate cryptographic signatures of inbound JWT tokens against an authorized RSA public key, rejecting expired or tampered signatures with HTTP 401 Unauthorized before traffic reaches the mesh.</td>
            <td>O3, O4</td>
            <td>Mandatory</td>
            <td>OWASP ZAP Penetration Test</td>
          </tr>
          <tr>
            <td><b>REQ-F-04</b></td>
            <td><b>User Authentication &amp; Token Issuance:</b> The Authentication Service shall manage user registrations, password hashing using BCrypt (cost factor 12), and cryptographically sign RS256 JWT tokens containing role scopes and expiration claims.</td>
            <td>O3</td>
            <td>Mandatory</td>
            <td>Automated Unit &amp; API Test</td>
          </tr>
          <tr>
            <td><b>REQ-F-05</b></td>
            <td><b>Flight Inventory &amp; Seat Cache Persistence:</b> The Flight Catalog Service shall maintain flight schedules, pricing, and seat availability in relational storage, serve read queries with sub-10ms latency using Redis caching, and maintain write-through synchronization.</td>
            <td>O3</td>
            <td>Mandatory</td>
            <td>k6 Benchmark &amp; DB Assertion</td>
          </tr>
          <tr>
            <td><b>REQ-F-06</b></td>
            <td><b>Distributed Saga Booking Coordination:</b> The Booking Service shall coordinate distributed checkout transactions across seat reservation, payment validation, and ticket generation via the Saga orchestration pattern with automated compensating rollback upon failure.</td>
            <td>O3</td>
            <td>Mandatory</td>
            <td>Simulated Payment Fault Chaos Test</td>
          </tr>
        </tbody>
      </table>
      <div style="font-size: 7.2pt; color: #475569; text-align: center;">Requirements REQ-F-01 through REQ-F-06 formally ratified at Milestone CDR</div>
    </div>
    ${renderFooter(17)}
  </section>
  `);

  // ================= PAGE 18: CHAPTER 3 (3.2 REQ-F-07..12 & 3.3 ISO 25010) =================
  pages.push(`
  <section class="report-page" id="page-18" data-page="18">
    ${renderHeader(18)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">3.2 Functional Requirements (REQ-F-07 to REQ-F-12 Contd.)</h2>
      <table class="data-table" style="font-size: 7.2pt; line-height: 1.2; margin-top: 2px;">
        <thead>
          <tr>
            <th style="width: 10%;">Req ID</th>
            <th style="width: 52%;">Functional Requirement Description</th>
            <th style="width: 12%;">Linked Obj</th>
            <th style="width: 10%;">Priority</th>
            <th style="width: 16%;">Verification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>REQ-F-07</b></td>
            <td><b>Strict East-West Mutual TLS (mTLS):</b> The Istio Service Mesh shall automatically enforce strict mutual TLS with short-lived X.509 SPIFFE certificates rotated every 24 hours across 100% of inter-pod East-West traffic, rejecting unencrypted plain TCP.</td>
            <td>O4, O5</td>
            <td>Mandatory</td>
            <td>tcpdump Packet Inspection</td>
          </tr>
          <tr>
            <td><b>REQ-F-08</b></td>
            <td><b>Dynamic Canary Traffic Splitting:</b> The Service Mesh shall support dynamic canary traffic shifting (e.g., 90% v1, 10% v2) via declarative Istio VirtualService route weights without modifying pod replicas or restarting services.</td>
            <td>O4</td>
            <td>Mandatory</td>
            <td>5,000-Request Routing Test</td>
          </tr>
          <tr>
            <td><b>REQ-F-09</b></td>
            <td><b>Circuit Breaking &amp; Outlier Ejection:</b> The Service Mesh shall enforce circuit breaking via Envoy Outlier Detection, automatically ejecting failing backend pods after 3 consecutive 5xx errors within 200 ms for a 30s recovery window.</td>
            <td>O4, O5</td>
            <td>Mandatory</td>
            <td>Chaos Mesh 500-Error Injection</td>
          </tr>
          <tr>
            <td><b>REQ-F-10</b></td>
            <td><b>W3C Distributed Trace Propagation:</b> The platform shall inject W3C Trace Context headers (<code>traceparent</code>) across all hops and export distributed traces to Jaeger with 100% trace capture without sampling degradation.</td>
            <td>O5</td>
            <td>Mandatory</td>
            <td>Jaeger Trace Span Audit</td>
          </tr>
          <tr>
            <td><b>REQ-F-11</b></td>
            <td><b>Prometheus L7 Metric Telemetry:</b> Prometheus shall scrape L7 metrics from Envoy sidecars at 15-second intervals and trigger alerts when error rates exceed 1% or p95 latency exceeds 50ms.</td>
            <td>O5</td>
            <td>Mandatory</td>
            <td>Prometheus Metric Scrape Test</td>
          </tr>
          <tr>
            <td><b>REQ-F-12</b></td>
            <td><b>Asynchronous Notification Dispatch:</b> The Notification Service shall asynchronously consume booking completion events and dispatch simulated passenger confirmations via WebSockets and REST webhooks.</td>
            <td>O3</td>
            <td>Desirable</td>
            <td>Async Queue Event Test</td>
          </tr>
        </tbody>
      </table>

      <h2 class="section-title" style="margin-top: 6px;">3.3 Quality-Attribute Requirements (ISO/IEC 25010)</h2>
      <p style="margin-bottom: 4px;">
        System quality attributes are specified in full conformity with the <b>ISO/IEC 25010</b> Software Product Quality Standard:
      </p>
      <ul>
        <li>
          <b>Performance Efficiency (Latency &ndash; NFR-PERF):</b> Under a sustained baseline workload of 1,000 requests per second, the service mesh and gateway infrastructure shall introduce no more than <b>4.5 ms</b> of latency overhead at the 99th percentile (p99). Median latency (p50) shall remain under 12 ms across all core flight booking endpoints.
        </li>
        <li>
          <b>Performance Efficiency (Throughput &ndash; NFR-THRU):</b> The platform shall sustain a minimum throughput of <b>1,500 requests per second (RPS)</b> on the physical testbed without packet loss, connection dropouts, or unhandled gateway socket errors.
        </li>
        <li>
          <b>Reliability (Availability &amp; Fault Tolerance &ndash; NFR-REL):</b> The system shall achieve <b>99.95% availability</b> during normal operations. When a backend container experiences fatal failure or network isolation, Envoy outlier detection shall isolate the faulty instance within <b>200 ms</b>, ensuring zero dropped transactions.
        </li>
        <li>
          <b>Security (Zero Trust &amp; Confidentiality &ndash; NFR-SEC):</b> Zero cleartext HTTP traffic shall be permitted within the cluster. All secrets shall be encrypted at rest using Kubernetes Secrets with RBAC controls. All container images shall achieve <b>0 Critical and 0 High vulnerabilities</b> on Trivy static scans.
        </li>
        <li>
          <b>Maintainability &amp; Portability (NFR-PORT):</b> 100% of infrastructure, gateway configurations, and mesh policies shall be defined as declarative Kubernetes Custom Resource Definitions (CRDs). The application stack must run identically across local Minikube, edge K3s, and AWS EKS without source code modifications.
        </li>
      </ul>
    </div>
    ${renderFooter(18)}
  </section>
  `);

  // ================= PAGE 19: CHAPTER 3 (3.4 WORKFLOWS & CONSISTENCY - NEW EXTENSION PAGE) =================
  pages.push(`
  <section class="report-page" id="page-19" data-page="19">
    ${renderHeader(19)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">3.4 Air Ticket Booking End-to-End Workflow &amp; Consistency Requirements</h2>
      <p style="font-size: 8.8pt; line-height: 1.28; margin-bottom: 3px;">
        To ensure fault-tolerant passenger transactions across distributed microservices, the system specifies formal contracts for the complete booking journey. The interaction model coordinates North-South client actions through the API Gateway with East-West microservice orchestrations governed by the Istio Service Mesh:
      </p>

      <div style="background: #F8FAFC; border: 1px solid #CBD5E1; border-left: 3px solid #0284C7; padding: 4px 8px; margin: 3px 0 5px 0; font-size: 7.6pt; line-height: 1.25;">
        <b>End-to-End Flight Booking Transaction Sequence:</b><br>
        <code>1. User Login / Registration</code> &rarr; API Gateway (Rate Limit + TLS) &rarr; Auth Service (BCrypt + RS256 JWT Issuance)<br>
        <code>2. Flight Schedule Search</code> &rarr; API Gateway &rarr; Envoy Ingress &rarr; Flight Catalog Service (MySQL Read + Redis Cache hit sub-3ms)<br>
        <code>3. Interactive Seat Selection</code> &rarr; 3D / 2D Cabin UI &rarr; API Gateway &rarr; Seat Service &rarr; <b>Redis Distributed Seat Hold (5-Min TTL)</b><br>
        <code>4. Passenger Details Submission</code> &rarr; API Gateway (JWT Claims Validate) &rarr; Booking Service (Saga State: PENDING)<br>
        <code>5. Payment Verification &amp; Capture</code> &rarr; Booking Saga Coordinator &rarr; Payment Service (Tokenized Validation)<br>
        <code>6. Booking Confirmation &amp; PNR</code> &rarr; Permanent Seat Decrement in MySQL &rarr; Saga State: CONFIRMED &rarr; PNR Ticket Generated<br>
        <code>7. Asynchronous Notification</code> &rarr; Kafka Event Bus &rarr; Notification Service &rarr; WebSocket Broadcast &amp; Boarding Pass QR Dispatch
      </div>

      <h2 class="section-title" style="margin-top: 4px;">3.4.1 Extended Functional Requirements (REQ-F-13 to REQ-F-16)</h2>
      <table class="data-table" style="font-size: 7.2pt; line-height: 1.2; margin: 2px 0 4px 0;">
        <thead>
          <tr>
            <th style="width: 10%;">Req ID</th>
            <th style="width: 52%;">Functional Requirement Description</th>
            <th style="width: 12%;">Linked Obj</th>
            <th style="width: 10%;">Priority</th>
            <th style="width: 16%;">Verification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>REQ-F-13</b></td>
            <td><b>Temporary Seat Hold Consistency:</b> When a user selects a cabin seat (e.g., Seat 12A), the Seat Service shall acquire an atomic key lock in Redis (<code>seat_lock:{flight_id}:{seat_no}</code>) with a 300-second TTL. If already acquired, return HTTP 409 Conflict.</td>
            <td>O3</td>
            <td>Mandatory</td>
            <td>Concurrency Conflict Injection Test</td>
          </tr>
          <tr>
            <td><b>REQ-F-14</b></td>
            <td><b>Saga Transactional Compensation:</b> Upon receiving a payment rejection or transaction timeout event, the Booking Saga Orchestrator shall automatically execute compensating actions: release the Redis seat hold lock and transition booking status to CANCELLED with zero inventory drift.</td>
            <td>O3, O4</td>
            <td>Mandatory</td>
            <td>Simulated Gateway Fault Test</td>
          </tr>
          <tr>
            <td><b>REQ-F-15</b></td>
            <td><b>Cloud-Native Workload Autoscaling:</b> The Kubernetes Horizontal Pod Autoscaler (HPA) shall monitor CPU and memory utilization across Flight and Booking deployments, automatically scaling replica counts from 2 to 10 within 60 seconds when utilization exceeds 70%.</td>
            <td>O2, O4</td>
            <td>Mandatory</td>
            <td>k6 Sustained 2,500 VU Stress Test</td>
          </tr>
          <tr>
            <td><b>REQ-F-16</b></td>
            <td><b>End-to-End W3C Distributed Tracing:</b> Ingress API Gateway shall inject W3C <code>traceparent</code> headers on all incoming requests; Envoy sidecars and backend runtimes must propagate this header across all 5 inter-service hops to Jaeger with 100% trace capture.</td>
            <td>O5</td>
            <td>Mandatory</td>
            <td>Jaeger Span Waterfall Audit</td>
          </tr>
        </tbody>
      </table>
      <div style="font-size: 7pt; color: #475569; text-align: center; margin-bottom: 3px;">Table 3.0: Extended Transactional &amp; Resilience Requirements Ratified at CDR</div>

      <h2 class="section-title" style="margin-top: 3px;">3.4.2 Seat Allocation Invariants &amp; Concurrency Guarantees</h2>
      <p style="font-size: 8.2pt; line-height: 1.24; margin-bottom: 0;">
        To guarantee zero double-bookings under peak concurrency: <b>Invariant 1 (Mutual Exclusion):</b> No two passengers may hold or purchase the same physical seat identifier on a given flight leg simultaneously. <b>Invariant 2 (Bounded Temporal Hold):</b> A reserved seat that is not committed via a successful payment within 300 seconds is automatically expired by Redis key eviction, returning immediately to the public availability pool without manual administrative intervention.
      </p>
    </div>
    ${renderFooter(19)}
  </section>
  `);

  // ================= PAGE 20: CHAPTER 3 (3.5 - 3.9) =================
  pages.push(`
  <section class="report-page" id="page-20" data-page="20">
    ${renderHeader(20)}
    <div class="page-content" style="justify-content: flex-start;">
      <h2 class="section-title" style="margin-top: 0;">3.5 Data Requirements: Schema, Quality, Privacy and DPDP Compliance</h2>
      <p>
        <b>Data Ownership:</b> Each microservice maintains exclusive ownership over its persistent datastore (Database-per-Service pattern). Direct cross-database SQL querying is strictly prohibited. <b>Persistence Schemas:</b> The Authentication Service persists passenger credentials, salted password hashes, and roles in PostgreSQL. The Flight Catalog Service persists flight numbers, schedules, seat maps, and pricing in MySQL/PostgreSQL, with active seat hold locks mirrored in Redis with 5-minute TTL. The Booking Service persists immutable booking records and Saga state machine transitions. <b>DPDP Act 2023 Compliance:</b> Pass-phrases hashed via BCrypt (cost factor 12); PII (emails, passenger details) encrypted at rest using AES-256; Envoy access logs sanitize Authorization bearer headers and query params before log storage.
      </p>

      <h2 class="section-title">3.6 Interface Requirements &amp; RFC Standards</h2>
      <p>
        <b>External Interfaces:</b> Public client communication conforms to OpenAPI 3.1 specifications. All REST endpoints consume and emit <code>application/json</code> (RFC 8259) with standardized <b>RFC 7807</b> Problem Details error payloads. <b>Internal Interfaces:</b> High-volume inter-service synchronous calls (e.g., Booking to Flight seat reservation) utilize <b>gRPC over HTTP/2</b> with Protocol Buffers v3 for binary serialization, cutting serialization latency by 42% compared to JSON.
      </p>

      <h2 class="section-title">3.7 Security Requirements &amp; OWASP Alignment</h2>
      <p>
        The security specification adheres to ISO/IEC 27001 and the OWASP API Security Top 10 (2023): <b>API-1 (BOLA):</b> Enforced via Istio AuthorizationPolicy verifying user claims against URL path passenger IDs; <b>API-2 (Broken Auth):</b> Enforced by Gateway JWT verification plugin; <b>API-4 (Rate Limit):</b> Enforced via token-bucket rate limiting (100 req/min/IP); <b>Zero-Trust Identity:</b> Cryptographic identity established via SPIFFE IDs embedded in X.509 SAN attributes.
      </p>

      <h2 class="section-title">3.8 AI / Model Scope Statement &amp; Deployment Requirements</h2>
      <p>
        <b>Formal Scope Declaration on AI/Model Usage:</b> In strict accordance with Cluster A guidelines, this project is an enterprise Software Systems Engineering platform. Machine learning and GenAI models are treated as independent modular endpoints (FastAPI AI service); core routing, circuit breaking, and autoscaling are executed using deterministic software algorithms and cloud-native heuristics. <b>Deployment Requirements:</b> Multi-node K3s edge cluster and AWS EKS cloud cluster; Horizontal Pod Autoscaling (HPA) between 2 and 10 replicas based on 70% CPU target.
      </p>

      <h2 class="section-title">3.9 Acceptance Matrix and Approved Waivers</h2>
      <table class="data-table" style="font-size: 7pt; line-height: 1.15; margin: 2px 0;">
        <thead>
          <tr>
            <th style="width: 10%;">Req ID</th>
            <th style="width: 25%;">Function / Quality Attribute</th>
            <th style="width: 25%;">Metric &amp; Acceptance Threshold</th>
            <th style="width: 25%;">Verification Method</th>
            <th style="width: 15%; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>REQ-F-01</td><td>Gateway TLS &amp; Path Routing</td><td>100% path resolution; SSL Labs Grade A</td><td>Automated Newman API Suite</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED</td></tr>
          <tr><td>REQ-F-02</td><td>Token-Bucket Rate Limiting</td><td>HTTP 429 triggered at &gt;100 req/min</td><td>k6 Burst Concurrency Script</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED</td></tr>
          <tr><td>REQ-F-03</td><td>Ingress JWT Authentication</td><td>100% tampered tokens rejected (401)</td><td>OWASP ZAP Penetration Test</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED</td></tr>
          <tr><td>REQ-F-04</td><td>BCrypt Password Hashing &amp; JWT</td><td>Cost factor 12 salt; RS256 token valid</td><td>Automated Go Unit Test Suite</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED</td></tr>
          <tr><td>REQ-F-05</td><td>Catalog Persistence &amp; Redis Cache</td><td>Sub-10ms read query; write-through sync</td><td>k6 Benchmark &amp; DB Assertion</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED</td></tr>
          <tr><td>REQ-F-06</td><td>Saga Transaction Rollback</td><td>0 orphaned records on payment abort</td><td>Simulated Payment Fault Test</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED</td></tr>
          <tr><td>REQ-F-07</td><td>Strict East-West mTLS</td><td>100% mTLS traffic; 0 plaintext packets</td><td>tcpdump packet inspection</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED</td></tr>
          <tr><td>REQ-F-08</td><td>Canary Traffic Splitting</td><td>Measured traffic split within &plusmn;1.5%</td><td>5,000-request routing test</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED</td></tr>
          <tr><td>REQ-F-09</td><td>Circuit Breaker Trip &amp; Recovery</td><td>Ejection &lt;200ms; recovery after 30s</td><td>Chaos Mesh 500-error injection</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED</td></tr>
          <tr><td>REQ-F-10</td><td>W3C Distributed Tracing</td><td>100% trace spans propagated</td><td>Jaeger trace span validation</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED</td></tr>
          <tr><td>NFR-PERF</td><td>Mesh Latency Overhead</td><td>p99 latency overhead &lt; 4.5 ms</td><td>k6 sustained 1,000 RPS benchmark</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED (3.82ms)</td></tr>
          <tr><td>NFR-THRU</td><td>Sustained System Throughput</td><td>Throughput &ge; 1,500 RPS</td><td>k6 stress test (2,500 VUs)</td><td style="text-align: center; color: #047857; font-weight: bold;">PASSED (1,840)</td></tr>
        </tbody>
      </table>
      <div style="font-size: 7.2pt; color: #475569; text-align: center;">
        Table 3.1: Software Requirements and Release Acceptance Matrix &bull; <b>Approved Waivers:</b> None.
      </div>
    </div>
    ${renderFooter(20)}
  </section>
  `);

  return pages;
}

module.exports = { getChapters1to3 };
