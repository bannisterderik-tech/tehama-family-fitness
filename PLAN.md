# Tehama Family Fitness Center — Site Rebuild
### Plan v3 · final · 2026-08-25

Two adversarial review rounds with Grok CLI. Round one killed the flythrough as the
homepage. Round two killed the "one take," caught an arithmetic error in my own class
count, and found three facts I'd picked up from a neighbouring business's website and
attributed to this one. Both reviews made this materially better. This is the version
to build from.

---

## 0. Headline

**Their own marketing undersells them by a third, and the page that proves it isn't in
their menu.**

Buried outside their navigation is `tehamafamilyfitness.com/calendar` — a live event
calendar far more current than the PDF everyone links to. Parsed: **384 events**, resolving to

> **64 sessions a week — 54 classes, 8 basketball open-gym blocks, 2 pickleball league
> sessions — across 15 named instructors.**

The PDF advertises 41 and omits **Pickleball League**, **Basketball Open Gym** (twice daily,
Mon–Fri), **Barre Above**, **U-Jam**, **Hybrid**, **Spin/Tone**, **Yoga Easy Flow**, and seven
instructors.

And they have **three indoor pickleball courts with permanent lines** — listed on Pickleheads,
Places2Play, Bounce and Pickleballify — that appear **nowhere on their own website.**

---

## 1. Verified facts

### 1.1 Business

| Fact | Value | Source |
|---|---|---|
| Name / short brand | Tehama Family Fitness Center · **TFFC** | site, FB, IG |
| Address | 2498 S Main St, Red Bluff, CA 96080 | /contact, Yelp |
| Phone / email | 530-528-8656 · frontdesk@clubtehama.com | site |
| Hours | Mon–Fri 5:00a–8:00p · Sat–Sun 8:00a–6:00p | /contact, Yelp, PDF |
| Childcare hours | M–Th 8a–1p & 4p–8p · Fri–Sat 8a–1p · Sun closed | /kids |
| Size | 30,000 sq ft, single story | site |
| Founded | **2001** | homepage + IG bio |
| Their own positioning | "Tehama County's Family Gym since 2001. New Equipment, pool, basketball courts, classes, daycare." | IG bio |
| Tagline in use | **"Stronger Together"** | FB graphics |
| Join system | ABC Fitness, `onlinejoin.abcfitness.com/signup/plan?club=31347` | homepage |
| App | **Trainerize** — not linked from the website | Google Play |
| Pickleball | **3 indoor concrete courts, permanent lines, BYO net, one-time fee, no reservation** | Pickleheads |
| Social proof | FB **96% recommend, 405 reviews**, 3.1K followers · IG 1,455 · Yelp 15 | FB, IG, Yelp |

**Amenities (verbatim from /amenities):** Full Court Basketball Gymnasium · Racquetball ·
3 Lane Indoor Pool and Spa · Spin Room · Yoga/Pilates/Dance Studio · Circuit Training Room ·
Women's Weight Room · Freeweight Room with Olympic Platform · 30+ Pieces of Cardio Equipment ·
Cardio Theater · TRX Training Station · Stretching Stations · Cross Training Box · Pilates
Reformer · Full Service Locker Rooms with Sauna · Childcare · Complementary Group Classes ·
Tehama Nutrition Center/Café · Personal Training · Bootcamps · On-Site Esthetician · Tanning ·
SilverSneakers · Kids Fit · Corporate Wellness.

**Confirmed off-site, safe to use:** brand-new commercial-grade **Nautilus + Matrix** strength
floor · the strength room is signed **"WOLF CAVE"** · **Barre Above** · **U-Jam** ·
**Pickleball League** · **Basketball Open Gym twice a day** · annual **"Christmas in July —
12 Days of Fitness"** ($5, 6:15 PM) · **Kristi Havlin / KH Macro Coaching** · coffee **free
until 9 AM** · **3 indoor pickleball courts**.

### 1.2 ⚠️ Facts I retracted — do not ship without the front desk confirming

Round two caught these. Three "facts" in v1/v2 came from
**ptandwellnesscenter.com**, the physical therapy clinic **next door at 2490 S Main**, on a page
*about* TFFC. A neighbouring business's description of you is not a source about you — and the
PT clinic runs **its own pool**, which is very likely where two of these actually belong:

