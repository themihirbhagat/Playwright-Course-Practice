// TODO: Import necessary modules from Playwright
import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { HomePage } from '../../src/pages/home.page';
import { CartPage } from '../../src/pages/cart.page';

// =================================================================
// ============ Master Shopping Cart Test Creation =================
// =================================================================

// TODO: Setup the testing suite with a describe and test block
test.describe('Demo describe', () => {
    
    let homePage: HomePage;
    let cartPage: CartPage;
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        cartPage = new CartPage(page);
    });
    
    // TODO: Inside the test block, create instances of HomePage and CartPage
    test('Demo test',  async () => {

        // TODO: Navigate to the HomePage
        await homePage.goto();
        // TODO: Use the addToCart method to add 'The Great Gatsby' to the cart
        await homePage.addToCart('The Great Gatsby');
        
        // TODO: Navigate to the CartPage
        await cartPage.goto();
        
        // TODO: Validate that 'The Great Gatsby' is visible in the cart using the expectBookVisible method
        await cartPage.expectBookVisible('The Great Gatsby');

        // TODO: Remove 'The Great Gatsby' from the cart using the removeBook method
        await cartPage.removeBook('The Great Gatsby');
        
        // TODO: Validate that the cart is empty using the expectCartEmpty method
        await cartPage.expectCartEmpty();
    });

});

// =================================================================
// ============ Enhance Multiple Items Test ========================
// =================================================================

test.describe('Shopping Cart Tests', () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.goto();
  });

  test('validate multiple shopping cart updates', async () => {
    // Add two books to the cart
    await homePage.addToCart('The Great Gatsby');
    await homePage.addToCart('1984');

    // Validate that the books are added to the cart
    await cartPage.goto();
    await cartPage.expectBookVisible('The Great Gatsby');
    await cartPage.expectBookVisible('1984');

    // Remove books from cart and confirm the cart is empty
    await cartPage.removeBook('The Great Gatsby');
    await cartPage.removeBook('1984');
    await cartPage.expectCartEmpty();
  });

  test('add and adjust quantities of multiple identical items', async () => {
    // TODO: Add two "Moby Dick" books and one "To Kill a Mockingbird" book to the cart
    await homePage.addToCart('Moby Dick');
    await homePage.addToCart('To Kill a Mockingbird');
    
    // TODO: Validate that the correct quantities are in the cart
    await cartPage.goto();
    expect(await cartPage.getCartItems()).toHaveCount(2);
    // TODO: Remove one "Moby Dick" book and confirm the updated quantity
    await cartPage.removeBook('Moby Dick');
    expect(await cartPage.getCartItems()).toHaveCount(1);
  
  });;

  test('persistent cart selection across login sessions', async ({page}) => {
    // TODO: Add and remove and re-add "To Kill a Mockingbird" book
    await homePage.addToCart('To Kill a Mockingbird');
    await cartPage.goto();
    await cartPage.removeBook('To Kill a Mockingbird');
    await homePage.goto();
    await homePage.addToCart('To Kill a Mockingbird');
    // TODO: Log in and confirm the cart contains the selection
    await page.click('text=🔑 Login');
    await page.fill('#username', 'user1');
    await page.fill('#password', 'pass1');
    await page.click('text=Submit');
    await cartPage.goto();
    await expect(await cartPage.getCartItems()).toHaveCount(1);
  });
});

// =================================================================
// ============ Modify Shopping Cart Test Scenarios ================
// =================================================================

