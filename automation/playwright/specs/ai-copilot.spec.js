const { test, expect } = require('@playwright/test');
const { AiCopilotPage } = require('../pages/AiCopilotPage');

test.describe('AI Travel Copilot & Multi-Turn Intelligence', () => {
  test('User can converse with copilot and receive grounded flight recommendations', async ({ page }) => {
    await page.goto('/');

    const aiTab = page.locator('button:has-text("AI Copilot"), button:has-text("Travel Copilot")').first();
    await aiTab.click();

    const copilotPage = new AiCopilotPage(page);
    await copilotPage.sendQuery('Find flights from Hyderabad to Delhi under ₹8000');

    // Verify response arrives with verified grounding
    const responseText = page.locator('text=verified, text=ANX-305, text=Delhi');
    await expect(responseText.first()).toBeVisible({ timeout: 10000 });
  });

  test('Verify baggage policy retrieval with verified document citations', async ({ page }) => {
    await page.goto('/');

    const aiTab = page.locator('button:has-text("AI Copilot"), button:has-text("Travel Copilot")').first();
    await aiTab.click();

    const copilotPage = new AiCopilotPage(page);
    await copilotPage.sendQuery('What is the baggage allowance for Economy Class?');

    const baggageResponse = page.locator('text=7 kg, text=15 kg, text=DOC-BAG-2026');
    await expect(baggageResponse.first()).toBeVisible({ timeout: 10000 });
  });
});
