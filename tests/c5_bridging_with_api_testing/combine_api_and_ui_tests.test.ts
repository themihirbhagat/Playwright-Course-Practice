import { test, expect } from '@playwright/test';

// =================================================================
// ============ Validating Data Between API and UI =================
// =================================================================

test('validate book details consistency between API and UI for second book', async ({ page, request }) => {
  // Fetch book details from API for the second book
  const apiResponse = await request.get('http://localhost:3000/api/books/2');
  const bookData = await apiResponse.json();

  // Navigate to the books page on the UI
  await page.goto('http://localhost:3000/books');

  // Locate the second book title in the UI
  const uiBookTitle = await page.locator('.book-title').nth(1).textContent();

  // Validate that the book title matches between the API data and UI
  expect(uiBookTitle).toBe(bookData.title);
});

// =================================================================
// ============ Ensure Data Consistency with Search Results ========
// =================================================================

test('validate API and UI data consistency', async ({ page, request }) => {
  // Fetch API data
  const apiResponse = await request.get('http://localhost:3000/api/search?query=mockingbird');
  const bookData = await apiResponse.json();
  
  // Navigate to the UI
  await page.goto('http://localhost:3000/books');
  
  // Validate that the UI displays the same book title as the API
  const uiBookTitle = await page.locator(`.book-title`).nth(bookData[0].id - 1).textContent();
  expect(uiBookTitle).toBe(bookData[0].title);
});

// =================================================================
// ============ Master API Response Validation =====================
// =================================================================

test('validate API and UI data consistency', async ({ page, request }) => {
  // Fetch API data
  const apiResponse = await request.get('http://localhost:3000/api/books/2');
  const bookData = await apiResponse.json(); // TODO: Fix the method of handling response data
  
  // Navigate to the UI
  await page.goto('http://localhost:3000/books'); // TODO: Correct the method to navigate to the UI
  
  // Validate that the UI displays the same book title as the API
  const uiBookTitle = await page.locator(`.book-title`).nth(bookData.id - 1).textContent();
  expect(uiBookTitle).toBe(bookData.title);
});