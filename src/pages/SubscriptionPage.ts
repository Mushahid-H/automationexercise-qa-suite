import {expect,Page} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class SubscriptionPage{
    page:Page;
    footer;
    emailInput;
    arrowSubmit;
    subscriptionSuccess;
    cartBtn;
    constructor(page: Page) {
        this.page = page;
        this.footer=page.locator('#footer');
        this.emailInput=page.locator('#susbscribe_email');
        this.arrowSubmit=page.locator('#subscribe');
        this.subscriptionSuccess=page.getByText('You have been successfully subscribed!');
        this.cartBtn=page.getByRole('link', { name: ' Cart' });
    }
    async goto(){
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    async scrollToFooter() {
        this.footer.scrollIntoViewIfNeeded();
        await expect(this.footer).toBeVisible();
    }
    async subscribeEmailInHomePage(email:string) {
        await this.emailInput.fill(email);
        await this.arrowSubmit.click();
        await expect(this.subscriptionSuccess).toBeVisible();
    }
    async subcribeEmailInCartPage(email:string) {
        await this.cartBtn.click();
        await expect(this.page).toHaveURL(process.env.WEBSITE_URL!+"view_cart");
        await this.scrollToFooter();
        await this.emailInput.fill(email);
        await this.arrowSubmit.click();
        await expect(this.subscriptionSuccess).toBeVisible();

    }

}
