import { Page } from '@playwright/test';

export class Helpers {
  static async takeScreenshot(page: Page, testName: string) {
    const screenshotPath = `screenshots/${testName}-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    return screenshotPath;
  }

  static async waitForNetworkIdle(page: Page, timeout = 5000) {
    await page.waitForLoadState('networkidle', { timeout });
  }
}