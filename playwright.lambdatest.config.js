const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  fullyParallel: true,
  workers: 2,

  use: {
    connectOptions: {
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
        browserName: 'pw-chromium',
        browserVersion: 'latest',
        'LT:Options': {
          platform: 'Windows 10',
          build: 'Amazon Automation Build',
          name: 'Parallel Amazon Tests',
          user: process.env.LT_USERNAME,
          accessKey: process.env.LT_ACCESS_KEY
        }
      }))}`
    }
  },
});