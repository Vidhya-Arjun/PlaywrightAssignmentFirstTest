const{test,expect}=require('@playwright/test')


async function openLoginPage(page) {
    await page.goto('/login');
 
}

test("EventHUB login page loads",async({page})=>
{
    //playwright actions returns promises, await ensures each steps
   //execution finishes next step starts, preventing timing issue

   await openLoginPage(page);
   const email_idfield = page.getByPlaceholder("you@email.com");
   const signInButton = page.getByRole('button',{name:'Sign In'});

   await expect(email_idfield).toBeVisible();
   await expect(signInButton).toBeVisible();
   await page.close();
})

test("simple login-page test",async({page})=>
{
    await openLoginPage(page);
    const passwordField = page.getByLabel("Password");
    //extract heading tag text
    const heading = await page.locator("h1.text-xl").textContent();
    await expect(page).toHaveURL(/login/);
    await expect(passwordField).toBeVisible();
    const title = await page.title();
    //validate title
    await expect(title).toMatch("EventHub — Discover & Book Events");
    await expect(heading).toMatch("Sign in to EventHub");
    await page.close();
})