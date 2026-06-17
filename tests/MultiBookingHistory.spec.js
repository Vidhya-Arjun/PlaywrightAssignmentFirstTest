const{test,expect} =require('@playwright/test')
const{POManager} = require("../pageobjects/POManager")
const { login, createBookingFromFilters } = require("../utils/Helper");

test("Event Booking", async ({ page }) => {
  const poManager = new POManager(page);
  const dashboardPage = poManager.getDashboardPage();
  const eventPage = poManager.getEventPage();
  const bookingPage = poManager.getBookingPage();

  await login(page, "saucetest@gmail.com", "IamBest!2"); 
  await dashboardPage.clickOnBookEvent();
  await eventPage.assertEventPageVisible();



 const bookingOne = await createBookingFromFilters(page, {
    searchTerm: "Dilli",
    categoryValue: "Festival",
    cityName: "Delhi", // Hyderabad
    UserName: "Vidhya",
    UserEmail: "ajayvijay@gmail.com",
    UserPhone: "9866433222",
    TicketCount: 2
  });

  expect(bookingOne.bookingRef.length).toBeGreaterThan(0);
  expect(bookingOne.ticketCount).toEqual(2);


  // Step 3 — Navigate back to catalog
  await page.getByRole('button', { name: 'Browse More Events' }).click();
  await expect(page).toHaveURL(/events/);


    // Step 4 — Second booking
  const bookingTwo = await createBookingFromFilters(page, {
    searchTerm: "World",
    categoryValue: "Conference",
    cityName: "Hyderabad", // Hyderabad
    UserName: "Vidhya",
    UserEmail: "ajayvijay@gmail.com",
    UserPhone: "9866433222",
    TicketCount: 1
  });

  expect(bookingTwo.bookingRef).not.toEqual(bookingOne.bookingRef);
  expect(bookingTwo.eventTitle).not.toEqual(bookingOne.eventTitle);
  expect(bookingTwo.ticketCount).toEqual(1);

  // Step 5 — Store both bookings
  const bookings = [bookingOne, bookingTwo];
  console.log("Bookings:", bookings);
});