| Retracted claim | Risk |
|---|---|
| **Silver Splash** senior aqua classes | Not on TFFC's live calendar. Likely the PT clinic's pool program. |
| **"Licensed"** daycare | A California DSS licensing claim. Never publish unverified. |
| **"Official Spinning® facility"** | A trademark claim. Never publish unverified. |
| Free weight room has a **ladies-only** section | TFFC's own site says "Women's Weight Room" — use their words, not the neighbour's. |
| Pool is **heated** | Plausible, but the only source is the neighbour. Confirm. |

Also retracted: **"SilverSneakers gets you in either door"** — I could not verify that the
Red Bluff Planet Fitness franchise accepts SilverSneakers, and a false comparative claim is worse
than no claim.

### 1.3 ⚠️ Three sources, three different schedules

| | PDF (`2026_Schedule`) | Live calendar | Facebook |
|---|---|---|---|
| Mon 9:15–9:30 | Tone Zone / Kristi | Lean & Mean / Aubrie | — |
| Tue 5:30 AM | Body Burner | Hybrid | — |
| Thu 5:30 PM | AMRAP / Derek | Yoga Easy Flow / Kathy | — |
| SilverSneakers | Tue/Thu/Fri noon | Mon/Wed/Fri Classic + Tue/Thu 1 PM Circuit | Tue/Thu/Fri noon |
| Barre | absent | Barre Above, Tue 8:15, Tami | "New Barre Class," M/W/F 9:00, Maggie |

**These are three different gyms.** The calendar is the most current, but it is a plugin feed
with real data-entry bugs ("Picleball League", "SilverSneakersClassicKevin", a Friday
SilverSneakers stamped 12:00 **AM**). **Reconcile with the front desk on paper before
`gen/data.mjs` exists.** Do not scrape and ship.

Live-calendar weekly totals (the number to quote once confirmed):

| Day | Mon | Tue | Wed | Thu | Fri | Sat | Sun | **Total** |
|---|---|---|---|---|---|---|---|---|
| Sessions | 14 | 13 | 13 | 10 | 12 | 2 | 0 | **64** |

= **54 classes + 8 basketball open-gym blocks + 2 pickleball sessions.**
Instructors: Karla · Kevin · Tonnie · Amie · Aubrie · Jami · Roxane · Tami · Kris · Sally ·
Kyle · Debbie · Leslie · Kathy · Ty. Front desk: **Courtney**. Childcare: **Alma**.

**Gap worth naming:** Sunday has zero programming, Saturday has two, and they're open 8–6 both
days. Twenty staffed weekend hours with almost nothing on.

### 1.4 Fuel Bar (pulled live from their menu API)

- **Gas Up!** — Pre-Workout $2 (Bucked Up, RYSE) · Energy Drinks $3.50 · Elevated Energy $5 · Vida Juice Bar $7
- **Power Shakes** — Protein $7 (Vanilla / Chocolate / Cookies & Cream, pick 2); Spinach +$1 · Creatine +$1 · Almond Milk +$0.50
- **Recharge!** — Recharge Smoothie $5/16oz · $6/24oz · Clear Protein $6/24oz · LMNT packet $2 · LMNT RTD $3.50
- **Snacks** — Protein Bars $3.50 · Banana $1 · **Coffee FREE until 9 AM**, $1.25 after

### 1.5 Competitive picture

| | TFFC | Planet Fitness · 1025 S Main | Red Bluff Health & Fitness · 100 Jackson |
|---|---|---|---|
| Price | not published | **$15/mo** + $49/yr | not published |
| Weeknights | closes **8 PM** | late / 24h some days | **10 PM** |
| Sunday | 8–6, no classes | open | 9–5 |
| Pool | **3-lane INDOOR** | none | **outdoor** pool + outdoor jacuzzi |
| Basketball | **full court, open gym 2×/day** | none | none |
| Racquetball | **yes** | none | none |
| Pickleball | **3 indoor courts + league** | none | none |
| Childcare | **yes** | none | none |
| Classes | **54/week, 15 instructors** | none | some |
| Google | — | 4.2 / 177 reviews | — |

**Survives scrutiny as unique in Red Bluff:** indoor lap lanes · full-court basketball ·
racquetball · 3 indoor pickleball courts + league · childcare · class volume.

**Doesn't:** price · late hours · "only pool in the county" (RBHF has one — outdoors).

**The 8 PM close is a real weakness.** Don't hide it, name it:
*"We're a family gym, not a 24-hour box. We close at eight because we're all going home too."*

