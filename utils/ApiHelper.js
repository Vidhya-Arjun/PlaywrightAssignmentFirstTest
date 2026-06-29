const { POManager } = require("../pageobjects/POManager")
const { expect,test } = require('@playwright/test');

async function createAuthorizedApiContext(playwright, email, password) {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post('/api/login', {
    data: { email, password }
  });
  const loginJson = await loginResponse.json();
  const token = loginJson.token;
  return { apiContext, token };
}

async function selectBookableEvent(apiContext, minimumSeats) {
  const response = await apiContext.get('/api/events');
  const events = await response.json();
  const selected = events.find(e => e.availableSeats >= minimumSeats);
  if (!selected) throw new Error('No event with enough seats');
  return selected;
}

async function createBooking(apiContext, payload) {
  const response = await apiContext.post('/api/bookings', { data: payload });
  return await response.json();
}

async function lookupBookingByRef(apiContext, bookingRef) {
  const response = await apiContext.get(`/api/bookings/ref/${bookingRef}`);
  return await response.json();
}

async function injectTokenBeforeNavigation(page, token) {
  await page.addInitScript(token => {
    window.localStorage.setItem('eventhub_token', token);
  }, token);
}

module.exports = { injectTokenBeforeNavigation, lookupBookingByRef,createBooking,selectBookableEvent};