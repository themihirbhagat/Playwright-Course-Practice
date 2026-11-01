import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {

  // TODO: Implement the navigate method to open the registration page URL
  async goto() {
    await this.page.goto('http://localhost:3000/register');
  }
  
  async register(username: string, email: string, password: string) {
    // TODO: Add the code to fill the registration form and submit it
    await this.page.fill('#reg-username', username);
    await this.page.fill('#reg-email', email);
    await this.page.fill('#reg-password', password);
    await this.page.click('button[type="submit"]');
    expect(await this.page.url()).toContain('/home')
  }

}