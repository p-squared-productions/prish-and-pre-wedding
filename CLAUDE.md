# CLAUDE.md

This is Prenasen and Prishantini's wedding website: a static, multi-page HTML/CSS/JS site with no build step, no package manager, and no backend. Guests should be able to open the files directly.

The visual system is a classic South African Tamil / South Indian wedding invitation, rebuilt in HTML and CSS from `Prenasen & Prishantini.pdf` — that PDF is the visual source of truth. Silk crimson, temple gold, hanging marigold garlands, oil lamps, Ganesha, and a centred ceremonial layout. Keep the tone auspicious, warm and formal. Restyle through the `:root` variables in `css/styles.css`; do not drift toward modern minimal, pastel, or luxury-magazine.

## File map

```
./
  index.html      Home — the silk hero, Ganesha, couple, lamps, countdown
  story.html      Our Story — "A Chance Encounter" on champagne bokeh
  nalangu.html    Nalangu — the pre-wedding ceremony and its meaning
  details.html    Wedding day — ceremony, reception, order of the day
  travel.html     Travel & stay
  registry.html   Registry
  rsvp.html       RSVP form
  css/styles.css  Shared stylesheet (all decoration lives here)
  js/main.js      Shared unobtrusive JS
  assets/images/  Motifs extracted from the invitation PDF, plus photos
  README.md
  CLAUDE.md
  AGENTS.md
  .claude/skills/add-wedding-page/SKILL.md
  .claude/skills/update-wedding-content/SKILL.md
  .cursor/rules/wedding-site-static.mdc
```

## Placeholder tokens

The couple's names are real and final: **Prenasen** and **Prishantini**. Never replace them with
`[PARTNER_A]` / `[PARTNER_B]` tokens. Their story on `story.html` is their real story from the PDF —
do not rewrite it into generic placeholder copy.

The core details are now filled in and should be kept consistent everywhere:

- Date: **5 December 2026**
- Venue: **The Garden Venue**
- City: **Johannesburg**
- Contact: **yeshria.pillay@gmail.com**

These placeholders are still open, and should be left as tokens until the couple supplies a value:
`[CEREMONY_TIME]`, `[RECEPTION_TIME]`, `[DRESS_CODE]`, `[NALANGU_DATE]`, `[NALANGU_TIME]`,
`[NALANGU_VENUE]`, `[HOTEL_NAME_1]`–`[HOTEL_NAME_3]`, `[REGISTRY_NAME_1]`–`[REGISTRY_NAME_3]`.

The homepage countdown reads `WEDDING_DATE_ISO` in `js/main.js` and shows months, weeks, days, hours,
minutes and seconds. It holds `2026-12-05T10:00:00`. The date is confirmed; **the time is still a
guess** — set it to the real ceremony time and keep it in step with `[CEREMONY_TIME]` on
`details.html`. If the constant is not a parseable date, the countdown stays hidden.

## Conventions

- Edit existing CSS variables in `css/styles.css` before adding new CSS files.
- Copy the existing header, nav, and footer when you add a page. Mark the current page with `aria-current="page"`.
- Nav is two rows: the four ceremonial pages (Home, Our Story, Nalangu, Wedding), then a quieter
  secondary row (Travel, Registry, RSVP). Only the primary row collapses on mobile.
- Decoration is applied with classes, not inline styles: `.silk`, `.bokeh`, `.bokeh--gold`, `.toran`,
  `.ganesha`, `.lamp`, `.strand`, `.pillar`, `.panel--crest`. Decorative images carry empty `alt` and
  `aria-hidden="true"`; the couple illustrations are content and carry real `alt` text.
- Keep the top garland on small screens. Side hangings drop away below 760px.

### Scroll reveals

`story.html` fades its text in as the reader reaches it. To animate anything:

- Add `data-reveal` for a fade-and-rise, or `data-reveal="fade"` to appear on the
  spot with no movement (used for the title and the short dramatic beats).
- Add `data-reveal-delay="400"` (milliseconds) to stagger a group.
- `js/main.js` drives it with one `IntersectionObserver`, gated on
  `[data-reveal]` existing, so pages without reveals pay nothing.
- A page using reveals needs the small failsafe script in its `<head>` (copy it
  from `story.html`). It adds the `js` class only when `IntersectionObserver`
  exists, and strips it again if `main.js` has not signalled `data-reveal-ready`
  within three seconds — so a failed script can never leave text invisible.
- Elements are only hidden under `.js`, so with JavaScript off nothing is
  hidden. `prefers-reduced-motion` reveals everything at once.

### Fixed fields

`.field-fixed` plus a variant such as `.field-fixed--champagne` on `<body>`
paints one backdrop pinned to the viewport, so copy scrolls over a still image
instead of the pattern restarting at every panel. Panels on such a page carry no
field class of their own.
- Keep JavaScript unobtrusive. Pages must work with JS off, except mobile nav, RSVP checks, and the countdown.
- Reuse `js/main.js`. Gate page-specific logic so other pages do not error.
- Use relative links (`story.html`, `css/styles.css`) so the site works as files or from a simple static server.
- Never add a framework, bundler, package manager, TypeScript, or backend unless the owner explicitly asks.

## RSVP today

The form on `rsvp.html` is front-end only. `js/main.js` validates required fields (name, email, attending) and shows an on-page message. Nothing is submitted to a server. The success message tells guests the form is not wired up and to contact `yeshria.pillay@gmail.com`.

## Images

`assets/images/` holds the motifs extracted from `Prenasen & Prishantini.pdf`: `silk-red.jpg`,
`toran-garland.png`, `bead-garland.png`, `ganesha.png`, `lamp-column.png`, `lotus-strand.png`,
`marigold-pillar.png`, `couple-nalangu.png`, `couple-seated.png`, `bokeh-champagne.jpg` and
`bokeh-gold.jpg`. They are the couple's own invitation artwork — prefer reusing them over adding new
decoration, and never substitute random stock art.

Guest photos go in the same folder. Use `<img>` with meaningful `alt` text when a photo is content.
Decorative frames can keep empty `alt`.

## Skills

- Adding a page, section page, or nav item: `.claude/skills/add-wedding-page/SKILL.md`
- Replacing names, date, venue, registry, schedule, travel, or RSVP copy: `.claude/skills/update-wedding-content/SKILL.md`
