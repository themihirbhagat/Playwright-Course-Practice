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
}