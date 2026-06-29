const{test,expect} =require('@playwright/test')
const{POManager} = require("../pageobjects/POManager")
const { login, findBookingCardByRef,patchBookingDetail,patchBookingsList} = require("../utils/Helper");


test('Patched booking appears correctly on My Bookings', async ({ page }) => {

 const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const eventPage = poManager.getEventPage();
  const bookingPage = poManager.getBookingPage();

  await login(page, "academy@gmail.com", "IamBest!2"); 
  await dashboardPage.clickOnBookEvent();
  await eventPage.assertEventPageVisible();  


  const getPatchedState = await patchBookingsList(page);

  await page.click("a[routerlink*='mybookings']");
  await expect(page.getByRole('heading', { name: 'My Bookings' })).toBeVisible();

  const patchedBooking = getPatchedState();
  const card = await findBookingCardByRef(page, patchedBooking.reference);

  await expect(card).toBeVisible();
  await expect(card.locator('h2')).toHaveText(patchedBooking.eventTitle);
  await expect(card.locator('.tickets')).toHaveText('${patchedBooking.ticketCount} tickets');
  await expect(card.locator('.amount')).toHaveText('$${patchedBooking.totalAmount}');

  // prove other cards are unchanged
  const otherCard = await findBookingCardByRef(page, 'some-live-ref');
  expect(otherCard).not.toBeNull();

  await card.getByRole('button', { name: 'View Details' }).click();
  await expect(page).toHaveURL(new RegExp('/bookings/${patchedBooking.id}'));
});

test('Patched detail page matches the list card', async ({ page }) => {
 
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const eventPage = poManager.getEventPage();
  const bookingPage = poManager.getBookingPage();

  await login(page, "academy@gmail.com", "IamBest!2"); 

  const getPatchedState = await patchBookingsList(page);
  const patchedBooking = getPatchedState();

  await page.click("a[routerlink*='mybookings']");
  const card = await findBookingCardByRef(page, patchedBooking.reference);
  await card.getByRole('button', { name: 'View Details' }).click();

  await patchBookingDetail(page, getPatchedState);

  //validation on ticket details
  await expect(page.locator('.breadcrumb')).toContainText(patchedBooking.reference);
  await expect(page.locator('h1')).toHaveText(patchedBooking.eventTitle);
  await expect(page.locator('.payment-summary .tickets')).toHaveText('${patchedBooking.ticketCount}');
  await expect(page.locator('.payment-summary .total')).toHaveText('$${patchedBooking.totalAmount}');
  await expect(page.locator('.customer-email')).not.toHaveText('');

  //validation on card details
  await page.click("a[routerlink*='bookings']");
  const cardAgain = await findBookingCardByRef(page, patchedBooking.reference);
  await expect(cardAgain.locator('.amount')).toHaveText('$${patchedBooking.totalAmount}');
});