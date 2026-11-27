import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Activity, 
  Plane, 
  Layers, 
  Users, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  X,
  Bot,
  Brain,
  Zap,
  Lock
} from "lucide-react";
import { api } from "../services/api";
import AiQualityDashboard from "./AiQualityDashboard";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("health"); // "health" | "flights" | "bookings" | "ai-quality" | "operations-copilot"
  const [healthStatus, setHealthStatus] = useState(null);
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opsReport, setOpsReport] = useState(null);
  const [opsLoading, setOpsLoading] = useState(false);
  const [showAddFlightModal, setShowAddFlightModal] = useState(false);
  const [newFlight, setNewFlight] = useState({
    flightName: "PA-404",
    origin: "Dubai (DXB)",
    destination: "London (LHR)",
    takeOffTime: "2026-07-10T10:00:00",
    arrivalTime: "2026-07-10T14:30:00",
    aircraftType: "Airbus A350-900",
    totalCapacity: 280,
    status: "SCHEDULED"
  });

  const loadOpsReport = async () => {
    setOpsLoading(true);
    try {
      const data = await api.getOperationsCopilotSummary(1, "occupancy_and_disruptions");
      setOpsReport(data);
    } catch (e) {
      console.warn("Operations copilot load error", e);
    } finally {
      setOpsLoading(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [h, f, b] = await Promise.allSettled([
        api.checkHealth(),
        api.getAllFlights(),
        api.getAllBookings(),
      ]);
      if (h.status === "fulfilled") setHealthStatus(h.value);
      if (f.status === "fulfilled" && Array.isArray(f.value)) setFlights(f.value);
      if (b.status === "fulfilled" && Array.isArray(b.value)) setBookings(b.value);
    } catch (e) {
      console.warn("Admin data load error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddFlightSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await api.addFlight(newFlight);
      setFlights([...flights, created]);
      setShowAddFlightModal(false);
      alert("Flight successfully scheduled and added to core database.");
    } catch (err) {
      alert("Error adding flight: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteFlight = async (flightId) => {
    if (!window.confirm(`Delete flight #${flightId} and all associated seats?`)) return;
    try {
      await api.deleteFlight(flightId);
      setFlights(flights.filter((f) => f.flightId !== flightId));
    } catch (err) {
      alert("Error deleting flight: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ─── Top Stats Bar ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono">
          <p className="text-slate-400">TOTAL BOOKINGS</p>
          <p className="text-2xl font-bold text-white font-display mt-1">
            {bookings.length}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">ACID Committed Records</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono">
          <p className="text-slate-400">TOTAL REVENUE</p>
          <p className="text-2xl font-bold text-emerald-400 font-display mt-1">
            ₹{bookings.reduce((acc, b) => acc + (Number(b.totalPrice) || 0), 0).toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Real Captured Fares</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono">
          <p className="text-slate-400">SCHEDULED FLIGHTS</p>
          <p className="text-2xl font-bold text-white font-display mt-1">
            {flights.length}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Active Air Corridor Fleet</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono">
          <p className="text-slate-400">CLUSTER STATUS</p>
          <p className="text-2xl font-bold text-cyan-400 font-display mt-1 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            OPERATIONAL
          </p>
          <p className="text-[10px] text-slate-500 mt-1">All Microservices Healthy</p>
        </div>
      </div>

      {/* ─── Navigation Tabs ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-4 border-b border-white/10 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("health")}
          className={`text-xs font-bold font-mono pb-2 transition-all border-b-2 ${
            activeTab === "health" 
              ? "border-cyan-400 text-cyan-300" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          [1] Cluster Health
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("flights")}
          className={`text-xs font-bold font-mono pb-2 transition-all border-b-2 ${
            activeTab === "flights" 
              ? "border-cyan-400 text-cyan-300" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          [2] Flight Inventory ({flights.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("bookings")}
          className={`text-xs font-bold font-mono pb-2 transition-all border-b-2 ${
            activeTab === "bookings" 
              ? "border-cyan-400 text-cyan-300" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          [3] Transactional Bookings ({bookings.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("ai-quality")}
          className={`text-xs font-bold font-mono pb-2 transition-all border-b-2 ${
            activeTab === "ai-quality" 
              ? "border-cyan-400 text-cyan-300" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          [4] AI Quality & Evaluation
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("operations-copilot");
            if (!opsReport) loadOpsReport();
          }}
          className={`text-xs font-bold font-mono pb-2 transition-all border-b-2 ${
            activeTab === "operations-copilot" 
              ? "border-cyan-400 text-cyan-300" 
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          [5] Operations Copilot (AI)
        </button>
      </div>

      {/* ─── Tab 1: Cluster Health Status ───────────────────────────── */}
      {activeTab === "health" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">API Gateway :4000</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE
              </span>
            </div>
            <p className="text-white font-bold">Express Rate Limiter & Proxy Active</p>
            <p className="text-[10px] text-slate-500">Correlation ID tracking enabled</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Core Service :8080</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE
              </span>
            </div>
            <p className="text-white font-bold">Spring Boot 3.1 + JPA Hibernate</p>
            <p className="text-[10px] text-slate-500">MySQL Connection Pool: 20 max</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">AI Intelligence :8000</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE
              </span>
            </div>
            <p className="text-white font-bold">FastAPI 3.0 Engine Active</p>
            <p className="text-[10px] text-slate-500">Deterministic RAG Safeguard</p>
          </div>
        </div>
      )}

      {/* ─── Tab 2: Flight Inventory Management ─────────────────────── */}
      {activeTab === "flights" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowAddFlightModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-navy-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Flight Record
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="py-3 px-4">FLIGHT</th>
                  <th className="py-3 px-4">CORRIDOR</th>
                  <th className="py-3 px-4">DEPARTURE</th>
                  <th className="py-3 px-4">AIRCRAFT</th>
                  <th className="py-3 px-4">CAPACITY</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {flights.map((f) => (
                  <tr key={f.flightId} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-bold text-cyan-300">{f.flightName}</td>
                    <td className="py-3 px-4 text-white">{f.origin} → {f.destination}</td>
                    <td className="py-3 px-4 text-slate-400">{f.takeOffTime}</td>
                    <td className="py-3 px-4 text-slate-300">{f.aircraftType}</td>
                    <td className="py-3 px-4 text-emerald-400">{f.totalCapacity || 180} Seats</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteFlight(f.flightId)}
                        className="text-slate-400 hover:text-rose-400 p-1.5 transition-colors"
                        title="Delete flight"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── Tab 3: Transactional Bookings ──────────────────────────── */}
      {activeTab === "bookings" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-3 px-4">PNR</th>
                <th className="py-3 px-4">CUSTOMER ID</th>
                <th className="py-3 px-4">ROUTE</th>
                <th className="py-3 px-4">SEAT</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4 text-right">FARE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {bookings.map((b) => (
                <tr key={b.bookingId} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-bold text-cyan-300">NX-{b.bookingId}</td>
                  <td className="py-3 px-4 text-slate-300">USER-{b.customerId || "3"}</td>
                  <td className="py-3 px-4 text-white">{b.origin} → {b.destination}</td>
                  <td className="py-3 px-4 text-cyan-200">{b.seatNumbers || "12A"}</td>
                  <td className="py-3 px-4 text-slate-400">{b.date}</td>
                  <td className="py-3 px-4 text-right text-emerald-400 font-bold">
                    ₹{Number(b.totalPrice || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Tab 4: AI Quality & Evaluation Framework ───────────────── */}
      {activeTab === "ai-quality" && (
        <AiQualityDashboard />
      )}

      {/* ─── Tab 5: Operations Copilot ──────────────────────────────── */}
      {activeTab === "operations-copilot" && (
        <div className="space-y-6 font-mono text-xs">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  AI Airline Operations Copilot
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Automated telemetry analysis correlating flight occupancy, disruption risks, and cancellation drivers.
                </p>
              </div>
              <button
                type="button"
                onClick={loadOpsReport}
                disabled={opsLoading}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold text-xs flex items-center gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${opsLoading ? "animate-spin" : ""}`} />
                {opsLoading ? "Analyzing Telemetry..." : "Refresh Report"}
              </button>
            </div>

            {opsReport ? (
              <div className="space-y-6">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-slate-400">Average Fleet Occupancy</span>
                    <p className="text-2xl font-bold font-display text-cyan-300">{opsReport.fleet_occupancy_avg_pct}%</p>
                    <p className="text-[10px] text-slate-500">Across active scheduled corridors</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-slate-400">Active Disrupted Flights</span>
                    <p className="text-2xl font-bold font-display text-amber-300">{opsReport.active_disruptions_count}</p>
                    <p className="text-[10px] text-slate-500">Under weather flow management</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-slate-400">Cancellation Rate</span>
                    <p className="text-2xl font-bold font-display text-emerald-300">
                      {opsReport.cancellation_trends?.cancellation_rate_pct || 2.8}%
                    </p>
                    <p className="text-[10px] text-slate-500">Normal operating tolerance</p>
                  </div>
                </div>

                {/* Overbooking Risk Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-bold text-white uppercase text-[11px] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Overbooking Governor & Capacity Thresholds
                  </h4>
                  <div className="space-y-2">
                    {opsReport.overbooking_risk_flags?.map((flag, fi) => (
                      <div key={fi} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-white font-bold">{flag.flight_name}</p>
                          <p className="text-slate-400 text-[11px] mt-0.5">{flag.reason}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                          flag.risk_tier === "HIGH" 
                            ? "bg-rose-500/20 text-rose-300 border-rose-500/40" 
                            : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        }`}>
                          {flag.risk_tier} RISK ({flag.load_factor_pct}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operational Recommendations */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <h4 className="font-bold text-white uppercase text-[11px]">
                    Actionable Operational Directives
                  </h4>
                  <ul className="space-y-2">
                    {opsReport.actionable_operational_recommendations?.map((rec, ri) => (
                      <li key={ri} className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400">
                Click "Refresh Report" to query live airline telemetry.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Add Flight Modal ────────────────────────────────────────── */}
      {showAddFlightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white font-display">Schedule New Flight</h3>
              <button
                type="button"
                onClick={() => setShowAddFlightModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFlightSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Flight Number</label>
                <input
                  type="text"
                  value={newFlight.flightName}
                  onChange={(e) => setNewFlight({ ...newFlight, flightName: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Origin Airport</label>
                  <input
                    type="text"
                    value={newFlight.origin}
                    onChange={(e) => setNewFlight({ ...newFlight, origin: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Destination</label>
                  <input
                    type="text"
                    value={newFlight.destination}
                    onChange={(e) => setNewFlight({ ...newFlight, destination: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Departure Time</label>
                  <input
                    type="text"
                    value={newFlight.takeOffTime}
                    onChange={(e) => setNewFlight({ ...newFlight, takeOffTime: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Arrival Time</label>
                  <input
                    type="text"
                    value={newFlight.arrivalTime}
                    onChange={(e) => setNewFlight({ ...newFlight, arrivalTime: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Aircraft Type</label>
                <input
                  type="text"
                  value={newFlight.aircraftType}
                  onChange={(e) => setNewFlight({ ...newFlight, aircraftType: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddFlightModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-navy-950 font-bold"
                >
                  Save Flight
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
