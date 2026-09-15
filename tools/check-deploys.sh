#!/bin/sh
# check-deploys.sh — every page under cw-deploys/ carries the head standard.
# Standard (MANIFEST.md, "Page standard"): doctype, <meta charset="utf-8">, a viewport
# meta, a CW_VERSION stamp, and a tab icon that is a file, never a data: URI.
# Usage: tools/check-deploys.sh [file.html ...]   (no arguments: every page in cw-deploys)
# Exit 1 on any error. Missing icons are warnings; data-URI icons are errors.
# Also lists untracked files under cw-deploys/ — a public folder is public whether or
# not anything links to it, and `git add -A` would ship them.
cd "$(dirname "$0")/.." || exit 2          # the repo root, without asking git (git may be unavailable)
if [ $# -gt 0 ]; then files="$*"; else files=$(find cw-deploys -name '*.html' | sort); fi
errors=0; warnings=0
for p in $files; do
  case "$p" in cw-deploys/*.html) ;; *) continue;; esac
  [ -f "$p" ] || continue
  bad=""
  head -c 300 "$p" | grep -qi '<!doctype html' || bad="$bad no-doctype"
  grep -qi '<meta charset="utf-8"' "$p" || bad="$bad no-charset"
  grep -q 'name="viewport"' "$p" || bad="$bad no-viewport"
  grep -q "CW_VERSION = '" "$p" || bad="$bad no-stamp"
  if grep -q 'rel="icon"[^>]*href="data:' "$p" || grep -q 'rel="apple-touch-icon"[^>]*href="data:' "$p"; then bad="$bad data-uri-icon(Safari-ignores-it)"; fi
  if [ -n "$bad" ]; then echo "ERROR $p:$bad"; errors=$((errors+1)); fi
  if ! grep -q 'rel="icon"' "$p"; then case "$p" in cw-deploys/active/*) echo "warn  $p: no tab icon"; warnings=$((warnings+1));; esac; fi
done
untracked=$(git ls-files --others --exclude-standard cw-deploys 2>/dev/null) || untracked=""
if [ -n "$untracked" ]; then
  echo "warn  untracked under cw-deploys/ (public if ever added; not deployed now):"
  echo "$untracked" | sed 's/^/      /'; warnings=$((warnings+1))
fi
[ $errors -eq 0 ] && echo "check-deploys: no errors ($warnings warning(s))" || echo "check-deploys: $errors error(s), $warnings warning(s)"
[ $errors -eq 0 ]
