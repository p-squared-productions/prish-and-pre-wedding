# AGENTS.md

Static wedding site for Prenasen and Prishantini. Vanilla HTML, CSS, and JS only. No framework, bundler, `package.json`, TypeScript, or backend unless the owner explicitly asks.

See `CLAUDE.md` for the full file map, RSVP notes, and conventions.

## Stack

- Pages: `index.html`, `story.html`, `nalangu.html`, `details.html`, `travel.html`, `registry.html`, `rsvp.html`
- Shared CSS: `css/styles.css` (change `:root` variables first)
- Shared JS: `js/main.js` (unobtrusive; page-check RSVP logic)
- Motifs and photos: `assets/images/` (artwork extracted from `Prenasen & Prishantini.pdf`)
- Look: South Indian invitation — silk crimson, temple gold, garlands, lamps, centred layout

## Do

- Reuse the existing header, nav, and footer on every page.
- Keep the real details consistent everywhere: Prenasen and Prishantini, 5 December 2026, The Garden Venue, Johannesburg, yeshria.pillay@gmail.com.
- Leave the remaining tokens (`[CEREMONY_TIME]`, `[NALANGU_DATE]`, `[HOTEL_NAME_1]`, `[REGISTRY_NAME_1]`, and similar) until the couple supplies a value.
- Use relative links. Stay mobile-first and accessible (skip link, labels, `:focus-visible`, `aria-current`, `aria-expanded`).
- Follow `.claude/skills/add-wedding-page/SKILL.md` for new pages.
- Follow `.claude/skills/update-wedding-content/SKILL.md` when replacing couple details.

## Don’t

- Don’t add React, Vue, Svelte, Next, Astro, Tailwind, Bootstrap, jQuery, or npm.
- Don’t wire RSVP to a server or third-party form unless asked.
- Don’t invent the missing details, and don’t download stock art — reuse the motifs in `assets/images/`.
- Don’t turn it into a modern minimal, pastel, or luxury-magazine site.
- Don’t duplicate a full stylesheet on each page.
