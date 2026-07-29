import test from "@playwright/test";
import { SearchProductsPage } from "../../src/pages/SearchProductsPage";

test('Search for a product and verify the results', async ({ page }) => {
    const searchProductsPage = new SearchProductsPage(page);

    // Navigate to the website
    await searchProductsPage.goto();

    // Click on the "Products" button
    await searchProductsPage.clickProductsBtn();

    // Ensure that the products page is displayed
    await searchProductsPage.ensureProductsPage();

    // Search for a specific product
    const productName = 'T-Shirt'; // Replace with the desired product name
    await searchProductsPage.searchProduct(productName);

    // Verify that the searched product is displayed in the results
    await searchProductsPage.verifySearchedProduct(productName);

    // Optionally, add the searched product to the cart
    await searchProductsPage.addProductToCart(productName);
    await searchProductsPage.clickCartBtn();
    await searchProductsPage.ensureCartPage(productName);
    await searchProductsPage.login();
    await searchProductsPage.clickCartBtn2();
    await searchProductsPage.ensureCartPage(productName);
});