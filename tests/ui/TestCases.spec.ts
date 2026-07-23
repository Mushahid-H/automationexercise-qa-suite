import test from "@playwright/test";
import { TestCasesPage } from "../../src/pages/TestCasesPage";
test('Verify Test Cases Page',async ({page}) =>{
    const testCasesPage = new TestCasesPage(page);
    await testCasesPage.goto();
    await testCasesPage.ensureHomePage();
    await testCasesPage.testcasesnavigation();
})