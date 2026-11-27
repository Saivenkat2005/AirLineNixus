package com.airlines.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.airlines.dto.FlightTrackingDTO;
import com.airlines.entity.Flight;
import com.airlines.service.FlightService;

import jakarta.validation.Valid;

import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping({"/flights", "/api/v1/flights", "/api/flights"})
@CrossOrigin("*")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @PostMapping("/add")
    public Flight insertFlight(@Valid @RequestBody Flight flight) {
        return flightService.insertFlight(flight);
    }

    @GetMapping("/all")
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @GetMapping("/all/{flightId}")
    public Flight getFlightById(@PathVariable("flightId") Long flightId) {
        return flightService.getFlightById(flightId);
    }

    @DeleteMapping("/delete/{flightId}")
    public String deleteFlightById(@PathVariable("flightId") Long flightId) {
        flightService.deleteFlightById(flightId);
        return "Flight record deleted";
    }

    @PutMapping("/update")
    public Flight updateFlightById(@Valid @RequestBody Flight flight) {
        return flightService.updateFlightById(flight, flight.getFlightId());
    }

    @GetMapping("/track/{flightIdentifier}")
    public ResponseEntity<FlightTrackingDTO> trackFlight(@PathVariable("flightIdentifier") String identifier) {
        List<Flight> allFlights = flightService.getAllFlights();
        Flight matchedFlight = null;

        // Try lookup by ID
        try {
            Long id = Long.parseLong(identifier.replaceAll("[^0-9]", ""));
            for (Flight f : allFlights) {
                if (f.getFlightId() != null && f.getFlightId().equals(id)) {
                    matchedFlight = f;
                    break;
                }
            }
        } catch (Exception ignored) {}

        // Try lookup by flight name
        if (matchedFlight == null) {
            String clean = identifier.replaceAll("[\\s-]", "").toUpperCase();
            for (Flight f : allFlights) {
                if (f.getFlightName() != null && f.getFlightName().replaceAll("[\\s-]", "").toUpperCase().contains(clean)) {
                    matchedFlight = f;
                    break;
                }
            }
        }

        if (matchedFlight == null && !allFlights.isEmpty()) {
            matchedFlight = allFlights.get(0);
        }

        if (matchedFlight == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(buildTrackingData(matchedFlight));
    }

    @GetMapping("/tracking/all")
    public List<FlightTrackingDTO> getAllTracking() {
        List<Flight> flights = flightService.getAllFlights();
        List<FlightTrackingDTO> results = new ArrayList<>();
        for (Flight f : flights) {
            results.add(buildTrackingData(f));
        }
        return results;
    }

    @GetMapping("/routes")
    public List<Map<String, Object>> getFlightRoutes() {
        List<Flight> flights = flightService.getAllFlights();
        List<Map<String, Object>> routes = new ArrayList<>();
        for (Flight f : flights) {
            Map<String, Object> r = new HashMap<>();
            r.put("flightId", f.getFlightId());
            r.put("flightName", f.getFlightName());
            r.put("origin", f.getOrigin());
            r.put("originCode", extractAirportCode(f.getOrigin()));
            r.put("destination", f.getDestination());
            r.put("destinationCode", extractAirportCode(f.getDestination()));
            r.put("aircraftType", f.getAircraftType());
            r.put("takeOffTime", f.getTakeOffTime());
            r.put("arrivalTime", f.getArrivalTime());
            routes.add(r);
        }
        return routes;
    }

    private FlightTrackingDTO buildTrackingData(Flight flight) {
        String originCode = extractAirportCode(flight.getOrigin());
        String destCode = extractAirportCode(flight.getDestination());
        long fid = flight.getFlightId() != null ? flight.getFlightId() : 1L;

        String gate = "B" + ((fid * 7) % 30 + 1);
        String terminal = "T" + ((fid % 3) + 1);
        String belt = "Belt " + ((fid % 8) + 1);

        String status = flight.getStatus() != null ? flight.getStatus().toUpperCase() : "SCHEDULED";
        int progress = 45;
        int delay = 0;

        if ("CANCELLED".equals(status)) {
            progress = 0;
            delay = 0;
        } else if ("LANDED".equals(status)) {
            progress = 100;
        } else if ("IN_AIR".equals(status)) {
            progress = 68;
        } else if ("DELAYED".equals(status)) {
            delay = 35;
            progress = 20;
        } else {
            // Pseudo-cycle based on flight ID for live feel
            int cycle = (int) (fid % 4);
            if (cycle == 0) {
                status = "BOARDING";
                progress = 15;
            } else if (cycle == 1) {
                status = "IN_AIR";
                progress = 62;
            } else if (cycle == 2) {
                status = "SCHEDULED";
                progress = 0;
            } else {
                status = "LANDED";
                progress = 100;
            }
        }

        return FlightTrackingDTO.builder()
                .flightId(flight.getFlightId())
                .flightNumber(flight.getFlightName() != null ? flight.getFlightName() : "ANX-" + fid)
                .airline("Airline Nexus")
                .aircraftType(flight.getAircraftType() != null ? flight.getAircraftType() : "Boeing 777")
                .origin(flight.getOrigin() != null ? flight.getOrigin() : "New York (JFK)")
                .originCode(originCode)
                .destination(flight.getDestination() != null ? flight.getDestination() : "London (LHR)")
                .destinationCode(destCode)
                .scheduledDeparture(flight.getTakeOffTime() != null ? flight.getTakeOffTime() : "08:00")
                .estimatedDeparture(flight.getTakeOffTime() != null ? flight.getTakeOffTime() : "08:00")
                .scheduledArrival(flight.getArrivalTime() != null ? flight.getArrivalTime() : "11:30")
                .estimatedArrival(flight.getArrivalTime() != null ? flight.getArrivalTime() : "11:30")
                .gate(gate)
                .terminal(terminal)
                .baggageBelt(belt)
                .status(status)
                .progressPercent(progress)
                .delayMinutes(delay)
                .lastUpdated(Instant.now().toString())
                .build();
    }

    private String extractAirportCode(String location) {
        if (location == null) return "DEL";
        if (location.contains("(") && location.contains(")")) {
            int start = location.lastIndexOf("(") + 1;
            int end = location.lastIndexOf(")");
            if (end > start) return location.substring(start, end).toUpperCase();
        }
        if (location.length() >= 3) return location.substring(0, 3).toUpperCase();
        return location.toUpperCase();
    }
}
