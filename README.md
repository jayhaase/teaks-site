# teaks-site

A one-page site for Teak, a tree-faery apprentice apothecary, built with
[Eleventy](https://www.11ty.dev/) and deployed automatically to GitHub
Pages. Content lives in plain Markdown and JSON files, separate from the
page design, so it can be edited safely without touching any code.

## Editing content

Everything you'd normally want to change lives in `content/` or `_data/`.
You never need to touch the other folders.

The page has four sections, each its own file in `content/sections/`:

- `01-about.md` — Teak's bio ("Of Curious Craft")
- `02-menu.md` — the potion cards ("The Potion Ledger")
- `03-gallery.md` — the photo gallery
- `04-find-teak.md` — faire dates and the contact blurb

Each file has a `---`-delimited **frontmatter** block at the top (structured
fields like titles, image filenames, and lists) and regular
[Markdown](https://www.markdownguide.org/basic-syntax/) text below it.

### Edit body text

Just edit the prose below the `---` block — e.g. Teak's bio in
`01-about.md`, the disclaimer in `02-menu.md`, or the contact blurb in
`04-find-teak.md`.

### Edit a list (potions, gallery photos, faire dates)

These live in the frontmatter as YAML lists. To add a fourth faire date,
copy one of the existing entries in `04-find-teak.md` and edit it:

```yaml
faires:
  - date: "Aug 15–16"
    name: Willowmere Renaissance Faire
```

Same pattern for potions in `02-menu.md` (`title`, `description`, `image`)
and photos in `03-gallery.md` (`src`, `alt`). Keep the indentation exactly
as-is — YAML is picky about it, and a misaligned line will fail the build
check on your PR rather than break the live site (see below).

### Change the hero text, email, or footer line

Edit `_data/site.json` — sitewide fields that aren't part of any one
section:

```json
{
  "characterName": "Teak",
  "eyebrow": "Herein Recorded, the Apothecary of",
  "heroSubhead": "A tree faery, apprentice to a wandering alchemist...",
  "email": "hello@teaksapothecary.faerie",
  "footerLine": "Thus concludes this ledger · herein sealed by Teak, apprentice fae"
}
```

### Add or change photos

1. Drop the image file into `images/`.
2. Reference it by filename in the relevant frontmatter — `image` in
   `01-about.md` or a potion entry in `02-menu.md`, `src` in a gallery
   entry in `03-gallery.md`. Always include a short `alt`/`imageAlt`
   description — it's read aloud by screen readers and shown if the image
   fails to load.

Images are automatically resized and converted to modern formats
(AVIF/WebP) when the site builds — just use a normal JPG or PNG.

Gallery photos automatically open in a full-screen lightbox when clicked,
with previous/next arrows and keyboard arrow-key navigation — no setup
needed, this works for any photo you add.

### Fixing a badly-cropped gallery thumbnail

Gallery photos are cropped to a square thumbnail, which can cut off the
interesting part of a tall or oddly-framed photo. Add a `focal` field to
that photo's entry in `03-gallery.md` to control which part stays in
frame:

```yaml
images:
  - src: half.jpg
    alt: "Teak looking mischeivious"
    focal: "50% 70%"
```

The value works like a "keep this point visible" anchor — `"50% 0%"` keeps
the top of the photo in frame, `"50% 100%"` keeps the bottom, `"0% 50%"`
keeps the left edge, and so on (it's the CSS `object-position` property,
if you want the full syntax). Leave it off and the photo just crops from
the center, which is fine for most shots.

### Adding a genuinely new section

The four sections above each have their own layout (a `type` field in
frontmatter picks which one). Reordering, editing, or adding/removing list
items _within_ an existing section is safe to do as content. Adding a
**new kind** of section — a fifth chapter with a layout none of the four
already have — needs a developer to add a template branch in `index.njk`,
not just a new content file.

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
- A small hand-written vanilla-JS lightbox (`scripts/lightbox.js`, no
  dependencies) for the gallery, built on the native `<dialog>` element
- ESLint, Stylelint, markdownlint, Prettier — linting and formatting
- Node's built-in test runner, html-validate, axe-core, and linkinator —
  build, HTML, accessibility, and link checks
- GitHub Actions — CI on every PR, automatic deploy to GitHub Pages on
  merge to `main`
- Dependabot — weekly dependency updates, with a 3-day cooldown so a
  newly published (and potentially compromised) package version has time
  to get caught before it's pulled in here
