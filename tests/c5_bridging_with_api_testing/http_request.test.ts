import { test, expect } from '@playwright/test';

// =================================================================
// ============ Running HTTP GET Requests in Playwright ============
// =================================================================

// TODO: Define a test named 'perform HTTP GET request to /api/books'
test('perform HTTP GET request to /api/books', async ({ request }) => {
   
    // TODO: Use request.get to perform the HTTP GET request to the endpoint
    const response = await request.get('http://localhost:3000/api/books');
    // TODO: Verify that the response is successful
    expect(response.ok()).toBeTruthy();
    // TODO: Parse the response body to JSON
    const books = await response.json();
    // TODO: Verify that the parsed response is an array
    expect(Array.isArray(books)).toBe(true);
    // TODO: Ensure the array length is greater than 0
    expect(books.length).toBeGreaterThan(0);
});

// =================================================================
// ============ Changing API Endpoint Test Targets ============
// =================================================================

test('perform HTTP GET request to /api/categories', async ({ request }) => {
  // TODO: Change the HTTP request to fetch categories and adapt the checks accordingly
  const response = await request.get('http://localhost:3000/api/categories');
  expect(response.ok()).toBeTruthy();
  const categories = await response.json();
  expect(Array.isArray(categories)).toBe(true);
  // Change the expectation of categories.length to be equal to 3
  expect(categories.length).toBe(3);
});

// =================================================================
// ============ Complete the Playwright Test Code ==================
// =================================================================

test('perform HTTP GET request to /api/books', async ({ request }) => {
  // TODO: Perform a GET request to the /api/books endpoint
  const response = await request.get('http://localhost:3000/api/books');
  // TODO: Verify the response is successful
  expect(response.ok()).toBeTruthy();
  // TODO: Parse the response to JSON
  const books = await response.json();
  // TODO: Check that the books variable is an array and its length is greater than 4
  expect(Array.isArray(books)).toBe(true);
  expect(books.length).toBeGreaterThan(4);
  // TODO: Test the author of the 3rd book
  expect(books[2]).toHaveProperty('author', 'George Orwell');
});