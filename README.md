# Playwright Automation Exercise Assignment

This repository contains an **end-to-end test suite** built with **Playwright** and **TypeScript** for [AutomationExercise](https://automationexercise.com).  
The tests were created as part of a QA automation assignment provided by Bug0 AI.

---

## Assignment Problem Statement

The following tasks were automated:

1. **Visit Home Page**  
   Navigate to [AutomationExercise](https://automationexercise.com) and verify that the homepage loads successfully by checking for the visibility of the **"AutomationExercise"** text.

2. **Add Product to Cart**  
   Add the first product to the cart, click **"View Cart"** in the confirmation popup, and assert that the product is visible in the cart.

3. **Proceed to Checkout**  
   Click the **"Proceed To Checkout"** button. If prompted, log in using the following test credentials:  
   - **Email:** playwrighttest@example.com  
   - **Password:** GFXbtcVV@57kPSH

4. **Place the Order**  
   Verify that the website prompts for card details and save a screenshot of the order review/payment page.

---

## Project Approach

- The tests are written in **TypeScript** using **Playwright’s test runner**.  
- Each test covers one major functionality, following a narrative style to make it easy to understand:  
  - `homepage.spec.ts` → Verifies the homepage loads.  
  - `add-to-cart.spec.ts` → Adds the first product to the cart and verifies it.  
  - `checkout.spec.ts` → Proceeds to checkout, logs in if needed, and verifies the payment page.

- **Screenshots** are taken at key steps for verification:
  - `homepage.png` — Homepage verification screenshot
  - `screenshots/order-page.png` — Payment page screenshot

