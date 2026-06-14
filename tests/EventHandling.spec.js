const{test,expect} =require('@playwright/test')
const{POManager} = require("../pageobjects/POManager")

test("@validate Login",async({page})=>
{
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.openURL();
  await loginPage.validateUserLogin("aruviva@gmail.com","Vijay@0806");
  const dashboard_identifier = await page.getByText("EventHub",{exact: true});
  await expect(dashboard_identifier).toBeVisible();
  await page.getByText('Browse Events').first().click();
  await expect(page).toHaveURL('/events');
  const event_page_identifier = await page.getByRole('heading',{level:1,text:"Upcoming Events"});
  await expect(event_page_identifier).toBeVisible();


}
)

test.only("@scenario 2",async({page})=>
{
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.openURL();
  await loginPage.validateUserLogin("aruviva@gmail.com","Vijay@0806");
  const dashboard_identifier = page.getByText("EventHub",{exact: true});
  await expect(dashboard_identifier).toBeVisible();
  await page.getByText('Browse Events').first().click();
  await expect(page).toHaveURL('/events');
  const search_event_identifier =  page.getByPlaceholder("Search events, venues…");
  await search_event_identifier.fill("world");
  const first_dropdown = page.locator("select").nth(0);
  await first_dropdown.selectOption("Conference");
  await expect(first_dropdown).toHaveValue("Conference");
  const second_dropdown = page.locator("select").nth(1);
  await second_dropdown.selectOption({ index: 4 }); // selects the 4th option (Hyderabad)
  await expect(second_dropdown).toHaveValue("Hyderabad");
  const cards = page.locator('[data-testid="event-card"]').first();
  await expect(cards).toHaveCount(1);
  const event_title = "World Tech Summit" ;
  const title_of_conference = await cards.locator("h3",{hasText:event_title}); 
  await expect(title_of_conference).toBeVisible();
  await expect(title_of_conference).toHaveText(event_title);
  await expect(cards).toBeVisible();
  await expect(cards).toHaveCount(1);
  const seatsText = await page.locator('span.text-emerald-600').textContent();
  const numofseat = seatsText.match(/\d+/)[0];
  await expect(Number(numofseat)).toBeGreaterThan(0);
  const price_locator = await page.locator('p.text-lg');
  const priceText = await price_locator.textContent();
  await expect(price_locator).toBeVisible();
  await expect(priceText).toContain("$");  
  await page.locator("#book-now-btn").click();
  const button_check = page.locator("#confirm-booking");
  await expect(button_check).toBeVisible();
  await expect(page).toHaveURL(/events/);
  const h1_title = await page.locator("h1").nth(0).textContent();
  console.log(h1_title)
  await expect(h1_title).toEqual(event_title);
  const validate_price_text = page.locator('p',{hasText:'$1,500'});
  await expect(validate_price_text).toBeVisible();
  await page.goBack();
  await search_event_identifier.clear();
  await page.getByRole('button',{name:'Clear filters'}).click();
  const new_card = page.locator("[data-testid='event-card']");
  await expect(new_card).toHaveCount(3);

  // Read heading text from first card
  const firstTitle = await new_card.first().locator('h3').textContent();

  // Read heading text from last card
  const lastTitle = await new_card.last().locator('h3').textContent();

  // Read heading text from second card using nth(1)
  const secondTitle = await new_card.nth(1).locator('h3').textContent();

  // Assert all extracted titles are non-empty strings
  expect(firstTitle?.trim().length).toBeGreaterThan(0);
  expect(lastTitle?.trim().length).toBeGreaterThan(0);
  expect(secondTitle?.trim().length).toBeGreaterThan(0);

  // Assert the first and last titles are not equal
  expect(firstTitle).not.toEqual(lastTitle);


}
)