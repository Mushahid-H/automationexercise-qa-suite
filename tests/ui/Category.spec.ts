import test from '@playwright/test';
import { CategoryPage } from '../../src/pages/CategoryPage';

test('Verify that categories are visible on left side bar', async ({ page }) => {
    const categoryPage = new CategoryPage(page);
    categoryPage.goto();
    await categoryPage.ensureHomePage();
    await categoryPage.ensureCategories();
    await categoryPage.clickWomenCategoryDress();
    await categoryPage.ensureCateogyWomen();
    await categoryPage.clickMenCategoryTshirts();
    await categoryPage.ensureMenCategoryMen();

});

