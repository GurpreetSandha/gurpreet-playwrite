/*
 My Approach for this problem statement:

 In this test, I’m trying to verify the basic “Add to Cart” flow on Automation Exercise.
 The idea is simple first open the homepage, add the first visible product to the cart,
 click on “View Cart” when the popup appears, and finally check if that product is 
 actually present inside the cart page.

 This helps confirm that the “Add to cart” functionality is working end-to-end.
*/

import { test, expect } from '@playwright/test';

test('Add first product to cart and verify it appears in cart', async ({ page }) => {
  // Starting off by visiting the homepage
  await page.goto('https://automationexercise.com');
  await page.waitForLoadState('domcontentloaded');

  // Before doing anything, I just want to make sure the products section is actually visible
  const productsSection = page.locator('.features_items');
  await expect(productsSection).toBeVisible();

  // Now, from the entire list of products, I’ll pick the very first one
  const firstProduct = productsSection.locator('.product-image-wrapper').first();

  // Each product card has an "Add to cart" button — let's click on that for our first product
  const addToCartButton = firstProduct.locator('a:has-text("Add to cart")').first();
  await addToCartButton.filter({ has: page.locator(':visible') }).click();

  // Once we click the button, a confirmation popup should appear — waiting for it
  const viewCartButton = page.locator('text=View Cart');
  await expect(viewCartButton).toBeVisible({ timeout: 5000 });

  // Clicking on “View Cart” to move to the cart page
  await viewCartButton.click();

  // Now I’ll verify that the page URL has changed to something with 'view_cart' in it
  await expect(page).toHaveURL(/.*view_cart/);

  // Next, I’ll check if the cart table is visible — that’s where products are listed
  const cartTable = page.locator('.cart_info');
  await expect(cartTable).toBeVisible();

  // Looking inside the cart to see if at least one product row is present
  const cartItems = cartTable.locator('tbody tr');
  await expect(cartItems.first()).toBeVisible();

  // Just to confirm, I’ll grab the product’s name and log it in the console
  const itemName = await cartItems.first().locator('.cart_description h4 a').innerText();

  // Lastly, verifying that the product name isn’t empty — a simple sanity check
  expect(itemName.length).toBeGreaterThan(0);
});
