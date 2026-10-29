import { test, expect } from '@playwright/test';

// Validate a Page Title
test('open and validate a page title', async ({ page }) => {

    // Navigate to the dashboard URL
    await page.goto('http://localhost:3000');
    // Get the title of the page
    const pageTitle = await page.title();
    // Check that the title of the page contains 'Book'
    expect(pageTitle).toBe("BookStore");
});

// Click Operation
test('simple click action', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Sign In');
  expect(await page.url()).toBe('http://localhost:3000/login');
});

// Fill Submit a Form
test('fill and submit form', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('#username', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('button[type="submit"]');
  expect(await page.url()).toContain('/home');
});

test('fill and submit search form', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=🔍');
  await page.fill('text=Search books...', 'Harry Potter');
});

// Extracting Page Content

test('extract text content', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const mainHeader = await page.textContent('h1');
  expect(mainHeader).toBe('Welcome to the BookStore');
});

test('add book to cart and verify', async ({ page }) => {
  // TODO: Navigate to 'http://localhost:3000'
  await page.goto("http://localhost:3000");

  // TODO: Click on the first 'Add to Cart' button
  await page.locator("(//button[normalize-space()='Add to Cart'])[1]").click();
  
  // TODO: Click on the cart icon (🛒)
  await page.locator("//a[@href='/cart']").click();
  
  // TODO: Verify that the span inside the list item contains the text 'The Great Gatsby - $10.99'
  expect(await page.locator("//li/span")).toContainText("The Great Gatsby - $10.99");
});

// Implementing Advanced Selectors

test('product navigation and verification', async ({ page }) => {
  await page.goto('http://localhost:3000/books');
  const title = page.locator('.book-title:has-text("Harry Potter and the Philosopher\'s Stone")');
  await expect(title).toBeVisible();
});

test('dynamic element selection', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  const bookTitles = page.locator('.book-title');
  expect(await bookTitles.count()).toBe(4);
});


test('product navigation and verification', async ({ page }) => {
  await page.goto('http://localhost:3000/books');
  await page.click('text=Harry Potter and the Philosopher\'s Stone');
  const title = page.locator('.book-title:has-text("Harry Potter and the Philosopher\'s Stone")');
  await expect(title).toBeVisible();
});

test('dynamic element selection', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  const dynamicElement = page.locator('.book-title').nth(1);
  await expect(dynamicElement).toHaveText('To Kill a Mockingbird');
});


test('product navigation and add to cart', async ({ page }) => {
  await page.goto('http://localhost:3000/books');
  // Click the first three "Add to Cart" buttons
  const addToCartButtons = page.locator('button:has-text("Add to Cart")');
  await addToCartButtons.nth(0).click();
  await addToCartButtons.nth(1).click();
  await addToCartButtons.nth(2).click();
  
  // Check if the cart has 3 items
  const cartItemsCount = page.locator('a');
  await expect(cartItemsCount).toContainText('3');
});


test('book search verification', async ({ page }) => {
  await page.goto('http://localhost:3000/books');

  // TODO: Search for 'the' in the books
  await page.locator("//input[@placeholder='Search books...']").fill("the");
  
  const searchResult = await page.locator("//h2[contains(@class, 'book-title')]");
  
  // TODO: Expect that the number of books containing 'the' in their title is 5
  expect(await searchResult.count()).toEqual(5);
});


test('product navigation and verification', async ({ page }) => {
  await page.goto('http://localhost:3000/books');
  const title = page.locator('.book-title:has-text("Harry Potter and the Philosopher\'s Stone")');
  await expect(title).toBeVisible();
});

test('dynamic element selection', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  const bookTitles = page.locator('.book-title');
  expect(await bookTitles.count()).toBe(4);
});