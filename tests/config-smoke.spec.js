const {test,expect}=require('@playwright/test')

async function openLoginPage(page)
{
   await page.goto('/login')
}

test("page title validation",async({page}) =>
{
        await openLoginPage(page);
        const title = await page.title();
        await expect(title).toContain("EventHub");
        const email_field = page.locator("input#email");
        const signInButton = page.locator("button#login-btn");
        await email_field.toBeVissible();
        await signInButton.toBeVissible();

})

test.only("Compare page fixture and browser context",async({browser,page}) =>
{

            const isolatedContext = await browser.newContext();
            const isolatedPage = await isolatedContext.newPage();
            await openLoginPage(page);
            const email_field = page.locator("input#email");
            await email_field.fill("beginner@sample.com");
            await expect(email_field).toHaveValue("beginner@sample.com");    
            await isolatedPage.goto('/login');
            await expect(isolatedPage).toHaveTitle(/EventHub/);
            const email_field_ip = isolatedPage.locator("input#email");
            await expect(email_field_ip).toBeEmpty();
            await isolatedContext.close();
}) 