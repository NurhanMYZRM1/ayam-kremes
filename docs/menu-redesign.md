# Dedicated restaurant menu

Local revision on **10 October 2026**, branch `codex/indonesian-table`. Preview: `http://127.0.0.1:5176/menu/`; Malay: `http://127.0.0.1:5176/menu/?lang=ms`.

The following describes the first dedicated-menu revision. The newer [Apple Design refinement](apple-design-upgrade.md) replaces compact horizontal chips with a labelled category picker, adds previous/next browsing, increases reading sizes, and removes the repeated table intro photo.

## Page flow and implementation

The homepage now has a compact category preview instead of the entire interactive menu. Hero, featured dish, story, preview and footer links open the dedicated menu page. Featured dishes and category links include the stable category ID and target the dish content, for example `/menu/?category=bakar#menu-category-content`.

`src/App.tsx` chooses the homepage or menu from the pathname and shares the header, language controls and footer. `src/lib/navigation.ts` builds ordinary page links that retain Bahasa Melayu. Menu buttons update `category` using `replaceState`, without creating seven extra Back-button entries. A valid category is restored on reload; an unknown value falls back to Kremes.

Vite builds two HTML entries, `index.html` and `menu/index.html`, with the same React entry point and shared bundle. This follows [Vite's multi-page build pattern](https://vite.dev/guide/build.html#multi-page-app). The production build contains a real menu document; direct menu links do not require a server-side SPA fallback. There is no new routing library or native runtime.

Editable UI: `src/components/MenuPage.tsx` and `menu-page.css`; homepage preview: `src/components/MenuPreview.tsx`; shared tokens/header/footer: `src/styles.css`. Branch styles are now isolated in `src/components/branches.css`.

## Design evidence

The design subagent inspected actual Mobbin screen images:

- [Sweetgreen menu](https://mobbin.com/screens/9d03a449-7ba8-45da-bc74-ef71e61440f8): large food images beside concise descriptions and prices; compact category hierarchy.
- [DoorDash restaurant menu](https://mobbin.com/screens/7a69e4bd-b541-4e0b-ac3e-a77310ac4951): food introduction followed by a desktop category sidebar and dish photography.
- [Uber Eats restaurant menu](https://mobbin.com/screens/b4cb4352-beac-452a-8fbc-24ebb23465c6): clear active category marker and separation of navigation from dishes.

The site adapts these browsing patterns to its own parchment, forest green and clay palette. It uses a desktop category rail, a sticky horizontal strip on smaller screens, larger two-column dish photos and ruled text entries. Original food photography supplies the ceramic, leaf, wooden-table and kremes cues. The weave rule remains proposed original ornament, without a claim of regional or historic authenticity. Reference artwork, delivery UI, ratings and unverified ordering actions are not used.

## Motion and source constraints

The user selected `expo-animation`. Its file describes a React Native construction workflow and explicitly directs web animation to `animate`; no `animate` skill was available locally. This existing React/Vite website keeps its stack. The applicable gate rejects animated category changes: categories are peers, and browsing should be immediate. Small button press feedback uses CSS transform at 120ms with `cubic-bezier(0.23, 1, 0.32, 1)`, without per-frame React state. Reduced-motion removes that scale. There are no slides, staggered entrances, parallax or fabricated native haptics.

All 39 original items, seven categories, price strings, drink variants and verified photo mappings remain in `restaurant.json`. Thirteen dishes have individually matched photographs; the remaining dishes use text. The general table photo is not labelled as a particular dish. The supplied PDF, source ledger and unresolved currency/current-price/rice-and-sides questions remain unchanged.

## Verification

Completed: TypeScript/production build, all three content tests, formatting, and all fourteen browser tests. The browser tests verify all 39 source items and 13 dish-photo mappings, shared category links, reload/Back, keyboard, language persistence, PDF/branch journeys, loaded images and axe/overflow checks on both pages in both languages at 390, 768 and 1440px. An independent read-only CUA review also inspected 320px, category focus/heading clearance and EN/BM reading position. It reported no actionable defects. A built-site smoke check confirmed separate home/menu HTML and PDF responses and opened a direct Malay Bakar category link successfully. This menu revision and the subsequent Apple Design refinement were published on 10 October 2026; see [deployment notes](deployment-2026-10-10.md).
