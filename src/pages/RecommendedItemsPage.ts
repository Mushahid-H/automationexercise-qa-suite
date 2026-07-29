import {expect, Page} from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

export class RecommendedItemsPage {
    page: Page;
    RecommededItemsHeading;
    product;
    productName;
    addToCart;
    viewCart;
    productInCart;
    constructor(page:Page){
        this.page=page;
        this.RecommededItemsHeading=page.locator('.recommended_items');
        this.product=this.RecommededItemsHeading.locator('.productinfo.text-center').first();
        this.productName=this.product.locator('p');
        this.addToCart=this.product.locator('.add-to-cart');
        this.viewCart=page.locator('a').filter({ hasText: 'View Cart' })
        this.productInCart=page.locator('.cart_description h4');

    }
    async goto() {
        await this.page.goto(process.env.WEBSITE_URL!);
        
    }
    async scrollToRecommendedItems() {
        await this.RecommededItemsHeading.scrollIntoViewIfNeeded();
    }
    async ensureRecommendedItems(){
        await expect(this.RecommededItemsHeading).toBeVisible();
    }
    async clickProductAddToCart() {
        await this.addToCart.click();
    }
    async clickViewCart() {
        await this.viewCart.click();
    }
    async ensureProductAddedToCart() {
        await expect(this.productInCart).toBeVisible();
    }
}``