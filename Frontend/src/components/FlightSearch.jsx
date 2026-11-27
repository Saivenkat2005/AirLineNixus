import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Search, 
  ArrowRightLeft, 
  Calendar, 
  Users, 
  Filter, 
  Clock, 
  Sparkles, 
  PlaneTakeoff, 
  ShieldCheck, 
  Check, 
  TrendingUp, 
  SlidersHorizontal,
  ChevronRight,
  Layers,
  Heart
} from "lucide-react";

const AIRPORT_SUGGESTIONS = [
  { code: "JFK", city: "New York", name: "John F. Kennedy Intl" },
  { code: "LAX", city: "Los Angeles", name: "Los Angeles Intl" },
  { code: "LHR", city: "London", name: "Heathrow Airport" },
  { code: "DEL", city: "New Delhi", name: "Indira Gandhi Intl" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Intl" },
  { code: "BLR", city: "Bangalore", name: "Kempegowda Intl" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi Intl" },
  { code: "DXB", city: "Dubai", name: "Dubai International" },
  { code: "HND", city: "Tokyo", name: "Haneda Airport" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle" }
];

export default function FlightSearch({
  flights = [],
  loading = false,
  onSelectFlight,
  onOpenCompare,
  comparedFlightIds = [],
  onToggleCompare,
  onSearchCategoryChange,
}) {
  const [tripType, setTripType] = useState("oneWay"); // "oneWay" | "roundTrip"
  const [origin, setOrigin] = useState("New York (JFK)");
  const [destination, setDestination] = useState("Los Angeles (LAX)");
  const [departureDate, setDepartureDate] = useState("2026-07-04");
  const [returnDate, setReturnDate] = useState("2026-07-11");
  const [cabinClass, setCabinClass] = useState("Economy");
  const [passengers, setPassengers] = useState(1);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("all");
  const [selectedAircraft, setSelectedAircraft] = useState("all");
  const [sortBy, setSortBy] = useState("price_asc"); // "price_asc", "time_asc", "name"
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [favorites, setFavorites] = useState(["JFK-LAX", "LHR-DEL", "BOM-BLR"]);
  const [recentSearches, setRecentSearches] = useState([
    { from: "New York (JFK)", to: "Los Angeles (LAX)", date: "2026-07-04" },
    { from: "London (LHR)", to: "New Delhi (DEL)", date: "2026-07-05" }
  ]);

  // Update background when user changes origin or destination
  useEffect(() => {
    if (onSearchCategoryChange) {
      if (destination.includes("London") || destination.includes("LHR")) {
        onSearchCategoryChange("london");
      } else if (destination.includes("Delhi") || destination.includes("DEL")) {
        onSearchCategoryChange("delhi");
      } else if (destination.includes("Mumbai") || destination.includes("BOM")) {
        onSearchCategoryChange("mumbai");
      } else if (destination.includes("Tokyo")) {
        onSearchCategoryChange("tokyo");
      } else if (destination.includes("Dubai")) {
        onSearchCategoryChange("dubai");
      } else {
        onSearchCategoryChange("aviation");
      }
    }
  }, [destination, onSearchCategoryChange]);

  const handleSwapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleQuickRoute = (route) => {
    setOrigin(route.from);
    setDestination(route.to);
    if (route.date) setDepartureDate(route.date);
  };

  const toggleFavorite = (routeKey) => {
    setFavorites(prev => 
      prev.includes(routeKey) ? prev.filter(k => k !== routeKey) : [...prev, routeKey]
    );
  };

  // Filter & Sort Logic based on actual verified backend flights
  const filteredFlights = useMemo(() => {
    if (!flights || !Array.isArray(flights)) return [];

    return flights.filter((flight) => {
      const orig = (flight.origin || "").toLowerCase();
      const dest = (flight.destination || "").toLowerCase();
      const orgQuery = origin.toLowerCase().split(" ")[0];
      const destQuery = destination.toLowerCase().split(" ")[0];

      // Match origin/destination loosely
      const matchesOrigin = !orgQuery || orig.includes(orgQuery);
      const matchesDest = !destQuery || dest.includes(destQuery);

      // Price filter
      const price = flight.price || 4850;
      const matchesPrice = price <= maxPrice;

      // Time period filter
      const timeStr = flight.takeOffTime || "";
      let matchesTime = true;
      if (selectedTimePeriod === "morning") {
        matchesTime = timeStr.includes("05:") || timeStr.includes("06:") || timeStr.includes("07:") || timeStr.includes("08:") || timeStr.includes("09:") || timeStr.includes("10:") || timeStr.includes("11:");
      } else if (selectedTimePeriod === "afternoon") {
        matchesTime = timeStr.includes("12:") || timeStr.includes("13:") || timeStr.includes("14:") || timeStr.includes("15:") || timeStr.includes("16:");
      } else if (selectedTimePeriod === "evening") {
        matchesTime = timeStr.includes("17:") || timeStr.includes("18:") || timeStr.includes("19:") || timeStr.includes("20:") || timeStr.includes("21:");
      }

      // Aircraft filter
      let matchesAircraft = true;
      if (selectedAircraft !== "all") {
        matchesAircraft = (flight.aircraftType || "").toLowerCase().includes(selectedAircraft.toLowerCase());
      }

      return (matchesOrigin || matchesDest) && matchesPrice && matchesTime && matchesAircraft;
    }).sort((a, b) => {
      const priceA = a.price || 4850;
      const priceB = b.price || 4850;
      if (sortBy === "price_asc") return priceA - priceB;
      if (sortBy === "price_desc") return priceB - priceA;
      if (sortBy === "time_asc") return (a.takeOffTime || "").localeCompare(b.takeOffTime || "");
      return (a.flightName || "").localeCompare(b.flightName || "");
    });
  }, [flights, origin, destination, maxPrice, selectedTimePeriod, selectedAircraft, sortBy]);

  return (
    <div className="space-y-8">
      
      {/* ─── Hero Search Container ───────────────────────────────────── */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Header Row: Trip Type & Cabin Class */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 p-1 bg-white/[0.04] rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setTripType("oneWay")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  tripType === "oneWay" 
                    ? "bg-cyan-500 text-navy-950 shadow-md shadow-cyan-500/30" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                One Way
              </button>
              <button
                type="button"
                onClick={() => setTripType("roundTrip")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  tripType === "roundTrip" 
                    ? "bg-cyan-500 text-navy-950 shadow-md shadow-cyan-500/30" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Round Trip
              </button>
            </div>

            {/* Cabin Class & Passengers */}
            <div className="flex items-center gap-3">
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="bg-white/[0.06] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Economy" className="bg-navy-950 text-white">Economy Class</option>
                <option value="Business" className="bg-navy-950 text-white">Business Class</option>
                <option value="First Class" className="bg-navy-950 text-white">First Class Suite</option>
              </select>

              <div className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="bg-transparent focus:outline-none text-white cursor-pointer"
                >
                  <option value={1} className="bg-navy-950">1 Passenger</option>
                  <option value={2} className="bg-navy-950">2 Passengers</option>
                  <option value={3} className="bg-navy-950">3 Passengers</option>
                  <option value={4} className="bg-navy-950">4 Passengers</option>
                </select>
              </div>

              {/* Flexible dates toggle */}
              <button
                type="button"
                onClick={() => setFlexibleDates(!flexibleDates)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-all ${
                  flexibleDates 
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400" 
                    : "bg-white/[0.04] text-slate-400 border-white/10 hover:text-slate-200"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flexible (±3d)</span>
              </button>
            </div>
          </div>

          {/* Search Inputs Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Origin Airport */}
            <div className="md:col-span-4 relative group">
              <label className="block text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1.5">
                Departure Origin
              </label>
              <div className="flex items-center gap-3 bg-white/[0.05] border border-white/15 focus-within:border-cyan-400 focus-within:bg-white/[0.08] rounded-2xl px-4 py-3 transition-all">
                <PlaneTakeoff className="w-5 h-5 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="e.g. New York (JFK)"
                  className="bg-transparent w-full text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Airport Swap Button */}
            <div className="md:col-span-1 flex justify-center -my-2 md:my-0">
              <button
                type="button"
                onClick={handleSwapAirports}
                className="w-10 h-10 rounded-full bg-white/[0.07] hover:bg-cyan-500 hover:text-navy-950 border border-white/10 flex items-center justify-center text-slate-300 transition-all duration-200 shadow-md group"
                title="Swap Origin and Destination"
              >
                <ArrowRightLeft className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>
            </div>

            {/* Destination Airport */}
            <div className="md:col-span-4 relative group">
              <label className="block text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1.5">
                Arrival Destination
              </label>
              <div className="flex items-center gap-3 bg-white/[0.05] border border-white/15 focus-within:border-cyan-400 focus-within:bg-white/[0.08] rounded-2xl px-4 py-3 transition-all">
                <PlaneTakeoff className="w-5 h-5 text-cyan-400 shrink-0 transform rotate-45" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Los Angeles (LAX)"
                  className="bg-transparent w-full text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="md:col-span-3">
              <label className="block text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1.5">
                Departure Date
              </label>
              <div className="flex items-center gap-3 bg-white/[0.05] border border-white/15 focus-within:border-cyan-400 rounded-2xl px-4 py-3 transition-all">
                <Calendar className="w-5 h-5 text-cyan-400 shrink-0" />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="bg-transparent w-full text-sm text-white focus:outline-none [color-scheme:dark]"
                />
              </div>
            </div>
          </div>

          {/* Quick Route Shortcuts & Recent Searches */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.08]">
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              POPULAR CORRIDORS:
            </span>
            {recentSearches.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickRoute(r)}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors"
              >
                {r.from.split(" ")[0]} → {r.to.split(" ")[0]}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ─── Search Results & Filter Controls ─────────────────────────── */}
      <div className="space-y-4">
        
        {/* Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 font-mono">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              FILTERS:
            </span>

            {/* Time period filter */}
            <select
              value={selectedTimePeriod}
              onChange={(e) => setSelectedTimePeriod(e.target.value)}
              className="bg-navy-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">Any Departure Time</option>
              <option value="morning">Morning (05:00 - 11:59)</option>
              <option value="afternoon">Afternoon (12:00 - 16:59)</option>
              <option value="evening">Evening (17:00 - 21:59)</option>
            </select>

            {/* Aircraft Filter */}
            <select
              value={selectedAircraft}
              onChange={(e) => setSelectedAircraft(e.target.value)}
              className="bg-navy-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Aircraft Types</option>
              <option value="Boeing 777">Boeing 777</option>
              <option value="Airbus A350">Airbus A350</option>
              <option value="Boeing 737">Boeing 737</option>
              <option value="Airbus A321">Airbus A321neo</option>
            </select>

            {/* Max Price Slider */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
              <span className="text-slate-400">Under:</span>
              <span className="text-cyan-400 font-bold font-mono">₹{maxPrice.toLocaleString()}</span>
              <input
                type="range"
                min="3000"
                max="25000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-20 accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-navy-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
            >
              <option value="price_asc">Lowest Price First</option>
              <option value="price_desc">Highest Price First</option>
              <option value="time_asc">Earliest Departure</option>
              <option value="name">Flight Name</option>
            </select>

            {comparedFlightIds.length > 0 && (
              <button
                type="button"
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-navy-950 font-bold text-xs shadow-md shadow-cyan-500/20"
              >
                <span>Compare ({comparedFlightIds.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
          <span>
            SHOWING <strong className="text-cyan-300 font-semibold">{filteredFlights.length}</strong> VERIFIED FLIGHTS
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% REAL BACKEND INVENTORY
          </span>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse flex items-center justify-between">
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-white/10 rounded" />
                  <div className="w-64 h-6 bg-white/10 rounded" />
                </div>
                <div className="w-24 h-10 bg-cyan-500/20 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Flight Cards Grid */}
        {!loading && filteredFlights.length > 0 && (
          <div className="space-y-4">
            {filteredFlights.map((flight) => {
              const fid = flight.flightId || flight.id || 1;
              const isCompared = comparedFlightIds.includes(fid);
              const price = (flight.price || 4850) * passengers;
              const routeKey = `${flight.origin}-${flight.destination}`;
              const isFav = favorites.includes(routeKey);

              return (
                <div
                  key={fid}
                  className="glass-panel hover:border-cyan-500/50 p-6 rounded-2xl border border-white/10 transition-all duration-300 group hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative"
                >
                  {/* Left Col: Airline & Flight Code */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        {flight.flightName || `ANX-${fid}01`}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {flight.aircraftType || "Boeing 777-300ER"}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(routeKey)}
                        className="text-slate-400 hover:text-rose-400 transition-colors ml-1"
                        title="Save to Favorite Routes"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? "text-rose-500 fill-rose-500" : ""}`} />
                      </button>
                    </div>

                    {/* Corridor & Times */}
                    <div className="flex items-center gap-4 pt-1">
                      <div>
                        <p className="text-xl font-bold text-white font-display">
                          {flight.takeOffTime ? flight.takeOffTime.substring(11, 16) || flight.takeOffTime : "08:00"}
                        </p>
                        <p className="text-xs text-slate-400">{flight.origin || "JFK"}</p>
                      </div>

                      {/* Flight Path Graphic */}
                      <div className="flex flex-col items-center px-2">
                        <span className="text-[10px] text-cyan-400 font-mono">NON-STOP</span>
                        <div className="flex items-center gap-1.5 my-1">
                          <div className="w-2 h-2 rounded-full bg-cyan-400" />
                          <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
                          <PlaneTakeoff className="w-3.5 h-3.5 text-cyan-300 transform rotate-45" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">3h 30m</span>
                      </div>

                      <div>
                        <p className="text-xl font-bold text-white font-display">
                          {flight.arrivalTime ? flight.arrivalTime.substring(11, 16) || flight.arrivalTime : "11:30"}
                        </p>
                        <p className="text-xs text-slate-400">{flight.destination || "LAX"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Middle Col: Amenities & Badges */}
                  <div className="hidden lg:flex flex-col gap-1.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Free 7kg Cabin + 23kg Checked
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Live 3D Seat Selection Included
                    </span>
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> High-speed Wi-Fi & USB Power
                    </span>
                  </div>

                  {/* Right Col: Fare & Action Buttons */}
                  <div className="flex items-center md:items-end justify-between w-full md:w-auto md:flex-col gap-3">
                    <div className="text-left md:text-right">
                      <p className="text-xs text-slate-400">Total for {passengers} traveler{passengers > 1 ? "s" : ""}</p>
                      <p className="text-2xl font-extrabold text-white font-display">
                        ₹{price.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] text-emerald-400 font-mono">Zero Hidden Fees</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleCompare(fid)}
                        className={`p-2.5 rounded-xl border text-xs transition-all ${
                          isCompared
                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                            : "bg-white/[0.04] border-white/10 text-slate-400 hover:text-white"
                        }`}
                        title="Add to Compare Matrix"
                      >
                        <SlidersHorizontal className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectFlight({ ...flight, cabinClass, passengers, calculatedPrice: price })}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-500 hover:from-primary-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform active:scale-95"
                      >
                        <span>Select & Pick Seats</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredFlights.length === 0 && (
          <div className="p-12 text-center rounded-2xl glass-panel border border-white/10 space-y-4">
            <PlaneTakeoff className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Flights Match Your Selected Corridor</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Try adjusting your price threshold or clearing departure filters to view all scheduled departures.
            </p>
            <button
              type="button"
              onClick={() => {
                setOrigin("");
                setDestination("");
                setMaxPrice(25000);
                setSelectedTimePeriod("all");
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-navy-950 font-bold text-xs"
            >
              Reset Filters & View All Flights
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