### 1.6 What's wrong with the current site

1. Vendor template (`fi-gym` by optuno.com)
2. **No pricing anywhere** — and ABC shows **zero dollar figures** until deep in checkout
3. **Only two SKUs online:** Single Monthly, Single 12-Month. A business named *Family* Fitness **sells no family membership online**
4. Hero has no offer; the only above-fold CTA is a phone number
5. Stock photography — B&W rings and plates that aren't their gym
6. **The schedule is a JPEG/PDF**, and it's a third out of date
7. **The live calendar isn't in the navigation**
8. **Three indoor pickleball courts are not mentioned once**
9. Kids page still says classes are *"temporarily postponed due to Covid19"*
10. Homepage typo: "**Or** goal is to provide a facility…"
11. Their app isn't linked. New iron, Barre Above, pickleball, free coffee — all invisible
12. No structured data, no on-site reviews, no location page

---

## 2. Strategy

Grok's position across both rounds: the flythrough is a designer's toy, the business problem is
pricing and plumbing, and a walk-in is the conversion this town actually makes. **That's right
about the business.** The funnel in §5 is rebuilt around it.

Where I hold: the person choosing between $15 Planet Fitness and an unknown number at TFFC has
never seen that one building holds a pool, a full court, racquetball, three pickleball courts
and a childcare room. No list conveys 30,000 square feet. But that argument buys **three
seeded shots**, not a cinematic pipeline — and it buys them *after* the site already works.

**The site ships and converts with zero generated video.** The flight is an upgrade, contingent
on photographs, and it is the last thing built.

---

## 3. `/tour/`

### 3.1 What it is

**A real-photo walkthrough of the building that books a real walk-in** — fourteen rooms, honest
captions, and a phone number. That page is the deliverable and it works on its own.

**Optionally, later:** three short scroll-scrubbed shots dropped into that gallery. Not a film.
Not "one take."

### 3.2 What round two killed, and why it was right

- **The "one take."** Four connectors interpolating between rooms means inventing hallways of a
  building with no floor plan. That's the v1 through-wall swing with a new name. **Cuts between
  seeded shots are more honest than fake continuity** — and "one take" would have been a lie
  about five clips and four morphs.
- **Scene 5, the empty front desk.** Camera settling on a door "where a person would be
  standing" is the closed-for-the-season shot.
- **The push through the glass doors.** Entering a building through glass is a known
  image-to-video failure. Start outside, hold, cut.
- **The dolly across the court with "racquetball glass passing on the right."** That adjacency
  is geography nobody has photographed.
- **Recoloring the B&W exterior to daylight.** That's inventing the building's colour, which
  breaks my own rule. Shoot it in colour instead.
- **"Empty rooms" as the site's aesthetic.** An empty pool looks like a hotel; an empty desk
  looks abandoned. Emptiness is a constraint **of the three clips only** — the rest of the site
  gets real people, with releases.

### 3.3 The three shots — only if photos exist

| # | Shot | Seed | Move |
|---|---|---|---|
| 1 | **THE IRON** — the new Nautilus/Matrix line, ending on the **WOLF CAVE** wall | ✅ their real FB photo | Slow push. Short. |
| 2 | **THE WATER** — the pool room at deck height, above water throughout | ❌ needs photo | Slow reveal, no dolly, no dip |
| 3 | **THE COURT** — the gymnasium, one hold, hardwood to backboard | ❌ needs photo | Static-to-slow. No travel. |

Shot 1 is the only one green-lit today. Shots 2 and 3 wait for photographs.
No people. No connectors. No invented adjacency. Cuts between them.

**Copy that rides the gallery** (works with photos alone):

> **The lights go on at five.** Doors open 5:00 AM weekdays. Coffee's free until nine.
> **New iron, same platform.** A full commercial-grade Nautilus and Matrix floor went in
>   during 2026. The Olympic platform is where it's always been.
> **Three lanes, indoors.** Indoor, three marked lanes, open every day they are.
> **Open gym, twice a day.** Full-court basketball at one and again at six, Monday–Friday.
>   Three indoor pickleball courts on the same floor.
> **Come see the building.** Walk in any day before eight. Ask for a tour. Ask what it costs.
>   Nobody here is going to make it complicated.

### 3.4 Step zero: the walkthrough

Three genuine photographs of this business exist — the exterior pano, the new strength floor,
and the Kids Fit room. Everything else on their site is stock.

