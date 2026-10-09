# Ayam Kremes by Sarang

A responsive restaurant website built with React, TypeScript, and Vite. Includes a photograph-led homepage, 39 menu items across seven categories, five sambals, and two branches with directions and telephone links.

## Start locally

Requires Node.js 22.12+ and npm. No environment variables, API keys, accounts, or database are needed.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite, normally **http://127.0.0.1:5173/**. Navigation uses normal section anchors: `#menu`, `#branches`, and `#the-crunch`.

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

For a custom browser installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Tests start their own dev server unless port 5173 is already in use, in which case they reuse whatever is serving there, even if it belongs to another checkout. Set `PLAYWRIGHT_PORT` to an unused port to test this tree. Screenshots are saved under ignored `test-results/`.

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

The supplied PDF prints prices without a currency and has 2023 creation metadata. The site preserves the printed values and asks visitors to check current prices with a branch. Confirm currency, current prices, and inclusions before a public launch.

## Continue with Claude Code

Start with [the implementation handoff](docs/CLAUDE-HANDOFF.md). `CLAUDE.md` also points to the relevant files and checks. The public repository contains the standard source code and local assets; no proprietary runtime is required.

## Hosting later

The intended destination is Cloudflare with `ayamkremes.com`. This release has **not been deployed**, and no DNS records have been changed. It produces a static `dist/` directory with `npm run build`; a future hosting setup can serve that directory. All current routes are same-page anchors, so no server routing layer is needed.

Restaurant photographs, logo, and menu remain attributed to their original sources. Public repository visibility does not grant a separate license to those assets.
