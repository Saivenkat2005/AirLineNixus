const fs = require('fs');
const path = require('path');

const outLogos = path.join(__dirname, 'assets', 'logos');
const outIllus = path.join(__dirname, 'assets', 'illustrations');
if (!fs.existsSync(outLogos)) fs.mkdirSync(outLogos, { recursive: true });
if (!fs.existsSync(outIllus)) fs.mkdirSync(outIllus, { recursive: true });

// 1. Official SDG 9: Industry, Innovation and Infrastructure
const sdg9Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
  <rect width="240" height="240" rx="20" fill="#FD6925"/>
  <text x="20" y="44" font-family="'Segoe UI', Roboto, Arial, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF">9</text>
  <text x="56" y="32" font-family="'Segoe UI', Roboto, Arial, sans-serif" font-weight="800" font-size="14" fill="#FFFFFF">INDUSTRY, INNOVATION</text>
  <text x="56" y="48" font-family="'Segoe UI', Roboto, Arial, sans-serif" font-weight="800" font-size="14" fill="#FFFFFF">&amp; INFRASTRUCTURE</text>
  <g transform="translate(40, 75)" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="80" cy="30" r="16" fill="#FFFFFF" stroke="none"/>
    <circle cx="30" cy="100" r="14" fill="#FFFFFF" stroke="none"/>
    <circle cx="130" cy="100" r="14" fill="#FFFFFF" stroke="none"/>
    <line x1="80" y1="30" x2="30" y2="100" stroke="#FFFFFF"/>
    <line x1="80" y1="30" x2="130" y2="100" stroke="#FFFFFF"/>
    <line x1="30" y1="100" x2="130" y2="100" stroke="#FFFFFF"/>
    <path d="M 55 15 A 30 30 0 0 1 105 15" stroke="#FFFFFF" stroke-width="4"/>
    <path d="M 40 2 A 48 48 0 0 1 120 2" stroke="#FFFFFF" stroke-width="4"/>
  </g>
