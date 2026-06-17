const {test, expect} = require('@playwright/test');
class EventPage {
  constructor(page) {
    this.page = page;
    this.event_page_identifier = page.getByRole('heading', { level: 1, name: 'Upcoming Events' });
    this.search_event_identifier = page.getByPlaceholder("Search events, venues…");
    this.categoryDropdown = page.locator("select").nth(0);
    this.cityDropdown = page.locator("select").nth(1);
    this.cards = page.locator('[data-testid="event-card"]');
    this.bookEvent_Button = page.locator("#book-now-btn");
    this.addButtonButton = page.getByRole('button',{name:'Add New Event'});
  }

  async assertEventPageVisible() {
    await expect(this.event_page_identifier).toBeVisible();
  }


  async searchAndFilterEvents(testdata) {
  
    await this.search_event_identifier.fill(testdata.searchTerm);

    await this.categoryDropdown.selectOption(testdata.categoryValue);
    await expect(this.categoryDropdown).toHaveValue(testdata.categoryValue);

    await this.cityDropdown.selectOption(testdata.cityName );
    const selectedCity = await this.cityDropdown.inputValue();
    await expect(this.cityDropdown).toHaveValue(selectedCity);

    return {
      cardsLocator: this.cards,
      count: await this.cards.count()
    };
  }

  async bookEventButtonClick() {
    await this.bookEvent_Button.click();
  }

    async assertEventPageLocatorVisible() {
    await expect(this.addButtonButton).toBeVisible();
  }
}
module.exports = { EventPage };