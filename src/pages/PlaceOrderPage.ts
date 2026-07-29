import {expect,Page} from "@playwright/test";
import {RegisterPage} from "./RegisterPage.ts";
import dotenv from "dotenv";
dotenv.config();

export class PlaceOrderPage {
    page: Page;
    productsBtn;
    product2Btn;
    addToCartBtn;
    proceedToCheckoutBtn;
    modal;
    viewCartBtn;
    loginFromCheckout;
    cartBtn;
    loggedInas;
    addressDetails;
    reviewYourOrder;
    commentBox;
    placeOrderBtn;
    nameOnCard;
    cardNumber;
    cvcnumber;
    month;
    year;
    payAndConfirmOrderBtn;;
    continueBtn;
    orderPlacedSuccessfullyHeading;
    deleteBtn;
    accountdeletedHeading;
    errorMsg;
    login;
    closemodal;

    constructor(page: Page){
        this.page = page;
        this.productsBtn= page.locator('a[href="/products"]');
        this.product2Btn = page.locator('.features_items .col-sm-4').nth(1);
        this.addToCartBtn = this.product2Btn.locator('.product-overlay a.add-to-cart');
        this.proceedToCheckoutBtn=page.locator('.check_out');
        this.modal = page.locator('.modal-content');
        this.viewCartBtn=this.modal.getByRole('link', { name: 'View Cart' });
        this.loginFromCheckout=this.modal.locator('a[href="/login"]');
        this.loggedInas=page.locator('i[class="fa fa-user"]');
        this.cartBtn=page.getByRole('link', { name: ' Cart' });
        this.addressDetails=page.getByRole('heading', { name: 'Address Details' });
        this.reviewYourOrder=page.getByRole('heading', { name: 'Review Your Order' });
        this.commentBox=page.locator('textarea[name="message"]');
        this.placeOrderBtn=page.locator('a[href="/payment"]');
        this.nameOnCard=page.locator('[data-qa="name-on-card"]');
        this.cardNumber=page.locator('[data-qa="card-number"]');
        this.cvcnumber=page.locator('[data-qa="cvc"]');
        this.month=page.locator('[data-qa="expiry-month"]');
        this.year=page.locator('[data-qa="expiry-year"]');
        this.payAndConfirmOrderBtn=page.locator('[data-qa="pay-button"]');
        this.continueBtn=page.locator('a[data-qa="continue-button"]');
        this.orderPlacedSuccessfullyHeading=page.locator('#success_message')
        this.deleteBtn=page.locator('a[href="/delete_account"]');
        this.accountdeletedHeading=page.getByRole('heading',{name:"Account Deleted!"});
        this.errorMsg=page.getByText('Your email or password is incorrect!');
        this.login=page.locator('a[href="/login"]');
        this.closemodal=this.modal.locator('button[data-dismiss="modal"]');   
    }
   
    async addProductToCart() {
        await this.product2Btn.hover();
        await this.addToCartBtn.click();
        await expect(this.modal).toBeVisible();
        await expect(this.modal.locator('.modal-title')).toHaveText('Added!');
        await this.closemodal.click();
    }
    async ProceedToCheckout() {
        await this.viewCartBtn.click();
        await this.proceedToCheckoutBtn.click();  
    }
    async clickLogin(){
         await this.login.click();
    }
    async register() {
        const registerPage = new RegisterPage(this.page);
        await registerPage.registerUser('josh','joshodigitallyyiloveyo@gmail.com');
        await registerPage.ensureSubmissionSuccess();
        await registerPage.fillAccountInformation('123456','josh','smith','123 street','California','Los Angeles','90001','1234567890','1','January','1990','United States');
        await registerPage.selectDateOfBirth('1','January','1990');
        await registerPage.selectCountry('United States');        
        await registerPage.createAccountBtn.click();
        await registerPage.ensureAccountCreated();
        await registerPage.continueBtn.click();
        await this.loggedInas.isVisible();
    }
    async placeOrder() {
        await this.cartBtn.click();
        await this.proceedToCheckoutBtn.click();
        await this.commentBox.fill('this is my order bro.');
        await this.placeOrderBtn.click();
        await this.fillCardInfo('John Doe', '1234567890123456', '123', '01', '2025');
        

    }
    async deleteAccount() {
        await this.deleteBtn.click();
        await this.accountdeletedHeading.isVisible();
    }
    async fillCardInfo(name:string, cardNumber:string, cvc:string, month:string, year:string) {
        this.nameOnCard.fill(name);
        this.cardNumber.fill(cardNumber);
        this.cvcnumber.fill(cvc);
        this.month.fill(month);
        this.year.fill(year);
        await this.payAndConfirmOrderBtn.click();
        await expect(this.orderPlacedSuccessfullyHeading).toHaveText('Your order has been placed successfully!');
    }
}