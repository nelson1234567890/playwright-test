import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get usernameInput() { return this.page.locator('#user-name'); }
  private get passwordInput() { return this.page.locator('#password'); }
  private get loginButton() { return this.page.locator('#login-button'); }
  private get errorMessage() { return this.page.locator('[data-test="error"]'); }

  async navigate() {
    await this.page.goto(process.env.URL);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  async isLoginPageDisplayed() {
    await expect(this.loginButton).toBeVisible();
  }
}