**Nothing gets generated until we have a phone walkthrough.** Landscape, one steady shot per
room, lights on. Fourteen shots: front entry, desk, Fuel Bar counter, cardio deck, freeweight
room + platform, women's weight room, **pool deck**, spa, sauna door, basketball court,
racquetball, pickleball setup, spin room, studio, exterior in colour.

If they can't shoot it, we drive down. Two hours, and it's the highest-value two hours in the
project.

**The Kids Fit photo has identifiable children in it — get a signed release before it ships.**
It's also the single best image they own, and the one thing that stops the site looking empty.

### 3.5 Technical, honestly

- **Model:** Seedance 2.5, `omni_reference`, `generate_audio: false`, every shot seeded from a
  real photograph. Three generations, no connectors.
- **Credits:** the Dudley build spent ~560 for eleven clips — about 50 a clip. Three clips plus
  re-rolls ≈ **200–300** against a **1,508** balance. That's a comfortable margin *for three
  clips*; v2's nine-clip version was not, and I shouldn't have called it one.
- **The keyframe/size conflict, stated plainly:** all-intra (`g1`) is what makes scrubbing smooth
  on iOS, because Safari seeks to keyframes and `currentTime` is async on top of that. All-intra
  1080p is also far too large for a 20 MB page budget. **These fight.** Resolution: short clips
  (4–6s), **540p mobile / 720p desktop, `g1`**, and a hard **20 MB total** — measured, not
  assumed. If it doesn't fit, it ships as stills. The budget wins, not the pixels.
- **No scrub on `/`.** The homepage hero is a real photograph. Full stop.
- **Mobile default is the photo gallery.** Video loads only on explicit tap.
- **Gates — any one serves stills:** `prefers-reduced-motion` · saveData or `effectiveType` ≤ 3g
  · first seek misses budget · decode watchdog trips.
- `playsinline` · `muted` · `poster` · IntersectionObserver load-on-intent · never preload past
  the current clip.
- **Serving:** HTTP Range or scrubbing silently dies. Preview with `npx http-server`, never
  `python -m http.server` — but **the real test is a physical iPhone against the production
  Pages URL**, because CDN Range behaviour is what actually breaks.

### 3.6 The risk I'm accepting, named

**A generated room, in a building people use daily, in a town of 14,000, will be checked.** The
first member who spots a wall that isn't there says so in the same Facebook groups this is
supposed to win. That's why it's three shots, all seeded from real photographs of the actual
rooms, no people, no invented geometry, no continuity — and why the site is complete and
converting before a single frame is generated.

**If the photos don't come, we ship stills and nobody ever knows what we didn't build.**

---

## 4. Site architecture — 27 pages (counted, not rounded)

**Core (5)** — `/` · `/tour/` · `/about/` · `/contact/` · `/faq/`
**Money (4)** — `/membership/` · `/day-pass/` · `/personal-training/` · `/corporate-wellness/`
**Schedule (1)** — `/schedule/`, real HTML, filterable by day / class / instructor, **childcare
hours overlaid on every session**, replacing the PDF
**Classes (7)** — `/classes/` index + `/classes/yoga/` · `/spin/` · `/barre/` · `/zumba/` ·
`/pilates/` · `/tai-chi/` — names people actually type. Tone Zone, Body Burner, Lean & Mean,
AMRAP, Hybrid, U-Jam, Cardio Circuit, Stretch & Mobility, Drums Alive, Kettlebell are rows on
`/classes/`, not URLs. Zero search volume, guaranteed thin pages.
**The building (8)** — `/amenities/` + `/pool/` · `/basketball/` · **`/pickleball/`** ·
`/strength-floor/` · `/womens-weight-room/` · `/childcare/` · `/fuel-bar/`. Racquetball folds
into basketball; tanning, esthetician, sauna, cardio, cross-training and studios are sections
on `/amenities/`.
**People (1)** — one `/instructors/` page, all 15, photos and what they teach. No 12 person URLs.
**Programs (1)** — `/silversneakers/`
**Local (1)** — `/gym-red-bluff/`. **Killed:** Gerber (~1,000), Proberta (a few hundred),
Los Molinos (~1,700), Rancho Tehama (~1,100 — and that place-name's search results are about the
2017 shooting), Cottonwood (Shasta County; they drive north to Redding). Corning (~8,250, twenty
minutes, same county) gets a real paragraph on `/gym-red-bluff/`, not a doorway.

