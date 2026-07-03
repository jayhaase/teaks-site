# Mischief Additions — Teak's Apothecary

These are new "fun and mischievous" touches layered on top of the site you already built. They're additive only — no existing layout, copy, or structure changes. Everything below is plain HTML/CSS/vanilla JS so it drops into the static site as-is (no framework needed).

Reference mock: `teak-apothecary-2a.dc.html` (open directly in a browser) shows all of this live — click things.

## Assets (new)
In `mischief-assets/`:
- `sparkle.svg` — gold 8-point sparkle
- `toadstool.svg` — red-cap toadstool doodle
- `frog.svg` — winking green frog doodle (the "after" state when a toadstool is clicked)

Use these as real `<img>`/inline-SVG assets instead of hand-recreating the div-shapes from the mock — cleaner and easier to maintain.

## 1. Sparkles in the hero
Three small sparkles scattered near the title, gently pulsing. Purely decorative, no interaction.

```css
@keyframes sparkle-pulse {
  0%, 100% { opacity: .35; transform: scale(.85) rotate(0deg); }
  50%      { opacity: 1;   transform: scale(1.2) rotate(20deg); }
}
.sparkle {
  position: absolute;
  width: 14px; height: 14px;
  background: url('assets/sparkle.svg') no-repeat center / contain;
  animation: sparkle-pulse 3s ease-in-out infinite;
}
```
Place 3 `<div class="sparkle" style="top:...;left:...">` at varied positions/sizes/delays inside the hero.

## 2. Toadstool → frog doodles (click to transform)
Two small toadstool doodles (one in the hero, one above the Gallery heading) that flip into a winking frog on click, and back on a second click. Callback to Teak's whole "might turn you into a frog" bit.

```html
<button class="doodle-toggle" aria-label="tap the mushroom" style="top:38px;right:110px">
  <img src="assets/toadstool.svg" class="doodle-mushroom" alt="">
  <img src="assets/frog.svg" class="doodle-frog" alt="" hidden>
</button>
```
```css
.doodle-toggle {
  position: absolute;
  width: 40px; height: auto;
  background: none; border: none; padding: 0; cursor: pointer;
  animation: doodle-bob 4s ease-in-out infinite;
  transform-origin: bottom center;
}
@keyframes doodle-bob {
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50%      { transform: translateY(-4px) rotate(-2deg); }
}
.doodle-toggle img { width: 100%; display: block; }
```
```js
document.querySelectorAll('.doodle-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const mushroom = btn.querySelector('.doodle-mushroom');
    const frog = btn.querySelector('.doodle-frog');
    const isFrog = !frog.hidden;
    mushroom.hidden = !isFrog;
    frog.hidden = isFrog;
  });
});
```

## 3. Hover wobble on buttons + potion cards
CTA buttons and all four Potion Ledger cards get a playful tilt + lift on hover (desktop) — the mystery/"Unlabeled Brew" card tilts the opposite direction and gets a purple-tinted border to stand out.

```css
.cta, .potion-card {
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s, border-color .25s;
  cursor: pointer;
}
.cta:hover           { transform: rotate(-1.5deg) scale(1.05); box-shadow: 0 8px 18px rgba(0,0,0,.35); }
.cta.outline:hover    { transform: rotate(1.5deg) scale(1.05); }
.potion-card:nth-child(odd):hover  { transform: rotate(-1.5deg) translateY(-8px); box-shadow: 0 14px 24px rgba(0,0,0,.35); border-color: #c9a84c; }
.potion-card:nth-child(even):hover { transform: rotate(1.5deg) translateY(-8px); box-shadow: 0 14px 24px rgba(0,0,0,.35); border-color: #c9a84c; }
.potion-card.mystery:hover { transform: rotate(2deg) translateY(-8px) scale(1.03); border-color: #cfa9e6; }
```
The site logo/wordmark "Teak" in the nav also gets a small wiggle on hover: `transform: rotate(-6deg) scale(1.08)`. The wax-seal "T" medallion in the hero gets a bigger wobble: `transform: rotate(18deg) scale(1.12)`.

## 4. Click-to-reveal joke on "Unlabeled Brew"
Clicking the mystery potion card swaps its description text and shows/hides a small italic hint line. Toggle a class on click:

```html
<div class="potion-card mystery" id="mystery-card">
  <p class="mystery-text">Its purpose is unrecorded. Drink at thine own delight.</p>
  <p class="mystery-hint">— tap to peek at tonight's batch notes —</p>
</div>
```
```js
const card = document.getElementById('mystery-card');
const textEl = card.querySelector('.mystery-text');
const hintEl = card.querySelector('.mystery-hint');
const closedText = "Its purpose is unrecorded. Drink at thine own delight.";
const openText = "Tonight's batch: fizzy, faintly green, and smells suspiciously like victory. Or pond water. Hard to say.";
const closedHint = "— tap to peek at tonight's batch notes —";
const openHint = "— tap to reseal the mystery —";
let open = false;
card.addEventListener('click', () => {
  open = !open;
  textEl.textContent = open ? openText : closedText;
  hintEl.textContent = open ? openHint : closedHint;
});
```

## 5. Footer wink
Appended a small aside to the closing line, with a hover color shift:
> Thus concludes this ledger · herein sealed by Teak, apprentice fae (no frogs were *permanently* harmed)

```css
.footer-line { transition: color .25s; }
.footer-line:hover { color: #cfa9e6; }
```

## Notes for implementation
- All of this is progressive enhancement — if JS fails to load, the toadstool/frog stays a toadstool and the mystery card just shows its default copy. Nothing breaks.
- Keep hover-only effects touch-friendly: on mobile, the click-to-reveal (mystery card, doodle toggle) already works via tap; the hover-only tilt effects simply won't trigger on touch devices, which is fine.
- Match existing site colors/fonts already in use (Cinzel / Cinzel Decorative / EB Garamond, forest-green + gold palette) — no new tokens introduced here.
