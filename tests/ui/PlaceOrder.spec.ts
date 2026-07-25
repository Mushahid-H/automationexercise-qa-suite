import test from '@playwright/test';
import { AddToCartPage, } from '../../src/pages/AddToCartPage';
import {PlaceOrder} from '../../src/pages/PlaceOrder';
import {LoginPage} from '../../src/pages/LoginPage'
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
    test('Login before checkout',async ({page})=>{
        const addToCartPage = new AddToCartPage(page);
        const placeOrder = new PlaceOrder(page);
        const loginPage=new LoginPage(page);
        await addToCartPage.goto();
        await addToCartPage.ensureHomePage();
        await placeOrder.clickLogin();
        await loginPage.loginUser('test@piwi.com','test2123'); // do create acc first manually
        await loginPage.ensureUserLoggedIn();
        await placeOrder.addProductToCart();
        await placeOrder.placeOrder();

    })

});

