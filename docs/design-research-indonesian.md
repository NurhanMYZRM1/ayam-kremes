# Indonesian table refresh — design research

Research date: 10 October 2026. This is a design proposal for the existing restaurant site, not evidence of the restaurant's history or regional provenance. Mobbin MCP returned actual section images; all four shortlisted images were visually inspected. No AI usage notice was returned.

## Inspected Mobbin shortlist

| Reference                                                                                                           | What the image shows                                                                                                                                                                 | Adopted pattern                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Savor — food texture sequence](https://mobbin.com/sites/sections/fe1d2bf2-b322-4d2c-8b81-0043fc0a47cb)             | Warm cream background, tightly stacked and slightly offset close-up butter photographs, with no card chrome around them.                                                             | Let real food texture carry the story; keep image/copy blocks close enough to read as one meal rather than isolated sections. Use Sarang's original photographs.                                                  |
| [Eat Hungry Tiger — tradition and creation](https://mobbin.com/sites/sections/00b9b72a-6311-40f2-aa7f-a03594570d57) | Large culinary headline on orange, small preparation captions, a shared-table food photograph with a slight tilt. Its visible copy explicitly identifies Indian culinary traditions. | A strong food-first headline and a warm spice accent can give cuisine presence. Borrow hierarchy and table intimacy only; this is an Indian reference and supplies no evidence of Indonesian visual authenticity. |
| [Monte — hero and next-section glimpse](https://mobbin.com/sites/sections/2f083c6a-8cf1-40af-823b-bee1ce8f419a)     | Rust-coloured hero with simple line illustration and a small scrolling invitation immediately above the visible top of the next photograph.                                          | Make the next destination evident at section edges; use short continuation links and a connected meal journey rather than large empty breaks. Do not copy the illustration or shaped text.                        |
| [Monte — food and invitation](https://mobbin.com/sites/sections/664a16ca-816d-495d-b577-e08ce5c6f1a5)               | Cream canvas, a large food/drink photograph in a thin rust frame beside a short restaurant invitation, with restrained navigation controls below.                                    | Thin frames, cream/rust continuity and concise invitations fit a hospitable restaurant site. Keep static photographs rather than introducing an unnecessary carousel.                                             |

Mobbin did not return a verified Indonesian restaurant example in this shortlist. These references support structure, colour relationships and food presentation. Still screenshots cannot verify how a site animates or whether a motif is culturally authentic.

## Original visual direction

Keep the original logo, Fraunces headings and DM Sans body type. The approved hero already shows kremes, ceramic bowls, banana-leaf rice plating and a light wooden table. The sharing photograph and sambal photograph repeat the same tabletop, lighting and food palette. These actual restaurant assets are the strongest source of identity; view them as one photographic family.

Proposed palette roles: parchment `#f4eedf`, leaf green `#244637`, sambal clay `#ad472f`, and a small turmeric accent `#c79543`. Retain readable ink and muted text. Test text contrast rather than assuming accent colours are suitable for small copy.

Add a low-contrast, original repeat of paired leaves and simple woven diagonals only in narrow section seams or framing details. Call it textile-inspired. It is a new decorative treatment, not an authenticated batik pattern or a claim of a particular Indonesian region. Keep it away from body copy and mark decorative SVGs `aria-hidden`. No flags, temple silhouettes, masks or generic cultural stock imagery are needed.

Use straighter ceramic/menu-like photograph frames and softer corner radii. Reduce the playful rotated crunch stamp so it supports the food rather than competing with it. A small table invitation can remain friendly. If using the Indonesian phrase "Selamat makan", treat it as editorial hospitality copy rather than a restaurant credential.

## Connected visitor flow

Read the homepage as preparing a meal: **choose a dish → discover the crunch → add sambal → browse the full menu → find your table**.

1. Keep the two hero actions. Replace the decorative ticker with three working meal-journey links: "Choose your dish", "Add sambal", and "Find your table". Numbering is supplementary; descriptive link text remains readable.
2. Featured dishes lead into the kremes explanation with a short connecting line. Avoid a sharp full-width forest-green wall between two cream sections; a shared parchment story wrapper with a contained green panel can connect the crunch and sambal content.
3. Give the sambal section a stable anchor and a clear menu continuation action. Keep the five verified sambal names and descriptions; do not invent heat ratings, regional origins or ingredients.
4. Keep menu categories sticky below the header, with an obvious selected state. Add an actual "Find a branch" link alongside the existing price note so the copy's recommended next step works directly.
5. Start branches with a brief invitation following the menu. Repeat the leaf/textile seam and the same heading rhythm so the transition is deliberate. Preserve the existing verified addresses, hours, telephone numbers and map destinations.
6. Keep the small gallery and footer as the closing hospitality moment, with a working branch link and the real Instagram destination.

Section changes should use consistent margins, image edges and short narrative bridges. Avoid adding many divider ornaments or tall empty bands. On phones, put the image close to its related heading, collapse the journey into comfortable stacked links, and maintain the menu's horizontal category browsing.

## Motion proposal and verification limits

A brief fade with at most a 10px upward movement (approximately 350–450ms) can make section entry feel continuous. One reveal per section is enough. Keep text and links present if JavaScript or IntersectionObserver fails. Respect `prefers-reduced-motion`; remove reveal displacement and smooth scrolling for that preference. Avoid parallax, perpetual tickers, delayed controls and staggered animations across every dish.

Motion is our implementation proposal; it is not a behaviour established by the static Mobbin images. Verify anchors, keyboard focus, category changes and branch actions at phone, tablet and desktop widths, including reduced motion and direct hash loading. Cultural naming and original food facts remain governed by the existing sourced content files.
