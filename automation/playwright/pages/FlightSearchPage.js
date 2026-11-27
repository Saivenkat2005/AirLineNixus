class FlightSearchPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.originInput = page.locator('input[placeholder*="Origin"], input[name="origin"]');
    this.destinationInput = page.locator('input[placeholder*="Destination"], input[name="destination"]');
    this.searchButton = page.locator('button:has-text("Search Flights"), button:has-text("Find Flights")');
    this.flightCards = page.locator('.flight-card, [data-testid="flight-card"], div:has-text("Book Flight")');
    this.compareButtons = page.locator('button:has-text("Compare")');
  }

  async goto() {
    await this.page.goto('/');
  }

  async searchCorridor(origin, destination) {
    if (await this.originInput.isVisible()) {
      await this.originInput.fill(origin);
    }
    if (await this.destinationInput.isVisible()) {
      await this.destinationInput.fill(destination);
    }
    if (await this.searchButton.isVisible()) {
      await this.searchButton.click();
    }
  }

  async selectFirstFlightForBooking() {
    const bookBtn = this.page.locator('button:has-text("Select Seats"), button:has-text("Book Flight")').first();
    await bookBtn.waitFor({ state: 'visible', timeout: 8000 });
    await bookBtn.click();
  }
}

module.exports = { FlightSearchPage };
