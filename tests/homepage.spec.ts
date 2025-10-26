/*
 My Approach for this problem statement:

  This test simply checks that the homepage of Automation Exercise loads properly and that the main site title "AutomationExercise" is visible. 
  Extra but Additionally it also grabs a screenshot of the full page.
*/
import { test, expect } from '@playwright/test';

 test('Visit Home Page and verify AutomationExercise text', async ({ page }) => {
  // Now navigating to the main website
  await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Here I am waiting for DOM to fully load first
  await page.waitForLoadState('domcontentloaded');

  //Now let's check if the text "AutomationExercise" is visible on the page
  const titleText = page.locator('text=AutomationExercise').first();
  await expect(titleText).toBeVisible();

  // Here, capturing a full page screenshot just to confirm what the homepage looks like
  await page.screenshot({ path: 'homepage.png', fullPage: true });
});
