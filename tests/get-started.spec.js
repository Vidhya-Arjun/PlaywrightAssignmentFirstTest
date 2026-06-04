const{test,expect}=require('@playwright/test')


async function openLoginPage(page) {
    await page.goto("https://eventhub.rahulshettyacademy.com");

    
}

test.only("EventHUB login page loads",async({page})=>
{
    //playwright actions returns promises, await ensures each steps
   //execution finishes next step starts, preventing timing issue

   await openLoginPage(page);
   const email_idfield = page.getByPlaceholder("you@email.com");
   const signInButton = page.getByRole('button',{name:'Sign In'});

   await email_idfield.isVisible();
   await signInButton.isVisible();
   await page.close();


})