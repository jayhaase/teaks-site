import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

test("index.html was built", () => {
  assert.ok(existsSync("./_site/index.html"), "run `pnpm build` first");
});

const html = readFileSync("./_site/index.html", "utf8");

test("includes the character name from site data", () => {
  assert.match(html, /Teak/);
});

test("renders every content section", () => {
  for (const slug of ["01-about", "02-menu", "03-gallery", "04-find-teak"]) {
    assert.match(
      html,
      new RegExp(`id="section-${slug}"`),
      `missing section #${slug}`,
    );
  }
});

test("renders all four potion cards", () => {
  for (const title of [
    "Dreamcatcher's Draught",
    "Lionheart Draught",
    "Fortune's Favor",
    "Mischief Brew",
  ]) {
    assert.ok(html.includes(title), `missing potion card: ${title}`);
  }
});

test("renders at least one gallery image", () => {
  const figureCount = (html.match(/<figure/g) ?? []).length;
  assert.ok(figureCount > 0, "gallery should have at least one image");
});

test("every gallery thumbnail has a lightbox trigger with a full-size image", () => {
  const triggers = [
    ...html.matchAll(
      /<button type="button" class="gallery-trigger" data-full="([^"]+)"/g,
    ),
  ];
  assert.ok(triggers.length > 0, "no gallery-trigger buttons found");
  for (const [, fullSrc] of triggers) {
    assert.ok(fullSrc.length > 0, "gallery-trigger missing data-full URL");
  }
});

test("lightbox dialog markup is present", () => {
  assert.match(html, /<dialog id="lightbox"/);
  assert.match(html, /scripts\/lightbox\.js/);
});

test("has no unrendered template artifacts", () => {
  assert.doesNotMatch(html, /\{\{|\{%|undefined|NaN/);
});
