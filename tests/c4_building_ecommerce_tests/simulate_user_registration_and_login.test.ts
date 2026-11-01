// TODO: Import necessary modules and classes from Playwright
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';

// =================================================================
// ============ Complete User Registration & Login =================
// =================================================================

// TODO: Define the 'User Registration and Login' test suite with test.describe
test.describe('User Registration and Login', () => {
    // TODO: Declare RegistrationPage and LoginPage variables before each test case
    let registrationPage: RegisterPage;
    let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
  });

// TODO: Write the test case to register and login a user successfully
  test('should register and login successfully', async () => {
    // - Navigate to registration page
    await registrationPage.goto();
    // - Fill in user registration data
    await registrationPage.register('newuser', 'newuser@example.com', 'newpassword');
    // - Navigate to the login page
    await loginPage.goto();
    // - Perform login
    await loginPage.login('newuser', 'newpassword');
    // - Verify login success message is visible
    await expect(loginPage.getWelcomeMessage()).toBeVisible();
  });
});

// =================================================================
// ============ Enhanced User Test with Verification ===============
// =================================================================

test.describe('User Registration and Login', () => {
  let registrationPage: RegisterPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
  });

  test('should register and login successfully', async () => {
    await registrationPage.goto();
    await registrationPage.register('bookfan', 'bookfan@example.com', 'securepass');

    await loginPage.goto();
    await loginPage.login('bookfan', 'securepass');
  });

  test('should register two accounts and switch between them', async () => {
    // TODO: Register two separate accounts
    await registrationPage.goto();
    await registrationPage.register("Mihir101", "mihir101@gmail.com", "Mihir@123");
    await registrationPage.goto();
    await registrationPage.register("Mihir102", "mihir102@gmail.com", "Mihir@123");
    
    // TODO: Log in with the first account and logout
    await loginPage.goto();
    await loginPage.login("Mihir101", "Mihir@123");
    await loginPage.logout();
    
    // TODO: Log in with the second account and logout
    await loginPage.goto();
    await loginPage.login("Mihir102", "Mihir@123");
    await loginPage.logout();
    
    // TODO: Log in again with the first account
    await loginPage.goto();
    await loginPage.login("Mihir101", "Mihir@123");
  
  });

  test('should handle non-existing account operations', async ({page}) => {
    // TODO: Verify failure to log in
    // Set up the dialog event listener
    page.once('dialog', async dialog => {
      await dialog.dismiss();
      expect(dialog.message()).toBe('Login Failed');
    });
    // TODO: Attempt to log in with non-existing credentials
    await loginPage.goto();
    await loginPage.login("test", "test@123");

    // TODO: Verify consistent failure to log in
    page.once('dialog', async dialog => {
      await dialog.dismiss();
      expect(dialog.message()).toBe('Login Failed');
    });
    // TODO: Attempt again with the same invalid credentials
    await loginPage.login("test", "test@123");

    // TODO: Register the account using the previously non-existent credentials
    await registrationPage.goto();
    await registrationPage.register("test", "test@gmail.com", "test@123");
    
    // TODO: Verify failure to register already existing account
    page.once('dialog', async dialog => {
      await dialog.dismiss();
      expect(dialog.message()).toBe('User already registered with this username or email.');
    });
    // TODO: Attempt to re-register the same account
    await registrationPage.goto();
    await registrationPage.register("test", "test@gmail.com", "test@123");

    // TODO: Log in with the newly created account
    await loginPage.goto();
    await loginPage.login("test", "test@123");
  });
});

// =================================================================
// ============ Ensuring Complete User Session Flow ================
// =================================================================

