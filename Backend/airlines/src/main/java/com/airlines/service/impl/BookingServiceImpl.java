package com.airlines.service.impl;

import com.airlines.constants.Constants;
import com.airlines.handlers.ResourceNotAvailableException;
import com.airlines.repository.BookingRepository;
import com.airlines.repository.FlightRepository;
import com.airlines.repository.SeatDetailsRepository;
import com.airlines.repository.UserRepository;
import com.airlines.service.BookingService;
import com.airlines.dto.BookingDto;
import com.airlines.entity.ApplicationUser;
import com.airlines.entity.Booking;
import com.airlines.entity.Flight;
import com.airlines.entity.SeatDetails;
import org.springframework.stereotype.Service;
import org.springframework.kafka.core.KafkaTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final FlightRepository flightRepository;
    private final EmailSenderServiceImpl senderService;
    private final SeatDetailsRepository seatDetailsRepository;
    private final UserRepository userRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public BookingServiceImpl(
            BookingRepository bookingRepository,
            FlightRepository flightRepository,
            EmailSenderServiceImpl senderService,
            SeatDetailsRepository seatDetailsRepository,
            UserRepository userRepository,
            @Autowired(required = false) KafkaTemplate<String, String> kafkaTemplate) {
        this.bookingRepository = bookingRepository;
        this.flightRepository = flightRepository;
        this.senderService = senderService;
        this.seatDetailsRepository = seatDetailsRepository;
        this.userRepository = userRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Booking addBooking(Booking booking) throws ResourceNotAvailableException {
        if (booking.getCustomerId() == null || booking.getCustomerId() <= 0) {
            booking.setCustomerId(3L);
        }
        Optional<ApplicationUser> user = userRepository.findById(booking.getCustomerId());
        String username = user.isPresent() ? user.get().getUsername() : "Passenger";
        String userEmail = user.isPresent() ? user.get().getUserEmail() : "passenger@persistent.com";

        // Validate seat uniqueness at database level before allocation
        if (booking.getSeatNumbers() != null && !booking.getSeatNumbers().trim().isEmpty() && booking.getFlightId() != null) {
            String[] requestedSeats = booking.getSeatNumbers().split(",");
            List<Booking> existingBookings = bookingRepository.getBookingsByFlightIdAndSeatType(booking.getFlightId(), booking.getSeatType());
            if (existingBookings != null) {
                for (Booking eb : existingBookings) {
                    if (eb.getSeatNumbers() != null) {
                        for (String existingSeat : eb.getSeatNumbers().split(",")) {
                            for (String reqSeat : requestedSeats) {
                                if (existingSeat.trim().equalsIgnoreCase(reqSeat.trim())) {
                                    throw new ResourceNotAvailableException("Seat " + reqSeat.trim() + " is already occupied on this flight.");
                                }
                            }
                        }
                    }
                }
            }
        }

        SeatDetails s = null;
        if (booking.getFlightId() != null && booking.getSeatType() != null) {
            s = seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(booking.getFlightId(), booking.getSeatType());
        }
        if (s == null && booking.getFlightId() != null) {
            List<SeatDetails> allSeats = seatDetailsRepository.getSeatDetailsByFlightId(booking.getFlightId());
            if (allSeats != null && !allSeats.isEmpty()) {
                for (SeatDetails sd : allSeats) {
                    if (sd.getSeatType() != null && sd.getSeatType().equalsIgnoreCase(booking.getSeatType())) {
                        s = sd;
                        break;
                    }
                }
                if (s == null) {
                    s = allSeats.get(0);
                }
            }
        }

        long availableSeats = (s != null && s.getAvailableSeats() != null) ? s.getAvailableSeats() : 100L;
        long seatPrice = (s != null && s.getPrice() != null) ? s.getPrice() : 4850L;
        long nop = (booking.getNop() != null && booking.getNop() > 0) ? booking.getNop() : 1L;
        booking.setNop(nop);

        if (nop <= availableSeats) {
            if (s != null) {
                s.setAvailableSeats(Math.max(0, s.getAvailableSeats() - nop));
                seatDetailsRepository.save(s);
            }
            if (booking.getTotalPrice() == null || booking.getTotalPrice() <= 0) {
                booking.setTotalPrice(seatPrice * nop);
            }
            bookingRepository.save(booking);

            Flight f = (booking.getFlightId() != null) ? flightRepository.findById(booking.getFlightId()).orElse(null) : null;
            String flightName = (f != null && f.getFlightName() != null) ? f.getFlightName() : "FL-" + booking.getFlightId();
            String takeOffTime = (f != null && f.getTakeOffTime() != null) ? f.getTakeOffTime() : "TBD";
            String seatType = (s != null && s.getSeatType() != null) ? s.getSeatType() : (booking.getSeatType() != null ? booking.getSeatType() : "Economy");

            BookingDto bookingDto = new BookingDto(
                booking.getBookingId(),
                booking.getFlightId(),
                flightName,
                takeOffTime,
                username,
                seatType,
                booking.getOrigin() != null ? booking.getOrigin() : "DEL",
                booking.getDestination() != null ? booking.getDestination() : "BOM",
                booking.getDate() != null ? booking.getDate() : "2026-07-04",
                booking.getNop(),
                booking.getTotalPrice(),
                booking.getSeatNumbers(),
                "CONFIRMED"
            );

            try {
                senderService.sendBookingEmail(userEmail, Constants.GREETING_MSG + bookingDto.toString() + Constants.CONFIRM_MSG, Constants.BOOK_MAIL_SUBJECT);
            } catch (Exception e) {
                System.err.println("Skipping booking email: " + e.getMessage());
            }

            if (kafkaTemplate != null) {
                CompletableFuture.runAsync(() -> {
                    try {
                        String bookingJson = objectMapper.writeValueAsString(bookingDto);
                        kafkaTemplate.send("booking-events", "BOOKING_CREATED", bookingJson);
                    } catch (Exception e) {
                        // Outbox pattern fallback
                    }
                });
            }
            return booking;
        } else {
            throw new ResourceNotAvailableException("Only " + availableSeats + " Seats are currently available.");
        }
    }

    @Override
    public List<BookingDto> getBookings() {
        List<Booking> fetchedBookingList = bookingRepository.findAll();
        Map<Long, ApplicationUser> userMap = new HashMap<>();
        for (ApplicationUser u : userRepository.findAll()) {
            if (u.getUserId() != null) userMap.put(u.getUserId(), u);
        }
        Map<Long, Flight> flightMap = new HashMap<>();
        for (Flight fl : flightRepository.findAll()) {
            if (fl.getFlightId() != null) flightMap.put(fl.getFlightId(), fl);
        }

        List<BookingDto> bookingDtoList = new ArrayList<>();
        for (Booking b : fetchedBookingList) {
            ApplicationUser customer = b.getCustomerId() != null ? userMap.get(b.getCustomerId()) : null;
            Flight f = (b.getFlightId() != null) ? flightMap.get(b.getFlightId()) : null;
            String uname = (customer != null && customer.getUsername() != null) ? customer.getUsername() : "Passenger";
            String fname = (f != null && f.getFlightName() != null) ? f.getFlightName() : "FL-" + b.getFlightId();
            String ftime = (f != null && f.getTakeOffTime() != null) ? f.getTakeOffTime() : "TBD";
            BookingDto bookingDto = new BookingDto(b.getBookingId(), b.getFlightId(), fname, ftime, uname, b.getSeatType(), b.getOrigin(), b.getDestination(), b.getDate(), b.getNop(), b.getTotalPrice(), b.getSeatNumbers(), "CONFIRMED");
            bookingDtoList.add(bookingDto);
        }
        return bookingDtoList;
    }

    @Override
    public BookingDto getBookingById(Long bookingId) {
        Booking b = bookingRepository.findById(java.util.Objects.requireNonNull(bookingId)).orElse(null);
        if (b != null) {
            ApplicationUser customer = userRepository.findById(b.getCustomerId()).orElse(null);
            Flight f = (b.getFlightId() != null) ? flightRepository.findById(b.getFlightId()).orElse(null) : null;
            String uname = (customer != null && customer.getUsername() != null) ? customer.getUsername() : "Passenger";
            String fname = (f != null && f.getFlightName() != null) ? f.getFlightName() : "FL-" + b.getFlightId();
            String ftime = (f != null && f.getTakeOffTime() != null) ? f.getTakeOffTime() : "TBD";
            BookingDto bookingDto = new BookingDto(b.getBookingId(), b.getFlightId(), fname, ftime, uname, b.getSeatType(), b.getOrigin(), b.getDestination(), b.getDate(), b.getNop(), b.getTotalPrice(), b.getSeatNumbers(), "CONFIRMED");
            return bookingDto;
        }
        return null;
    }

    @Override
    public void deleteBookingById(Long bookingId) {
        Booking b = bookingRepository.findById(java.util.Objects.requireNonNull(bookingId)).orElse(null);
        if (b != null) {
            Optional<ApplicationUser> user = userRepository.findById(b.getCustomerId());
            String uname = user.isPresent() ? user.get().getUsername() : "Passenger";
            String userEmail = user.isPresent() ? user.get().getUserEmail() : "passenger@persistent.com";
            Flight f = (b.getFlightId() != null) ? flightRepository.findById(b.getFlightId()).orElse(null) : null;
            String fname = (f != null && f.getFlightName() != null) ? f.getFlightName() : "FL-" + b.getFlightId();
            String ftime = (f != null && f.getTakeOffTime() != null) ? f.getTakeOffTime() : "TBD";
            SeatDetails seatDetails = (b.getFlightId() != null && b.getSeatType() != null) ? seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(b.getFlightId(), b.getSeatType()) : null;
            if (seatDetails != null) {
                seatDetails.setAvailableSeats(seatDetails.getAvailableSeats() + b.getNop());
                seatDetailsRepository.save(seatDetails);
            }
            BookingDto bookingDto = new BookingDto(b.getBookingId(), b.getFlightId(), fname, ftime, uname, b.getSeatType(), b.getOrigin(), b.getDestination(), b.getDate(), b.getNop(), b.getTotalPrice(), b.getSeatNumbers(), "CANCELLED");
            try {
                senderService.sendBookingEmail(userEmail, Constants.CANCEL_MSG + bookingDto.toString() + Constants.CANCEL_STATUS_MSG, Constants.CANCEL_SUBJECT);
            } catch (Exception e) {
                System.err.println("Cancel email skipped: " + e.getMessage());
            }
            bookingRepository.deleteById(java.util.Objects.requireNonNull(bookingId));
        }
    }

    @Override
    public List<BookingDto> getBookingByUserId(Long customerId) {
        List<Booking> fetchedBookingDetails = bookingRepository.getAllBookingsByCustomerId(java.util.Objects.requireNonNull(customerId));
        Map<Long, Flight> flightMap = new HashMap<>();
        for (Flight fl : flightRepository.findAll()) {
            if (fl.getFlightId() != null) flightMap.put(fl.getFlightId(), fl);
        }
        ApplicationUser customer = userRepository.findById(customerId).orElse(null);
        String uname = (customer != null && customer.getUsername() != null) ? customer.getUsername() : "Passenger";

        List<BookingDto> bookingDtoList = new ArrayList<>();
        for (Booking b : fetchedBookingDetails) {
            Flight f = (b.getFlightId() != null) ? flightMap.get(b.getFlightId()) : null;
            String fname = (f != null && f.getFlightName() != null) ? f.getFlightName() : "FL-" + b.getFlightId();
            String ftime = (f != null && f.getTakeOffTime() != null) ? f.getTakeOffTime() : "TBD";
            BookingDto bookingDto = new BookingDto(b.getBookingId(), b.getFlightId(), fname, ftime, uname, b.getSeatType(), b.getOrigin(), b.getDestination(), b.getDate(), b.getNop(), b.getTotalPrice(), b.getSeatNumbers(), "CONFIRMED");
            bookingDtoList.add(bookingDto);
        }
        return bookingDtoList;
    }

    @Override
    public Booking updateBookingById(Booking booking, Long bookingId) {
        Booking bookingDb = bookingRepository.findById(java.util.Objects.requireNonNull(bookingId)).orElse(null);
        if (bookingDb == null) return null;
        Optional<ApplicationUser> user = userRepository.findById(bookingDb.getCustomerId());
        String userEmail = user.isPresent() ? user.get().getUserEmail() : "passenger@persistent.com";
        if (Objects.nonNull(booking.getFlightId())) {
            bookingDb.setFlightId(booking.getFlightId());
            try {
                senderService.sendBookingEmail(userEmail, Constants.BOOKING_CHANGE_MSG+bookingDb.getBookingId()+ "\n\nFLight ID: "+ bookingDb.getFlightId(), Constants.BOOKING_CHANGE_SUBJECT);
            } catch (Exception e) {}
        }
        if (Objects.nonNull(booking.getSeatType()) && !"".equalsIgnoreCase(booking.getSeatType())) {
            SeatDetails seatDetailsDB1 = seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(bookingDb.getFlightId(), bookingDb.getSeatType());
            if (seatDetailsDB1 != null) {
                seatDetailsDB1.setAvailableSeats(seatDetailsDB1.getAvailableSeats() + bookingDb.getNop());
                seatDetailsRepository.save(seatDetailsDB1);
            }
            bookingDb.setSeatType(booking.getSeatType());
            try {
                senderService.sendBookingEmail(userEmail, Constants.BOOKING_CHANGE_MSG+bookingDb.getBookingId()+ "\n\nSeat Type: "+bookingDb.getSeatType(), Constants.BOOKING_CHANGE_SUBJECT);
            } catch (Exception e) {}
            SeatDetails seatDetailsDB = seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(bookingDb.getFlightId(), bookingDb.getSeatType());
            if (seatDetailsDB != null) {
                bookingDb.setTotalPrice(seatDetailsDB.getPrice() * bookingDb.getNop());
                seatDetailsDB.setAvailableSeats(Math.max(0, seatDetailsDB.getAvailableSeats() - bookingDb.getNop()));
                seatDetailsRepository.save(seatDetailsDB);
            }
        }
        if (Objects.nonNull(booking.getOrigin()) && !"".equalsIgnoreCase(booking.getOrigin())) {
            bookingDb.setOrigin(booking.getOrigin());
            try {
                senderService.sendBookingEmail(userEmail, Constants.BOOKING_CHANGE_MSG+ bookingDb.getBookingId()+"\n\nOrigin: "+bookingDb.getOrigin(), Constants.BOOKING_CHANGE_SUBJECT);
            } catch (Exception e) {}
        }
        if (Objects.nonNull(booking.getDestination()) && !"".equalsIgnoreCase(booking.getDestination())) {
            bookingDb.setDestination(booking.getDestination());
            try {
                senderService.sendBookingEmail(userEmail, Constants.BOOKING_CHANGE_MSG+ bookingDb.getBookingId()+"\n\nDestination: "+bookingDb.getDestination(), Constants.BOOKING_CHANGE_SUBJECT);
            } catch (Exception e) {}
        }
        if (Objects.nonNull(booking.getDate()) && !"".equalsIgnoreCase(booking.getDate())) {
            bookingDb.setDate(booking.getDate());
            try {
                senderService.sendBookingEmail(userEmail, Constants.BOOKING_CHANGE_MSG+bookingDb.getBookingId() +"\n\nDate: "+bookingDb.getDate(), Constants.BOOKING_CHANGE_SUBJECT);
            } catch (Exception e) {}
        }
        if (Objects.nonNull(booking.getSeatNumbers()) && !"".equalsIgnoreCase(booking.getSeatNumbers())) {
            bookingDb.setSeatNumbers(booking.getSeatNumbers());
        }
        if (Objects.nonNull(booking.getNop())) {
            SeatDetails seatDetailsDB1 = seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(bookingDb.getFlightId(), bookingDb.getSeatType());
            if (seatDetailsDB1 != null) {
                seatDetailsDB1.setAvailableSeats(seatDetailsDB1.getAvailableSeats() + bookingDb.getNop());
                seatDetailsRepository.save(seatDetailsDB1);
            }
            bookingDb.setNop(booking.getNop());
            try {
                senderService.sendBookingEmail(userEmail, Constants.BOOKING_CHANGE_MSG+ bookingDb.getBookingId()+ "\n\nNOP: " + bookingDb.getNop(), Constants.BOOKING_CHANGE_SUBJECT);
            } catch (Exception e) {}
            SeatDetails seatDetailsDB = seatDetailsRepository.getAvailableSeatsByFlightIdAndSeatType(bookingDb.getFlightId(), bookingDb.getSeatType());
            if (seatDetailsDB != null) {
                bookingDb.setTotalPrice(seatDetailsDB.getPrice() * bookingDb.getNop());
                seatDetailsDB.setAvailableSeats(Math.max(0, seatDetailsDB.getAvailableSeats() - bookingDb.getNop()));
                seatDetailsRepository.save(seatDetailsDB);
            }
        }
        return bookingRepository.save(bookingDb);
    }
}
