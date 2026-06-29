const{test,expect} =require('@playwright/test')
const{POManager} = require("../pageobjects/POManager")
const { login, findBookingCardByRef,patchBookingDetail,patchBookingsList} = require("../utils/Helper");
const { injectTokenBeforeNavigation, lookupBookingByRef,createBooking,selectBookableEvent} = require("../utils/ApiHelper");


test('API-created booking appears on My Bookings', async ({ playwright, page }) => {
  const { apiContext, token } = await createAuthorizedApiContext(playwright, 'testuser@example.com', 'Password123');

  const event = await selectBookableEvent(apiContext, 2);

  const payload = {
    eventId: event.id,
    quantity: 2,
    customerName: 'Test User',
    customerEmail: 'testuser@example.com',
    customerPhone: '1234567890'
  };

  const booking = await createBooking(apiContext, payload);
  expect(booking.id).toBeTruthy();
  expect(booking.reference).toBeTruthy();

  const lookup = await lookupBookingByRef(apiContext, booking.reference);
  expect(lookup.id).toEqual(booking.id);
  expect(lookup.reference).toEqual(booking.reference);
  expect(lookup.ticketCount).toEqual(payload.quantity);
  expect(lookup.totalAmount).toEqual(event.price * payload.quantity);

  await injectTokenBeforeNavigation(page, token);
  await page.goto('/bookings');
  await expect(page.getByRole('heading', { name: 'My Bookings' })).toBeVisible();

  const card = await findBookingCardByRef(page, booking.reference);
  await expect(card.locator('h2')).toHaveText(event.title);
  await expect(card.locator('.tickets')).toHaveText('2 tickets');
  await expect(parseCurrency(await card.locator('.amount').textContent())).toEqual(event.price * 2);

  await apiContext.dispose();
});

test('Detail page matches API booking, then API cleanup removes it', async ({ playwright, page }) => {
  const { apiContext, token } = await createAuthorizedApiContext(playwright, 'testuser@example.com', 'Password123');
  const event = await selectBookableEvent(apiContext, 2);

  const payload = {
    eventId: event.id,
    quantity: 2,
    customerName: 'Test User',
    customerEmail: 'testuser@example.com',
    customerPhone: '1234567890'
  };

  const booking = await createBooking(apiContext, payload);

  await injectTokenBeforeNavigation(page, token);
  await page.goto('/bookings');
  const card = await findBookingCardByRef(page, booking.reference);
  await card.getByRole('button', { name: 'View Details' }).click();

  await expect(page).toHaveURL(new RegExp('/bookings/${booking.id}'));
  await expect(page.locator('.breadcrumb')).toContainText(booking.reference);
  await expect(page.locator('h1')).toHaveText(event.title);
  await expect(page.locator('.payment-summary .tickets')).toHaveText('2');
  await expect(page.locator('.payment-summary .total')).toHaveText(`$${event.price * 2}`);
  await expect(page.locator('.customer-email')).toHaveText(payload.customerEmail);

  // Cleanup
  const deleteResponse = await apiContext.delete('/api/bookings/${booking.id}');
  await expect(deleteResponse.ok()).toBeTruthy();

  const lookup = await lookupBookingByRef(apiContext, booking.reference);
  await expect(lookup.error || lookup.status).toBeDefined();

  await page.goto('/bookings');
  const cardAfterDelete = await findBookingCardByRef(page, booking.reference);
  await expect(cardAfterDelete).toBeNull();

  await apiContext.dispose();
});
