import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import axeSource from "axe-core";

const html = readFileSync("./_site/index.html", "utf8");
const dom = new JSDOM(html, {
  url: "http://localhost/",
  runScripts: "dangerously",
  pretendToBeVisual: true,
});
const { window } = dom;

// Injected as a real <script> (rather than window.eval) so jsdom executes it
// in the window's own script context, which is what lets axe-core's UMD
// wrapper detect `window` and attach itself as `window.axe`.
const axeScript = window.document.createElement("script");
axeScript.textContent = axeSource.source;
window.document.head.appendChild(axeScript);

const results = await window.axe.run(window.document, {
  rules: {
    // jsdom has no real layout/rendering engine, so rules that depend on
    // computed visual contrast or position can't run reliably here.
    "color-contrast": { enabled: false },
  },
});

if (results.violations.length > 0) {
  console.error(
    `Accessibility violations found (${results.violations.length}):\n`,
  );
  for (const violation of results.violations) {
    console.error(`- [${violation.impact}] ${violation.id}: ${violation.help}`);
    for (const node of violation.nodes) {
      console.error(`    ${node.target.join(", ")}`);
    }
  }
  process.exit(1);
}

console.log(
  `Accessibility check passed (${results.passes.length} rules checked).`,
);
