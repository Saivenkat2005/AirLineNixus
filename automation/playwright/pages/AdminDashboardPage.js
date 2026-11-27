class AdminDashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.clusterHealthTab = page.locator('button:has-text("[1] Cluster Health")');
    this.flightInventoryTab = page.locator('button:has-text("[2] Flight Inventory")');
    this.bookingsTab = page.locator('button:has-text("[3] Transactional Bookings")');
    this.aiQualityTab = page.locator('button:has-text("[4] AI Quality & Evaluation")');
    this.operationsCopilotTab = page.locator('button:has-text("[5] Operations Copilot")');
    this.runLiveEvaluationBtn = page.locator('button:has-text("Run Live AI Evaluation")');
  }

  async openAiQualityDashboard() {
    await this.aiQualityTab.waitFor({ state: 'visible', timeout: 5000 });
    await this.aiQualityTab.click();
  }

  async runEvaluationBenchmark() {
    await this.runLiveEvaluationBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.runLiveEvaluationBtn.click();
  }
}

module.exports = { AdminDashboardPage };
