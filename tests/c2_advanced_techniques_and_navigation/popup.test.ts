import { test, expect } from '@playwright/test';
import path from 'path';

// Handling Alert Popups Easily
test('handle pop-ups and dialogs', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:3000/login');

  // Enter incorrect login credentials to trigger the alert dialog
  await page.fill('#username', 'wronguser');
  await page.fill('#password', 'wrongpassword');

  // Handle the alert dialog
  page.on('dialog', async dialog => {
    await dialog.dismiss();
    expect(dialog.message()).toBe('Login Failed');
  });

  await page.click('button[type="submit"]');
});

// Change Popup Dialog Handling Code
test('handle pop-ups and dialogs', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:3000/login');

  // Handle the alert dialog
  page.on('dialog', async dialog => {
    await dialog.accept();
    expect(dialog.message()).toBe('Login Failed');
  });

  // Enter incorrect login credentials to trigger the alert dialog
  await page.fill('#username', 'wronguser');
  await page.fill('#password', 'wrongpassword');
  await page.click('button[type="submit"]');
});

// Fix Dialog Handling Mistake
test('handle pop-ups and dialogs', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:3000/login');

  // Enter incorrect login credentials to trigger the alert dialog
  await page.fill('#username', 'wronguser');
  await page.fill('#password', 'wrongpassword');
  await page.click('button[type="submit"]');

  page.on('dialog', async dialog => {
    await dialog.dismiss();
    expect(dialog.message()).toBe('Login Maybe Failed, Maybe Not');
  });
});

// Handle File Upload Alert
test('automate file uploads for profile in a new tab', async ({ page, context }) => {
  await page.goto('http://localhost:3000/home');
  // TODO: Click on Sign In and log in as `user1`
  await page.locator("//button[normalize-space()='Sign In']").click();
  await page.fill('#username', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('button[type="submit"]');
  // TODO: Click the "Account" link to open in a new tab
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=👤 Account')
  ]);
  // Verify the new page URL and content
  await newPage.waitForLoadState('domcontentloaded');
  expect(await newPage.url()).toBe('http://localhost:3000/account');
  await expect(newPage.locator('text=Upload Your Profile Picture')).toBeVisible();

  // TODO: Perform file upload in the new tab using the file `img/file.jpg`
  const filePath = path.resolve(__dirname, 'img/file.jpg');
  const input = newPage.locator('input[type="file"]');
  await input.setInputFiles(filePath);
  
  // TODO: Verify that the dialog would say 'File uploaded: file.jpg' when we click on Upload
  newPage.on('dialog', async dialog => {
    await dialog.accept();
    expect(dialog.message()).toBe('File uploaded: file.jpg');
  });

  // Submit the file form and verify upload
  await newPage.click('button[type="submit"]');
  const fileName = await newPage.$eval<string, HTMLSelectElement>('input[type="file"]', input => input.value); 

  
  expect(fileName).toBe('file.jpg');

  // Verify the success alert and uploaded file name
  await expect(newPage.locator('text=Uploaded file: file.jpg')).toBeVisible();

  // Close the new tab and verify the main page is still functional
  await newPage.close();
  expect(await page.url()).toBe('http://localhost:3000/home');
});

// Handling Confirmation Dialogs
test('handle pop-ups and dialogs', async ({ page, context }) => {
  // Navigate to the login page
  await page.goto('http://localhost:3000/login');

  // Log in with the username user1 and password pass1.
  await page.fill('#username', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('button[type="submit"]');

  // Navigate to the account page.
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=👤 Account')
  ]);

  // Click the delete button to trigger the confirmation dialog.
  await newPage.locator("//button[normalize-space()='Delete Account']").click();

  // Accept the dialog and verify the message.
  newPage.on('dialog', async dialog => {
    await dialog.accept();
    expect(dialog.message()).toBe('Are you sure you want to delete your account?');
  });
  
  // Accept the second dialog and verify the message.
  newPage.on('dialog', async dialog => {
    await dialog.accept();
    expect(dialog.message()).toBe('Account deleted successfully.');
  });
});