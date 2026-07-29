import test from '@playwright/test';
import { RecommendedItemsPage } from '../../src/pages/RecommendedItemsPage';

test('Verify adding a recommended item to the cart', async ({ page }) => {
    const recommendedItemsPage = new RecommendedItemsPage(page);
    await recommendedItemsPage.goto();
    await recommendedItemsPage.scrollToRecommendedItems();
    await recommendedItemsPage.ensureRecommendedItems();
    await recommendedItemsPage.clickProductAddToCart();
    await recommendedItemsPage.clickViewCart();
    await recommendedItemsPage.ensureProductAddedToCart();
});

