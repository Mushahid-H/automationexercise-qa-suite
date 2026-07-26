import {expect, Page} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class ViewandCartBrandPage {
    page: Page;
    brandHeading;
    proudctBtn;
    brandNamePolo;
    brandPageheading;
    brandPageheading2;

    brandNameMadame;

    constructor(page:Page){
        this.page=page;
        this.brandHeading = page.locator('.brand-products').locator('h2', { hasText: 'Brands' });
        this.proudctBtn=page.locator('a[href="/products"]');
        this.brandNamePolo=page.locator('.brands-name').locator('a[href="/brand_products/Polo"]');
        this.brandPageheading=page.getByRole('heading', { name: 'Brand - Polo Products' });
        this.brandPageheading2=page.getByRole('heading', { name: 'Brand - Madame Products' });
        this.brandNameMadame=page.locator('.brands-name').locator('a[href="/brand_products/Madame"]');
    }
    async goto(){
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    async clickProducts(){
        await this.proudctBtn.click();
        await expect(this.page).toHaveURL(`${process.env.WEBSITE_URL}products`);
    }
    async ensureBrandsVisible() {
        await expect(this.brandHeading).toBeVisible();
    }
    async clickBrand(){
        await this.brandNamePolo.click();
        await expect(this.page).toHaveURL(`${process.env.WEBSITE_URL}brand_products/Polo`);
        await expect(this.brandPageheading).toBeVisible();
        
    }
    async clickBrandName2(){
        await this.brandNameMadame.click();
        await expect(this.page).toHaveURL(`${process.env.WEBSITE_URL}brand_products/Madame`);
        await expect(this.brandPageheading2).toBeVisible();
    }
}