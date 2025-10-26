/*
 My Approach for this problem statement:

  This test is meant to walk through the checkout process on Automation Exercise. 
  The plan is to start from the homepage, add the first available product to the cart, 
  go to the cart page, and click on “Proceed To Checkout.”  

  If the user is not already logged in, the test handles the login automatically using 
  the provided test credentials. Once logged in, it continues the checkout process and 
  verifies that the payment page (asking for card details) is displayed. Finally, it 
  captures a screenshot of that page for confirmation. 

  So, this one test covers both Step 3 (Proceed to Checkout) and Step 4 (Place the Order).
*/

import { test, expect } from '@playwright/test';

test('Proceed to checkout and verify order page', async ({ page }) => {

  // First, open the main Automation Exercise homepage
  await page.goto('https://automationexercise.com/');
  await expect(page.getByRole('heading', { name: 'AutomationExercise' }).first()).toBeVisible();

  // Next, click on “Products” from the navigation bar to make sure all products are loaded
  await page.click('a[href="/products"]');
  await expect(page.locator('.features_items')).toBeVisible();

  // Wait for the list of products to appear and grab the first one’s “Add to cart” button
  await page.waitForSelector('.features_items .product-image-wrapper', { timeout: 10000 });
  const addToCartBtn = page.locator('.features_items .productinfo a.btn.add-to-cart').first();

  // Scroll it into view (sometimes it’s below the fold) and click it forcefully
  await addToCartBtn.scrollIntoViewIfNeeded();
  await addToCartBtn.click({ force: true });

  // After clicking, a popup appears — let’s wait for “View Cart” and click it
  await page.waitForSelector('a:has-text("View Cart")', { timeout: 10000 });
  await page.click('a:has-text("View Cart")');

  // On the cart page, make sure the cart table is visible (product added successfully)
  await expect(page.locator('#cart_info_table')).toBeVisible();

  // Now we’ll proceed to checkout
  const proceedToCheckoutBtn = page.locator('.btn.btn-default.check_out');
  await expect(proceedToCheckoutBtn).toBeVisible();
  await proceedToCheckoutBtn.click();

  // If the user isn’t logged in yet, the site shows a modal asking to log in
  const registerLoginLink = page.locator('.modal-body a[href="/login"]');

  // Check if that modal is visible — if yes, we’ll perform the login steps
  if (await registerLoginLink.isVisible({ timeout: 3000 }).catch(() => false)) {

    // Click “Register / Login” in the popup
    await registerLoginLink.click();

    // Wait for the login page and fill credentials
    await page.waitForURL('**/login');
    await page.waitForSelector('input[data-qa="login-email"]');
    await page.fill('input[data-qa="login-email"]', 'playwrighttest@example.com');
    await page.fill('input[data-qa="login-password"]', 'GFXbtcVV@57kPSH');
    await page.click('button[data-qa="login-button"]');

    // Confirm successful login by checking for a “Logout” link
    await expect(page.locator('a[href="/logout"]')).toBeVisible({ timeout: 10000 });

    // Go back to the cart and click “Proceed To Checkout” again
    await page.goto('https://automationexercise.com/view_cart');
    await expect(page.locator('#cart_info_table')).toBeVisible();
    await page.locator('.btn.btn-default.check_out').click();
  }

  // Once we’re logged in and proceed, the “Review Your Order” section should appear
  await expect(page.getByText('Review Your Order')).toBeVisible({ timeout: 15000 });

  // Click on “Place Order” to move to the payment step
  const placeOrderButton = page.getByText('Place Order', { exact: true });
  await expect(placeOrderButton).toBeVisible();
  await placeOrderButton.click();

  // Verify that the payment (card details) page is displayed
  await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();

  // Capture a screenshot for record
  await page.screenshot({ path: 'screenshots/order-page.png', fullPage: true });

});
