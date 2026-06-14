---
title: "Building a Terminal in the Browser"
date: 2026-06-01T09:30:00-04:00
draft: false
tags: ["javascript", "hugo", "ui"]
---

The terminal widget on this site is intentionally small: a few hundred lines of
vanilla JavaScript, no framework, no dependencies. Here's how the pieces fit.

<!--more-->

## The data layer

Everything starts with `/index.json`. Hugo's `[outputs]` config tells it to
render the home page as JSON in addition to HTML and RSS, and a tiny
`layouts/index.json` template controls the shape:

```go-html-template
{{ $posts := slice }}
{{ range (where .Site.RegularPages "Section" "posts").ByDate.Reverse }}
  {{ $posts = $posts | append (dict
      "title"   .Title
      "slug"    .File.ContentBaseName
      "url"     .RelPermalink
      "date"    (.Date.Format "2006-01-02")
      "content" (.Plain | strings.TrimSpace)) }}
{{ end }}
{{ $posts | jsonify }}
```

The browser fetches that once, the first time the terminal opens, and caches it
for the rest of the session.

## The command loop

A command is just a line of text. Split it on whitespace, look up the first
token in a `COMMANDS` map, and call the handler with the remaining args:

```js
function run(raw) {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  (COMMANDS[cmd] || COMMANDS._unknown)(args);
}
```

History is an array; the up/down arrows just walk an index into it. `cat` prints
a post's plain text inline, `open` does a `window.location` navigation. That's
genuinely all there is to it.

## Lessons

- Keep state tiny. A current-directory string and a history array cover it.
- Let the static site generator own the data. The terminal never goes stale
  because it can't — it reads whatever Hugo last built.
