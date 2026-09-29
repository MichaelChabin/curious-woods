---
status: Claude Code prompt — 25 Sept 2026. One session, one commit. Waits on Michael's answer to one question (marked below).
role: Make the site worth adding to an iPad's home screen, and invite it once, quietly.
---

# Prompt

Read `CWVault/claude/Rulings-Sept-2026.md`, the section "Practice, her list, and the home screen," and `cw-deploys/MANIFEST.md` (Page standard). Then:

**1. The site as an app.** Add `cw-deploys/manifest.webmanifest`: name "Curious Woods", short name "Curious Woods", `start_url` "/", `display` "standalone", `background_color` and `theme_color` both `#f4f1e8`, icons at 192 and 512 px made from `art/enso-icon-256.png` (or the star if the ensō doesn't read at 192; say which you chose). Link it from every page under `cw-deploys/` that the Page standard covers, with `<link rel="manifest">`, plus `<meta name="apple-mobile-web-app-capable" content="yes">`, `<meta name="apple-mobile-web-app-status-bar-style" content="default">`, `<meta name="apple-mobile-web-app-title" content="Curious Woods">`, and a 180-px `apple-touch-icon` (a new file, `art/touch-icon-180.png`, from the same source). Add the manifest and icon checks to `tools/check-deploys.sh`. Register everything in `MANIFEST.md`.

**2. The invitation.** One quiet line, Georgia, the muted colour the gallery's footer uses, with a small "not now" beside it. Shown only when all of these hold: the browser is Safari on iPhone or iPad (test the user agent for iPhone/iPad and not for Chrome or Firefox on iOS); the page is not already running from the home screen (`navigator.standalone` is false and `matchMedia('(display-mode: standalone)')` doesn't match); and she hasn't dismissed it (a `localStorage` key, `cw.homescreen.dismissed`). Once the site runs from the home screen the line never shows, because the first test fails. The words, exactly: *To keep this list, add Curious Woods to your home screen: tap Share, then Add to Home Screen.* Put the logic in `js/remember.js` (it already owns the list) as `cwRemember.invite(el)`.

**3. Where it appears — MICHAEL DECIDES; do not build until this line says which.** Either (a) on the gallery, under the fixed row, on her first visit, in which case the words start *To keep what you save…* instead; or (b) under the note "In your practice list" the first time she taps Remember on a story page, and at the top of `practice.html` whenever the list is not empty. **Michael's answer: ______.**

Bump `CW_VERSION` on every page touched, run `tools/check-deploys.sh`, update `MANIFEST.md` and `00-BOARD.md`. Test on an iPad in Safari and from the home screen; note in the report whether the storage split is what the Rulings say it is. Anything unclear, leave open and name it. Stop and report before committing.
