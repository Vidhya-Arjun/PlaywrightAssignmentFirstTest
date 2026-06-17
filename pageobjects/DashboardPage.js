const {test, expect} = require('@playwright/test');
class DashboardPage

{

    constructor(page)
    {
        this.page = page;
        this.browseEvent_Button =  page.getByText('Browse Events').first();
    }

    async clickOnBookEvent()
    {
        await this.browseEvent_Button.click();
    }
}
module.exports ={ DashboardPage };
