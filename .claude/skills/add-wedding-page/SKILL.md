---
name: add-wedding-page
description: Use this skill whenever the user wants a new page, section page, or nav item on this wedding site. Always apply it before creating HTML or changing navigation — do not invent a new layout or stack.
---

# Add a wedding page

Use this skill for any new public page (FAQ, schedule add-on, rehearsal dinner, and so on) or any request to add a nav item.

## Do this

1. Create a new `.html` file in the project root, not in a nested app folder.
2. Copy the header, nav, footer, skip link, and page shell from an existing page such as `story.html`.
3. Point the new page at `css/styles.css` and `js/main.js`. Do not add a new stylesheet, JS bundle, framework, or build tool.
4. Add the page to the `<nav>` list on **every** existing HTML file. Keep the same order everywhere. Set `aria-current="page"` only on the new page’s own nav link.
5. Keep the couple's real names, Prenasen and Prishantini, and the remaining placeholder tokens (`[WEDDING_DATE]`, `[VENUE]`, `[CITY]`, `[CONTACT_EMAIL]`). Keep the accessibility patterns (skip link, heading order, labels, `:focus-visible` already in CSS).
6. Match the invitation look: wrap content in `.panel`, pick a field (`.silk`, `.bokeh`, or `.bokeh--gold`), and hang a `.toran` above it with `.panel--crest` for the clearance. Reuse the motifs in `assets/images/` rather than adding new art.
7. If `CLAUDE.md`, `AGENTS.md`, or `README.md` list pages, add the new file to those maps.

## Do not

- Do not introduce React, Vue, Tailwind, npm, or a backend.
- Do not duplicate the full CSS file into the new page.
- Do not skip updating nav on even one existing HTML file. Both nav rows must stay identical across pages.
- Do not replace Prenasen or Prishantini with placeholder tokens.
