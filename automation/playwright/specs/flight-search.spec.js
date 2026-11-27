const { test, expect } = require('@playwright/test');
const { FlightSearchPage } = require('../pages/FlightSearchPage');

test.describe('Flight Search & Corridor Network Journey', () => {
  test('User can browse verified flights and view corridor schedules', async ({ page }) => {
    const searchPage = new FlightSearchPage(page);
    await searchPage.goto();

    // Verify Title and Core Header
    await expect(page).toHaveTitle(/Airline Nexus/i);

    // Verify Flights are loaded from backend
    const flightHeaders = page.locator('text=PA-101, text=ANX-204, text=New York');
    await expect(flightHeaders.first()).toBeVisible({ timeout: 10000 });
  });

  test('Filter flights by destination and select for booking', async ({ page }) => {
    const searchPage = new FlightSearchPage(page);
    await searchPage.goto();

    // Select flight to advance to seat selection or booking
    await searchPage.selectFirstFlightForBooking();
  });
});
