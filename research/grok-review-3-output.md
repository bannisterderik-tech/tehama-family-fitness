I'll review the actual site, not a guess — starting with the source data, generator, homepage, and funnel pages so the kill list is grounded in what's really shipping.Previous review files are on disk; I'll read the live source and pages first so this round attacks what's actually shipping, not last round's notes.Homepage is loaded. Next I’ll walk the join funnel, membership, day-pass, schedule, and about pages — those are where members are actually won or lost.The schedule page looks empty — I’m checking whether the weekly grid is actually generated or just advertised.I read the generator, the data file, and the built pages. This is not a taste note. It is a conversion autopsy.

The short version, before the list: the site is a beautifully typeset refusal to sell a membership. The hero asks people to look at a beige metal roof. The only priced SKU on the entire internet for this business is a **$5 pickleball drop-in** sourced from a third-party directory. The thing you keep calling the crown jewel — the week grid — is written in `gen/build.mjs` as `weekGrid()` and **never called**. `/schedule/` is a headline, a “call us” band, and a filter script pointed at DOM that does not exist.

---

## 1. THE KILL LIST

Ranked by money walking out the door.

### 1. No number a family can use, anywhere

**What’s wrong.** `/membership/` is titled “Straight answer: not published yet.” The rate table is seven rows of “Call for today’s rate.” The homepage membership block is an ask-box whose copy concatenates into garbage: *“Call for today’s rate Rates aren’t published online yet.”* Planet Fitness, 1.5 miles north on the same street, publishes **$15/mo**. ABC Fitness shows two SKUs — SINGLE MONTHLY, SINGLE 12 MONTH — and **zero dollars**. A business with Family in the name cannot sell a family on the internet.

**Why it costs members.** Price is the first question. When it is missing, the visitor assumes the worst (more than PF, therefore a trap), and leaves. You even wrote the diagnosis on the page — *“hiding it just reads as a trap”* — and then hid it.

**The fix.**

- Front-desk call, this week, questions A1–A12 on `client/FRONT-DESK-CALL-SHEET.md`. You do not ship another page until A1, A3, A8, A10, A12 are filled.
- Until then, do not run a rate table of empty tags. Run **one** offer module, homepage, immediately under the hero, full width, navy ground, ice type:

> **Get the family rate in under a minute.**  
> One membership. Pool, court, pickleball, childcare, 54 classes. No class fee.  
> [Call 530-528-8656]  [Text us your family size →]

- The text path is a 4-field form, `/membership/#rate`, posted to `frontdesk@clubtehama.com` (and a SMS to the desk phone if they have one):

  1. First name  
  2. Mobile  
  3. How many people (1 / 2 / 3–4 / 5+)  
  4. Call me at (dropdown: today 9–11 / 11–1 / 4–6)

  Submit label: **“Text me the family rate.”** Confirmation: *“Courtney at the desk will text you today. If you’d rather not wait, walk in — we’re open till 8.”*

- The instant A3 is confirmed, the same module becomes:

> **Family membership — $XX/mo**  
> Couple $YY · Single $ZZ · Day pass $N  
> Enrollment: $E (or “no enrollment fee this month”). Month-to-month, cancel at the desk.  
> [Start a family membership]  [Walk in today]

- Header button, every page, desktop and mobile: **Join** → `/membership/`, not `tel:`. Keep the phone as a text link under it.
- ABC: add the family SKU or kill the “Join online” link. A join link that cannot sell the product in the business name is a conversion leak.

### 2. The homepage hero sells the warehouse, not the membership

**What’s wrong.** Kick: “Red Bluff · South Main · Since 2001.” H1: **“Come see the building.”** Lede lists the amenities as a clause. Primary button: Call. Secondary: “Walk in — open till 8.” Background: a commissioned golden-hour exterior, then `filter: grayscale(1) contrast(1.3) brightness(.62)` plus `mix-blend-mode: color` navy at 85% opacity. The oaks, the trucks, the metal roof — the only things that prove this is South Main — are painted into a crypt.

People in a town of 14,000 have driven past this building for 25 years. They do not need to “see the building.” They need to know what is *inside* that PF does not have, and what it costs.

**Why it costs members.** First screen is 80% of mobile decisions. This first screen is a tour brochure.

