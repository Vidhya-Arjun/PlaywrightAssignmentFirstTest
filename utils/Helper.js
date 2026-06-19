const { POManager } = require("../pageobjects/POManager")
const { expect,test } = require('@playwright/test');

// login helper
async function login(page, email, password) {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.openURL();
  await loginPage.validateUserLogin(email, password);
}

// booking helper
async function createBookingFromFilters(page, { searchTerm, categoryValue, cityName, UserName, UserEmail, UserPhone, TicketCount })
 {
  const poManager = new POManager(page);
  const eventPage = poManager.getEventPage();
  const bookingPage = poManager.getBookingPage();

  // Search/filter events
  await eventPage.searchAndFilterEvents({ searchTerm, categoryValue, cityName });
  const eventTitle = await eventPage.cards.first().locator('h3').textContent();
  await eventPage.assertEventPageLocatorVisible();
  
  await eventPage.bookEventButtonClick();

  // Fill booking details
  await bookingPage.setBookingDetails({ UserName, UserEmail, UserPhone, TicketCount });

  // Collect results
  const bookingRef = await bookingPage.getBookrefid();
  const bookingDetails = await bookingPage.getBookDetails();

  return {
    eventTitle: eventTitle.trim(),
    bookingRef,
    ticketCount: Number(bookingDetails[6])
  };
}

function getBookingDivByRef(page, refValue) {
  return page.locator('div').filter({ has: page.locator('span', { hasText: refValue }) });
}

async function findBookingCardByRef(page, refValue) {
  const bookingDiv = getBookingDivByRef(page, refValue);
  await expect(bookingDiv).toBeVisible();

}


module.exports = { login, createBookingFromFilters, findBookingCardByRef};
