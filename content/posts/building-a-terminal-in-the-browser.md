---
title: "Building a Terminal in the Browser"
date: 2026-06-01T09:30:00-04:00
draft: false
tags: ["javascript", "hugo", "ui"]
---

The terminal widget on this site is written in a few hundred lines of vanilla
JavaScript, with no framework and no dependencies. This post describes how the
parts fit together.

<!--more-->

## The data layer

Everything starts with `/index.json`. Hugo's `[outputs]` configuration tells it
to render the home page as JSON in addition to HTML and RSS. A small
`layouts/index.json` template controls the shape of that file:

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

The browser fetches this file once, the first time the terminal opens, and
keeps it in memory for the rest of the session. A single request is enough,
since the content does not change between builds.

## The command loop

A command is a single line of text. The line is split on whitespace, the first
token is looked up in a `COMMANDS` map, and the matching handler runs with the
remaining arguments:

```js
function run(raw) {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  (COMMANDS[cmd] || COMMANDS._unknown)(args);
}
```

History is stored as an array, and the up and down arrows move an index along
it. The `cat` command prints the plain text of a post inline, while `open`
performs a `window.location` navigation. The full behaviour fits in these few
rules.

## Summary

The design relies on two ideas. First, the state stays minimal: a
current-directory string and a history array are enough to describe it. Second,
the static site generator owns the data, so the terminal reads whatever Hugo
produced at the last build and does not fall out of date.