**The fix.** Replace the hero copy and the CTA pair. Keep the film toggle. Stop duotoning this photograph; use the real color exterior, unfiltered, darkened only with a bottom gradient so type holds.

Kick: `The only indoor pool in Red Bluff · Childcare in the building`

H1 (two lines, not three):

> **Pool. Court. Kids’ room.**  
> *All included.*

Lede, 28 words:

> 30,000 sq ft on South Main since 2001. Indoor pool, full basketball court, three pickleball courts, childcare, 54 classes a week. Planet Fitness has none of those.

Buttons:

> **Get the family rate** → `/membership/#rate`  
> **Walk in today — open till 8** → `/day-pass/`

Under-line:

> Karla Stroman, an owner, teaches the 6:00 AM spin. Courtney is at the desk. No sales process.

Summer variant (June–September), same module, swap the H1:

> **It’s 110° outside.**  
> *The pool is indoors.*

Pull the number from NWS Red Bluff (`KRBW` / `KRBL`) at build time or via a 6-line fetch. If the fetch dies, fall back to “This valley hits 110°.” Do not invent a temperature.

### 3. Every CTA on 28 pages is “call this number”

**What’s wrong.** `acts()` in `build.mjs` hard-codes `tel:+15305288656` as the primary button on almost every page. Sticky header: Call. Mobile menu: Call. Membership, day-pass, childcare, PT, corporate, FAQ, contact, the closing band: Call. The only “Join online” on the whole site is a ghost button on `/membership/`, third in a list, pointing at an ABC flow with no prices and no family SKU.

**Why it costs members.** A large share of mobile visitors, especially parents of small children, will not place a voice call to a gym. You have built a funnel that only the people who already intended to call can complete. Silent browsers — the majority — bounce.

**The fix.** One primary action, sitewide, in this order of preference:

1. **Get the family rate** (the 4-field form above)  
2. **Walk in today**  
3. Call, as a text link, always with the number visible: `530-528-8656`

Change `acts()` so the primary is `/membership/#rate` with label **Get the family rate**. Secondary stays walk-in. Phone moves under the buttons: `Or call the desk — 530-528-8656`.

Add a sticky mobile bar, 56px, above the home indicator:

`[Get the family rate] [Walk in]`

Not a third “Call” button competing with iOS’s own call detection.

### 4. `/schedule/` is empty. The grid you keep citing is not on the page.

**What’s wrong.** `weekGrid()` is 80 lines of real work — time rail, 7 day-columns, packed lanes, childcare bands, Sunday as a named void. The `/schedule/` template is: photographic hero, a CTA band (“Every one of these is included”), and a filter script querying `.filters button`, `#sched tbody tr`, and `.wg-s`. None of those nodes exist. The homepage teases Monday’s table and links “See the whole week →” into a dead end.

A parent deciding between Tuesday 8:15 Barre (childcare open) and Tuesday 6:00 AM Stretch (childcare closed) cannot see the week.

**Why it costs members.** The schedule is the product. You hid the product.

**The fix.** In the `/schedule/` `P()` body, between the hero and the band, actually emit:

```
${weekGrid()}
<div class="filters">All / Classes / Childcare open / Morning / Evening</div>
<div id="sched" class="wg-tables">${DAYS.map(d => dayTable(d)).join("")}</div>
```

Above the grid, one line:

> **Tap a class. If it says childcare open, you can actually go.**  
> Karla (owner) — Mon/Wed 6:00 AM Spin. Aubrie (co-owner) — Lean & Mean weekday mornings.

Sunday column stays empty on purpose, with the existing empty-state copy: *“No classes — building open 8–6. Pool, court, weights.”* That emptiness is a designed fact, not a bug, once it is *visible*.

The homepage should not dump Monday’s 14-row table. It should embed a **today-only strip**: the next 3 sessions from `sessions` filtered by `new Date()`, each with instructor + childcare tag, then “Full week →”. A Tuesday night visitor currently sees Monday 6 AM Spin. Useless.

### 5. Childcare, the actual reason a parent joins, is a “call us”

