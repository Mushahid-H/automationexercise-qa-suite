import test from '@playwright/test';
import { ScrollUpDownPage } from '../../src/pages/ScrollUpDownPage';

test.describe('Scroll Up and Down', () => {
    test('Scroll Up via Arrow', async ({ page }) => {
        const scrollUpPage = new ScrollUpDownPage(page);
        await scrollUpPage.goto();
        await scrollUpPage.ensureHomePage();
        await scrollUpPage.scrollDownToFooter();
        await scrollUpPage.clickScrollUp();
        await scrollUpPage.ensurePageHeadingVisible();
    });
    test('Scroll Up Without Arrow', async ({ page }) => {
        const scrollUpPage = new ScrollUpDownPage(page);
        await scrollUpPage.goto();
        await scrollUpPage.ensureHomePage();
        await scrollUpPage.scrollDownToFooter();
        await scrollUpPage.page.evaluate(() => window.scrollTo(0, 0));
        await scrollUpPage.ensurePageHeadingVisible();
    });
})
