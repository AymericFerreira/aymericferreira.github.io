---
title: "Hello, World"
date: 2026-05-20T10:00:00-04:00
draft: false
tags: ["meta", "hugo"]
---

This is the first post on the blog. It has two purposes: to describe how the
site is built, and to confirm that the whole pipeline works, from writing a
file to publishing it.

<!--more-->

The site is built with [Hugo](https://gohugo.io) (extended) and a small,
hand-written theme. There is no third-party theme and no build step beyond
`hugo` itself. The palette follows GitHub dark, the text is set in a monospace
stack, and the main feature is the terminal that opens with the backtick key.

## Browsing with the keyboard

The terminal has a clear purpose. The goal is to read the whole blog without
leaving the keyboard. Posts can be listed, read, and opened with a few short
commands, in the same way a developer moves around a file system.

```bash
cd posts
ls
cat hello-world
open hello-world
```

The terminal reads an `/index.json` file that Hugo regenerates on every build.
It therefore knows about every post automatically, and no JavaScript needs to
be updated by hand when a post is added.

## Summary

This first post is short by design. It sets out the two ideas behind the site:
a simple, hand-written theme, and a terminal that makes the blog navigable from
the keyboard alone. The posts that follow aim to be interesting to read, and
not only useful.
