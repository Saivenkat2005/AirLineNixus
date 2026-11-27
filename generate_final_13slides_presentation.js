/**
 * ULTIMATE CREATIVE PPT GENERATOR - 13 SLIDES (PERFECTED AGENCY EDITION)
 * CLOUD-NATIVE API GATEWAY AND SERVICE MESH ARCHITECTURE
 * Application: Persistent Airways | University: KLEF | Department: CSE Cluster A
 */

const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

async function buildPresentation() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches

  // Color Palette Constants
  const C_BG_DARK = '070B19';      // Midnight navy background
  const C_BG_CARD = '0E162E';      // Glassmorphism card dark fill
  const C_BG_CARD_LIGHT = '111E3E';// Secondary card fill
  const C_BORDER_BLUE = '1E3A8A';  // Muted border
  const C_CYAN = '00F0FF';         // Vibrant cyan highlight
  const C_CYAN_LIGHT = '38BDF8';   // Sky cyan
  const C_BLUE = '2563EB';         // Electric blue
  const C_EMERALD = '10B981';      // Emerald pass / success
  const C_EMERALD_LIGHT = '34D399';// Light emerald
  const C_RED = 'EF4444';          // Alert / Legacy red
  const C_AMBER = 'F59E0B';        // Warning amber
  const C_PURPLE = '8B5CF6';       // Violet gradient
  const C_WHITE = 'FFFFFF';        // Crisp white text
  const C_TEXT_MUTED = '94A3B8';   // Subdued subtitle text
  const C_TEXT_BODY = 'E2E8F0';    // Primary body text
  const C_FOOTER_MUTED = '64748B'; // Footer text

  const ASSETS_DIR = path.join(__dirname, 'assets');
  const LOGOS_DIR = path.join(ASSETS_DIR, 'logos');
  const DIAG_DIR = path.join(ASSETS_DIR, 'diagrams');
  const ILLUS_DIR = path.join(ASSETS_DIR, 'illustrations');
  const KL_LOGO_PATH = path.join(__dirname, 'kl_logo.svg');

  // Helper: Standard Slide Header & Footer for Slides 2 to 12
  function applyStandardHeaderFooter(slide, slideNum, title, category) {
    slide.background = { color: C_BG_DARK };

    // Top Category / Breadcrumb
    slide.addText(`KLEF CSE CLUSTER A • CAPSTONE VIVA DEFENCE • ${category.toUpperCase()}`, {
      x: 0.6, y: 0.22, w: 7.5, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 9.5, bold: true, color: C_CYAN,
      margin: 0
    });

    // Main Slide Title
    slide.addText(title, {
      x: 0.6, y: 0.44, w: 7.8, h: 0.46,
      fontFace: 'Segoe UI', fontSize: 20, bold: true, color: C_WHITE,
      margin: 0
    });

    // Header Right: KL University Logo
    if (fs.existsSync(KL_LOGO_PATH)) {
      slide.addImage({
        path: KL_LOGO_PATH,
        x: 8.6, y: 0.22, w: 0.9, h: 0.48
      });
    }

    // Top Subtle Glow Divider
    slide.addShape(pres.ShapeType.line, {
      x: 0.6, y: 0.98, w: 8.8, h: 0,
      line: { color: '1E293B', width: 1.0 }
    });

    // Bottom Subtle Footer Divider
    slide.addShape(pres.ShapeType.line, {
      x: 0.6, y: 5.22, w: 8.8, h: 0,
      line: { color: '1E293B', width: 0.8 }
    });

    // Footer Left: Project Title & Context
    slide.addText('Cloud-Native API Gateway & Service Mesh Architecture | Persistent Airways', {
      x: 0.6, y: 5.26, w: 6.0, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 9.5, color: C_FOOTER_MUTED,
      margin: 0
    });

    // Footer Right: Slide Indicator
    slide.addText(`Slide ${slideNum} of 13`, {
      x: 7.8, y: 5.26, w: 1.6, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 9.5, bold: true, color: C_CYAN_LIGHT,
      align: 'right', margin: 0
    });
  }

  // =========================================================================
  // SLIDE 1: CINEMATIC PROJECT COVER
  // =========================================================================
  {
    const s1 = pres.addSlide();
    s1.background = { color: '050814' };

    const coverPath = path.join(ILLUS_DIR, 'cover_aircraft_mesh.svg');
    if (fs.existsSync(coverPath)) {
      s1.addImage({ path: coverPath, x: 0, y: 0, w: 10.0, h: 5.625 });
    }

    // Left Overlay Glassmorphism Container Card
    s1.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 0.45, w: 5.8, h: 4.75,
      rectRadius: 0.14,
      fill: { color: '070D1E', transparency: 12 },
      line: { color: C_CYAN, width: 1.5, transparency: 35 }
    });

    s1.addText('KONERU LAKSHMAIAH EDUCATION FOUNDATION (DEEMED TO BE UNIVERSITY)', {
      x: 0.9, y: 0.68, w: 5.2, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 8.5, bold: true, color: C_CYAN_LIGHT,
      margin: 0
    });
    s1.addText('DEPARTMENT OF CSE • CLUSTER A (SOFTWARE SYSTEMS ENGINEERING)', {
      x: 0.9, y: 0.90, w: 5.2, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 9, bold: true, color: C_TEXT_MUTED,
      margin: 0
    });

    s1.addText('CLOUD-NATIVE API GATEWAY AND SERVICE MESH ARCHITECTURE', {
      x: 0.9, y: 1.25, w: 5.2, h: 1.15,
      fontFace: 'Segoe UI', fontSize: 23, bold: true, color: C_WHITE,
      margin: 0
    });

    s1.addText('Enterprise Flight Booking Platform: Decoupled Zero-Trust Security, Dynamic Traffic Steering & Resilient Distributed Telemetry', {
      x: 0.9, y: 2.45, w: 5.2, h: 0.55,
      fontFace: 'Segoe UI', fontSize: 12, color: C_CYAN,
      margin: 0
    });

    s1.addShape(pres.ShapeType.line, {
      x: 0.9, y: 3.12, w: 5.2, h: 0,
      line: { color: C_BLUE, width: 1.5 }
    });

    s1.addText('Submitted by Team 139 (Batch CSE-3 | Academic Year 2026–2027):', {
      x: 0.9, y: 3.22, w: 5.2, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 9.5, bold: true, color: C_WHITE,
      margin: 0
    });

    const teamList = [
      '• Bandaru Sai Venkat Ram (2300031764) – Lead Architect',
      '• Davuluri Bala Gopal (2300032878) – DevOps & Infra Lead',
      '• Akaramsetty Siva Sai (2300033233) – Backend Services Lead',
      '• Rohid Baig (2300039146) – Observability & Testing Lead'
    ];
    s1.addText(teamList.join('\n'), {
      x: 0.9, y: 3.50, w: 5.2, h: 0.95,
      fontFace: 'Segoe UI', fontSize: 10.5, color: C_TEXT_BODY,
      margin: 0
    });

    s1.addText('Faculty Supervisor: Mr. BVN Prasad Paruchuri (Assistant Professor, Dept. of CSE)', {
      x: 0.9, y: 4.62, w: 5.2, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 10, bold: true, color: C_EMERALD_LIGHT,
      margin: 0
    });

    s1.addNotes(
      "Good morning distinguished members of the examination committee, faculty supervisor Mr. BVN Prasad Paruchuri, project coordinator Mrs. P. Anusha, and Head of Department Dr. A. Senthil. " +
      "We are Team 139 from Cluster A (Software Systems Engineering). Today we present our capstone engineering defence titled 'Cloud-Native API Gateway and Service Mesh Architecture', implemented and validated on an enterprise flight booking platform, Persistent Airways. " +
      "Modern enterprise systems require extreme security, sub-5 millisecond performance, and continuous resilience. In this presentation, we demonstrate how our dual-tier proxy topology decouples cross-cutting concerns, enforces zero-trust mutual TLS, achieves 1,840 requests per second with only 3.82ms p99 overhead, and cuts hardware capital expenditure by 94.6%."
    );
  }

  // =========================================================================
  // SLIDE 2: PROJECT INTRODUCTION AND PROBLEM STATEMENT
  // =========================================================================
  {
    const s2 = pres.addSlide();
    applyStandardHeaderFooter(s2, 2, 'Distributed Systems Dilemma & The Verified Problem', 'Problem Formulation & Context');

    s2.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 1.15, w: 4.3, h: 3.9,
      rectRadius: 0.1, fill: { color: C_BG_CARD }, line: { color: C_BORDER_BLUE, width: 1.2 }
    });

    s2.addText('Production Bottlenecks at Scale', {
      x: 0.85, y: 1.3, w: 3.8, h: 0.3,
      fontFace: 'Segoe UI', fontSize: 14, bold: true, color: C_CYAN, margin: 0
    });

    const problemsText = [
      '• Monolithic Security Debt: Traditional perimeters only guard North-South ingress. Internal East-West traffic flows in cleartext HTTP, exposing pods to lateral movement attacks (MITRE ATT&CK T1021).',
      '• Observability Black Holes: Distributed microservices suffer unmonitored latency spikes, packet drops, and cascading failures without unified W3C distributed tracing.',
      '• Brittle Domain Code: Hardcoding TLS handshakes, JWT verification, retries, and rate limits inside business containers causes severe SDK drift and maintenance debt.',
      '• The Ingress-Mesh Disconnect: Standalone gateways drop tokens at ingress, forcing redundant internal authentication checks or insecure blind trust.',
      '★ Capstone Mandate: Transparently decouple networking, zero-trust security, traffic steering, and telemetry into a dual-tier Kubernetes proxy topology.'
    ];

    s2.addText(problemsText.join('\n\n'), {
      x: 0.85, y: 1.68, w: 3.8, h: 3.2,
      fontFace: 'Segoe UI', fontSize: 9.8, color: C_TEXT_BODY, margin: 0
    });

    const monoVsMicroPath = path.join(ILLUS_DIR, 'monolith_vs_microservices.svg');
    if (fs.existsSync(monoVsMicroPath)) {
      s2.addImage({
        path: monoVsMicroPath,
        x: 5.1, y: 1.15, w: 4.3, h: 3.9
      });
    }

    s2.addNotes(
      "In Chapter 1 and 2, our research establishes that while 84% of enterprises have adopted containerized microservices, distributed architectures introduce critical operational vulnerabilities. " +
      "First is Monolithic Security Debt: perimeter firewalls leave internal East-West communication completely unencrypted. An attacker breaching one peripheral pod can sniff cleartext traffic across all services—a direct MITRE ATT&CK T1021 threat. " +
      "Second is Observability Black Holes: multi-tier services create cascading failures with unmonitored latency spikes. " +
      "Third is Brittle Domain Code: embedding TLS libraries, rate limiting, and circuit breaking into application services causes language fragmentation and massive code duplication. " +
      "Our capstone mandate is to eliminate this by engineering an integrated API Gateway and Istio Service Mesh that handles 100% of these concerns transparently in the infrastructure layer."
    );
  }

  // =========================================================================
  // SLIDE 3: TECHNOLOGY STACK ECOSYSTEM
  // =========================================================================
  {
    const s3 = pres.addSlide();
    applyStandardHeaderFooter(s3, 3, 'Unified Cloud-Native Technology Ecosystem', 'Technology Architecture');

    const categories = [
      {
        title: '1. Ingress & Edge Gateway',
        subtitle: 'North-South Traffic Governance',
        techs: 'Kong API Gateway v3.6.0 (OpenResty, DB-less mode, Lua/Go Plugins for JWT & Rate Limits)',
        logos: ['kong.svg'],
        x: 0.6, y: 1.15, w: 2.8, h: 1.85,
        borderColor: C_CYAN
      },
      {
        title: '2. Service Mesh & Proxy',
        subtitle: 'East-West Zero-Trust Mesh',
        techs: 'Istio v1.22.0 (istiod Control Plane, Citadel CA, Envoy v1.30.1 C++ Proxy Sidecars)',
        logos: ['istio.svg', 'envoyproxy.svg'],
        x: 3.6, y: 1.15, w: 2.8, h: 1.85,
        borderColor: C_BLUE
      },
      {
        title: '3. Platform Orchestration',
        subtitle: 'Container Runtime & GitOps',
        techs: 'Kubernetes v1.30.1, K3s (ARM64 Edge), Docker v26.1, ArgoCD, GitHub Actions CI/CD',
        logos: ['kubernetes.svg', 'docker.svg', 'argo.svg', 'githubactions.svg'],
        x: 6.6, y: 1.15, w: 2.8, h: 1.85,
        borderColor: C_PURPLE
      },
      {
        title: '4. Polyglot Microservices',
        subtitle: 'Clean Domain Business Logic',
        techs: 'Go 1.22 (Auth Service), Python FastAPI 0.110 (Catalog), Spring Boot 3.2 (Orders), Node.js 20 (Notify)',
        logos: ['go.svg', 'python.svg', 'openjdk.svg', 'nodedotjs.svg'],
        x: 0.6, y: 3.15, w: 2.8, h: 1.9,
        borderColor: C_EMERALD
      },
      {
        title: '5. State & Distributed Cache',
        subtitle: 'ACID Persistence & Sub-3ms Cache',
        techs: 'PostgreSQL 16 & MySQL 8.0 (Database-per-Service) + Redis 7 (Distributed Seat Holds)',
        logos: ['mysql.svg', 'redis.svg'],
        x: 3.6, y: 3.15, w: 2.8, h: 1.9,
        borderColor: C_AMBER
      },
      {
        title: '6. Full-Stack Observability',
        subtitle: 'Metrics, Tracing & Dashboards',
        techs: 'Prometheus v2.51 (15s L7 scrape), Grafana v10.4 (p50-p99 panels), Jaeger v1.55 (W3C DAG traces)',
        logos: ['prometheus.svg', 'grafana.svg', 'jaeger.svg'],
        x: 6.6, y: 3.15, w: 2.8, h: 1.9,
        borderColor: C_CYAN_LIGHT
      }
    ];

    categories.forEach(cat => {
      s3.addShape(pres.ShapeType.roundRect, {
        x: cat.x, y: cat.y, w: cat.w, h: cat.h,
        rectRadius: 0.08, fill: { color: C_BG_CARD }, line: { color: cat.borderColor, width: 1.2 }
      });

      s3.addText(cat.title, {
        x: cat.x + 0.15, y: cat.y + 0.1, w: cat.w - 0.3, h: 0.22,
        fontFace: 'Segoe UI', fontSize: 11.5, bold: true, color: C_WHITE, margin: 0
      });
      s3.addText(cat.subtitle, {
        x: cat.x + 0.15, y: cat.y + 0.32, w: cat.w - 0.3, h: 0.18,
        fontFace: 'Segoe UI', fontSize: 9.0, color: C_CYAN_LIGHT, margin: 0
      });

      let logoX = cat.x + 0.15;
      cat.logos.forEach(logoFile => {
        const logoPath = path.join(LOGOS_DIR, logoFile);
        if (fs.existsSync(logoPath)) {
          s3.addShape(pres.ShapeType.roundRect, {
            x: logoX, y: cat.y + 0.55, w: 0.44, h: 0.44,
            rectRadius: 0.06, fill: { color: '050914' }, line: { color: '1E293B', width: 0.8 }
          });
          s3.addImage({
            path: logoPath,
            x: logoX + 0.04, y: cat.y + 0.59, w: 0.36, h: 0.36
          });
          logoX += 0.52;
        }
      });

      s3.addText(cat.techs, {
        x: cat.x + 0.15, y: cat.y + 1.08, w: cat.w - 0.3, h: 0.72,
        fontFace: 'Segoe UI', fontSize: 9.0, color: C_TEXT_BODY, margin: 0
      });
    });

    s3.addNotes(
      "Slide 3 presents our complete open-source CNCF technology ecosystem. Rather than a monolithic single-language stack, we engineered a polyglot architecture standardized under Kubernetes v1.30.1. " +
      "At the Ingress edge, we utilize Kong Ingress Controller in DB-less declarative mode, preventing external database dependencies. " +
      "For internal mesh governance, we deployed Istio v1.22 with Envoy sidecar proxies in C++, providing high-throughput L7 traffic interception. " +
      "Our business microservices span Go 1.22 for the performance-critical Authentication Service, Python FastAPI for the Flight Catalog, Spring Boot 3.2 for the Booking Saga Orchestrator, and Node.js for WebSocket event notifications. " +
      "Data persistence adheres strictly to the Database-per-Service pattern using PostgreSQL and MySQL, backed by a Redis 7 cluster for sub-3ms seat holds. " +
      "Finally, full-stack observability is powered by Prometheus, Grafana, and Jaeger, fully integrated with W3C distributed trace context headers."
    );
  }

  // =========================================================================
  // SLIDE 4: API GATEWAY VS SERVICE MESH
  // =========================================================================
  {
    const s4 = pres.addSlide();
    applyStandardHeaderFooter(s4, 4, 'Architectural Boundary: API Gateway vs Service Mesh', 'Boundary Demarcation');

    const nsVsEwPath = path.join(ILLUS_DIR, 'north_south_vs_east_west.svg');
    if (fs.existsSync(nsVsEwPath)) {
      s4.addImage({
        path: nsVsEwPath,
        x: 0.6, y: 1.15, w: 5.6, h: 3.9
      });
    }

    s4.addShape(pres.ShapeType.roundRect, {
      x: 6.4, y: 1.15, w: 3.0, h: 3.9,
      rectRadius: 0.1, fill: { color: C_BG_CARD }, line: { color: C_BORDER_BLUE, width: 1.2 }
    });

    s4.addText('Functional Boundary Demarcation', {
      x: 6.6, y: 1.3, w: 2.6, h: 0.25,
      fontFace: 'Segoe UI', fontSize: 13, bold: true, color: C_CYAN, margin: 0
    });

    const diffPoints = [
      '★ North-South (Kong Gateway):\n• Client facing on external Port 443\n• Terminates external TLS 1.3 (ECDHE)\n• Enforces IP rate limiting via Redis\n• Validates RSA JWT public signatures\n• Offloads crypto overhead from pods',
      '★ East-West (Istio & Envoy Mesh):\n• In-cluster inter-service calls\n• Enforces strict mutual TLS (mTLS)\n• Dynamic canary traffic shifts (90/10)\n• Circuit breaking (180ms outlier trip)\n• Automated W3C trace span injection',
      '★ The Identity Bridge Innovation:\n• Edge JWT claims are mapped into in-cluster SPIFFE X.509 identities, avoiding redundant token parsing inside services.'
    ];

    s4.addText(diffPoints.join('\n\n'), {
      x: 6.6, y: 1.65, w: 2.6, h: 3.25,
      fontFace: 'Segoe UI', fontSize: 9.8, color: C_TEXT_BODY, margin: 0
    });

    s4.addNotes(
      "A central question in cloud engineering is: 'Why do we need both an API Gateway and a Service Mesh?' Slide 4 demonstrates this precise boundary. " +
      "The API Gateway governs North-South traffic—requests originating from untrusted public clients entering the cluster. It serves as the front door, handling heavy TLS termination, global rate limiting via Redis token buckets, JWT validation, and CORS policies. " +
      "In contrast, the Service Mesh governs East-West traffic—lateral inter-pod communication inside the cluster. Operating via Envoy sidecar proxies injected into each pod's Linux network namespace, Istio enforces zero-trust mutual TLS, granular authorization policies, dynamic canary routing, and outlier detection circuit breaking. " +
      "Our key architectural contribution here is the Unified Identity Bridge: the Gateway validates the public JWT token once at ingress, and Istio propagates cryptographically verified SPIFFE identities across all downstream hops, preventing token parsing bottlenecks."
    );
  }

  // =========================================================================
  // SLIDE 5: COMPLETE SYSTEM ARCHITECTURE (C4 MODEL)
  // =========================================================================
  {
    const s5 = pres.addSlide();
    applyStandardHeaderFooter(s5, 5, 'Complete End-to-End System Architecture (C4 Model)', 'System Architecture');

    const c4Path = path.join(DIAG_DIR, 'fig4_1_c4_architecture.svg');
    if (fs.existsSync(c4Path)) {
      s5.addImage({
        path: c4Path,
        x: 0.6, y: 1.15, w: 8.8, h: 3.1
      });
    }

    const archCards = [
      {
        title: 'Decoupled Dual-Tier Proxies',
        desc: 'Kong edge ingress intercepts North-South traffic; Envoy sidecars (:15001) intercept East-West traffic via iptables PREROUTING/OUTPUT redirection.',
        x: 0.6, y: 4.35, w: 2.8, h: 0.78, color: C_CYAN
      },
      {
        title: 'Control vs Data Plane Separation',
        desc: 'istiod control plane (Pilot xDS, Citadel CA, Galley) centrally pushes dynamic routing & 24h rotating X.509 certificates to lightweight Envoy sidecars.',
        x: 3.6, y: 4.35, w: 2.8, h: 0.78, color: C_BLUE
      },
      {
        title: 'Database-per-Service Pattern',
        desc: 'Zero shared database coupling; Auth owns PostgreSQL user stores, Flight Catalog owns Redis cache + MySQL, and Booking coordinates Saga state.',
        x: 6.6, y: 4.35, w: 2.8, h: 0.78, color: C_EMERALD
      }
    ];

    archCards.forEach(c => {
      s5.addShape(pres.ShapeType.roundRect, {
        x: c.x, y: c.y, w: c.w, h: c.h,
        rectRadius: 0.08, fill: { color: C_BG_CARD }, line: { color: c.color, width: 1.0 }
      });
      s5.addText([
        { text: `${c.title}\n`, options: { fontSize: 10, bold: true, color: c.color } },
        { text: c.desc, options: { fontSize: 8.5, color: C_TEXT_BODY } }
      ], {
        x: c.x + 0.12, y: c.y + 0.08, w: c.w - 0.24, h: c.h - 0.16,
        fontFace: 'Segoe UI', margin: 0
      });
    });

    s5.addNotes(
      "Slide 5 presents our comprehensive C4 container-level architecture, formalized in Chapter 4 of the report. " +
      "External requests from web browsers and mobile apps enter through Port 443 at the Kong Ingress Gateway. The Gateway executes TLS 1.3 termination, verifies the client token, and dispatches the request to the target backend pod. " +
      "Inside the Kubernetes cluster, traffic enters the Istio Zero-Trust Zone. Every pod contains two containers: the application container running pure business logic, and an Envoy sidecar proxy. Transparent iptables rules redirect all socket calls through port 15001. " +
      "Notice the clean separation between the Control Plane (istiod running Pilot for xDS discovery and Citadel as in-cluster SPIFFE CA) and the Data Plane (Envoy sidecars). " +
      "Data isolation strictly follows the Database-per-Service pattern, and every request hop automatically emits telemetry to Prometheus and Jaeger."
    );
  }

  // =========================================================================
  // SLIDE 6: REQUEST LIFECYCLE AND ZERO-TRUST SECURITY
  // =========================================================================
  {
    const s6 = pres.addSlide();
    applyStandardHeaderFooter(s6, 6, 'Request Lifecycle & Zero-Trust Security Enforcement', 'Security & Flow');

    const reqLifePath = path.join(ILLUS_DIR, 'request_lifecycle_flow.svg');
    if (fs.existsSync(reqLifePath)) {
      s6.addImage({
        path: reqLifePath,
        x: 0.6, y: 1.15, w: 8.8, h: 2.7
      });
    }

    const secCards = [
      {
        title: 'Strict Mutual TLS (mTLS)',
        desc: 'Configured via Istio PeerAuthentication STRICT mode. 100% of inter-pod TCP packets encrypted with TLS 1.3 AES-GCM cipher suites. Zero cleartext packets verified via tcpdump.',
        badge: '✔ 100% Inter-Pod TLS 1.3 Verified',
        x: 0.6, y: 3.98, w: 2.8, h: 1.15, color: C_EMERALD
      },
      {
        title: 'Automated SPIFFE SVID Rotation',
        desc: 'Workload identity encoded as SAN URIs: spiffe://cluster.local/ns/prod/sa/order-sa. Citadel automatically rotates X.509 certs every 24 hours via SDS without service restart.',
        badge: '✔ 24-Hour Certificate Rotation',
        x: 3.6, y: 3.98, w: 2.8, h: 1.15, color: C_CYAN
      },
      {
        title: 'OWASP & STRIDE Defense',
        desc: 'Protects against BOLA (API-1) via Istio AuthorizationPolicy, Broken Auth (API-2) via Gateway JWT filter, and DoS (API-4) via Redis token-bucket rate limiting.',
        badge: '✔ 0 Critical / 0 High CVEs',
        x: 6.6, y: 3.98, w: 2.8, h: 1.15, color: C_BLUE
      }
    ];

    secCards.forEach(c => {
      s6.addShape(pres.ShapeType.roundRect, {
        x: c.x, y: c.y, w: c.w, h: c.h,
        rectRadius: 0.08, fill: { color: C_BG_CARD }, line: { color: c.color, width: 1.2 }
      });
      // Unified text block to prevent overlap
      s6.addText([
        { text: `${c.title}\n`, options: { fontSize: 10.5, bold: true, color: c.color } },
        { text: `${c.desc}\n\n`, options: { fontSize: 8.4, color: C_TEXT_BODY } },
        { text: c.badge, options: { fontSize: 8.5, bold: true, color: C_EMERALD_LIGHT } }
      ], {
        x: c.x + 0.12, y: c.y + 0.08, w: c.w - 0.24, h: c.h - 0.16,
        fontFace: 'Segoe UI', margin: 0
      });
    });

    s6.addNotes(
      "Slide 6 walks through the exact 5-step cryptographic lifecycle of an airline transaction. " +
      "Step 1: Ingress TLS 1.3 termination at the Kong Gateway offloads 22% of CPU crypto processing from downstream containers. " +
      "Step 2: A Redis-synchronized token bucket limits traffic to 100 requests per minute per IP, rejecting floods with HTTP 429. " +
      "Step 3: The Gateway validates the RS256 signature of the inbound JWT token against the public key, stripping malicious headers. " +
      "Step 4: Within the mesh, Citadel issues short-lived X.509 certificates following the SPIFFE standard, rotated every 24 hours via Secret Discovery Service. " +
      "Step 5: When the Order Service calls the Flight Catalog Service, their Envoy sidecars execute a mutual TLS 1.3 handshake. " +
      "Both client and server verify cryptographic certificates before transferring a single application byte. In Wireshark captures over 500,000 packets, zero cleartext bytes were observed."
    );
  }

  // =========================================================================
  // SLIDE 7: MICROSERVICES AND SAGA WORKFLOW
  // =========================================================================
  {
    const s7 = pres.addSlide();
    applyStandardHeaderFooter(s7, 7, 'Microservices Domain & Saga Transaction Orchestration', 'Business Domain & Transactions');

    const sagaPath = path.join(DIAG_DIR, 'fig4_2_saga_workflow.svg');
    if (fs.existsSync(sagaPath)) {
      s7.addImage({
        path: sagaPath,
        x: 0.6, y: 1.15, w: 5.4, h: 3.9
      });
    }

    s7.addShape(pres.ShapeType.roundRect, {
      x: 6.2, y: 1.15, w: 3.2, h: 3.9,
      rectRadius: 0.1, fill: { color: C_BG_CARD }, line: { color: C_BORDER_BLUE, width: 1.2 }
    });

    s7.addText('Saga Orchestrator Pattern', {
      x: 6.4, y: 1.3, w: 2.8, h: 0.25,
      fontFace: 'Segoe UI', fontSize: 13, bold: true, color: C_CYAN, margin: 0
    });

    const sagaPoints = [
      '★ Why Saga over 2PC (ADR-05)?\nDistributed Two-Phase Commit holds database locks across network calls, causing connection starvation and 504 timeouts. Saga replaces locks with compensating transactions.',
      '★ 4-Step Flight Checkout Lifecycle:\n1. Order Service creates order in PENDING state in PostgreSQL.\n2. Synchronous gRPC call to Flight Catalog Service locks seat with 5-minute Redis TTL.\n3. Payment validation processed via simulated tokenized payment gateway.\n4. Notification Service asynchronously consumes completion event to dispatch WebSocket & email alerts.',
      '★ Automated Compensating Rollback:\nIf payment fails or times out, the orchestrator issues a REST/gRPC compensation command to restore seat inventory, guaranteeing ZERO inventory drift.'
    ];

    s7.addText(sagaPoints.join('\n\n'), {
      x: 6.4, y: 1.62, w: 2.8, h: 3.3,
      fontFace: 'Segoe UI', fontSize: 9.3, color: C_TEXT_BODY, margin: 0
    });

    s7.addNotes(
      "In Slide 7, we examine how business domain logic operates across decoupled services. " +
      "In an airline booking scenario, a passenger selects a flight, locks a seat, and submits payment. In traditional systems, distributed Two-Phase Commit holds distributed database locks, causing connection pool exhaustion under load. " +
      "Per Architecture Decision Record ADR-05, we implemented the Saga Orchestration Pattern in Spring Boot 3.2. " +
      "The Booking Service coordinates four discrete steps: creating the order in PENDING state, executing a high-speed gRPC call to reserve the seat in Redis, verifying payment tokens, and finalizing the ticket. " +
      "Crucially, if payment verification fails, the orchestrator executes automated compensating transactions that release the seat hold immediately. Under chaos fault injection, we recorded zero orphaned records and zero inventory drift across 500 automated booking runs."
    );
  }

  // =========================================================================
  // SLIDE 8: TRAFFIC MANAGEMENT AND CI/CD
  // =========================================================================
  {
    const s8 = pres.addSlide();
    applyStandardHeaderFooter(s8, 8, 'Dynamic Traffic Steering, Resilience & GitOps CI/CD', 'Resilience & Delivery');

    const canaryPath = path.join(ILLUS_DIR, 'canary_traffic_split.svg');
    if (fs.existsSync(canaryPath)) {
      s8.addImage({
        path: canaryPath,
        x: 0.6, y: 1.15, w: 4.3, h: 2.0
      });
    }

    const circuitPath = path.join(DIAG_DIR, 'fig4_10_circuit_breaker.svg');
    if (fs.existsSync(circuitPath)) {
      s8.addImage({
        path: circuitPath,
        x: 0.6, y: 3.25, w: 4.3, h: 1.8
      });
    }

    const cicdPath = path.join(DIAG_DIR, 'fig5_1_gitops_cicd.svg');
    if (fs.existsSync(cicdPath)) {
      s8.addImage({
        path: cicdPath,
        x: 5.1, y: 1.15, w: 4.3, h: 3.9
      });
    }

    s8.addNotes(
      "Slide 8 showcases our dynamic traffic governance, self-healing resilience, and automated delivery pipeline. " +
      "On the top left, you see our 90/10 canary deployment in action. Through declarative Istio VirtualService weights, we routed 90% of traffic to stable v1 and 10% to canary v2 without restarting pods or modifying DNS. " +
      "In our 10,000-request benchmark, actual v1 received 89.84% and v2 received 10.16%, demonstrating an ultra-precise routing variance of ±0.16%. " +
      "On the bottom left, the Envoy Outlier Detection state machine provides automated circuit breaking. When a pod emits 3 consecutive 5xx errors, Envoy ejects the unhealthy instance in just 180 ms—well below our 200 ms target—preventing cascading thread exhaustion. " +
      "On the right, our automated GitOps pipeline using GitHub Actions and ArgoCD compiles multi-stage Docker builds into hardened distroless images under 65MB with zero CVEs, deploying with zero downtime."
    );
  }

  // =========================================================================
  // SLIDE 9: MONITORING AND TESTING
  // =========================================================================
  {
    const s9 = pres.addSlide();
    applyStandardHeaderFooter(s9, 9, 'Full-Stack Observability & Cloud-Native Verification', 'Observability & Testing');

    const obsDashPath = path.join(ILLUS_DIR, 'observability_dashboard_mockup.svg');
    if (fs.existsSync(obsDashPath)) {
      s9.addImage({
        path: obsDashPath,
        x: 0.6, y: 1.15, w: 4.8, h: 3.9
      });
    }

    const testPyrPath = path.join(DIAG_DIR, 'fig6_1_testing_pyramid.svg');
    if (fs.existsSync(testPyrPath)) {
      s9.addImage({
        path: testPyrPath,
        x: 5.6, y: 1.15, w: 3.8, h: 2.2
      });
    }

    s9.addShape(pres.ShapeType.roundRect, {
      x: 5.6, y: 3.45, w: 3.8, h: 1.6,
      rectRadius: 0.08, fill: { color: C_BG_CARD }, line: { color: C_EMERALD, width: 1.2 }
    });

    const testBullets = [
      '• Unit Tests: 86.7% to 91.2% code coverage across Go, Python, and Java.',
      '• API Contracts: 48/48 REST & gRPC endpoints verified via Newman.',
      '• Stress Load: k6 sustained 1,840 RPS at peak and 2,210 RPS under stress.',
      '• Chaos Fault Injection: Zero lost transactions during simulated pod kills.',
      '• Security: 0 Critical / 0 High CVEs on Trivy static container scan.'
    ];

    s9.addText([
      { text: 'Empirical Verification Summary\n', options: { fontSize: 11, bold: true, color: C_EMERALD_LIGHT } },
      { text: testBullets.join('\n'), options: { fontSize: 8.8, color: C_TEXT_BODY } }
    ], {
      x: 5.8, y: 3.52, w: 3.4, h: 1.48,
      fontFace: 'Segoe UI', margin: 0
    });

    s9.addNotes(
      "Slide 9 demonstrates our observability integration and testing pyramid rigor. " +
      "On the left is our unified observability dashboard. Envoy sidecars export L7 metrics on port 15090, scraped every 15 seconds by Prometheus. Grafana plots real-time latency distributions showing p50 at 11.6ms, p90 at 18.2ms, and p99 at 24.8ms under 1,000 concurrent RPS. " +
      "Below that, our Jaeger distributed trace waterfall visualizes the millisecond latency allocation for each hop: 1.2ms at Kong, 0.8ms in Envoy ingress, 5.4ms in the Booking Service, and 3.1ms in Flight Catalog gRPC. " +
      "Because W3C traceparent headers propagate transparently across all containers, our Mean Time to Detect network degradations dropped from 15 minutes down to under 25 seconds. " +
      "On the right, our testing pyramid spans automated unit tests with over 86% coverage, 48 Postman API contracts, Chaos Mesh resilience testing, and container vulnerability scans with zero CVEs."
    );
  }

  // =========================================================================
  // SLIDE 10: EMPIRICAL PERFORMANCE RESULTS
  // =========================================================================
  {
    const s10 = pres.addSlide();
    applyStandardHeaderFooter(s10, 10, 'Empirical Performance Benchmarks & Quality Gates', 'Empirical Results');

    const kpiCards = [
      { metric: '1,840 RPS', label: 'Peak Sustained Load', threshold: 'Target: ≥ 1,500 RPS', status: 'PASS (+22.7%)', x: 0.6, color: C_EMERALD },
      { metric: '3.82 ms', label: 'p99 Service Mesh Tax', threshold: 'Target: < 4.5 ms', status: 'PASS (0.68ms margin)', x: 2.1, color: C_CYAN },
      { metric: '180 ms', label: 'Circuit Breaker Trip', threshold: 'Target: < 200 ms', status: 'PASS (3x 5xx error)', x: 3.6, color: C_BLUE },
      { metric: '99.98%', label: 'Cluster Availability', threshold: 'Target: ≥ 99.95%', status: 'PASS (4h stress)', x: 5.1, color: C_PURPLE },
      { metric: '100%', label: 'Inter-Pod Encryption', threshold: 'Target: 100% TLS 1.3', status: 'PASS (0 plain bytes)', x: 6.6, color: C_EMERALD },
      { metric: '±0.16%', label: 'Canary Routing Variance', threshold: 'Target: ±1.5%', status: 'PASS (10,000 reqs)', x: 8.1, color: C_CYAN_LIGHT }
    ];

    kpiCards.forEach(k => {
      s10.addShape(pres.ShapeType.roundRect, {
        x: k.x, y: 1.15, w: 1.35, h: 1.6,
        rectRadius: 0.08, fill: { color: C_BG_CARD }, line: { color: k.color, width: 1.5 }
      });
      s10.addText(k.metric, {
        x: k.x + 0.05, y: 1.25, w: 1.25, h: 0.38,
        fontFace: 'Segoe UI', fontSize: 16, bold: true, color: k.color, align: 'center', margin: 0
      });
      s10.addText(k.label, {
        x: k.x + 0.05, y: 1.68, w: 1.25, h: 0.35,
        fontFace: 'Segoe UI', fontSize: 9.5, bold: true, color: C_WHITE, align: 'center', margin: 0
      });
      s10.addText(k.threshold, {
        x: k.x + 0.05, y: 2.08, w: 1.25, h: 0.25,
        fontFace: 'Segoe UI', fontSize: 8, color: C_TEXT_MUTED, align: 'center', margin: 0
      });
      s10.addText(k.status, {
        x: k.x + 0.05, y: 2.40, w: 1.25, h: 0.25,
        fontFace: 'Segoe UI', fontSize: 8.5, bold: true, color: C_EMERALD_LIGHT, align: 'center', margin: 0
      });
    });

    const perfChartPath = path.join(ILLUS_DIR, 'performance_chart.svg');
    if (fs.existsSync(perfChartPath)) {
      s10.addImage({
        path: perfChartPath,
        x: 0.6, y: 2.9, w: 8.8, h: 2.15
      });
    }

    s10.addNotes(
      "Slide 10 presents our verifiable empirical benchmark results recorded on our dedicated Gigabit hardware testbed. " +
      "Every metric shown directly corresponds to Table 6.1 and Table 7.1 in our approved report. " +
      "First, our sustained peak throughput reached 1,840 requests per second under 1,500 concurrent virtual users, exceeding the 1,500 RPS acceptance threshold by 22.7%. " +
      "Second is our headline architectural measurement: the 'Service Mesh Tax'. Injecting two Envoy proxies per network hop introduced an average p99 latency overhead of only 3.82 milliseconds at 1,000 RPS. This easily fulfills the project requirement of remaining under 4.5 milliseconds. " +
      "Third, under artificial fault injection, the circuit breaker tripped and isolated failing pods in 180 milliseconds, preserving 99.98% availability with zero dropped transactions. " +
      "Finally, packet sniffing confirmed 100% TLS 1.3 inter-pod encryption, and canary routing maintained an exceptional variance of only ±0.16%."
    );
  }

  // =========================================================================
  // SLIDE 11: CHALLENGES, COST AND SUSTAINABLE IMPACT
  // =========================================================================
  {
    const s11 = pres.addSlide();
    applyStandardHeaderFooter(s11, 11, 'Engineering Challenges, Cost Savings & SDG Impact', 'Feasibility & Sustainability');

    const costSdgPath = path.join(ILLUS_DIR, 'cost_and_sdg_infographic.svg');
    if (fs.existsSync(costSdgPath)) {
      s11.addImage({
        path: costSdgPath,
        x: 0.6, y: 1.15, w: 8.8, h: 2.75
      });
    }

    const challenges = [
      {
        title: 'Sidecar Loopback Redirection Fix',
        desc: 'Envoy outbound traffic looped infinitely inside iptables netns. Resolved by configuring ISTIO_OUTBOUND_OVERRIDE rule to bypass UID 1337.',
        x: 0.6, y: 4.02, w: 2.8, h: 1.08, color: C_BLUE
      },
      {
        title: 'Cold-Start Surge Pre-Warming',
        desc: 'Sudden 0 to 2k RPS ramps saturated initial HTTP/2 pools (default: 10). Configured maxConnections: 100 in DestinationRule, cutting cold latency to <18ms.',
        x: 3.6, y: 4.02, w: 2.8, h: 1.08, color: C_CYAN
      },
      {
        title: '94.6% CapEx & SDG Alignment',
        desc: 'Replaced ₹2,20,000+ Dell enterprise rack servers with ₹10,300 Raspberry Pi 4 edge node. Distroless images cut idle CPU energy by 38% (SDG 9 & 12).',
        x: 6.6, y: 4.02, w: 2.8, h: 1.08, color: C_EMERALD
      }
    ];

    challenges.forEach(c => {
      s11.addShape(pres.ShapeType.roundRect, {
        x: c.x, y: c.y, w: c.w, h: c.h,
        rectRadius: 0.08, fill: { color: C_BG_CARD }, line: { color: c.color, width: 1.0 }
      });
      s11.addText([
        { text: `${c.title}\n`, options: { fontSize: 10, bold: true, color: c.color } },
        { text: c.desc, options: { fontSize: 8.6, color: C_TEXT_BODY } }
      ], {
        x: c.x + 0.1, y: c.y + 0.08, w: c.w - 0.2, h: c.h - 0.16,
        fontFace: 'Segoe UI', margin: 0
      });
    });

    s11.addNotes(
      "Slide 11 addresses the real-world engineering hurdles we solved, alongside the techno-economic feasibility and sustainability impact. " +
      "During early implementation, we faced three major challenges: " +
      "First, outbound proxy traffic looped infinitely in iptables. We engineered an ISTIO_OUTBOUND_OVERRIDE rule binding to Envoy UID 1337 to bypass loopback. " +
      "Second, cold-start traffic bursts caused brief HTTP 503 errors; we mitigated this by tuning Envoy connection pool settings and pre-warming TCP sockets. " +
      "From an economic standpoint, typical enterprise deployments require over ₹2,20,000 in dedicated Dell servers and hardware load balancers. We proved that production-grade zero-trust service mesh validation can be achieved on a ₹10,300 edge-cloud prototype utilizing a Raspberry Pi 4—a 94.6% hardware capital reduction. " +
      "Furthermore, our architecture advances UN Sustainable Development Goal 9 by democratizing enterprise resilience for SMEs, and SDG 12 by cutting compute idle cycles by 38% through lightweight distroless containers."
    );
  }

  // =========================================================================
  // SLIDE 12: TEAM AND FUTURE SCOPE
  // =========================================================================
  {
    const s12 = pres.addSlide();
    applyStandardHeaderFooter(s12, 12, 'Engineering Governance & Architectural Roadmap', 'Team & Roadmap');

    const teamCards = [
      {
        name: 'Bandaru Sai Venkat Ram', id: '2300031764', role: 'Lead Architect',
        contrib: 'Authored C4 models, ratified ADR-01..06, configured Kong Ingress TLS & Istio VirtualService canary rules.',
        obj: 'Owned: O1, O4', x: 0.6, color: C_CYAN
      },
      {
        name: 'Davuluri Bala Gopal', id: '2300032878', role: 'DevOps & Infra Lead',
        contrib: 'Constructed multi-stage Dockerfiles (<65MB), Helm charts, GitHub Actions CI/CD, and Pi 4 K3s cluster.',
        obj: 'Owned: O2, O4', x: 2.85, color: C_BLUE
      },
      {
        name: 'Akaramsetty Siva Sai', id: '2300033233', role: 'Backend Services Lead',
        contrib: 'Developed Go Auth Service, Python Flight Service, Spring Boot Saga Orchestrator, and unit test suites.',
        obj: 'Owned: O3', x: 5.1, color: C_EMERALD
      },
      {
        name: 'Rohid Baig', id: '2300039146', role: 'Integration & QA Lead',
        contrib: 'Integrated Prometheus, Grafana, Jaeger; configured Istio strict mTLS; executed k6 stress benchmarks.',
        obj: 'Owned: O5', x: 7.35, color: C_PURPLE
      }
    ];

    teamCards.forEach(t => {
      s12.addShape(pres.ShapeType.roundRect, {
        x: t.x, y: 1.15, w: 2.15, h: 2.1,
        rectRadius: 0.08, fill: { color: C_BG_CARD }, line: { color: t.color, width: 1.2 }
      });
      s12.addText([
        { text: `${t.name}\n`, options: { fontSize: 10.2, bold: true, color: C_WHITE } },
        { text: `ID: ${t.id} • ${t.role}\n\n`, options: { fontSize: 8.5, bold: true, color: t.color } },
        { text: `${t.contrib}\n\n`, options: { fontSize: 8.4, color: C_TEXT_BODY } },
        { text: t.obj, options: { fontSize: 8.5, bold: true, color: C_EMERALD_LIGHT } }
      ], {
        x: t.x + 0.1, y: 1.22, w: 1.95, h: 1.95,
        fontFace: 'Segoe UI', margin: 0
      });
    });

    s12.addText('PRIORITIZED FUTURE WORK & RESEARCH TRAJECTORIES (CHAPTER 10.6)', {
      x: 0.6, y: 3.42, w: 8.8, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 10.5, bold: true, color: C_CYAN_LIGHT, margin: 0
    });

    const roadmap = [
      {
        title: 'Trajectory 1: eBPF & Ambient Mesh',
        desc: 'Transition from sidecar proxies to Istio Ambient Mesh / Cilium eBPF, eliminating per-pod memory overhead (~46MB) and bypassing Linux TCP/IP stack layers in the kernel.',
        x: 0.6, y: 3.70, w: 2.8, h: 1.38, color: C_CYAN
      },
      {
        title: 'Trajectory 2: WebAssembly Extensibility',
        desc: 'Author custom Envoy proxy filters compiled in Rust to WebAssembly (Wasm) for dynamic, low-latency payload transformations and policy enforcement directly at the proxy layer.',
        x: 3.6, y: 3.70, w: 2.8, h: 1.38, color: C_BLUE
      },
      {
        title: 'Trajectory 3: Multi-Cluster Federation',
        desc: 'Extend Istio service mesh across multi-region hybrid clouds (AWS EKS + GCP GKE) to achieve active-active disaster recovery and sub-second failover across geographical zones.',
        x: 6.6, y: 3.70, w: 2.8, h: 1.38, color: C_PURPLE
      }
    ];

    roadmap.forEach(r => {
      s12.addShape(pres.ShapeType.roundRect, {
        x: r.x, y: r.y, w: r.w, h: r.h,
        rectRadius: 0.08, fill: { color: C_BG_CARD_LIGHT }, line: { color: r.color, width: 1.0 }
      });
      s12.addText([
        { text: `${r.title}\n`, options: { fontSize: 10.5, bold: true, color: r.color } },
        { text: r.desc, options: { fontSize: 8.8, color: C_TEXT_BODY } }
      ], {
        x: r.x + 0.12, y: r.y + 0.1, w: r.w - 0.24, h: r.h - 0.2,
        fontFace: 'Segoe UI', margin: 0
      });
    });

    s12.addNotes(
      "Slide 12 outlines our engineering team governance and future research trajectories. " +
      "The project was executed by four dedicated team members in Cluster A: " +
      "Bandaru Sai Venkat Ram served as Lead Architect, owning C4 modeling, ADR ratification, and Istio routing policies. " +
      "Davuluri Bala Gopal led DevOps, crafting multi-stage Docker builds under 65MB, Helm packaging, and the K3s edge cluster. " +
      "Akaramsetty Siva Sai authored the backend microservices and the Spring Boot Saga orchestrator. " +
      "Rohid Baig integrated the full observability pipeline, configured strict mTLS, and executed k6 stress testing. " +
      "Looking forward to production scale-up, we establish three prioritized research trajectories: " +
      "First, migrating to Istio Ambient Mesh and Cilium eBPF to bypass socket overhead in the Linux kernel; " +
      "Second, implementing WebAssembly plugins in Rust for real-time L7 payload filtering; " +
      "And third, multi-cluster mesh federation across AWS EKS and Google Cloud GKE for active-active multi-region failover."
    );
  }

  // =========================================================================
  // SLIDE 13: CONCLUSION AND THANK YOU
  // =========================================================================
  {
    const s13 = pres.addSlide();
    s13.background = { color: '050814' };

    const closePath = path.join(ILLUS_DIR, 'conclusion_closing_graphic.svg');
    if (fs.existsSync(closePath)) {
      s13.addImage({ path: closePath, x: 0, y: 0, w: 10.0, h: 5.625 });
    }

    s13.addNotes(
      "In conclusion, our capstone project successfully designs, implements, and empirically validates an integrated Cloud-Native API Gateway and Istio Service Mesh architecture. " +
      "We demonstrated that zero-trust security, sub-4 millisecond latency overhead, dynamic canary steering, and automated distributed tracing can be achieved transparently without modifying business domain code. " +
      "All five engineering objectives, twelve quality acceptance gates, and ISO 25010 standards were fully satisfied with zero architectural waivers. " +
      "We express our sincere gratitude to our faculty supervisor Mr. BVN Prasad Paruchuri, project coordinator Mrs. P. Anusha, Head of Department Dr. A. Senthil, and the Department of Computer Science and Engineering at KLEF. " +
      "We now welcome any questions and feedback from the examination panel. Thank you."
    );
  }

  // Output filename
  const outPptx = path.join(__dirname, 'Persistent_Airways_Cloud_Native_Architecture_13Slides.pptx');
  await pres.writeFile({ fileName: outPptx });
  console.log(`Successfully generated presentation: ${outPptx}`);
  return outPptx;
}

buildPresentation().catch(err => {
  console.error('Error generating presentation:', err);
  process.exit(1);
});
