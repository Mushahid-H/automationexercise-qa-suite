import test from '@playwright/test';
import {ContactPage} from '../../src/pages/ContactPage';
import dotenv from 'dotenv';
dotenv.config();

test('Fill Contact Us form',async ({page}) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();
    await contactPage.ensureHomePage();
    await page.waitForTimeout(5000);
    await contactPage.sendContactDetails('Test','test@example.com','Test Subject','This is a test message.',process.env.FilePath!);
});