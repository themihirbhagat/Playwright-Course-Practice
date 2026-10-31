import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://localhost:3000/cart');
  }

  async expectBookVisible(bookTitle: string) {
    await expect(this.page.locator(`text=${bookTitle}`)).toBeVisible();
  }

  async expectBookCount(bookTitle: string, expectedCount: number) {
    const bookCount = await this.page.locator(`li:has-text("${bookTitle}")`).count();
    expect(bookCount).toBe(expectedCount);
  }

  async getCartItems() {
    return await this.page.locator('//li/span');
  }
  
  async removeBook(bookTitle: string) {
    const removeButtonSelector = `li:has-text("${bookTitle}") >> text=Remove`;
    await this.page.click(removeButtonSelector);
  }

  async expectCartEmpty() {
    await expect(this.page.locator('text=Your cart is empty')).toBeVisible();
  }
}

