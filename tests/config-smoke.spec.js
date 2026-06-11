const {test,expect}=require('@playwright/test')

async function openLoginPage(page)
{
   await page.goto('/login')
}

 function getEmailField(page)
{
    return page.locator("input#email");
}

 function getSignInButtonLocator(page)
{
    return page.locator("button#login-btn");
}

test("page title validation",async({page}) =>
{  
        await openLoginPage(page);
        const title = await page.title();
        await expect(title).toContain("EventHub");
        const email_field = getEmailField(page);
        const signInButton = getSignInButtonLocator(page);
        await email_field.toBeVisible();
        await signInButton.toBeVisible();

})



test.only("Compare page fixture and browser context",async({browser,page}) =>
{
            // Step 1: Fixture page
            await openLoginPage(page);
            const email_field = getEmailField(page);

            await email_field.fill("beginner@sample.com");
            await expect(email_field).toHaveValue("beginner@sample.com");   
            

              // Step 2: Isolated context

//difference between page fixture and browser context
//The page fixture is a ready-to-use browser tab provided automatically by Playwright’s test runner.
//A separate, isolated browser session inside the same browser instance. Think of it like a new incognito window.
//Useful when you want multiple independent sessions in the same test (e.g., simulating two different users logging in).
            const isolatedContext = await browser.newContext();
            const isolatedPage = await isolatedContext.newPage();
           
            await isolatedPage.goto('/login');
            await expect(isolatedPage).toHaveTitle(/EventHub/);
            const email_field_ip = getEmailField(isolatedPage);
            await expect(email_field_ip).toBeEmpty();
           
            await isolatedContext.close();
}) 