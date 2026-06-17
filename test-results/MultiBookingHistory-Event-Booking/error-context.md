# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: MultiBookingHistory.spec.js >> Event Booking
- Location: tests\MultiBookingHistory.spec.js:5:1

# Error details

```
Error: expect(received).not.toEqual(expected) // deep equality

Expected: not "Dilli Diwali Mela"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e4]:
      - link "EventHub" [ref=e5] [cursor=pointer]:
        - /url: /
        - img [ref=e7]
        - generic [ref=e9]: EventHub
      - generic [ref=e10]:
        - link "Home" [ref=e11] [cursor=pointer]:
          - /url: /
        - link "Events" [ref=e12] [cursor=pointer]:
          - /url: /events
        - link "My Bookings" [ref=e13] [cursor=pointer]:
          - /url: /bookings
        - link "API Docs" [ref=e14] [cursor=pointer]:
          - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
        - button "Admin" [ref=e16] [cursor=pointer]:
          - text: Admin
          - img [ref=e17]
        - generic [ref=e19]:
          - generic "saucetest@gmail.com" [ref=e20]
          - button "Logout" [ref=e21] [cursor=pointer]
  - main [ref=e22]:
    - generic [ref=e23]:
      - navigation [ref=e24]:
        - link "Events" [ref=e25] [cursor=pointer]:
          - /url: /events
        - generic [ref=e26]: /
        - generic [ref=e27]: World Tech Summit
      - generic [ref=e28]:
        - generic [ref=e29]:
          - img "World Tech Summit" [ref=e31]
          - generic [ref=e32]:
            - generic [ref=e33]:
              - generic [ref=e34]: Conference
              - generic [ref=e35]: Featured
            - heading "World Tech Summit" [level=1] [ref=e36]
            - generic [ref=e37]:
              - img [ref=e38]
              - text: This is a featured event — always available for practice
            - generic [ref=e40]:
              - generic [ref=e41]:
                - generic [ref=e42]: 📅
                - generic [ref=e43]:
                  - paragraph [ref=e44]: Date
                  - paragraph [ref=e45]: Saturday, 18 April
              - generic [ref=e46]:
                - generic [ref=e47]: 🕐
                - generic [ref=e48]:
                  - paragraph [ref=e49]: Time
                  - paragraph [ref=e50]: 02:30 pm
              - generic [ref=e51]:
                - generic [ref=e52]: 📍
                - generic [ref=e53]:
                  - paragraph [ref=e54]: Venue
                  - paragraph [ref=e55]: Hyderabad, Hitech city
              - generic [ref=e56]:
                - generic [ref=e57]: 🌆
                - generic [ref=e58]:
                  - paragraph [ref=e59]: City
                  - paragraph [ref=e60]: Hyderabad
              - generic [ref=e61]:
                - generic [ref=e62]: 🎫
                - generic [ref=e63]:
                  - paragraph [ref=e64]: Available
                  - paragraph [ref=e65]: 499 / 500 seats
              - generic [ref=e66]:
                - generic [ref=e67]: 💰
                - generic [ref=e68]:
                  - paragraph [ref=e69]: Price per ticket
                  - paragraph [ref=e70]: $1,500
            - generic [ref=e71]:
              - heading "About this event" [level=2] [ref=e72]
              - paragraph [ref=e73]: A premier technology conference bringing together 500+ industry leaders, startup founders, and engineers for two days of keynotes, workshops, and networking. Topics include AI/ML, cloud infrastructure, DevSecOps, and the future of the Indian tech ecosystem.
        - generic [ref=e75]:
          - generic [ref=e76]:
            - heading "Book Tickets" [level=2] [ref=e77]
            - generic [ref=e78]: $1,500
          - paragraph [ref=e79]: per ticket
          - generic [ref=e80]:
            - img [ref=e82]
            - heading "Booking Confirmed! 🎉" [level=3] [ref=e84]
            - paragraph [ref=e85]: Your tickets are reserved.
            - generic [ref=e86]:
              - generic [ref=e87]:
                - generic [ref=e88]: Booking Ref
                - generic [ref=e89]: W-G1LAH5
              - generic [ref=e90]:
                - generic [ref=e91]: Customer
                - generic [ref=e92]: Vidhya
              - generic [ref=e93]:
                - generic [ref=e94]: Tickets
                - generic [ref=e95]: "1"
              - generic [ref=e96]:
                - generic [ref=e97]: Total
                - generic [ref=e98]: $1,500
            - generic [ref=e99]:
              - link "View My Bookings" [ref=e100] [cursor=pointer]:
                - /url: /bookings
                - button "View My Bookings" [ref=e101]
              - link "Browse More Events" [ref=e102] [cursor=pointer]:
                - /url: /events
                - button "Browse More Events" [ref=e103]
  - contentinfo [ref=e104]:
    - generic [ref=e105]:
      - generic [ref=e106]:
        - generic [ref=e107]:
          - heading "Rahul Shetty Academy" [level=3] [ref=e108]
          - paragraph [ref=e109]: India's leading QA automation training academy — empowering engineers to build real-world testing skills.
        - generic [ref=e110]:
          - heading "Popular Courses" [level=3] [ref=e111]
          - list [ref=e112]:
            - listitem [ref=e113]:
              - link "Selenium WebDriver with Java" [ref=e114] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e115]:
              - link "Playwright with JavaScript" [ref=e116] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e117]:
              - link "RestAssured API Testing" [ref=e118] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e119]:
              - link "Cypress End-to-End Testing" [ref=e120] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e121]:
              - link "Appium Mobile Testing" [ref=e122] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
        - generic [ref=e123]:
          - heading "QA Job Hiring Platform" [level=3] [ref=e124]
          - paragraph [ref=e125]: Get hired faster — take skill assessments trusted by top QA employers worldwide.
          - link "techsmarthire.com →" [ref=e126] [cursor=pointer]:
            - /url: https://techsmarthire.com
        - generic [ref=e127]:
          - heading "EventHub Practice App" [level=3] [ref=e128]
          - list [ref=e129]:
            - listitem [ref=e130]:
              - link "Browse Events" [ref=e131] [cursor=pointer]:
                - /url: /events
            - listitem [ref=e132]:
              - link "My Bookings" [ref=e133] [cursor=pointer]:
                - /url: /bookings
            - listitem [ref=e134]:
              - link "Manage Events" [ref=e135] [cursor=pointer]:
                - /url: /admin/events
            - listitem [ref=e136]:
              - link "API Documentation" [ref=e137] [cursor=pointer]:
                - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
      - generic [ref=e138]:
        - paragraph [ref=e139]: © 2026 Rahul Shetty Academy. All rights reserved.
        - generic [ref=e140]:
          - link "rahulshettyacademy.com →" [ref=e141] [cursor=pointer]:
            - /url: https://rahulshettyacademy.com
          - link "techsmarthire.com →" [ref=e142] [cursor=pointer]:
            - /url: https://techsmarthire.com
  - alert [ref=e143]
```

