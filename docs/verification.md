# Release verification

Checked **9 October 2026** in local Chrome/Chromium. The site remains a local preview; no deployment or DNS change was made.

| Check                  | Result                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`        | Pass: TypeScript and Vite production bundle                                                                                           |
| `npm test`             | Pass: 2 content/asset integrity tests                                                                                                 |
| `npm run test:e2e`     | Pass: 6 browser tests                                                                                                                 |
| `npm run format:check` | Pass: formatted source and documentation                                                                                              |
| Responsive layout      | Inspected at 390px phone, 768px tablet, 1440px desktop; no document-level horizontal overflow                                         |
| Photography            | Visible images load with nonzero natural dimensions; image alt text and lazy/eager behavior inspected                                 |
| Menu                   | All 7 categories work by keyboard; prices and variants compared with the rendered source PDF                                          |
| Featured dishes        | Featured Ayam Bakar Madu selects Bakar before navigating to the menu                                                                  |
| Long menu scrolling    | Switching from a scrolled Kremes list to Add On reveals the new heading and first items                                               |
| Mobile navigation      | Enter/Tab, Escape, expanded state, branch link, and focus restoration verified                                                        |
| Accessibility          | Axe WCAG 2 A/AA and 2.1 AA checks return zero violations at all three tested widths; visible focus and reduced-motion styles included |
| Menu PDF               | Served successfully as `application/pdf`; view and download actions target the unchanged original PDF                                 |
| Telephone links        | Both branches use international `tel:+60…` destinations while displaying the verified local phone numbers; no test calls placed       |
| Directions             | Opened both generated links in Google Maps; each resolves to the intended named restaurant and matching branch address                |
| Instagram              | Official profile and source post read during content research; social links point to the verified profile                             |
| Runtime                | No page errors during the menu browsing journey                                                                                       |

## Review fixes

Independent visual/content review inspected the phone, tablet and desktop layouts and compared all menu names, descriptions and prices against enlarged source PDF crops. It identified two concrete browsing issues: a featured Bakar dish opened the default Kremes category, and a category switch after a long scroll could conceal the beginning of the new list. Both were fixed and are covered by a focused browser regression test.

Automated accessibility checks identified insufficient contrast in the orange prices and decorative stamp. The orange palette was darkened and all three viewport checks passed afterward.

## Limits

- Chrome/Chromium was tested. No physical-device, Safari, Firefox or full screen-reader audit was performed.
- Directions were verified as address-based Google Maps links, not restaurant-supplied place IDs. No route or current location data is stored in the project.
- Menu prices have no source currency label, and current prices/availability need restaurant confirmation. The source PDF's 2023 metadata is not a confirmed publication date.
- The original PDF is approximately 25 MB. Its file size is disclosed beside the download action; it is loaded only when requested.
- Most secondary food photos are supplied 640px previews; the hero uses a 1600px source. The logo is a raster crop. Higher resolution originals are a future improvement.
- Ordering, reservations, and WhatsApp are omitted because confirmed links were not supplied. No placeholder actions are shown.
- This is a JavaScript-rendered static React site; prerendering is on the handoff roadmap.
