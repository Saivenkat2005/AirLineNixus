import React, { useState, useEffect, useCallback } from "react";
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  ChevronRight,
  Maximize2
} from "lucide-react";
import { api } from "../services/api";

export default function CabinSeatMap3D({
  flight,
  selectedSeats = [],
  onSeatsChange,
  onProceedToPassengerDetails,
  currentUserId = "3"
}) {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("3D"); // "3D" | "2D"
  const [rotationX, setRotationX] = useState(30); // pitch angle in deg
  const [rotationY, setRotationY] = useState(0);  // yaw angle in deg
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeCabinSection, setActiveCabinSection] = useState("all"); // "all", "business", "economy"
  const [lockTimeRemaining, setLockTimeRemaining] = useState(300); // 5 minutes in sec
  const [isHolding, setIsHolding] = useState(false);
  const [seatPreference, setSeatPreference] = useState("window"); // "window", "aisle", "extra_legroom", "family", "accessibility"
  const [hasInfant, setHasInfant] = useState(false);
  const [aiSeatRecommendations, setAiSeatRecommendations] = useState(null);
  const [recommendingSeats, setRecommendingSeats] = useState(false);
  const [seatSafetyNotice, setSeatSafetyNotice] = useState("");

  const handleAskAiSeatAdvisor = async () => {
    setRecommendingSeats(true);
    setSeatSafetyNotice("");
    try {
      const data = await api.getSeatRecommendations(
        flightId,
        seatType,
        seatPreference,
        1,
        hasInfant
      );
      setAiSeatRecommendations(data.recommendations || []);
      if (data.safety_rule_notice) {
        setSeatSafetyNotice(data.safety_rule_notice);
      }
    } catch (e) {
      console.warn("AI seat recommendation error", e);
    } finally {
      setRecommendingSeats(false);
    }
  };

  const flightId = flight?.flightId || flight?.id || 1;
  const seatType = flight?.seatType || "Economy";

  // Fetch real seat statuses from backend
  const loadSeatMap = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getSeatMapStatus(flightId, seatType);
      if (Array.isArray(data) && data.length > 0) {
        setSeats(data);
      } else {
        // Fallback standard layout of 40 seats if backend list empty
        const fallbackSeats = [];
        for (let i = 0; i < 40; i++) {
          const row = Math.floor(i / 4) + 1;
          const colLetter = ["A", "B", "C", "D"][i % 4];
          const seatNum = `${row}${colLetter}`;
          const isOccupied = i === 2 || i === 7 || i === 15;
          fallbackSeats.push({
            seatId: `S${i + 1}`,
            seatNumber: seatNum,
            status: isOccupied ? "OCCUPIED" : "AVAILABLE",
            isPremium: i < 8,
          });
        }
        setSeats(fallbackSeats);
      }
    } catch (err) {
      setError("Live seat map could not be loaded from backend. Retrying...");
    } finally {
      setLoading(false);
    }
  }, [flightId, seatType]);

  useEffect(() => {
    loadSeatMap();
  }, [loadSeatMap]);

  // Seat Lock Expiry Countdown Timer
  useEffect(() => {
    if (selectedSeats.length === 0) return;
    const interval = setInterval(() => {
      setLockTimeRemaining((prev) => {
        if (prev <= 1) {
          // Lock expired
          onSeatsChange([]);
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedSeats, onSeatsChange]);

  const handleSeatClick = async (seat) => {
    if (seat.status === "OCCUPIED" || seat.status === "LOCKED") return;

    const isAlreadySelected = selectedSeats.includes(seat.seatNumber);
    if (isAlreadySelected) {
      // Unselect
      onSeatsChange(selectedSeats.filter((s) => s !== seat.seatNumber));
    } else {
      // Place real backend hold for 5 minutes
      setIsHolding(true);
      try {
        await api.holdSpecificSeat(flightId, seatType, seat.seatNumber, currentUserId);
        onSeatsChange([...selectedSeats, seat.seatNumber]);
        setLockTimeRemaining(300); // reset 5-minute timer
      } catch (err) {
        setError("Seat hold could not be acquired. It may have just been locked by another passenger.");
      } finally {
        setIsHolding(false);
      }
    }
  };

  const resetCamera = () => {
    setRotationX(30);
    setRotationY(0);
    setZoomLevel(1);
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
      
      {/* ─── Top Bar: Cabin Header & Controls ──────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {flight?.flightName || "ANX-101"}
            </span>
            <span className="text-sm font-bold text-white font-display">
              {flight?.origin || "JFK"} → {flight?.destination || "LAX"}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ({flight?.aircraftType || "Boeing 777-300ER"})
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time interactive cabin with distributed 5-minute seat locking.
          </p>
        </div>

        {/* View Mode & Camera Controls */}
        <div className="flex items-center gap-2">
          
          {/* 3D vs 2D Toggle */}
          <div className="flex items-center bg-white/[0.05] p-1 rounded-xl border border-white/10 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode("3D")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "3D"
                  ? "bg-cyan-500 text-navy-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              3D Cabin
            </button>
            <button
              type="button"
              onClick={() => setViewMode("2D")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "2D"
                  ? "bg-cyan-500 text-navy-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              2D Flat Grid
            </button>
          </div>

          {viewMode === "3D" && (
            <>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={resetCamera}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300"
                title="Reset Camera"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}

        </div>
      </div>

      {/* ─── Legend & Active Lock Banner ────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs">
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-slate-700 border border-slate-500" />
            <span className="text-slate-300">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-amber-500/20 border border-amber-400" />
            <span className="text-amber-300">Premium / Extra Legroom</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-cyan-400 border border-cyan-300 shadow-sm shadow-cyan-400" />
            <span className="text-cyan-300 font-bold">Selected by You</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-slate-900 border border-slate-800 opacity-60" />
            <span className="text-slate-500">Occupied</span>
          </div>
        </div>

        {/* 5-Min Hold Countdown */}
        {selectedSeats.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono font-bold animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            <span>HOLD EXPIRING IN: {formatTimer(lockTimeRemaining)}</span>
          </div>
        )}

      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ─── 3D Perspective Fuselage Stage ──────────────────────────── */}
      <div className="relative min-h-[460px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-navy-950/90 to-slate-950 p-6 border border-white/10">
        
        {/* Aircraft Cockpit Nose Graphic */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-40 pointer-events-none">
          <div className="w-32 h-10 border-t-2 border-x-2 border-cyan-400/40 rounded-t-full" />
          <span className="text-[10px] text-cyan-400 font-mono tracking-widest mt-1">▲ COCKPIT / FORWARD CABIN</span>
        </div>

        {/* 3D Transform Container */}
        <div
          style={{
            transform: viewMode === "3D"
              ? `perspective(1200px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${zoomLevel})`
              : `scale(${zoomLevel})`,
            transformStyle: "preserve-3d",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="pt-16 pb-8 px-6 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl relative"
        >
          
          {/* Cabin Floor Aisles */}
          <div className="grid grid-cols-5 gap-3 sm:gap-4 items-center">
            
            {/* Headers: Col A, B, Aisle, Col C, D */}
            <div className="text-center font-mono font-bold text-xs text-slate-400">A (Window)</div>
            <div className="text-center font-mono font-bold text-xs text-slate-400">B (Aisle)</div>
            <div className="text-center font-mono text-[10px] text-cyan-400/70 uppercase tracking-widest">Aisle</div>
            <div className="text-center font-mono font-bold text-xs text-slate-400">C (Aisle)</div>
            <div className="text-center font-mono font-bold text-xs text-slate-400">D (Window)</div>

            {/* Render 10 Rows */}
            {Array.from({ length: 10 }).map((_, rowIndex) => {
              const rowNum = rowIndex + 1;
              const isExitRow = rowNum === 5;
              const isBusiness = rowNum <= 2;

              return (
                <React.Fragment key={rowNum}>
                  
                  {/* Seat A */}
                  {renderSeatButton(`${rowNum}A`, seats, selectedSeats, handleSeatClick, isBusiness)}
                  
                  {/* Seat B */}
                  {renderSeatButton(`${rowNum}B`, seats, selectedSeats, handleSeatClick, isBusiness)}

                  {/* Center Aisle Indicator */}
                  <div className="flex items-center justify-center font-mono text-[11px] text-slate-500 py-1">
                    <span className="w-5 h-5 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center">
                      {rowNum}
                    </span>
                  </div>

                  {/* Seat C */}
                  {renderSeatButton(`${rowNum}C`, seats, selectedSeats, handleSeatClick, isBusiness)}

                  {/* Seat D */}
                  {renderSeatButton(`${rowNum}D`, seats, selectedSeats, handleSeatClick, isBusiness)}

                </React.Fragment>
              );
            })}
          </div>

        </div>

        {/* 3D Rotation Controls Floating Widget */}
        {viewMode === "3D" && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 p-2 rounded-2xl bg-navy-950/80 border border-white/10 backdrop-blur-md text-xs">
            <span className="text-[10px] text-slate-400 font-mono">TILT:</span>
            <button
              type="button"
              onClick={() => setRotationX((x) => Math.min(60, x + 10))}
              className="px-2 py-1 rounded bg-white/[0.05] text-slate-300 hover:text-white"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() => setRotationX((x) => Math.max(10, x - 10))}
              className="px-2 py-1 rounded bg-white/[0.05] text-slate-300 hover:text-white"
            >
              ▼
            </button>
            <button
              type="button"
              onClick={() => setRotationY((y) => y - 10)}
              className="px-2 py-1 rounded bg-white/[0.05] text-slate-300 hover:text-white"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => setRotationY((y) => y + 10)}
              className="px-2 py-1 rounded bg-white/[0.05] text-slate-300 hover:text-white"
            >
              ▶
            </button>
          </div>
        )}

      </div>

      {/* ─── AI Seat Assistant Panel ─────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/30 border border-cyan-500/20 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              AI Cabin Seat Advisor
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <select
              value={seatPreference}
              onChange={(e) => setSeatPreference(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="window">Window (Scenic Views)</option>
              <option value="aisle">Aisle (Quick Access)</option>
              <option value="extra_legroom">Extra Legroom (Exit Row)</option>
              <option value="family">Family (Adjacent Cluster)</option>
              <option value="accessibility">Accessibility (Forward Bulkhead)</option>
            </select>

            <label className="flex items-center gap-1.5 text-slate-300 text-[11px] cursor-pointer">
              <input
                type="checkbox"
                checked={hasInfant}
                onChange={(e) => setHasInfant(e.target.checked)}
                className="rounded border-white/20 bg-slate-900 text-cyan-500"
              />
              Traveling with Infant
            </label>

            <button
              type="button"
              onClick={handleAskAiSeatAdvisor}
              disabled={recommendingSeats}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs transition"
            >
              {recommendingSeats ? "Analyzing..." : "Recommend Seats"}
            </button>
          </div>
        </div>

        {seatSafetyNotice && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{seatSafetyNotice}</span>
          </div>
        )}

        {aiSeatRecommendations && aiSeatRecommendations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
            {aiSeatRecommendations.map((rec, i) => (
              <div
                key={i}
                onClick={() => {
                  const seatObj = seats.find(s => s.seatNumber === rec.seat_number) || { seatNumber: rec.seat_number, status: "AVAILABLE" };
                  handleSeatClick(seatObj);
                }}
                className="p-3 rounded-xl bg-white/[0.04] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 cursor-pointer transition flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-400 text-navy-950 font-bold text-xs">
                      Seat {rec.seat_number}
                    </span>
                    <span className="text-white font-bold text-[11px]">{rec.position} • {rec.seat_type}</span>
                    {rec.is_extra_legroom && (
                      <span className="text-[10px] text-amber-300 bg-amber-500/15 px-1.5 py-0.2 rounded">
                        +35" Pitch
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-[10px] mt-1 line-clamp-1">{rec.explanation}</p>
                </div>
                <button
                  type="button"
                  className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-bold"
                >
                  Hold Seat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── Bottom Action Bar ──────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
        <div>
          <span className="text-xs text-slate-400">Selected Seats:</span>
          <div className="flex items-center gap-2 mt-1">
            {selectedSeats.length > 0 ? (
              selectedSeats.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-lg bg-cyan-400 text-navy-950 font-bold font-mono text-xs shadow-md shadow-cyan-400/25"
                >
                  {s}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 italic">No seat selected yet (click a seat above)</span>
            )}
          </div>
        </div>

        <button
          type="button"
          disabled={selectedSeats.length === 0 || isHolding}
          onClick={onProceedToPassengerDetails}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-500 hover:from-primary-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all"
        >
          <span>Continue with {selectedSeats.length} Seat{selectedSeats.length > 1 ? "s" : ""}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

// Seat rendering helper
function renderSeatButton(seatNum, seats, selectedSeats, onClick, isBusiness) {
  const seatObj = seats.find((s) => s.seatNumber === seatNum);
  const isSelected = selectedSeats.includes(seatNum);
  const isOccupied = seatObj?.status === "OCCUPIED";
  const isLocked = seatObj?.status === "LOCKED";
  const isPremium = isBusiness || seatObj?.isPremium;

  let btnClasses = "w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center transition-all duration-200 relative ";

  if (isOccupied) {
    btnClasses += "bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed opacity-60";
  } else if (isLocked && !isSelected) {
    btnClasses += "bg-amber-950/60 border border-amber-600 text-amber-500 cursor-not-allowed animate-pulse";
  } else if (isSelected) {
    btnClasses += "bg-cyan-400 border border-cyan-300 text-navy-950 shadow-lg shadow-cyan-400/40 transform -translate-y-1";
  } else if (isPremium) {
    btnClasses += "bg-amber-500/15 border border-amber-400/60 text-amber-200 hover:bg-amber-400 hover:text-navy-950 hover:shadow-md hover:shadow-amber-400/30";
  } else {
    btnClasses += "bg-slate-800 border border-slate-600 text-slate-200 hover:bg-cyan-500 hover:border-cyan-400 hover:text-navy-950 hover:shadow-md hover:shadow-cyan-400/25";
  }

  return (
    <button
      type="button"
      disabled={isOccupied || (isLocked && !isSelected)}
      onClick={() => onClick(seatObj || { seatNumber: seatNum, status: "AVAILABLE" })}
      className={btnClasses}
      title={`Seat ${seatNum} - ${isOccupied ? "Occupied" : isLocked ? "Locked by another passenger" : isPremium ? "Business / Extra Legroom (+₹1,200)" : "Available"}`}
    >
      <span>{seatNum}</span>
      {isPremium && !isSelected && !isOccupied && (
        <span className="text-[7px] text-amber-400 font-sans tracking-tight">★ VIP</span>
      )}
    </button>
  );
}
