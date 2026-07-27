import test from '@playwright/test';
import {ViewandCartBrandPage} from '../../src/pages/ViewandCartBrandPage';

test('View and Verify Brand',async ({page})=>{
    const viewandCartBrandPage = new ViewandCartBrandPage(page);
    await viewandCartBrandPage.goto();
    await viewandCartBrandPage.ensureHomePage();
    await viewandCartBrandPage.clickProducts();
    await viewandCartBrandPage.ensureBrandsVisible();
    await viewandCartBrandPage.clickBrand();
    await viewandCartBrandPage.clickBrandName2();

});