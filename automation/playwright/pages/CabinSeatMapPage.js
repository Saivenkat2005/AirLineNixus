class CabinSeatMapPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.toggle3D = page.locator('button:has-text("3D Cabin")');
    this.toggle2D = page.locator('button:has-text("2D Flat Grid")');
    this.seatAdvisorBtn = page.locator('button:has-text("Recommend Seats")');
    this.seatAdvisorSelect = page.locator('select');
    this.infantCheckbox = page.locator('input[type="checkbox"]');
    this.continueBtn = page.locator('button:has-text("Continue with")');
  }

  async selectAvailableSeat(seatNumber = "12A") {
    const seatBtn = this.page.locator(`button:has-text("${seatNumber}")`).first();
    await seatBtn.waitFor({ state: 'visible', timeout: 5000 });
    await seatBtn.click();
  }

  async requestAiSeatRecommendation(preference = "extra_legroom", hasInfant = false) {
    if (await this.seatAdvisorSelect.isVisible()) {
      await this.seatAdvisorSelect.selectOption(preference);
    }
    if (hasInfant && await this.infantCheckbox.isVisible()) {
      await this.infantCheckbox.check();
    }
    if (await this.seatAdvisorBtn.isVisible()) {
      await this.seatAdvisorBtn.click();
    }
  }

  async proceedToBooking() {
    await this.continueBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.continueBtn.click();
  }
}

module.exports = { CabinSeatMapPage };
