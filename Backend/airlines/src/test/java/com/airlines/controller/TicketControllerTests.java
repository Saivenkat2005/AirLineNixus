package com.airlines.controller;

import com.airlines.entity.ApplicationUser;
import com.airlines.entity.Booking;
import com.airlines.entity.Flight;
import com.airlines.repository.BookingRepository;
import com.airlines.repository.FlightRepository;
import com.airlines.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TicketControllerTests {

    private BookingRepository bookingRepository;
    private UserRepository userRepository;
    private FlightRepository flightRepository;
    private TicketController ticketController;

    @BeforeEach
    public void setUp() {
        bookingRepository = mock(BookingRepository.class);
        userRepository = mock(UserRepository.class);
        flightRepository = mock(FlightRepository.class);
        ticketController = new TicketController(bookingRepository, userRepository, flightRepository);
    }

    @Test
    public void testVerifyTicketSuccess() {
        Booking booking = new Booking();
        booking.setBookingId(101L);
        booking.setCustomerId(1L);
        booking.setFlightId(202L);
        booking.setSeatType("Economy Class");
        booking.setOrigin("HYD");
        booking.setDestination("DEL");
        booking.setDate("2026-10-15");
        booking.setNop(1L);
        booking.setTotalPrice(4850L);

        ApplicationUser user = new ApplicationUser();
        user.setUsername("TestTraveler");

        Flight flight = new Flight();
        flight.setFlightName("ANX 204");
        flight.setTakeOffTime("06:30");

        when(bookingRepository.findById(101L)).thenReturn(Optional.of(booking));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(flightRepository.findById(202L)).thenReturn(Optional.of(flight));

        ResponseEntity<Map<String, Object>> response = ticketController.verifyTicket("NX-101");
        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        Map<String, Object> body = response.getBody();
        assertNotNull(body);
        assertEquals(true, body.get("verified"));
        assertEquals("TestTraveler", body.get("passenger"));
        assertEquals("ANX 204", body.get("flight"));
        assertEquals("CONFIRMED", body.get("status"));
    }

    @Test
    public void testVerifyTicketNotFound() {
        when(bookingRepository.findById(999L)).thenReturn(Optional.empty());

        ResponseEntity<Map<String, Object>> response = ticketController.verifyTicket("NX-999");
        assertNotNull(response);
        assertEquals(404, response.getStatusCode().value());
        Map<String, Object> body = response.getBody();
        assertNotNull(body);
        assertEquals(false, body.get("verified"));
    }

    @Test
    public void testVerifyTicketInvalidPnr() {
        ResponseEntity<Map<String, Object>> response = ticketController.verifyTicket("INVALID-PNR");
        assertNotNull(response);
        assertEquals(404, response.getStatusCode().value());
        Map<String, Object> body = response.getBody();
        assertNotNull(body);
        assertEquals(false, body.get("verified"));
    }
}
