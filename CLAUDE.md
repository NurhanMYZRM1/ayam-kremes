# Project guide

Read `docs/CLAUDE-HANDOFF.md` for the architecture and decisions and `docs/content-sources.md` before changing restaurant facts.

- React + TypeScript + Vite, static single-page site. No backend or environment secrets.
- Menu/branch data: `src/content/restaurant.json`. Homepage image choices: `src/content/home.ts`.
- Do not invent current prices, currency, sides, dietary claims, opening hours, delivery links, or restaurant history. Preserve source attribution when changing content.
- The design uses cream, forest green, restrained orange, Fraunces headings, and DM Sans body text. Fonts and images are served locally.
- Menu category state lives in `App.tsx`; featured links select the matching category. Category changes restore the list's scroll position below the sticky navigation.
- Use `npm run check`, `npm test`, `npm run test:e2e`, `npm run format:check`, and `npm run build` as appropriate. Keep focused regression tests for visitor journeys.
- Deployment and advanced ordering/account systems are future work, not part of this first release.
