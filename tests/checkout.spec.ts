import { test, expect } from '@playwright/test';


test('Proceed to checkout and verify card details page', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.waitForLoadState('domcontentloaded');

  const firstProduct = page.locator('.single-products').first();
  await firstProduct.hover();
  const addToCartButton = firstProduct.locator('.product-overlay a.add-to-cart');
  await addToCartButton.click();

  await page.getByRole('link', { name: /view cart/i }).waitFor({ state: 'visible' });
  await page.getByRole('link', { name: /view cart/i }).click();

  await page.getByText('Proceed To Checkout').click();

  const registerLoginLink = page.getByRole('link', { name: /register \/ login/i });
  if (await registerLoginLink.isVisible({ timeout: 3000 }).catch(() => false)) {
    await registerLoginLink.click();

    const loginForm = page.locator('form').filter({ hasText: 'Login' });
    await loginForm.getByPlaceholder('Email Address').fill('playwrighttest@example.com');
    await loginForm.getByPlaceholder('Password').fill('GFXbtcVV@57kPSH');
    await loginForm.getByRole('button', { name: 'Login' }).click();
  }

  await page.goto('https://automationexercise.com/view_cart');
  await page.getByText('Proceed To Checkout').click();

  await page.getByRole('link', { name: /place order/i }).click();

  await expect(page.locator('input[name="name_on_card"]')).toBeVisible();
  await expect(page.locator('input[name="card_number"]')).toBeVisible();
  await expect(page.locator('input[name="cvc"]')).toBeVisible();
  await expect(page.locator('input[name="expiry_month"]')).toBeVisible();
  await expect(page.locator('input[name="expiry_year"]')).toBeVisible();

  await page.screenshot({ path: 'screenshots/payment-page.png', fullPage: true });
});
