# Production deployment — 10 October 2026

The Indonesian table design, English/Bahasa Melayu interface, dedicated photograph-led menu, and Apple Design refinement are live at [ayamkremes.com](https://ayamkremes.com/).

- Source branch: `codex/indonesian-table`.
- Deployed application commit: `a8385e3`.
- Cloudflare Worker: `ayam-kremes`, using the existing account pinned in `wrangler.jsonc`.
- Deployment created: **10 October 2026, 14:19:29 MYT** (06:19:29 UTC).
- Active version: `fd9bfba9-3eb4-43ce-bcf4-45738772fbb5`, serving 100% of traffic.
- Previous version: `de1d7663-529b-4165-8447-8e2cd61e2601`.
- Command: `npm run deploy` (production build followed by `wrangler deploy`).

## Production checks

The production build passed. Live homepage, `/menu/`, and `/menu/?lang=ms&category=bakar` HTML match the corresponding local build byte for byte. The deployed JavaScript and CSS also match the build. The menu PDF responds with HTTP 200 and `application/pdf`.

A live browser smoke check verified homepage-to-menu navigation, switching to Bahasa Melayu, selecting Bakar, loaded food photography, and returning to the branch section with the language retained. Branch directions and telephone targets retain their verified source values. The deployed menu had no horizontal overflow at the inspected 1280px width. The existing source revision previously passed three content tests and all sixteen responsive/accessibility/browser tests; those suites were not repeated for this unchanged application.

## Maintain and roll back

Continue development in this branch/checkout. Deploy future changes using `npm run deploy` after relevant checks. Authentication uses the existing local Wrangler session; no credentials belong in the repository. Source history is maintained in the public [GitHub repository](https://github.com/NurhanMYZRM1/ayam-kremes). GitHub pushes and merges do not automatically deploy; publishing remains an explicit `npm run deploy` action.

If a rollback is required, run this from the checkout and confirm the version shown by Wrangler:

```sh
npx wrangler rollback de1d7663-529b-4165-8447-8e2cd61e2601
```

This rollback was documented, not executed. Deployment and configuration changes should be deliberate. The apex hostname is configured; `www.ayamkremes.com` remains outside the current configuration. Outstanding restaurant facts remain in [CLAUDE-HANDOFF.md](CLAUDE-HANDOFF.md#outstanding-restaurant-information).
