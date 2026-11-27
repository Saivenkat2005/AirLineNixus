package com.airlines.service.impl;

import com.airlines.repository.SeatDetailsRepository;
import com.airlines.service.SeatTypeService;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.StringRedisTemplate;
import java.util.concurrent.TimeUnit;

import com.airlines.dto.SeatTypeDTO;
import com.airlines.entity.SeatDetails;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class SeatTypeServiceImpl implements SeatTypeService {
    private final SeatDetailsRepository seatDetailsRepository;
    private final com.airlines.repository.BookingRepository bookingRepository;
    
    private final StringRedisTemplate redisTemplate;
    
    private final Map<String, String> inMemoryLock = new ConcurrentHashMap<>();

    public SeatTypeServiceImpl(
            SeatDetailsRepository seatDetailsRepository,
            com.airlines.repository.BookingRepository bookingRepository,
            @Autowired(required = false) StringRedisTemplate redisTemplate) {
        this.seatDetailsRepository = seatDetailsRepository;
        this.bookingRepository = bookingRepository;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public SeatDetails getSeatDetailsById(Long id) {
        return seatDetailsRepository.findById(java.util.Objects.requireNonNull(id)).get();
    }

    @Override
    public SeatDetails insertSeat(SeatDetails seatDetails) {
        seatDetailsRepository.save(java.util.Objects.requireNonNull(seatDetails));
        return seatDetails;
    }

    @Override
    public List<SeatDetails> getAllSeatDetails() {
        return seatDetailsRepository.findAll();
    }

    @Override
    public SeatDetails updateSeatById(SeatDetails seatDetails, Long seatId) {
        SeatDetails seatDetailsDB = seatDetailsRepository.findById(java.util.Objects.requireNonNull(seatId)).get();
        if (Objects.nonNull(seatDetails.getSeatType()) && !"".equalsIgnoreCase(seatDetails.getSeatType()))
            seatDetailsDB.setSeatType(seatDetails.getSeatType());
        if (Objects.nonNull(seatDetails.getAvailableSeats()))
            seatDetailsDB.setAvailableSeats(seatDetails.getAvailableSeats());
        if (Objects.nonNull(seatDetails.getPrice()))
            seatDetailsDB.setPrice(seatDetails.getPrice());
        return seatDetailsRepository.save(java.util.Objects.requireNonNull(seatDetailsDB));
    }

    @Override
    public void deleteSeatDetailsById(Long seatId) {
        seatDetailsRepository.deleteById(java.util.Objects.requireNonNull(seatId));
    }

    @Override
    public List<SeatTypeDTO> getSeatsByFlightId(Long flightId) {
        List<SeatDetails> fetchedSeatDetails = seatDetailsRepository.getSeatDetailsByFlightId(flightId);
        List<SeatTypeDTO> seatTypeDTOList = new ArrayList<>();
        for (SeatDetails s : fetchedSeatDetails) {
            SeatTypeDTO seatTypeDTO = new SeatTypeDTO(s.getSeatId(), s.getFlightId(),s.getSeatType(), s.getAvailableSeats(), s.getPrice());
            seatTypeDTOList.add(seatTypeDTO);
        }
        return seatTypeDTOList;
    }

    @Override
    public List<com.airlines.dto.SeatStatusDTO> getSeatMapStatus(Long flightId, String seatType) {
        List<com.airlines.dto.SeatStatusDTO> seats = new ArrayList<>();
        List<com.airlines.entity.Booking> bookings = bookingRepository.getBookingsByFlightIdAndSeatType(flightId, seatType);
        java.util.Set<String> occupiedSeats = new java.util.HashSet<>();
        if (bookings != null) {
            for (com.airlines.entity.Booking b : bookings) {
                if (b.getSeatNumbers() != null && !b.getSeatNumbers().isEmpty()) {
                    String[] nums = b.getSeatNumbers().split(",");
                    for (String n : nums) {
                        occupiedSeats.add(n.trim());
                    }
                }
            }
        }
        
        for (int i = 0; i < 40; i++) {
            String seatIdStr = "S" + (i + 1);
            String rowNumber = String.valueOf((i / 4) + 1);
            char letter = new char[]{'A', 'B', 'C', 'D'}[i % 4];
            String seatNumber = rowNumber + letter;
            
            String status = "AVAILABLE";
            if (occupiedSeats.contains(seatNumber)) {
                status = "OCCUPIED";
            } else {
                String key = "seat:hold:" + flightId + ":" + seatType + ":" + seatNumber;
                String lockedBy = null;
                if (redisTemplate != null) {
                    try {
                        lockedBy = redisTemplate.opsForValue().get(key);
                    } catch(Exception e) {}
                }
                if (lockedBy == null) {
                    lockedBy = inMemoryLock.get(key);
                }
                if (lockedBy != null) {
                    status = "LOCKED";
                }
            }
            
            boolean isPremium = (i < 8);
            seats.add(new com.airlines.dto.SeatStatusDTO(seatIdStr, seatNumber, status, isPremium));
        }
        return seats;
    }

    public boolean holdSeat(Long seatId, String userId) {
        // Keeping original method for backward compatibility
        String key = "seat:hold:" + seatId;
        if (redisTemplate != null) {
            try {
                Boolean success = redisTemplate.opsForValue().setIfAbsent(key, userId, 5, TimeUnit.MINUTES);
                return Boolean.TRUE.equals(success);
            } catch (Exception e) {}
        }
        return inMemoryLock.putIfAbsent(key, userId) == null;
    }

    public boolean holdSpecificSeat(Long flightId, String seatType, String seatNumber, String userId) {
        String key = "seat:hold:" + flightId + ":" + seatType + ":" + seatNumber;
        if (redisTemplate != null) {
            try {
                Boolean success = redisTemplate.opsForValue().setIfAbsent(key, userId, 5, TimeUnit.MINUTES);
                return Boolean.TRUE.equals(success);
            } catch (Exception e) {}
        }
        return inMemoryLock.putIfAbsent(key, userId) == null;
    }
}
