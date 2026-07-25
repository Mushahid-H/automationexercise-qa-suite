import test from '@playwright/test';
import { AddToCartPage, } from '../../src/pages/AddToCartPage';
import {PlaceOrder} from '../../src/pages/PlaceOrder';
test.describe('Place Order Functionality', () => {
    test('Register While Checkout', async ({ page }) => {
        const addToCartPage = new AddToCartPage(page);
        const placeOrder = new PlaceOrder(page);
        await addToCartPage.goto();
        await addToCartPage.ensureHomePage();
        // await addToCartPage.addToCart();
        await placeOrder.addProductToCart();
        await placeOrder.ProceedToCheckout();
        await placeOrder.clickLogin();
        await placeOrder.register();
        await placeOrder.placeOrder();

        
    });
    test('Register before checkout', async ({page}) => {
        const addToCartPage = new AddToCartPage(page);
        const placeOrder = new PlaceOrder(page);
        await addToCartPage.goto();
        await addToCartPage.ensureHomePage();
        await placeOrder.clickLogin();
        await placeOrder.register();
        await placeOrder.addProductToCart();
        await placeOrder.placeOrder();
    });

});

