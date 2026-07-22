import test from "@playwright/test";
import {LoginPage} from "../../src/pages/LoginPage";
import dotenv from 'dotenv';
dotenv.config();

test.describe("Login User", () => {
    test("Login User with correct email and password", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.ensureHomePage();
        await page.waitForTimeout(5000);
        await loginPage.loginBtn.click();
        await page.waitForTimeout(5000)
        await loginPage.loginUser(process.env.LOGIN_EMAIL!,process.env.LOGIN_PASS!);
        await loginPage.ensureUserLoggedIn();
        await loginPage.deleteUser();
        await loginPage.ensureAccountDeleted();
    });
    test('Login user with incorrect email and passwor',async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.ensureHomePage();
        await page.waitForTimeout(5000);
        await loginPage.loginBtn.click();
        await page.waitForTimeout(5000)
        await loginPage.loginUser(process.env.WRONG_LOGIN_EMAIL!,process.env.WRONG_LOGIN_PASS!);
        await loginPage.ensureErrorMsg();
    });
    test('Logout user',async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.ensureHomePage();
        await page.waitForTimeout(5000);
        await loginPage.loginBtn.click();
        await page.waitForTimeout(5000)
        await loginPage.loginUser(process.env.LOGIN_EMAIL!,process.env.LOGIN_PASS!);
        await loginPage.ensureUserLoggedIn();
        await loginPage.logoutuser();
    });

});