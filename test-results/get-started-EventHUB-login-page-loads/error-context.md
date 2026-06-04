# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: get-started.spec.js >> EventHUB login page loads
- Location: tests\get-started.spec.js:10:6

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://eventhub.rahulshettyacademy.com/", waiting until "load"

```

# Test source

```ts
  1  | const{test,expect}=require('@playwright/test')
  2  | 
  3  | 
  4  | async function openLoginPage(page) {
> 5  |     await page.goto("https://eventhub.rahulshettyacademy.com");
     |                ^ Error: page.goto: Target page, context or browser has been closed
  6  | 
  7  |     
  8  | }
  9  | 
  10 | test.only("EventHUB login page loads",async({page})=>
  11 | {
  12 |     //playwright actions returns promises, await ensures each steps
  13 |    //execution finishes next step starts, preventing timing issue
  14 | 
  15 |    openLoginPage(page);
  16 |    const email_idfield = page.getByPlaceholder("you@email.com");
  17 |    const signInButton = page.getByRole('button',{name:'Sign In'});
  18 | 
  19 |    await email_idfield.isVisible();
  20 |    await signInButton.isVisible();
  21 |    await page.close();
  22 | 
  23 | 
  24 | })
```