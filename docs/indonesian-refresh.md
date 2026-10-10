# Indonesian table design preview

Prepared **10 October 2026**, Asia/Kuala_Lumpur, on local branch `codex/indonesian-table` from `origin/main`. The prior uncommitted menu-to-branches CTA was carried into this preview; the Claude worktree retains its original files. This refresh was subsequently published on 10 October 2026; see [deployment notes](deployment-2026-10-10.md).

## Preview

```sh
npm ci
npm run dev -- --port 5176 --strictPort
```

Open `http://127.0.0.1:5176/`. The usual checks remain in the README. Browser tests own their own server on port 5177, or use `PLAYWRIGHT_PORT=5187 npm run test:e2e`; an occupied port fails instead of testing another checkout.

## What changed

- The hero explicitly introduces Indonesian flavour, with a small `Selamat datang` greeting and English navigation/body copy. Original menu names remain untouched.
- Parchment, leaf green, warm brown and sambal clay come from the approved food photographs and original logo. Fraunces and DM Sans remain locally hosted.
- The rotated crunch sticker and decorative ticker are replaced by a useful three-link meal journey: choose a dish, meet the sambal, then find a table.
- Featured dishes lead into one connected kremes-and-sambal story with a shared warm surface, a contained green copy panel, and alternating photographs.
- Short continuation links connect featured dishes, kremes, sambal, the complete menu and branches. Navigation underlines the current main section; it remains native anchor navigation.
- A narrow, original geometric weave decorates two seams. It is proposed ornament, not a replica or claim of authentic batik, tenun or regional heritage.
- Menu tabs are quieter, the existing category-scroll correction remains, and the price note links directly to branches. Branch copy closes the meal journey.
- Motion stays restrained: smooth anchors and short existing hover transitions. Reduced-motion preferences remove those effects. No parallax, scroll-triggered hidden content or animated cultural props are added.

## Evidence

[The Mobbin research](design-research-indonesian.md) records four inspected reference images. Savor informed food-texture continuity; Monte informed concise invitations and showing the next destination; Eat Hungry Tiger informed culinary hierarchy only and is explicitly an Indian example. Mobbin returned no verified Indonesian restaurant example in this shortlist and static screenshots do not establish animation behavior.

The Indonesian cues are grounded in the restaurant's actual food, dish names, sambal bowls, leaf-lined plates, timber tables and supplied logo. No restaurant history, regional identity, current price/currency, rice inclusion or certification was added. The greeting is proposed hospitality copy.

## Verification

- TypeScript and production build pass.
- Both content/asset integrity tests pass; the menu and branch data files are unchanged from `origin/main`.
- Eight existing browser checks pass, covering menu browsing, featured category selection, sticky category changes, menu-to-branch continuation, keyboard navigation, and photography/overflow/axe checks at 390, 768 and 1440px.
- A focused ninth browser check passes for the new meal journey: sambal anchor → current navigation state → full menu → branches, with reduced motion enabled.
- Fresh `#sambal` loads and `#branches` reloads are covered by the menu continuation test. React now restores the initial hash after mounting and loading local fonts so a direct link reaches its section.
- Independent visual review inspected 390, 768 and 1440px: no overflow, broken images or unsupported cultural claims. It identified double anchor offsets, low-contrast focus rings on green panels, and the fresh-load hash issue. Section margins were removed so only global header clearance applies, green panels now use parchment focus outlines, and the direct-link behavior is fixed. Browser screenshots are kept in ignored `test-results/`.

Remaining source limitations are in `docs/content-sources.md`: currency/current prices, holiday exceptions, exact map pins, publication rights and higher resolution originals. Production deployment followed the completed design reviews; see the deployment notes.
