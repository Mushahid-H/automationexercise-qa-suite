import {expect,Page} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class TestCasesPage {
    page:Page;
    testcasesBtn;
    constructor(page:Page){
        this.page = page;
        this.testcasesBtn=page.getByRole('link', { name: ' Test Cases' })
    }
    async goto(){
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    async testcasesnavigation() {
        this.testcasesBtn.click();
        await expect(this.page).toHaveURL(process.env.WEBSITE_URL!+"test_cases");
    }

}