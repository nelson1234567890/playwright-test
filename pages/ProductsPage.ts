import { Page, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get productTitle() { return this.page.locator('.title'); }
  private get inventoryItems() { return this.page.locator('.inventory_item'); }
  private get shoppingCart() { return this.page.locator('#shopping_cart_container'); }
  private get sortDropdown() { return this.page.locator('//select[@class=\'product_sort_container\']'); }
  private get menuButton() { return this.page.locator('#react-burger-menu-btn'); }
  private get logoutLink() { return this.page.locator('#logout_sidebar_link'); }

  async assertIsProductsPage() {
    await expect(this.productTitle).toHaveText('Products');
  }

  async getProductCount() {
    return await this.inventoryItems.count();
  }

  async addProductToCart(productName: string) {
    const product = this.inventoryItems.filter({ hasText: productName });
    await product.locator('button').click();
  }

  async goToShoppingCart() {
    await this.shoppingCart.click();
  }

  async sortProductsBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}