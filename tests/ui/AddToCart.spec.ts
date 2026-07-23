import test from '@playwright/test';
import { AddToCartPage } from '../../src/pages/AddToCartPage';
test('Verify add to cart functionality', async ({ page }) => {
    const addToCartPage = new AddToCartPage(page);
    await addToCartPage.goto();
    await addToCartPage.ensureHomePage();
    await addToCartPage.productClick();
    await addToCartPage.addToCart();
    
});