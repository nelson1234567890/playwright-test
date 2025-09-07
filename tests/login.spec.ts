import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { TestData } from '../fixtures/testData';
import { Helpers } from '../utils/helpers';


test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.navigate();
  });

  test('Login exitoso con usuario standard', async ({ page }) => {
    await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
    await productsPage.assertIsProductsPage();
    await Helpers.takeScreenshot(page, 'Login Tests');
  });

  test('Login fallido con usuario locked', async ({ page }) => {
    await loginPage.login(TestData.users.locked.username, TestData.users.locked.password);
    await loginPage.assertErrorMessage(TestData.errorMessages.lockedUser);
    await Helpers.takeScreenshot(page, 'Login fallido con usuario locked');
  });

  test('Login fallido con credenciales inválidas', async ({ page }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    await loginPage.assertErrorMessage(TestData.errorMessages.invalidCredentials);
    await Helpers.takeScreenshot(page, 'Login fallido con credenciales inválidas');
  });

  test('Campos obligatorios', async ({ page }) => {
    await loginPage.login('', '');
    await expect(loginPage['usernameInput']).toHaveCSS('border-bottom-color', 'rgb(226, 35, 26)');
    await expect(loginPage['passwordInput']).toHaveCSS('border-bottom-color', 'rgb(226, 35, 26)');
    await Helpers.takeScreenshot(page, 'Campos obligatorios');
  });
});