import {expect, Page} from "@playwright/test";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

export class DownlaodInvoicePage {
    page: Page;
    downloadInvoiceBtn;
    continueBtn;

    constructor(page: Page) {
        this.page = page;
        this.downloadInvoiceBtn = page.locator('a[href^="/download_invoice/"]');
        this.continueBtn = page.locator('a[data-qa="continue-button"]');
    }

    async downloadInvoice() {
        
        const downloadPromise = this.page.waitForEvent('download');

        await this.downloadInvoiceBtn.click();

        const download = await downloadPromise;

        // Suggested filename
        console.log(await download.suggestedFilename());

        // Save the file
        await download.saveAs(`downloads/${await download.suggestedFilename()}`);
        const filePath = `downloads/${await download.suggestedFilename()}`;

        expect(fs.existsSync(filePath)).toBeTruthy();
    }
    

    async continue() {
        await this.continueBtn.click();
    }
}