import test from "@playwright/test";
import {AddressDetailsPage} from "../../src/pages/AddressDetailsPage";
import dotenv from 'dotenv';

dotenv.config();

test.describe("Address Detials", () => {
  test("Verify Address Details and Billing Address", async ({ page }) => {
      const addressDetialsPage = new AddressDetailsPage(page);
      await addressDetialsPage.goto();
      await addressDetialsPage.ensureHomePage();
      await page.waitForTimeout(5000);
      await addressDetialsPage.registerBtnClick();
      await page.waitForTimeout(5000)
      await addressDetialsPage.ensureRegisterionPage();
      await addressDetialsPage.registerUser("John Doe", "john_doesxyzabC@example.com")
      await addressDetialsPage.ensureSubmissionSuccess();
      await addressDetialsPage.fillAccountInformation("password123@23", "John", "Doe", "123 Main St", "California", "Los Angeles", "90001", "1234567890", "1", "January", "1990", "United States");
      await addressDetialsPage.createAccountBtn.click();
      await addressDetialsPage.ensureAccountCreated();
      await addressDetialsPage.continueBtn.click();
      //add new logic
      await addressDetialsPage.ensureUserLoggedIn();
      await addressDetialsPage.product2Btn.click();
      await addressDetialsPage.addToCart();
      await addressDetialsPage.ensureCartPage();
      await addressDetialsPage.proceedToCheckout();
      await addressDetialsPage.verifyDeliveryAddress(["Mr. John Doe", "123 Main St", "Los Angeles California 90001", "United States", "1234567890"]);
      await addressDetialsPage.verifyBillingAddress(["Mr. John Doe", "123 Main St", "Los Angeles California 90001", "United States", "1234567890"]);
      await addressDetialsPage.deleteBtn.click();
      await addressDetialsPage.ensureAccountDeleted();
    });
});