**What’s wrong.** Unique in the county. Hours are solid. Ages, first-visit, registration, and whether it is included are `tbd`. The homepage childcare block: *“Ask at the desk Call the desk…”* (same concatenation bug). `/childcare/` asks four questions and answers none of them. The 6 AM owner spin — the brand story — is tagged **Childcare closed**. The parent who would be converted by “the owner teaches my class” cannot bring the kid.

**Why it costs members.** A parent of a two-year-old will not join a gym that will not say whether their child is allowed in the room.

**The fix.** Call sheet D1–D6, this week. Until then, do not pretend you have a childcare conversion path. On `/childcare/` and in the homepage childcare module, put this exact block:

> **Alma runs the kids’ room.**  
> Open 8–1 every day but Sunday, plus 4–8 Mon–Thu.  
> Ages, first visit, and whether it’s included: one call, 530-528-8656, ask for Alma.  
> [See which classes you can actually make →] `/schedule/` with the childcare filter on.

The moment D1/D6 land, the hero under-line and this block become:

> **Kids ages X–Y. Included with membership.** First visit: bring [form / shot record]. Time limit: N minutes.

On `/schedule/`, the childcare band is the conversion, not a pastel overlay. Filter default for a visitor who arrived from `/childcare/`: **Childcare open**. Add `?cc=1` and honor it.

Do not sell 6 AM Spin to parents. Sell 8:15 Zumba with Tonnie, 9:15 Lean & Mean with Aubrie, 4:30 Body Burner, 5:30 Tone Zone. Those are the parent SKUs. Put a “Parent hours” chip on those rows.

### 6. Social proof is a Facebook hyperlink

**What’s wrong.** 405 reviews, 96% recommend, 3.1K followers in a town of 14,000 — and the homepage renders that as a headline plus “Read the reviews on Facebook →.” `proof()` exists in the generator and is barely used; `.pf-grid` is not even in the CSS I read. Zero pull-quotes. Zero first names. Google presence is thin and unclaimed-looking. Yelp is ~15 reviews. The one real photograph of people is a 320×240 tai chi shot.

**Why it costs members.** A stranger trusts neighbors. You sent them off-site to a platform Google does not treat as reviews, and you showed them empty rooms.

**The fix.**

- Claim and complete the Google Business Profile this week. Move 50 of the Facebook reviewers onto Google with a front-desk card: *“If you have 30 seconds, a Google review helps the next family find the pool.”* Hand it to Courtney.
- On the homepage, immediately after the six-amenity list, a proof strip — not a link, the words:

> **96% of 405 neighbors recommend this gym.**  
> 3,100 people follow it in a town of 14,000.

- Under that, **six quotes**, first name + Red Bluff, pulled only from Facebook reviews you have on file (do not invent, do not paraphrase into marketing). Format:

> “I can swim in July without dying and leave the kids with Alma.”  
> — Jennifer, Red Bluff

  If you do not have usable quotes yet, do not fake them. Run a 48-hour desk ask: “Can we put your first name and one sentence on the site?” Six yeses is a day’s work in a town this size.

- Use the real tai chi photograph at a size a human can see — full-width, 16:9 crop, caption: *“Tai chi, 7:15 a.m., every weekday. Kevin. This is a real class in this building.”* It is the only proof of life you own.

### 7. The owner-on-the-floor line is buried on `/about/`

**What’s wrong.** The best sentence on the website is already written in `data.mjs`: *“The person taking your 6 AM spin class owns the building.”* It appears as a statement block on `/about/`. The homepage never says Karla, Aubrie, or Kyle. Instructors page does, as cards. Equinox cannot say this. You hid it.

**Why it costs members.** Local trust is the only thing a $15 national franchise cannot buy. You spent it on a page nobody’s first visit reaches.

**The fix.** Homepage, third screen (after hero + offer module), full-bleed navy:

> **Karla Stroman owns this gym. She teaches the 6:00 AM spin.**  
> Her daughter Aubrie teaches Lean & Mean most weekday mornings. Kyle Tingley, co-owner, is in the studio Wednesday nights.  
> [See who’s on the board this week →]

Do not wait for the 2019 magazine confirm to use the schedule facts. Karla/Aubrie/Kyle on the 2026 calendar is already in `sessions`. Ownership *titles* can keep the Enjoy Magazine footnote. The teaching is not in dispute.

