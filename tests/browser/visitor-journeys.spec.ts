import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('browse every menu category and follow working local destinations', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page
    .getByRole('link', { name: 'Explore the menu', exact: true })
    .click();
  await expect(page).toHaveURL(/#menu$/);
  const categories = page
    .getByRole('group', { name: 'Browse menu categories' })
    .getByRole('button');
  for (const category of await categories.all()) {
    await category.focus();
    await page.keyboard.press('Enter');
    await expect(category).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#menu-category-title')).toHaveText(
      await category.innerText(),
    );
    expect(
      await page.locator('#menu-category-content article').count(),
    ).toBeGreaterThan(0);
  }
  const pdfLink = page.getByRole('link', { name: 'View the original menu' });
  const pdf = await request.get((await pdfLink.getAttribute('href'))!);
  expect(pdf.ok()).toBeTruthy();
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  const destinations = await page
    .locator('.branch-directions')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).href),
    );
  expect(destinations).toHaveLength(2);
  expect(
    destinations.every((url) => url.startsWith('https://www.google.com/maps/')),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});

test('mobile navigation supports keyboard, Escape, and branch journey', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  const toggle = page.locator('.nav-toggle');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Find a branch' })
    .click();
  await expect(page).toHaveURL(/#branches$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(
    page.getByRole('heading', { name: 'Your table is waiting.' }),
  ).toBeVisible();
});

test('the menu ends with a hand-off to the branches', async ({ page }) => {
  await page.goto('/#menu');
  const note = page.locator('.menu-bottom-note');
  await note.scrollIntoViewIfNeeded();
  await note.getByRole('link', { name: 'Find a branch' }).click();
  await expect(page).toHaveURL(/#branches$/);
  await expect(
    page.getByRole('heading', { name: 'Your table is waiting.' }),
  ).toBeInViewport();
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Your table is waiting.' }),
  ).toBeInViewport();
  await page.goto('/#sambal');
  await expect(
    page.getByRole('heading', { name: 'Say it with sambal.' }),
  ).toBeInViewport();
});

test('the homepage uses no decorative asterisk glyphs', async ({ page }) => {
  // U+2733 renders as a green emoji square on macOS, which looked like an
  // inert button in the hero.
  await page.goto('/');
  expect(await page.locator('body').innerText()).not.toContain('✳');
});

test('the meal journey connects sambal, menu, and branches with current navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Explore the Sarang table' })
    .getByRole('link', { name: /Meet your sambal/ })
    .click();
  await expect(page).toHaveURL(/#sambal$/);
  await expect(
    page.getByRole('heading', { name: 'Say it with sambal.' }),
  ).toBeInViewport();
  const mainNav = page.getByRole('navigation', { name: 'Main navigation' });
  await page.locator('.nav-toggle').click();
  await expect(
    mainNav.getByRole('link', { name: 'Kremes & sambal' }),
  ).toHaveAttribute('aria-current', 'location');
  await page.keyboard.press('Escape');
  await page
    .getByRole('link', { name: 'Browse all dishes', exact: true })
    .click();
  await expect(page).toHaveURL(/#menu$/);
  await expect(
    page.getByRole('heading', { name: 'Choose your next plate.' }),
  ).toBeInViewport();
  await page
    .locator('.menu-bottom-note')
    .getByRole('link', { name: 'Find a branch' })
    .click();
  await expect(page).toHaveURL(/#branches$/);
  await expect(
    page.getByRole('heading', { name: 'Your table is waiting.' }),
  ).toBeInViewport();
});

test('featured dishes open the right category and sticky category changes reset the list position', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page
    .getByRole('link', { name: 'Explore Ayam Bakar Madu on our menu' })
    .click();
  await expect(page.locator('#menu-category-title')).toHaveText('Bakar');
  await expect(
    page
      .locator('#menu-category-content')
      .getByRole('heading', { name: 'Ayam Bakar Madu' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Kremes', exact: true }).click();
  await page.evaluate(() =>
    window.scrollBy({ top: 1200, behavior: 'instant' }),
  );
  await page.getByRole('button', { name: 'Add On', exact: true }).click();
  await expect(page.locator('#menu-category-title')).toHaveText('Add On');
  const headingTop = await page
    .locator('#menu-category-title')
    .evaluate((element) => element.getBoundingClientRect().top);
  expect(headingTop).toBeGreaterThan(140);
  expect(headingTop).toBeLessThan(240);
  await expect(
    page.getByRole('heading', { name: 'Nasi Putih', exact: true }),
  ).toBeInViewport();
});

for (const width of [390, 768, 1440]) {
  test(`layout, loaded photography, and accessibility at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator('main img:visible').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('complete', true);
      expect(
        await image.evaluate(
          (element) => (element as HTMLImageElement).naturalWidth,
        ),
      ).toBeGreaterThan(0);
    }
    const dimensions = await page.evaluate(() => ({
      body: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: testInfo.outputPath(`home-${width}.png`),
      fullPage: true,
      animations: 'disabled',
    });
    const accessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      accessibility.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  });
}
