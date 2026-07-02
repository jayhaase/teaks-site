# AGENTS.md

Instructions for AI coding agents working in this repo. Read this before
making changes.

## What this is

A one-page character site built with Eleventy (static site generator),
deployed to GitHub Pages via GitHub Actions. Content is intentionally kept
in plain Markdown/JSON files so a non-technical person can edit it without
touching templates or code. Preserve that separation in any change you
make.

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

## Content vs. code — don't blur this line

- `content/sections/*.md` and `_data/site.json` are the editable content
  layer. Changes here should only ever require adding/editing a file, not
  touching `_includes/layout.njk`, `index.njk`, or `eleventy.config.js`.
- `content/sections/sections.json` is a directory data file that sets
  `permalink: false` and `layout: false` for every file in that folder.
  Individual section files must **not** need their own `permalink` or
  `layout` frontmatter — if you're adding one, the directory data file is
  broken, fix it there instead.
- Section files only need `title` and `order` in frontmatter (plus
  `images: [{src, alt}]` for the gallery-style section). Don't invent new
  required frontmatter fields without updating `README.md`'s instructions
  for the non-technical editor.

## Things that will break silently if you're not careful

- **Image `alt` text is mandatory.** The `{% image src, alt, sizes %}`
  shortcode in `eleventy.config.js` throws if `alt` is falsy — that's
  deliberate (accessibility), don't work around it by passing an empty
  string.
- **HTML ids must not start with a digit.** Section files are named
  `01-intro.md`, `02-backstory.md`, etc. so they sort correctly, and
  Eleventy's `fileSlug` keeps that numeric prefix (e.g. `01-intro`) rather
  than stripping it. Templates prefix ids with `section-` (e.g.
  `section-01-intro`) to keep them valid — see `index.njk` and
  `_includes/layout.njk`. If you add new id-generating code, keep this
  prefix or html-validate's `valid-id` rule will fail.
- **Nunjucks whitespace control matters here.** `html-validate` runs with
  `no-trailing-whitespace` enabled. Loops/conditionals in `.njk` files use
  `{%-`/`-%}` trim markers on purpose to avoid emitting blank lines. Keep
  that pattern when editing templates.
- The `{% image %}` shortcode writes optimized files to
  `_site/images/optimized/` — source images live in `images/` at the repo
  root, referenced by filename only (no path prefix) from frontmatter/data.

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
