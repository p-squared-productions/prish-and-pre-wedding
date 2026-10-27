# CLAUDE.md

This is Prenasen and Prishantini's wedding website: a static, multi-page HTML/CSS/JS site with no build step, no package manager, and no backend. Guests should be able to open the files directly.

The visual system is a classic South African Tamil / South Indian wedding invitation, rebuilt in HTML and CSS from `Prenasen & Prishantini.pdf` — that PDF is the visual source of truth. Silk crimson, temple gold, hanging marigold garlands, oil lamps, Ganesha, and a centred ceremonial layout. Keep the tone auspicious, warm and formal. Restyle through the `:root` variables in `css/styles.css`; do not drift toward modern minimal, pastel, or luxury-magazine.

## File map

```
./
  index.html      Home — the silk hero, Ganesha, couple, lamps, countdown
  nalangu.html    Nalangu — #traditions, #details, #programme
  details.html    Wedding — #traditions, #details, #programme
  favicon.ico     Red lotus tab icon, made from assets/images/lotus-icon.jpg
  sw.js           Service worker: caches images after the first visit
  .github/workflows/static.yml  Deploys october-redo to GitHub Pages
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
`[PARTNER_A]` / `[PARTNER_B]` tokens. The Our Story page has been retired; do not rewrite their story into generic placeholder copy if it returns.

The core details are now filled in and should be kept consistent everywhere:

- Date: **5 December 2026**
- Venue: **The Garden Venue**
- City: **Johannesburg**
- Contact: **yeshria.pillay@gmail.com**
- Nalangu: **4 December 2026**, 4:00 PM until late, **Meyersdal Nature Estate Club House**, casual / Indian attire (no green)
- Wedding: **5 December 2026**, 2:00 PM ceremony with reception to follow, formal / Indian attire (red reserved for the bridal couple)

No placeholder tokens are currently open.

The homepage countdown reads `WEDDING_DATE_ISO` in `js/main.js` and shows months, weeks, days, hours,
minutes and seconds. It holds `2026-12-05T14:00:00`, the 2:00 PM ceremony start; keep it in step with the time on
`details.html`. If the constant is not a parseable date, the countdown stays hidden.

## Conventions

- Edit existing CSS variables in `css/styles.css` before adding new CSS files.
- Copy the existing bells, skip link and footer when you add a page.
- Navigation is two hanging bells (`.bell--left`, `.bell--right`) on every page, linking to the other two pages: Home shows Nalangu and Wedding; Nalangu shows Home and Wedding; Wedding shows Home and Nalangu. There is no header bar. Copy the bell markup from `index.html`.
- Nalangu and Wedding each have three sub-sections (Traditions & Meaning, Details, Programme) reached by jump links under the page title. Travel, Registry and RSVP sections have been removed; the RSVP code in `js/main.js` is dormant.
- Decoration is applied with classes, not inline styles: `.silk`, `.bokeh`, `.bokeh--gold`, `.toran`,
  `.ganesha`, `.lamp`, `.strand`, `.pillar`, `.panel--crest`. Decorative images carry empty `alt` and
  `aria-hidden="true"`; the couple illustrations are content and carry real `alt` text.
- The top garland strip has been removed from every page; Ganesha stays. Side hangings drop away below 760px.
- On the homepage the couple illustration (`.hero__couple`) is pinned to the bottom of the viewport behind the copy, so only the text scrolls.
- The bells and Ganesha are `position: fixed` on every page. There is no footer.
- Nalangu and Wedding carry `.fade-under-ganesha` on `<body>`: `js/main.js` masks `.site-main` so copy fades out as it scrolls up to Ganesha. On those pages Ganesha must sit outside `<main>`, or it fades too.
- Nalangu (`.theme-nalangu`) and Wedding (`.theme-wedding`) share the hexagon ritual tiles, the card-free details and the `.nalangu-notice` band; each page sets their colours through custom properties (`--tile`, `--detail-*`, `--crown-*`, `--notice-*`). Nalangu accents are lotus blue, pink and teal; Wedding accents are green, red and gold.
- Homepage stages: `js/main.js` adds `.stages` to `<body>`; the three `.stage` blocks (names/date/verse, welcome, countdown) are pinned between Ganesha and the couple's heads and crossfade one after another as you scroll.

### Scroll reveals

No page uses reveals right now (`story.html` was removed; see git history). To animate anything:

- Add `data-reveal` for a fade-and-rise, or `data-reveal="fade"` to appear on the
  spot with no movement (used for the title and the short dramatic beats).
- Add `data-reveal-delay="400"` (milliseconds) to stagger a group.
- `js/main.js` drives it with one `IntersectionObserver`, gated on
  `[data-reveal]` existing, so pages without reveals pay nothing.
- A page using reveals needs the small failsafe script in its `<head>` (copy it
  from git history of `story.html`). It adds the `js` class only when `IntersectionObserver`
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
- Use relative links (`nalangu.html`, `css/styles.css`) so the site works as files or from a simple static server.
- Never add a framework, bundler, package manager, TypeScript, or backend unless the owner explicitly asks.

## RSVP

The RSVP form has been removed from the site. The form-handling code in `js/main.js` is gated on `#rsvp-form`, so it does nothing without it.

## Images

`assets/images/` holds the motifs extracted from `Prenasen & Prishantini.pdf`: `silk-red.jpg`,
`toran-garland.png`, `bead-garland.png`, `ganesha.png`, `lamp-column.png`, `lotus-strand.png`,
`marigold-pillar.png`, `couple-nalangu.png`, `couple-seated.png`, `bokeh-champagne.jpg` and
`bokeh-gold.jpg`. They are the couple's own invitation artwork — prefer reusing them over adding new
decoration, and never substitute random stock art.

The pages reference `.webp` copies of these images (the bells scaled to 480px wide); the
original `.png`/`.jpg` files stay alongside as sources. When you add or replace an image,
save a `.webp` copy and reference that. `sw.js` serves images cache-first, so if you
replace an image under the same file name, bump `CACHE` in `sw.js` so guests fetch it again.

Guest photos go in the same folder. Use `<img>` with meaningful `alt` text when a photo is content.
Decorative frames can keep empty `alt`.

## Skills

- Adding a page, section page, or nav item: `.claude/skills/add-wedding-page/SKILL.md`
- Replacing names, date, venue, registry, schedule, travel, or RSVP copy: `.claude/skills/update-wedding-content/SKILL.md`
