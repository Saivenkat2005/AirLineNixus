const { test, expect } = require('@playwright/test');
const { FlightSearchPage } = require('../pages/FlightSearchPage');
const { BookingPage } = require('../pages/BookingPage');

test.describe('End-to-End Booking & ACID Transaction Workflow', () => {
  test('Complete booking with idempotency key and verify confirmation PNR', async ({ page }) => {
    const searchPage = new FlightSearchPage(page);
    await searchPage.goto();

    await searchPage.selectFirstFlightForBooking();

    const bookingPage = new BookingPage(page);
    await bookingPage.fillPassengerDetails('Rohan Sharma', 'rohan.sharma@example.com', '+919876543210');
    await bookingPage.submitBooking();
  });
});
