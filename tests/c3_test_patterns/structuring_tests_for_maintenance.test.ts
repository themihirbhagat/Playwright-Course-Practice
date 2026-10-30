import { test, expect } from '@playwright/test';

// =================================================================
// ============ Running Structured Playwright Test =================
// =================================================================
test.describe('Bookstore Search Functionality with Authentication', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the login page and log in before each test
    await page.goto('http://localhost:3000/login');
    await page.fill('#username', 'user1');
    await page.fill('#password', 'pass1');
    await page.click('text=Submit');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('http://localhost:3000/home');

    // Navigate to the books page
    await page.goto('http://localhost:3000/books');
  });

  test('search for a book by title', async ({ page }) => {
    // Search for '1984'
    await page.fill('#search-box', '1984');

    // Verify that '1984' is displayed and other books are filtered out
    const bookTitle = page.locator('.book-title');
    await expect(bookTitle).toHaveCount(1);
    await expect(bookTitle).toHaveText('1984');
  });

  test('search for a book by author', async ({ page }) => {
    // Search for 'George Orwell'
    await page.fill('#search-box', 'George Orwell');

    // Verify that '1984' by George Orwell is displayed
    const bookTitle = page.locator('.book-title');
    await expect(bookTitle).toHaveCount(1);
    await expect(bookTitle).toHaveText('1984');
  });

  test('search with no results', async ({ page }) => {
    // Search for a non-existent book
    await page.fill('#search-box', 'Nonexistent Book');

    // Verify that no books are displayed
    const bookTitle = page.locator('.book-title');
    await expect(bookTitle).toHaveCount(0);
  });

// TODO: Add a new test to search by category "Literature"
  // TODO: Verify both the count of displayed books and the book titles to ensure the appropriate books are displayed
  test('search with book category', async ({ page }) => {
    const expectedBooks = ['The Great Gatsby', 'To Kill a Mockingbird', 'Moby Dick', 'The Catcher in the Rye'];
    await page.selectOption('select#categories', 'Literature');
  
    const selectedValue = await page.$eval<string, HTMLSelectElement>('select#categories', select => select.value); 
    expect(selectedValue).toBe('Literature');

    const bookTitles = page.locator('.book-title');
    await expect(bookTitles).toHaveCount(4);
    
    const actualBooks = await bookTitles.allTextContents();

    expect(actualBooks).toEqual(expectedBooks);
    
  });

test('Add two "To Kill a Mockingbird" books to the Cart', async ({ page }) => {
    await page.locator('text=Add to Cart').nth(1).click();
    await page.locator('text=Add to Cart').nth(1).click();
    await page.click('text=🛒');
    const booksInCart = page.locator('span');
    await expect(booksInCart).toHaveCount(2);
  });

  test('Add one "1984" to the Cart', async ({ page }) => {
    await page.locator('text=Add to Cart').nth(2).click();
    await page.click('text=🛒');
    const booksInCart = page.locator('span');
    await expect(booksInCart).toHaveCount(3);
  });

  test.afterEach(async ({ page }) => {
    // Log out after each test
    await page.click('text=🚪 Logout');
  });
});

// =================================================================
// ============ Add Book Details Verification Test =================
// =================================================================

test.describe('Bookstore Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the home page (no login)
    await page.goto('http://localhost:3000');

    // Click the "Load More" button twice and wait for multiple book titles to appear
    await page.click('#load-more-btn');

    await page.waitForFunction(() => document.querySelectorAll('.book-title').length >= 5);

    await page.click('#load-more-btn');

    await page.waitForFunction(() => document.querySelectorAll('.book-title').length >= 9);

    // Add several books to the cart using selectors based on text or positions
    await page.click('button:has-text("Add to Cart") >> nth=0'); // Add 'The Great Gatsby'
    await page.click('button:has-text("Add to Cart") >> nth=5'); // Add 'The Hobbit'
    await page.click('button:has-text("Add to Cart") >> nth=1'); // Add 'To Kill a Mockingbird'
    await page.click('text=🛒 3');
  });

  test('remove some books from the cart', async ({ page }) => {
    // TODO: Remove 'The Great Gatsby' and 'The Hobbit' from the cart
    // TODO: Check that they are not visible on the page, and 'To Kill a Mockingbird' is still visible
    await page.locator("//span[contains(text(), 'The Great Gatsby')]/following-sibling::button").click();
    
    await page.locator("//span[contains(text(), 'The Hobbit')]/following-sibling::button").click();
    
    expect(await page.locator("//span[contains(text(), 'The Great Gatsby')]")).toHaveCount(0);
    expect(await page.locator("//span[contains(text(), 'The Hobbit')]")).toHaveCount(0);
    expect(await page.locator("//span[contains(text(), 'To Kill a Mockingbird')]")).toHaveCount(1);

  });

  test('remove all the books from the cart', async ({ page }) => {
    // TODO: Remove all three books from the cart
    // TODO: Check that the page contains the text 'Your cart is empty'
    await page.locator("//span[contains(text(), 'The Great Gatsby')]/following-sibling::button").click();
    await page.locator("//span[contains(text(), 'The Hobbit')]/following-sibling::button").click();    
    await page.locator("//span[contains(text(), 'To Kill a Mockingbird')]/following-sibling::button").click();
    
    const emptyCartText = await page.locator("//p[text()='Your cart is empty']");
    
    expect(emptyCartText).toBeVisible();
  });
});
