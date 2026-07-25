import test from '@playwright/test';
import { AddToCartPage, } from '../../src/pages/AddToCartPage';
import {PlaceOrder} from '../../src/pages/PlaceOrder';

test('Register While Checkout', async ({ page }) => {
        const addToCartPage = new AddToCartPage(page);
        const placeOrder = new PlaceOrder(page);
        await addToCartPage.goto();
        await addToCartPage.ensureHomePage();
        // await addToCartPage.addToCart();
        await placeOrder.RegisterWhileCheckout();
        await placeOrder.register();
        await placeOrder.placeOrder();

        
});