### 8. The trial is unpriced, so it is not a trial

**What’s wrong.** `/day-pass/` is the conversion you keep pointing at. Gym day-pass: “Call for the day-pass rate.” Pickleball: **$5**, the only dollar sign on the site, sourced from Places2Play, with a “confirm at the desk.” No first-class-free. No “bring the kids Thursday 9.” Walk-in is right; the door price is missing.

**Why it costs members.** A trial with an unknown price is not a trial. It is another phone call.

**The fix.**

- A12 on the call sheet, this week.
- Until then, the day-pass card becomes:

> **Walk in. Look at the pool. Stay if you want.**  
> Day-pass price: told at the desk, no sales process. Pickleball drop-in is $5.  
> Coffee is free until 9. If a class is running, you’re welcome in it — tell the instructor it’s your first.

- The $5 pickleball is a Trojan horse. Put it in the header as a text link on `/` and on `/pickleball/`: **Pickleball $5**. League nights (Tue 6:30, Sat 8:00) as the next line, with the existing two-source caveat.
- Mechanism for converting a $5 drop-in: a 3×5 card at the court, and a one-line site module on `/pickleball/`:

> Played today? Membership includes these courts, the pool, and childcare.  
> [Get the family rate]

### 9. You lead with the 8pm close harder than you lead with the pool

**What’s wrong.** Footer of every page: *“We close at eight.”* Marquee: “Open till 8.” Hero under-line: “till 8.” About. `/gym-red-bluff/`. The honesty is correct. The prominence is a sales objection you are raising for Planet Fitness.

`/gym-red-bluff/` is the best marketing page you wrote — names the three gyms, admits the hours, admits the $15, then lists what only this building has. It is not in the nav. It is in the footer under Join.

**Why it costs members.** You trained the visitor to remember the weakness. PF’s entire pitch is hours and price. You handed them both.

**The fix.**

- One honest sentence, one place: `/gym-red-bluff/` and the FAQ “What time do you close?” Not the footer of 28 pages. Footer becomes hours as data: `Mon–Fri 5a–8p · Sat–Sun 8a–6p`. That is information. “We close at eight” is an apology.
- Lift the comparison onto the homepage as a 3-column table, after the six-amenity list. Only facts you have already checked against both competitors:

| | Tehama Family | Planet Fitness (1025 S Main) | Red Bluff Health & Fitness |
| Indoor pool | 3 lanes | No | Outdoor only |
| Childcare | In the building | No | No |
| Pickleball | 3 indoor courts | No | — |
| Basketball | Full court, 2×/day | No | No |
| Classes | 54/wk, included | None | Some |
| Published price | Call / form | $15/mo | — |
| Weeknights | 5a–8p | Late / 24h | To 10p |

No adjectives. The table does the selling. Link the heading: “What’s actually different.”

- `todayHours()` currently prints both ranges after “Open today,” which is false on Saturday. Make it actually today.

### 10. 21 empty rooms, then painted navy, instead of the three real photographs

**What’s wrong.** The commissioned pool, court, childcare room, spin room are competent empty-municipal images. You then grayscale-duotone every hero into the logo navy, so they become the same picture. The three real photographs — B&W pano, Matrix floor crop, 320px tai chi — are treated as leftovers. `/tour/` spends a whole section confessing the imagery to other designers. A mother in Red Bluff does not reward you for that confession. She reads empty rooms as “this gym is dead.”

**Why it costs members.** People join gyms that look used. You showed a closed municipal pool and a childcare room with no child (correct: no synthetic children) and then made it look like a nightclub.

**The fix.**

- Homepage hero: **real color exterior, no grayscale, no navy multiply.** Gradient only at the bottom for type.
- `/pool/`: commissioned pool **unfiltered, in color**. Caption: *“Commissioned image of a 3-lane indoor pool of this type — not a photograph of these exact tiles. Come stand on the deck.”* Honesty belongs in a caption, not a manifesto.
- `/`: the real pano, full bleed, B&W, no overlay, after the offer module. Caption: *“2498 S Main. This photograph is of this building.”*
- Strength floor: use the real Matrix photo at a human height, not `max-height: 340px` letterboxed. It is the only interior that is true.
- Tai chi: as in #6, large.
- Stop commissioning more empty rooms until the 19-shot walkthrough lands. More empty rooms will not fix a navy filter.
- `/tour/` confession: cut from four steps to one sentence at the bottom.

