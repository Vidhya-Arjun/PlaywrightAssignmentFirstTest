// @ts-check


const config = {
  testDir: './tests', //folder where test scripts are available
  timeout: 40 * 1000, // setting maximum timeout globally
  expect: {
    timeout: 4000, 
  },
  use: {
    browserName: 'chromium',
    headless: false,
    baseURL: 'https://eventhub.rahulshettyacademy.com',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot : 'only-on-failure',
    trace : 'on'

  },
//   retries : 0, // retry failed test twice
//   projects:[
//     {
//   name:     'chromium',
//   use: {
//     browserName: 'chromium',
//     headless: false,
//     baseURL: 'https://eventhub.rahulshettyacademy.com',
//     viewport: { width: 1280, height: 720 },
//     ignoreHTTPSErrors: true,
//     video: 'off',
//     screenshot : 'only-on-failure',
//     trace : 'on'

//   },
// },
// {
//   name: 'firefox',
//   use: {
//     browserName: 'firefox',
//     headless: false,
//     baseURL: 'https://eventhub.rahulshettyacademy.com',
//     viewport: { width: 1280, height: 720 },
//     ignoreHTTPSErrors: true,
//     video: 'off',
//     screenshot : 'only-on-failure',
//     trace : 'on'

//   },
// }
// ]
};

module.exports = config;