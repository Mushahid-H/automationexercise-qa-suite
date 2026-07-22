import { expect,Page } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
export class LoginPage {
    page: Page;
    loginBtn;
    h2Logintext;
    emailField;
    passwordField;
    submitBtn;
    ensureUserIsLoggedIn;
    deleteBtn;
    accountdeletedHeading;

    constructor(page: Page){
        this.page = page;
        this.loginBtn= page.locator('a[href="/login"]');
        this.h2Logintext= page.getByRole('heading',{name:"Login to your account"});
        this.emailField=page.locator('[data-qa="login-email"]');
        this.passwordField=page.locator('[data-qa="login-password"]');
        this.submitBtn=page.locator('[data-qa="login-button"]');
        this.ensureUserIsLoggedIn=this.page.locator('i[class="fa fa-user"]');
        this.deleteBtn=this.page.locator('a[href="/delete_account"]');
        this.accountdeletedHeading=page.getByRole('heading',{name:"Account Deleted!"});


     }
    async goto(){
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    async loginUser(){
        await this.emailField.fill(process.env.LOGIN_EMAIL!);
        await this.passwordField.fill(process.env.LOGIN_PASS!);
        await this.submitBtn.click();

    }
    async ensureUserLoggedIn() {
        await expect(this.ensureUserIsLoggedIn).toBeVisible();
    }
    async deleteUser() {
        await this.deleteBtn.click();
    }
    async ensureAccountDeleted() {
        await expect(this.accountdeletedHeading).toBeVisible();
    }

}