---

## 2. THE ONE THING

If you change only one thing on this entire site, change the **homepage hero from a tour invitation into a family-rate machine.**

Not the palette. Not another class page. Not a better marquee. The first screen.

**Why this, and not “publish the price.”** You do not have the price. Waiting on the desk is correct and also the stall that is currently killing you. The hero is the one surface you fully control today. Right now it spends the most expensive pixels in the business on “Come see the building” and a phone number. Swap those pixels for:

1. The three things no competitor has (pool, court/pickleball, childcare), in the headline.  
2. A non-phone action that starts a family membership conversation (the 4-field form).  
3. Walk-in as the backup, because that is how this town actually joins.

That single module, if it is the only thing you ship this week, does four jobs the rest of the 28 pages currently fail at: names the offer, names the differentiators, gives a silent visitor something to do, and stops competing with Planet Fitness on “call us to find out.”

When A3 lands, the same module eats the number and the form becomes “Join.” You will not have to redesign. You will fill in a blank.

Everything else on the kill list is downstream of this. A beautiful schedule nobody can act on still loses to $15. An honest 8pm footer still loses to a hero that will not sell.

---

## 3. BEAT THE CATEGORY

Five moves that work *because* this is a 14,000-person Sacramento Valley family gym, and that Equinox structurally cannot copy.

### 1. Put the owners on the board, in public, every day

Equinox instructors are contractors. The 6:00 AM spin here is taught by a woman who owns the building. Render the schedule as a **named week**, not a class catalog.

Mechanism: on `/schedule/` and in the homepage “today” strip, every owner row carries a chip: `Owner` / `Co-owner`. A Monday 5:55 AM view is:

> **6:00 AM · Spin · Karla · Owner**  
> Childcare closed · Coffee free until 9

That line cannot exist in New York. Do not bury it on `/about/`.

### 2. Sell against the weather, not against other gyms

Red Bluff hits 110°F. The only other pool in town is outdoors. Equinox in a temperate city has no equivalent argument.

Mechanism: a **temperature line** in the top bar, June–September, from NWS, not a slogan:

> **107° in Red Bluff right now. The pool is indoors.**

Click → `/pool/`. In January it becomes:

> **The outdoor pool in town is closed. Ours isn’t.**

This is the one piece of “personalization” that is a fact about the valley, not a gimmick.

### 3. Make childcare a filter, not a policy page

National chains either have no childcare or they have a PDF. You have hours that overlap the actual class grid. That overlay is the product.

Mechanism: `/schedule/?cc=1` is a landing page. Ads, Facebook posts, and the homepage childcare button all go there, not to `/childcare/`. Title:

> **Classes you can make if you have a kid with you**

Rows with childcare closed are dim. Parent-hour classes (8:15–1:00, 4:00–8:00 Mon–Thu) are the default view. Copy on the empty 6 AM cells: *“Childcare opens at 8. Tonnie’s Zumba is at 8:15.”* You are not hiding the gap; you are routing the parent to the class they can attend.

### 4. Use the 405 neighbors as a wall of first names

Equinox has more reviews and they are strangers. In Red Bluff, first names are the proof.

Mechanism: a single scrolling column on the homepage, after proof stats, first name + town only, no photos, no 5-star widgets, no stock faces. Sourced only from people who said yes at the desk:

> Jennifer · Red Bluff  
> Mark · Corning  
> Tami · Red Bluff  
> …

Set in Source Sans, 1.1rem, navy on ice. In a town this size the visitor will see someone they know. That is a conversion Equinox would have to fake, and you must not fake. Fifty first names is a two-day desk project. It is worth more than another commissioned corridor.

### 5. Name the other two gyms on the homepage

A 14,000-person town has three gyms. Everyone already knows. Equinox’s lawyers will not let them run a comparison table against Blink on equinox.com. You already wrote the honest version at `/gym-red-bluff/` and then hid it.

Mechanism: the 3-column table from kill-list #9, on the homepage, no adjectives, PF’s $15 left intact, your hours left intact. The close under the table:

