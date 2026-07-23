import {expect, Page} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
export class ProductsPage {
    page: Page;
    productsBtn;
    productHeading;
    viewProductBtn;
    productName;
    productCategory;
    productPrice;
    productAvailability;
    productCondition;
    productBrand;
    searchInput;
    submitSearch;

    constructor(page: Page){
        this.page = page;
        this.productsBtn= page.locator('a[href="/products"]');
        this.productHeading=page.getByRole('heading',{name:"All Products"});
        this.viewProductBtn=page.locator('a[href="/product_details/1"]');
        this.productName=page.locator('h2:has-text("Blue Top")');
        this.productCategory=page.locator('p:has-text("Category: Women > Tops")');
        this.productPrice=page.getByText('Rs.');
        this.productAvailability=page.locator('b:has-text("Availability:")');
        this.productCondition=page.locator('b:has-text("Condition:")');
        this.productBrand=page.locator('b:has-text("Brand:")');
        this.searchInput=page.locator('#search_product');
        this.submitSearch=page.locator('#submit_search');
    }
     async goto(){
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    async productClick(){
        this.productsBtn.click();
        await expect(this.productHeading).toBeVisible();
    }
    async productsDetails() {
        this.viewProductBtn.click();
        await expect(this.productName).toBeVisible();
        await expect(this.productCategory).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productCondition).toBeVisible();
        await expect(this.productBrand).toBeVisible();
    }
    async productSearch(searchTerm:string) {
        await this.searchInput.fill(searchTerm);
        await this.submitSearch.click();
        await expect(this.page).toHaveURL(process.env.WEBSITE_URL!+"products?search="+searchTerm);
        
    }
}