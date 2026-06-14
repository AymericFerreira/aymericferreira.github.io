---
title: "Why Monospace Everywhere"
date: 2026-06-10T18:15:00-04:00
draft: false
tags: ["design", "typography"]
---

Setting an entire site in a monospace font is a slightly unusual choice for
body text. I did it on purpose, and I think it holds up.

<!--more-->

Monospace fonts get a bad reputation for long-form reading — the argument is
that even character widths slow the eye down. In practice, at a sensible size
and line height, the effect is tiny, and you get a few things in return:

1. **Honesty.** This is a developer's blog. Code and prose share the same
   rhythm, so a snippet never feels bolted on.
2. **Alignment.** ASCII tables, diagrams, and terminal output line up for free.
3. **Character.** A good mono face has more personality than yet another
   neutral sans.

The body face here is the system monospace stack — `ui-monospace`, then
`SF Mono`, `Menlo`, `Consolas`, and friends — so it renders crisply on every
platform with zero web-font download.

```css
:root {
  --font-mono: ui-monospace, "SF Mono", "SFMono-Regular", Menlo,
    "Cascadia Mono", Consolas, "Liberation Mono", monospace;
}
```

The one knob worth tuning is line height. Mono text wants a touch more leading
than a sans — around `1.7` here — to keep dense glyphs from feeling cramped.
