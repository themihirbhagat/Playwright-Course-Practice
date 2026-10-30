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

// Fix the Tab management code
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
  if (!profilePage) throw new Error('Profile page not found');
  
  await profilePage.waitForLoadState('networkidle');
  expect(await profilePage.url()).toBe('http://localhost:3000/profile');
  await expect(profilePage.locator('text=Ironman Profile')).toBeVisible();

  await profilePage.close();
  await expect(page).toHaveURL('http://localhost:3000/home');
});

// Tab Management with Playwright
test('verify logout affects all open tabs', async ({ page, context }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('#username', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('button[type="submit"]');
  
  // TODO: Open a new tab by clicking on the link to the account page. Wait for the new page event to capture the new tab and store it for further operations.
  const [accountPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=👤 Account')
  ]);
  // TODO: Validate that the account page has loaded correctly by checking the URL and confirming the presence of the text "Your Account" on the page.
  await accountPage.waitForLoadState('domcontentloaded');
  expect(await accountPage.url()).toBe('http://localhost:3000/account');
  await expect(accountPage.locator('text=Your Account')).toBeVisible();
  
  expect(await accountPage.locator('text=Login')).toHaveCount(0);
  
  // TODO: Perform logout operation on the main page and ensure that the change reflects across all open tabs by checking for the visibility of the 'Login' button on the account tab.  
  await page.click('text=🚪 Logout')
  expect(await page.locator('text=🔑 Login')).toBeVisible();
  
  accountPage.once('dialog', async dialog => {
    await dialog.accept();
  });
  
  await expect(accountPage.locator('text=🔑 Login')).toBeVisible();
  
  await accountPage.close();  
  await expect(page).toHaveURL('http://localhost:3000/home');

});

// Master Multiple Browser Tabs
// TODO: Define a test using test() function with a descriptive name like 'manage multiple tabs'
test('manage multiple tabs', async ({ page, context }) => {

// TODO: Navigate to 'http://localhost:3000/home' using page.goto()
await page.goto('http://localhost:3000/home');

// TODO: Click on the 'Sign In' button using page.click()
await page.locator("//button[normalize-space()='Sign In']").click();

// TODO: Fill in the username and password fields using page.fill()
// Use the credentials: username='user1' and password='pass1'
// TODO: Click on the submit button to log in
await page.fill('#username', 'user1');
await page.fill('#password', 'pass1');
await page.click('button[type="submit"]');

// TODO: Verify the URL has changed to 'http://localhost:3000/home'
await expect(page).toHaveURL('http://localhost:3000/home');
  
// TODO: Check if a specific text, like 'Welcome to the BookStore', is visible using page.locator()
const mainHeader = await page.textContent('h1');
expect(mainHeader).toBe('Welcome to the BookStore');
  
// TODO: Open a new tab by clicking on an element, e.g., a link with the text '👤 Account', using page.click() and context.waitForEvent('page')
const [accountPage] = await Promise.all([
context.waitForEvent('page'),
page.click('text=👤 Account')
]);
  
// TODO: Wait for the new tab to load completely using page.waitForLoadState()
  await accountPage.waitForLoadState('domcontentloaded');
  
// TODO: Ensure the new tab's URL is 'http://localhost:3000/account'
  expect(await accountPage.url()).toBe('http://localhost:3000/account');
  
// TODO: Verify that a specific element on the new tab is visible, such as 'Your Account'
  await expect(accountPage.locator('text=Your Account')).toBeVisible();

// TODO: Close the new tab
  await accountPage.close();  
  
// TODO: Check that the original tab is still functional by verifying its URL or a particular element is visible
  await expect(page).toHaveURL('http://localhost:3000/home');
});