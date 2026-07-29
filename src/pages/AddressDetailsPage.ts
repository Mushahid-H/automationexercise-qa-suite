import {expect,Page} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class AddressDetailsPage {

    registerBtn;
    homeBtn;
    nameField;
    emailField;
    submitBtn;
    titleBtn;
    passwordFiled;
    newletterChxbx;
    optinChxbx;
    firstName;
    lastName;
    addressField;
    stateField;
    cityField;
    zipCodeField;
    mobileNoField;
    daySelect;
    monthSelect;
    yearSelect
    countrySelect;
    createAccountBtn;
    accountCreatedHeading;
    accountdeletedHeading;
    continueBtn;
    deleteBtn;
    errorMsg;
    page: Page;
    ensureUserIsLoggedIn;
    product2Btn;
    addToCartBtn;
    modal;
    viewCartBtn;
    proceedToCheckoutBtn;
    deliveryAddress;
    billingAddress;


    constructor(page: Page) {
        this.page= page;
        this.homeBtn=page.locator('a[href="/"]');
        this.registerBtn = page.locator('a[href="/login"]');
        this.nameField=page.locator('[data-qa="signup-name"]')
        this.emailField=page.locator('[data-qa="signup-email"]')
        this.submitBtn=page.getByRole('button',{name:"Signup"});
        this.titleBtn=page.locator('#uniform-id_gender1');
        this.passwordFiled=page.locator('[data-qa="password"]');
        this.newletterChxbx=page.locator('#newsletter');
        this.optinChxbx=page.locator('#optin');
        this.firstName=page.locator('[data-qa="first_name"]');
        this.lastName=page.locator('[data-qa="last_name"]');
        this.addressField=page.locator('[data-qa="address"]');
        this.stateField=page.locator('[data-qa="state"]');
        this.cityField=page.locator('[data-qa="city"]');
        this.zipCodeField=page.locator('[data-qa="zipcode"]');
        this.mobileNoField=page.locator('[data-qa="mobile_number"]');
        this.daySelect = page.locator('[data-qa="days"]');
        this.monthSelect = page.locator('[data-qa="months"]');
        this.yearSelect = page.locator('[data-qa="years"]');
        this.countrySelect = page.locator('[data-qa="country"]');
        this.createAccountBtn=page.getByRole('button',{name:"Create Account"});
        this.accountCreatedHeading=page.getByRole('heading',{name:"Account Created!"});
        this.continueBtn=page.locator('a[data-qa="continue-button"]');
        this.deleteBtn=page.locator('a[href="/delete_account"]');
        this.accountdeletedHeading=page.getByRole('heading',{name:"Account Deleted!"});
        this.errorMsg=page.getByText('Email Address already exist!');
        this.ensureUserIsLoggedIn=this.page.locator('i[class="fa fa-user"]');
        this.product2Btn = page.locator('.features_items .col-sm-4').nth(1);
        this.addToCartBtn = this.product2Btn.locator('.product-overlay a.add-to-cart');
        this.modal = page.locator('.modal-content');
        this.viewCartBtn=this.modal.locator('a[href="/view_cart"]');
        this.proceedToCheckoutBtn=page.locator('.check_out');
        this.deliveryAddress = page.locator("#address_delivery");
        this.billingAddress = page.locator("#address_invoice");


    }
    async goto() {
        await this.page.goto(process.env.WEBSITE_URL!,{waitUntil: "domcontentloaded"});
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }

    async registerBtnClick() {
        await this.registerBtn.click();
    }
    async ensureRegisterionPage() {
        await expect(this.page).toHaveURL(process.env.WEBSITE_URL!+"login");
        await expect(this.page.getByRole('heading',{name:"New User Signup!"})).toBeVisible();
    }
    async registerUser(name: string, email: string) {
        await this.nameField.fill(name);
        await this.emailField.fill(email);
        await this.submitBtn.click();
    }
    async ensureSubmissionSuccess() {
        await expect(this.page.getByRole('heading',{name:"ENTER ACCOUNT INFORMATION"})).toBeVisible();
    }
    async fillAccountInformation(password: string, firstName: string, lastName: string, address: string, state: string, city: string, zipCode: string, mobileNo: string, day: string, month: string, year: string, country: string) {
        await this.titleBtn.click();
        await this.passwordFiled.fill(password);

        await this.selectDateOfBirth(day, month, year);
        await this.selectCountry(country);
        
        await this.newletterChxbx.check();
        await this.optinChxbx.check();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.addressField.fill(address);
        await this.stateField.fill(state);
        await this.cityField.fill(city);
        await this.zipCodeField.fill(zipCode);
        await this.mobileNoField.fill(mobileNo);

    }
    async selectDateOfBirth(day: string, month: string, year: string) {
        await this.daySelect.selectOption(day);
        await this.monthSelect.selectOption(month);
        await this.yearSelect.selectOption(year);
    }

    async selectCountry(country: string) {
        await this.countrySelect.selectOption(country);
    }
    async ensureAccountCreated() {
        await expect(this.accountCreatedHeading).toBeVisible();
    }
    async ensureAccountDeleted() {
        await expect(this.accountdeletedHeading).toBeVisible();
    }
    async ensureErrorMsg(){
        await expect(this.errorMsg).toBeVisible();
    }
    async ensureUserLoggedIn() {
        await expect(this.ensureUserIsLoggedIn).toBeVisible();
    }
    async addToCart() {
        await this.product2Btn.hover();
        await this.addToCartBtn.click();
        await expect(this.modal).toBeVisible();
        await expect(this.modal.locator('.modal-title')).toHaveText('Added!');
        await this.viewCartBtn.click();

    }
    async ensureCartPage() {
        await expect(this.page).toHaveURL(process.env.WEBSITE_URL!+"view_cart");
    }
    async proceedToCheckout() {
        await this.proceedToCheckoutBtn.click();
    }
    
    async verifyDeliveryAddress(expectedAddress: string[]) {
        await expect(this.deliveryAddress).toBeVisible();
        const actualAddress = await this.deliveryAddress.locator("li").allTextContents();
        
        const cleanedAddress = actualAddress
        .slice(1)
        .map(text => text.replace(/\s+/g, " ").trim())
        .filter(text => text !== "");

        expect(cleanedAddress).toEqual(expectedAddress);
    }

  async verifyBillingAddress(expectedAddress: string[]) {
        await expect(this.deliveryAddress).toBeVisible();

        const actualAddress = await this.billingAddress.locator("li").allTextContents();

        const cleanedAddress = actualAddress
        .slice(1)
        .map(text => text.replace(/\s+/g, " ").trim())
        .filter(text => text !== "");

        expect(cleanedAddress).toEqual(expectedAddress);
    }
}