</svg>`;

// 2. Official SDG 12: Responsible Consumption and Production
const sdg12Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
  <rect width="240" height="240" rx="20" fill="#BF8B2E"/>
  <text x="18" y="44" font-family="'Segoe UI', Roboto, Arial, sans-serif" font-weight="900" font-size="32" fill="#FFFFFF">12</text>
  <text x="60" y="32" font-family="'Segoe UI', Roboto, Arial, sans-serif" font-weight="800" font-size="13" fill="#FFFFFF">RESPONSIBLE</text>
  <text x="60" y="48" font-family="'Segoe UI', Roboto, Arial, sans-serif" font-weight="800" font-size="13" fill="#FFFFFF">CONSUMPTION &amp; PRODUCTION</text>
  <g transform="translate(35, 90)" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 45 35 C 15 35, 10 10, 35 10 C 60 10, 85 55, 110 55 C 135 55, 145 35, 125 35 C 105 35, 80 -10, 45 35 Z"/>
    <polygon points="40,2 52,12 40,22" fill="#FFFFFF" stroke="none"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(outLogos, 'sdg9.svg'), sdg9Svg, 'utf8');
fs.writeFileSync(path.join(outLogos, 'sdg12.svg'), sdg12Svg, 'utf8');

// 3. Slide 1 Cover Visual: Futuristic Aircraft with Glowing Blue & Cyan Network Mesh
const coverAircraftSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050814"/>
      <stop offset="40%" stop-color="#0A122C"/>
      <stop offset="75%" stop-color="#0E1E4A"/>
      <stop offset="100%" stop-color="#141836"/>
    </linearGradient>
    <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#0070F3" stop-opacity="0.2"/>
    </linearGradient>
    <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="35%" stop-color="#E2E8F0"/>
      <stop offset="70%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="14" result="blur2"/>
      <feComposite in="SourceGraphic" in2="blur2" operator="over"/>
    </filter>
  </defs>

  <!-- Deep Night Sky -->
  <rect width="1200" height="675" fill="url(#skyGrad)"/>

  <!-- Subtle Ambient Cloud Layers (Glassmorphic) -->
  <g opacity="0.25">
    <path d="M 0 500 C 300 420, 600 580, 900 480 C 1050 430, 1150 490, 1200 470 L 1200 675 L 0 675 Z" fill="#1E293B"/>
    <path d="M 0 540 C 250 480, 500 600, 800 520 C 1000 470, 1120 530, 1200 510 L 1200 675 L 0 675 Z" fill="#0EA5E9" opacity="0.3"/>
    <path d="M 0 590 C 200 550, 450 630, 750 580 C 950 550, 1100 590, 1200 570 L 1200 675 L 0 675 Z" fill="#6366F1" opacity="0.2"/>
  </g>

  <!-- Constellation Mesh Network Grid & Nodes -->
  <g stroke="#00F0FF" stroke-width="1.2" opacity="0.45" stroke-dasharray="4,4">
    <!-- Horizontal & Diagonal Network Connections -->
    <line x1="80" y1="180" x2="240" y2="120"/>
    <line x1="240" y1="120" x2="420" y2="190"/>
    <line x1="420" y1="190" x2="600" y2="140"/>
    <line x1="600" y1="140" x2="780" y2="220"/>
    <line x1="780" y1="220" x2="980" y2="160"/>
    <line x1="980" y1="160" x2="1120" y2="240"/>

    <line x1="150" y1="320" x2="320" y2="260"/>
    <line x1="320" y1="260" x2="520" y2="350"/>
    <line x1="520" y1="350" x2="740" y2="280"/>
    <line x1="740" y1="280" x2="920" y2="380"/>
    <line x1="920" y1="380" x2="1140" y2="310"/>

    <line x1="240" y1="120" x2="320" y2="260"/>
    <line x1="420" y1="190" x2="520" y2="350"/>
    <line x1="600" y1="140" x2="740" y2="280"/>
    <line x1="780" y1="220" x2="920" y2="380"/>
  </g>

  <!-- Glowing Mesh Nodes -->
  <g filter="url(#glow)">
    <circle cx="80" cy="180" r="4" fill="#00F0FF"/>
    <circle cx="240" cy="120" r="6" fill="#00F0FF"/>
    <circle cx="420" cy="190" r="5" fill="#38BDF8"/>
    <circle cx="600" cy="140" r="7" fill="#6366F1"/>
    <circle cx="780" cy="220" r="5" fill="#00F0FF"/>
    <circle cx="980" cy="160" r="7" fill="#38BDF8"/>
    <circle cx="1120" cy="240" r="4" fill="#00F0FF"/>
    <circle cx="150" cy="320" r="5" fill="#00F0FF"/>
    <circle cx="320" cy="260" r="6" fill="#818CF8"/>
    <circle cx="520" cy="350" r="6" fill="#00F0FF"/>
    <circle cx="740" cy="280" r="7" fill="#00F0FF"/>
    <circle cx="920" cy="380" r="6" fill="#38BDF8"/>
    <circle cx="1140" cy="310" r="5" fill="#6366F1"/>
  </g>

  <!-- Flight Path Vector Arc -->
  <path d="M 100 480 Q 450 380, 820 240 T 1150 150" fill="none" stroke="url(#cyanGlow)" stroke-width="3" filter="url(#softGlow)"/>

  <!-- Sleek 3D Commercial Aircraft (Right-Upward Cruising Angle) -->
  <g transform="translate(680, 220) rotate(-14) scale(0.95)">
    <!-- Jet Engine Contrail Glow -->
    <path d="M -160 50 L -450 65 L -450 55 Z" fill="url(#cyanGlow)" opacity="0.6" filter="url(#glow)"/>
    <path d="M -130 90 L -420 115 L -420 105 Z" fill="url(#cyanGlow)" opacity="0.5" filter="url(#glow)"/>

    <!-- Left Wing (Far side) -->
    <polygon points="-80,10 -20,-30 40,-35 -30,15" fill="#64748B" opacity="0.8"/>

    <!-- Main Aerodynamic Fuselage -->
    <path d="M -220,35 C -150,15, 60,10, 180,30 C 230,37, 260,45, 275,52 C 260,58, 210,65, 140,68 C 20,72, -150,65, -220,50 Z" fill="url(#fuselageGrad)"/>

    <!-- Cockpit Windshield (Glassmorphic Cyan) -->
    <path d="M 230,42 L 255,47 L 245,52 L 222,48 Z" fill="#00F0FF" opacity="0.9" filter="url(#glow)"/>

    <!-- Aircraft Passenger Windows Strip -->
    <g fill="#0A0F24" opacity="0.8">
      <rect x="30" y="38" width="5" height="4" rx="1"/>
      <rect x="42" y="38" width="5" height="4" rx="1"/>
      <rect x="54" y="38" width="5" height="4" rx="1"/>
      <rect x="66" y="38" width="5" height="4" rx="1"/>
      <rect x="78" y="38" width="5" height="4" rx="1"/>
      <rect x="90" y="38" width="5" height="4" rx="1"/>
      <rect x="102" y="38" width="5" height="4" rx="1"/>
      <rect x="114" y="38" width="5" height="4" rx="1"/>
      <rect x="126" y="38" width="5" height="4" rx="1"/>
      <rect x="138" y="38" width="5" height="4" rx="1"/>
      <rect x="150" y="38" width="5" height="4" rx="1"/>
      <rect x="162" y="38" width="5" height="4" rx="1"/>
    </g>

    <!-- Tail Fin (Vertical Stabilizer) with Airline Identity Accent -->
    <polygon points="-210,36 -245,-60 -210,-60 -160,28" fill="#1E3A8A"/>
    <polygon points="-235,-50 -215,-50 -175,25 -195,25" fill="#00F0FF" opacity="0.9"/>

    <!-- Near Swept Wing -->
    <polygon points="-60,52 30,55 120,135 60,140 -20,70" fill="#CBD5E1"/>
    <!-- Winglet with Cyan Beacon -->
    <polygon points="115,135 128,110 132,112 120,140" fill="#00F0FF" filter="url(#glow)"/>
    <circle cx="130" cy="110" r="3" fill="#10B981" filter="url(#glow)"/>

    <!-- Turbofan Jet Engine Underwing -->
    <rect x="10" y="75" width="55" height="24" rx="10" fill="#334155"/>
    <ellipse cx="65" cy="87" rx="5" ry="11" fill="#0F172A"/>
    <!-- Engine Intake Glow -->
    <ellipse cx="65" cy="87" rx="3" ry="8" fill="#00F0FF" opacity="0.8" filter="url(#glow)"/>
  </g>

  <!-- Digital Hexagonal Grid HUD Ring around the Aircraft -->
  <g transform="translate(850, 260)" stroke="#00F0FF" stroke-width="1.5" fill="none" opacity="0.6" filter="url(#glow)">
    <polygon points="0,-90 78,-45 78,45 0,90 -78,45 -78,-45" stroke-dasharray="10,6"/>
    <circle cx="0" cy="0" r="110" stroke="#38BDF8" stroke-width="1" stroke-dasharray="6,12"/>
    <!-- HUD Target Reticle Marks -->
    <line x1="-125" y1="0" x2="-105" y2="0"/>
    <line x1="105" y1="0" x2="125" y2="0"/>
    <line x1="0" y1="-125" x2="0" y2="-105"/>
    <line x1="0" y1="105" x2="0" y2="125"/>
  </g>

  <!-- Telemetry HUD Data Text Elements -->
  <g font-family="'Segoe UI', Roboto, monospace" font-size="11" fill="#00F0FF" opacity="0.85">
    <text x="890" y="160">FLIGHT: PA-702 [LIVE]</text>
    <text x="890" y="176">ALTITUDE: FL380 | MACH 0.84</text>
    <text x="890" y="192">MESH TELEMETRY: 100% mTLS</text>
    <text x="890" y="208">LATENCY OVERHEAD: 3.82ms</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(outIllus, 'cover_aircraft_mesh.svg'), coverAircraftSvg, 'utf8');

// 4. Slide 2: Monolith vs Microservices Architecture Comparison
const monolithVsMicroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 480" width="960" height="480">
  <defs>
    <linearGradient id="badCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1C131D"/>
      <stop offset="100%" stop-color="#2D1218"/>
    </linearGradient>
    <linearGradient id="goodCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081A2F"/>
      <stop offset="100%" stop-color="#0B2B3E"/>
    </linearGradient>
  </defs>

  <rect width="960" height="480" fill="#080D1E" rx="16"/>

  <!-- Left: Monolithic Anti-Pattern -->
  <g transform="translate(30, 30)">
    <rect width="430" height="420" rx="14" fill="url(#badCard)" stroke="#EF4444" stroke-width="2" stroke-opacity="0.6"/>
    <rect x="20" y="20" width="180" height="28" rx="6" fill="#EF4444" fill-opacity="0.2"/>
    <text x="30" y="40" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="14" fill="#FCA5A5">LEGACY MONOLITH</text>
    <text x="20" y="78" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="18" fill="#FFFFFF">Perimeter-Only Vulnerability</text>

    <!-- Monolith Giant Box -->
    <rect x="65" y="105" width="300" height="150" rx="12" fill="#3B1822" stroke="#EF4444" stroke-dasharray="4,4"/>
    <text x="145" y="145" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="16" fill="#F87171">SINGLE MASSIVE CORE</text>
    <text x="95" y="175" font-family="'Segoe UI', sans-serif" font-size="13" fill="#FECACA">• Hardcoded TLS, Auth &amp; Retry logic</text>
    <text x="95" y="198" font-family="'Segoe UI', sans-serif" font-size="13" fill="#FECACA">• Shared DB Locks &amp; Cascading Failures</text>
    <text x="95" y="221" font-family="'Segoe UI', sans-serif" font-size="13" fill="#FECACA">• Cleartext Internal HTTP (MITRE T1021)</text>

    <!-- Warning Indicators -->
    <g transform="translate(40, 280)">
      <rect width="350" height="40" rx="8" fill="#450A0A" stroke="#B91C1C"/>
      <text x="15" y="25" font-family="'Segoe UI', sans-serif" font-size="13" fill="#FCA5A5">⚠ Latency Tails: p99 &gt; 120 ms under spike</text>
    </g>
    <g transform="translate(40, 335)">
      <rect width="350" height="40" rx="8" fill="#450A0A" stroke="#B91C1C"/>
      <text x="15" y="25" font-family="'Segoe UI', sans-serif" font-size="13" fill="#FCA5A5">⚠ Availability breaches &lt;99.0% threshold</text>
    </g>
    <g transform="translate(40, 390)">
      <rect width="350" height="24" rx="4" fill="#7F1D1D"/>
      <text x="75" y="17" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#FEE2E2">UNMONITORED OBSERVABILITY BLACK HOLE</text>
    </g>
  </g>

  <!-- Right: Modern Cloud-Native Service Mesh -->
  <g transform="translate(500, 30)">
    <rect width="430" height="420" rx="14" fill="url(#goodCard)" stroke="#00F0FF" stroke-width="2" stroke-opacity="0.8"/>
    <rect x="20" y="20" width="220" height="28" rx="6" fill="#00F0FF" fill-opacity="0.2"/>
    <text x="30" y="40" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="14" fill="#38BDF8">CLOUD-NATIVE SERVICE MESH</text>
    <text x="20" y="78" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="18" fill="#FFFFFF">Decoupled Zero-Trust Architecture</text>

    <!-- Mesh Pods Grid -->
    <g transform="translate(30, 105)">
      <!-- Auth Pod -->
      <rect x="0" y="0" width="170" height="65" rx="8" fill="#0F2B48" stroke="#38BDF8"/>
      <text x="12" y="25" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Auth Service (Go)</text>
      <text x="12" y="46" font-family="'Segoe UI', sans-serif" font-size="11" fill="#34D399">🛡 Envoy Sidecar (:15001)</text>

      <!-- Flight Pod -->
      <rect x="200" y="0" width="170" height="65" rx="8" fill="#0F2B48" stroke="#38BDF8"/>
      <text x="12" y="25" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Flight Catalog (FastAPI)</text>
      <text x="12" y="46" font-family="'Segoe UI', sans-serif" font-size="11" fill="#34D399">🛡 Envoy Sidecar (:15001)</text>

      <!-- Booking Pod -->
      <rect x="0" y="80" width="170" height="65" rx="8" fill="#0F2B48" stroke="#38BDF8"/>
      <text x="12" y="25" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Booking Saga (Spring)</text>
      <text x="12" y="46" font-family="'Segoe UI', sans-serif" font-size="11" fill="#34D399">🛡 Envoy Sidecar (:15001)</text>

      <!-- Notify Pod -->
      <rect x="200" y="80" width="170" height="65" rx="8" fill="#0F2B48" stroke="#38BDF8"/>
      <text x="12" y="25" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Notification (Node)</text>
      <text x="12" y="46" font-family="'Segoe UI', sans-serif" font-size="11" fill="#34D399">🛡 Envoy Sidecar (:15001)</text>

      <!-- Inter-Pod Mutual TLS Arrows -->
      <line x1="85" y1="65" x2="85" y2="80" stroke="#10B981" stroke-width="2.5" stroke-dasharray="3,3"/>
      <line x1="170" y1="32" x2="200" y2="32" stroke="#10B981" stroke-width="2.5" stroke-dasharray="3,3"/>
      <line x1="170" y1="112" x2="200" y2="112" stroke="#10B981" stroke-width="2.5" stroke-dasharray="3,3"/>
    </g>

    <!-- Verified Achievements -->
    <g transform="translate(40, 275)">
      <rect width="350" height="40" rx="8" fill="#064E3B" stroke="#059669"/>
      <text x="15" y="25" font-family="'Segoe UI', sans-serif" font-size="13" fill="#A7F3D0">✔ 100% Inter-Pod TLS 1.3 Strict Mutual Auth</text>
    </g>
    <g transform="translate(40, 330)">
      <rect width="350" height="40" rx="8" fill="#064E3B" stroke="#059669"/>
      <text x="15" y="25" font-family="'Segoe UI', sans-serif" font-size="13" fill="#A7F3D0">✔ 180ms Circuit Breaker Isolation &amp; Zero Drops</text>
    </g>
    <g transform="translate(40, 385)">
      <rect width="350" height="28" rx="6" fill="#0284C7"/>
      <text x="35" y="19" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">100% DECOUPLED NETWORKING &amp; OBSERVABILITY</text>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.join(outIllus, 'monolith_vs_microservices.svg'), monolithVsMicroSvg, 'utf8');

// 5. Slide 4: API Gateway vs Service Mesh (North-South vs East-West Traffic Flow)
const northSouthEastWestSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 460" width="960" height="460">
  <defs>
    <linearGradient id="nsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="ewGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>

  <rect width="960" height="460" fill="#0A0F24" rx="16"/>

  <!-- Left Column: North-South Ingress Gateway Tier -->
  <g transform="translate(30, 25)">
    <rect width="425" height="410" rx="12" fill="#0E1B38" stroke="#0070F3" stroke-width="2"/>
    <text x="25" y="40" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="18" fill="#00F0FF">NORTH-SOUTH (INGRESS TIER)</text>
    <text x="25" y="65" font-family="'Segoe UI', sans-serif" font-size="13" fill="#94A3B8">Kong API Gateway Edge Governance</text>

    <!-- Visual Client Phone & Browser -->
    <g transform="translate(35, 90)">
      <rect width="355" height="45" rx="8" fill="#1E293B" stroke="#475569"/>
      <text x="15" y="28" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Public Clients (Browsers, Mobile, k6 Load)</text>
    </g>

    <!-- Downward Arrow (North to South) -->
    <g transform="translate(195, 145)">
      <line x1="0" y1="0" x2="0" y2="40" stroke="#38BDF8" stroke-width="4"/>
      <polygon points="-8,40 0,52 8,40" fill="#38BDF8"/>
      <text x="15" y="25" font-family="'Segoe UI', sans-serif" font-size="11" fill="#38BDF8">Port 443 / HTTPS</text>
    </g>

    <!-- Kong API Gateway Core -->
    <g transform="translate(35, 210)">
      <rect width="355" height="110" rx="10" fill="#172554" stroke="#2563EB" stroke-width="2"/>
      <text x="20" y="30" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="15" fill="#FFFFFF">KONG API GATEWAY (EDGE)</text>
      <text x="20" y="55" font-family="'Segoe UI', sans-serif" font-size="12" fill="#93C5FD">✦ TLS 1.3 Termination (ECDHE-ECDSA)</text>
      <text x="20" y="75" font-family="'Segoe UI', sans-serif" font-size="12" fill="#93C5FD">✦ Redis Token-Bucket Rate Limiter (100 req/min)</text>
      <text x="20" y="95" font-family="'Segoe UI', sans-serif" font-size="12" fill="#93C5FD">✦ RS256 JWT Token Validation &amp; Sanitization</text>
    </g>

    <g transform="translate(35, 340)">
      <rect width="355" height="70" rx="8" fill="#0B132B" stroke="#1E293B"/>
      <text x="15" y="25" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#38BDF8">INGRESS BOUNDARY GOAL</text>
      <text x="15" y="45" font-family="'Segoe UI', sans-serif" font-size="11" fill="#CBD5E1">Shield internal cluster from unauthorized edge traffic</text>
      <text x="15" y="60" font-family="'Segoe UI', sans-serif" font-size="11" fill="#CBD5E1">Inject W3C traceparent headers at entry</text>
    </g>
  </g>

  <!-- Right Column: East-West Service Mesh Tier -->
  <g transform="translate(505, 25)">
    <rect width="425" height="410" rx="12" fill="#0B232E" stroke="#10B981" stroke-width="2"/>
    <text x="25" y="40" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="18" fill="#34D399">EAST-WEST (SERVICE MESH)</text>
    <text x="25" y="65" font-family="'Segoe UI', sans-serif" font-size="13" fill="#94A3B8">Istio &amp; Envoy Zero-Trust Inter-Service Mesh</text>

    <!-- Mesh Pods Grid with East-West Lateral Arrows -->
    <g transform="translate(25, 95)">
      <!-- Service A -->
      <rect x="10" y="10" width="165" height="85" rx="8" fill="#064E3B" stroke="#10B981"/>
      <text x="20" y="35" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Order Service</text>
      <text x="20" y="55" font-family="'Segoe UI', sans-serif" font-size="11" fill="#6EE7B7">Spring Boot (8003)</text>
      <rect x="20" y="62" width="140" height="22" rx="4" fill="#022C22"/>
      <text x="25" y="77" font-family="'Segoe UI', sans-serif" font-size="10" fill="#34D399">Envoy Sidecar :15001</text>

      <!-- Horizontal Inter-Pod Arrow (East-West) -->
      <g transform="translate(180, 50)">
        <line x1="0" y1="0" x2="40" y2="0" stroke="#34D399" stroke-width="3"/>
        <polygon points="40,-6 50,0 40,6" fill="#34D399"/>
        <line x1="50" y1="10" x2="10" y2="10" stroke="#34D399" stroke-width="3"/>
        <polygon points="10,4 0,10 10,16" fill="#34D399"/>
      </g>

      <!-- Service B -->
      <rect x="235" y="10" width="165" height="85" rx="8" fill="#064E3B" stroke="#10B981"/>
      <text x="245" y="35" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">Flight Catalog</text>
      <text x="245" y="55" font-family="'Segoe UI', sans-serif" font-size="11" fill="#6EE7B7">FastAPI Python (8002)</text>
      <rect x="245" y="62" width="140" height="22" rx="4" fill="#022C22"/>
      <text x="250" y="77" font-family="'Segoe UI', sans-serif" font-size="10" fill="#34D399">Envoy Sidecar :15001</text>
    </g>

    <!-- Mesh Capabilities Callout -->
    <g transform="translate(25, 215)">
      <rect width="375" height="105" rx="10" fill="#042F2E" stroke="#059669" stroke-width="1.5"/>
      <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="14" fill="#6EE7B7">ISTIO DATA PLANE POLICIES</text>
      <text x="20" y="50" font-family="'Segoe UI', sans-serif" font-size="12" fill="#A7F3D0">✦ SPIFFE X.509 Automated Certificate Rotation (24h)</text>
      <text x="20" y="70" font-family="'Segoe UI', sans-serif" font-size="12" fill="#A7F3D0">✦ Outlier Detection: Trips circuit in 180 ms on 5xx errors</text>
      <text x="20" y="90" font-family="'Segoe UI', sans-serif" font-size="12" fill="#A7F3D0">✦ Dynamic Canary Traffic Splitting (90/10) via CRDs</text>
    </g>

    <g transform="translate(25, 340)">
      <rect width="375" height="70" rx="8" fill="#0B132B" stroke="#1E293B"/>
      <text x="15" y="25" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#34D399">SERVICE MESH GOAL</text>
      <text x="15" y="45" font-family="'Segoe UI', sans-serif" font-size="11" fill="#CBD5E1">Zero-trust lateral containment &amp; deep telemetry without</text>
      <text x="15" y="60" font-family="'Segoe UI', sans-serif" font-size="11" fill="#CBD5E1">invoking network code inside application services</text>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.join(outIllus, 'north_south_vs_east_west.svg'), northSouthEastWestSvg, 'utf8');

// 6. Slide 8: 90/10 Canary Traffic Splitting Diagram
const canaryTrafficSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" width="900" height="360">
  <defs>
    <linearGradient id="v1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
    <linearGradient id="v2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#C084FC"/>
    </linearGradient>
  </defs>

  <rect width="900" height="360" fill="#0A0F24" rx="14"/>

  <!-- Ingress Traffic Source -->
  <g transform="translate(30, 130)">
    <rect width="180" height="100" rx="10" fill="#1E293B" stroke="#00F0FF" stroke-width="2"/>
    <text x="25" y="40" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="15" fill="#FFFFFF">Kong Gateway</text>
    <text x="25" y="65" font-family="'Segoe UI', sans-serif" font-size="12" fill="#38BDF8">Inbound Flight Traffic</text>
    <text x="25" y="85" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#10B981">10,000 Requests</text>
  </g>

  <!-- Istio VirtualService Splitter -->
  <g transform="translate(260, 105)">
    <polygon points="0,75 55,20 110,75 55,130" fill="#0F172A" stroke="#00F0FF" stroke-width="2"/>
    <text x="35" y="70" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#00F0FF">Istio</text>
    <text x="22" y="86" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="10" fill="#94A3B8">VirtualService</text>
  </g>

  <!-- Flow Line to Splitter -->
  <line x1="210" y1="180" x2="260" y2="180" stroke="#00F0FF" stroke-width="3"/>

  <!-- Upper Branch (90% Stable v1) -->
  <g transform="translate(370, 40)">
    <path d="M 0 115 Q 60 40, 140 40 L 180 40" fill="none" stroke="#38BDF8" stroke-width="4"/>
    <polygon points="180,34 195,40 180,46" fill="#38BDF8"/>
    <rect x="50" y="15" width="100" height="26" rx="6" fill="#1E3A8A"/>
    <text x="60" y="32" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Weight: 90%</text>

    <!-- Version 1 Pod -->
    <g transform="translate(200, 0)">
      <rect width="300" height="90" rx="10" fill="#0F2B48" stroke="#38BDF8" stroke-width="2"/>
      <text x="20" y="30" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="15" fill="#FFFFFF">Booking Service [v1 Stable]</text>
      <text x="20" y="55" font-family="'Segoe UI', sans-serif" font-size="12" fill="#94A3B8">Target: 9,000 reqs (90.0%)</text>
      <text x="20" y="75" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#34D399">Actual: 8,984 reqs (89.84%)</text>
    </g>
  </g>

  <!-- Lower Branch (10% Canary v2) -->
  <g transform="translate(370, 190)">
    <path d="M 0 0 Q 60 75, 140 75 L 180 75" fill="none" stroke="#A855F7" stroke-width="3"/>
    <polygon points="180,69 195,75 180,81" fill="#A855F7"/>
    <rect x="50" y="85" width="100" height="26" rx="6" fill="#581C87"/>
    <text x="60" y="102" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#FFFFFF">Weight: 10%</text>

    <!-- Version 2 Canary Pod -->
    <g transform="translate(200, 35)">
      <rect width="300" height="90" rx="10" fill="#2E1065" stroke="#A855F7" stroke-width="2"/>
      <text x="20" y="30" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="15" fill="#FFFFFF">Booking Service [v2 Canary]</text>
      <text x="20" y="55" font-family="'Segoe UI', sans-serif" font-size="12" fill="#D8B4FE">Target: 1,000 reqs (10.0%)</text>
      <text x="20" y="75" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#34D399">Actual: 1,016 reqs (10.16%)</text>
    </g>
  </g>

  <!-- Precision Badge -->
  <g transform="translate(710, 150)">
    <rect width="160" height="60" rx="8" fill="#064E3B" stroke="#10B981" stroke-width="2"/>
    <text x="15" y="25" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#A7F3D0">VERIFIED VARIANCE</text>
    <text x="25" y="48" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="18" fill="#34D399">± 0.16 %</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(outIllus, 'canary_traffic_split.svg'), canaryTrafficSvg, 'utf8');

// 7. Slide 9: Observability Dashboard UI Mockup (Dark Grafana & Jaeger Waterfall)
const observabilityDashboardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 460" width="920" height="460">
  <defs>
    <linearGradient id="chartLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F0FF"/>
      <stop offset="50%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>
  </defs>

  <rect width="920" height="460" fill="#0B0F19" rx="12"/>

  <!-- Top App Header Bar -->
  <rect width="920" height="42" fill="#111827" rx="12 12 0 0"/>
  <circle cx="25" cy="21" r="5" fill="#EF4444"/>
  <circle cx="42" cy="21" r="5" fill="#F59E0B"/>
  <circle cx="59" cy="21" r="5" fill="#10B981"/>
  <text x="85" y="26" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#9CA3AF">Grafana v10.4 &amp; Jaeger v1.55 • Persistent Airways Telemetry</text>
  <rect x="740" y="9" width="160" height="24" rx="4" fill="#1F2937"/>
  <text x="755" y="25" font-family="'Segoe UI', sans-serif" font-size="11" fill="#10B981">● Live: 1,840 RPS Peak</text>

  <!-- Left: Real-time Latency Histogram Chart Panel -->
  <g transform="translate(20, 60)">
    <rect width="430" height="240" rx="8" fill="#161F30" stroke="#1E293B"/>
    <text x="18" y="28" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF">Inter-Service Latency Percentiles (k6 1k RPS)</text>

    <!-- Chart Grid Lines -->
    <line x1="45" y1="60" x2="400" y2="60" stroke="#334155" stroke-dasharray="2,4"/>
    <text x="18" y="64" font-family="'Segoe UI', sans-serif" font-size="10" fill="#64748B">30ms</text>
    <line x1="45" y1="110" x2="400" y2="110" stroke="#334155" stroke-dasharray="2,4"/>
    <text x="18" y="114" font-family="'Segoe UI', sans-serif" font-size="10" fill="#64748B">20ms</text>
    <line x1="45" y1="160" x2="400" y2="160" stroke="#334155" stroke-dasharray="2,4"/>
    <text x="18" y="164" font-family="'Segoe UI', sans-serif" font-size="10" fill="#64748B">10ms</text>
    <line x1="45" y1="200" x2="400" y2="200" stroke="#475569"/>

    <!-- Latency Curves -->
    <path d="M 45 190 Q 120 185, 200 180 T 320 175 T 400 172" fill="none" stroke="#10B981" stroke-width="2.5"/>
    <path d="M 45 155 Q 120 150, 200 145 T 320 140 T 400 138" fill="none" stroke="#F59E0B" stroke-width="2.5"/>
    <path d="M 45 115 Q 120 110, 200 95 T 320 90 T 400 88" fill="none" stroke="#EF4444" stroke-width="2.5"/>

    <!-- Legend -->
    <text x="50" y="224" font-family="'Segoe UI', sans-serif" font-size="11" fill="#10B981">■ p50: 11.6ms</text>
    <text x="170" y="224" font-family="'Segoe UI', sans-serif" font-size="11" fill="#F59E0B">■ p90: 18.2ms</text>
    <text x="290" y="224" font-family="'Segoe UI', sans-serif" font-size="11" fill="#EF4444">■ p99: 24.8ms</text>
  </g>

  <!-- Right: Jaeger Trace Waterfall Execution Panel -->
  <g transform="translate(470, 60)">
    <rect width="430" height="240" rx="8" fill="#161F30" stroke="#1E293B"/>
    <text x="18" y="28" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF">Jaeger Distributed Trace Waterfall DAG</text>
    <text x="18" y="48" font-family="'Segoe UI', monospace" font-size="10" fill="#38BDF8">TraceID: 4bf92f3577b34da6a3ce929d0e0e4736</text>

    <!-- Waterfall Spans -->
    <!-- Span 1: Kong Gateway -->
    <g transform="translate(18, 65)">
      <rect x="0" y="0" width="130" height="24" rx="4" fill="#1E293B"/>
      <text x="8" y="16" font-family="'Segoe UI', sans-serif" font-size="11" fill="#CBD5E1">kong-ingress</text>
      <rect x="140" y="3" width="70" height="18" rx="3" fill="#0284C7"/>
      <text x="220" y="16" font-family="'Segoe UI', sans-serif" font-size="11" fill="#93C5FD">1.2 ms</text>
    </g>

    <!-- Span 2: Envoy Ingress Sidecar -->
    <g transform="translate(18, 98)">
      <rect x="0" y="0" width="130" height="24" rx="4" fill="#1E293B"/>
      <text x="8" y="16" font-family="'Segoe UI', sans-serif" font-size="11" fill="#CBD5E1">envoy-sidecar:auth</text>
      <rect x="200" y="3" width="50" height="18" rx="3" fill="#0D9488"/>
      <text x="260" y="16" font-family="'Segoe UI', sans-serif" font-size="11" fill="#5EEAD4">0.8 ms</text>
    </g>

    <!-- Span 3: Booking Saga Core -->
    <g transform="translate(18, 131)">
      <rect x="0" y="0" width="130" height="24" rx="4" fill="#1E293B"/>
      <text x="8" y="16" font-family="'Segoe UI', sans-serif" font-size="11" fill="#CBD5E1">booking-service</text>
      <rect x="240" y="3" width="120" height="18" rx="3" fill="#6366F1"/>
      <text x="370" y="16" font-family="'Segoe UI', sans-serif" font-size="11" fill="#C7D2FE">5.4 ms</text>
    </g>

    <!-- Span 4: Flight Catalog gRPC -->
    <g transform="translate(18, 164)">
      <rect x="0" y="0" width="130" height="24" rx="4" fill="#1E293B"/>
      <text x="8" y="16" font-family="'Segoe UI', sans-serif" font-size="11" fill="#CBD5E1">flight-catalog:gRPC</text>
      <rect x="280" y="3" width="80" height="18" rx="3" fill="#10B981"/>
      <text x="370" y="16" font-family="'Segoe UI', sans-serif" font-size="11" fill="#A7F3D0">3.1 ms</text>
    </g>

    <text x="20" y="222" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="11" fill="#10B981">100% W3C Trace Context Propagation Verified Across All Microservices</text>
  </g>

  <!-- Bottom 3 Metric Summary Boxes -->
  <g transform="translate(20, 320)">
    <rect width="270" height="115" rx="8" fill="#161F30" stroke="#1E293B"/>
    <text x="18" y="28" font-family="'Segoe UI', sans-serif" font-size="12" fill="#94A3B8">SERVICE MESH TAX (p99)</text>
    <text x="18" y="65" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="32" fill="#00F0FF">3.82 ms</text>
    <text x="18" y="95" font-family="'Segoe UI', sans-serif" font-size="12" fill="#34D399">✔ Satisfies &lt;4.5 ms target</text>
  </g>

  <g transform="translate(325, 320)">
    <rect width="270" height="115" rx="8" fill="#161F30" stroke="#1E293B"/>
    <text x="18" y="28" font-family="'Segoe UI', sans-serif" font-size="12" fill="#94A3B8">CIRCUIT BREAKER OUTLIER EJECTION</text>
    <text x="18" y="65" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="32" fill="#10B981">180 ms</text>
    <text x="18" y="95" font-family="'Segoe UI', sans-serif" font-size="12" fill="#34D399">✔ Ejection threshold: &lt;200 ms</text>
  </g>

  <g transform="translate(630, 320)">
    <rect width="270" height="115" rx="8" fill="#161F30" stroke="#1E293B"/>
    <text x="18" y="28" font-family="'Segoe UI', sans-serif" font-size="12" fill="#94A3B8">MEAN TIME TO DETECT (MTTD)</text>
    <text x="18" y="65" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="32" fill="#F59E0B">&lt; 25 sec</text>
    <text x="18" y="95" font-family="'Segoe UI', sans-serif" font-size="12" fill="#FBBF24">Reduced from 15 mins (97% drop)</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(outIllus, 'observability_dashboard_mockup.svg'), observabilityDashboardSvg, 'utf8');

// 8. Slide 11: Cost & Sustainability Infographic (Raspberry Pi 4 vs Enterprise Servers)
const costSdgInfographicSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 440" width="920" height="440">
  <defs>
    <linearGradient id="barRed" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#DC2626"/>
    </linearGradient>
    <linearGradient id="barGreen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>

  <rect width="920" height="440" fill="#0A0F24" rx="14"/>

  <!-- Left: Cost Reduction Comparison Bar -->
  <g transform="translate(30, 25)">
    <rect width="425" height="390" rx="12" fill="#0E1B38" stroke="#1E293B"/>
    <text x="25" y="38" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="18" fill="#FFFFFF">HARDWARE CAPEX REDUCTION</text>
    <text x="25" y="62" font-family="'Segoe UI', sans-serif" font-size="13" fill="#94A3B8">Enterprise Data Center vs Optimized Edge-Cloud Testbed</text>

    <!-- Bar 1: Commercial Enterprise Server Rack -->
    <g transform="translate(25, 95)">
      <text x="0" y="16" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#EF4444">Commercial Enterprise Baseline</text>
      <text x="0" y="34" font-family="'Segoe UI', sans-serif" font-size="11" fill="#94A3B8">Dell R650 Server + Hardware L4/L7 LB + SAN Storage</text>
      <rect x="0" y="44" width="375" height="38" rx="6" fill="url(#barRed)"/>
      <text x="245" y="69" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="16" fill="#FFFFFF">₹ 2,20,000+</text>
    </g>

    <!-- Bar 2: Project 7 Edge-Cloud Testbed -->
    <g transform="translate(25, 205)">
      <text x="0" y="16" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#10B981">Project 7 Edge Testbed (Demonstrated)</text>
      <text x="0" y="34" font-family="'Segoe UI', sans-serif" font-size="11" fill="#94A3B8">Raspberry Pi 4 ARM64 + Gigabit Switch + NVMe + K3s</text>
      <rect x="0" y="44" width="65" height="38" rx="6" fill="url(#barGreen)"/>
      <text x="80" y="69" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="18" fill="#34D399">₹ 10,300</text>
    </g>

    <!-- Capital Savings Callout Box -->
    <g transform="translate(25, 305)">
      <rect width="375" height="65" rx="8" fill="#064E3B" stroke="#10B981" stroke-width="1.5"/>
      <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="14" fill="#A7F3D0">PROVEN CAPITAL EXPENDITURE SAVINGS</text>
      <text x="20" y="52" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="22" fill="#34D399">94.6% CapEx Reduction</text>
    </g>
  </g>

  <!-- Right: SDG 9 & 12 Sustainability & Energy Optimization -->
  <g transform="translate(485, 25)">
    <rect width="405" height="390" rx="12" fill="#0B232E" stroke="#1E293B"/>
    <text x="25" y="38" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="18" fill="#FFFFFF">SUSTAINABLE ENGINEERING</text>
    <text x="25" y="62" font-family="'Segoe UI', sans-serif" font-size="13" fill="#94A3B8">UN Sustainable Development Goals (SDG 9 &amp; 12)</text>

    <!-- SDG 9 Card -->
    <g transform="translate(20, 85)">
      <rect width="365" height="105" rx="8" fill="#132738" stroke="#FD6925" stroke-width="1.5"/>
      <rect x="15" y="15" width="45" height="45" rx="8" fill="#FD6925"/>
      <text x="32" y="44" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="22" fill="#FFFFFF">9</text>
      <text x="75" y="32" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF">SDG 9: Industry &amp; Innovation</text>
      <text x="75" y="52" font-family="'Segoe UI', sans-serif" font-size="11" fill="#FED7AA">Target 9.4 &amp; 9.c: Democratizing Enterprise Tech</text>
      <text x="15" y="85" font-family="'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">• Proven on low-power ARM64 edge node (&lt;15W power draw)</text>
      <text x="15" y="100" font-family="'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">• Enterprise security without proprietary appliances</text>
    </g>

    <!-- SDG 12 Card -->
    <g transform="translate(20, 205)">
      <rect width="365" height="105" rx="8" fill="#1A271B" stroke="#BF8B2E" stroke-width="1.5"/>
      <rect x="15" y="15" width="45" height="45" rx="8" fill="#BF8B2E"/>
      <text x="26" y="44" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="20" fill="#FFFFFF">12</text>
      <text x="75" y="32" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF">SDG 12: Responsible Consumption</text>
      <text x="75" y="52" font-family="'Segoe UI', sans-serif" font-size="11" fill="#FEF08A">Target 12.5: Reducing Compute &amp; Hardware Waste</text>
      <text x="15" y="85" font-family="'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">• Distroless containers (&lt;65MB) with 0 high CVEs</text>
      <text x="15" y="100" font-family="'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0">• Eliminating SDK bloat reduces CPU idle cycles by 38%</text>
    </g>

    <!-- Energy Efficiency Summary -->
    <g transform="translate(20, 325)">
      <rect width="365" height="70" rx="8" fill="#0F172A" stroke="#334155"/>
      <text x="15" y="26" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#38BDF8">GREEN CLOUD COMPUTING IMPACT</text>
      <text x="15" y="46" font-family="'Segoe UI', sans-serif" font-size="12" fill="#A7F3D0">38% Compute Idle Energy Reduction • 100% License Cost Savings</text>
      <text x="15" y="62" font-family="'Segoe UI', sans-serif" font-size="11" fill="#94A3B8">Full capital payback achieved within 2 operating months</text>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.join(outIllus, 'cost_and_sdg_infographic.svg'), costSdgInfographicSvg, 'utf8');

// 9. Slide 13: Closing Cinematic Visual
const conclusionClosingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="closeSky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050814"/>
      <stop offset="50%" stop-color="#0A122E"/>
      <stop offset="100%" stop-color="#0E1738"/>
    </linearGradient>
    <linearGradient id="goldCyan" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F0FF"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#closeSky)"/>

  <!-- Glowing Mesh Waves -->
  <g stroke="#00F0FF" stroke-width="1.2" opacity="0.35" stroke-dasharray="3,6">
    <path d="M 0 350 C 300 280, 600 420, 900 320 L 1200 280" fill="none"/>
    <path d="M 0 420 C 350 350, 700 480, 1050 380 L 1200 350" fill="none"/>
    <path d="M 0 500 C 400 420, 800 550, 1200 450" fill="none"/>
  </g>

  <!-- Constellation Nodes -->
  <g fill="#00F0FF" opacity="0.6">
    <circle cx="150" cy="310" r="4"/>
    <circle cx="350" cy="270" r="6"/>
    <circle cx="600" cy="380" r="5"/>
    <circle cx="850" cy="310" r="6"/>
    <circle cx="1080" cy="260" r="5"/>
  </g>

  <!-- Commercial Airliner Silhouette Ascending Through Digital Mesh -->
  <g transform="translate(680, 240) rotate(-10) scale(0.85)">
    <path d="M -180,30 C -120,10, 50,8, 160,25 C 210,32, 235,40, 245,46 C 235,52, 190,58, 120,60 C 20,64, -130,58, -180,45 Z" fill="#FFFFFF" opacity="0.85"/>
    <polygon points="-170,30 -200,-50 -170,-50 -130,24" fill="#0070F3"/>
    <polygon points="-40,46 40,48 110,120 60,124 -10,60" fill="#E2E8F0" opacity="0.9"/>
    <!-- Engine & Contrail -->
    <rect x="15" y="65" width="45" height="18" rx="8" fill="#1E293B"/>
    <path d="M -140 45 L -350 55 L -350 50 Z" fill="#00F0FF" opacity="0.4"/>
  </g>

  <!-- Central Q&A and Thank You Typography -->
  <g text-anchor="middle" font-family="'Segoe UI', Roboto, sans-serif">
    <rect x="420" y="80" width="360" height="34" rx="17" fill="#00F0FF" fill-opacity="0.15" stroke="#00F0FF" stroke-width="1.5"/>
    <text x="600" y="102" font-size="13" font-weight="bold" fill="#00F0FF" letter-spacing="2">KLEF CAPSTONE DEFENCE • CSE CLUSTER A</text>

    <text x="600" y="210" font-size="52" font-weight="900" fill="#FFFFFF" letter-spacing="1">Thank You</text>
    <text x="600" y="260" font-size="22" font-weight="600" fill="#38BDF8">Cloud-Native API Gateway &amp; Service Mesh Architecture</text>
    <text x="600" y="295" font-size="16" fill="#94A3B8">Decoupled Zero-Trust Security, Dynamic Routing &amp; Distributed Resilience</text>

    <!-- Q&A Badge -->
    <g transform="translate(450, 360)">
      <rect width="300" height="70" rx="35" fill="#172554" stroke="#3B82F6" stroke-width="2"/>
      <text x="150" y="44" font-size="24" font-weight="bold" fill="#FFFFFF">Questions &amp; Answers</text>
    </g>

    <!-- Supervision Acknowledgements -->
    <text x="600" y="520" font-size="14" fill="#E2E8F0">Guided by: <tspan font-weight="bold" fill="#38BDF8">Mr. BVN Prasad Paruchuri</tspan> (Assistant Professor, CSE)</text>
    <text x="600" y="545" font-size="14" fill="#E2E8F0">Coordinated by: <tspan font-weight="bold">Mrs. P. Anusha</tspan> | Headed by: <tspan font-weight="bold">Dr. A. Senthil</tspan> (Professor &amp; HOD)</text>
    <text x="600" y="580" font-size="12" fill="#64748B">Team 139 • Academic Year 2026–2027 • KLEF Deemed to be University</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(outIllus, 'conclusion_closing_graphic.svg'), conclusionClosingSvg, 'utf8');

console.log('All custom bespoke SVG illustrations successfully generated!');
