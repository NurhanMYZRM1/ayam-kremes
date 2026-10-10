# Claude Code handoff

First local release prepared on **9 October 2026**, Asia/Kuala_Lumpur.

The baseline has since been deployed to Cloudflare Workers at `ayamkremes.com`. The **10 October 2026 Indonesian table refresh** is an isolated local review branch, `codex/indonesian-table`, described in [indonesian-refresh.md](indonesian-refresh.md). Preview that branch on port 5176. The original release notes below retain the content and architecture context.

That local branch now also includes an English/Bahasa Melayu interface. The EN/BM switch remembers the preference and supports `?lang=ms` links. Translation files, content invariants, and bilingual checks are documented in [bilingual-interface.md](bilingual-interface.md).

The local branch also includes a redesigned dedicated `/menu/` page and a compact homepage category preview. Read [menu-redesign.md](menu-redesign.md) for current page architecture, Mobbin evidence and motion decisions.

## What exists

A complete English/Bahasa Melayu restaurant website using original dish names: editorial homepage, three featured dishes, kremes introduction, five verified sambals, a browsable seven-category menu containing 39 items, two branch listings, a small photo gallery, Instagram link, menu PDF, and contact/navigation footer. No payment, account, reservation, ordering, CMS, or loyalty system is implemented.

Start with `npm ci && npm run dev`, then open the printed localhost URL. Production output is created with `npm run build` in `dist/`. No environment setup beyond Node.js/npm is required.

## Architecture

| File                                            | Responsibility                                                                     |
| ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| `src/main.tsx`                                  | React entry point and locally bundled fonts                                        |
| `src/App.tsx`                                   | Header, mobile navigation, homepage sections, footer, shared menu selection        |
| `src/components/MenuPreview.tsx`                | Homepage category invitation and links to the dedicated menu                       |
| `src/lib/navigation.ts`                         | Page detection and ordinary locale/category links                                  |
| `menu/index.html` / `vite.config.ts`            | Second static HTML entry and shared production bundle                              |
| `src/components/MenuPage.tsx`                   | Category buttons, photographed/text dishes, drink variants, PDF actions            |
| `src/components/BranchesSection.tsx`            | Verified branch hours, addresses, directions and contact links                     |
| `src/content/restaurant.json`                   | Editable menu, branches, sambals, image attribution and unresolved facts           |
| `src/content/home.ts`                           | Curated homepage imagery and customer-facing alternative text                      |
| `src/types.ts`                                  | Content contracts                                                                  |
| `src/lib/links.ts`                              | Telephone URL normalization to Malaysian international format                      |
| `src/styles.css`                                | Tokens, responsive homepage, navigation and shared styles                          |
| `src/components/menu-page.css` / `branches.css` | Menu and branches layout                                                           |
| `tests/content.test.mjs`                        | Data/source/photo mapping and file-integrity checks                                |
| `tests/browser/visitor-journeys.spec.ts`        | Keyboard, menu selection, links, responsive layout, image and accessibility checks |

This is a static React app with ordinary page links and homepage fragment navigation. Vite builds two HTML entries sharing one React bundle. There is no routing library or network API at runtime. Restaurant data is bundled at build time. Rebuild after editing content. Category state is owned by `App`, initialized from `?category=`, and updated without extra history entries; featured dish links open the matching category on `/menu/`. The menu uses native buttons with `aria-pressed`, a live category/count announcement, and a bounded horizontal strip on narrow screens. Switching categories returns the first items to view underneath the sticky header/category bar.

## Design decisions and Mobbin research

The direction is “The Sarang Table”: cream backgrounds, forest green headings and a dark green story/footer, with small burnt-orange accents. Fraunces gives headings a friendly editorial feel; DM Sans keeps longer menu text readable. These are proposed web fonts, not claimed original brand fonts. The original chicken-seal logo is retained beside a supporting text wordmark. Photographs, open space and thin rules lead the design; cards and motion are restrained.

The design researcher used Mobbin MCP, inspected returned images, and opened the supplied Sweetgreen references:

