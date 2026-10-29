import { test, expect } from '@playwright/test';

// Navigate multiple tabs with ease
test('manage multiple tabs', async ({ page, context }) => {
  await page.goto('http://localhost:3000/home');
  await page.click('text=Sign In');
  await page.fill('#username', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('http://localhost:3000/home');
  await expect(page.locator('text=Welcome to the BookStore')).toBeVisible();
  
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=👤 Account')
  ]);
  
  await newPage.waitForLoadState('domcontentloaded');
  expect(await newPage.url()).toBe('http://localhost:3000/account');
  await expect(newPage.locator('text=Your Account')).toBeVisible();

  await newPage.close();
  expect(await page.url()).toBe('http://localhost:3000/home');
});

// Modify tabs to search books
test('manage multiple tabs', async ({ page, context }) => {
  await page.goto('http://localhost:3000/home');
  await page.click('text=Sign In');
  await page.fill('#username', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('http://localhost:3000/home');
  await expect(page.locator('text=Welcome to the BookStore')).toBeVisible();
  
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=👤 Account')
  ]);
  
  await newPage.waitForLoadState('domcontentloaded');
  expect(await newPage.url()).toBe('http://localhost:3000/account');
  await expect(newPage.locator('text=Your Account')).toBeVisible();

  await newPage.close();
  expect(await page.url()).toBe('http://localhost:3000/home');
});


test('handle superhero profile tab', async ({ page, context }) => {
  await page.goto('http://localhost:3000/home');
  await page.click('text=Sign In');
  await page.fill('#username', 'ironman');
  await page.fill('#password', 'armored123');
  await page.click('button[type=submit]');
  
  await expect(page.locator('text=Stark HQ')).toBeVisible();
  
  page.click('text=🦸 Profile');
  const pages = context.pages();
  const profilePage = pages[pages.length - 1];
  
  await profilePage.waitForLoadState('networkidle');
  expect(await profilePage.url()).toBe('http://localhost:3000/profile');
  await expect(profilePage.locator('text=Ironman Profile')).toBeVisible();

  profilePage.close();
  expect(page).toHaveURL('http://localhost:3000/home');
});