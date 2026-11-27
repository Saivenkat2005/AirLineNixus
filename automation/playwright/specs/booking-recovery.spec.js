const { test, expect } = require('@playwright/test');

test.describe('AI Booking Recovery Workflow', () => {
  test('User can query pending payment and recover booking state without duplicate charge', async ({ page }) => {
    await page.goto('/');

    const aiTab = page.locator('button:has-text("AI Copilot")').first();
    await aiTab.click();

    // Switch to Booking Recovery Agent sub-tab
    const recoverySubTab = page.locator('button:has-text("Booking Recovery Agent")');
    await recoverySubTab.click();

    // Click initiate recovery
    const recoverBtn = page.locator('button:has-text("Initiate Safe Booking Recovery")');
    await recoverBtn.click();

    // Verify recovery outcome
    const recoveryCard = page.locator('text=Duplicate Protection, text=Status:');
    await expect(recoveryCard.first()).toBeVisible({ timeout: 8000 });
  });
});
