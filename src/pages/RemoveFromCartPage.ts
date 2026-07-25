import {expect, Page} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class RemoveFromCartPage {
    page: Page;
    product2Btn;
    addToCartBtn;
    removeFromCartBtn;
    cartHeading;
    addedProductName;
    productNameInCart;
    emptyCart;
    modal;
    viewCartBtn;

    constructor(page: Page) {
        this.page=page;
        this.product2Btn= page.locator('.features_items .col-sm-4').nth(1);
        this.addToCartBtn = this.product2Btn.locator('.product-overlay a.add-to-cart');
        this.removeFromCartBtn = page.locator('[data-product-id="2"].cart_quantity_delete');
        this.cartHeading=page.locator('.cart_menu');
        this.addedProductName=(this.product2Btn.locator('.productinfo p').first().textContent());
        this.productNameInCart=page.locator('.cart_description').first().textContent();
        this.emptyCart=page.locator('#empty_cart');
        this.modal = page.locator('.modal-content');
        this.viewCartBtn=this.modal.getByRole('link', { name: 'View Cart' });

    }
    async goto(){
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    async addToCart(){
        await this.product2Btn.hover();
        await this.addToCartBtn.click();
        await expect(this.modal).toBeVisible();
        await expect(this.modal.locator('.modal-title')).toHaveText('Added!');
        await this.viewCartBtn.click();
        
    
    }
    async ensureCartPage() {
        await expect(this.page).toHaveURL(`${process.env.WEBSITE_URL}view_cart`);
        await expect(this.cartHeading).toBeVisible();
        await expect(this.addedProductName).toEqual(this.productNameInCart);

    }
    async removeFromCart(){
        
        await this.removeFromCartBtn.click();
        await expect(this.emptyCart).toBeVisible();
    }

    
}