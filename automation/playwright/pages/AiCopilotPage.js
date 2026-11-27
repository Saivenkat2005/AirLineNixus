class AiCopilotPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.chatInput = page.locator('input[placeholder*="Ask anything"]');
    this.sendButton = page.locator('button:has-text("Ask")');
    this.chatMessages = page.locator('.whitespace-pre-line');
    this.multiCityTab = page.locator('button:has-text("Multi-City Trip Planner")');
    this.recoveryTab = page.locator('button:has-text("Booking Recovery Agent")');
    this.flightChangeTab = page.locator('button:has-text("Flight Change Impact")');
  }

  async sendQuery(message) {
    await this.chatInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.chatInput.fill(message);
    await this.sendButton.click();
  }

  async selectPresetPrompt(text) {
    const promptBtn = this.page.locator(`button:has-text("${text}")`).first();
    await promptBtn.waitFor({ state: 'visible', timeout: 5000 });
    await promptBtn.click();
  }
}

module.exports = { AiCopilotPage };
