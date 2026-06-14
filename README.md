# feitanborr

Personal dev blog. [Hugo](https://gohugo.io) (extended) + a hand-rolled dark
theme — no third-party theme. GitHub-dark palette, monospace throughout, and an
interactive terminal you can pop open with the backtick (`` ` ``) key.

Live at **https://feitanborr.com**.

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

Edit the file, set `draft: false`, and the post automatically appears in the
home list, `/posts/`, the RSS feed, **and** the terminal — no manual upkeep,
because the terminal reads `/index.json`, which Hugo regenerates every build.

## How the terminal works

- `hugo.toml` sets `[outputs] home = ["HTML", "RSS", "JSON"]`.
- `layouts/index.json` renders every post in `content/posts/` to `/index.json`.
- `static/js/terminal.js` fetches that JSON the first time the terminal opens.

Commands: `help`, `ls`, `cd posts`, `cd ~`, `cat <slug>`, `open <slug>`,
`whoami`, `clear`. Arrow keys walk history; Tab completes slugs.

## Customizing the look

The whole palette lives in `:root` in `static/css/main.css`. There is a single
swappable accent token:

```css
--accent: #56b6c2;   /* change this one line to re-skin the site */
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
Hugo and publishes via the official `actions/deploy-pages` workflow.

### One-time GitHub setup

This repo is set up as a **project repo**: `AymericFerreira/feitanborr`.
(See "Repo choice" below for why.)

1. Create the repo `AymericFerreira/feitanborr` and push this directory to it.
2. In **Settings → Pages → Build and deployment**, set **Source = GitHub
   Actions**.
3. In **Settings → Pages → Custom domain**, enter `feitanborr.com` and enable
   **Enforce HTTPS**. (`static/CNAME` already pins this so the setting sticks
   across deploys.)

### DNS (at your domain registrar)

| Type  | Host  | Value                                                            |
| ----- | ----- | --------------------------------------------------------------- |
| A     | `@`   | `185.199.108.153`                                               |
| A     | `@`   | `185.199.109.153`                                               |
| A     | `@`   | `185.199.110.153`                                               |
| A     | `@`   | `185.199.111.153`                                               |
| AAAA  | `@`   | `2606:50c0:8000::153`                                           |
| AAAA  | `@`   | `2606:50c0:8001::153`                                           |
| AAAA  | `@`   | `2606:50c0:8002::153`                                           |
| AAAA  | `@`   | `2606:50c0:8003::153`                                           |
| CNAME | `www` | `aymericferreira.github.io`                                     |

The apex (`feitanborr.com`) uses GitHub Pages' A/AAAA records; `www` is a CNAME
to `aymericferreira.github.io` regardless of which repo serves the site.

## Repo choice: project repo vs. user repo

Decided up front: **project repo (`AymericFerreira/feitanborr`)**.

- With the custom domain `feitanborr.com`, a project repo serves at the domain
  root exactly like a user site would — there is no `/feitanborr/` path prefix.
- It keeps the `AymericFerreira.github.io` name free for anything else later.
- The `www` DNS CNAME target is `aymericferreira.github.io` either way, so this
  choice has no DNS consequence.

To switch to the user repo instead, just push this same directory to a repo
named `AymericFerreira.github.io`; nothing in the config or workflow changes.
```
