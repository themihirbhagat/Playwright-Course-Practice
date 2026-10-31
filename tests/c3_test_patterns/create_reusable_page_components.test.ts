import path from 'path';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { AccountPage } from '../../src/pages/account.page';
import { RegisterPage } from '../../src/pages/register.page';

// =================================================================
// ============ Running Reusable Components ========================
// =================================================================
test.describe('User actions', () => {

  test('should log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate('login');
    await loginPage.login('user1', 'pass1');

    // Verify navigation to '/home' after successful login
    await page.waitForURL('**/home');
    expect(await page.url()).toContain('/home');
  });

  test('should upload a file', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await accountPage.navigate('account');
    
    // Use the path to the new sample file
    const filePath = path.resolve(__dirname, '../../src/testData/sampleFile.txt');
    await accountPage.uploadFile(filePath);

    // Verify the uploaded file name
    const uploadedFileName = await accountPage.getUploadedFileName();
    expect(uploadedFileName).toContain('sampleFile.txt');
  });

});

// =================================================================
// ============ Fix Navigation & File Upload Bugs ==================
// =================================================================

test.describe('Navigation and File Upload', () => {
  let loginPage: LoginPage;
  let accountPage: AccountPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    accountPage = new AccountPage(page);
  });

  test('should navigate to the account page and upload a file successfully', async ({  }) => {
    // Navigate to login page and perform login
    await loginPage.navigate('login');
    await loginPage.login('testuser', 'password123');

    // Navigate to account page
    await accountPage.navigate('account');

    // Upload a file
    const filePath = '../../src/testData/sampleFile.txt';
    await accountPage.uploadFile(filePath);

    // Verify that the file was uploaded
    const uploadedFileName = await accountPage.getUploadedFileName();
    expect(uploadedFileName).toContain('file.txt');
  });
});

// =================================================================
// ============ Enhance your Test Script Structure =================
// =================================================================

test('should register a new user', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  
  await registerPage.navigate('register');
  await registerPage.register('testuser', 'testuser@example.com', 'password123');
  
  // Add assertions to verify successful registration
  await expect(page).toHaveURL('http://localhost:3000/home');
  const welcomeMessage = await page.textContent('h1');
  expect(welcomeMessage).toContain('Welcome to the BookStore');
});