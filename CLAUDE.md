# Project guide

Read `docs/CLAUDE-HANDOFF.md` for the architecture and decisions and `docs/content-sources.md` before changing restaurant facts.

- React + TypeScript + Vite, static homepage and dedicated `/menu/` page. No backend or environment secrets.
- Menu/branch data: `src/content/restaurant.json`. Homepage image choices: `src/content/home.ts`.
- English/Malay interface strings: `src/content/translations.ts`; Malay content overlay: `src/content/menu-ms.json`. Language provider and content helpers live in `src/i18n/`. Preserve original dish names, price strings and contact/directions URLs across translations. Read `docs/bilingual-interface.md` before extending languages.
- Do not invent current prices, currency, sides, dietary claims, opening hours, delivery links, or restaurant history. Preserve source attribution when changing content.
- The design uses cream, forest green, restrained orange, Fraunces headings, and DM Sans body text. Fonts and images are served locally.
- Menu category state lives in `App.tsx` and the `category` query. Featured links open `/menu/` with the matching category. Category changes restore the list's scroll position below the sticky navigation.
- Use `npm run check`, `npm test`, `npm run test:e2e`, `npm run format:check`, and `npm run build` as appropriate. Keep focused regression tests for visitor journeys.
- Read `docs/apple-design-upgrade.md` for the current menu/flow refinement. Compact layouts use a native category select; desktop uses a scrollable one-level rail. `tests/browser/menu-flow.spec.ts` covers keyboard continuation and 200% text sizing.
- Read `docs/menu-redesign.md` for the dedicated page, photo rules, ordinary page links and web motion decisions. Vite builds two real HTML entries sharing one bundle.
- Read `docs/indonesian-refresh.md` for the current design revision. Its local preview uses port 5176; browser tests own port 5177 by default, configurable with `PLAYWRIGHT_PORT`.
- The baseline is deployed to Cloudflare Workers at `ayamkremes.com`. `npm run deploy` publishes to production using the pinned account in `wrangler.jsonc`; this design branch remains a local preview until approved for publication.
- Advanced ordering/account systems remain future work.
