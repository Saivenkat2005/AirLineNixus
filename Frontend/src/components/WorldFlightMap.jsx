import React, { useState, useEffect } from "react";
import { 
  Compass, 
  MapPin, 
  Plane, 
  Navigation, 
  Clock, 
  ChevronRight, 
  Layers,
  Sparkles 
} from "lucide-react";
import { api } from "../services/api";

const AIRPORT_COORDINATES = {
  JFK: { x: 280, y: 155, name: "New York (JFK)", country: "USA" },
  LAX: { x: 190, y: 175, name: "Los Angeles (LAX)", country: "USA" },
  LHR: { x: 470, y: 125, name: "London (LHR)", country: "UK" },
  DEL: { x: 670, y: 185, name: "New Delhi (DEL)", country: "India" },
  BOM: { x: 655, y: 215, name: "Mumbai (BOM)", country: "India" },
  BLR: { x: 670, y: 245, name: "Bangalore (BLR)", country: "India" },
  DXB: { x: 590, y: 195, name: "Dubai (DXB)", country: "UAE" },
  HND: { x: 830, y: 175, name: "Tokyo (HND)", country: "Japan" },
  CDG: { x: 485, y: 140, name: "Paris (CDG)", country: "France" },
};

export default function WorldFlightMap({ onSelectRoute, flights = [] }) {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [hoveredHub, setHoveredHub] = useState(null);

  useEffect(() => {
    async function loadRoutes() {
      try {
        const data = await api.getFlightRoutes();
        if (Array.isArray(data) && data.length > 0) {
          setRoutes(data);
          setSelectedRoute(data[0]);
        } else if (flights.length > 0) {
          const fallbackRoutes = flights.map((f) => ({
            flightId: f.flightId || f.id,
            flightName: f.flightName || "ANX-101",
            origin: f.origin,
            originCode: extractCode(f.origin),
            destination: f.destination,
            destinationCode: extractCode(f.destination),
            aircraftType: f.aircraftType || "Boeing 777",
            takeOffTime: f.takeOffTime,
            arrivalTime: f.arrivalTime,
          }));
          setRoutes(fallbackRoutes);
          setSelectedRoute(fallbackRoutes[0]);
        }
      } catch (e) {
        console.warn("World routes fallback.", e);
      }
    }
    loadRoutes();
  }, [flights]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
      
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Compass className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white font-display">
              Smart Global Flight Route Network
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time visual map of verified airline corridors, intercontinental routes, and hub connections.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            {routes.length} Active Corridors
          </span>
        </div>
      </div>

      {/* ─── Interactive SVG World Flight Map Stage ─────────────────── */}
      <div className="relative w-full aspect-[2/1] min-h-[380px] max-h-[520px] rounded-2xl bg-gradient-to-b from-[#030b1c] to-[#010611] border border-white/10 overflow-hidden flex items-center justify-center">
        
        {/* Subtle Map Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Global Continents Outlines Silhouette */}
        <svg 
          viewBox="0 0 1000 500" 
          className="w-full h-full object-cover select-none relative z-10"
        >
          {/* Continents (Stylized Minimal Path) */}
          <path
            d="M150,120 Q220,100 270,140 Q320,170 300,240 Q250,280 180,240 Z"
            fill="rgba(56, 189, 248, 0.04)"
            stroke="rgba(56, 189, 248, 0.15)"
            strokeWidth="1"
          />
          <path
            d="M440,80 Q520,70 560,110 Q580,180 500,210 Q420,180 440,80 Z"
            fill="rgba(56, 189, 248, 0.04)"
            stroke="rgba(56, 189, 248, 0.15)"
            strokeWidth="1"
          />
          <path
            d="M600,120 Q750,90 850,140 Q880,240 760,260 Q650,230 600,120 Z"
            fill="rgba(56, 189, 248, 0.04)"
            stroke="rgba(56, 189, 248, 0.15)"
            strokeWidth="1"
          />

          {/* Draw Curved Great-Circle Flight Routes */}
          {routes.map((route, i) => {
            const orig = AIRPORT_COORDINATES[route.originCode] || AIRPORT_COORDINATES.DEL;
            const dest = AIRPORT_COORDINATES[route.destinationCode] || AIRPORT_COORDINATES.BOM;
            const isSelected = selectedRoute?.flightId === route.flightId;

            // Compute midpoint arc control point
            const midX = (orig.x + dest.x) / 2;
            const midY = Math.min(orig.y, dest.y) - 40;
            const pathD = `M ${orig.x} ${orig.y} Q ${midX} ${midY} ${dest.x} ${dest.y}`;

            return (
              <g key={i} className="cursor-pointer" onClick={() => setSelectedRoute(route)}>
                {/* Glow route line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isSelected ? "#00f2fe" : "rgba(56, 189, 248, 0.3)"}
                  strokeWidth={isSelected ? "2.5" : "1.2"}
                  strokeDasharray={isSelected ? "none" : "4,3"}
                  className="transition-all duration-300"
                />

                {/* Animated aircraft dot along route */}
                {isSelected && (
                  <circle cx={midX} cy={midY + 5} r="4" fill="#00f2fe">
                    <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Draw Hub Nodes */}
          {Object.entries(AIRPORT_COORDINATES).map(([code, hub]) => (
            <g
              key={code}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredHub(hub)}
              onMouseLeave={() => setHoveredHub(null)}
            >
              {/* Pulse ripple */}
              <circle cx={hub.x} cy={hub.y} r="10" fill="none" stroke="#00f2fe" strokeWidth="1" opacity="0.4">
                <animate attributeName="r" values="5;14;5" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Center point */}
              <circle cx={hub.x} cy={hub.y} r="3.5" fill="#38bdf8" />

              {/* Code Label */}
              <text
                x={hub.x}
                y={hub.y - 10}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                className="select-none"
              >
                {code}
              </text>
            </g>
          ))}
        </svg>

        {/* Hovered Airport Tooltip */}
        {hoveredHub && (
          <div className="absolute top-4 left-4 p-3 rounded-xl bg-navy-950/90 border border-cyan-400/40 text-xs shadow-xl backdrop-blur-md">
            <p className="font-bold text-white">{hoveredHub.name}</p>
            <p className="text-[10px] text-cyan-300 font-mono">{hoveredHub.country}</p>
          </div>
        )}

      </div>

      {/* ─── Selected Route Details Drawer ───────────────────────────── */}
      {selectedRoute && (
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {selectedRoute.flightName}
              </span>
              <span className="text-xs text-slate-400 font-mono">{selectedRoute.aircraftType}</span>
            </div>
            <p className="text-base font-bold text-white font-display">
              {selectedRoute.origin} → {selectedRoute.destination}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Departure: {selectedRoute.takeOffTime ? selectedRoute.takeOffTime.substring(11, 16) || selectedRoute.takeOffTime : "08:00"}
              </span>
              <span>•</span>
              <span className="text-emerald-400">NON-STOP EXPRESS CORRIDOR</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectRoute && onSelectRoute(selectedRoute)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all self-end sm:self-center"
          >
            <span>Book This Route</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}

function extractCode(str) {
  if (!str) return "DEL";
  if (str.includes("(") && str.includes(")")) {
    const s = str.indexOf("(") + 1;
    const e = str.indexOf(")");
    return str.substring(s, e).toUpperCase();
  }
  return str.substring(0, 3).toUpperCase();
}
