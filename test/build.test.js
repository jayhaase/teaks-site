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
    "Sweet Slumber",
    "Lionheart Draught",
    "Fortune's Favor",
    "Unlabeled Brew",
  ]) {
    assert.ok(html.includes(title), `missing potion card: ${title}`);
  }
});

test("renders all five gallery images", () => {
  const figureCount = (html.match(/<figure/g) ?? []).length;
  assert.equal(figureCount, 5);
});

test("has no unrendered template artifacts", () => {
  assert.doesNotMatch(html, /\{\{|\{%|undefined|NaN/);
});
