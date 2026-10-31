import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://localhost:3000/home');
  }

  async addToCart(bookTitle: string) {
    const bookSelector = `.book-title:text-is("${bookTitle}")`;
    await this.page.locator(bookSelector).locator('..').locator('button:text("Add to Cart")').click();
  }
}