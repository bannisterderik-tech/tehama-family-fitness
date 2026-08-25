I'll implement the round-3 recommendations in the generator itself. First I'm reading the skill, the data/build files, and the current markup so the changes stay in voice and on the real facts.The review notes and generator are next — I'll pull the round-3 findings and the schedule/copy/CSS sections they touch.The later review sections should have the now-line, palette, and type notes. I'll also scan the generator CSS and the pages those recommendations hit.I have the review thesis. Next I’ll map the week grid, type, palette, and the pickleball/tour/childcare pages in the generator.I’ll sample the grass color from the exterior photo, then read the rest of the generator so the palette and copy stay consistent.I have the sampled grass color and the generator map. Next I’ll land the CSS and the week-grid now-line, then the page-level copy and filter wiring.The 900 weight should live on the page title only, so I’m dropping the statement block back to 800.Build completed with 28 pages. Next I’ll check for leftover template tokens, unicode escapes, unbalanced tags, and banned phrasing.All eight fixes are in the generator. `node gen/build.mjs` prints **build complete** and **28 pages**. No leftover `${`, no literal `\u`, `<div>` tags balance, and customer-facing copy has zero hits for `the club` / `their own` / `this business` / `this website` / `the old site`.

What shipped:

1. **Now-line** on `/schedule/` — 1px rule at the current time (same `top(mins)` math as the blocks), time pill, minute updates, hidden outside 5a–8p, static under reduced motion. Current day column is marked; Sunday is valley gold.

2. **Hot/cool** — dry-grass gold sampled from `assets/hero/exterior.jpg` (`#EAD9C5`), used on `/gym-red-bluff/` and the 110° valley copy. Logo ice on `/pool/`. Not painted everywhere.

3. **Type** — h1 capped at 5.5rem and kept as the one 900 shout. Italic pulled off every h1. Serif italic remains on the temperature line, the Karla sentence, and captions.

4. **Card hover** — lift and shadow gone; volt border plus the existing left bar.

5. **`/schedule/?cc=1`** — loads with “Childcare open” pressed. Homepage and `/childcare/` primary CTAs point there.

6. **Parent hours** — ice pip on the grid, “Parent hours” chip on the tables (replaces “Childcare open,” does not double it).

7. **Pickleball $5** — `/pickleball/` headline is “$5 to play.” Linked from the homepage list and the comparison table. Two-source play-time caveat kept.

8. **`/tour/`** — one caption: *Three photographs of this building. The rest show rooms like ours — come stand in the real one.*

Writeup is in `research/grok-build-4-report.md`. I could not click through this in a browser in this session; the now-line and `?cc=1` filter need a desktop pass on `/schedule/` (the grid hides below 900px).
