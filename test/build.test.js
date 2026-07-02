import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

test("index.html was built", () => {
  assert.ok(existsSync("./_site/index.html"), "run `pnpm build` first");
});

const html = readFileSync("./_site/index.html", "utf8");

test("includes the character name from site data", () => {
  assert.match(html, /Sir Placeholder the Bold/);
});

test("renders every content section", () => {
  for (const slug of ["01-intro", "02-backstory", "03-skills", "04-gallery"]) {
    assert.match(
      html,
      new RegExp(`id="section-${slug}"`),
      `missing section #${slug}`,
    );
  }
});

test("has no unrendered template artifacts", () => {
  assert.doesNotMatch(html, /\{\{|\{%|undefined|NaN/);
});
