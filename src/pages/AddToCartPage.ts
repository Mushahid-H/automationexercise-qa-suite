import {expect,Page} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class AddToCartPage {
    page: Page;
    productsBtn;
    product2Btn;
    addToCartBtn;
    proceedToCheckoutBtn;
    modal;
    viewCartBtn;

    constructor(page: Page){
        this.page = page;
        this.productsBtn= page.locator('a[href="/products"]');
        this.product2Btn = page.locator('.features_items .col-sm-4').nth(1);
        this.addToCartBtn = this.product2Btn.locator('.product-overlay a.add-to-cart');
        this.proceedToCheckoutBtn=page.getByRole('link', { name: 'Proceed To Checkout' });
        this.modal = page.locator('.modal-content');
        this.viewCartBtn=this.modal.getByRole('link', { name: 'View Cart' });
    }
     async goto(){
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    async productClick(){
        await this.productsBtn.click();
    }
    async addToCart() {
        await this.product2Btn.hover();
        await this.addToCartBtn.click();
        await expect(this.modal).toBeVisible();
        await expect(this.modal.locator('.modal-title')).toHaveText('Added!');
        await this.viewCartBtn.click();

    }
    
}