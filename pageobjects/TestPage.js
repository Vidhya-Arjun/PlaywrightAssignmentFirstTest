const {test, expect} = require('@playwright/test');
class BookingPage

{

    constructor(page)
    {
        this.page = page;
        this.bookingReference = page.locator('span',{name:'Booking Ref'});
        this.bookingdetails = page.locator("div.text-sm span");
        this.ticketLabel = page.locator('span', { hasText: 'Tickets' });
        this.ticketValueLocator = page.locator('xpath=following-sibling::span[1]');
        this.formLocator = page.locator("form.space-y-4");
        this.ticketIncrementer = this.formLocator.getByRole('button',{name:'+'});
        this.ticketDecrementer = this.formLocator.getByRole('button',{name:'-'});
        this.ticketCount = this.formLocator.locator("#ticket-count");
        this.enterUserNameTextBox = this.formLocator.getByPlaceholder("Your full name");
        this.enterEmailTextBox = this.formLocator.getByPlaceholder("you@email.com");
        this.enterMobileNoTextBox = this.formLocator.locator("#phone");
        this.confirmBookingBtn = this.formLocator.getByRole('button',{name:'Confirm Booking'});
        this.bookingRefValue = this.page.locator("span.booking-ref")


        
    }


   // Helper method that takes JSON testdata
  async searchAndFilterEvents(testdata) {
    // Search textbox
    await this.search_event_identifier.fill(testdata.searchTerm);

    // Category dropdown
    await this.categoryDropdown.selectOption(testdata.categoryValue);
    await expect(this.categoryDropdown).toHaveValue(testdata.categoryValue);

    // City dropdown
    await this.cityDropdown.selectOption({ index: testdata.cityIndex });
    const selectedCity = await this.cityDropdown.inputValue();
    await expect(this.cityDropdown).toHaveValue(selectedCity);

    // Cards assertion
    await expect(this.cards).toHaveCount(testdata.expectedCount);

    // Return JSON object with useful info
    return {
      searchTerm: testdata.searchTerm,
      category: testdata.categoryValue,
      city: selectedCity,
      count: await this.cards.count(),
      cardsLocator: this.cards
    };
  }

  // Optional: assertion method for page identifier
  async assertEventPageVisible() {
    await expect(this.event_page_identifier).toBeVisible();
  }

  async bookEventButtonClick()
  {
    this.bookEvent_Button.click();
  }

async setBookingDetails(bookingDetails) {
  // Ensure fields are filled before proceeding
  await this.enterUserNameTextBox.fill(bookingDetails.UserName);
  await expect(this.enterUserNameTextBox).toHaveValue(bookingDetails.UserName);

  await this.enterEmailTextBox.fill(bookingDetails.UserEmail);
  await expect(this.enterEmailTextBox).toHaveValue(bookingDetails.UserEmail);

  await this.enterMobileNoTextBox.fill(bookingDetails.UserPhone);
  await expect(this.enterMobileNoTextBox).toHaveValue(bookingDetails.UserPhone);

  // Get current ticket count
  const currentText = await this.ticketCount.textContent();
  let currentCount = Number(currentText.trim());

  // Adjust ticket count
  if (bookingDetails.TicketCount > currentCount) {
    const clicksNeeded = bookingDetails.TicketCount - currentCount;
    for (let i = 0; i < clicksNeeded; i++) {
      await this.ticketIncrementer.click();
    }
  } else if (bookingDetails.TicketCount < currentCount) {
    const clicksNeeded = currentCount - bookingDetails.TicketCount;
    for (let i = 0; i < clicksNeeded; i++) {
      await this.ticketDecrementer.click();
    }
  }

  // Verify final ticket count
  const finalText = await this.ticketCount.textContent();
  const finalCount = Number(finalText.trim());
  await expect(finalCount).toBe(bookingDetails.TicketCount);

  // Wait for confirm button to be enabled before clicking
  await expect(this.confirmBookingBtn).toBeEnabled();
  await this.confirmBookingBtn.click();
}

async getBookDetails()
{
  const bookingdetails_count  =await this.bookingdetails.count();
  console.log(bookingdetails_count);
  const texts = [];
  for (let i = 0; i < bookingdetails_count; i++) {
    const text = await this.bookingdetails.nth(i).textContent();
    texts.push(text.trim());
  }

  return texts;

}

async getBookrefid()
{
 const refid = await this.bookingRefValue.textContent();
 return refid;

}
}

module.exports = { BookingPage };