**`/pickleball/` is the sleeper.** Three indoor courts already indexed on four third-party
directories, a league, and a drop-in fee — and not one word on their own site. That page will
earn traffic on day one.

---

## 5. The funnel

### 5.1 Hero

No video. The real exterior photograph, one offer, three actions — **walk-in first**, because
Yelp already says walk-ins welcome and that's the conversion this town makes:

> **Come see the building.**
> Indoor pool · full court · pickleball · childcare · 54 classes a week.
> **[ Call 530-528-8656 ]** [ Text us ] [ Walk in — open till 8 ]

If a day pass or drop-in price exists, it becomes the primary. The pickleball listing already
references a **one-time fee**, so some form of drop-in exists — get the number. **Open question #2.**

### 5.2 Price

The number gets published, or the CTA stops pretending. A town of 14,000 already knows roughly
what this costs; hiding it reads as a contract trap, which is exactly the fear a $15/mo Planet
Fitness member brings to the page. If the owner won't publish, the money page says *"Text us and
we'll send you the number today"* — and the primary CTA is **not** a link into an ABC form that
hides it.

**Worth more than the website:** ABC sells only *Single Monthly* and *Single 12-Month*. There is
no family SKU. Fix that first.

**And put the contract terms in one honest sentence** — month-to-month or not, annual fee or not,
how to cancel. ABC won't save them if they hide it; Yelp reviews already mention cancellations.

### 5.3 SilverSneakers

Own page, in the main nav. The pitch is **programming**, not acceptance — but stated without a
comparative claim I can't back:

> Classic Mon/Wed/Fri · Cardio Circuit Tue/Thu · Tai Chi every weekday morning ·
> and an indoor pool that doesn't care what the weather's doing.

*(Days/times pending §1.3 reconciliation.)*

### 5.4 Childcare

Hours are necessary and not sufficient. Parents need **ages accepted, how to register,
first-visit rules, and late-pickup policy** before they'll leave a two-year-old with anyone.
And the overlay — every session on `/schedule/` shows whether childcare is open at that hour:

- 9:15 AM Lean & Mean — **childcare open** (8a–1p)
- 5:30 PM Spin — **childcare open** Mon–Thu, **closed Fri**

No competitor in the county can even render that.

### 5.5 Also in the funnel

