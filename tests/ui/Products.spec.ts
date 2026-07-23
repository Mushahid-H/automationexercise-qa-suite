import test from "@playwright/test";
import {ProductsPage} from '../../src/pages/ProductsPage';
test.describe('Verify Products Page', () => {
    test('Verify Products detail',async ({page}) =>{
        const productsPage = new ProductsPage(page);
        await productsPage.goto();
        await productsPage.ensureHomePage();
        await productsPage.productClick();
        await productsPage.productsDetails();
    });
    test('Verify Product Search',async ({page}) =>{
        const productsPage = new ProductsPage(page);
        await productsPage.goto();
        await productsPage.ensureHomePage();
        await productsPage.productClick();
        await productsPage.productSearch("top");
    });
});