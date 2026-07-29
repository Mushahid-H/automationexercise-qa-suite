import {expect, Page} from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

export class ReviewProductPage {
    page: Page;
    productsBtn;
    productsPageHeading;
    productOne;
    reviewHeading;
    nameInput;
    emailInput;
    reviewInput;
    reviewSubmitBtn;
    constructor(page: Page) {
        this.page = page;
        this.productsBtn=page.locator('a[href="/products"]');
        this.productsPageHeading=page.getByRole('heading', {name:'All Products'});
        this.productOne=page.locator('a[href="/product_details/1"]');
        this.reviewHeading=page.locator('a[href="#reviews"]')
        this.nameInput=page.locator('#name');
        this.emailInput=page.locator('#email');
        this.reviewInput=page.locator('#review');
        this.reviewSubmitBtn=page.locator('#button-review');
    }
    async goto() {
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async clickProductsBtn(){
        await this.productsBtn.click(); 
    }
    async ensureProductsPage(){
        await expect(this.productsPageHeading).toBeVisible();
    }
    async clickProductOne(){
        await this.productOne.click();
    }
    async fillReviewForm(name: string, email: string, review: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.reviewInput.fill(review);
    }
    async submitReview() {
        await this.reviewSubmitBtn.click();
    }
    async ensureReviewSubmission() {
            await expect(this.page.locator('.alert-success').first()).toHaveText('Thank you for your review.');
    }
}