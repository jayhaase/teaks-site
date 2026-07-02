# teaks-site

A one-page character site, built with [Eleventy](https://www.11ty.dev/) and
deployed automatically to GitHub Pages. Content lives in plain Markdown and
JSON files, separate from the page design, so it can be edited safely
without touching any code.

## Editing content

Everything you'd normally want to change lives in `content/` or `_data/`.
You never need to touch the other folders.

### Edit existing text

Open any file in `content/sections/` — each one is a section of the page,
written in [Markdown](https://www.markdownguide.org/basic-syntax/):

- `01-intro.md` — the introduction
- `02-backstory.md` — backstory
- `03-skills.md` — skills & talents
- `04-gallery.md` — photo gallery

Just edit the text below the `---` line at the top of the file. Leave the
`---` block (the **frontmatter**) alone unless you're changing the section
title or its order on the page.

### Add a new section

Copy one of the existing files in `content/sections/` and rename it, e.g.
`05-allies.md`. Set `title` and `order` in its frontmatter (order controls
where it appears — sections are sorted lowest to highest), then write your
content below. No other file needs to change — it'll show up on the page
and in the navigation automatically.

### Change the name, tagline, or social links

Edit `_data/site.json`. It's a simple list of fields:

```json
{
  "characterName": "Sir Placeholder the Bold",
  "tagline": "Knight-errant, terrible poet, worse dancer",
  "portrait": "portrait.svg",
  "portraitAlt": "Portrait of Sir Placeholder in full armor",
  "social": [{ "label": "Instagram", "url": "https://instagram.com/example" }]
}
```

### Add or change photos

1. Drop the image file into `images/`.
2. Reference it by filename from `_data/site.json` (for the portrait) or
   from the `images:` list in `content/sections/04-gallery.md` (for the
   gallery). Always include a short `alt` description — it's read aloud by
   screen readers and shown if the image fails to load.

Images are automatically resized and converted to modern formats
(AVIF/WebP) when the site builds — just use a normal JPG or PNG.

## How publishing works

1. Make your edits on a branch and open a pull request (GitHub's web editor
   can do this for you without installing anything).
2. GitHub Actions automatically builds the site and runs checks on your PR.
   If something's broken — a typo in the frontmatter, a broken link, a
   missing `alt` text — the PR will show a red ✗ with details, and nothing
   goes live.
3. Once checks pass and the PR is merged into `main`, the site deploys to
   GitHub Pages automatically. No manual build/deploy step needed.

**One-time repo setup:** in the repo's Settings → Pages, set the source to
"GitHub Actions". For the safety check above to actually block bad merges,
also turn on Settings → Branches → branch protection for `main` with
"require status checks to pass before merging".

## Local development

Requires [Node.js](https://nodejs.org/) 24+ and [pnpm](https://pnpm.io/).

```sh
pnpm install       # install dependencies
pnpm run serve     # start a local dev server with live reload
pnpm run build     # build the site into _site/
```

### Scripts

| Command             | What it does                                                |
| ------------------- | ----------------------------------------------------------- |
| `pnpm run serve`    | Local dev server with live reload                           |
| `pnpm run build`    | Build the site into `_site/`                                |
| `pnpm run lint`     | Lint JS, CSS, and Markdown                                  |
| `pnpm run format`   | Auto-format all files with Prettier                         |
| `pnpm run test`     | Build, then run unit, HTML validation, a11y, and link tests |
| `pnpm run validate` | Everything CI runs: `lint` + `test`                         |

## Tech stack

- [Eleventy](https://www.11ty.dev/) — static site generator, Markdown +
  Nunjucks templates
- [eleventy-img](https://www.11ty.dev/docs/plugins/image/) — responsive,
  optimized images (AVIF/WebP)
- Plain CSS with custom properties — no build step, no framework
- ESLint, Stylelint, markdownlint, Prettier — linting and formatting
- Node's built-in test runner, html-validate, axe-core, and linkinator —
  build, HTML, accessibility, and link checks
- GitHub Actions — CI on every PR, automatic deploy to GitHub Pages on
  merge to `main`
- Dependabot — weekly dependency updates, with a 3-day cooldown so a
  newly published (and potentially compromised) package version has time
  to get caught before it's pulled in here
