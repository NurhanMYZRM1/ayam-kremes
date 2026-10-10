# Ayam Kremes by Sarang

A responsive restaurant website built with React, TypeScript, and Vite. Includes a photograph-led homepage, 39 menu items across seven categories, five sambals, and two branches with directions and telephone links.

## Start locally

Requires Node.js 22.12+ and npm. No environment variables, API keys, accounts, or database are needed.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite, normally **http://127.0.0.1:5173/**. The full menu has its own `/menu/` page. Branch and story navigation use homepage anchors: `/#branches` and `/#the-crunch`.

The Indonesian table design preview is on branch `codex/indonesian-table`. Run `npm run dev -- --port 5176 --strictPort` to reproduce the review preview. Its [design notes](docs/indonesian-refresh.md) cover the Mobbin references and connected visitor journey.

The header's **EN / BM** controls switch between English and Bahasa Melayu. The choice is remembered locally. Share a Malay view with `?lang=ms`, including a section anchor such as `http://127.0.0.1:5176/menu/?lang=ms`. Original dish names and printed prices remain unchanged in both languages. The downloadable PDF remains the supplied original menu. Category links can be shared with `?category=bakar`; see [dedicated menu notes](docs/menu-redesign.md).

## Build and verify

```sh
npm run check        # TypeScript
npm test             # Content, photo mapping, and asset integrity
npm run test:e2e     # Browser journeys, responsive checks, axe accessibility
npm run format:check
npm run build        # Production files in dist/
npm run preview      # Serve the production build, normally port 4173
```

The browser suite uses installed Google Chrome on macOS when available. Otherwise, install the Playwright browser once:

```sh
npx playwright install chromium
```

For a custom browser installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Tests own a separate dev server on port 5177 by default and fail if that port is occupied, so they cannot silently test another checkout. Override it with `PLAYWRIGHT_PORT=5187 npm run test:e2e`. Screenshots are saved under ignored `test-results/`.

Format editable project files with `npm run format`.

## Edit content

| Change                                                  | Location                           |
| ------------------------------------------------------- | ---------------------------------- |
| Menu items, prices, drink variants, featured selections | `src/content/restaurant.json`      |
| Branch addresses, hours, telephone numbers, directions  | `src/content/restaurant.json`      |
| Homepage photograph choices and alternative text        | `src/content/home.ts`              |
| Original photographs and extracted logo                 | `public/images/`                   |
| Downloadable original menu                              | `public/menu/ayam-kremes-menu.pdf` |
| Colours, typography, shared layout                      | `src/styles.css`                   |
| Source evidence and unresolved facts                    | `docs/content-sources.md`          |

Interface/editorial translations are in `src/content/translations.ts`. Malay menu descriptions, category titles, hours and alternative text are in `src/content/menu-ms.json`. Keep that overlay in sync when updating the sourced English menu. See [bilingual interface notes](docs/bilingual-interface.md).

The supplied PDF prints prices without a currency and has 2023 creation metadata. The site preserves the printed values and asks visitors to check current prices with a branch. Currency, current prices, and inclusions still need restaurant confirmation.

## Continue with Claude Code

Start with [the implementation handoff](docs/CLAUDE-HANDOFF.md). `CLAUDE.md` also points to the relevant files and checks. The public repository contains the standard source code and local assets; no proprietary runtime is required.

## Hosting

The baseline site is deployed at `https://ayamkremes.com` through Cloudflare Workers static assets. `wrangler.jsonc` serves `dist/`, pins the owning account, and disables `workers.dev`. The `www` hostname is not configured. `npm run deploy` builds and publishes to the production domain, and requires an authenticated Wrangler session. The Indonesian table refresh is a local review version and has not been deployed. Vite produces `dist/index.html` and `dist/menu/index.html` as real static pages, sharing the React bundle. No server routing layer is needed.

Restaurant photographs, logo, and menu remain attributed to their original sources. Public repository visibility does not grant a separate license to those assets.
