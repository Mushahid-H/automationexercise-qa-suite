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
        this.womenTitle=page.locator('a[href="#Women"]');
        this.menTitle=page.locator('a[href="#Men"]');
        this.dresslink=page.locator('#Women').locator('a[href="/category_products/1"]');
        this.Tshritlink=page.locator('#Men').getByText('Tshirts');

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
    // async clickWomenCategoryDress(){
    //     await this.womenTitle.click();
    //     await expect(this.dresslink).toBeVisible();
    //     await this.dresslink.click();
    //     // await this.page.waitForLoadState('networkidle');
    // }
    async clickWomenCategoryDress() {
        await this.womenTitle.click();

        console.log("Women panels:", await this.page.locator('#Women').count());

        const dress = this.page.locator('#Women a', { hasText: 'Dress' });

        console.log("Dress visible:", await dress.isVisible());

        await dress.click();
    }
    async clickMenCategoryTshirts(){
        await this.menTitle.click();
        await expect(this.Tshritlink).toBeVisible();
        await this.Tshritlink.click();
        // await this.page.waitForLoadState('networkidle');
    }
    async ensureCateogyWomen(){
        await expect(this.categoryTitle).toHaveText('Women -  Dress Products');
    }
    async ensureMenCategoryMen(){
        await expect(this.categoryTitle2).toHaveText('Men -  Tshirts Products');
    }
}