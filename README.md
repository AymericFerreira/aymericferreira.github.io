# Aymeric Ferreira

Personal dev blog. [Hugo](https://gohugo.io) (extended) with a hand-rolled dark
theme and no third-party theme. GitHub-dark palette, monospace throughout, and
an interactive terminal you can open with the backtick (`` ` ``) key.

Live at **https://aymericferreira.github.io/**.

## Local development

Requires Hugo **extended** (`brew install hugo`).

```bash
hugo server -D            # dev server with drafts, http://localhost:1313
hugo server               # without drafts (matches production)
hugo --gc --minify        # production build into ./public
```

Confirm the terminal's data feed builds:

```bash
hugo server
# then visit http://localhost:1313/index.json
```

## Writing a post

```bash
hugo new posts/my-new-post.md
```

Edit the file, set `draft: false`, and the post appears in the home list,
`/posts/`, the RSS feed, and the terminal. There is no manual upkeep, because
the terminal reads `/index.json`, which Hugo regenerates on every build.

## How the terminal works

- `hugo.toml` sets `[outputs] home = ["HTML", "RSS", "JSON"]`.
- `layouts/index.json` renders every post in `content/posts/` to `/index.json`.
- `static/js/terminal.js` fetches that JSON the first time the terminal opens.

Commands: `help`, `ls`, `cd posts`, `cd ~`, `cat <slug>`, `open <slug>`,
`whoami`, `clear`. Arrow keys walk history. Tab completes commands, folders,
and post slugs.

## Customizing the look

The whole palette lives in `:root` in `static/css/main.css`. There is a single
swappable accent token:

```css
--accent: #56b6c2;   /* change this one line to re-skin the site */
```

## Deployment

This is a **user site**: the repository is named
`AymericFerreira/aymericferreira.github.io`, so it serves at the root
`https://aymericferreira.github.io/` with no path prefix.

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
Hugo and publishes through `actions/deploy-pages`.

### GitHub setup

1. In **Settings → Pages → Build and deployment**, set **Source = GitHub
   Actions**. This is required. The default "Deploy from a branch" runs a Jekyll
   build that fails on Hugo's Go templates.
2. No custom domain is used. The site is served on the default
   `aymericferreira.github.io` host, with HTTPS enforced.
3. On the free plan the repository must be **public** for Pages to publish.
