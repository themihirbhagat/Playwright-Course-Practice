import { Page } from '@playwright/test';
import { BasePage } from './base.page';

class LoginPage extends BasePage {
  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
  }
}