> **If you train after 8, we are the wrong gym.**  
> If you need a pool, a court, or a kids’ room, we are the only one.

That sentence does the qualifying that a $15 competitor’s sales floor cannot do. You keep the members who match. You stop paying for the ones who wanted 24 hours.

**What a town of 14,000 can do that Equinox cannot:** name the owner on the 6 AM class, name the weather, name the other gyms, name the neighbor who already goes here, and let someone walk in without booking a tour. You have all five in the data file. You used none of them on the first screen.

---

## 4. DESIGN — THE UNIQUE TAKE

Person B.

The current visual idea is **Copenhagen architecture studio applies a logo-sampled navy to a rec center.** Archivo 900 at `clamp(3rem, 9.5vw, 8.4rem)`, Instrument Serif italic on a single noun, kinetic marquee, scroll-reveal, mix-blend duotone, empty rooms. It is competent and it could be any well-built independent gym in any city. A jury scrolling Awwwards has seen this system 400 times. They have not seen 2498 S Main at 107°.

### The visual idea

**The coolest room in the valley.**

Not a metaphor. A chromatic argument.

- **Hot side:** Sacramento Valley. Gold dry grass, metal roof, valley oaks, pickup trucks, 110°F, the real exterior in color, the real B&W pano. Dust, sun, highway.
- **Cool side:** the indoor pool. Ice `#B8D0E0`, steel `#88A8C8`, tile, fluorescent, water. The refuge.

Stop painting both sides navy. The logo’s royal navy is the **ink and the action**, not a film over the world. When everything is duotoned, the temperature argument dies, and with it the only reason this building looks like this building.

### Layout

Homepage as a **cross-section, not a brochure.** The building is single-storey, 30,000 sq ft, rooms off one spine. Structure the page that way:

1. **Hot** — real exterior, unfiltered. Hero offer (the family-rate machine).  
2. **The spine** — a horizontal strip of the corridor (commissioned is fine here) used as a table of contents: Pool / Court / Kids / Studio / Cave. Click-scrolls.  
3. **Cool** — pool image in full color, no navy, 80vh, type sitting in the water: *“Three lanes. Indoors. July.”*  
4. **The week** — `weekGrid()` full bleed, ice ground, Sunday as a designed void. This is the art piece.  
5. **The names** — first-name wall + Karla/Aubrie/Kyle.  
6. **The table** — three gyms.  
7. **The door** — walk-in instructions, Courtney, parking out front.

Inner pages keep a **hot header** (real exterior, small) or a **cool header** (pool/court/studio unfiltered). Never the current `hero-sm` navy mush.

### Type

Archivo 900 at 8.4rem is shouting a weak line. Cap display at ~5.5rem. Save the 900-weight for **one sentence per page**, the way the Wolf Cave is lettered on an actual wall.

Instrument Serif: only for the temperature line, the Karla sentence, and captions. If it appears in an H1 every page, it is a tic, not a voice.

Body stays Source Sans. It is the only font on the site that looks like a rec center and that is a compliment.

The type idea you would get from the building, not the logo: **painted wall letters.** When the walkthrough is shot, photograph the Wolf Cave lettering and the front-desk hours board. Those become the display specimens. Until then, Archivo tracking tight, sentence case for statements, ALL CAPS only for the week-grid day heads.

### Motion

Kill the marquee. It is 2018 Webflow. Kill hover-lift on cards.

The one motion a jury would remember: **a now-line on the week grid.** A 1px ice rule that sits on the current time, 5am–8pm, and crawls. Sunday it crawls across empty. Reduced-motion: static rule at “now.” This is the schedule as an instrument, not a PDF.

Hero film: only if it is the real building. Empty-room loops of generated space, autoplaying, confirm the visitor’s suspicion that nobody goes here. Default the film to off on mobile (you already do). Default it to off on desktop until the footage is of *this* floor.

### Structure / craft moves a jury stops for

