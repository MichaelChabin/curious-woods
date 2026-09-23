#!/bin/sh
# check-story.sh — a story page carries the shape the pattern settled on.
# check-deploys.sh checks the head standard; this checks the story standard, which is
# the part a new chat gets wrong. CWVault/claude/Story-Pattern.md says why each rule
# exists; cw-deploys/template-story.html is the shape itself.
# Usage: tools/check-story.sh cw-deploys/active/my-story.html [more.html ...]
#        tools/check-story.sh                    (every page in cw-deploys/active)
# Exit 1 on any error. Warnings do not fail.
cd "$(dirname "$0")/.." || exit 2
# With no arguments, check the pages built on the pattern — the ones that link story.css.
# Older pages and labs predate it and are not stories; name one explicitly to check it anyway.
if [ $# -gt 0 ]; then files="$*"
else files=$(grep -l "css/story.css" cw-deploys/active/*.html 2>/dev/null | sort); fi
[ -n "$files" ] || { echo "check-story: no story pages found"; exit 0; }
errors=0; warnings=0

for p in $files; do
  [ -f "$p" ] || { echo "ERROR $p: no such file"; errors=$((errors+1)); continue; }
  case "$p" in cw-deploys/template-story.html) continue;; esac
  bad=""; warn=""

  # --- the look is shared; a page sets only its picture's shape
  grep -q 'css/story.css' "$p" || bad="$bad no-story.css"
  grep -q -- '--aspect' "$p" || bad="$bad no---aspect"
  # one <style> block only, and nothing in it but :root
  blocks=$(grep -c '<style>' "$p")
  [ "$blocks" -le 1 ] || bad="$bad $blocks-style-blocks(the-look-belongs-in-story.css)"
  grep -q 'style="[^"]*color:' "$p" && warn="$warn inline-colour"

  # --- the shape, top to bottom
  grep -q 'class="titleblock"' "$p" || bad="$bad no-titleblock"
  grep -q 'class="subtitle"' "$p" || bad="$bad no-date-line"
  grep -q 'id="plate"' "$p" || bad="$bad no-opening-picture"
  grep -q 'id="toolwords"' "$p" || bad="$bad no-left-column-block"
  grep -q 'class="refs"' "$p" || bad="$bad no-References"

  # References comes after More, and both come after the body
  if grep -q 'class="more"' "$p"; then
    m=$(grep -n 'class="more"' "$p" | head -1 | cut -d: -f1)
    r=$(grep -n 'class="refs"' "$p" | head -1 | cut -d: -f1)
    [ -n "$r" ] && [ "$r" -lt "$m" ] && bad="$bad References-before-More"
  else
    warn="$warn no-More-section"
  fi

  # --- the opening picture's left-column block sits inside the figure, level with the caption
  if grep -q 'id="plate"' "$p"; then
    t=$(grep -n 'id="toolwords"' "$p" | head -1 | cut -d: -f1)
    c=$(grep -n '<figcaption' "$p" | head -1 | cut -d: -f1)
    f=$(grep -n '</figure>' "$p" | head -1 | cut -d: -f1)
    if [ -n "$t" ] && [ -n "$c" ] && [ -n "$f" ]; then
      { [ "$t" -lt "$c" ] && [ "$t" -lt "$f" ] && [ "$t" -gt 0 ]; } || bad="$bad left-column-block-not-beside-the-caption"
    fi
    grep -q 'class="note"' "$p" || warn="$warn no-note-above-the-controls"
    grep -q '>Reset<' "$p" || warn="$warn control-word-is-not-Reset"
    grep -q '>Magnifier off<' "$p" || warn="$warn control-word-is-not-Magnifier-off"
  fi

  # --- a tool's word sits level with the paragraph that names it, so .tools comes
  #     immediately before a <p>, never immediately before or after a heading
  if grep -q 'id="toolSlot"' "$p"; then
    n=$(grep -n 'id="toolSlot"' "$p" | head -1 | cut -d: -f1)
    close=$(awk -v s="$n" 'NR>s && /<\/div>/ {print NR; exit}' "$p")
    nextline=$(awk -v s="$close" 'NR>s && NF {print; exit}' "$p")
    case "$nextline" in *"<p"*) ;; *) bad="$bad tool-word-not-level-with-its-paragraph";; esac
  fi

  # --- the shelves are shelves, not copies
  grep -q 'js/sampler.js' "$p" || warn="$warn no-sampler"
  for shelf in map sampler timeline stack; do
    grep -q "function cw$(echo $shelf | cut -c1 | tr a-z A-Z)" "$p" && bad="$bad $shelf-copied-into-the-page"
  done

  # --- the World draws on the shared list rather than keeping its own copy of the world
  if grep -q "cwWorld(" "$p"; then
    grep -q "pool:" "$p" || bad="$bad World-does-not-use-the-shared-event-list"
    grep -q "placebook:" "$p" || bad="$bad World-does-not-use-the-shared-places"
  fi

  # --- pictures that are files that exist
  for src in $(grep -o 'src="\.\./art/[^"]*"' "$p" | sed 's/src="\.\.\///;s/"$//'); do
    [ -f "cw-deploys/$src" ] || bad="$bad missing:$src"
  done
  for m in $(grep -o "maps/[a-z0-9-]*\.json" "$p" | sort -u); do
    [ -f "cw-deploys/art/$m" ] || bad="$bad missing:art/$m"
  done

  # --- nothing left over from the template
  grep -q 'DELETE' "$p" && bad="$bad template-DELETE-left-in"
  grep -q "CW_VERSION = 'DATE HASH'" "$p" && bad="$bad CW_VERSION-not-set"

  [ -n "$bad" ] && { echo "ERROR $p:$bad"; errors=$((errors+1)); }
  [ -n "$warn" ] && { echo "warn  $p:$warn"; warnings=$((warnings+1)); }
done

[ $errors -eq 0 ] && echo "check-story: no errors ($warnings warning(s))" || echo "check-story: $errors error(s), $warnings warning(s)"
[ $errors -eq 0 ]
