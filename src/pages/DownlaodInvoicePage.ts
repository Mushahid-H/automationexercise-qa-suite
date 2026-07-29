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
        this.downloadInvoiceBtn = page.getByRole('link', {
            name: 'Download Invoice'
        });
        this.continueBtn = page.locator('a[data-qa="continue-button"]');
    }

    async downloadInvoice() {
        await expect(this.downloadInvoiceBtn).toBeVisible({ timeout: 15000 });

        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.downloadInvoiceBtn.click(),
        ]);

        const filePath = `downloads/${download.suggestedFilename()}`;
        await download.saveAs(filePath);

        expect(fs.existsSync(filePath)).toBeTruthy();
    }
    

    async continue() {
        await this.continueBtn.click();
    }
}