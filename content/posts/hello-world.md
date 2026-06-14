---
title: "Hello, World"
date: 2026-05-20T10:00:00-04:00
draft: false
tags: ["meta", "hugo"]
---

Welcome to the blog. This is the obligatory first post — partly a placeholder,
partly a test that the whole pipeline actually works end to end.

<!--more-->

The site is built with [Hugo](https://gohugo.io) (extended) and a small,
hand-written theme. No third-party theme, no build step beyond `hugo` itself.
The palette is straight GitHub-dark, everything is set in a monospace stack,
and the only real flourish is the terminal you can pop open with the backtick
key.

## Why bother with a terminal?

Because it's fun, and because it doubles as a genuinely useful index. The
terminal reads a build-time `/index.json` that Hugo regenerates on every build,
so it always knows about every post without me touching any JavaScript.

```bash
# the commands that matter
cd posts
ls
cat hello-world
open hello-world
```

That's the whole trick. The rest is just styling.
