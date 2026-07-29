import test from '@playwright/test';
import { ScrollUpPage } from '../../src/pages/ScrollUpPage';

test.describe('Scroll Up and Down', () => {
    test('Scroll Up via Arrow', async ({ page }) => {
        const scrollUpPage = new ScrollUpPage(page);
        await scrollUpPage.goto();
        await scrollUpPage.ensureHomePage();
        await scrollUpPage.scrollDownToFooter();
        await scrollUpPage.clickScrollUp();
        await scrollUpPage.ensurePageHeadingVisible();
    });
})
