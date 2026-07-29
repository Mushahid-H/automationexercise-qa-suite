import test from '@playwright/test';
import { AddToCartPage, } from '../../src/pages/AddToCartPage';
import {PlaceOrderPage} from '../../src/pages/PlaceOrderPage';
import { DownlaodInvoicePage } from '../../src/pages/DownlaodInvoicePage';
import { RegisterPage } from '../../src/pages/RegisterPage';

test('Register before checkout', async ({page}) => {
        const addToCartPage = new AddToCartPage(page);
        const placeOrder = new PlaceOrderPage(page);
        const downloadInvoicePage = new DownlaodInvoicePage(page);
        const registerPage = new RegisterPage(page);
        await addToCartPage.goto();
        await addToCartPage.ensureHomePage();
        await placeOrder.clickLogin();
        await placeOrder.register();
        await placeOrder.addProductToCart();
        await placeOrder.placeOrder();
        await downloadInvoicePage.downloadInvoice();
        await downloadInvoicePage.continue();
        await registerPage.deleteBtn.click();
        await registerPage.ensureAccountDeleted();
        // await placeOrder.deleteBtn.click();
        // await placeOrder.ensureAccountDeleted();
});