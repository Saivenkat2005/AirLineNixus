package com.airlines.controller;

import com.airlines.handlers.ResourceNotAvailableException;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.concurrent.TimeUnit;

import com.airlines.dto.BookingDto;
import com.airlines.entity.Booking;
import com.airlines.service.BookingService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin("*")
public class BookingController {
    private final BookingService bookingService;
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public BookingController(BookingService bookingService, @Autowired(required = false) StringRedisTemplate redisTemplate) {
        this.bookingService = bookingService;
        this.redisTemplate = redisTemplate;
    }

    @PostMapping("/add")
    public Booking addBooking(
            @Valid @RequestBody Booking booking,
            @RequestHeader(value = "Idempotency-Key", required = false) String idempotencyKey
    ) throws ResourceNotAvailableException {
        if (idempotencyKey != null && redisTemplate != null) {
            String redisKey = "idempotency:" + idempotencyKey;
            try {
                String cachedResponse = redisTemplate.opsForValue().get(redisKey);
                if (cachedResponse != null) {
                    try {
                        return objectMapper.readValue(cachedResponse, Booking.class);
                    } catch (Exception e) {
                        // Ignore parsing error, proceed to create
                    }
                }
                
                // Acquire a temporary lock to prevent concurrent double-clicks
                Boolean locked = redisTemplate.opsForValue().setIfAbsent(redisKey + ":lock", "locked", 10, TimeUnit.SECONDS);
                if (Boolean.FALSE.equals(locked)) {
                    throw new ResourceNotAvailableException("Duplicate booking request is currently processing.");
                }
            } catch (ResourceNotAvailableException rne) {
                throw rne;
            } catch (Exception ex) {
                // Redis unreachable: log and degrade gracefully to DB transaction
                System.err.println("WARN: Redis degraded for idempotency lock: " + ex.getMessage());
            }
            
            try {
                Booking savedBooking = bookingService.addBooking(booking);
                try {
                    redisTemplate.opsForValue().set(redisKey, objectMapper.writeValueAsString(savedBooking), 24, TimeUnit.HOURS);
                } catch (Exception ex) {
                    // Cache save failure must never corrupt successful booking
                }
                return savedBooking;
            } catch (Exception e) {
                throw new RuntimeException(e);
            } finally {
                try {
                    redisTemplate.delete(redisKey + ":lock");
                } catch (Exception ex) {
                    // Lock deletion failure ignored
                }
            }
        }
        return bookingService.addBooking(booking);
    }

    @GetMapping("/get")
    public List<BookingDto> getBookings() {
        return bookingService.getBookings();
    }

    @GetMapping("/getbooking/{bookingId}")
    public BookingDto getBookingById(@PathVariable("bookingId") Long bookingId) {
        return bookingService.getBookingById(bookingId);
    }

    @GetMapping("/get/{customerId}")
    public List<BookingDto> getBookingByUserId(@PathVariable("customerId") Long customerId) {
        return bookingService.getBookingByUserId(customerId);
    }

    @PutMapping("/update")
    public Booking updateBookingById(@Valid @RequestBody Booking booking) {
        return bookingService.updateBookingById(booking, booking.getBookingId());
    }

    @DeleteMapping("/delete/{bookingId}")
    public String deleteBookingById(@PathVariable("bookingId") Long bookingId) {
        bookingService.deleteBookingById(bookingId);
        return "Booking deleted";
    }
}
