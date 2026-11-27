const fs = require('fs');

// 1. Update SeatTypeController.java
const seatPath = 'Backend/airlines/src/main/java/com/airlines/controller/SeatTypeController.java';
let seatContent = fs.readFileSync(seatPath, 'utf8');
seatContent = seatContent.replace('@GetMapping("/get")', '@GetMapping({"/get", "/all"})');
fs.writeFileSync(seatPath, seatContent);
console.log('Updated SeatTypeController');

// 2. Update BookingController.java for graceful degradation on Redis
const bookingPath = 'Backend/airlines/src/main/java/com/airlines/controller/BookingController.java';
let bookingContent = fs.readFileSync(bookingPath, 'utf8');

const oldMethod = `    @PostMapping("/add")
    public Booking addBooking(
            @Valid @RequestBody Booking booking,
            @RequestHeader(value = "Idempotency-Key", required = false) String idempotencyKey
    ) throws ResourceNotAvailableException {
        if (idempotencyKey != null && redisTemplate != null) {
            String redisKey = "idempotency:" + idempotencyKey;
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
            
            try {
                Booking savedBooking = bookingService.addBooking(booking);
                redisTemplate.opsForValue().set(redisKey, objectMapper.writeValueAsString(savedBooking), 24, TimeUnit.HOURS);
                return savedBooking;
            } catch (Exception e) {
                throw new RuntimeException(e);
            } finally {
                redisTemplate.delete(redisKey + ":lock");
            }
        }
        return bookingService.addBooking(booking);
    }`;

const newMethod = `    @PostMapping("/add")
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
    }`;

if (bookingContent.includes('public Booking addBooking(')) {
    // Replace CRLF / LF resiliently
    bookingContent = bookingContent.replace(
        /    @PostMapping\("\/add"\)[\s\S]*?return bookingService\.addBooking\(booking\);\s*\}/,
        newMethod
    );
    fs.writeFileSync(bookingPath, bookingContent);
    console.log('Updated BookingController with graceful Redis degradation');
}
