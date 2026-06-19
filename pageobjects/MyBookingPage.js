const {test, expect} = require('@playwright/test');
class MyBookingPage {
  constructor(page) {
    this.page = page;
    this.page_identifierLocator = page.getByRole('heading',{level:1,name:'My Bookings'});
  }

async myBookingPageAssertion(){
    await expect(this.page_identifierLocator).toBeVisible();
}  

async validateBookingRefsVisible(bookings) {
  for (const booking of bookings) {
    const refLocator = this.page.locator('span', { hasText: booking.bookingRef });
    await expect(refLocator).toBeVisible();
  }
}

}
module.exports = { MyBookingPage };
