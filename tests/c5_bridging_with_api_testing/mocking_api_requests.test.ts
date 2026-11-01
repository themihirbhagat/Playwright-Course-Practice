import { test, expect } from '@playwright/test';

// =================================================================
// ==================== Run a Mock API Test ========================
// =================================================================

test('mocking API response for book data', async ({ page }) => {
  await page.route('http://localhost:3000/api/books', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 101, title: 'Mock Book', author: 'Mock Author', price: 99.99, category: 'Mock Category' }
      ]),
    });
  });

  await page.goto('http://localhost:3000/books');
  
  const bookTitle = await page.textContent('.book-title');
  expect(bookTitle).toBe('Mock Book');
});

// =================================================================
// ============ Master Mock API Responses ==========================
// =================================================================

test('mocking API response for book data', async ({ page }) => {
  await page.route('http://localhost:3000/api/books', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 101, title: 'Mock Book', author: 'Mock Author', price: 99.99, category: 'Mock Category' },
        { id: 102, title: 'Mock Book 2', author: 'Custom Author', price: 100, category: 'Mock Category 2' }
      ]),
    });
  });

  await page.goto('http://localhost:3000/books');

  // TODO: Change this to mock the books API with multiple books and type in the search box to check for the author's name of the filtered book
  await page.locator("//input[@placeholder='Search books...']").fill("Custom Author");
  const bookTitle = await page.textContent('.book-title');


  // TODO: Update the expect statements to confirm that only the mock book is shown, and not the other book that was added
  expect(bookTitle).toBe('Mock Book 2');
});

// =================================================================
// ============ Complete Mock API Response Task ====================
// =================================================================

test('mocking API response for login success', async ({ page }) => {
  await page.route('http://localhost:3000/api/login', route => {

    const postData = route.request().postData();
    
    if (postData === null) {
        throw new Error('Request body is missing.');
    }
    const requestBody = JSON.parse(postData);

    if (requestBody.username === 'testUser' && requestBody.password === 'testPass') {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Login successful' }),
      });
    } else {
      // TODO: Complete the route fulfillment for invalid credentials
      // It should return status 401 with success set to false
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({"success":false,"message":"Invalid credentials"}),
      });
    }
  });

  await page.goto('http://localhost:3000/login');

  // TODO: Test valid user credentials
  await page.fill('#username', 'testUser');
  await page.fill('#password', 'testPass');
  await page.click('button[type="submit"]');
  
  // TODO: Verify that user is redirected to home page after a successful login
  await expect(page).toHaveURL('http://localhost:3000/home');
  // TODO: Go back to the login page to test invalid user credentials
  await page.click('text=🚪 Logout')
  await expect(page.locator('text=🔑 Login')).toBeVisible();
  // TODO: Test invalid user credentials and verify alert dialog message
  await page.locator('text=🔑 Login').click();
  await page.fill('#username', 'testUser1');
  await page.fill('#password', 'testPass1');
  const dialogPromise = page.waitForEvent('dialog');
  await page.click('button[type="submit"]');
  const dialog = await dialogPromise;
  expect(dialog.message()).toBe('Invalid credentials');
  await dialog.accept();
});
