package com.airlines.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDto {
    private Long bookingId;
    private Long flightId;
    private String flightName;
    private String takeOffTime;
    private String customerName;
    private String seatType;
    private String origin;
    private String destination;
    private String date;
    private Long nop;
    private Long totalPrice;
    private String seatNumbers;
    private String status;

    // Backward-compatible 11-argument constructor
    public BookingDto(Long bookingId, Long flightId, String flightName, String takeOffTime,
                      String customerName, String seatType, String origin, String destination,
                      String date, Long nop, Long totalPrice) {
        this(bookingId, flightId, flightName, takeOffTime, customerName, seatType, origin, destination, date, nop, totalPrice, null, "CONFIRMED");
    }

    // Backward-compatible 12-argument constructor
    public BookingDto(Long bookingId, Long flightId, String flightName, String takeOffTime,
                      String customerName, String seatType, String origin, String destination,
                      String date, Long nop, Long totalPrice, String seatNumbers) {
        this(bookingId, flightId, flightName, takeOffTime, customerName, seatType, origin, destination, date, nop, totalPrice, seatNumbers, "CONFIRMED");
    }

    public String toString() {
        return "Booking Id: " + bookingId + "\nFlight Id: " + flightId + "\nFlight Name: " + flightName
                + "\nTake Off time: " + takeOffTime + "\nCustomer name: " + customerName + "\nSeat Type: " + seatType
                + "\nOrigin: " + origin + "\nDestination: " + destination + "\nDate of Journey: " + date
                + "\nNo. of People: " + nop + "\nTotal Price: " + totalPrice
                + (seatNumbers != null ? ("\nSeat Numbers: " + seatNumbers) : "")
                + (status != null ? ("\nStatus: " + status) : "");
    }
}
