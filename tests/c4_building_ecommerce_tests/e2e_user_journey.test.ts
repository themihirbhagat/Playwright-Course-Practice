import { test, expect } from '@playwright/test';

// =================================================================
// ============ Master E2E Testing Skills ==========================
// =================================================================
test('end-to-end user purchase journey', async ({ page, context }) => {
  await page.goto('http://localhost:3000'); // Open the homepage
  
  // Navigate to login page and perform login
  await page.click('text=🔑 Login'); 
  await page.fill('#username', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('text=Submit');
  
  // Verify user is logged in successfully
  await expect(page.locator('text=Welcome to the BookStore')).toBeVisible();
  
  // Add book to cart
  await page.locator('button:has-text("Add to Cart")').nth(1).click();
  
  // Go to cart and verify item addition
  await page.click('text=🛒');
  await expect(page.locator('text=To Kill a Mockingbird')).toBeVisible();
  
  // Navigate to account page and verify element presence
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=👤 Account')
  ]);

  // TODO: Wait for the new account page to load
  await newPage.waitForLoadState();
  // TODO: Ensure 'Your Account' text is visible on the new account page
  await expect(newPage.locator('text=Your Account')).toBeVisible(); 
});

// =================================================================
// ============ Simulate a BookStore User Journey ==================
// =================================================================

test('end-to-end user purchase journey', async ({ page, context }) => {
  await page.goto('http://localhost:3000');
  
  await page.click('text=🔑 Login');
  await page.fill('#username', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('text=Submit');
  
  await expect(page.locator('text=Welcome to the BookStore')).toBeVisible();
  
  await page.locator('button:has-text("Add to Cart")').nth(0).click();

  // TODO: Click on Load More
  await page.click('#load-more-btn');
  
  // TODO: Add two more books
  await page.locator('button:has-text("Add to Cart")').nth(1).click();
  await page.locator('button:has-text("Add to Cart")').nth(2).click();
  
  // TODO: Validate that the newly added books are in the 🛒
  await page.click('text=🛒');
  await expect(page.locator('text=The Great Gatsby')).toBeVisible();
  await expect(page.locator('text=To Kill a Mockingbird')).toBeVisible();
  await expect(page.locator('text=1984')).toBeVisible();

  // TODO: Remove one of the books
  await page.locator("//span[contains(text(), 'The Great Gatsby')]/following-sibling::button").click();
  
  // TODO: Validate that the expected book is deleted
  expect(await page.locator("//span[contains(text(), 'The Great Gatsby')]")).toHaveCount(0);
  
  // TODO: Validate that the other books remain selected
  expect(await page.locator("//span[contains(text(), 'To Kill a Mockingbird')]")).toHaveCount(1);
  expect(await page.locator("//span[contains(text(), '1984')]")).toHaveCount(1);
  
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=👤 Account')
  ]);
  await newPage.waitForLoadState();
  await expect(newPage.locator('text=Your Account')).toBeVisible(); 
});

// =================================================================
// ============ Enhance User Journey with Ordering =================
// =================================================================

// Starter code for end-to-end user purchase journey
test('end-to-end user purchase journey', async ({ page, context }) => {
  await page.goto('http://localhost:3000');
  
  await page.click('text=🔑 Login');
  await page.fill('#username', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('text=Submit');
  
  await expect(page.locator('text=Welcome to the BookStore')).toBeVisible();

  // Add a book from the initially displayed books to the cart
  await page.locator('button:has-text("Add to Cart")').nth(0).click();

  // Click on Load More button to display more books
  await page.click('text=Load more');
  
  // Add two books from the newly displayed books to the cart
  await page.locator('button:has-text("Add to Cart")').nth(5).click();
  await page.locator('button:has-text("Add to Cart")').nth(7).click();

  // Access the cart and check for the added books
  await page.click('text=🛒');
  await expect(page.locator('text=The Great Gatsby')).toBeVisible();
  await expect(page.locator('text=The Hobbit')).toBeVisible();
  await expect(page.locator('text=Fahrenheit 451')).toBeVisible();

  // Remove a book from the cart
  await page.locator('button:has-text("Remove")').nth(1).click();
  await expect(page.locator('text=The Hobbit')).not.toBeVisible();
  
  // Verify remaining books are still in the cart
  await expect(page.locator('text=The Great Gatsby')).toBeVisible();
  await expect(page.locator('text=Fahrenheit 451')).toBeVisible();

  // TODO: Handle the confirmation pop-up dialog
  page.on('dialog', async dialog => {
    await dialog.accept();
  });
  
  // TODO: Click on Order button
  await page.locator('text=Order').click();
  
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=👤 Account')
  ]);
  await newPage.waitForLoadState();

  await expect(newPage.locator('text=Your Account')).toBeVisible();

  // TODO: Verify account balance is updated based on total order value
  const totalBalance = await newPage.locator("//p[contains(text(), 'Total Account Balance')]").textContent();
  
  await expect(totalBalance).toContain("$27.02")
  
});