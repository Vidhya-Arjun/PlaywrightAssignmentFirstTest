// @ts-check


const config = {
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 4000, 
  },

  use: {
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot : 'only-on-failure',
    trace : 'on'

  },
};

module.exports = config;