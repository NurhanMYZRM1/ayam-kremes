import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const data = JSON.parse(
  readFileSync(
    new URL('../src/content/restaurant.json', import.meta.url),
    'utf8',
  ),
);

test('Malay translations cover sourced display text without duplicating restaurant facts', () => {
  const malay = JSON.parse(
    readFileSync(
      new URL('../src/content/menu-ms.json', import.meta.url),
      'utf8',
    ),
  );
  for (const category of data.categories) {
    assert.ok(malay.categories[category.id]?.name);
    for (const item of category.items) {
      const translation = malay.items[item.id];
      if (item.description)
        assert.ok(
          translation?.description,
          `Missing Malay description: ${item.id}`,
        );
      if (item.image)
        assert.ok(
          translation?.imageAlt,
          `Missing Malay image text: ${item.id}`,
        );
      for (const variant of item.variants ?? [])
        assert.ok(translation?.variants?.[variant.name]);
    }
  }
  for (const value of Object.values(malay.items))
    assert.ok(
      Object.keys(value).every((key) =>
        ['description', 'imageAlt', 'variants'].includes(key),
      ),
    );
  for (const branch of data.branches)
    assert.equal(malay.branches[branch.id].hours.length, branch.hours.length);
});

test('menu, assets, and source attribution are internally complete', () => {
  const ids = new Set();
  for (const category of data.categories) {
    assert.ok(
      category.items.length > 0,
      `${category.name} must contain dishes`,
    );
    for (const item of category.items) {
      assert.ok(!ids.has(item.id), `Duplicate dish id ${item.id}`);
      ids.add(item.id);
      assert.ok(item.name && item.source, `Missing source for ${item.id}`);
      if (item.image) {
        assert.ok(item.imageAlt, `Missing alternative text for ${item.id}`);
        assert.ok(
          data.assets.some(
            (asset) =>
              asset.path === item.image && asset.dishIds?.includes(item.id),
          ),
          `Missing photo-to-dish evidence for ${item.id}`,
        );
      }
    }
  }
  for (const path of [
    data.menuPdf,
    ...data.assets.map((asset) => asset.path),
  ]) {
    assert.ok(
      path.startsWith('/'),
      `Asset should use an absolute web path: ${path}`,
    );
    assert.ok(
      existsSync(resolve('public', path.slice(1))),
      `Missing public asset ${path}`,
    );
  }
});

test('branch actions have real, attributed destinations', () => {
  assert.ok(data.branches.length > 0);
  for (const branch of data.branches) {
    assert.ok(
      branch.address && branch.source,
      `Incomplete branch source: ${branch.name}`,
    );
    const url = new URL(branch.mapsUrl);
    assert.equal(url.protocol, 'https:');
    assert.ok(
      url.hostname.includes('google') || url.hostname === 'maps.app.goo.gl',
    );
    if (branch.phone) assert.ok(branch.phone.replace(/\D/g, '').length >= 9);
  }
});
