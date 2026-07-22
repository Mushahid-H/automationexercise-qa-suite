import {expect,Page} from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config();

export class ContactPage{
    page:Page;
    contactUsBtn;
    nameInput;
    emailInput;
    subjectInput;
    msgInput;
    fileInput;
    submitBtn;
    successMsg;
    constructor(page:Page){
        this.page=page;
        this.contactUsBtn=page.locator('a[href="/contact_us"]');
        this.nameInput=page.locator('[data-qa="name"]');
        this.emailInput=page.locator('[data-qa="email"]');
        this.subjectInput=page.locator('[data-qa="subject"]');
        this.msgInput=page.locator('[data-qa="message"]');
        this.fileInput=page.locator('input[name="upload_file"]');
        this.submitBtn=page.locator('[data-qa="submit-button"]');
        this.successMsg=page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');
        
    }
    async goto(){
        await this.page.goto(process.env.WEBSITE_URL!);
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
        await this.contactUsBtn.click();
    }
    async sendContactDetails(name:string,email:string,subject:string,message:string,filePath:string){
        
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.msgInput.fill(message);
        await this.fileInput.setInputFiles(filePath);
        await Promise.all([
            this.page.waitForEvent('dialog').then(dialog => dialog.accept()),
            this.submitBtn.click(),
        ]);
        await this.page.waitForLoadState('networkidle');

        await expect(this.successMsg).toBeVisible();
    }

}