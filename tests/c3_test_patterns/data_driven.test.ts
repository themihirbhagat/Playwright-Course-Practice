import { test, expect } from '@playwright/test';


// =================================================================
// ============ Executing Data Driven Testing in Action ============
// =================================================================

// Define separate expectations for dialog and page text
const loginTestData = [
  { username: 'user1', password: 'pass1', pageMessage: 'Welcome to the BookStore' },
  { username: 'wronguser', password: 'wrongpass', dialogMessage: 'Login Failed' },
];

test.describe('Data-Driven Login Tests for BookStore', () => {
  for (const data of loginTestData) {
    test(`Login test for ${data.username}`, async ({ page }) => {
      await page.goto('http://localhost:3000/login');

      await page.fill('#username', data.username);
      await page.fill('#password', data.password);

      if (data.dialogMessage) {
        // Set up the dialog listener before triggering the action
        page.once('dialog', async dialog => {
          expect(dialog.message()).toBe(data.dialogMessage);
          await dialog.dismiss();
        });
      }

      await page.click('button[type="submit"]');

      if (data.pageMessage) {
        // Verify the page content for a successful login
        const welcomeMessage = await page.locator('h1.text-4xl');
        await expect(welcomeMessage).toHaveText(data.pageMessage);
      }
    });
  }
});


// =================================================================
// ============ Enhance Cart Test with Playwright ==================
// =================================================================

const booksTestData = [
  { bookTitle: 'The Great Gatsby', expectedCount: 1 },
  { bookTitle: '1984', expectedCount: 2 },
]

// TODO: a cart test suite.
test.describe('Data-Driven Cart Tests for BookStore', () => {
  for (const data of booksTestData) {
    test(`Cart test for ${data.bookTitle}`, async ({ page }) => {
      // TODO: validate adding books to cart 
      await page.goto('http://localhost:3000/books');

      await page.locator("//input[@placeholder='Search books...']").fill(data.bookTitle);
      
      for (var i = 0; i < data.expectedCount; i++) {
        await page.locator("//h2[contains(@class, 'book-title')]/following-sibling::button").click();
      }
      await page.locator("//a[@href='/cart']").click();
      
      const cartItems = await page.locator("//h2[normalize-space()='Your Cart']/following-sibling::ul/li");
      
      await expect(cartItems).toHaveCount(data.expectedCount);
      
    });
  }
});


// =================================================================
// ============ Fix the search text bug ============================
// =================================================================

// Define expectations for each scenario
const searchTestData = [
  { searchTerm: 'The Great Gatsby', resultCount: 1 },
  { searchTerm: 'Nonexistent Book', resultCount: 0 },
];

test.describe('Data-Driven Search Tests', () => {
  for (const data of searchTestData) {
    test(`Search test for ${data.searchTerm} term`, async ({ page }) => {
      await page.goto('http://localhost:3000/books');

      await page.fill('#search-box', data.searchTerm);

      const searchResults = await page.locator('.book-title');
      await expect(searchResults).toHaveCount(data.resultCount);
    });
  }
});


// =================================================================
// ============ Enhance Search with Test Results ===================
// =================================================================

// Define test data for searches
const searchTestData2 = [
  { searchTerm: 'Harry Potter', resultCount: 1 },
  { searchTerm: 'Tolkien', resultCount: 2 },
];

test.describe('Bookstore Search Functionality Tests', () => {
  for (const data of searchTestData2) {
    test(`Search results for ${data.searchTerm}`, async ({ page }) => {
      await page.goto('http://localhost:3000/books');

      // TODO: Fill the search box with the searchTerm
      await page.fill('#search-box', data.searchTerm);

      // TODO: Locate search results and verify the resultCount
      const searchResults = await page.locator('.book-title');
      await expect(searchResults).toHaveCount(data.resultCount);
    });
  }
});


// =================================================================
// ============ Advanced Role-based Testing ========================
// =================================================================

// Define test data for registration with both valid and invalid details
const registrationTestData = [
  { username: 'newuser1', email: 'newuser@example.com', password: 'securepass', alertMessage: 'Registration Successful!', pageMessage: '' },
  { username: '', email: 'newuser@example.com', password: 'securepass', alertMessage: 'Registration Failed', pageMessage: 'All fields are required.' },
  { username: 'newuser2', email: '', password: 'securepass', alertMessage: 'Registration Failed', pageMessage: 'All fields are required.' },
  { username: 'newuser3', email: 'newuser@example.com', password: '123', alertMessage: 'Registration Failed', pageMessage: 'Password must be at least 6 characters long.' },
  { username: 'newuser4', email: 'invalidemail', password: 'securepass', alertMessage: 'Registration Failed', pageMessage: 'Invalid email address.' },
];

test.describe('Registration with both valid and invalid details', () => {

  for (const data of registrationTestData) {

    test(`Register user: ${data.username || '(empty username)'}`, async ({ page }) => {
      await page.goto('http://localhost:3000/register');
      await page.fill('#reg-username', data.username);
      await page.fill('#reg-email', data.email);
      await page.fill('#reg-password', data.password);

      // Listen for the registration dialog
      page.once('dialog', async dialog => {
        await dialog.accept();
        expect(dialog.message()).toBe(data.alertMessage);
      });

      // Submit registration
      await page.click('button[type="submit"]');
      if (data.alertMessage === 'Registration Failed') {
        // Validate page error message
        await expect(page.locator('.error-message')).toHaveText(data.pageMessage);
        return;
      }

      // Registration successful -> login
      await page.goto('http://localhost:3000/login');
      await page.fill('#username', data.username);
      await page.fill('#password', data.password);
      await page.click('button[type="submit"]');
    });
  }
});