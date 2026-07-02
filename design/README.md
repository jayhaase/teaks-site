# Handoff: Teak's Apothecary — One-Page Website

## Overview
A one-page promotional/informational website for "Teak," a renaissance-festival character (a tree faery apprentice alchemist who runs an "apothecary" booth). The page introduces Teak, lists her potion offerings, shows a photo gallery, lists festival appearances, and gives contact info.

## About the Design Files
The file in this bundle (`teak-apothecary-2a.dc.html`) is a **design reference built in HTML** — a high-fidelity prototype showing intended look, layout, and copy. It is not production code to copy wholesale. Recreate this design in the target codebase's existing environment (plain HTML/CSS, React, a static site generator, Squarespace/Webflow custom code block, etc. — whichever the project already uses, or the simplest appropriate choice if this is a fresh build: a static site is almost certainly sufficient since there are no dynamic interactions).

Note: all image areas in the file are striped placeholder blocks with a monospace caption describing what real photo/art should go there (e.g. "POTION SHELF photo"). These must be swapped for real assets — do not ship the placeholders.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy are final-direction (client-approved: dark forest-green/gold palette + Cinzel/EB Garamond typefaces, layered on an "old scroll" structural layout). Recreate pixel-close, swapping in real photography where placeholders appear.

## Screens / Views
Single scrolling page, one view, in this vertical order:

1. **Scroll rod (top)** — decorative 30px wooden-dowel bar (linear-gradient brown), purely ornamental, full width of the page container.
2. **Hero** — centered content, max-width 760px, on a radial dark-green background with a faint diagonal stripe overlay.
   - Wax-seal medallion: 64×64 circle, radial-gradient gold/red is NOT here (it's gold — see tokens), letter "T" centered, Cinzel Decorative 900 22px.
   - Eyebrow: "Herein Recorded, the Apothecary of" — Cinzel 600, 14px, letter-spacing .3em, uppercase, gold (#c9a84c).
   - H1: "Teak" — Cinzel Decorative 900, 104px, line-height 1, cream (#f2ead0), soft gold text-shadow.
   - Subhead paragraph — EB Garamond italic, 21px, line-height 1.7, max-width 560px, sage (#cfd6c4).
   - Two CTAs side by side: filled gold pill/rect "Enter the Apothecary" (dark text on gold bg) and outlined "Seek Her at Faire" (cream text, translucent cream border). Both Cinzel 600 15px uppercase, 16px/32px padding, no border-radius (square-cornered, manuscript feel).
3. **Ornamental divider** — thin horizontal rule + centered 10×10 gold diamond (rotated square), repeats between every section.
4. **About ("Chapter I · Her Tale")** — 2-column grid (1fr / 1.3fr), image placeholder left (400px tall, double 6px gold border), copy right: eyebrow label, H2 "Of Curious Craft" (Cinzel Decorative 900 44px), two body paragraphs (EB Garamond 19px/1.85).
5. **Potion Menu ("Chapter II · Her Wares")** — centered header (eyebrow + H2 "The Potion Ledger", 46px), then a 4-column grid of potion cards. Each card: bordered box, placeholder image (105px), Cinzel 19px title, EB Garamond 15px description. Cards: Sweet Slumber (sleep aid), Lionheart Draught (courage), Fortune's Favor (luck), Unlabeled Brew (mystery — styled with a distinct purple border/bg to set it apart). Italic disclaimer line below the grid about side effects (frog jokes included intentionally — matches character voice).
6. **Gallery ("Chapter III · Illustrations")** — centered header, then an asymmetric 3-column / 2-row photo grid (one tall hero image left spanning both rows, four smaller images filling the right 2×2).
7. **Find Teak / Contact ("Chapter IV & V")** — 2-column grid: left = "This Season's Faires" list (3 rows, date + faire name, flex justify-between, divider lines between rows); right = "Send Word" contact blurb + a filled gold email pill (not a real mailto link in the mock — wire one up).
8. **Footer band** — dark full-width bar, centered italic closing line: "Thus concludes this ledger · herein sealed by Teak, apprentice fae".
9. **Scroll rod (bottom)** — mirror of the top rod, gradient reversed.

## Interactions & Behavior
This is a static informational page — no complex interactions in the mock. For production:
- Both hero CTAs should scroll-link or route to the Potion Menu and Find Teak sections respectively (or to a booking page if one exists).
- The email pill in the contact section should be a real `mailto:` link.
- No animations were specified by the client; a subtle fade/slide-in on scroll for each section would suit the tone but is optional — confirm with client before adding.
- Fully responsive behavior was not designed (this is a desktop-width mock, 1280px). Recreate mobile layout by stacking the 2-column grids and reducing the H1/H2 sizes proportionally.

## State Management
None — purely static content, no forms, no fetched data.

## Design Tokens

**Colors**
- Background (deep forest): `#182618`
- Background (hero radial light end): `#1f331f`
- Panel background (menu cards / about text panel): `#1f301f`
- Mystery-potion card background: `#251c2e` / border `#452f52`
- Divider / hairline: `#4a5c3a`
- Gold accent (primary): `#c9a84c`
- Gold accent (darker, rods/borders): `#7a5c22`, `#a8863f`
- Cream (headlines): `#f2ead0`
- Sage (body text on dark): `#cfd6c4`, `#b8c2ab`, `#dbe3cf`
- Muted footer text: `#7a8570`
- Wooden rod gradient: `#7a5c22 → #5a4319 → #3a2c10`

**Typography**
- Display headings: **Cinzel Decorative**, weight 900
  - H1 (hero): 104px / line-height 1
  - H2 (section): 40–46px
- Small caps / eyebrows / labels / buttons: **Cinzel**, weight 600, letter-spacing .3em (labels) or .08em (buttons), uppercase
- Body copy: **EB Garamond**, regular and italic
  - Hero subhead: 21px italic / 1.7
  - Paragraph body: 19px / 1.85
  - Card copy: 15px / 1.6
- Google Fonts import: `Cinzel Decorative:wght@700;900`, `Cinzel:wght@500;600`, `EB Garamond:ital,wght@0,400;0,500;0,600;1,400`

**Spacing / Layout**
- Page container: fixed 1280px wide, centered
- Section horizontal padding: 80–90px
- Section vertical padding: 80–100px
- Card grid gaps: 24–28px
- No border-radius anywhere (deliberately square/manuscript-flavored corners) except the wax-seal circle
- Dividers: 1px hairline + 10px rotated-square diamond, centered, 16px gap either side

**Shadows**
- Hero: `inset 0 30px 40px -30px rgba(0,0,0,.5)`, `inset 0 -30px 40px -30px rgba(0,0,0,.4)`
- H1 text-shadow: `0 0 40px rgba(201,168,76,.3)`
- Rod bars: `0 4px 10px rgba(0,0,0,.5)`

## Assets
All imagery is placeholder (striped CSS gradient blocks with monospace captions). Real assets needed:
- Hero/portrait shot of Teak in costume
- Potion vial product shots ×4 (sleep, courage, luck, mystery)
- Gallery: forest archway, dried herbs, mortar & pestle, Teak in costume (candid), mushroom cluster
- Optional: a real wax-seal or sigil graphic to replace the CSS circle-with-letter

## Files
- `teak-apothecary-2a.dc.html` — the full design reference described above (this is a Design-Component-format HTML file; open it directly in a browser to view/inspect — it renders standalone).