- **The corrugated metal roof as the grid.** The real building’s ribbing is a 6-inch module. Use that interval for the week-grid columns, for rules, for the proof strip. Not rounded boutique cards (`--r: 2px` is already close; commit). The roof is the identity system hiding in the photograph you keep covering up.
- **Sunday’s empty column, gold, not grey.** Six days of navy class blocks, one day of valley-gold void with the line *“Open. Nothing on the board. Pool’s still there.”* That is a designed hole. Equinox would fill it with programming. You tell the truth with a color.
- **B&W pano as the sacred image.** One photograph, full viewport, no UI on it except a caption. It is the only picture that could only be this gym. The commissioned color exterior is prettier and generic. Prettier is the enemy of distinctive.

### The idea you would not think of

**Put the National Weather Service in the header, and make the pool the answer.**

A live dry-bulb reading from Red Bluff, in Archivo, ice on void, always visible:

> 107°

Tapping it does not open a widget. It crossfades the page ground from valley-gold to pool-ice and jumps to the pool photograph. In a heat wave this site becomes a public utility. In January the number is 38° and the same interaction still makes sense (outdoor pool is dead; this one is not).

No gym website in the country does this, because no gym competing on “luxury” wants to talk about weather, and no 24-hour box has an indoor pool that is the point. It is local, true, seasonal, and impossible to mistake for a template. It also happens to be the conversion.

Do not illustrate this with a sun icon. The number is the design.

---

## 5. WHAT I GOT WRONG

Be blunt about your judgement, not the gym’s.

**You over-built a catalog and under-built a join.** Twenty-eight pages of the same organism — duotone hero, statement, oversized numerals, cards, spread, band, “call us.” Six class landing pages. Amenities as chips. A Fuel Bar menu with dollar figures, which is darkly funny next to a membership page with none. Meanwhile the family cannot join, the schedule page has no schedule, and the primary button is a phone number. That is a craftsman decorating a store that is closed.

**You fooled yourself that honesty is a conversion strategy.** The `tbd` registry is morally right. It has become a personality. You turned “we don’t know the price,” “we close at eight,” and “these pictures are fake” into the voice of the site. Honesty without an offer is still a trap. Honesty about the 8pm close, repeated on every footer, is you doing Planet Fitness’s job. Honesty about commissioned imagery belongs in a caption, not a four-step liturgy on `/tour/`. A mother trying to decide where to leave her two-year-old does not feel respected by your epistemology. She feels stalled.

**You fooled yourself that “come see the building” is a strategy.** In a city, maybe. Here, they have seen the building. They have not been told, on the first screen, that there is an indoor pool, a kids’ room, and 54 included classes, or what any of that costs. You substituted a tour for an offer because the offer is missing a number and you refused to build the workaround (the form).

**You fooled yourself that the week grid is the signature piece.** It is the right idea. It is not on the page. Shipping the CSS, the packer, the ARIA, and a filter script aimed at nothing is the tell: you enjoyed building the instrument more than you enjoyed putting it in someone’s hand. The homepage still shows only Monday. The link to “the whole week” is a broken promise.

**You over-built the duotone system.** Sampling the logo was disciplined. Using it as a multiply layer on every photograph erased the only distinctive pictures you have — valley light, metal roof, oaks, a real class, real iron. You commissioned 21 empty rooms and then made them identical. The constraint “no synthetic people” is right. The conclusion “therefore a ghost town under navy glass” is a failure of directing, not of ethics. Empty can mean “yours at 6am” if you caption it and leave the color. Empty plus navy plus autoplay film means abandoned.

**You under-built the things that are actually hard:** getting A1/A3/A12 off Courtney, claiming Google, collecting six sentences from members, putting Karla on the homepage, wiring `weekGrid()` into `/schedule/`, writing a form so silent visitors can start. The call sheet is excellent. It is also a list of reasons the site cannot yet do its job. You built 28 pages around the holes instead of filling two of them and shipping a hero.

**You over-estimated craft as a substitute for a priced family SKU.** Nobody in Red Bluff is joining because Instrument Serif is used correctly. They will join because the indoor pool exists, Alma will take the kids, the class is included, and the number is not a secret. You know this — you wrote it in `data.mjs`, in the call sheet, on `/gym-red-bluff/`. Then you spent the homepage on the sign.

Fix the hero. Wire the grid. Get three numbers from the desk. Put Karla on screen one. Un-navy the pool. Everything else is furniture.
