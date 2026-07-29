import test from "@playwright/test";
import {ReviewProductPage} from "../../src/pages/ReviewProductPage";

test('Submit a product review and verify submission', async ({ page }) => {
    const reviewProductPage = new ReviewProductPage(page);

    await reviewProductPage.goto();
    await reviewProductPage.clickProductsBtn();
    await reviewProductPage.ensureProductsPage();
    await reviewProductPage.clickProductOne();
    
    const name = 'John Doe';
    const email = 'joeDohn@gmail.com';
    const review = 'This is a great product! Highly recommended.';

    await reviewProductPage.fillReviewForm(name, email, review);
    await reviewProductPage.submitReview();
    await reviewProductPage.ensureReviewSubmission();

});
