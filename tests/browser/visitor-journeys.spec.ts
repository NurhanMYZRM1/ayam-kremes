import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import type { RestaurantContent } from '../../src/types';

const content = JSON.parse(
  readFileSync(
    new URL('../../src/content/restaurant.json', import.meta.url),
    'utf8',
  ),
) as RestaurantContent;

test('browse all seven categories and all 39 source dishes on the dedicated menu', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page
    .getByRole('link', { name: 'Explore the menu', exact: true })
    .click();
  await expect(page).toHaveURL(/\/menu\/$/);
  await expect(page.locator('#menu-category-title')).toHaveText('Kremes');
  await expect(
    page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Our menu', exact: true }),
  ).toHaveAttribute('aria-current', 'page');

  const categories = page.getByRole('group', {
    name: 'Browse menu categories',
  });
  await expect(categories.getByRole('button')).toHaveCount(7);
  const historyLength = await page.evaluate(() => history.length);
  const observedIds: string[] = [];

  for (const category of content.categories) {
    const button = categories.getByRole('button', {
      name: category.name,
      exact: true,
    });
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#menu-category-title')).toHaveText(
      category.name,
    );
    expect(await page.evaluate(() => history.length)).toBe(historyLength);
    if (category.id !== 'kremes') {
      expect(new URL(page.url()).searchParams.get('category')).toBe(
        category.id,
      );
    }

    const categoryContent = page.locator('#menu-category-content');
    await expect(categoryContent.locator('article')).toHaveCount(
      category.items.length,
    );
    observedIds.push(
      ...(await categoryContent
        .locator('article')
        .evaluateAll((items) =>
          items.map((item) => item.getAttribute('data-menu-item-id')!),
        )),
    );

    for (const item of category.items) {
      const dish = categoryContent.locator(`[data-menu-item-id="${item.id}"]`);
      await expect(
        dish.getByRole('heading', { name: item.name, exact: true }),
      ).toBeVisible();
      if (item.description) {
        await expect(
          dish.getByText(item.description, { exact: true }),
        ).toBeVisible();
      }
      await expect(dish.locator('.menu-item-price')).toHaveText(
        item.variants?.map((variant) => variant.price!) ?? [item.price!],
      );
      if (item.image) {
        const photo = dish.locator('img');
        await expect(photo).toHaveAttribute('src', item.image);
        await expect(photo).toHaveAttribute('alt', item.imageAlt!);
        await photo.scrollIntoViewIfNeeded();
        await expect(photo).toHaveJSProperty('complete', true);
        await expect
          .poll(() =>
            photo.evaluate(
              (element) => (element as HTMLImageElement).naturalWidth,
            ),
          )
          .toBeGreaterThan(0);
      } else {
        await expect(dish.locator('img')).toHaveCount(0);
      }
    }
  }

  expect(observedIds.sort()).toEqual(
    content.categories
      .flatMap((category) => category.items.map((item) => item.id))
      .sort(),
  );
  expect(observedIds).toHaveLength(39);
  const pdfLink = page.getByRole('link', { name: 'View the original menu' });
  const pdf = await request.get((await pdfLink.getAttribute('href'))!);
  expect(pdf.ok()).toBeTruthy();
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  await page
    .locator('.menu-bottom-note')
    .getByRole('link', { name: 'Find a branch' })
    .click();
  await expect(page).toHaveURL(/\/#branches$/);
  const destinations = await page
    .locator('.branch-directions')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).href),
    );
  expect(destinations).toEqual(
    content.branches.map((branch) => branch.mapsUrl),
  );
  expect(errors).toEqual([]);
});

test('mobile navigation supports keyboard, Escape, and the menu-to-branch journey', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
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
    .getByRole('link', { name: 'Our menu', exact: true })
    .click();
  await expect(page).toHaveURL(/\/menu\/$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  const menuLink = page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Our menu', exact: true });
  await expect(menuLink).toHaveAttribute('aria-current', 'page');
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Find a branch' })
    .click();
  await expect(page).toHaveURL(/\/#branches$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(
    page.getByRole('heading', { name: 'Your table is waiting.' }),
  ).toBeInViewport();
});

