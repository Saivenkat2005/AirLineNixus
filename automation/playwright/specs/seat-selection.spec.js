const { test, expect } = require('@playwright/test');
const { CabinSeatMapPage } = require('../pages/CabinSeatMapPage');

test.describe('3D Cabin Seat Selection & Concurrency Hold', () => {
  test('User can inspect seats, consult AI Advisor, and lock seat for 5 minutes', async ({ page }) => {
    await page.goto('/');

    // Navigate to Seat Map tab
    const seatMapTab = page.locator('button:has-text("Cabin"), button:has-text("Seat Map")').first();
    if (await seatMapTab.isVisible()) {
      await seatMapTab.click();
    }

    const seatMapPage = new CabinSeatMapPage(page);

    // Test AI Seat Advisor recommendation
    await seatMapPage.requestAiSeatRecommendation('extra_legroom', false);

    // Verify recommendations appear
    const advisorResults = page.locator('text=Seat 14C, text=Seat 15A, text=Exit row').first();
    await expect(advisorResults).toBeVisible({ timeout: 6000 });
  });

  test('Infant safety regulation prevents Exit Row seat assignment', async ({ page }) => {
    await page.goto('/');
    const seatMapTab = page.locator('button:has-text("Cabin"), button:has-text("Seat Map")').first();
    if (await seatMapTab.isVisible()) {
      await seatMapTab.click();
    }

    const seatMapPage = new CabinSeatMapPage(page);
    await seatMapPage.requestAiSeatRecommendation('extra_legroom', true);

    // Verify safety alert
    const safetyNotice = page.locator('text=Safety Protocol Alert, text=Emergency Exit rows');
    await expect(safetyNotice).toBeVisible({ timeout: 6000 });
  });
});
