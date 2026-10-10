# Design review and implemented upgrade: Sarang

Reviewed on **10 October 2026** using the user-selected [apple-design skill](/Users/nurhanfawwaz/.agents/skills/apple-design/SKILL.md). This is a responsive React/Vite restaurant website for people choosing food and finding a branch. Apple’s foundations apply as design principles; native tab bars, window menus and Liquid Glass conventions do not apply to this website.

## Summary

The starting design was **Good**: original food photographs, the restaurant seal, a consistent warm palette and accurate bilingual content already supplied a clear identity. Its job is to help visitors choose food and continue to a branch. The upgrade makes the food and those decisions more immediate, with familiar controls around them.

The review used the running site, its CSS/data, real computed type sizes, and contrast calculated from hex values. It loaded accessibility, layout, typography, color, designing-for-iOS, cross-platform, buttons, sidebars, collections, branding, writing and motion references. Hardware-specific display/lighting behaviour and a full assistive-technology audit are outside this review.

## Improvements identified and resolved

- **High — category discovery:** at the inspected 404px phone width the horizontally scrolled selected Vegetables label was cropped. A labelled native HTML `select` now exposes all seven categories on compact widths. Desktop keeps its familiar one-level rail. `accessibility.md › Mobility`: “Offer alternatives to gestures.”
- **Medium — reading comfort:** phone dish descriptions were 14px. They are now 17px with 1.7 line-height, and menu type uses `rem` so the reading text responds to font-size settings. `typography.md › Ensuring legibility`: “Use font sizes that most people can read easily.” This is a web readability choice, not a claim that CSS pixels are native points.
- **Medium — food priority:** the initial food position was about 694px down the document in the inspected 404px view. The shorter introduction removes the repeated general table photograph and decorative seam. `layout.md › Visual hierarchy`: “Order content by relative importance.”
- **Medium — continuation:** category browsing ended without an adjacent-category action. Previous/next buttons now continue the menu, move keyboard focus to the new heading, and preserve the category query. A clear invitation leads to branches, while a compact branch link remains available beside the phone picker. `writing.md › Best practices`: “Be action oriented.”
- **Low — composition and accessories:** single-photo categories now pair the verified photo with its description on wide screens, and stack naturally on compact screens. Homepage category ordinals were removed because categories are not a sequence. This is design judgment. `branding.md › Best practices`: “Ensure branding always defers to content.”

## Compact design system

The user’s cream/forest/orange direction is retained for a reason: the photographs already contain wooden tables, green leaves, white ceramics and golden kremes. The signature is the actual food in generous, lightly rounded frames; a generic glass surface or a new ornament would compete with it. The plan was checked against a different-product brief: the palette is a requested existing brand direction, and the subject-specific identity comes from Sarang’s own food and language rather than interchangeable decoration.

| Role                   | Light surface | Existing dark story/footer surface | Contrast against its surface                 |
| ---------------------- | ------------- | ---------------------------------- | -------------------------------------------- |
| Surface                | `#f5f0e5`     | `#244638`                          | Backgrounds                                  |
| Primary content/action | `#244638`     | `#f5f0e5`                          | 9.20:1 in both directions                    |
| Secondary reading text | `#586256`     | `#d8dfd0`                          | 5.61:1 / 7.66:1                              |
| Clay/food accent       | `#a53e28`     | `#efb995`                          | 5.57:1 / 6.00:1                              |
| Warm utility accent    | `#795742`     | `#d2be9e`                          | 5.68:1 / 5.78:1                              |
| Decorative separator   | `#d9d2c2`     | `#506955`                          | Decoration, never the only control/state cue |

The dark column describes the palette for the existing dark regions; `#d2be9e` is a reserved warm utility equivalent. Some original primary text retains `#20382d` ink. Ratios above refer to the exact listed pairs. This revision does not introduce a system dark mode. `prefers-contrast: more` strengthens separators and reading text. The site uses opaque surfaces, so reduced transparency requires no blur fallback. Selected desktop categories also show a check mark, making selection visible without relying on color alone.

Fraunces remains the restrained display/dish face; DM Sans remains the readable body/control face. Menu scale: 36–56px opening heading, 32–42px category heading, 26px dish names, 16px desktop / 17px compact reading text, 12–15px utilities. No extra font or runtime dependency was added. Targets are at least 44px, with 48px menu selection/continuation controls.

Layout: the opening is short, then navigation and actual dishes take over; content rearranges with available space and text size.

```text
Regular                         Compact
Header + EN/BM                  Header + EN/BM
Short menu title + PDF           Short menu title + PDF
Categories | Category heading   Category picker | Branch link
           | Photo / Photo      Category heading
           | Names + prices     Photo, name, price, description
           | Text dishes        Text dishes
           | Previous / Next    Previous / Next
           | Branch invitation  Branch invitation
           | Source/PDF note    Source/PDF note
```

Motion: no category slides or entrance animation. Selection changes immediately; hover/press backgrounds explain interaction. `motion.md › Providing feedback`: “In apps, generally avoid adding motion to UI interactions that occur frequently.” Reduced-motion also removes global smooth scrolling and transitions.

## Files and verification

Menu UI/layout: `src/components/MenuPage.tsx`, `menu-page.css`. Shared reading styles/footer: `src/styles.css`. Homepage invitation: `src/components/MenuPreview.tsx`. New EN/BM labels: `src/content/translations.ts`. `ResizeObserver` measures the compact toolbar for accurate anchor clearance as text/labels resize, without per-frame React state.

Restaurant facts, original names, price strings, variants, all 13 verified dish-photo mappings, branch data and the supplied PDF remain unchanged. No new food claim, order system or substitute food photography was introduced.

Completed: TypeScript/production build, formatting, three content tests, and all sixteen browser tests pass. Both pages were checked in EN/BM at 390, 768 and 1440px, including loaded photography, no horizontal overflow and axe accessibility. The 200% text test passes on both pages in both languages at 320px, and checks the last desktop category at 1280×600. It caught and resolved a wrapping Instagram link and a long Malay branch-invitation heading. Manual CUA review inspected the compact picker and the one-photo desktop composition. The focused `tests/browser/menu-flow.spec.ts` checks native category selection, keyboard continuation/focus, branch handoff, and 200% text sizing on both pages in both languages. Existing source integrity, EN/BM, responsive images and accessibility checks remain in the suite. This revision is local on `codex/indonesian-table`; production has not been updated.
