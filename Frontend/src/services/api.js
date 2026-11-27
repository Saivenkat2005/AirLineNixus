import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach correlation ID to every outgoing request
apiClient.interceptors.request.use((config) => {
  const correlationId = "nx-" + Math.random().toString(36).substring(2, 10);
  config.headers["X-Correlation-ID"] = correlationId;
  return config;
});

export const api = {
  // Flights
  getAllFlights: async () => {
    try {
      const res = await apiClient.get("/v1/flights/all");
      return res.data;
    } catch {
      const fallback = await apiClient.get("/flights/all");
      return fallback.data;
    }
  },

  getFlightById: async (flightId) => {
    try {
      const res = await apiClient.get(`/v1/flights/all/${flightId}`);
      return res.data;
    } catch {
      const fallback = await apiClient.get(`/flights/all/${flightId}`);
      return fallback.data;
    }
  },

  addFlight: async (flightData) => {
    try {
      const res = await apiClient.post("/v1/flights/add", flightData);
      return res.data;
    } catch {
      const fallback = await apiClient.post("/flights/add", flightData);
      return fallback.data;
    }
  },

  updateFlight: async (flightData) => {
    try {
      const res = await apiClient.put("/v1/flights/update", flightData);
      return res.data;
    } catch {
      const fallback = await apiClient.put("/flights/update", flightData);
      return fallback.data;
    }
  },

  deleteFlight: async (flightId) => {
    try {
      const res = await apiClient.delete(`/v1/flights/delete/${flightId}`);
      return res.data;
    } catch {
      const fallback = await apiClient.delete(`/flights/delete/${flightId}`);
      return fallback.data;
    }
  },

  trackFlight: async (identifier) => {
    try {
      const res = await apiClient.get(`/v1/flights/track/${identifier}`);
      return res.data;
    } catch {
      const fallback = await apiClient.get(`/flights/track/${identifier}`);
      return fallback.data;
    }
  },

  getAllTracking: async () => {
    try {
      const res = await apiClient.get("/v1/flights/tracking/all");
      return res.data;
    } catch {
      const fallback = await apiClient.get("/flights/tracking/all");
      return fallback.data;
    }
  },

  getFlightRoutes: async () => {
    try {
      const res = await apiClient.get("/v1/flights/routes");
      return res.data;
    } catch {
      const fallback = await apiClient.get("/flights/routes");
      return fallback.data;
    }
  },

  // Seats
  getSeatsByFlightId: async (flightId) => {
    try {
      const res = await apiClient.get(`/v1/seat/getseats/${flightId}`);
      return res.data;
    } catch {
      const fallback = await apiClient.get(`/seat/getseats/${flightId}`);
      return fallback.data;
    }
  },

  getSeatMapStatus: async (flightId, seatType) => {
    try {
      const res = await apiClient.get(`/v1/seat/status/${flightId}/${seatType}`);
      return res.data;
    } catch {
      const fallback = await apiClient.get(`/seat/status/${flightId}/${seatType}`);
      return fallback.data;
    }
  },

  holdSpecificSeat: async (flightId, seatType, seatNumber, userId) => {
    try {
      const res = await apiClient.post(
        `/v1/seat/hold/specific/${flightId}/${seatType}/${seatNumber}?userId=${encodeURIComponent(userId)}`
      );
      return res.data;
    } catch {
      const fallback = await apiClient.post(
        `/seat/hold/specific/${flightId}/${seatType}/${seatNumber}?userId=${encodeURIComponent(userId)}`
      );
      return fallback.data;
    }
  },

  // Bookings
  addBooking: async (bookingData, idempotencyKey) => {
    const headers = {};
    if (idempotencyKey) {
      headers["Idempotency-Key"] = idempotencyKey;
    }
    try {
      const res = await apiClient.post("/v1/booking/add", bookingData, { headers });
      return res.data;
    } catch {
      const fallback = await apiClient.post("/booking/add", bookingData, { headers });
      return fallback.data;
    }
  },

  getAllBookings: async () => {
    try {
      const res = await apiClient.get("/v1/booking/get");
      return res.data;
    } catch {
      const fallback = await apiClient.get("/booking/get");
      return fallback.data;
    }
  },

  getBookingById: async (bookingId) => {
    try {
      const res = await apiClient.get(`/v1/booking/getbooking/${bookingId}`);
      return res.data;
    } catch {
      const fallback = await apiClient.get(`/booking/getbooking/${bookingId}`);
      return fallback.data;
    }
  },

  getBookingsByUserId: async (userId) => {
    try {
      const res = await apiClient.get(`/v1/booking/get/${userId}`);
      return res.data;
    } catch {
      const fallback = await apiClient.get(`/booking/get/${userId}`);
      return fallback.data;
    }
  },

  deleteBooking: async (bookingId) => {
    try {
      const res = await apiClient.delete(`/v1/booking/delete/${bookingId}`);
      return res.data;
    } catch {
      const fallback = await apiClient.delete(`/booking/delete/${bookingId}`);
      return fallback.data;
    }
  },

  // Tickets
  verifyTicket: async (pnr) => {
    try {
      const res = await apiClient.get(`/v1/tickets/verify/${pnr}`);
      return res.data;
    } catch (err) {
      if (err.response?.data) return err.response.data;
      throw err;
    }
  },

  // Media Backgrounds
  getBackgrounds: async (category = "aviation") => {
    try {
      const res = await apiClient.get(`/v1/media/aviation-backgrounds?category=${encodeURIComponent(category)}`);
      return res.data;
    } catch {
      try {
        const fallback = await apiClient.get(`/backgrounds?category=${encodeURIComponent(category)}`);
        return fallback.data;
      } catch {
        return [];
      }
    }
  },

  // AI Intelligence Copilot & Autonomous Agents Suite
  askNexusAi: async (message) => {
    try {
      const res = await apiClient.post("/v1/ai/agents/travel-copilot", { message });
      return res.data;
    } catch {
      const res = await apiClient.post("/v1/ai/assistant/chat", { message });
      return res.data;
    }
  },

  travelCopilotChat: async (message, sessionId = "default", userId = null, language = "en") => {
    try {
      const res = await apiClient.post("/v1/ai/agents/travel-copilot", {
        message,
        session_id: sessionId,
        user_id: userId,
        language
      });
      return res.data;
    } catch {
      const fallback = await apiClient.post("/v1/ai/assistant/chat", { message });
      return fallback.data;
    }
  },

  multiCityPlan: async (payload) => {
    const res = await apiClient.post("/v1/ai/agents/multi-city-plan", payload);
    return res.data;
  },

  passengerSupport: async (userId, question, bookingId = null, language = "en") => {
    const res = await apiClient.post("/v1/ai/agents/passenger-support", {
      user_id: userId,
      question,
      booking_id: bookingId,
      language
    });
    return res.data;
  },

  getSeatRecommendations: async (flightId, seatType = "Economy", preference = "window", passengerCount = 1, hasInfant = false) => {
    const res = await apiClient.post("/v1/ai/agents/seat-recommendations", {
      flight_id: flightId,
      seat_type: seatType,
      preference,
      passenger_count: passengerCount,
      has_infant: hasInfant
    });
    return res.data;
  },

  recoverBooking: async (userId, bookingId = null, transactionRef = null) => {
    const res = await apiClient.post("/v1/ai/agents/booking-recovery", {
      user_id: userId,
      booking_id: bookingId,
      transaction_reference: transactionRef
    });
    return res.data;
  },

  analyzeFlightChange: async (bookingId, userId, desiredFlightId, desiredSeatType = "Economy") => {
    const res = await apiClient.post("/v1/ai/agents/flight-change", {
      booking_id: bookingId,
      user_id: userId,
      desired_flight_id: desiredFlightId,
      desired_seat_type: desiredSeatType
    });
    return res.data;
  },

  processPassengerIntent: async (userId, naturalInstruction, bookingId = null) => {
    const res = await apiClient.post("/v1/ai/agents/intent-action", {
      user_id: userId,
      natural_instruction: naturalInstruction,
      booking_id: bookingId
    });
    return res.data;
  },

  getOperationsCopilotSummary: async (adminUserId = 1, queryType = "occupancy_and_disruptions") => {
    const res = await apiClient.post("/v1/ai/agents/operations-copilot", {
      admin_user_id: adminUserId,
      query_type: queryType
    });
    return res.data;
  },

  generateBookingEmail: async (bookingId, recipientEmail, recipientName = "Valued Traveler", language = "en", templateType = "confirmation") => {
    const res = await apiClient.post("/v1/ai/agents/generate-email", {
      booking_id: bookingId,
      recipient_email: recipientEmail,
      recipient_name: recipientName,
      language,
      template_type: templateType
    });
    return res.data;
  },

  getTravelCompanion: async (origin = "DEL", destination = "BOM", date = "2026-07-04", international = false) => {
    const res = await apiClient.get(
      `/v1/ai/agents/travel-companion?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}&international=${international}`
    );
    return res.data;
  },

  getAiEvaluationReport: async () => {
    const res = await apiClient.get("/v1/ai/evaluation/report");
    return res.data;
  },

  runLiveAiEvaluation: async () => {
    const res = await apiClient.post("/v1/ai/evaluation/run", {});
    return res.data;
  },

  runAiSuiteModule: async (endpoint, payload, method = "post") => {
    if (method === "get") {
      const res = await apiClient.get(`/v1/ai${endpoint}`);
      return res.data;
    }
    const res = await apiClient.post(`/v1/ai${endpoint}`, payload);
    return res.data;
  },

  // Users & Auth
  getAllUsers: async () => {
    try {
      const res = await apiClient.get("/v1/user/getallusers");
      return res.data;
    } catch {
      const fallback = await apiClient.get("/user/getallusers");
      return fallback.data;
    }
  },

  getUserById: async (userId) => {
    try {
      const res = await apiClient.get(`/v1/user/userbyid/${userId}`);
      return res.data;
    } catch {
      const fallback = await apiClient.get(`/user/userbyid/${userId}`);
      return fallback.data;
    }
  },

  registerUser: async (userData) => {
    try {
      const res = await apiClient.post("/v1/auth/register", userData);
      return res.data;
    } catch {
      const fallback = await apiClient.post("/auth/register", userData);
      return fallback.data;
    }
  },

  // System Health
  checkHealth: async () => {
    try {
      const [gateway, core, ai] = await Promise.allSettled([
        apiClient.get("/health"),
        apiClient.get("/actuator/health"),
        apiClient.get("/v1/ai/health"),
      ]);
      return {
        gateway: gateway.status === "fulfilled" ? gateway.value.data : { status: "DOWN" },
        core: core.status === "fulfilled" ? core.value.data : { status: "DOWN" },
        ai: ai.status === "fulfilled" ? ai.value.data : { status: "DOWN" },
      };
    } catch {
      return { status: "PARTIAL" };
    }
  },
};

export default api;
