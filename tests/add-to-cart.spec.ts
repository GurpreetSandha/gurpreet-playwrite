import { test, expect } from '@playwright/test';
/*
 My Approach for this problem statement:

 In this test, I’m trying to verify the basic “Add to Cart” flow on Automation Exercise.
 The idea is simple first open the homepage, add the first visible product to the cart,
 click on “View Cart” when the popup appears, and finally check if that product is 
 actually present inside the cart page.

 This helps confirm that the “Add to cart” functionality is working end-to-end.
*/

test('Add first product to cart and verify it appears in cart', async ({ page }) => {
  await page.goto('https://automationexercise.com');
  await page.waitForLoadState('domcontentloaded');
  
  // Get ALL products on the page
  const allProducts = page.locator('.single-products');
  
  // Get the FIRST product dynamically
  const firstProduct = allProducts.first();
  
  // Hover over it to reveal the overlay
  await firstProduct.hover();
  
  // Click the "Add to cart" button in the overlay of THIS specific product
  const addToCartButton = firstProduct.locator('.product-overlay a.add-to-cart');
  await addToCartButton.click();
  
  // Store the product name BEFORE going to cart (for verification later)
  const productName = await firstProduct.locator('.productinfo p, .overlay-content p').first().innerText();
  
  // Handle the modal
  await page.getByRole('link', { name: /view cart/i }).waitFor({ state: 'visible' });
  await page.getByRole('link', { name: /view cart/i }).click();
  
  // Verify navigation
  await expect(page).toHaveURL(/.*view_cart/);
  
  // Verify the product we added is actually in the cart
  const cartTable = page.locator('.cart_info tbody');
  const cartItems = cartTable.locator('tr');
  
  // Check that cart has at least one item
  await expect(cartItems).toHaveCount(1, { timeout: 5000 });
  
  // Verify the product name matches what we added
  const cartProductName = await cartItems.first().locator('.cart_description h4 a').innerText();
  expect(cartProductName).toBe(productName);
});