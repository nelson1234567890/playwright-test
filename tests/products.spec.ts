import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { TestData } from '../fixtures/testData';
import { Helpers } from '../utils/helpers';

test.describe('Products Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    
    await loginPage.navigate();
    await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
    await productsPage.assertIsProductsPage();
  });

  test('Agregar producto al carrito', async ({ page }) => {
    await productsPage.addProductToCart(TestData.products.backpack);
    await expect(productsPage['shoppingCart'].locator('.shopping_cart_badge')).toHaveText('1');
    await Helpers.takeScreenshot(page, 'Agregar producto al carrito');
  });

  test('Ordenar productos por precio de menor a mayor', async ({ page }) => {
    await productsPage.sortProductsBy(TestData.sortOptions.priceLowHigh);
    await Helpers.takeScreenshot(page, 'Ordenar productos por precio de menor a mayor');
  });

  test('Logout exitoso', async ({ page }) => {
    await productsPage.logout();
    await loginPage.isLoginPageDisplayed();
    await Helpers.takeScreenshot(page, 'Logout exitoso');
  });
});