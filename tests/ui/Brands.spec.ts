import test from '@playwright/test';
import {ViewandCartBrandPage} from '../../src/pages/ViewandCartBrandPage';

test('View and Verify Brand',({page})=>{
    const viewandCartBrandPage = new ViewandCartBrandPage(page);
    viewandCartBrandPage.goto();
    viewandCartBrandPage.ensureHomePage();
    viewandCartBrandPage.clickProducts();
    viewandCartBrandPage.ensureBrandsVisible();
    viewandCartBrandPage.clickBrand();
    viewandCartBrandPage.clickBrandName2();

});