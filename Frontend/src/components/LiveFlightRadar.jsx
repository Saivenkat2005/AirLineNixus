import React, { useState, useEffect } from "react";
import { 
  Radar, 
  Search, 
  Clock, 
  Plane, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ChevronRight, 
  MapPin,
  Calendar
} from "lucide-react";
import { api } from "../services/api";

export default function LiveFlightRadar() {
  const [flightQuery, setFlightQuery] = useState("PA-101");
  const [trackedFlight, setTrackedFlight] = useState(null);
  const [allTracking, setAllTracking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshSeconds, setRefreshSeconds] = useState(15);

  const fetchFlightTrack = async (query = flightQuery) => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const data = await api.trackFlight(query);
      setTrackedFlight(data);
    } catch (err) {
      setError(`No active telemetry found for flight "${query}". Try PA-101, PA-202, or PA-303.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTelemetry = async () => {
    try {
      const list = await api.getAllTracking();
      if (Array.isArray(list) && list.length > 0) {
        setAllTracking(list);
        if (!trackedFlight) {
          setTrackedFlight(list[0]);
          setFlightQuery(list[0].flightNumber);
        }
      }
    } catch (e) {
      console.warn("Telemetry fetch error:", e);
    }
  };

  useEffect(() => {
    fetchAllTelemetry();
    fetchFlightTrack("PA-101");
  }, []);

  // Auto-refresh timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshSeconds((sec) => {
        if (sec <= 1) {
          if (flightQuery) fetchFlightTrack(flightQuery);
          return 15;
        }
        return sec - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [flightQuery]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
      
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Radar className="w-4 h-4 animate-spin text-cyan-400" />
            </span>
            <h2 className="text-xl font-bold text-white font-display">
              Intelligent Live Flight Radar & Monitoring
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time verified aircraft positions, departure countdowns, delay alerts, and gate changes.
          </p>
        </div>

        {/* Auto Refresh Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>RADAR REFRESH IN: <strong className="text-cyan-300">{refreshSeconds}s</strong></span>
        </div>
      </div>

      {/* ─── Search Bar ─────────────────────────────────────────────── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchFlightTrack(flightQuery);
        }}
        className="flex gap-2 max-w-xl"
      >
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/10 focus-within:border-cyan-400">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={flightQuery}
            onChange={(e) => setFlightQuery(e.target.value)}
            placeholder="Search Flight Number (e.g. PA-101, PA-202, PA-303)"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-cyan-500 hover:from-primary-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20"
        >
          {loading ? "Tracking..." : "Track Live"}
        </button>
      </form>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ─── Active Flight Card Display ─────────────────────────────── */}
      {trackedFlight && (
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                  {trackedFlight.flightNumber}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {trackedFlight.airline} • {trackedFlight.aircraftType}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-display mt-2">
                {trackedFlight.origin} → {trackedFlight.destination}
              </h3>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${
                trackedFlight.status === "IN_AIR"
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                  : trackedFlight.status === "BOARDING"
                  ? "bg-amber-500/20 border-amber-400 text-amber-300"
                  : trackedFlight.status === "LANDED"
                  ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                  : "bg-slate-700/30 border-slate-600 text-slate-300"
              }`}>
                ● {trackedFlight.status}
              </span>
              {trackedFlight.delayMinutes > 0 && (
                <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-rose-500/20 border border-rose-500 text-rose-300">
                  DELAYED +{trackedFlight.delayMinutes}m
                </span>
              )}
            </div>
          </div>

          {/* Flight Progress Bar */}
          <div className="space-y-2 py-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>{trackedFlight.originCode} ({trackedFlight.scheduledDeparture})</span>
              <span className="text-cyan-400 font-bold">{trackedFlight.progressPercent}% COMPLETED</span>
              <span>{trackedFlight.destinationCode} ({trackedFlight.scheduledArrival})</span>
            </div>
            
            <div className="relative w-full h-3 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-600 to-cyan-400 transition-all duration-500 rounded-full"
                style={{ width: `${trackedFlight.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Operational Flight Telemetry Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono">
            <div>
              <p className="text-slate-400">BOARDING GATE</p>
              <p className="text-base font-bold text-white mt-0.5">{trackedFlight.gate}</p>
            </div>
            <div>
              <p className="text-slate-400">TERMINAL</p>
              <p className="text-base font-bold text-white mt-0.5">{trackedFlight.terminal}</p>
            </div>
            <div>
              <p className="text-slate-400">BAGGAGE CAROUSEL</p>
              <p className="text-base font-bold text-white mt-0.5">{trackedFlight.baggageBelt}</p>
            </div>
            <div>
              <p className="text-slate-400">TELEMETRY SYNC</p>
              <p className="text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ─── Active Fleet Overview ──────────────────────────────────── */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
          Scheduled Fleet In Radar Range
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {allTracking.map((f) => (
            <div
              key={f.flightId}
              onClick={() => {
                setTrackedFlight(f);
                setFlightQuery(f.flightNumber);
              }}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                trackedFlight?.flightId === f.flightId
                  ? "bg-cyan-500/10 border-cyan-400 text-white shadow-md shadow-cyan-500/10"
                  : "bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-cyan-300">{f.flightNumber}</span>
                <span className="text-[10px] text-slate-400">{f.status}</span>
              </div>
              <p className="text-xs font-semibold text-white mt-1">
                {f.originCode} → {f.destinationCode}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
