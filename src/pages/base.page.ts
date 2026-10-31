import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string) {
    await this.page.goto(`http://localhost:3000/${path}`);
  }
  
  // TODO: Add a method named `navigateToHome` to navigate to the home page
  async navigateToHome() {
    await this.page.goto(`http://localhost:3000/home`);
  }

}