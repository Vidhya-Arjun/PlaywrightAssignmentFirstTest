const { test, expect } = require('@playwright/test');
const { login } = require('../utils/Helper');
const { buildMockEvents, installMockEventRoutes } = require('../utils/MockHelper'); // assume you have these

test.describe('Mocked events catalog displays controlled data', () => {

  test('Test 1 — Catalog shows only mocked events', async ({ page }) => {
    // Step 1 — Sign in and open Events with mock data active
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    const eventPage = poManager.getEventPage();
    const bookingPage = poManager.getBookingPage();
    const mybookingPage = poManager.getMyBookingPage();


    await login(page, 'account@gmail.com', 'IamBest!2');

    const mockEvents = buildMockEvents([
      { id: 'conf-hyd', title: 'Hyderabad Tech Conference', category: 'Conference', city: 'Hyderabad', price: 500, seats: 100 },
      { id: 'fest-del', title: 'Delhi Cultural Festival', category: 'Festival', city: 'Delhi', price: 300, seats: 200 },
      { id: 'concert-mum', title: 'Mumbai Rock Concert', category: 'Concert', city: 'Mumbai', price: 800, seats: 50 },
      { id: 'workshop-blr', title: 'Bangalore Coding Workshop', category: 'Workshop', city: 'Bangalore', price: 200, seats: 30 }
    ]);

    await installMockEventRoutes(page, mockEvents);

    await page.goto('/events');
    await expect(page.getByRole('heading', { name: 'Upcoming Events' })).toBeVisible();

    // Step 2 — Verify page shows only mocked events
    const cards = page.locator('[data-testid="event-card"]');
    await expect(cards).toHaveCount(4);

    for (const event of mockEvents) {
      await expect(page.getByText(event.title)).toBeVisible();
    }
    await expect(page.getByText('World Tech Summit')).toHaveCount(0);

    for (const event of mockEvents) {
      const card = cards.filter({ hasText: event.title });
      await expect(card.getByText(`₹${event.price}`)).toBeVisible();
      await expect(card.getByText(`${event.seats} seats available`)).toBeVisible();
      await expect(card.getByRole('link', { name: 'Book Now' })).toHaveAttribute('href', `/events/${event.id}`);
    }

    // Step 3 — Filter mocked events
    await page.getByPlaceholder('Search events, venues...').fill('Hyderabad');
    await page.locator('select').nth(0).selectOption('Conference');
    await page.locator('select').nth(1).selectOption('Hyderabad');

    await expect(cards).toHaveCount(1);
    const matchedCard = cards.first();
    await expect(matchedCard.getByText('Hyderabad Tech Conference')).toBeVisible();
    await expect(matchedCard.getByText('₹500')).toBeVisible();
    await expect(matchedCard.getByText('100 seats available')).toBeVisible();

    // Store matched event for Test 2
    test.info().annotations.push({ type: 'matchedEvent', description: JSON.stringify(mockEvents[0]) });
  });

  test('Test 2 — Filtered mock event detail page matches catalog data', async ({ page }) => {
    const matchedEvent = JSON.parse(test.info().annotations.find(a => a.type === 'matchedEvent').description);

    // Step 1 — Open the filtered event
    await page.goto(`/events/${matchedEvent.id}`);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(matchedEvent.title);
    await expect(page.getByText(`₹${matchedEvent.price}`)).toBeVisible();
    await expect(page.getByText(matchedEvent.city)).toBeVisible();
    await expect(page.getByText(`${matchedEvent.seats} seats available`)).toBeVisible();

    // Step 2 — Verify ticket quantity updates
    const qtyInput = page.locator('[data-testid="ticket-quantity"]');
    const total = page.locator('[data-testid="total-amount"]');

    await expect(qtyInput).toHaveValue('1');
    await expect(total).toHaveText(`₹${matchedEvent.price}`);

    await page.getByRole('button', { name: '+' }).click();
    await expect(qtyInput).toHaveValue('2');
    await expect(total).toHaveText(`₹${matchedEvent.price * 2}`);
  });
});