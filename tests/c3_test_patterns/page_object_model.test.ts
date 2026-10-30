import { test, expect } from '@playwright/test';

// =================================================================
// ============ Observe Page Object Model in Action ================
// =================================================================
class LoginPage {
  private page: any; // Page instance from Playwright

  constructor(page: any) {
    this.page = page;
  }

  // Navigates to the login page
  async navigate() {
    await this.page.goto('http://localhost:3000/login');
  }

  // Handles login action using provided credentials
  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
    await expect(this.page).toHaveURL('http://localhost:3000/home');
  }
}

test('valid login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('user1', 'pass1');
  // further assertions can be made here if needed
});

// =================================================================
// ============ Fix Navigation in Page Object Model ================
// =================================================================

class HomePage {
  private page: any; // Page instance from Playwright

  constructor(page: any) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('http://localhost:3000/home');
  }

  async checkWelcomeMessage() {
    const message = await this.page.locator('h1');
    await expect(message).toHaveText('Welcome to the BookStore');
  }
}

test('home page load test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.checkWelcomeMessage();
});

// =================================================================
// ============ Enhancing Login Page Validation Skills =============
// =================================================================

class LoginPage2 {
  private page: any; // Page instance from Playwright

  constructor(page: any) {
    this.page = page;
  }

  // Navigates to the login page
  async navigate() {
    await this.page.goto('http://localhost:3000/login');
  }

  // Handles login action using provided credentials
  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
  }

  // TODO: Add a method that validates if the login was successful
    async validateLogin(flag: boolean) {
    if (flag == true) {
      expect(await this.page.url()).toBe('http://localhost:3000/home');
    } else {
      expect(await this.page.url()).toBe('http://localhost:3000/login');
    }
  }
}

test('login tests', async ({ page }) => {
  const loginPage = new LoginPage2(page);
  
  // Valid login test
  await loginPage.navigate();
  await loginPage.login('user1', 'pass1');
  await loginPage.validateLogin(true);

  // Invalid login test
  await loginPage.navigate();
  await loginPage.login('invalidUser', 'wrongPass');
  await loginPage.validateLogin(false);
});

// =================================================================
// ============ Create a Reusable Search Component =================
// =================================================================

// TODO: Write a class SearchPage
class SearchPage {
  
  private page: any;
  
  constructor(page: any) { 
    this.page = page;
  }
  
  // TODO: Implement a method to navigate to 'http://localhost:3000/books'
  async navigate() {
    this.page.goto("http://localhost:3000/books");
  }

  // TODO: Implement a method to fill the search bar
  async searchText(path: string, searchText: string) {
    await this.page.fill(path, searchText);
  }

  // TODO: Implement a method to validate the count of search results
  async verifySearchResultCount(count: number) {
    const results = await this.page.locator('h2').elementHandles();
    await expect(results.length).toBe(count);
  }

}

test('book search test - 1', async ({ page }) => {
  
  const searchPage = new SearchPage(page);

  await searchPage.navigate();

  //  fill the search bar for 'The Great Gatsby'
  await searchPage.searchText('#search-box', 'The Great Gatsby');

  //  validate the count of search results
  await searchPage.verifySearchResultCount(1);
});

test('book search test - 2', async ({ page }) => {
  
  const searchPage = new SearchPage(page);
  //  navigate to the search page
  await searchPage.navigate();

  //  fill the search bar for '1984'
  await searchPage.searchText('#search-box', 'the');

  //  validate the count of search results
  await searchPage.verifySearchResultCount(5);
});