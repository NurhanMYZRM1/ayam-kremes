# English and Bahasa Melayu interface

Added **10 October 2026** to the local `codex/indonesian-table` design branch. Preview remains at `http://127.0.0.1:5176/`.

## Visitor behaviour

- EN/BM buttons stay visible in the header, including when the mobile navigation is closed. Both are keyboard accessible and communicate their selected state with `aria-pressed`.
- English is the default. An explicit `?lang=en` or `?lang=ms` overrides the saved choice. Without a valid language query, the previous local choice is used.
- The preference is stored under `sarang.locale`. The interface still works if browser storage is unavailable.
- Switching updates the page language, description metadata, interface/accessibility labels, menu/category descriptions, drink variants, branch hours and image alternative text.
- Existing section anchors and selected menu category survive a switch; scroll compensation keeps the current reading location. The initial hash restoration is cancelled on user interaction so delayed font readiness cannot override navigation.
- Malay links use `?lang=ms` and preserve the current section hash. For example: `http://127.0.0.1:5176/?lang=ms#branches`.
- Original restaurant/dish names, addresses, phones, maps, prices and PDF are retained. No currency, ingredient, included side, dietary or historical claim was added through translation.

The full menu now lives at `/menu/`. Share a Malay category with `/menu/?lang=ms&category=bakar#menu-category-content`. Page links retain the language and the selected category survives reload. See [menu-redesign.md](menu-redesign.md).

## Editable files

| Location                          | Purpose                                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/content/translations.ts`     | Complete typed EN/MS interface and editorial strings                                            |
| `src/content/menu-ms.json`        | Malay display-only overlay, keyed by stable menu/category/branch IDs                            |
| `src/i18n/types.ts`               | Supported locale and required message keys                                                      |
| `src/i18n/LocaleContext.tsx`      | Preference, query state, document language and reading-position preservation                    |
| `src/i18n/content.ts`             | Content overlay merging and homepage alt-text localization                                      |
| `src/i18n/format.ts`              | Named text placeholders for accessible labels                                                   |
| `tests/browser/languages.spec.ts` | Language journeys, persistence, unchanged prices/names, variants and Malay layout/accessibility |

Restaurant facts remain sourced from `src/content/restaurant.json`. The Malay overlay contains descriptions, labels, hours and alts, with no repeated prices or addresses. When adding or changing a menu item, update its translation by the same stable ID; the content test checks coverage. Adding another language requires a complete `Messages` dictionary and a content overlay rather than scattered conditional text in components.

## Verification

TypeScript and production build pass. Three content tests cover asset/source integrity and Malay translation coverage. Fourteen browser checks cover the existing English journeys plus language switching, remembering a choice, shared Malay links, selected category/reading position, unchanged dish names/prices, translated drink variants, PDF/directions actions, and axe/overflow checks at 390, 768 and 1440px in both languages. Independent manual review found the Malay wording natural, with no unsupported new facts, and verified 44px language controls and keyboard navigation. A duplicated opening-hours punctuation mark was corrected.

This interface was published with the current design on 10 October 2026. See [deployment notes](deployment-2026-10-10.md).