test.describe('Shopping Cart Tests', () => {
  let homePage: HomePage;
  let cartPage: CartPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    loginPage = new LoginPage(page);
    await homePage.goto();
  });

  test('validate multiple shopping cart updates', async () => {
    // Add two books to the cart
    await homePage.addToCart('The Great Gatsby');
    await homePage.addToCart('1984');

    // Validate that the books are added to the cart
    await cartPage.goto();
    await cartPage.expectBookVisible('The Great Gatsby');
    await cartPage.expectBookVisible('1984');

    // Remove books from cart and confirm the cart is empty
    await cartPage.removeBook('The Great Gatsby');
    await cartPage.removeBook('1984');
    await cartPage.expectCartEmpty();
  });

  test('add two identical and one different book, remove one identical book', async () => {
    // Add two "Moby Dick" books and one "To Kill a Mockingbird" book to the cart
    await homePage.addToCart('Moby Dick');
    await homePage.addToCart('Moby Dick');
    await homePage.addToCart('To Kill a Mockingbird');

    // Validate that the correct books are in the cart with expected count
    await cartPage.goto();
    await cartPage.expectBookCount('Moby Dick', 2);
    await cartPage.expectBookVisible('To Kill a Mockingbird');

    // Remove one "Moby Dick" book and confirm the updated cart
    await cartPage.removeBook('Moby Dick');
    await cartPage.expectBookCount('Moby Dick', 1);
  });

  test('ensure cart selection persists after login', async () => {
    // Add, remove, and re-add "To Kill a Mockingbird"
    await homePage.addToCart('To Kill a Mockingbird');
    await cartPage.goto();
    await cartPage.removeBook('To Kill a Mockingbird');
    await homePage.goto();
    await homePage.addToCart('To Kill a Mockingbird');
    
    // Log in and confirm the cart contains the selection
    await loginPage.goto();
    await loginPage.login('user1', 'pass1');
    await cartPage.goto();
    await cartPage.expectBookVisible('To Kill a Mockingbird');
  });

  const scenarios = [
    {
      books: ['The Great Gatsby', 'Moby Dick', '1984'],
      expectedTotalPrice: 33.97, // The Great Gatsby + Moby Dick + 1984
      description: 'Adding multiple books to the cart'
    },
    {
      books: ['To Kill a Mockingbird', 'Brave New World', '1984'],
      expectedTotalPrice: 29.97, // To Kill a Mockingbird + Brave New World + 1984
      description: 'Adding different books'
    },
    {
      books: ['The Hobbit', 'The Hobbit', 'Harry Potter and the Philosopher\'s Stone'],
      expectedTotalPrice: 42.97, // Two The Hobbits + Harry Potter and the Philosopher's Stone
      description: 'Adding identical items'
    },
    {
      books: ['Fahrenheit 451', 'The Lord of the Rings', 'Brave New World', '1984'],
      expectedTotalPrice: 52.96, // Fahrenheit 451 + The Lord of the Rings + Brave New World + 1984
      description: 'Complex sequence of add operations'
    },
    {
      operations: [
        { action: 'add', book: 'Fahrenheit 451' },
        { action: 'add', book: 'The Lord of the Rings' },
        { action: 'remove', book: 'Fahrenheit 451' },
        { action: 'add', book: 'Brave New World' },
        { action: 'add', book: '1984' },
        { action: 'remove', book: '1984' },
        { action: 'remove', book: 'The Lord of the Rings' }
      ],
      expectedTotalPrice: 10.99, // Brave New World
      description: 'Complex sequence of add and remove operations'
    }
  ];

  // TODO: Implement the following scenarios as individual tests:
  // - Scenario 1: Add books 'The Great Gatsby', 'Moby Dick', and '1984', and validate the total price.
  test("Add books 'The Great Gatsby', 'Moby Dick', and '1984', and validate the total price", async ({page}) => {
    
    await homePage.goto();
    await homePage.addToCart(scenarios[0].books![0]);
    await homePage.addToCart(scenarios[0].books![1]);
    await homePage.addToCart(scenarios[0].books![2]);
    
    await cartPage.goto();
    expect(await page.locator("//h2/following-sibling::div").textContent()).toContain(`Total: $${scenarios[0].expectedTotalPrice}`);
  });
  
  // - Scenario 2: Add books 'To Kill a Mockingbird', 'Brave New World', and '1984', then check the cart total.
  test("Add books 'To Kill a Mockingbird', 'Brave New World', and '1984', then check the cart total.", async ({page}) => {
    
    await homePage.goto();
    await homePage.addToCart(scenarios[1].books![0]);
    await page.click('#load-more-btn');
    await page.waitForSelector('text=Load More');
    await page.click('#load-more-btn');
    await homePage.addToCart(scenarios[1].books![1]);
    await homePage.addToCart(scenarios[1].books![2]);
    
    await cartPage.goto();
    expect(await page.locator("//h2/following-sibling::div").textContent()).toContain(`Total: $${scenarios[1].expectedTotalPrice}`);
  });
  
  // - Scenario 3: Add two 'The Hobbit' books and a 'Harry Potter and the Philosopher's Stone', ensure cart reflects total correctly.
  test("Add two 'The Hobbit' books and a 'Harry Potter and the Philosopher's Stone', ensure cart reflects total correctly.", async ({page}) => {
    
    await homePage.goto();
    await page.click('#load-more-btn');
    await page.waitForSelector('text=Load More');
    await homePage.addToCart(scenarios[2].books![0]);
    await homePage.addToCart(scenarios[2].books![1]);
    await homePage.addToCart(scenarios[2].books![2]);
        
    await cartPage.goto();
    expect(await page.locator("//h2/following-sibling::div").textContent()).toContain(`Total: $${scenarios[2].expectedTotalPrice}`);

  });
  
  // - Scenario 4: Add books ['Fahrenheit 451', 'The Lord of the Rings', 'Brave New World', '1984'], then confirm the total matches expectations.
  test("Add books ['Fahrenheit 451', 'The Lord of the Rings', 'Brave New World', '1984'], then confirm the total matches ", async ({page}) => {
    
    await homePage.goto();
    await page.click('#load-more-btn');
    await page.waitForSelector('text=Load More');
    await page.click('#load-more-btn');
    await homePage.addToCart(scenarios[3].books![0]);
    await homePage.addToCart(scenarios[3].books![1]);
    await homePage.addToCart(scenarios[3].books![2]);
    await homePage.addToCart(scenarios[3].books![3]);
    
    await cartPage.goto();
    expect(await page.locator("//h2/following-sibling::div").textContent()).toContain(`Total: $${scenarios[3].expectedTotalPrice}`);

  });

});