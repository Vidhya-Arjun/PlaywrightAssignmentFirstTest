const {test, expect} = require('@playwright/test');

class BookingPage {
  constructor(page) {
    this.page = page;
    this.bookingRefValue = page.locator("span.booking-ref");
    this.bookingdetails = page.locator("div.text-sm span");
    this.ticketCount = page.locator("#ticket-count");
    this.enterUserNameTextBox = page.getByPlaceholder("Your full name");
    this.enterEmailTextBox = page.getByPlaceholder("you@email.com");
    this.enterMobileNoTextBox = page.locator("#phone");
    this.confirmBookingBtn = page.getByRole('button',{name:'Confirm Booking'});
    this.ticketIncrementer = page.getByRole('button',{name:'+'});
    this.ticketDecrementer = page.getByRole('button',{name:'-'});
    this.bookingConfirmationMessage = page.locator('p',{hasText:'Your tickets are reserved.'})
    this.MyBookingTabLink = page.locator("#nav-bookings");
    this.pageIdentiferBooking = page.getByRole('heading',{level:2,name:'Book Tickets'});
  }

async assertFormVisibility()
{
    await expect(this.pageIdentiferBooking).toBeVisible();
}

  async setBookingDetails(bookingDetails) {
   // await this.assertFormVisibility();
    await this.enterUserNameTextBox.fill(bookingDetails.UserName);
    await this.enterEmailTextBox.fill(bookingDetails.UserEmail);
    await this.enterMobileNoTextBox.fill(bookingDetails.UserPhone);

    // Adjust ticket count
    const currentCount = Number((await this.ticketCount.textContent()).trim());
    if (bookingDetails.TicketCount > currentCount) {
      for (let i = 0; i < bookingDetails.TicketCount - currentCount; i++) {
        await this.ticketIncrementer.click();
      }
    } else if (bookingDetails.TicketCount < currentCount) {
      for (let i = 0; i < currentCount - bookingDetails.TicketCount; i++) {
        await this.ticketDecrementer.click();
      }
    }

    await expect(this.confirmBookingBtn).toBeEnabled();
    await this.confirmBookingBtn.click();
    await expect(this.bookingConfirmationMessage).toBeVisible();
  }

  async getBookDetails() {
    const texts = [];
    const count = await this.bookingdetails.count();
    for (let i = 0; i < count; i++) {
      texts.push((await this.bookingdetails.nth(i).textContent()).trim());
    }
    return texts;
  }

  async getBookrefid() {
    return (await this.bookingRefValue.textContent()).trim();
  }

  async MyBookingEventClick() {
    await this.MyBookingTabLink.click();

  }


}
module.exports = { BookingPage };