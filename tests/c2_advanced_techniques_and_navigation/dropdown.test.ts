import { test, expect } from '@playwright/test';

test('automate dropdown selection', async ({ page }) => {
  await page.goto('http://localhost:3000/books');
  await page.selectOption('select#categories', 'Fantasy');
  
  const selectedValue = await page.$eval<string, HTMLSelectElement>('select#categories', select => select.value);
  expect(selectedValue).toBe('Fantasy');
  
  await expect(page.locator('.book-title >> text=Harry Potter and the Philosopher\'s Stone')).toBeVisible();
  await expect(page.locator('.book-title >> text=The Hobbit')).toBeVisible();
  await expect(page.locator('.book-title >> text=The Great Gatsby')).not.toBeVisible();
});

test('retrieve all dropdown options', async ({ page }) => {
  await page.goto('http://localhost:3000/books');

  const expectedOptions = ['', 'Literature', 'Science Fiction', 'Fantasy'];

  const options = await page.$eval<string, HTMLSelectElement>('select#categories', select => select.value); 

  expect(options).toEqual(expectedOptions);
});



// TODO: Define a test case for automating the dropdown selection
test('automate dropdown selection', async ({ page }) => {
  // TODO: Navigate to the books page
  await page.goto('http://localhost:3000/books');

  // TODO: Select the 'Literature' category from the dropdown
  await page.selectOption('select#categories', 'Literature');

  // TODO: Retrieve and verify the selected value
  const selectedValue = await page.$eval<string, HTMLSelectElement>('select#categories', select => select.value);

  expect(selectedValue).toBe('Literature');

  // TODO: Verify the count of visible literature books is 4
  const searchResult = await page.locator("//h2[contains(@class, 'book-title')]");
  expect(await searchResult.count()).toEqual(4);

  // TODO: Verify the expected book titles are visible
  const expectedBooks = ["The Great Gatsby", "To Kill a Mockingbird", "Moby Dick", 
  "The Catcher in the Rye"];
  
  const options = await page.locator("//h2[contains(@class, 'book-title')]").allTextContents(); 
  expect(options).toEqual(expectedBooks);

  // TODO: Verify non-literature books are not visible
  const booksCategories = await page.locator("//p[contains(@class, 'text-sm')]").allTextContents();
  expect(booksCategories.every(category => category === 'Literature')).toBeTruthy();
});