- **Any promo they're already running** goes on the site. Facebook has carried "bring a friend"
  offers; confirm the current one and put it in the hero. *(Unverified — open question #3.)*
- **Pickleball is an acquisition channel**, not an amenity bullet. Own page, drop-in fee, league
  nights, and a claim on the four directories already listing them.
- **Corporate wellness** is on their amenity list with no path. St. Elizabeth Community Hospital
  is up the road. Give it a page and a form.
- **Google Business Profile is a workstream, not a footer.** Planet Fitness has 177 Google
  reviews at 4.2. That's where "gym near me" is decided. Claim, fill, photograph, post weekly,
  and route happy members there — TFFC's 405 Facebook reviews are sitting on the wrong platform.

### 5.6 Homepage sequence

1. Real exterior photo · one offer · call / text / walk in
2. **What's on right now** — live from the schedule data
3. Six things, straight to their pages: pool · court · **pickleball** · childcare · 54 classes ·
   new iron *(no competitor named in a heading)*
4. **The new iron** — the real photo
5. **Membership** — real prices, contract terms in one sentence, ABC join
6. **SilverSneakers**
7. **Bring the kids** — real Kids Fit photo, hours, ages, how to register
8. **Proof** — 96% of 405 Facebook reviewers, plus Google reviews embedded
9. Map · hours · phone · text · the 8 PM close, named honestly
10. **Take the tour →** `/tour/` — one line, one still, at the bottom, where it belongs

---

## 6. Design system

**Colour** — `--teal #007E90` and `--deep #04303C`, both sampled from their own graphics.
The **circular runner mark stays** — it's the mark the town knows; bring the site to the mark,
don't retire the mark. CTA contrast comes from **their own assets**: the **Kids Fit lime**
already in their real photograph, reserved for actions. Warm-on-teal, high contrast, genuinely
theirs — not a valley metaphor I made up.

**Type** — the reference is **their printed 2026 schedule**, the thing that hangs at the desk:
institutional, teal header rows, legible from six feet. Display carries weight without the
condensed-gym cliché (Oswald / Bebas / Anton — and Archivo Expanded, which is the same cliché in
this year's clothes). Body is a workhorse sans at a size seniors read without zooming. Times and
prices set in the same family as everything else — **a monospace on a family gym's schedule is a
developer's tic, not a brand.**

**Photography** — honest fluorescent-and-rubber. Drop-tile ceilings, 2×4 troffers, off-white
drywall, dark speckled floor, green EXIT signs. **Do not Equinox it.** Lean all the way into
clean community rec, because that's what it is and that's what people like about it.

**What makes it unmistakably this gym:** the runner mark at a size you can see · **WOLF CAVE**
lettering as a display accent on `/strength-floor/` — their type, on their wall · Kids Fit lime,
only in the kids section · Courtney, Alma, Kevin, Karla, Tami — faces with names · "Coffee free
until 9" as a badge · S Main, the oaks, the metal roof, and the indoor pool as a **heat escape**
in a valley that hits 110°.

**Build:** Tailwind v4, CSS-first `@theme` tokens, one compiled stylesheet, fluid `clamp()` type
in `rem`, motion tokens honouring `prefers-reduced-motion`.

**Accessibility:** the schedule is a real `<table>` · AA contrast throughout · `/tour/` defaults
to photos on phones · any video is decorative and `aria-hidden`, with all meaning in the copy.

**Schema:** `HealthClub` + `LocalBusiness`, NAP matching GBP character-for-character; `Event`
markup on sessions. Visible content must match the markup — 2026 spam filters check.

---

## 7. Build system

- `gen/data.mjs` — every **confirmed** fact in one file: reconciled schedule, Fuel Bar menu,
  15 instructors, amenities, childcare policy
- `gen/build.mjs` — emits `docs/`, `BASE=` env for project-Pages hosting
- `gen/tour.html` — SOURCE for `docs/tour/index.html` (never edit the output)
- Preview: `npx http-server` (Range support), `.claude/launch.json`
- Deploy: GitHub Pages from `/docs`, then custom-domain cutover (BASE-less rebuild + CNAME)
- **Performance target: LCP < 1.5s on a cold iOS LTE load**, not a warm desktop Lighthouse run

---

## 8. Open questions — these are the project

1. **Membership prices.** Single, family, couple, student, senior, corporate.
2. **Day pass / drop-in.** Pickleheads references a one-time fee, so something exists. What is it?
3. **Current promo.** Is "bring a friend" running? Any trial or first-week offer?
4. **Why no family membership in ABC?** Likely worth more than the website.
5. **Contract terms.** Month-to-month? Annual fee? How do you cancel?
6. **Confirm or drop §1.2:** Silver Splash · "licensed" childcare · "official Spinning®" ·
   ladies-only section · heated pool.
7. **Reconcile §1.3:** PDF vs calendar vs Facebook. One schedule, on paper, signed off.
8. **Owner name(s).** "Locally owned" with no name is a wasted trust signal in a town this size.
9. **Is Kids Fit running again?** The site still says Covid.
10. **Childcare policy** — ages, registration, first visit, late pickup.
11. **Pickleball** — league format, drop-in fee, do you supply nets?
12. **Weekends** — 20 staffed hours, two sessions. Deliberate or a gap?
13. **The 14-photo walkthrough**, plus a release for the Kids Fit photo.
14. Promote the Trainerize app? It's invisible right now.

---

## 9. Sequence

1. ✅ Research + fact extraction
2. ✅ Adversarial review round 1 → ingested
3. ✅ Verification pass → adversarial review round 2 → ingested → **this document**
4. **→ Derik approves scope, funnel, and the three-shot ceiling**
5. Client call: §8, especially prices, the schedule reconciliation, and the photo walkthrough
6. Brand system + `gen/data.mjs` from confirmed facts only
7. **Build the whole 27-page site with real photos and no video. Ship-quality on its own.**
8. Photos → stills → approve → generate shot 1 (iron) → shots 2–3 only if their photos justify it
9. Measure against the 20 MB budget; if it misses, ship stills
10. Test Range + scrub on a physical iPhone against production
11. Final adversarial pass, fix, launch

**Standing rules:** no AI imagery generated without explicit sign-off · **no synthetic people,
ever** · nothing in the copy that isn't sourced to the business itself · no comparative claim
that hasn't been checked against both competitors · a neighbouring business's website is not a
source about this one.
