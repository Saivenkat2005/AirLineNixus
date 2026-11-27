import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import FlightSearch from "./components/FlightSearch";
import CabinSeatMap3D from "./components/CabinSeatMap3D";
import WorldFlightMap from "./components/WorldFlightMap";
import LiveFlightRadar from "./components/LiveFlightRadar";
import BookingFlow from "./components/BookingFlow";
import DigitalBoardingPass from "./components/DigitalBoardingPass";
import TravelDashboard from "./components/TravelDashboard";
import AiCopilotDrawer from "./components/AiCopilotDrawer";
import AdminDashboard from "./components/AdminDashboard";
import NotificationCenter from "./components/NotificationCenter";
import useAviationBackground from "./hooks/useAviationBackground";
import { api } from "./services/api";
import { 
  Plane, 
  X, 
  Check, 
  Sparkles, 
  SlidersHorizontal, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("search");
  const [theme, setTheme] = useState("dark"); // "dark" | "amoled" | "light"
  const [flights, setFlights] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [activeBoardingPassBooking, setActiveBoardingPassBooking] = useState(null);
  const [comparedFlightIds, setComparedFlightIds] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareAnalysis, setCompareAnalysis] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [searchCategory, setSearchCategory] = useState("aviation");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      title: "GATE ANNOUNCEMENT",
      message: "Flight PA-101 to Los Angeles (LAX) now boarding at Gate B14.",
      time: "2m ago",
      type: "info",
      read: false
    },
    {
      id: "n2",
      title: "LIVE SEAT LOCK SYSTEM",
      message: "Seats held in the 3D cabin are reserved for 5 minutes to prevent double-allocation.",
      time: "10m ago",
      type: "alert",
      read: false
    }
  ]);

  // Dual-layer Aviation Background Crossfade Engine
  const { layerAUrl, layerBUrl, isLayerAActive } = useAviationBackground(searchCategory, 10000);

  // Load real flights from backend on mount
  const loadAllFlights = useCallback(async () => {
    setLoadingFlights(true);
    try {
      const data = await api.getAllFlights();
      if (Array.isArray(data) && data.length > 0) {
        setFlights(data);
      } else {
        // High quality standard real corridors fallback
        setFlights([
          { flightId: 1, flightName: "PA-101", origin: "New York (JFK)", destination: "Los Angeles (LAX)", takeOffTime: "2026-07-04T08:00:00", arrivalTime: "2026-07-04T11:30:00", price: 4850, aircraftType: "Boeing 777-300ER", status: "SCHEDULED" },
          { flightId: 2, flightName: "PA-202", origin: "London (LHR)", destination: "New Delhi (DEL)", takeOffTime: "2026-07-05T14:30:00", arrivalTime: "2026-07-06T02:00:00", price: 7200, aircraftType: "Airbus A350-900", status: "SCHEDULED" },
          { flightId: 3, flightName: "PA-303", origin: "Mumbai (BOM)", destination: "Bangalore (BLR)", takeOffTime: "2026-07-06T20:15:00", arrivalTime: "2026-07-06T22:00:00", price: 3450, aircraftType: "Boeing 737 MAX", status: "SCHEDULED" }
        ]);
      }
    } catch (e) {
      console.warn("Using offline flight fallback", e);
    } finally {
      setLoadingFlights(false);
    }
  }, []);

  useEffect(() => {
    loadAllFlights();
  }, [loadAllFlights]);

  const handleSelectFlightForBooking = (flight) => {
    setSelectedFlight(flight);
    setActiveTab("booking");
  };

  const handleBookingCompleted = (booking) => {
    setActiveBoardingPassBooking(booking);
    // Add real notification
    setNotifications((prev) => [
      {
        id: "n-" + Date.now(),
        title: "TICKET CONFIRMED",
        message: `Booking NX-${booking.bookingId || "104"} confirmed. Assigned seat(s): ${booking.seatNumbers || "12A"}.`,
        time: "Just now",
        type: "info",
        read: false
      },
      ...prev
    ]);
    setActiveTab("wallet");
  };

  const handleToggleCompare = (flightId) => {
    setComparedFlightIds((prev) =>
      prev.includes(flightId)
        ? prev.filter((id) => id !== flightId)
        : prev.length < 3
        ? [...prev, flightId]
        : prev
    );
  };

  const handleRunComparison = async () => {
    setShowCompareModal(true);
    setComparing(true);
    try {
      const data = await api.runAiSuiteModule("/compare", { flight_ids: comparedFlightIds });
      setCompareAnalysis(data);
    } catch {
      setCompareAnalysis(null);
    } finally {
      setComparing(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className={`min-h-screen relative text-slate-100 ${
      theme === "amoled" ? "theme-amoled bg-black" : theme === "light" ? "theme-light bg-slate-50 text-slate-900" : "bg-[#030712]"
    }`}>
      
      {/* ─── Dual-Layer Aviation Background Engine ───────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        
        {/* Layer A */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out scale-105"
          style={{
            backgroundImage: `url(${layerAUrl})`,
            opacity: isLayerAActive ? (theme === "light" ? 0.08 : 0.22) : 0,
          }}
        />

        {/* Layer B */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out scale-105"
          style={{
            backgroundImage: `url(${layerBUrl})`,
            opacity: !isLayerAActive ? (theme === "light" ? 0.08 : 0.22) : 0,
          }}
        />

        {/* Cinematic Vignette Overlay */}
        <div className={`absolute inset-0 ${
          theme === "light" 
            ? "bg-gradient-to-b from-white/80 via-white/90 to-white" 
            : theme === "amoled" 
            ? "bg-gradient-to-b from-black/80 via-black/90 to-black" 
            : "bg-gradient-to-b from-[#030712]/75 via-[#030712]/90 to-[#030712]"
        }`} />
      </div>

      {/* ─── Navigation Header ───────────────────────────────────────── */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setSelectedFlight(null);
          setActiveTab(tab);
        }}
        theme={theme}
        setTheme={setTheme}
        notificationCount={unreadCount}
        onOpenNotifications={() => setNotificationOpen(true)}
      />

      {/* ─── Main Content Canvas ────────────────────────────────────── */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Tab 1: Flight Search & Discovery */}
        {activeTab === "search" && (
          <FlightSearch
            flights={flights}
            loading={loadingFlights}
            onSelectFlight={handleSelectFlightForBooking}
            onOpenCompare={handleRunComparison}
            comparedFlightIds={comparedFlightIds}
            onToggleCompare={handleToggleCompare}
            onSearchCategoryChange={setSearchCategory}
          />
        )}

        {/* Tab 2: 3D Aircraft Cabin Explorer */}
        {activeTab === "cabin" && (
          <div className="space-y-4">
            <CabinSeatMap3D
              flight={selectedFlight || flights[0] || { flightId: 1, flightName: "PA-101", origin: "JFK", destination: "LAX" }}
              selectedSeats={[]}
              onSeatsChange={() => {}}
              onProceedToPassengerDetails={() => {
                if (!selectedFlight && flights[0]) setSelectedFlight(flights[0]);
                setActiveTab("booking");
              }}
            />
          </div>
        )}

        {/* Tab 3: World Flight Map */}
        {activeTab === "map" && (
          <WorldFlightMap
            flights={flights}
            onSelectRoute={(route) => {
              const matched = flights.find((f) => f.flightId === route.flightId);
              if (matched) handleSelectFlightForBooking(matched);
            }}
          />
        )}

        {/* Tab 4: Live Flight Radar */}
        {activeTab === "radar" && (
          <LiveFlightRadar />
        )}

        {/* Tab 5: AI Copilot */}
        {activeTab === "ai" && (
          <AiCopilotDrawer
            onSelectFlight={(flight) => {
              handleSelectFlightForBooking(flight);
            }}
          />
        )}

        {/* Tab 6: Digital Boarding Pass / Travel Wallet */}
        {activeTab === "wallet" && (
          <DigitalBoardingPass
            booking={activeBoardingPassBooking || {
              bookingId: 1,
              flightName: "PA-101",
              origin: "New York (JFK)",
              destination: "Los Angeles (LAX)",
              seatNumbers: "12A",
              seatType: "Business Class",
              date: "2026-07-04",
              takeOffTime: "08:00 AM"
            }}
          />
        )}

        {/* Tab 7: Travel Dashboard */}
        {activeTab === "dashboard" && (
          <TravelDashboard
            currentUserId={3}
            onViewBoardingPass={(b) => {
              setActiveBoardingPassBooking(b);
              setActiveTab("wallet");
            }}
            onSelectFlightToBook={() => setActiveTab("search")}
          />
        )}

        {/* Tab 8: Operations / Admin Center */}
        {activeTab === "admin" && (
          <AdminDashboard />
        )}

        {/* Overlay Booking Flow */}
        {activeTab === "booking" && selectedFlight && (
          <BookingFlow
            flight={selectedFlight}
            onCancel={() => {
              setSelectedFlight(null);
              setActiveTab("search");
            }}
            onBookingComplete={handleBookingCompleted}
            currentUserId={3}
          />
        )}

      </main>

      {/* ─── Notification Drawer Modal ──────────────────────────────── */}
      <NotificationCenter
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        notifications={notifications}
        onClearAll={() => setNotifications([])}
        onMarkRead={(id) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
          );
        }}
      />

      {/* ─── Flight Comparison Modal ────────────────────────────────── */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl max-w-4xl w-full space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-display">
                  Flight Matrix Comparison ({comparedFlightIds.length} Flights)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {comparing ? (
              <div className="p-12 text-center text-xs font-mono text-cyan-300 animate-pulse">
                Analyzing legroom, fare transparency, and connection risks...
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {comparedFlightIds.map((id) => {
                    const f = flights.find((item) => item.flightId === id) || {
                      flightId: id,
                      flightName: `ANX-${id}01`,
                      origin: "DEL",
                      destination: "BOM",
                      price: 4850,
                      aircraftType: "Airbus A320"
                    };
                    return (
                      <div key={id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-xs font-mono">
                        <span className="text-cyan-400 font-bold block">{f.flightName}</span>
                        <p className="text-white font-bold">{f.origin} → {f.destination}</p>
                        <p className="text-slate-400">{f.aircraftType}</p>
                        <p className="text-xl font-bold text-white font-display">
                          ₹{Number(f.price || 4850).toLocaleString("en-IN")}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCompareModal(false);
                            handleSelectFlightForBooking(f);
                          }}
                          className="w-full py-2 rounded-xl bg-cyan-500 text-navy-950 font-bold text-xs"
                        >
                          Book Flight
                        </button>
                      </div>
                    );
                  })}
                </div>

                {compareAnalysis?.recommendation && (
                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-200">
                    <strong>AI Recommendation:</strong> {compareAnalysis.recommendation}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ─── Footer ──────────────────────────────────────────────────── */}
      <footer className="mt-20 border-t border-white/10 py-8 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Airline Nexus 2.0 • Ultra-Fast Intelligent Airline Platform</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>MySQL InnoDB ACID</span>
            <span>•</span>
            <span>Redis 7 Distributed Holds</span>
            <span>•</span>
            <span>Zero Hallucination AI Guard</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
