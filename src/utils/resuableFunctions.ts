export class resuableFtns{
    async goto() {
        await this.page.goto(process.env.WEBSITE_URL!,{waitUntil: "domcontentloaded"});
    }
    async ensureHomePage() {
        await expect(this.page).toHaveTitle('Automation Exercise');
}
}