# Test source

```ts
  1  | const{test,expect} =require('@playwright/test')
  2  | const{POManager} = require("../pageobjects/POManager")
  3  | const { login, createBookingFromFilters } = require("../utils/Helper");
  4  | 
  5  | test("Event Booking", async ({ page }) => {
  6  |   const poManager = new POManager(page);
  7  |   const dashboardPage = poManager.getDashboardPage();
  8  |   const eventPage = poManager.getEventPage();
  9  |   const bookingPage = poManager.getBookingPage();
  10 | 
  11 |   await login(page, "saucetest@gmail.com", "IamBest!2"); 
  12 |   await dashboardPage.clickOnBookEvent();
  13 |   await eventPage.assertEventPageVisible();
  14 | 
  15 | 
  16 | 
  17 |  const bookingOne = await createBookingFromFilters(page, {
  18 |     searchTerm: "Dilli",
  19 |     categoryValue: "Festival",
  20 |     cityName: "Delhi", // Hyderabad
  21 |     UserName: "Vidhya",
  22 |     UserEmail: "ajayvijay@gmail.com",
  23 |     UserPhone: "9866433222",
  24 |     TicketCount: 2
  25 |   });
  26 | 
  27 |   expect(bookingOne.bookingRef.length).toBeGreaterThan(0);
  28 |   expect(bookingOne.ticketCount).toEqual(2);
  29 | 
  30 | 
  31 |   // Step 3 — Navigate back to catalog
  32 |   await page.getByRole('button', { name: 'Browse More Events' }).click();
  33 |   await expect(page).toHaveURL(/events/);
  34 | 
  35 | 
  36 |     // Step 4 — Second booking
  37 |   const bookingTwo = await createBookingFromFilters(page, {
  38 |     searchTerm: "World",
  39 |     categoryValue: "Conference",
  40 |     cityName: "Hyderabad", // Hyderabad
  41 |     UserName: "Vidhya",
  42 |     UserEmail: "ajayvijay@gmail.com",
  43 |     UserPhone: "9866433222",
  44 |     TicketCount: 1
  45 |   });
  46 | 
  47 |   expect(bookingTwo.bookingRef).not.toEqual(bookingOne.bookingRef);
> 48 |   expect(bookingTwo.eventTitle).not.toEqual(bookingOne.eventTitle);
     |                                     ^ Error: expect(received).not.toEqual(expected) // deep equality
  49 |   expect(bookingTwo.ticketCount).toEqual(1);
  50 | 
  51 |   // Step 5 — Store both bookings
  52 |   const bookings = [bookingOne, bookingTwo];
  53 |   console.log("Bookings:", bookings);
  54 | });
```