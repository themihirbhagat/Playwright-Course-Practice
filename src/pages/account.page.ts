import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountPage extends BasePage {
  async uploadFile(filePath: string) {
    const input = this.page.locator('input[type="file"]');
    await input.setInputFiles(filePath);

    await this.page.click('button[type="submit"]');
  }

  async getUploadedFileName() {
    return await this.page.locator('text=Uploaded file:').textContent();
  }
}