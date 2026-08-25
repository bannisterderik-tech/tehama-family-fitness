# Adversarial review round 3 — MARKETING and DESIGN

You are two people at once, and both are hostile to the work.

**Person A: a conversion-obsessed marketing director.** You have launched gyms. You judge a
website by one number: how many strangers become members. You do not care about craft.

**Person B: an award-winning art director.** You have shipped Awwwards Site of the Day work.
You judge by whether the page is *distinctive* — whether it could only be this business.

Your job is to attack this site and then tell me exactly what to build instead. Be specific
and implementable. Vague advice ("add social proof") is worthless — tell me the words, the
placement, the mechanism.

---

## The business — real, verified facts only

Tehama Family Fitness Center, 2498 S Main St, **Red Bluff, California** — a Sacramento Valley
farm town of ~14,000. Opened September 2001. 30,000 sq ft, single storey, locally owned by the
Stroman family. **Karla Stroman, an owner, teaches the 6:00 AM spin class. Her daughter Aubrie
and Kyle Tingley are co-owners and are both on the class schedule.**

**What it has that no competitor in the county has:**
- 3-lane **indoor** pool + spa (Red Bluff hits 110°F; the only other pool in town is outdoors)
- Full-size basketball court, open gym twice a day Mon–Fri
- Racquetball — only court in town
- **3 indoor pickleball courts**, permanent lines, $5 non-member drop-in
- **Childcare in the building** — no other Red Bluff gym has any
- **54 classes/week across 15 instructors**, all included, no class fee
- Sauna both locker rooms, Fuel Bar, coffee free until 9 AM

**Competitors:** Planet Fitness (1025 S Main, publishes **$15/mo**, open late/24h, no pool, no
court, no childcare, no classes, 4.2★ on 177 Google reviews). Red Bluff Health & Fitness (open
to 10 PM, **outdoor** pool, some classes).

**The weaknesses — do not let me hide these:**
- **Closes at 8 PM weeknights, 6 PM weekends.** Competitors run later.
- **Zero classes on Sunday, two on Saturday** — 20 staffed weekend hours nearly empty.
- **No price is published anywhere.** Their ABC online join flow shows literally two SKUs
  (SINGLE MONTHLY, SINGLE 12 MONTH) and **no dollar figures at all**. A business with "Family"
  in its name **cannot sell a family membership online.**
- 405 Facebook reviews at 96% recommend — but only ~15 Yelp and an unclaimed-looking Google
  presence. The reviews are on the wrong platform.
- Only **3 real photographs of the business exist.** Everything else on the site is
  commissioned AI imagery, disclosed as such on /tour/. No synthetic people anywhere, ever.

---

## What is already built

A 28-page static site. Source: `gen/data.mjs` (facts + a `tbd` registry so unconfirmed values
render as an honest "call us" instead of a fake number) and `gen/build.mjs` (the generator).
Output: `docs/`. Read the real files — do not guess.

Design system, locked: every colour sampled from their actual logo mark (royal navy `#182880`,
ice `#B8D0E0`, steel `#88A8C8`, near-black `#101830`); action blue `#2A44CC` is that navy
raised to clear AA. Archivo 900 display at architectural scale, Instrument Serif italic accents,
Source Sans 3 body. Signature piece is `/schedule/` — a real time-rail × 7-day grid with
childcare windows drawn behind the columns.

**Standing rules I will not break, so do not suggest them:** no synthetic people in imagery; no
claim not sourced to the business; no comparative claim unchecked against both competitors; a
neighbouring business's website is not a source about this one.

---

## Deliver exactly this, in this order

### 1. THE KILL LIST
The 10 things most costing this business members, ranked by money lost. For each: what is wrong,
why it costs conversions, and **the specific fix** — actual copy, actual placement, actual
mechanism. Attack the homepage hero and the funnel hardest.

### 2. THE ONE THING
If I change only one thing on this entire site to get more members, what is it and why? Argue it.

### 3. BEAT THE CATEGORY
Every gym site runs the same playbook: hero video, "join now", class grid, trainer bios, price
tiers. Name the 5 marketing moves that would make THIS site outperform any fitness website in
the country — moves that work *because* it is a small-town family gym, not in spite of it.
What can a 14,000-person town do that Equinox structurally cannot?

### 4. DESIGN — YOUR UNIQUE TAKE
Person B now. Not generic trends. Given: navy/ice logo palette, almost no real photography,
an information-dense schedule as the crown jewel, and a plain metal-roofed building on a
highway in a valley that hits 110°F. What is the *visual idea* that makes this unmistakably
this gym and would make a jury stop scrolling? Be concrete — layout, motion, type, structure.
Include at least one idea I would never think of.

### 5. WHAT I GOT WRONG
Where has my judgement been bad? What have I over-built, under-built, or fooled myself about?
Be blunt.
