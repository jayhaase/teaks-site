# AGENTS.md

Instructions for AI coding agents working in this repo. Read this before
making changes.

## What this is

A one-page site for Teak, a tree-faery apprentice apothecary character,
built with Eleventy (static site generator), deployed to GitHub Pages via
GitHub Actions. The design follows a handoff doc in `design/` (forest
green/gold palette, Cinzel/Cinzel Decorative/EB Garamond type). Content is
intentionally kept in plain Markdown/JSON files so a non-technical person
can edit it without touching templates or code. Preserve that separation
in any change you make.

## Toolchain

- Package manager is **pnpm** (`packageManager` field in `package.json`
  pins the version) — do not use npm or yarn, do not add a
  `package-lock.json` or `yarn.lock`.
- Node version is pinned in `.nvmrc` (currently 24). Keep `engines.node` in
  `package.json` consistent with it.
- Eleventy config is `eleventy.config.js` (ESM, flat config — this repo is
  `"type": "module"`).

## Commands

```sh
pnpm install         # install deps
pnpm run serve       # dev server with live reload
pnpm run build       # build to _site/
pnpm run lint        # eslint + stylelint + markdownlint
pnpm run format      # prettier --write
pnpm run test        # build + unit + html-validate + a11y (axe) + linkinator
pnpm run validate    # lint + test — this is what CI runs; run it before
                      # considering any change done
```

`_site/` is build output (gitignored) — never hand-edit it, and never
commit it.

`design/` holds design handoff material (mockups, style guides, brand
assets) for reference only — it's listed in `.eleventyignore` and never
gets built or published. Don't wire it into the site.

## Content vs. code — don't blur this line

- `content/sections/*.md` and `_data/site.json` are the editable content
  layer. Changes here should only ever require adding/editing a file, not
  touching `_includes/layout.njk`, `index.njk`, or `eleventy.config.js`.
- `content/sections/sections.json` is a directory data file that sets
  `permalink: false` and `layout: false` for every file in that folder.
  Individual section files must **not** need their own `permalink` or
  `layout` frontmatter — if you're adding one, the directory data file is
  broken, fix it there instead.
- Every section file has a `type` field (`about` | `menu` | `gallery` |
  `find-teak`) that picks which branch of the big `{% if %}` chain in
  `index.njk` renders it — that's what lets each section have a bespoke
  layout while staying data-driven. The four types are fixed; adding a
  genuinely new one requires a new template branch, not just a new content
  file (see `README.md`'s "Adding a genuinely new section"). Editing or
  reordering fields/list items _within_ one of the four existing types is
  content work, not code work.
- Don't invent new required frontmatter fields without updating
  `README.md`'s instructions for the non-technical editor.

## Things that will break silently if you're not careful

- **Image `alt` text is mandatory.** The `{% image src, alt, sizes %}`
  shortcode in `eleventy.config.js` throws if `alt` is falsy — that's
  deliberate (accessibility), don't work around it by passing an empty
  string.
- **HTML ids must not start with a digit.** Section files are named
  `01-about.md`, `02-menu.md`, etc. so they sort correctly, and Eleventy's
  `fileSlug` keeps that numeric prefix (e.g. `01-about`) rather than
  stripping it. Templates prefix ids with `section-` (e.g.
  `section-01-about`) to keep them valid — see `index.njk` and
  `_includes/layout.njk`. If you add new id-generating code, keep this
  prefix or html-validate's `valid-id` rule will fail.
- **Nunjucks whitespace control matters here.** `html-validate` runs with
  `no-trailing-whitespace` enabled. Loops/conditionals in `.njk` files use
  `{%-`/`-%}` trim markers on purpose to avoid emitting blank lines. Keep
  that pattern when editing templates.
- The `{% image %}` shortcode writes optimized files to
  `_site/images/optimized/` — source images live in `images/` at the repo
  root, referenced by filename only (no path prefix) from frontmatter/data.
- All asset URLs (stylesheet, favicon, `{% image %}` output) are
  **relative, not root-absolute** (`styles/style.css`, not
  `/styles/style.css`). This is a GitHub Pages _project_ site, served
  under `/teaks-site/`, not domain root — a leading slash silently 404s in
  production while looking fine in local dev. `site.url` in
  `_data/site.json` holds the one place a fully-qualified absolute URL is
  actually required (OG tags, canonical link).
- **CSS specificity can silently defeat a modifier class.** E.g.
  `.gallery-grid figure { border: ... }` (class + element = higher
  specificity) will beat `.gallery-accent { border-color: ... }` (class
  only) regardless of source order, even though the modifier class is
  meant to override it. Verify with `getComputedStyle(...)` in the
  browser/preview tool when adding a variant class, don't just trust that
  stylelint passing means the cascade does what you intended. Prefer a
  CSS custom-property indirection (`border-color: var(--x, var(--fallback))`,
  then set `--x` on the modifier class) to sidestep specificity fights
  entirely — see `.gallery-accent` in `styles/style.css` for the pattern.

## CI/CD — don't weaken the safety gate

`.github/workflows/ci.yml` has two jobs: `test` (runs on every push and PR)
and `deploy` (`needs: test`, only runs on push to `main`). The whole point
is that a broken build can never reach GitHub Pages. If you touch this
file:

- Keep `deploy` gated behind `needs: test`.
- Keep it scoped to `github.ref == 'refs/heads/main'` for the deploy job.
- Don't add `continue-on-error` to any of the lint/test steps.

`.github/dependabot.yml` sets `cooldown.default-days: 3` for both the npm
and github-actions ecosystems on purpose (supply-chain safeguard — a newly
published package version must be public for 3 days before Dependabot will
open a PR for it). Don't remove this without being asked.

## Before finishing any task

Run `pnpm run validate`. It must pass — this is exactly what CI enforces,
so if it fails locally the PR will fail too.
