import {expect, Page} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class CategoryPage {
    page:Page;
    categoryHeading;
    categories;
    womenTitle;
    menTitle;
    dresslink;
    Tshritlink;
    categoryTitle;
    categoryTitle2;
    constructor(page: Page) {
        this.page=page;
        this.categoryHeading=page.getByRole('heading', { name: 'Category' })
        this.categories=page.locator('.left-sidebar .category-products');
        this.womenTitle = page.locator('#accordian a[href="#Women"]');
        this.menTitle = page.locator('#accordian a[href="#Men"]');
        this.dresslink=page.locator('#Women').locator('a[href="/category_products/1"]');
        this.Tshritlink=page.locator('#Men').locator('a[href="/category_products/3"]');

        this.categoryTitle=page.getByText('Women -  Dress Products')
        this.categoryTitle2=page.getByText('Men -  Tshirts Products')

    }
    async goto(){
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    async ensureCategories(){
        await expect(this.categoryHeading).toHaveText('Category');
        await expect(this.categories).toBeVisible();
    }
    async clickWomenCategoryDress() {
        await this.dresslink.click();
}
    
    async clickMenCategoryTshirts(){
        
        await this.Tshritlink.click();
    }
    async ensureCateogyWomen(){
        await expect(this.categoryTitle).toHaveText('Women -  Dress Products');
    }
    async ensureMenCategoryMen(){
        await expect(this.categoryTitle2).toHaveText('Men -  Tshirts Products');
    }
}