- [Sweetgreen category browsing](https://mobbin.com/screens/fb539e5f-5445-40d9-8a18-170b4b7623ae): adopted photography beside clear names and concise descriptions.
- [Sweetgreen menu browsing](https://mobbin.com/screens/7716d40f-ebe2-40c0-a519-e25e292bbc09): adopted compact category navigation and prominent dish photography. Navigation remains appropriate to a website.
- [Savor texture arrangement](https://mobbin.com/sites/sections/1addbaf2-ed2f-4d7e-a66a-d0196536274b): adopted varied photographic scale and close food texture in the story/gallery sections. The [exact supplied Savor reference](https://mobbin.com/sites/sections/fe1d2bf2-b322-4d2c-8b81-0043fc0a47cb) redirected to account creation, so equivalent Savor images were inspected through MCP.
- [Sweetgreen branch discovery](https://mobbin.com/screens/5737df94-3cfe-4207-b15f-811029c1582a): adopted strong branch names, concise address rows and obvious directions actions.

Layouts and branding are original adaptations. There is no copied Mobbin artwork in the site.

## Content and assets

The menu PDF was visually read, including enlarged crops; its single page contains two raster panels. It is preserved unchanged in `public/menu/` (24.5 MiB; downloaded only on request). All 39 items and variant prices are transcribed in the source ledger.

The supplied [Simplepix.food gallery](https://simplepixfood.pixieset.com/pantaitimur/) provides the original food photographs. Photos named for dishes were visually matched to the code-labelled menu photographs. WebP versions are stored locally; the 1600px hero is about 236 KB and other photos are roughly 32–148 KB. Most non-hero sources are 640px previews, so higher resolution originals remain a useful improvement. The logo is a 283 × 285 pixel crop of the original PDF. Source URLs and dish mappings remain in the JSON and [content source ledger](content-sources.md).

Both branches use addresses, hours and phone numbers from the [official 8 May 2026 Instagram post](https://www.instagram.com/ayamkremes_my/p/DYGVUFaD3_D/). Directions are Google Maps address queries constructed from those verified addresses. No exact place IDs or approved map pins were supplied.

## Verification

Latest dedicated-menu checks: production build and formatting pass, three content tests pass, and all fourteen browser tests pass. Home and menu layouts were checked in EN/BM at phone/tablet/desktop widths; independent review additionally inspected 320px. Direct built-site category links load successfully. See [menu-redesign.md](menu-redesign.md) for the current results.

Completed checks and limitations are recorded in [verification.md](verification.md). The independent review compared all menu names, descriptions and prices against the rendered PDF and inspected phone, tablet and desktop layouts. Its two actionable browsing findings were corrected and covered by a regression test: featured Bakar selection and restoring the category start after a long menu scroll.

Run:

```sh
npm run check
npm test
npm run test:e2e
npm run format:check
npm run build
```

Browser screenshots are produced under `test-results/` and are not committed. The suite uses installed Chrome on macOS or Playwright Chromium elsewhere; see the README for browser setup. Tests own a server on 5177 by default; use `PLAYWRIGHT_PORT` to select another free port. They never reuse another checkout's server. Automated accessibility checks supplement visual and keyboard review; they are not a full assistive-technology audit.

## Outstanding restaurant information

1. Confirm current prices, currency, dish availability, tax/service charge treatment, and included rice/sides. PDF creation metadata is dated February 2023, and the printed prices have no currency label. Current delivery-platform prices are different products/channels and were not substituted.
2. Confirm holiday opening exceptions and provide exact Google Maps place links. Official dine-in hours differ from third-party delivery windows; the site uses official hours and records the conflict.
3. Supply approved ordering, reservation or WhatsApp links if desired. None are invented or exposed as placeholders.
4. Supply a vector logo and higher resolution originals for secondary photography. Retain provenance and confirm publication rights before launch.
5. Review the implemented Bahasa Melayu copy and provide approved restaurant history or current certifications/dietary information if these should be published. None of those claims are fabricated.

## Prioritised roadmap

1. **Production follow-up:** resolve current menu facts, confirm branch pins, obtain final copy/assets, and add production canonical/social metadata. Cloudflare Workers hosting and the apex domain are configured; `www` remains unconfigured. `npm run deploy` builds and publishes through the pinned account in `wrangler.jsonc`, with `workers.dev` disabled. This design refresh has not been published.
2. **Content reach:** review the implemented Bahasa Melayu content, prerender rendered content to static HTML for stronger search and no-JavaScript access, branch-specific pages if useful, and opt-in privacy-conscious analytics if requested.
3. **Editorial workflow:** introduce a small CMS only when staff need frequent independent menu/branch updates; retain the current schema and source-confirmation discipline.
4. **Confirmed services:** integrate verified delivery/reservation links before considering a custom system.
5. **Larger product work:** payments, accounts and loyalty need separate requirements, operational ownership and a security/privacy design. Do not build speculative infrastructure ahead of that decision.

The repository is intended to be maintained as an ordinary npm project in Claude Code or any editor. No Sites/Higgsfield hosting runtime, connector credentials, or proprietary backend is required.
