# Prenasen & Prishantini — wedding website

A multi-page wedding site styled as a South African Tamil / South Indian wedding invitation: silk
crimson, temple gold, hanging marigold garlands, oil lamps and a centred ceremonial layout. It is
static HTML, CSS, and JavaScript only — no build step, no framework, and no backend.

The design is rebuilt in HTML and CSS from `Prenasen & Prishantini.pdf`, which stays in the folder as
the visual reference. The decorative artwork in `assets/images/` was extracted from that PDF.

## Pages

| Page | What it is |
| --- | --- |
| `index.html` | The silk hero — garland, Ganesha, the couple, lamps, and the countdown |
| `story.html` | "A Chance Encounter" — their real story, on champagne gold |
| `nalangu.html` | The Nalangu ceremony and what each ritual means |
| `details.html` | Wedding day: ceremony, reception, order of the day |
| `travel.html` | Getting there, where to stay, parking |
| `registry.html` | Gift registry |
| `rsvp.html` | RSVP form (front-end only) |

## How to open it

- Double-click `index.html` and browse from there.
- Or, if you want a local server, run something like `npx serve` from this folder. That is optional. There is no `package.json` to install.

## The details

Set throughout the site:

- **5 December 2026** — The Garden Venue, Johannesburg
- Questions go to **yeshria.pillay@gmail.com**

## Placeholder tokens still to replace

Search the project for these and swap them for the real details when you have them:

- `[CEREMONY_TIME]`, `[RECEPTION_TIME]`, `[DRESS_CODE]`
- `[NALANGU_DATE]`, `[NALANGU_TIME]`, `[NALANGU_VENUE]`
- `[HOTEL_NAME_1]`–`[HOTEL_NAME_3]`
- `[REGISTRY_NAME_1]`–`[REGISTRY_NAME_3]` (and their `href`s)

The homepage countdown reads `WEDDING_DATE_ISO` in `js/main.js`, currently `2026-12-05T10:00:00`.
The date is right; **the 10:00 time is a placeholder** — change it to the real ceremony time once it
is set. If that value is not a parseable date, the countdown simply stays hidden.

Photos go in `assets/images/`, alongside the invitation motifs.

## Keep it static

Later work should stay vanilla HTML, CSS, and JS unless the site owner asks for something else. Reuse `css/styles.css` and `js/main.js`. Do not add a framework, bundler, or backend by default.

The RSVP form only checks fields in the browser. It does not send replies anywhere yet.
