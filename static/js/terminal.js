/* =========================================================================
   feitanborr — interactive terminal
   Vanilla JS, no dependencies. Reads the build-time /index.json so the list of
   posts is always in sync with whatever Hugo last built.
   ========================================================================= */
(function () {
  "use strict";

  var term = document.getElementById("terminal");
  if (!term) return;

  var screen   = document.getElementById("terminal-screen");
  var output   = document.getElementById("terminal-output");
  var input    = document.getElementById("terminal-input");
  var promptEl = document.getElementById("terminal-prompt");
  var toggleBtn = document.getElementById("terminal-toggle");
  var closeBtn  = document.getElementById("terminal-close");
  var openers   = document.querySelectorAll("[data-open-terminal]");

  var indexURL = term.getAttribute("data-index") || "/index.json";
  var USER = term.getAttribute("data-user") || "user";
  var HOST = term.getAttribute("data-host") || "host";

  var posts = [];
  var loadError = false;
  var loadPromise = null;
  var booted = false;

  var cwd = "~";              // "~" | "posts"
  var history = [];
  var histIdx = 0;           // cursor into history for ↑/↓

  /* ----- tiny helpers --------------------------------------------------- */
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function promptStr() { return USER + "@" + HOST + ":" + cwd + "$"; }
  function setPrompt() { promptEl.textContent = promptStr() + " "; }
  function scrollBottom() { screen.scrollTop = screen.scrollHeight; }

  function printHTML(html, cls) {
    var div = document.createElement("div");
    div.className = "term-line" + (cls ? " " + cls : "");
    div.innerHTML = html;
    output.appendChild(div);
    scrollBottom();
  }
  function printText(text, cls) {
    printHTML(esc(text), cls);
  }
  function echo(raw) {
    printHTML('<span class="term-prompt">' + esc(promptStr()) + "</span> " + esc(raw));
  }

  /* ----- data ----------------------------------------------------------- */
  function loadPosts() {
    return fetch(indexURL, { headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        posts = Array.isArray(data) ? data : (data.posts || []);
      })
      .catch(function () { loadError = true; });
  }
  function ensureLoaded() {
    if (!loadPromise) loadPromise = loadPosts();
    return loadPromise;
  }
  function findPost(slug) {
    slug = String(slug || "").replace(/\.md$/, "").trim();
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].slug === slug) return posts[i];
    }
    return null;
  }

  /* ----- commands ------------------------------------------------------- */
  var COMMANDS = {
    help: function () {
      printHTML([
        '<span class="term-accent">available commands</span>',
        '  <span class="term-accent">help</span>            this message',
        '  <span class="term-accent">ls</span>              list the current directory',
        '  <span class="term-accent">cd</span> posts        enter the posts directory',
        '  <span class="term-accent">cd</span> ~            go home',
        '  <span class="term-accent">cat</span> &lt;slug&gt;      print a post here in the terminal',
        '  <span class="term-accent">open</span> &lt;slug&gt;     open a post in the browser',
        '  <span class="term-accent">whoami</span>          short bio',
        '  <span class="term-accent">clear</span>           clear the screen',
        '',
        '<span class="term-muted">↑/↓ history · Tab completes commands, folders, posts · ` toggles · Esc closes</span>'
      ].join("\n").replace(/\n/g, "<br>"));
    },

    ls: function () {
      if (cwd === "~") {
        printHTML('<span class="term-dir">posts/</span>');
        return;
      }
      if (loadError) { printText("ls: could not read /index.json", "term-err"); return; }
      if (!posts.length) { printText("(no posts yet)", "term-muted"); return; }
      var rows = posts.map(function (p) {
        return '<span class="term-file">' + esc(p.slug) + '</span>'
             + '   <span class="term-muted">' + esc(p.date || "") + "</span>"
             + "   " + esc(p.title);
      });
      printHTML(rows.join("<br>"));
    },

    cd: function (args) {
      var t = (args[0] || "~").replace(/\/+$/, "");
      if (t === "" || t === "~" || t === "/") cwd = "~";
      else if (t === "posts" || t === "~/posts" || t === "/posts") cwd = "posts";
      else if (t === ".." || t === "../") cwd = "~";
      else if (t === ".") { /* stay */ }
      else { printText("cd: no such directory: " + t, "term-err"); return; }
      setPrompt();
    },

    cat: function (args) {
      if (!args.length) { printText("usage: cat <slug>", "term-err"); return; }
      var p = findPost(args[0]);
      if (!p) { printText("cat: " + args[0] + ": no such post", "term-err"); return; }
      printHTML('<span class="term-accent"># ' + esc(p.title) + "</span>"
        + '  <span class="term-muted">' + esc(p.date || "") + "</span>");
      var body = (p.content || p.summary || "").trim();
      printText(body || "(empty)");
      printHTML('<span class="term-muted">— `open ' + esc(p.slug)
        + "` to read it in the browser —</span>");
    },

    open: function (args) {
      if (!args.length) { printText("usage: open <slug>", "term-err"); return; }
      var p = findPost(args[0]);
      if (!p) { printText("open: " + args[0] + ": no such post", "term-err"); return; }
      printHTML('opening <span class="term-accent">' + esc(p.slug) + "</span> …");
      setTimeout(function () { window.location.href = p.url; }, 180);
    },

    whoami: function () {
      printHTML('<span class="term-accent">' + esc(USER) + "</span>");
      printText("Aymeric Ferreira — developer. This blog runs on Hugo with a "
        + "hand-rolled dark theme and the terminal you're using right now.");
    },

    clear: function () { output.innerHTML = ""; },

    _unknown: function (args, cmd) {
      printText("command not found: " + cmd + "  (try 'help')", "term-err");
    }
  };

  /* aliases */
  COMMANDS.man = COMMANDS.help;
  COMMANDS["?"] = COMMANDS.help;

  function run(raw) {
    echo(raw);
    var line = raw.trim();
    if (line) { history.push(line); }
    histIdx = history.length;
    if (!line) return;
    var parts = line.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    var args = parts.slice(1);
    if (Object.prototype.hasOwnProperty.call(COMMANDS, cmd) && cmd[0] !== "_") {
      COMMANDS[cmd](args);
    } else {
      COMMANDS._unknown(args, cmd);
    }
    scrollBottom();
  }

  /* ----- input editing -------------------------------------------------- */
  function caretEnd() {
    var n = input.value.length;
    requestAnimationFrame(function () {
      try { input.setSelectionRange(n, n); } catch (e) {}
    });
  }

  // Complete parts[idx] against a list of candidates. A single match is filled
  // in (with a trailing space for commands); several matches fill the longest
  // common prefix and list the options, the way a real shell does.
  function complete(parts, idx, candidates, trailingSpace) {
    var frag = parts[idx] || "";
    var matches = candidates.filter(function (c) { return c.indexOf(frag) === 0; });
    if (!matches.length) return;
    if (matches.length === 1) {
      parts[idx] = matches[0];
      input.value = parts.join(" ") + (trailingSpace ? " " : "");
      return;
    }
    var prefix = matches[0];
    matches.forEach(function (m) {
      while (m.indexOf(prefix) !== 0) { prefix = prefix.slice(0, -1); }
    });
    parts[idx] = prefix;
    input.value = parts.join(" ");
    printText(matches.join("   "), "term-muted");
  }

  // Directories reachable from the current one, for `cd` completion.
  function dirNames() {
    return cwd === "~" ? ["posts"] : [".."];
  }

  function autocomplete() {
    var parts = input.value.split(/\s+/);
    if (parts.length <= 1) {
      var names = Object.keys(COMMANDS).filter(function (n) { return n[0] !== "_"; });
      complete(parts, 0, names, true);
    } else {
      var cmd = parts[0].toLowerCase();
      if (cmd === "cat" || cmd === "open") {
        complete(parts, parts.length - 1, posts.map(function (p) { return p.slug; }), false);
      } else if (cmd === "cd") {
        complete(parts, parts.length - 1, dirNames(), false);
      }
    }
    caretEnd();
  }

  input.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "Enter":
        run(input.value);
        input.value = "";
        break;
      case "ArrowUp":
        e.preventDefault();
        if (history.length) {
          histIdx = Math.max(0, histIdx - 1);
          input.value = history[histIdx] || "";
          caretEnd();
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (history.length) {
          histIdx = Math.min(history.length, histIdx + 1);
          input.value = history[histIdx] || "";
          caretEnd();
        }
        break;
      case "Tab":
        e.preventDefault();
        autocomplete();
        break;
      case "Escape":
        e.preventDefault();
        closeTerminal();
        break;
      default:
        // Ctrl-L clears, Ctrl-C cancels the current line — small niceties.
        if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
          e.preventDefault();
          output.innerHTML = "";
        } else if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
          e.preventDefault();
          echo(input.value + "^C");
          input.value = "";
          histIdx = history.length;
        }
    }
  });

  /* ----- open / close --------------------------------------------------- */
  function boot() {
    printHTML('<span class="term-accent">feitanborr</span> '
      + '<span class="term-muted">// interactive terminal · reading ' + esc(indexURL) + "</span>");
    if (loadError) {
      printText("warning: could not load the post index — post commands are unavailable.", "term-err");
    } else {
      printHTML('<span class="term-muted">' + posts.length
        + " post(s) indexed. Type </span><span class=\"term-accent\">help</span>"
        + '<span class="term-muted"> or </span><span class="term-accent">cd posts</span>'
        + '<span class="term-muted"> to start.</span>');
    }
  }

  function openTerminal() {
    if (term.classList.contains("is-open")) return;
    term.classList.add("is-open");
    term.setAttribute("aria-hidden", "false");
    document.body.classList.add("terminal-open");
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
    if (!booted) {
      booted = true;
      setPrompt();
      ensureLoaded().then(boot);
    }
    setTimeout(function () { input.focus(); }, 60);
  }

  function closeTerminal() {
    if (!term.classList.contains("is-open")) return;
    term.classList.remove("is-open");
    term.setAttribute("aria-hidden", "true");
    document.body.classList.remove("terminal-open");
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.focus();
    }
  }

  function toggleTerminal() {
    if (term.classList.contains("is-open")) closeTerminal();
    else openTerminal();
  }

  /* ----- wiring --------------------------------------------------------- */
  if (toggleBtn) toggleBtn.addEventListener("click", toggleTerminal);
  if (closeBtn)  closeBtn.addEventListener("click", closeTerminal);
  openers.forEach(function (el) { el.addEventListener("click", openTerminal); });

  // click anywhere in the panel focuses the input; click on the dim backdrop closes.
  term.addEventListener("mousedown", function (e) {
    if (e.target === term) { closeTerminal(); return; }
  });
  screen.addEventListener("click", function () { input.focus(); });

  // global keys: ` to open (when not typing elsewhere), Esc to close.
  document.addEventListener("keydown", function (e) {
    var isOpen = term.classList.contains("is-open");
    if (e.key === "Escape" && isOpen) { closeTerminal(); return; }
    if ((e.key === "`" || e.code === "Backquote") && !isOpen) {
      var t = e.target;
      var tag = t && t.tagName ? t.tagName.toLowerCase() : "";
      if (tag === "input" || tag === "textarea" || (t && t.isContentEditable)) return;
      e.preventDefault();
      openTerminal();
    }
  });

  // warm the cache so the first open feels instant.
  if ("requestIdleCallback" in window) {
    requestIdleCallback(ensureLoaded);
  } else {
    setTimeout(ensureLoaded, 1200);
  }

  setPrompt();
})();
