const { expect,test } = require('@playwright/test');

function buildMockEvents(eventsData) {
  // eventsData is an array of objects with id, title, category, city, price, seats
  return eventsData.map(e => ({
    id: e.id,
    title: e.title,
    category: e.category,
    city: e.city,
    price: e.price,
    seats: e.seats
  }));
}
async function installMockEventRoutes(page, mockEvents) {
  // Intercept the catalog endpoint
  await page.route('**/api/events', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockEvents)
    });
  });

  // Intercept individual event detail endpoint
  await page.route('**/api/events/*', route => {
    const url = route.request().url();
    const id = url.split('/').pop();
    const event = mockEvents.find(e => e.id === id);

    if (event) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(event)
      });
    } else {
      route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Event not found' })
      });
    }
  });
}

module.exports = { buildMockEvents ,installMockEventRoutes};