// Required helpers you must implement:

// login(page) helper that signs in and asserts the Browse Events link is visible
// getEventCards(page) helper that returns all event cards from the Events page
// parseSeatCount(text) helper that extracts the numeric available-seat value from text like 498 seats available


const {test, expect} = require('@playwright/test');
class LoginPage
{

    constructor(page)
    {
        this.page = page;
        this.username = this.page.getByPlaceholder("you@email.com");
        this.password = this.page.locator("#password");
        this.signInButton = this.page.getByRole('button',{name:'Sign In'});


    }

    async openURL()
    {
        await this.page.goto('/login');
    }

    async validateUserLogin(userName,password)
    {
        await this.username.fill(userName);
        await this.password.fill(password)
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };