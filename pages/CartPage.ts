import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get cartTitle() { return this.page.locator('.title'); }
  private get cartItems() { return this.page.locator('.cart_item'); }
  private get checkoutButton() { return this.page.locator('#checkout'); }
  private get continueShoppingButton() { return this.page.locator('#continue-shopping'); }

  async assertIsCartPage() {
    await expect(this.cartTitle).toHaveText('Your Cart');
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async removeItemFromCart(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    await item.locator('button').click();
  }
}