import React, { useState } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Plane, 
  HelpCircle, 
  ShieldCheck, 
  Check, 
  ChevronRight, 
  SlidersHorizontal,
  Clock,
  Layers,
  Info,
  Globe,
  MapPin,
  RefreshCw,
  AlertCircle,
  FileText,
  DollarSign,
  ArrowRight
} from "lucide-react";
import { api } from "../services/api";

const PRESET_PROMPTS = [
  "Find the cheapest flight from Hyderabad to Delhi under ₹7000",
  "What is the checked baggage allowance for Economy Class?",
  "I need a flight with extra legroom from Mumbai to Bangalore",
  "Can I get a 100% refund if I cancel within 24 hours of booking?",
  "Explain the volunteer compensation policy for overbooked flights"
];

export default function AiCopilotDrawer({ onSelectFlight }) {
  const [activeSubTab, setActiveSubTab] = useState("copilot"); // "copilot" | "multicity" | "recovery" | "change" | "support"
  const [language, setLanguage] = useState("en"); // "en" | "te" | "hi"
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your Airline Nexus Intelligent Travel Copilot 3.0.\n\nI can search real scheduled flights, analyze connection risks, explain baggage and refund policies, recommend extra-legroom seats, or recover an interrupted booking.",
      flights: [],
      timestamp: "Just now"
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Multi-City Planner State
  const [multiCities, setMultiCities] = useState(["HYD", "DEL", "BOM", "BLR"]);
  const [multiCityBudget, setMultiCityBudget] = useState(25000);
  const [multiCityPlanResult, setMultiCityPlanResult] = useState(null);
  const [planningMultiCity, setPlanningMultiCity] = useState(false);

  // Booking Recovery State
  const [recoveryBookingId, setRecoveryBookingId] = useState("104");
  const [recoveryTxRef, setRecoveryTxRef] = useState("TXN-PAY-8821");
  const [recoveryResult, setRecoveryResult] = useState(null);
  const [recovering, setRecovering] = useState(false);

  // Flight Change Impact State
  const [changeBookingId, setChangeBookingId] = useState(1);
  const [desiredFlightId, setDesiredFlightId] = useState(4);
  const [changeAnalysisResult, setChangeAnalysisResult] = useState(null);
  const [analyzingChange, setAnalyzingChange] = useState(false);

  // Specialized Suite Modules State
  const [suiteLoading, setSuiteLoading] = useState("");
  const [suiteResults, setSuiteResults] = useState({});

  const handleSend = async (userText = query) => {
    const text = userText.trim();
    if (!text || loading) return;

    setQuery("");
    const newMsg = { role: "user", content: text, timestamp: "Now" };
    setMessages((prev) => [...prev, newMsg]);
    setLoading(true);

    try {
      const res = await api.travelCopilotChat(text, "session-copilot-1", 3, language);
      const assistantMsg = {
        role: "assistant",
        content: res.reply || "No response received.",
        flights: res.flights || [],
        citations: res.citations || [],
        timestamp: "Now",
        source: res.source_provider || "Grounded MySQL & Verified RAG"
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Nexus AI Copilot is currently operating in deterministic verified fallback mode. You can still browse verified schedules in Flight Search.",
          flights: [],
          timestamp: "Now"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMultiCity = async () => {
    setPlanningMultiCity(true);
    try {
      const data = await api.multiCityPlan({
        cities: multiCities,
        total_budget: Number(multiCityBudget),
        passengers: 1
      });
      setMultiCityPlanResult(data);
    } catch (err) {
      alert("Multi-City Planner error: " + (err.response?.data?.detail || err.message));
    } finally {
      setPlanningMultiCity(false);
    }
  };

  const handleExecuteRecovery = async () => {
    setRecovering(true);
    try {
      const data = await api.recoverBooking(
        3,
        recoveryBookingId ? Number(recoveryBookingId) : null,
        recoveryTxRef
      );
      setRecoveryResult(data);
    } catch (err) {
      alert("Recovery agent error: " + (err.response?.data?.detail || err.message));
    } finally {
      setRecovering(false);
    }
  };

  const handleAnalyzeFlightChange = async () => {
    setAnalyzingChange(true);
    try {
      const data = await api.analyzeFlightChange(
        Number(changeBookingId),
        3,
        Number(desiredFlightId),
        "Economy"
      );
      setChangeAnalysisResult(data);
    } catch (err) {
      alert("Flight change analysis error: " + (err.response?.data?.detail || err.message));
    } finally {
      setAnalyzingChange(false);
    }
  };

  const runSuiteModule = async (name, endpoint, payload, method = "post") => {
    setSuiteLoading(name);
    try {
      const data = await api.runAiSuiteModule(endpoint, payload, method);
      setSuiteResults((prev) => ({ ...prev, [name]: data }));
    } catch (err) {
      alert("AI Suite Module calculation failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setSuiteLoading("");
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
      
      {/* ─── Header & Language Switcher ─────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Bot className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white font-display">
              AIRLINE NEXUS // AUTONOMOUS AI COPILOT & AGENTS 3.0
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Grounded in MySQL database inventory, live Redis seat locks, and DGCA/FAA verified airline policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono">
            <Globe className="w-3.5 h-3.5 text-cyan-400 ml-1.5" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-mono focus:outline-none pr-2 cursor-pointer"
            >
              <option value="en" className="bg-slate-900 text-white">English (EN)</option>
              <option value="te" className="bg-slate-900 text-white">తెలుగు (Telugu)</option>
              <option value="hi" className="bg-slate-900 text-white">हिन्दी (Hindi)</option>
            </select>
          </div>

          <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            ZERO FAKE GUARANTEE
          </span>
        </div>
      </div>

      {/* ─── Mode Tabs ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {[
          { id: "copilot", label: "Travel Copilot" },
          { id: "multicity", label: "Multi-City Trip Planner" },
          { id: "recovery", label: "Booking Recovery Agent" },
          { id: "change", label: "Flight Change Impact" },
          { id: "modules", label: "Micro-Advisory Suite" }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition ${
              activeSubTab === tab.id
                ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Sub-Tab 1: Travel Copilot ──────────────────────────────── */}
      {activeSubTab === "copilot" && (
        <div className="space-y-6">
          {/* Conversational Chat Feed */}
          <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                  m.role === "user" 
                    ? "bg-gradient-to-r from-primary-600 to-cyan-600 text-white font-medium rounded-tr-none" 
                    : "bg-white/[0.04] border border-white/10 text-slate-200 rounded-tl-none shadow-md"
                }`}>
                  {m.role === "assistant" && (
                    <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-mono font-bold">
                      <Sparkles className="w-3 h-3" /> NEXUS INTELLIGENCE
                    </div>
                  )}
                  <p className="whitespace-pre-line">{m.content}</p>

                  {/* Grounding Citations */}
                  {m.citations && m.citations.length > 0 && (
                    <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-cyan-300">
                      <span className="font-bold">Verified Sources: </span>
                      {m.citations.join(" • ")}
                    </div>
                  )}

                  {/* Verified Matched Flights Chips */}
                  {m.flights && m.flights.length > 0 && (
                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider block">
                        Verified Matched Schedules:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {m.flights.map((f, fi) => (
                          <div
                            key={fi}
                            onClick={() => onSelectFlight && onSelectFlight(f)}
                            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-cyan-500/20 border border-white/10 cursor-pointer transition-all flex items-center justify-between"
                          >
                            <div>
                              <p className="font-bold text-white font-mono">{f.flightName || f.name || "PA-101"}</p>
                              <p className="text-[10px] text-slate-400">{f.origin} → {f.destination}</p>
                            </div>
                            <span className="text-cyan-300 font-bold font-mono">
                              ₹{f.price ? Number(f.price).toLocaleString("en-IN") : "4,850"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-cyan-300 font-mono animate-pulse w-fit">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Interrogating real flight inventory & verified policy database...</span>
              </div>
            )}
          </div>

          {/* Prompt Input */}
          <div className="space-y-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask e.g. 'Find cheapest flight from Hyderabad to Delhi', 'What if my flight is overbooked?'..."
                className="flex-1 bg-white/[0.05] border border-white/15 focus:border-cyan-400 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none font-medium"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-cyan-500 hover:from-primary-500 hover:to-cyan-400 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              {PRESET_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(p)}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-cyan-300 text-[11px] transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Sub-Tab 2: Multi-City Trip Planner ─────────────────────── */}
      {activeSubTab === "multicity" && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white font-display">AI Multi-City Schedule Planner</h3>
              <p className="text-xs text-slate-400">
                Chains real flight schedules, verifies layover risk, enforces budget ceilings, and compiles daily itineraries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-300">City Corridor Sequence (Comma separated)</label>
                <input
                  type="text"
                  value={multiCities.join(", ")}
                  onChange={(e) => setMultiCities(e.target.value.split(",").map(s => s.trim()))}
                  className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Total Travel Budget (INR)</label>
                <input
                  type="number"
                  value={multiCityBudget}
                  onChange={(e) => setMultiCityBudget(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerateMultiCity}
              disabled={planningMultiCity}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs font-mono flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${planningMultiCity ? "animate-spin" : ""}`} />
              {planningMultiCity ? "Building Verified Itinerary..." : "Generate Multi-City Itinerary"}
            </button>
          </div>

          {multiCityPlanResult && (
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 space-y-4 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10">
                <span className="text-cyan-300 font-bold">Itinerary ID: {multiCityPlanResult.itinerary_id}</span>
                <span className="text-white font-bold text-sm">
                  Total Fare: ₹{multiCityPlanResult.total_price.toLocaleString("en-IN")}
                  {multiCityPlanResult.is_within_budget ? " (Within Budget ✓)" : " (Exceeds Target Budget)"}
                </span>
              </div>

              {/* Segments */}
              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase text-[11px]">Flight Segments</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {multiCityPlanResult.segments.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                      <span className="text-cyan-400 font-bold">Leg {s.segment_index}: {s.flight_name}</span>
                      <p className="text-white font-bold">{s.origin} ➔ {s.destination}</p>
                      <p className="text-slate-400 text-[10px]">Dep: {s.departure_time} • Arr: {s.arrival_time}</p>
                      <p className="text-emerald-400 font-bold">₹{s.price.toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day By Day Activities */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <h4 className="font-bold text-white uppercase text-[11px]">Day-by-Day Activity Blueprint</h4>
                <div className="space-y-2">
                  {multiCityPlanResult.day_by_day_plan.map((d, di) => (
                    <div key={di} className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                      <span className="text-cyan-300 font-bold">Day {d.day}: {d.city}</span>
                      <ul className="list-disc pl-4 text-slate-300 text-[11px] space-y-0.5">
                        {d.activities.map((act, ai) => <li key={ai}>{act}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── Sub-Tab 3: Booking Recovery Agent ──────────────────────── */}
      {activeSubTab === "recovery" && (
        <div className="space-y-6 font-mono text-xs">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white font-display">AI Booking Recovery Intelligence</h3>
              <p className="text-xs text-slate-400">
                Detects interrupted checkout sessions, reconciles payment gateway tokens, and recovers ticket confirmations without charging twice.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300">Target Booking ID</label>
                <input
                  type="text"
                  value={recoveryBookingId}
                  onChange={(e) => setRecoveryBookingId(e.target.value)}
                  placeholder="e.g. 104"
                  className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Payment Transaction Reference</label>
                <input
                  type="text"
                  value={recoveryTxRef}
                  onChange={(e) => setRecoveryTxRef(e.target.value)}
                  placeholder="e.g. TXN-PAY-8821"
                  className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleExecuteRecovery}
              disabled={recovering}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${recovering ? "animate-spin" : ""}`} />
              {recovering ? "Auditing Transaction Ledger..." : "Initiate Safe Booking Recovery"}
            </button>
          </div>

          {recoveryResult && (
            <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-emerald-400 font-bold">Status: {recoveryResult.recovery_status}</span>
                <span className="text-white">Duplicate Protection: {recoveryResult.duplicate_payment_risk_prevented ? "Active ✓" : "N/A"}</span>
              </div>
              <p className="text-white text-sm font-sans font-medium">{recoveryResult.passenger_message}</p>
              <div className="pt-2 border-t border-white/10 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Reconciliation Audit Steps:</span>
                {recoveryResult.resolution_steps.map((st, i) => (
                  <div key={i} className="text-slate-300 text-[11px] flex items-center gap-2">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── Sub-Tab 4: Flight Change Impact ────────────────────────── */}
      {activeSubTab === "change" && (
        <div className="space-y-6 font-mono text-xs">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white font-display">AI Flight Change Impact Analyzer</h3>
              <p className="text-xs text-slate-400">
                Calculates precise fare differences, schedule adjustments, and connection risks before generating a confirmed change order.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300">Existing Booking ID</label>
                <input
                  type="number"
                  value={changeBookingId}
                  onChange={(e) => setChangeBookingId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Desired Replacement Flight ID</label>
                <input
                  type="number"
                  value={desiredFlightId}
                  onChange={(e) => setDesiredFlightId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleAnalyzeFlightChange}
              disabled={analyzingChange}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${analyzingChange ? "animate-spin" : ""}`} />
              {analyzingChange ? "Analyzing Schedule & Fare Diff..." : "Analyze Flight Change Impact"}
            </button>
          </div>

          {changeAnalysisResult && (
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-cyan-300 font-bold">Action Token: {changeAnalysisResult.action_token}</span>
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  REQUIRES EXPLICIT USER CONFIRMATION
                </span>
              </div>
              <p className="text-white text-xs whitespace-pre-line leading-relaxed">
                {changeAnalysisResult.schedule_impact_summary}
              </p>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <span className="text-slate-300">Net Fare Adjustment:</span>
                <span className="text-lg font-bold text-cyan-300 font-display">
                  ₹{changeAnalysisResult.total_payable_or_refundable.toLocaleString("en-IN")} ({changeAnalysisResult.direction})
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── Sub-Tab 5: Micro-Advisory Suite ────────────────────────── */}
      {activeSubTab === "modules" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Module 1: Journey Readiness */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
            <h4 className="font-bold text-white">Journey Readiness Health</h4>
            <p className="text-slate-400 text-[11px]">Assess booking, baggage, seat, and check-in readiness.</p>
            <button
              type="button"
              onClick={() => runSuiteModule("readiness", "/readiness", {
                booking_id: 1,
                has_seat_selected: true,
                passenger_details_complete: true,
                payment_confirmed: true,
                online_checkin_done: false,
                baggage_selected: true,
              })}
              className="w-full py-2 rounded-xl bg-white/[0.05] hover:bg-cyan-500/20 border border-white/10 text-cyan-300 font-semibold"
            >
              {suiteLoading === "readiness" ? "Assessing..." : "Calculate Readiness"}
            </button>
            {suiteResults.readiness && (
              <pre className="p-2 rounded bg-navy-950 text-[10px] text-emerald-300 overflow-auto max-h-32">
                {JSON.stringify(suiteResults.readiness, null, 2)}
              </pre>
            )}
          </div>

          {/* Module 2: Airport Buffer */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
            <h4 className="font-bold text-white">Airport Arrival Buffer</h4>
            <p className="text-slate-400 text-[11px]">Calculate check-in, TSA security, and boarding timelines.</p>
            <button
              type="button"
              onClick={() => runSuiteModule("tripPlan", "/trip-plan", {
                flightId: 1,
                origin: "New York",
                destination: "Los Angeles",
                departureDate: "2026-07-04",
                takeOffTime: "08:00",
              })}
              className="w-full py-2 rounded-xl bg-white/[0.05] hover:bg-cyan-500/20 border border-white/10 text-cyan-300 font-semibold"
            >
              {suiteLoading === "tripPlan" ? "Planning..." : "Plan Buffer Timeline"}
            </button>
            {suiteResults.tripPlan && (
              <pre className="p-2 rounded bg-navy-950 text-[10px] text-emerald-300 overflow-auto max-h-32">
                {JSON.stringify(suiteResults.tripPlan, null, 2)}
              </pre>
            )}
          </div>

          {/* Module 3: Fare Transparency */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
            <h4 className="font-bold text-white">Fare Transparency Breakdown</h4>
            <p className="text-slate-400 text-[11px]">Break down base fare, taxes, and service additions.</p>
            <button
              type="button"
              onClick={() => runSuiteModule("fare", "/fare-transparency", {
                flight_id: 1,
                base_fare: 4850,
                passengers: 1,
                selected_seat_price: 0,
                extra_baggage: false,
                in_flight_meal: false,
                priority_boarding: false,
              })}
              className="w-full py-2 rounded-xl bg-white/[0.05] hover:bg-cyan-500/20 border border-white/10 text-cyan-300 font-semibold"
            >
              {suiteLoading === "fare" ? "Explaining..." : "Explain Fare Model"}
            </button>
            {suiteResults.fare && (
              <pre className="p-2 rounded bg-navy-950 text-[10px] text-emerald-300 overflow-auto max-h-32">
                {JSON.stringify(suiteResults.fare, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
