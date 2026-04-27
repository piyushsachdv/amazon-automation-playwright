const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  timeout: 120000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 }
  },
   launchOptions: {
    slowMo: 500
  },
  reporter: 'html',
});