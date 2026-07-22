import test from "@playwright/test";
import {LoginPage} from "../../src/pages/LoginPage";

test("Login User", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.ensureHomePage();
    await page.waitForTimeout(5000);
    await loginPage.loginBtn.click();
    await page.waitForTimeout(5000)
    await loginPage.loginUser();
    await loginPage.ensureUserLoggedIn();
    await loginPage.deleteUser();
    await loginPage.ensureAccountDeleted();
});