test('menu links, category sharing, and browser Back keep a coherent visitor journey', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#menu');
  await expect(page.locator('#menu')).toBeInViewport();
  await expect(
    page.getByRole('group', { name: 'Browse menu categories' }),
  ).toHaveCount(0);
  const previewCategories = await page
    .locator('#menu a[href]')
    .evaluateAll((links) =>
      links
        .map((link) => new URL((link as HTMLAnchorElement).href))
        .filter((url) => url.pathname === '/menu/')
        .map((url) => url.searchParams.get('category'))
        .filter((category): category is string => category !== null),
    );
  expect(previewCategories.sort()).toEqual(
    content.categories.map((category) => category.id).sort(),
  );
  await page
    .locator('.site-footer')
    .getByRole('link', { name: 'Our menu', exact: true })
    .click();
  await expect(page).toHaveURL(/\/menu\/$/);
  await page.getByRole('button', { name: 'Bakar', exact: true }).click();
  await expect(page).toHaveURL(/\/menu\/\?category=bakar$/);
  await page.reload();
  await expect(page.locator('#menu-category-title')).toHaveText('Bakar');
  await page
    .locator('.menu-bottom-note')
    .getByRole('link', { name: 'Find a branch' })
    .click();
  await expect(page).toHaveURL(/\/#branches$/);
  await expect(
    page.getByRole('heading', { name: 'Your table is waiting.' }),
  ).toBeInViewport();
  await page.goBack();
  await expect(page).toHaveURL(/\/menu\/\?category=bakar$/);
  await expect(page.locator('#menu-category-title')).toHaveText('Bakar');
  await page
    .locator('.site-header')
    .getByRole('link', { name: 'Ayam Kremes by Sarang home', exact: true })
    .click();
  await expect(page).toHaveURL(/\/#home$/);
  await expect(page.locator('#hero-title')).toBeInViewport();
  await page.goBack();
  await expect(page).toHaveURL(/\/menu\/\?category=bakar$/);
  await expect(page.locator('#menu-category-title')).toHaveText('Bakar');
  await page.goto('/menu/?category=unknown');
  await expect(page.locator('#menu-category-title')).toHaveText('Kremes');
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

test('the meal journey connects sambal, the dedicated menu, and branches', async ({
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
  await expect(page).toHaveURL(/\/menu\/$/);
  await expect(page.locator('#menu-title')).toBeInViewport();
  await page
    .locator('.menu-bottom-note')
    .getByRole('link', { name: 'Find a branch' })
    .click();
  await expect(page).toHaveURL(/\/#branches$/);
  await expect(
    page.getByRole('heading', { name: 'Your table is waiting.' }),
  ).toBeInViewport();
});

test('featured dishes deep-link to their category and category changes reset below the sticky navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page
    .getByRole('link', { name: 'Explore Ayam Bakar Madu on our menu' })
    .click();
  await expect(page).toHaveURL(
    /\/menu\/\?category=bakar#menu-category-content$/,
  );
  await expect(page.locator('#menu-category-title')).toHaveText('Bakar');
  await expect(page.locator('#menu-category-title')).toBeInViewport();
  await page
    .getByRole('combobox', { name: 'Menu category' })
    .selectOption('kremes');
  await page.evaluate(() =>
    window.scrollBy({ top: 1200, behavior: 'instant' }),
  );
  await page
    .getByRole('combobox', { name: 'Menu category' })
    .selectOption('add-on');
  await expect(page.locator('#menu-category-title')).toHaveText('Add On');
  expect(new URL(page.url()).searchParams.get('category')).toBe('add-on');
  expect(new URL(page.url()).hash).toBe('#menu-category-content');
  const positions = await page.evaluate(() => ({
    heading: document
      .querySelector('#menu-category-title')!
      .getBoundingClientRect().top,
    navBottom: document
      .querySelector('.menu-page-mobile-tools')!
      .getBoundingClientRect().bottom,
  }));
  expect(positions.heading).toBeGreaterThanOrEqual(positions.navBottom - 1);
  expect(positions.heading).toBeLessThan(positions.navBottom + 100);
  await expect(
    page.getByRole('heading', { name: 'Nasi Putih', exact: true }),
  ).toBeInViewport();
});

for (const width of [390, 768, 1440]) {
  test(`home and menu layouts, photography, and accessibility at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const [name, route] of [
      ['home', '/'],
      ['menu', '/menu/'],
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('main img:visible').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty('complete', true);
        await expect
          .poll(() =>
            image.evaluate(
              (element) => (element as HTMLImageElement).naturalWidth,
            ),
          )
          .toBeGreaterThan(0);
      }
      const dimensions = await page.evaluate(() => ({
        body: document.documentElement.scrollWidth,
        viewport: innerWidth,
      }));
      expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport);
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: 'instant' }),
      );
      if (name === 'menu' && width === 1440) {
        await page.screenshot({
          path: testInfo.outputPath('menu-desktop-viewport.png'),
          animations: 'disabled',
        });
      }
      await page.screenshot({
        path: testInfo.outputPath(`${name}-${width}.png`),
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
    }
  });
}
