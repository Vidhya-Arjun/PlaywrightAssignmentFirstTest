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



async function patchBookingsList(page, mutateBooking) {
  let patchedBooking = null;

  await page.route('**/api/bookings?page=1&limit=10', async route => {
    const response = await route.fetch();
    const json = await response.json();

    // pick first booking
    const booking = json[0];
    patchedBooking = { ...booking };

    // mutate fields
    patchedBooking.reference = 'REF-TEST-123';
    patchedBooking.eventTitle = 'Patched Event Title';
    patchedBooking.ticketCount = 3;
    patchedBooking.totalAmount = 1111;

    // replace only that record
    const patchedList = json.map((b, idx) => (idx === 0 ? patchedBooking : b));

    await route.fulfill({ response, body: JSON.stringify(patchedList) });
  });

  return () => patchedBooking;
}

async function patchBookingDetail(page, getPatchedState) {
  const patchedBooking = getPatchedState();

  await page.route(`**/api/bookings/${patchedBooking.id}`, async route => {
    const response = await route.fetch();
    const json = await response.json();

    const patchedDetail = {
      reference: patchedBooking.reference,
      eventTitle: patchedBooking.eventTitle,
      ticketCount: patchedBooking.ticketCount,
      totalAmount: patchedBooking.totalAmount,
      // keep one real field unchanged
      customerEmail: json.customerEmail,
    };

    await route.fulfill({ response, body: JSON.stringify(patchedDetail) });
  });
}

async function findBookingCardByRef(page, bookingRef) {
  const cards = page.locator('.booking-card');
  const count = await cards.count();
  for (let i = 0; i < count; i++) {
    const refText = await cards.nth(i).locator('.reference').textContent();
    if (refText.trim() === bookingRef) {
      return cards.nth(i);
    }
  }
  return null;
}

function parseCurrency(text) {
  return Number(text.replace(/[^0-9.-]+/g, ''));
}


module.exports = { login, createBookingFromFilters, findBookingCardByRef,patchBookingDetail,patchBookingsList};

