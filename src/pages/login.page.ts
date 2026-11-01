import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {

  async goto() {
    await this.page.goto('http://localhost:3000/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
  }

  async logout() { 
    await this.page.click('text=🚪 Logout');
  }

  // TODO: Add a method to get the login success message locator for verification
  getWelcomeMessage() {
    return this.page.locator('h1.text-4xl');
  }

  get loginButton() {
    return this.page.locator('text=🔑 Login');
  }
}