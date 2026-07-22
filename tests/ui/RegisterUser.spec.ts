import test from "@playwright/test";
import {RegisterPage} from "../../src/pages/RegisterPage";
import dotenv from 'dotenv';
dotenv.config();

test.describe("Register User", () => {
  test("Register User with unregistered email", async ({ page }) => {
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.ensureHomePage();
      await page.waitForTimeout(5000);
      await registerPage.registerBtnClick();
      await page.waitForTimeout(5000)
      await registerPage.ensureRegisterionPage();
      await registerPage.registerUser("John Doe", "john_doesx@example.com")
      await registerPage.ensureSubmissionSuccess();
      await registerPage.fillAccountInformation("password123@23", "John", "Doe", "123 Main St", "California", "Los Angeles", "90001", "1234567890", "1", "January", "1990", "United States");
      await registerPage.createAccountBtn.click();
      await registerPage.ensureAccountCreated();
      await registerPage.continueBtn.click();
      await registerPage.deleteBtn.click();
      await registerPage.ensureAccountDeleted();
    });
    test("Register User with existing email", async ({ page }) => {
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.ensureHomePage();
      await page.waitForTimeout(5000);
      await registerPage.registerBtnClick();
      await page.waitForTimeout(5000)
      await registerPage.ensureRegisterionPage();
      await registerPage.registerUser("John Doe", process.env.LOGIN_EMAIL!);
      await registerPage.ensureErrorMsg();
    });

});