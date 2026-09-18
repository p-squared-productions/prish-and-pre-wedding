---
name: update-wedding-content
description: Use this skill whenever the user mentions couple names, wedding date, venue, city, registry links, schedule, travel info, RSVP copy, or replacing placeholders. Always search and update tokens across the project instead of editing a single page from memory.
---

# Update wedding content

Use this skill to fill in or change couple details and page copy. Change words, not the look, unless the user asks to restyle.

## Do this

1. Search the repo for `[WEDDING_DATE]`, `[VENUE]`, `[CITY]`, and `[CONTACT_EMAIL]`. The couple's names are already set to Prenasen and Prishantini — leave them, and leave their story on `story.html` alone unless they ask for a change.
2. Replace tokens consistently in HTML, `js/main.js` (including `WEDDING_DATE_ISO` for the countdown), `README.md`, and agent docs when those files still show the old token or name.
3. Update related placeholders when the user provides them (`[CEREMONY_TIME]`, hotel names, registry names and `href`s).
4. Keep the RSVP form front-end-only. Do not send data or add a SaaS form unless the user explicitly asks to wire a backend.
5. When adding photos, put files in `assets/images/` and set real `alt` text on content images.

## Do not

- Do not restyle the site while swapping names or dates.
- Do not invent missing personal details. Leave a token if the user did not supply a value.
- Do not add a framework or build step to “help” with content edits.
