import {test} from '@playwright/test';
import {SubscriptionPage} from '../../src/pages/SubscriptionPage';
test.describe('Verify subcription functionality',()=>{
    test('Verify subcription functionality in home page', async ({page})=>{
        const subscriptionPage = new SubscriptionPage(page);
        await subscriptionPage.goto();
        await subscriptionPage.ensureHomePage();
        await subscriptionPage.scrollToFooter();
        await subscriptionPage.subscribeEmailInHomePage('random1@gmail.com');
        
    });
    test('Verify subcription functionality in cart page', async ({page})=>{
        const subscriptionPage = new SubscriptionPage(page);
        await subscriptionPage.goto();
        await subscriptionPage.ensureHomePage();
        await subscriptionPage.subcribeEmailInCartPage('randome2@gmail.com');



    });

})

