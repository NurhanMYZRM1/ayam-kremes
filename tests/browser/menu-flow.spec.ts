import { test, expect } from '@playwright/test';

test('phone category picker and sequential browsing support keyboard and branches', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/menu/');
  const picker = page.getByRole('combobox', {
    name: 'Menu category',
    exact: true,
  });
  await expect(picker.locator('option')).toHaveText([
    'Kremes',
    'Bakar',
    'Appetizer',
    'Vegetables',
    'Sup',
    'Drinks',
    'Add On',
  ]);
  await picker.focus();
  await page.keyboard.press('Space');
  await page.keyboard.press('b');
  await page.keyboard.press('Enter');
  await expect(picker).toHaveValue('bakar');
  await expect(page.locator('#menu-category-title')).toHaveText('Bakar');
  await picker.selectOption('vegetables');
  const next = page.getByRole('button', { name: 'Next: Sup', exact: true });
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(picker).toHaveValue('sup');
  await expect(page.locator('#menu-category-title')).toBeFocused();
  await expect(page.locator('#menu-category-title')).toBeInViewport();
  await page.reload();
  await expect(picker).toHaveValue('sup');
  await page
    .getByRole('button', { name: 'Previous: Vegetables', exact: true })
    .click();
  await expect(picker).toHaveValue('vegetables');
  await page
    .locator('.menu-page-mobile-tools')
    .getByRole('link', { name: 'Find a branch' })
    .click();
  await expect(page).toHaveURL(/\/#branches$/);
  await expect(page.locator('#branches-title')).toBeInViewport();
});

test('home and menu retain readable content and controls at 200 percent text size in EN and BM', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const language of ['en', 'ms']) {
    for (const route of ['/', '/menu/']) {
      await page.goto(`${route}?lang=${language}&category=vegetables`);
      await page.addStyleTag({ content: 'html { font-size: 200%; }' });
      await page.evaluate(() => document.fonts.ready);
      const text = page
        .locator(
          route === '/' ? '.hero-description' : '.menu-page-dish-details > p',
        )
        .first();
      expect(
        await text.evaluate((element) =>
          parseFloat(getComputedStyle(element).fontSize),
        ),
      ).toBeGreaterThanOrEqual(32);
      const dimensions = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        oversized: [...document.querySelectorAll('body *')]
          .filter((element) => {
            const r = element.getBoundingClientRect();
            return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
          })
          .map((element) => ({
            tag: element.tagName,
            class: element.className,
            text: element.textContent?.slice(0, 60),
            right: element.getBoundingClientRect().right,
          }))
          .slice(0, 20),
      }));
      expect(
        dimensions.width,
        JSON.stringify({ route, language, ...dimensions }),
      ).toBeLessThanOrEqual(320);
      if (route === '/menu/') {
        const picker = page.locator('#menu-category-picker');
        const bounds = await picker.boundingBox();
        expect(bounds!.height).toBeGreaterThanOrEqual(44);
        await picker.selectOption('drinks');
        await expect(page.locator('#menu-category-title')).toBeInViewport();
        const clearance = await page.evaluate(
          () =>
            document
              .querySelector('#menu-category-title')!
              .getBoundingClientRect().top -
            document
              .querySelector('.menu-page-mobile-tools')!
              .getBoundingClientRect().bottom,
        );
        expect(clearance).toBeGreaterThanOrEqual(0);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBeLessThanOrEqual(320);
      }
    }
  }
  await page.setViewportSize({ width: 1280, height: 600 });
  await page.goto('/menu/?lang=en');
  await page.addStyleTag({ content: 'html {font-size:200%;}' });
  const lastCategory = page.getByRole('button', {
    name: 'Add On',
    exact: true,
  });
  await lastCategory.focus();
  await expect(lastCategory).toBeInViewport();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(1280);
});
