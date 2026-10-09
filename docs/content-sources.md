# Content and asset sources

Research and visual verification completed on **9 October 2026** (Asia/Kuala_Lumpur).

## Source hierarchy

1. **User-supplied menu**: `Menu Ayam Kremes_.pdf`; unchanged public copy at `/menu/ayam-kremes-menu.pdf` (25,699,665 bytes / 24.5 MiB). This is a one-page, two-panel raster menu. Its PDF creation metadata is 9 February 2023; this is **not** a confirmed menu publication date or assurance of current prices. The entire page was rendered at 3508 × 2481 and read visually, including enlarged left panel, right panel and drinks crops. There was no extractable text, so all 39 names, descriptions, prices and drink variants were manually checked against rendered pixels. No OCR-only claims were accepted.
2. **Official restaurant Instagram**: [@ayamkremes_my](https://www.instagram.com/ayamkremes_my/). The public profile and the caption of [the restaurant post dated 8 May 2026](https://www.instagram.com/ayamkremes_my/p/DYGVUFaD3_D/) were read through the browser. This post explicitly supplies both addresses, telephone numbers and opening hours. The web text fetch could not access Instagram, but the public browser view displayed the caption. A sign-in overlay did not conceal the caption from the rendered page; no account was used.
3. **User-supplied food photography**: [Pantai Timur by Simplepix.food](https://simplepixfood.pixieset.com/pantaitimur/), especially its [Creative collection](https://simplepixfood.pixieset.com/pantaitimur/creative/). The gallery was visually inspected in the browser and its observed image assets were saved locally using the browser asset export capability. No stock or generated food photographs are used. Selected photos depict the same plates and arrangements as the code-labelled photographs in the supplied menu.
4. **Secondary conflict check only**: [Foodpanda Kota Damansara](https://www.foodpanda.my/restaurant/f1co/ayam-kremes-by-sarang-kota-damansara/reviews) and [Foodpanda Cabang Tiga](https://www.foodpanda.my/restaurant/o5g1/ayam-kremes-by-sarang-cabang-tiga). These corroborate the branch addresses but describe delivery listings with their own times and prices. They do not override the supplied menu or official dine-in hours. The public site does not publish their ratings, certification labels or delivery availability.

## Verified branch details

| Branch           | Official address                                                                                      | Official hours                                    | Official telephone |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------ |
| Kota Damansara   | A-G-11, Kompleks Perindustrian Emhub, Persiaran Surian, Kota Damansara, 47810 Petaling Jaya, Selangor | Every day, 11am–10pm                              | 03-6143 4188       |
| Kuala Terengganu | 13, Tingkat Bawah, Pusat Komersial Chabang Tiga, 21000 Kuala Terengganu, Terengganu                   | Every day except Friday, 11am–10pm; Friday closed | 09-626 1518        |

Both rows come from the official 8 May 2026 Instagram caption, checked 9 October 2026. The directions links use the standard Google Maps directions URL with the restaurant name and official address encoded as the destination. **These are generated address searches, not restaurant-supplied pin URLs.** Browser/map users may be asked for their starting point. Telephone links should use Malaysian international numbers `+60361434188` and `+6096261518`; the public display preserves the local form. No WhatsApp number is assumed from a telephone number.

## Conflicts and explicit decisions

- **Currency:** the supplied PDF has numeric prices only, without `RM`, `MYR` or a currency symbol. The JSON preserves the printed numeric values as strings. Do not add a currency until the restaurant confirms it. The website must make clear that these are the numbers printed in the supplied menu, subject to branch confirmation.
- **Current prices:** the PDF's metadata dates to 2023. Foodpanda now lists items such as `Set Ayam Kremes with Rice` at RM 20.90 before its displayed promotion, while the PDF lists `Ayam Kremes` at `15` and rice separately at `2`. These are different product/channel presentations; they must not be merged or silently treated as a price update. The supplied PDF is the release's menu source, and current dine-in prices require confirmation.
- **Opening hours:** official Instagram states 11am–10pm for both branches, with Friday closed only at Kuala Terengganu. Foodpanda displays 11am–9.30pm for Kota Damansara and 11am–9pm on Saturday–Thursday for Cabang Tiga. The site uses official Instagram hours and does not describe the delivery windows as dine-in hours. Holiday exceptions remain unverified.
- **Rice and sides:** the PDF lists `Nasi Putih` separately. Although photographs show rice, tofu and vegetables in styled arrangements, no inclusive set or side promise has been added to the dish copy.
- **Photography:** the PDF itself says “Pictures are for illustration purpose only.” Photos on this site come from the supplied restaurant gallery. Presentation and portions should not be promised beyond the menu descriptions. A photograph is named for a dish only where the PDF's dish-code-labelled plate supports that match. General table images have general captions.
- **Certification and dietary claims:** the Instagram profile exposes a “HALAL CERT” highlight, but no current certificate was reviewed. No certification, allergen-free, vegetarian, vegan or other dietary claims are published.
- **Ordering:** third-party delivery listings were found, but no ordering link supplied or confirmed by the restaurant was available. Ordering, reservations and WhatsApp actions are omitted for this release.
- **Restaurant story:** no approved history, founding date, sourcing claim, awards, reviews, “bestseller” claim or chef biography was available. The feature choices are editorial, labelled “featured”. The friendly tagline and section introductions are original proposed website copy, not historical facts.

## Menu transcription ledger

Capitalisation and sentence punctuation are lightly normalised for readability; substantive names, descriptions and numbers follow the supplied PDF. Category order is an editorial decision to place Kremes first. Original menu IDs remain stable.

| ID  | Name                                         | Printed price / variant |
| --- | -------------------------------------------- | ----------------------- |
| K01 | Ayam Kremes                                  | 15                      |
| K02 | Lele Kremes                                  | 15                      |
| K03 | Bawal Kremes                                 | 20                      |
| K04 | Udang Kremes                                 | 15                      |
| K05 | Cumi Kremes                                  | 25                      |
| K06 | Dendeng Kremes                               | 15                      |
| K07 | Iga Kremes                                   | 30                      |
| B01 | Ayam Bakar Madu                              | 15                      |
| B02 | Ikan Bawal Bakar Bumbu Rujak                 | 20                      |
| B03 | Cumi Bakar Bumbu Rujak                       | 25                      |
| B04 | Iga Bakar                                    | 30                      |
| A01 | Emping with Sambal                           | 6                       |
| A02 | Keripik Tempe with Sambal                    | 6                       |
| A03 | Tahu Tempe Telur with Sambal                 | 8                       |
| A04 | Bakso Goreng                                 | 8                       |
| A05 | Perkedel Kentang Ayam                        | 10                      |
| V01 | Gado Gado                                    | 15                      |
| V02 | Terung Kremes Balado                         | 10                      |
| V03 | Kobis Kremes                                 | 10                      |
| S01 | Soto Betawi Daging                           | 20                      |
| S02 | Soto Betawi Ayam                             | 15                      |
| S03 | Sup Sayur Asem                               | 12                      |
| D01 | Teh O                                        | Iced 4; Hot 3           |
| D02 | Teh Tarik                                    | Iced 5; Hot 4           |
| D03 | Signature Lemongrass Limeade with Daun Limau | Iced 9; Hot 8           |
| D04 | Iced Lychee Jasmine Soda                     | 9                       |
| D05 | Iced Matcha Latte                            | 9                       |
| D06 | Premium Hot Tea Bag                          | 6                       |
| D07 | Teh Botol Sosro                              | 6                       |
| D08 | Teh Pucuk Harum                              | 5                       |
| D09 | Air Tin                                      | 5                       |
| D10 | Mineral Water                                | 4                       |
| T01 | Nasi Putih                                   | 2                       |
| T02 | Kremesan                                     | 2                       |
| T03 | Sambal Terasi                                | 3                       |
| T04 | Sambal Ijo                                   | 3                       |
| T05 | Sambal Balado                                | 3                       |
| T06 | Sambal Kicap Bakar                           | 3                       |
| T07 | Sambal Soto                                  | 3                       |

Kremes category instruction: choose one sambal from terasi, ijo or balado. The add-on section independently lists five sambals: Terasi, Ijo, Balado, Kicap Bakar and Soto. No heat ranking has been invented. For the drinks without separate variants, the printed number is retained without adding availability claims.

## Asset-to-dish mapping

All photographs are served locally as WebP. The hero uses the 1600 × 1067 gallery lightbox asset; the other selected creative photos use the gallery's supplied 640px previews, appropriate for compact dish thumbnails. The logo is a 283 × 285 PNG crop from the actual supplied menu. Higher resolution menu photography and a vector logo can replace them later at the same paths. Cropping, resizing and compression are technical adaptations; no food was generated or retouched.

| Public asset                         | Image identity / evidence                                                                                                                    | Original source                                                                             |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `/images/ayam-kremes.webp`           | DSC_4112; Ayam Kremes, matched to PDF photo K01.                                                                                             | [Source](https://images.pixieset.com/74672165/0ea5ff2268a3c3c533767efee677c81f-large.jpg)   |
| `/images/ayam-bakar-madu.webp`       | DSC_2135; Ayam Bakar Madu, matched to PDF photo B01.                                                                                         | [Source](https://images.pixieset.com/74672165/f5caec57ef3260f578105ba7e6852a2d-large.jpg)   |
| `/images/bawal-kremes.webp`          | DSC_4107; Bawal Kremes, matched to PDF photo K03.                                                                                            | [Source](https://images.pixieset.com/74672165/02d0f720d55cdfc3c94571b1f4377ceb-large.jpg)   |
| `/images/udang-kremes.webp`          | DSC_2119; Udang Kremes, matched to PDF photo K04.                                                                                            | [Source](https://images.pixieset.com/74672165/57e911f3dcff53cef770be0517a2209d-large.jpg)   |
| `/images/lele-kremes.webp`           | DSC_4118; Lele Kremes, matched to PDF photo K02.                                                                                             | [Source](https://images.pixieset.com/74672165/0a1b854c19b7daf7ef96adbecc6844c8-large.jpg)   |
| `/images/cumi-bakar.webp`            | DSC_4137; Cumi Bakar Bumbu Rujak, matched to PDF photo B03.                                                                                  | [Source](https://images.pixieset.com/74672165/af64df57f5967bb4ba2d75fa97fce771-large.jpg)   |
| `/images/gado-gado.webp`             | DSC_4097; Gado Gado, matched to PDF photo V01.                                                                                               | [Source](https://images.pixieset.com/74672165/62196d785bed644c6963f16014d59675-large.jpg)   |
| `/images/soto-betawi-daging.webp`    | DSC_4102; Soto Betawi Daging, matched to PDF photo S01.                                                                                      | [Source](https://images.pixieset.com/74672165/800340a30124f3405c0272deeaa1dca1-large.jpg)   |
| `/images/perkedel-kentang-ayam.webp` | DSC_2125; Perkedel Kentang Ayam, matched to PDF photo A05.                                                                                   | [Source](https://images.pixieset.com/74672165/9d0a5ca8854976a16c5b078583206d9a-large.jpg)   |
| `/images/emping.webp`                | DSC_4133; Emping with Sambal, matched to PDF photo A01.                                                                                      | [Source](https://images.pixieset.com/74672165/08a00857263c75af1bb93f8d7087791c-large.jpg)   |
| `/images/keripik-tempe.webp`         | DSC_4129; Keripik Tempe with Sambal, matched to PDF photo A02.                                                                               | [Source](https://images.pixieset.com/74672165/093cc54a47fbcf554fda34e5048c29d9-large.jpg)   |
| `/images/the-sarang-table.webp`      | DSC_2286; styled restaurant food spread; use general caption only.                                                                           | [Source](https://images.pixieset.com/74672165/d0e0bda94b2f89ac55b705694872d6f7-large.jpg)   |
| `/images/sambal-selection.webp`      | DSC_2284; four sambal bowls, matching the T03/T04/T06/T07 sauce arrangements in PDF.                                                         | [Source](https://images.pixieset.com/74672165/bff55580bbd1f81140614a996638f68b-large.jpg)   |
| `/images/lemongrass-limeade.webp`    | DSC_2144; Signature Lemongrass Limeade with Daun Limau, matched to PDF photo D03.                                                            | [Source](https://images.pixieset.com/74672165/85e5fa956c58d565c68bd7c0659c8702-large.jpg)   |
| `/images/lychee-jasmine-soda.webp`   | DSC_2151; Iced Lychee Jasmine Soda, matched to PDF photo D04.                                                                                | [Source](https://images.pixieset.com/74672165/b94f4eba84b927083cd268b0a044deeb-large.jpg)   |
| `/images/sharing-at-the-table.webp`  | DSC_2302; hands presenting dishes at the restaurant table; use general caption only.                                                         | [Source](https://images.pixieset.com/74672165/1f241e2aaa8dabfb030070ca6c752129-large.jpg)   |
| `/images/sambal-dip.webp`            | DSC_2298; Perkedel Kentang Ayam being dipped into sambal, matched to PDF A05.                                                                | [Source](https://images.pixieset.com/74672165/9f830f03db35d1305fd7ea3b2e36a5c3-large.jpg)   |
| `/images/ayam-kremes-hero.webp`      | DSC_4112, 1600 × 1067; Ayam Kremes image matched to PDF K01. Rice appears separately in photograph; inclusion in dish price is not asserted. | [Source](https://images.pixieset.com/74672165/0ea5ff2268a3c3c533767efee677c81f-xxlarge.jpg) |
| `/images/logo.png`                   | Original circular restaurant logo cropped from upper-left of supplied menu.                                                                  | [Source](/menu/ayam-kremes-menu.pdf#page=1)                                                 |

The supplied gallery is by Simplepix.food. The user explicitly supplied it as the food photography input. Separate licensing documents were not included. Preserve this attribution ledger if files are renamed. Only selected final assets are stored in `public/images`; raw exports and contact sheets are temporary research files outside the repository.

## Editorial schema and updates

`src/content/restaurant.json` is the single content source. Menu IDs match the PDF: A (appetizers), K (kremes), B (bakar), V (vegetables), S (soups), D (drinks), T (add-ons). `source` values support future editorial checks. `featured` is a website selection, not a sales ranking. Image URLs are local absolute public paths; `assets` records their original source and dish matches. `unresolved` is an editorial checklist, not customer-facing copy.

When updating prices, first confirm currency, branch scope, tax/service-charge treatment and whether rice/sides are included. When updating branches, use a restaurant-confirmed map pin, current hours and a confirmation date. Remove a source conflict only after a reliable new source resolves it.
