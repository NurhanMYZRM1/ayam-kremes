import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('language switching preserves the category, original dishes and prices, and remembers the choice', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#menu');
  await page.getByRole('button', { name: 'Bakar', exact: true }).click();
  const names = await page
    .locator('#menu-category-content h4')
    .allTextContents();
  const prices = await page
    .locator('#menu-category-content .menu-item-price')
    .allTextContents();
  const categoryTop = await page
    .locator('#menu-category-title')
    .evaluate((element) => element.getBoundingClientRect().top);
  await page
    .getByRole('button', { name: 'Read in Bahasa Melayu' })
    .evaluate((element) =>
      (element as HTMLButtonElement).focus({ preventScroll: true }),
    );
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
  await expect(page.locator('#menu-title')).toHaveText('Pilih hidangan anda.');
  await expect(
    page.getByRole('button', { name: 'Bakar', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  expect(
    await page.locator('#menu-category-content h4').allTextContents(),
  ).toEqual(names);
  expect(
    await page
      .locator('#menu-category-content .menu-item-price')
      .allTextContents(),
  ).toEqual(prices);
  const translatedTop = await page
    .locator('#menu-category-title')
    .evaluate((element) => element.getBoundingClientRect().top);
  expect(Math.abs(translatedTop - categoryTop)).toBeLessThan(5);
  await expect(page).toHaveURL(/\?lang=ms#menu$/);
  await page.goto('/#branches');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
  await expect(
    page.getByRole('heading', { name: 'Jom ke Sarang.' }),
  ).toBeInViewport();
  await expect(page.getByText('Jumaat · Tutup', { exact: true })).toBeVisible();
  await page
    .getByRole('button', { name: 'Baca dalam bahasa Inggeris' })
    .click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveURL(/\/#branches$/);
  await expect(
    page.getByRole('heading', { name: 'Your table is waiting.' }),
  ).toBeInViewport();
});

test('a shared Malay link supports mobile navigation, drink variants, PDF and directions', async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?lang=ms#menu');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
  await expect(
    page.getByRole('button', { name: 'Baca dalam Bahasa Melayu' }),
  ).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Minuman', exact: true }).click();
  const limeade = page.locator('.menu-photo-item').filter({
    has: page.getByRole('heading', {
      name: 'Signature Lemongrass Limeade with Daun Limau',
    }),
  });
  await expect(limeade.getByText('Ais', { exact: true })).toBeVisible();
  await expect(limeade.getByText('Panas', { exact: true })).toBeVisible();
  await expect(limeade.locator('.menu-item-price')).toHaveText(['9', '8']);
  const pdf = await request.get(
    (await page
      .getByRole('link', { name: 'Lihat menu asal' })
      .getAttribute('href'))!,
  );
  expect(pdf.ok()).toBeTruthy();
  await page.getByRole('button', { name: 'Buka navigasi' }).click();
  await page
    .getByRole('navigation', { name: 'Navigasi utama' })
    .getByRole('link', { name: 'Cari cawangan' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Jom ke Sarang.' }),
  ).toBeInViewport();
  await expect(page.locator('.nav-toggle')).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await expect(
    page.getByRole('link', { name: 'Dapatkan arah ke Kota Damansara' }),
  ).toHaveAttribute('href', /https:\/\/www.google.com\/maps\/dir\//);
  await expect(page.locator('.branch-phone').first()).toHaveAttribute(
    'href',
    'tel:+60361434188',
  );
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
  await expect(
    page.getByRole('heading', { name: 'Jom ke Sarang.' }),
  ).toBeInViewport();
});

for (const width of [390, 768, 1440]) {
  test(`Malay interface is readable and accessible at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/?lang=ms');
    await page.evaluate(() => document.fonts.ready);
    await expect(
      page.getByRole('button', { name: 'Baca dalam Bahasa Melayu' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Rangup menggoda. Cita rasa Indonesia.',
      }),
    ).toBeVisible();
    for (const image of await page.locator('main img:visible').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('complete', true);
    }
    const dimensions = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    const accessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      accessibility.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      })),
    ).toEqual([]);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({
      path: testInfo.outputPath(`malay-${width}.png`),
      fullPage: true,
      animations: 'disabled',
    });
  });
}
