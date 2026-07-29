import {expect,Page} from '@playwright/test'
import dotevn from 'dotenv'
import {LoginPage} from './LoginPage.ts'

dotevn.config();

export class SearchProductsPage{
    page:Page;
    productsBtn;
    searchHeading;
    searchedProducts;
    productsPageHeading;
    searchInput;
    submitSearchBtn;
    products;
    cartBtn;
    cartBtn2;
    goToLogin;   
    cartDescription;                                              

    constructor(page:Page){
        this.page=page;
        this.productsBtn=page.locator('a[href="/products"]');
        this.productsPageHeading=page.getByRole('heading', {name:'All Products'})
        this.searchHeading=page.getByRole('heading',{name:'Searched Products'})
        this.searchedProducts=page.locator('.features_items');
        this.searchInput=this.page.locator('#search_product');
        this.submitSearchBtn=this.page.locator('#submit_search');
        this.products=this.page.locator('.productinfo.text-center');
        this.cartBtn=this.page.locator('a').filter({ hasText: 'View Cart' })
        this.goToLogin=this.page.getByRole('link', { name: ' Signup / Login' })
        this.cartDescription=this.page.locator('.cart_description');
        this.cartBtn2=this.page.getByRole('link', { name: ' Cart' })

    }
    async goto(){
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async clickProductsBtn(){
        await this.productsBtn.click(); 
    }
    async ensureProductsPage(){
        await expect(this.productsPageHeading).toBeVisible();
    }
    async searchProduct(productName:string){
        await this.searchInput.fill(productName);
        await this.submitSearchBtn.click();
        await expect(this.searchHeading).toBeVisible();
    }
    async verifySearchedProduct(expectedProductName: string) {
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            const product = this.products.nth(i);

            await expect(product.locator('p')).toContainText(expectedProductName);
        }
    }
    async addProductToCart(productName: string) {
        const product = this.products.filter({
            has: this.page.locator('p', { hasText: productName })
        });

        await product.locator('a:has-text("Add to cart")').first().click();
    }
    async clickCartBtn() {
        await this.cartBtn.click();
        
    }
    async clickCartBtn2() {
        await this.cartBtn2.click();
    }
    async ensureCartPage(productName: string) {
        // await expect(this.page).toHaveURL(/\/view_cart/);
        await expect(this.cartDescription).toContainText(productName);
    }
    
    async login(){
        const loginPage = new LoginPage(this.page);
        await this.goToLogin.click();
        console.log(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)
        await loginPage.loginUser(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASS!);
    }
}
