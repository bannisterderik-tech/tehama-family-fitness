# BUILD TASK — implement your own round-3 recommendations

You reviewed this site and were right about most of it. Now build the fixes yourself.
You have write access. This is an implementation job, not another critique.

## The codebase

- `gen/data.mjs` — facts + the `tbd` registry (unconfirmed values render as an honest ask).
- `gen/build.mjs` — the generator. ALL markup, CSS and JS live here as template literals.
- `docs/` — build output. **Never edit `docs/` by hand. It is wiped on every build.**
- Build with `node gen/build.mjs`. It must print "build complete" and **28 pages**.

## Already done since your review — do not redo

Hero rewritten as an offer ("Pool. Court. Kids' room. All included." + "Get your rate").
Duotone removed from hero media. `/schedule/` grid restored and wired. Rate-request form
(`rateForm()`, composes prefilled SMS on mobile / mailto on desktop). Live NWS temperature
(station KRBL) in the top bar linking to `/pool/`. `todayStrip()` replacing the Monday table.
Karla-owns-the-gym block on the homepage. 3-gym comparison table. Footer hours as data.
`todayHours()` fixed. Marquees removed. askBox concat bug fixed.

## Build these, in priority order

### 1. The now-line on the week grid
Your own idea and the best one in the review. On `/schedule/`, a 1px ice rule sitting on the
current time across the whole grid (grid spans 5:00–20:00), with a small time label. It should
sit at the correct vertical offset using the same `top(mins)` maths the blocks use, update
every minute, and hide entirely outside 5a–8p. Under `prefers-reduced-motion` it must be a
static rule at "now", never animated. Also mark the current day column.

### 2. The hot/cool chromatic argument
Right now every section is navy-or-white. Introduce the valley/refuge idea you described:
a warm "valley" ground (dry-grass gold, used sparingly, for exterior/heat/local content) and a
cool "pool" ground (the logo ice `#B8D0E0` / steel `#88A8C8`) for water/refuge content. It must
stay derived from the logo palette plus one warm neutral sampled from the real valley grass in
`assets/hero/exterior.jpg`. Do NOT add a saturated third brand hue. Apply it where it argues
something — `/pool/`, the heat content, `/gym-red-bluff/` — not everywhere.

### 3. Type discipline
Cap the display scale (h1 currently `clamp(2.7rem,8.6vw,7.6rem)`) to roughly 5.5rem max.
Reserve the 900 weight for ONE statement per page. Instrument Serif italic is currently used on
almost every h1 — cut it back to the temperature line, the Karla sentence, and captions.

### 4. Kill card hover-lift
Remove `transform: translateY(-4px)` and the shadow on `a.card:hover`. Replace with something
quieter that does not imitate every SaaS template.

### 5. Childcare as a filter, not a policy page
Make `/schedule/?cc=1` work: on load, if the query param is present, activate the
"Childcare open" filter and set that button `aria-pressed="true"`. Point the homepage childcare
CTA and the `/childcare/` primary CTA at `/schedule/?cc=1`.

### 6. Parent-hours chips
On `/schedule/`, mark sessions that fall inside childcare hours with a subtle "parent hours"
affordance so a parent can scan for them. Do not double up with the existing childcare tag —
make it work visually, your call.

### 7. Pickleball $5 as a headline fact
It is the only real price on the site. Surface it on `/pickleball/` prominently and link it
from the homepage. Keep the existing two-source caveat about play times.

### 8. `/tour/` confession
Cut the four-step "About these pictures" section down to one honest sentence in a caption.

## Hard rules — violating any of these is a failed job

- **No invented facts.** Every claim traces to `data.mjs`. No prices, no hours, no quotes.
- **No fabricated testimonials or member names.** None exist yet.
- **No synthetic people in any imagery.** Never children.
- Keep AA contrast. The palette is sampled from the logo — do not introduce off-brand colour.
- Do not delete pages. `node gen/build.mjs` must end with 28 pages.
- Do not touch `docs/` directly.

## Definition of done

Run `node gen/build.mjs` and confirm: build completes, 28 pages, no `${` left unrendered in
output, no literal `\u` escapes in output, and `<div>` tags balance on every page. Then write a
short summary of exactly what you changed to `research/grok-build-4-report.md`.

---

## VOICE — non-negotiable, applies to every word you write

The site **is** the gym talking to a neighbour. Not a consultant describing a gym.

- **"We", "our", "us"** for the business. **"You", "your"** for the reader.
- **NEVER** "the club", "this business", "their own", "the club's own", "the members named".
- **NEVER** talk about the website itself: no "this website", "any website", "the old site",
  "commissioned imagery", "we would rather show you", "a page nobody searches for".
- **NEVER** explain our marketing reasoning to the customer. No "free traffic", "conversion",
  "trust signal", "thin page". That is internal analysis and it must not ship.
- No apologising, no epistemology, no meta. State the thing and move on.

I have just rewritten the whole site into this voice. **Do not undo it.** Any copy you touch
or add must match it. If you change a headline or a paragraph, it speaks as the gym.

Before you finish, grep your own output for: `the club`, `their own`, `this business`,
`this website`, `the old site`. All must return zero in customer-facing copy.
