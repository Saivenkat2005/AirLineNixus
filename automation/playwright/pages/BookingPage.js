class BookingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('input[placeholder*="Name"], input[name="fullName"]');
    this.emailInput = page.locator('input[type="email"], input[name="email"]');
    this.phoneInput = page.locator('input[type="tel"], input[name="phone"]');
    this.payButton = page.locator('button:has-text("Complete Reservation"), button:has-text("Pay & Confirm")');
    this.confirmationCard = page.locator('div:has-text("TICKET CONFIRMED"), div:has-text("PNR")');
  }

  async fillPassengerDetails(fullName, email, phone) {
    if (await this.nameInput.isVisible()) await this.nameInput.fill(fullName);
    if (await this.emailInput.isVisible()) await this.emailInput.fill(email);
    if (await this.phoneInput.isVisible()) await this.phoneInput.fill(phone);
  }

  async submitBooking() {
    await this.payButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.payButton.click();
  }
}

module.exports = { BookingPage };
