import test from "@playwright/test";
import {RemoveFromCartPage} from "../../src/pages/RemoveFromCartPage.ts";
test('Remove from cart', async ({page})=>{
    const removeFromCartPage = new RemoveFromCartPage(page);
    await removeFromCartPage.goto();
    await removeFromCartPage.ensureHomePage();
    await removeFromCartPage.addToCart();
    await removeFromCartPage.ensureCartPage();
    await removeFromCartPage.removeFromCart();
});