// cw-flags.js — feature flags for every page under active/. Classic script, no build step.
// Load it first, with a version query, before the page's own scripts:
//   <script src="../js/cw-flags.js?v=2026-09-15"></script>
// Maya is a Claude instance that will join the site later (00-WHAT-CW-IS: "Pathfinder, not
// tutor. Not in the project yet; the Maya flag marks what changes when she is."). Nothing
// else about her exists yet, so the flag is the only thing this file does.
window.CW = window.CW || {};
CW.flags = { maya: false };