test.describe('User Account Management', () => {
  let registrationPage: RegisterPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
  });

  test('should register and login successfully', async () => {
    await registrationPage.goto();
    await registrationPage.register('bookfan', 'bookfan@example.com', 'securepass');

    await loginPage.goto();
    await loginPage.login('bookfan', 'securepass');
  });

  test('should register two accounts and switch between them', async () => {
    // Step 1: Register two separate accounts
    await registrationPage.goto();
    await registrationPage.register('user1', 'user1@example.com', 'password1');
    await registrationPage.goto();
    await registrationPage.register('user2', 'user2@example.com', 'password2');

    // Step 2: Log in with the first account and logout
    await loginPage.goto();
    await loginPage.login('user1', 'password1');
    await loginPage.logout();

    // Step 3: Log in with the second account and logout
    await loginPage.goto();
    await loginPage.login('user2', 'password2');
    await loginPage.logout();

    // Step 4: Log in again with the first account
    await loginPage.goto();
    await loginPage.login('user1', 'password1');
  });

  test('should handle non-existing account operations', async () => {
    // Step 1: Attempt to log in with non-existing credentials
    await loginPage.goto();
    await loginPage.login('nonexistent', 'randompass');
    await expect(loginPage.loginButton).toBeVisible();

    // Step 2: Attempt again with the same invalid credentials
    await loginPage.goto();
    await loginPage.login('nonexistent', 'randompass');
    await expect(loginPage.loginButton).toBeVisible();

    // Step 3: Register the account using the previously non-existent credentials
    await registrationPage.goto();
    await registrationPage.register('nonexistent', 'nonexistent@example.com', 'randompass');

    // Step 4: Attempt to re-register the same account
    expect(await registrationPage.register('nonexistent', 'nonexistent@example.com', 'randompass')).toBe('Incorrect url');

    // Step 5: Login with the newly created account
    await loginPage.goto();
    await loginPage.login('nonexistent', 'randompass');
  });
  
  // The first test should register an account, log into that account, log out, log in again, navigate to the account page, delete the account, and then verify that logging back in fails.
  test('Account creation and deletion', async ({page}) => {
    
    await registrationPage.goto();
    await registrationPage.register('Mihir201', 'mihir201@example.com', 'Mihir@123');
    
    await loginPage.goto();
    await loginPage.login('Mihir201', 'Mihir@123');
    await loginPage.logout();
    
    await loginPage.goto();
    await loginPage.login('Mihir201', 'Mihir@123');
    
    // Navigate to the account page.
    await page.click('text=👤 Account')
    await page.locator("//button[normalize-space()='Delete Account']").click();
    
    // Accept the dialog and verify the message.
    page.once('dialog', async dialog => {
      await dialog.accept();
      expect(dialog.message()).toBe('Are you sure you want to delete your account?');
    });
    
    // Accept the second dialog and verify the message.
    page.once('dialog', async dialog => {
      await dialog.accept();
      expect(dialog.message()).toBe('Account deleted successfully.');
    });
    
    await loginPage.goto();
    
    page.once('dialog', async dialog => {
      await dialog.dismiss();
      expect(dialog.message()).toBe('Login Failed');
    });
    await loginPage.login('Mihir201', 'Mihir@123');
    
  });
  
  // The second test should register two accounts, log into the first one, navigate to the account page, decline account deletion in the pop-up, log in with the second account, delete that account, and finally verify that logging back in with the first account is successful, but the second account fails.
  test('2 Accounts creation and 1 deletion', async ({page}) => {
    
    await registrationPage.goto();
    await registrationPage.register('Mihir301', 'mihir301@example.com', 'Mihir@123');
    
    await registrationPage.goto();
    await registrationPage.register('Mihir302', 'mihir30@example.com', 'Mihir@123');
    
    await loginPage.goto();
    await loginPage.login('Mihir301', 'Mihir@123');
    
    // Navigate to the account page.
    await page.click('text=👤 Account')
    
    await page.waitForLoadState('domcontentloaded');
    let count = 0;

    // Set up a dialog event listener to handle multiple dialogs with different actions
    page.on('dialog', async dialog => {
      if (count === 0) {
        expect(dialog.message()).toBe('Are you sure you want to delete your account?');
        await dialog.dismiss();  // Dismiss the first dialog
      } else if (count === 1) {
        expect(dialog.message()).toBe('Account deletion canceled.');
        await dialog.accept();  // Accept the second dialog
      }
      count++;
    });
    
    await page.locator("//button[normalize-space()='Delete Account']").click();
    
    await loginPage.logout();
    
    await loginPage.goto();
    await loginPage.login('Mihir302', 'Mihir@123');
    
    // Navigate to the account page.
    await page.click('text=👤 Account')
    
    await page.waitForLoadState('domcontentloaded');
    
    let count2 = 0;

    // Set up a dialog event listener to handle multiple dialogs with different actions
    page.on('dialog', async dialog => {
      if (count2 === 0) {
        expect(dialog.message()).toBe('Are you sure you want to delete your account?');
        await dialog.accept();  // Dismiss the first dialog
      } else if (count2 === 1) {
        expect(dialog.message()).toBe('Account deleted successfully.');
        await dialog.accept();  // Accept the second dialog
      }
      count2++;
    });
    
    await page.locator("//button[normalize-space()='Delete Account']").click();
        
    await loginPage.goto();
    
    page.once('dialog', async dialog => {
      await dialog.dismiss();
      expect(dialog.message()).toBe('Login Failed');
    });
    await loginPage.login('Mihir302', 'Mihir@123');
  });
});