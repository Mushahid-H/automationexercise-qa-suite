import test from "@playwright/test";
import {ProductsPage} from '../../src/pages/ProductsPage';
test('Verify Products Page',async ({page}) =>{
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.ensureHomePage();
    await productsPage.productsDetails();
});
