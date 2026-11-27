package com.airlines.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightTrackingDTO {
    private Long flightId;
    private String flightNumber;
    private String airline;
    private String aircraftType;
    private String origin;
    private String originCode;
    private String destination;
    private String destinationCode;
    private String scheduledDeparture;
    private String estimatedDeparture;
    private String scheduledArrival;
    private String estimatedArrival;
    private String gate;
    private String terminal;
    private String baggageBelt;
    private String status; // SCHEDULED, BOARDING, IN_AIR, DELAYED, LANDED
    private int progressPercent;
    private int delayMinutes;
    private String lastUpdated;
}
