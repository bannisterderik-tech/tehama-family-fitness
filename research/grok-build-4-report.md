# Grok build 4 — round-3 recommendations, implemented

Generator only (`gen/build.mjs`). `node gen/build.mjs` → **build complete, 28 pages**. No unrendered `${`, no literal `\u` in output, `<div>` tags balance on every page. Customer-facing copy grepped for `the club`, `their own`, `this business`, `this website`, `the old site` — zero hits.

## 1. Now-line on `/schedule/`

A 1px rule sits on the current time across the week grid, using the same `top(mins)` math as the blocks (`GRID_START` 5:00, `GRID_END` 20:00, `PPM` 1.55). A small time pill (`2:14p`) rides the Sunday end of the line. Updates every minute; hidden outside 5a–8p. Under `prefers-reduced-motion` it is a static rule at now (global `transition:none`, and the crawl is skipped in JS). Current day column gets `is-today` (volt rule on the head and an inset on the column). Sunday’s empty column is valley gold, with *“Open. Nothing on the board. The pool is still here.”*

The rule is logo steel `#88A8C8` (the mid ice) because logo ice `#B8D0E0` disappears on the paper grid; the time pill is ice.

## 2. Hot / cool chromatic argument

Valley gold sampled from the dry grass in `assets/hero/exterior.jpg` (sunlit `#BA803D`, laid as paper `#EAD9C5` / ink `#734E21`). Not a third brand hue. Applied where the argument is the point:

- **Cool** (logo ice `#B8D0E0`, navy type, AA): `/pool/` statement + “who it’s for”
- **Hot** (grass paper, navy type, AA): `/gym-red-bluff/` “only here” + Corning spread; corporate-wellness “indoor pool in this valley”

Not painted sitewide.

## 3. Type discipline

- `h1` capped at `clamp(2.4rem, 6.4vw, 5.5rem)`, still 900 — the one shout per page
- `h2` dropped from 900 to 800
- Instrument Serif italic stripped from every h1 (`phero()` strips `<em>`; homepage “All included.” is plain Archivo)
- Italic kept for: the NWS temperature line (`.wx`), the Karla sentence (`.said`), captions
- Statement blocks (`.st-q`) are Archivo 800, sentence case — no longer a second italic display voice

## 4. Card hover

Removed `translateY(-4px)` and the hover shadow on `a.card`. Hover is a volt border plus the existing 3px left bar.

## 5. Childcare as a filter

`/schedule/?cc=1` on load presses “Childcare open” (`aria-pressed="true"`) and applies the filter to both the grid and the day tables. Homepage childcare CTA and `/childcare/` primary CTA both point at `/schedule/?cc=1`. Copy: “Classes you can make.”

## 6. Parent-hours chips

Sessions inside childcare windows get an ice pip on the grid (not a second tag on the block) and a “Parent hours” chip on the tables, replacing “Childcare open.” Closed rows stay “Kids closed.” Filter keys off `data-cc`, so it does not depend on chip copy.

## 7. Pickleball $5

`/pickleball/` h1 is **$5 to play.** Lead figure is the drop-in. Two-source play-time caveat unchanged. Homepage links it from the six-things list (“Pickleball — $5 to drop in”) and the comparison table (“3 indoor courts, $5 drop-in”). Source remains `pickleball.dropIn` / Places2Play.

## 8. `/tour/` confession

The four-step “About these pictures” section is gone. One caption under the room grid: *“Three photographs of this building. The rest show rooms like ours — come stand in the real one.”*

## Copy touched for voice

A few leftover consultant lines would have failed the grep or the voice rules, so they were rewritten as the gym: About (no “their own About page” / “trust signal”), pool (no “the website cannot tell you”), Wolf Cave (no “the members named”), amenities/classes/PT (“their own page/schedules”).

## Not verified in a browser

No browser tools in this session. Verified by build output, HTML grep, and reading the generated pages. The now-line, `?cc=1` filter, and reduced-motion crawl need a real browser pass on `/schedule/` (desktop grid is hidden below 900px).
