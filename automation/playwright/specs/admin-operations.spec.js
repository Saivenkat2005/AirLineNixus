const { test, expect } = require('@playwright/test');
const { AdminDashboardPage } = require('../pages/AdminDashboardPage');

test.describe('Admin Operations & AI Quality Assurance', () => {
  test('Admin can access AI Quality Dashboard and inspect evaluation metrics', async ({ page }) => {
    await page.goto('/');

    // Switch to Admin / Operations tab
    const adminTab = page.locator('button:has-text("Admin"), button:has-text("Operations")').first();
    await adminTab.click();

    const adminPage = new AdminDashboardPage(page);
    await adminPage.openAiQualityDashboard();

    // Verify DeepEval and Promptfoo KPIs are displayed
    const passRateKpi = page.locator('text=PASS RATE');
    await expect(passRateKpi).toBeVisible({ timeout: 8000 });

    const faithfulnessKpi = page.locator('text=Faithfulness (DeepEval)');
    await expect(faithfulnessKpi).toBeVisible({ timeout: 8000 });
  });

  test('Admin can trigger live AI benchmark evaluation', async ({ page }) => {
    await page.goto('/');
    const adminTab = page.locator('button:has-text("Admin"), button:has-text("Operations")').first();
    await adminTab.click();

    const adminPage = new AdminDashboardPage(page);
    await adminPage.openAiQualityDashboard();
    await adminPage.runEvaluationBenchmark();

    // Verify benchmark logs
    const completedLog = page.locator('text=All, text=assertions passed, text=compliance');
    await expect(completedLog.first()).toBeVisible({ timeout: 10000 });
  });
});
