import test from '@playwright/test';
import { AddToCartPage } from '../../src/pages/AddToCartPage';
test.describe('Add to Cart Functionality', () => {
    test('Verify add to cart functionality', async ({ page }) => {
        const addToCartPage = new AddToCartPage(page);
        await addToCartPage.goto();
        await addToCartPage.ensureHomePage();
        await addToCartPage.productClick();
        await addToCartPage.addToCart();
        
    });
    test('Verify product quantity in cart', async ({ page }) => {
        const addToCartPage = new AddToCartPage(page);
        await addToCartPage.goto();
        await addToCartPage.ensureHomePage();
        await addToCartPage.productClick();
        await addToCartPage.product2click();
        await addToCartPage.FillInProductQuantity('4');
        await addToCartPage.verifyProductQuantityInCart('4');
    });
});
