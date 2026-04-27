async function searchAndAddToCart(page, searchTerm) {
    page.setDefaultTimeout(60000);

    await page.goto('https://www.amazon.in', { waitUntil: 'load' });

    const searchBox = page.locator('#twotabsearchtextbox');
    await searchBox.waitFor({ state: 'visible' });

    await searchBox.fill(searchTerm);
    await searchBox.press('Enter');

    await page.waitForSelector('[data-component-type="s-search-result"]');

    const products = page.locator('[data-component-type="s-search-result"]');
    const count = await products.count();
    await page.mouse.wheel(0, 1000);
for (let i = 0; i < count; i++) {
    const product = products.nth(i);

    const priceLocator = product.locator('.a-price .a-offscreen').first();
    const price = await priceLocator.innerText().catch(() => null);
    if (!price) continue;

    // 🔹 Try search page add-to-cart
    const addBtnSearch = product.locator('input[name="submit.add-to-cart"], button:has-text("Add to Cart")').first();

    if (await addBtnSearch.isVisible().catch(() => false)) {
        try {
            await addBtnSearch.scrollIntoViewIfNeeded();
            await addBtnSearch.click({ timeout: 3000 });

            await page.waitForSelector('#nav-cart-count', { timeout: 5000 });

            console.log(`🛒 Added from search page`);
            console.log(`✅ ${searchTerm} → Price: ${price}`);
            return price;
        } catch {}
    }

    // 🔹 Fallback → open product page
    const productLink = product.locator('a[href*="/dp/"]').first();

    try {
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            productLink.click()
        ]);

        await newPage.waitForLoadState();

        const addBtn = newPage.locator('#add-to-cart-button');

        if (await addBtn.isVisible().catch(() => false)) {
            await addBtn.click();

            console.log(`🛒 Added from product page`);
            console.log(`✅ ${searchTerm} → Price: ${price}`);

            await newPage.close();
            return price;
        }

        await newPage.close();
    } catch {}
}
return null;
}


module.exports = { searchAndAddToCart };