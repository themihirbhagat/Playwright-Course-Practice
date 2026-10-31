import { test, expect } from '@playwright/test';
import { BooksPage } from '../../src/pages/book.page';

// =================================================================
// ============ Master Search Functionality ========================
// =================================================================

test.describe('Product Search Functionality', () => {
  let booksPage: BooksPage;

  test.beforeEach(async ({ page }) => {
    booksPage = new BooksPage(page);
    await booksPage.goto();
  });

  test('product search and validation in Books Page', async () => {
    await booksPage.searchForBook('The Great Gatsby');
    await expect(booksPage.bookTitle('The Great Gatsby')).toBeVisible();
  });
});


// =================================================================
// ============ Enhance Product Search Validation ==================
// =================================================================

test.describe('Product Search Functionality', () => {
  let booksPage: BooksPage;

  test.beforeEach(async ({ page }) => {
    booksPage = new BooksPage(page);
    await booksPage.goto();
  });

  test('product search and validation in Books Page', async () => {
    await booksPage.searchForBook('The Great Gatsby');
    await expect(booksPage.bookTitle('The Great Gatsby')).toBeVisible();
    // TODO: Add assertion to check if the author's name "F. Scott Fitzgerald" is visible
    await expect(booksPage.bookAuthor("F. Scott Fitzgerald")).toBeVisible();
  });

  // TODO: Add a test that selects the category `Literature` and validates that
  // 'The Great Gatsby' and 'To Kill a Mockingbird' are among the appeared titles and '1984' isn't
  test('Category selection and validation', async ({ }) => {
    
    await booksPage.selectCategory("Literature");
    
    await expect(booksPage.bookTitle("The Great Gatsby")).toBeVisible();
    await expect(booksPage.bookTitle("To Kill a Mockingbird")).toBeVisible();
    await expect(booksPage.bookTitle("1984")).toHaveCount(0);
  });
});

// =================================================================
// ============ Search and Validate different Books ================
// =================================================================

test.describe('Product Search and Category Selection Functionality', () => {
  let booksPage: BooksPage;

  test.beforeEach(async ({ page }) => {
    booksPage = new BooksPage(page);
    await booksPage.goto();
  });

  test('product search and validation in Books Page', async () => {
    await booksPage.searchForBook('The Great Gatsby');
    await expect(booksPage.bookTitle('The Great Gatsby')).toBeVisible();
    await expect(booksPage.bookAuthor('F. Scott Fitzgerald')).toBeVisible();
  });
  
  test('category selection and validation in Books Page', async () => {
    await booksPage.selectCategory('Literature');
    const titles = await booksPage.getBookTitles();
    expect(titles).toContain('The Great Gatsby');
    expect(titles).toContain('To Kill a Mockingbird');
  });
  
  test('Fantasy Category Search', async () => {
    await booksPage.selectCategory('Fantasy');
    await booksPage.searchForBook('ing');
    await expect(await booksPage.getBooks()).toHaveCount(2);
  });
  
  test('Search With Category Switching:', async () => {
    await booksPage.selectCategory('Literature');
    await booksPage.searchForBook('at');
    await expect(await booksPage.getBooks()).toHaveCount(2);
    await booksPage.selectCategory('Science Fiction');
    await expect(await booksPage.getBooks()).toHaveCount(0);
    
    await booksPage.searchForBook('a');
    await expect(await booksPage.getBooks()).toHaveCount(2);
  });
});