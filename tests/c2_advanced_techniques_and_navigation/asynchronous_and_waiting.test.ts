import { test, expect } from '@playwright/test';

test('async operations and waiting strategies', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the 'Load more' button
  await page.click('#load-more-btn');

  // Wait for the 'load-more-btn' button to contain the text 'Load more'
  await page.waitForFunction(() => {
    const button = document.querySelector('#load-more-btn');
    return button && button.textContent === 'Load more';
  });

  // Validate the number of books loaded is 8
  const booksCnt = await page.locator('.book-title').count();
  expect(booksCnt).toBe(8);
});

test('network load state management', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Ensure all network requests are completed before proceeding
  await page.waitForLoadState('networkidle');

  // Validate page is fully loaded by checking a key element
  const isLoaded = await page.isVisible('h1');
  expect(isLoaded).toBe(true);
});

test('async operations and waiting strategies', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the 'Load more' button
  await page.click('#load-more-btn');

  // Wait for the 'load-more-btn' button to contain the text 'Load more'
  await page.waitForFunction(() => {
    const button = document.querySelector('#load-more-btn');
    return button && button.textContent === 'Load more';
  });

  // Validate the number of books loaded is 8
  const booksCnt = await page.locator('.book-title').count();
  expect(booksCnt).toBe(8);
});

test('async operations and waiting strategies', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the 'Load more' button
  await page.click('#load-more-btn');

  // Wait until the loading text disappears

  await expect(page.locator('text=Loading...')).toHaveCount(0);

  // Validate there are exactly 8 books

  await expect(page.locator('.book-title')).toHaveCount(8);
});

test('async operations and waiting strategies', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Click the 'Load more' button
  await page.click('#load-more-btn');
  
  await expect(page.locator('text=Loading...')).toHaveCount(0);
  
  await page.click('#load-more-btn');

  await expect(page.locator('text=Loading...')).toHaveCount(0);

  // Validate the number of books loaded is 10
  const booksCnt = await page.locator('.book-title').count();
  expect(booksCnt).toBe(10);
});


test('async operations and waiting strategies', async ({ page }) => {
  await page.goto('http://localhost:3000/books');

  // TODO: Click the 'Load Random Fact' button 4 times and ensure each text ends with a dot.
  await page.click('#load-random-fact-btn');
  
  const text = await page.locator('#random-fact').textContent();
  
  expect(text?.endsWith('.'));
});


test('async operations and waiting strategies', async ({ page }) => {
  await page.goto('http://localhost:3000/books');

  // TODO: Click the 'Load Random Fact' button 4 times and ensure each text ends with a dot.
  await page.click('#load-random-fact-btn');
  
  const text = await (await page.waitForSelector('#random-fact')).textContent();
  
  expect(text?.endsWith('.')).toBe(true);
  
  await page.click('#load-random-fact-btn');
  
  const text2 = await (await page.waitForSelector('#random-fact')).textContent();
  
  expect(text2?.endsWith('.')).toBe(true);
  
  await page.click('#load-random-fact-btn');
  
  const text3 = await (await page.waitForSelector('#random-fact')).textContent();
  
  expect(text3?.endsWith('.')).toBe(true);
  
  await page.click('#load-random-fact-btn');
  
  const text4 = await (await page.waitForSelector('#random-fact')).textContent();
  
  expect(text4?.endsWith('.')).toBe(true);
});

test('async operations with waiting strategies', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // TODO: Click the 'Load More' button twice
  await page.click('#load-more-btn');
  
  await expect(page.locator('text=Loading books...')).toHaveCount(0);

  await page.click('#load-more-btn');
  
  // TODO: Implement a waiting strategy to ensure books are loaded
  await expect(page.locator('text=Loading books...')).toHaveCount(0);
  
  // TODO: Verify that 10 book titles are loaded.
  const booksCnt = await page.locator('.book-title').count();
  expect(booksCnt).toBe(10);

  // TODO: Validate the last book title
  const lastBookTitle = await page.locator('.book-title').nth(9).textContent();
  expect(lastBookTitle).toEqual('The Lord of the Rings');  
});

// Enhance test with Timeout Strategy
test('async operations and waiting strategies', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the 'Load more' button
  await page.click('#load-more-btn');

  // Wait until there are 8 books on the page
  await page.waitForFunction(() => document.querySelectorAll('.book-title').length === 8);
});

// Fix Book loading stretegy bug
test('async operations and waiting strategies', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Click the 'Load more' button
  await page.click('#load-more-btn');
  await page.click('#load-more-btn');

  await page.waitForFunction(() => {
    const button = document.querySelector('#load-more-btn');
    return button && button.textContent !== 'Loading...';
  });

  // Validate the number of books loaded is 10
  const booksCnt = await page.locator('.book-title').count();
  expect(booksCnt).toBe(10);
});