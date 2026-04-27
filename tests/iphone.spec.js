const { test, expect } = require('@playwright/test');
const { searchAndAddToCart } = require('./utils');

test.skip(process.env.CI, 'Skipping in CI');

test('TC01 - Search iPhone and add to cart @smoke', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const price = await searchAndAddToCart(page, 'iPhone');
    expect(price).not.toBeNull();

    await context.close();
});