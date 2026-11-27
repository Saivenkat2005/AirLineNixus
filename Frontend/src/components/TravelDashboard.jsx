import React, { useState, useEffect } from "react";
import { 
  User, 
  Calendar, 
  Plane, 
  CreditCard, 
  Award, 
  TrendingUp, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Search
} from "lucide-react";
import { api } from "../services/api";

export default function TravelDashboard({
  currentUserId = 3,
  onViewBoardingPass,
  onSelectFlightToBook
}) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming"); // "upcoming" | "history" | "stats"
  const [pnrSearch, setPnrSearch] = useState("");
  const [verifiedTicket, setVerifiedTicket] = useState(null);

  const loadUserBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getBookingsByUserId(currentUserId);
      if (Array.isArray(data)) {
        setBookings(data);
      }
    } catch (err) {
      setError("Could not load user booking history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserBookings();
  }, [currentUserId]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm(`Are you sure you want to cancel booking #${bookingId}? Seats will be released back to inventory.`)) {
      return;
    }
    try {
      await api.deleteBooking(bookingId);
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
    } catch (err) {
      alert("Failed to cancel booking. Please try again.");
    }
  };

  const handleSearchPnr = async (e) => {
    e.preventDefault();
    if (!pnrSearch) return;
    try {
      const data = await api.verifyTicket(pnrSearch);
      setVerifiedTicket(data);
    } catch (err) {
      setVerifiedTicket({ verified: false, error: "Invalid PNR record." });
    }
  };

  const totalSpent = bookings.reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);
  const totalFlights = bookings.length;
  const milesEarned = totalFlights * 1250;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8">
      
      {/* ─── Profile & Frequent Flyer Stat Banner ───────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-3xl bg-gradient-to-r from-navy-900 to-navy-950 border border-white/10 relative overflow-hidden">
        
        {/* User Identity */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-cyan-500/20">
            RB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-display">Raakesh Bandi</h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                NEXUS PLATINUM
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              passenger@persistent.com • User ID #{currentUserId}
            </p>
          </div>
        </div>

        {/* Travel Stats Quick Counters */}
        <div className="flex items-center gap-6 text-xs font-mono">
          <div>
            <p className="text-slate-400">TOTAL MILES</p>
            <p className="text-xl font-bold text-cyan-300 font-display mt-0.5">{milesEarned.toLocaleString()}</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <p className="text-slate-400">FLIGHTS TAKEN</p>
            <p className="text-xl font-bold text-white font-display mt-0.5">{totalFlights}</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <p className="text-slate-400">LIFETIME SPEND</p>
            <p className="text-xl font-bold text-emerald-400 font-display mt-0.5">₹{totalSpent.toLocaleString()}</p>
          </div>
        </div>

      </div>

      {/* ─── PNR Lookup Tool ────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
        <span className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5" />
          DIRECT TICKET / PNR VERIFICATION SYSTEM
        </span>
        <form onSubmit={handleSearchPnr} className="flex gap-2 max-w-md">
          <input
            type="text"
            value={pnrSearch}
            onChange={(e) => setPnrSearch(e.target.value)}
            placeholder="Enter PNR e.g. NX-1 or NX-2"
            className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-cyan-500 text-navy-950 font-bold text-xs shadow-md shadow-cyan-500/20"
          >
            Verify PNR
          </button>
        </form>

        {verifiedTicket && (
          <div className={`p-4 rounded-xl border text-xs font-mono ${
            verifiedTicket.verified ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}>
            {verifiedTicket.verified ? (
              <div className="space-y-1">
                <p className="font-bold">✓ PNR {verifiedTicket.pnr} VERIFIED</p>
                <p>Passenger: {verifiedTicket.passenger} • Flight: {verifiedTicket.flight} ({verifiedTicket.seat})</p>
                <p>Route: {verifiedTicket.origin} → {verifiedTicket.destination} on {verifiedTicket.date}</p>
              </div>
            ) : (
              <p>✗ {verifiedTicket.error || "PNR could not be verified."}</p>
            )}
          </div>
        )}
      </div>

      {/* ─── Bookings Tabs & List ───────────────────────────────────── */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("upcoming")}
              className={`text-sm font-bold pb-2 transition-all border-b-2 ${
                activeTab === "upcoming" 
                  ? "border-cyan-400 text-cyan-300" 
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              My Booked Journeys ({bookings.length})
            </button>
          </div>

          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> SYNCHRONIZED WITH MYSQL
          </span>
        </div>

        {loading && (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse h-28" />
            ))}
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <Plane className="w-12 h-12 text-slate-500 mx-auto" />
            <h4 className="text-base font-bold text-white">No Booked Journeys Found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven't booked any flights under this profile yet. Explore available flights to start your journey.
            </p>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Flight & PNR Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      NX-{booking.bookingId}
                    </span>
                    <span className="text-xs font-mono text-slate-300">
                      {booking.flightName || `FL-${booking.flightId}`}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">
                      ● CONFIRMED
                    </span>
                  </div>

                  <p className="text-lg font-bold text-white font-display mt-1">
                    {booking.origin} → {booking.destination}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                    <span>Date: {booking.date}</span>
                    <span>•</span>
                    <span>Departure: {booking.takeOffTime || "08:00 AM"}</span>
                    <span>•</span>
                    <span className="text-cyan-300">Seat: {booking.seatNumbers || "12A"}</span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between w-full md:w-auto md:flex-col items-end gap-3">
                  <div className="text-left md:text-right">
                    <p className="text-xs text-slate-400">Total Paid</p>
                    <p className="text-xl font-bold text-white font-mono">
                      ₹{Number(booking.totalPrice || 0).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onViewBoardingPass && onViewBoardingPass(booking)}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Boarding Pass</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCancelBooking(booking.bookingId)}
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 text-xs transition-all"
                      title="Cancel Booking & Refund"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
