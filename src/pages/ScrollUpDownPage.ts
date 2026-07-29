import {expect, Page} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class ScrollUpDownPage {
    page: Page;
    footer;
    subscription;
    upArrow;
    PageHeading;
    constructor(page: Page) {
        this.page = page;
        this.footer = page.locator('#footer');
        this.subscription=this.footer.locator('h2').getByText('Subscription');
        this.upArrow=page.locator('#scrollUp');
        this.PageHeading=page.getByRole('heading', { name: 'Full-Fledged practice website' })
    }

    async goto() {
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    async scrollDownToFooter() {
        await this.footer.scrollIntoViewIfNeeded();
        await expect(this.subscription).toBeVisible();
    }

    async clickScrollUp(){
        await this.upArrow.click();

    }
    async ensurePageHeadingVisible(){
        await expect(this.PageHeading).toBeVisible();
    }

}