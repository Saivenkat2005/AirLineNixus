import React, { useState } from "react";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Plane, 
  CreditCard, 
  User, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  Download,
  Lock,
  Layers
} from "lucide-react";
import CabinSeatMap3D from "./CabinSeatMap3D";
import { api } from "../services/api";

export default function BookingFlow({
  flight,
  onBookingComplete,
  onCancel,
  currentUserId = 3
}) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Flight, 2: Passengers, 3: Seats, 4: Fare, 5: Payment, 6: Confirmed
  const [passengers, setPassengers] = useState([
    {
      fullName: "Raakesh Bandi",
      email: "passenger@persistent.com",
      phone: "9876543212",
      idNumber: "P98745612",
      meal: "Standard",
    }
  ]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({
    cardholderName: "Raakesh Bandi",
    cardNumber: "4532 •••• •••• 8829",
    expiry: "09/28",
    cvv: "721"
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const basePrice = flight?.calculatedPrice || flight?.price || 4850;
  const seatExtraFee = selectedSeats.reduce((acc, s) => {
    // If VIP / Business row (row 1 or 2)
    const row = parseInt(s);
    return acc + (row <= 2 ? 1200 : 0);
  }, 0);
  const airportFee = 450;
  const taxes = Math.round((basePrice + seatExtraFee) * 0.12);
  const grandTotal = Math.max(0, basePrice + seatExtraFee + airportFee + taxes - discount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "NEXUS10" || promoCode.trim().toUpperCase() === "FIRST") {
      setDiscount(1000);
      setBookingError("");
    } else {
      setBookingError("Invalid promo code. Try 'NEXUS10' for ₹1,000 off.");
    }
  };

  const handleExecutePayment = async () => {
    setIsProcessing(true);
    setBookingError("");

    // Create unique idempotency key to prevent double bookings (Rule 5 & Rule 7)
    const idempotencyKey = "nx-idemp-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8);

    const bookingPayload = {
      customerId: currentUserId,
      flightId: flight.flightId || flight.id || 1,
      seatType: flight.seatType || "Economy",
      origin: flight.origin || "DEL",
      destination: flight.destination || "BOM",
      date: flight.date || "2026-07-04",
      nop: passengers.length,
      totalPrice: grandTotal,
      seatNumbers: selectedSeats.join(",") || "12A",
    };

    try {
      const result = await api.addBooking(bookingPayload, idempotencyKey);
      setConfirmedBooking(result);
      setCurrentStep(6);
      if (onBookingComplete) onBookingComplete(result);
    } catch (err) {
      setBookingError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Transaction failed. Please check seat availability or retry."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8">
      
      {/* ─── Stepper Progress Bar ────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        {[
          { num: 1, label: "Flight" },
          { num: 2, label: "Travelers" },
          { num: 3, label: "Seat Selection" },
          { num: 4, label: "Fare Breakdown" },
          { num: 5, label: "Payment" },
        ].map((step, idx) => (
          <div key={step.num} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                currentStep === step.num
                  ? "bg-cyan-400 text-navy-950 ring-4 ring-cyan-400/20"
                  : currentStep > step.num
                  ? "bg-emerald-500 text-white"
                  : "bg-white/[0.05] text-slate-500 border border-white/10"
              }`}
            >
              {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
            </div>
            <span className={`hidden md:inline text-xs font-medium ${
              currentStep === step.num ? "text-cyan-300 font-bold" : "text-slate-400"
            }`}>
              {step.label}
            </span>
            {idx < 4 && <div className="hidden sm:block w-8 md:w-16 h-0.5 bg-white/10" />}
          </div>
        ))}
      </div>

      {bookingError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{bookingError}</span>
        </div>
      )}

      {/* ─── Step 1: Flight Review ───────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white font-display">Step 1: Confirm Corridor</h3>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded">
                {flight.flightName || "ANX-101"}
              </span>
              <span className="text-xs text-slate-400 font-mono">{flight.aircraftType || "Boeing 777"}</span>
            </div>
            <div className="flex items-center justify-between text-white font-display">
              <div>
                <p className="text-2xl font-bold">{flight.origin}</p>
                <p className="text-xs text-slate-400 font-mono">Departure: {flight.takeOffTime || "08:00"}</p>
              </div>
              <Plane className="w-6 h-6 text-cyan-400" />
              <div className="text-right">
                <p className="text-2xl font-bold">{flight.destination}</p>
                <p className="text-xs text-slate-400 font-mono">Arrival: {flight.arrivalTime || "11:30"}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-xs text-slate-400 hover:text-white">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 text-navy-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <span>Next: Traveler Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── Step 2: Passenger Details ───────────────────────────────── */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white font-display">Step 2: Traveler Information</h3>
          {passengers.map((p, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <p className="text-xs font-mono text-cyan-400 font-bold">TRAVELER #{idx + 1} (PRIMARY)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={p.fullName}
                    onChange={(e) => {
                      const updated = [...passengers];
                      updated[idx].fullName = e.target.value;
                      setPassengers(updated);
                    }}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Email for E-Ticket</label>
                  <input
                    type="email"
                    value={p.email}
                    onChange={(e) => {
                      const updated = [...passengers];
                      updated[idx].email = e.target.value;
                      setPassengers(updated);
                    }}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Mobile Contact</label>
                  <input
                    type="text"
                    value={p.phone}
                    onChange={(e) => {
                      const updated = [...passengers];
                      updated[idx].phone = e.target.value;
                      setPassengers(updated);
                    }}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Passport / National ID</label>
                  <input
                    type="text"
                    value={p.idNumber}
                    onChange={(e) => {
                      const updated = [...passengers];
                      updated[idx].idNumber = e.target.value;
                      setPassengers(updated);
                    }}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 text-navy-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <span>Next: Pick 3D Seats</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── Step 3: Interactive 3D Seat Selection ───────────────────── */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white font-display">Step 3: Select Your Cabin Seat</h3>
          <CabinSeatMap3D
            flight={flight}
            selectedSeats={selectedSeats}
            onSeatsChange={setSelectedSeats}
            onProceedToPassengerDetails={() => setCurrentStep(4)}
            currentUserId={String(currentUserId)}
          />
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Travelers
            </button>
          </div>
        </div>
      )}

      {/* ─── Step 4: Transparent Fare Breakdown ──────────────────────── */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white font-display">Step 4: Transparent Fare Breakdown</h3>
          
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Base Airfare ({passengers.length} passenger{passengers.length > 1 ? "s" : ""})</span>
              <span className="font-mono">₹{basePrice.toLocaleString()}</span>
            </div>
            {seatExtraFee > 0 && (
              <div className="flex justify-between text-xs text-amber-300">
                <span>VIP Business / Extra Legroom Seat Upgrades ({selectedSeats.join(", ")})</span>
                <span className="font-mono">+₹{seatExtraFee.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-slate-300">
              <span>Airport User Development Fee</span>
              <span className="font-mono">₹{airportFee}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Aviation Security & GST (12%)</span>
              <span className="font-mono">₹{taxes.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-xs text-emerald-400 font-bold">
                <span>Promotional Discount</span>
                <span className="font-mono">-₹{discount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-lg font-bold text-white">
              <span>Total Payable</span>
              <span className="text-2xl font-mono text-cyan-400">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Promo Code Input */}
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo Code (Try NEXUS10)"
              className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs text-cyan-300 font-bold border border-white/10"
            >
              Apply Code
            </button>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Seats
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 text-navy-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <span>Proceed to Secure Payment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── Step 5: Secure Payment Simulation ───────────────────────── */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-display">Step 5: Secure Payment Guarantee</h3>
            <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
              <Lock className="w-3.5 h-3.5" /> 256-BIT ENCRYPTED
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 max-w-xl">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Cardholder Name</label>
              <input
                type="text"
                value={paymentDetails.cardholderName}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardholderName: e.target.value })}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Card Number</label>
              <input
                type="text"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={paymentDetails.expiry}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">CVV / CVC</label>
                <input
                  type="password"
                  maxLength={4}
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Fare
            </button>
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleExecutePayment}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-navy-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform active:scale-95"
            >
              {isProcessing ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-navy-950 border-t-transparent animate-spin" />
                  <span>Authorizing Transaction...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Pay ₹{grandTotal.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ─── Step 6: Confirmation Screen ─────────────────────────────── */}
      {currentStep === 6 && confirmedBooking && (
        <div className="text-center py-8 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-300">
            <Check className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              BOOKING CONFIRMED & COMMITTED
            </span>
            <h2 className="text-2xl font-bold text-white font-display mt-1">
              Your Journey is Secured
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-mono">
              PNR / RECORD LOCATOR: <strong className="text-cyan-300">NX-{confirmedBooking.bookingId || "104"}</strong>
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Flight:</span>
              <span className="text-white font-bold">{flight.flightName || "ANX-101"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Corridor:</span>
              <span className="text-white">{flight.origin} → {flight.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Assigned Seats:</span>
              <span className="text-cyan-300 font-bold">{confirmedBooking.seatNumbers || selectedSeats.join(", ") || "12A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Paid:</span>
              <span className="text-emerald-400 font-bold">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => onBookingComplete(confirmedBooking)}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 text-navy-950 font-bold text-xs shadow-md shadow-cyan-500/20"
            >
              View Digital Boarding Pass
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
