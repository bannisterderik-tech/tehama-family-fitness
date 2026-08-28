// Tehama Family Fitness Center — single source of truth.
// RULE: nothing in this file that isn't sourced to the business itself.
// Anything the front desk hasn't confirmed lives in `tbd` and renders as an honest
// ask, never as a claim. See client/FRONT-DESK-CALL-SHEET.md.

export const biz = {
  name: "Tehama Family Fitness Center",
  short: "TFFC",
  tagline: "Stronger Together",
  founded: 2001,
  foundedMonth: "September 2001",   // Enjoy Magazine, Jan 2019 — Ed Stroman opened it
  sqft: "30,000",
  street: "2498 S Main St",
  city: "Red Bluff",
  state: "CA",
  zip: "96080",
  get addr() { return `${this.street}, ${this.city}, ${this.state} ${this.zip}`; },
  phone: "530-528-8656",
  get tel() { return "+1" + this.phone.replace(/-/g, ""); },
  // Texting beats calling in a town this size, and it turns the single biggest
  // weakness — no published price — into the lowest-friction conversion on the site.
  sms(body) { return `sms:${this.tel}${/iPhone|iPad|Mac/.test("") ? "&" : "?"}body=${encodeURIComponent(body)}`; },
  email: "frontdesk@clubtehama.com",
  join: "https://onlinejoin.abcfitness.com/signup/plan?club=31347",
  facebook: "https://www.facebook.com/tehamafamilyfitness",
  instagram: "https://www.instagram.com/tehamafamilyfitness",
  geo: { lat: 40.1520, lng: -122.2360 },   // S Main St, Red Bluff — refine from GBP
  hours: [
    ["Monday", "5:00 AM", "8:00 PM"], ["Tuesday", "5:00 AM", "8:00 PM"],
    ["Wednesday", "5:00 AM", "8:00 PM"], ["Thursday", "5:00 AM", "8:00 PM"],
    ["Friday", "5:00 AM", "8:00 PM"],
    ["Saturday", "8:00 AM", "6:00 PM"], ["Sunday", "8:00 AM", "6:00 PM"],
  ],
  hoursShort: "Mon–Fri 5am–8pm · Sat–Sun 8am–6pm",
  childcareHours: [
    ["Mon", "8:00 AM–1:00 PM & 4:00 PM–8:00 PM"], ["Tue", "8:00 AM–1:00 PM & 4:00 PM–8:00 PM"],
    ["Wed", "8:00 AM–1:00 PM & 4:00 PM–8:00 PM"], ["Thu", "8:00 AM–1:00 PM & 4:00 PM–8:00 PM"],
    ["Fri", "8:00 AM–1:00 PM"], ["Sat", "8:00 AM–1:00 PM"], ["Sun", "Closed"],
  ],
  // Facebook's own review widget, as displayed. Not our number.
  social: { fbRecommend: 96, fbReviews: 405, fbFollowers: "3.1K", igFollowers: "1,455" },
};

/* ------------------------------------------------------------------ *
 * TBD REGISTRY — the client call, in one object.
 * Fill `v` and the whole site upgrades. Until then `ask` renders.
 * ------------------------------------------------------------------ */
export const tbd = {
  priceSingle:      { v: null, ask: "Call for today's rate",        q: "Single monthly rate" },
  priceSingleYear:  { v: null, ask: null,                            q: "Single 12-month rate" },
  priceFamily:      { v: null, ask: "Call — family rates aren't online yet", q: "Family rate" },
  priceCouple:      { v: null, ask: null,                            q: "Couple rate" },
  priceStudent:     { v: null, ask: null,                            q: "Student rate" },
  priceSenior:      { v: null, ask: null,                            q: "Senior rate" },
  priceCorporate:   { v: null, ask: null,                            q: "Corporate rate" },
  joinFee:          { v: null, ask: null,                            q: "Enrollment fee" },
  annualFee:        { v: null, ask: null,                            q: "Annual maintenance fee" },
  contractTerms:    { v: null, ask: null,                            q: "Month-to-month or contract, and how to cancel" },
  dayPass:          { v: null, ask: "Call for the day-pass rate",    q: "Day pass / drop-in price" },
  pickleballFee:    { v: "$5", ask: null, q: "Confirm the $5 non-member drop-in",
                      src: "Places2Play (USA Pickleball)", verify: true },
  promo:            { v: null, ask: null,                            q: "Current promotion" },
  // FOUND — two independent published sources. Confirm with the family before publish:
  // the Enjoy Magazine piece is from Jan 2019, and ownership can move in seven years.
  ownerName:        { v: "the Stroman family", ask: null, q: "Confirm ownership + how they want to be named",
                      src: "Enjoy Magazine Jan 2019 · North State Parent", verify: true },
  childcareAges:    { v: null, ask: "Ask at the desk",               q: "Childcare ages accepted" },
  childcareSignup:  { v: null, ask: "Ask at the desk",               q: "Childcare registration + first visit" },
  childcareIncluded:{ v: null, ask: null,                            q: "Childcare included or extra" },
  kidsFitRunning:   { v: null, ask: null,                            q: "Is Kids Fit running again?" },
  // NB: 6:30–9:00 PM conflicts with the posted 8 PM weekday close. Flagged E5 on the call sheet.
  pickleballLeague: { v: "Sat 8:00–11:30 AM · Tue & Thu 6:30–9:00 PM", ask: null,
                      q: "Confirm play times — TFFC's own calendar shows Tue 6:30 PM and Sat 8 AM only, no Thursday",
                      src: "Places2Play", verify: true },
  pickleballNets:   { v: "Permanent lines on the floor; portable nets go up for play", ask: null,
                      q: "Do you supply the nets, or is it BYO?", src: "Places2Play · Bounce · Pickleheads", verify: true },
  scheduleSignedOff:{ v: false, ask: null,                           q: "Front desk has confirmed the schedule" },
  trainerize:       { v: true, ask: null,                            q: "Promote the Trainerize app? — YES, answered: iOS + Android both live, see `app`" },
  // Added with the blog + newsletter build.
  newsletterList:   { v: null, ask: null, q: "Where should newsletter sign-ups actually land? (Mailchimp / Constant Contact / the front desk inbox)" },
  khAffiliation:    { v: null, ask: null, q: "Kristi Havlin — is KH Macro Coach & Trainer offered THROUGH the club, or is it her own business? Recipes are credited to her; her direct contact and the $250 partner package are held back until you say." },
  khPhotos:         { v: null, ask: null, q: "Can we use Kristi's own recipe photographs on the blog? Right now those posts run without a photo rather than borrow one." },
  barreFlyer:       { v: null, ask: null, q: "The barre flyer, the live calendar and Facebook give three different barre schedules. Which one is real?" },
  // Added with /specials/ and the manage-membership block.
  memberPortal:     { v: null, ask: null, q: "Is there a member self-service portal? ABC clubs usually have one (myiclubonline). URL? Can members cancel or upgrade in it, or must they call?" },
  cancelHow:        { v: null, ask: null, q: "How does a member actually cancel — in person, in writing, 30 days' notice? We will not publish a guess." },
  upgradeHow:       { v: null, ask: null, q: "Can a single upgrade to a family/couple mid-term, and is it prorated?" },
  freezeHow:        { v: null, ask: null, q: "Can a membership be frozen (travel, injury, deployment)? Cost, and for how long?" },
  donationGives:    { v: null, ask: null, q: "What do you actually donate — day passes, a month's membership, a gift basket? Any cap per year?" },
  donationLead:     { v: null, ask: null, q: "How much notice do you need for a donation request?" },
  appDoes:          { v: null, ask: null, q: "The member app is Trainerize. Which parts are switched ON — schedule, booking, workout plans, messaging your trainer, check-in?" },
  // Legal pages. NONE of this is legal advice and none of it has been reviewed.
  legalReview:      { v: null, ask: null, q: "Has anyone with a law licence read the privacy policy, terms and CA opt-out pages? They are written from what this site actually does, but they are not lawyer-drafted." },
  dataRetention:    { v: null, ask: null, q: "How long does the front desk keep enquiry and sign-up emails? The privacy policy currently cannot say." },
  memberDataPolicy: { v: null, ask: null, q: "Membership records live in ABC Fitness, not on this website. Is there an existing privacy notice for those, and should this site link to it?" },
  adsRetargeting:   { v: null, ask: null, q: "Do you run any Facebook/Google ads that retarget site visitors? Right now the site has NO tracking of any kind and the policy says so — that stops being true the day a pixel goes on." },
  accessibilityAudit:{ v: null, ask: null, q: "Nobody has run this site through a screen reader end to end. Worth doing before launch; the statement says plainly that it has not been done." },
};
export const has = k => tbd[k] && tbd[k].v != null && tbd[k].v !== false;
export const val = k => (has(k) ? tbd[k].v : null);
export const askFor = k => tbd[k]?.ask ?? null;

/* ------------------------------------------------------------------ *
 * RETRACTED — sourced from ptandwellnesscenter.com, the PT clinic next
 * door at 2490 S Main, on a page ABOUT this gym. That clinic runs its
 * own pool. A neighbouring business's website is not a source about
 * this one. These do not render anywhere until confirmed.
 * ------------------------------------------------------------------ */
export const retracted = [
  ["A swimming pool", "Their own /amenities page lists \"3 Lane Indoor Pool and Spa\", but there is no pool at this address \u2014 confirmed by Derik. The pool almost certainly belongs to the PT clinic next door at 2490 S Main, which is the same contamination source as the other retracted claims. Removed from the site entirely; their own website still needs correcting."],
  ["Silver Splash senior aqua", "Not on the live calendar. Likely the PT clinic's pool program."],
  ["“Licensed” childcare", "A California DSS licensing claim. Never publish unverified."],
  ["“Official Spinning® facility”", "A trademark claim. Never publish unverified."],
  ["Ladies-only weight section", "Their own site says “Women's Weight Room.” Use their words."],
  ["SilverSneakers accepted at Planet Fitness too", "Could not verify the Red Bluff franchise."],
];

/* ------------------------------------------------------------------ *
 * SCHEDULE — parsed from tehamafamilyfitness.com/calendar (384 events).
 * PROVISIONAL until the front desk signs off: the PDF, this calendar and
 * Facebook are three different schedules. Feed typos corrected inline and
 * flagged. 64 sessions/wk = 54 classes + 8 basketball blocks + 2 pickleball.
 * ------------------------------------------------------------------ */
const S = (day, time, name, who, kind = "class", note = null) =>
  ({ day, time, name, who, kind, note });

export const sessions = [
  // ---- Monday (14)
  S("Mon", "6:00 AM",  "Spin", "Karla", "class"),
  S("Mon", "7:15 AM",  "Tai Chi", "Kevin"),
  S("Mon", "8:15 AM",  "Zumba & Tone", "Tonnie"),
  S("Mon", "8:30 AM",  "Spin", "Amie"),
  S("Mon", "9:15 AM",  "Lean & Mean", "Aubrie", "class", "PDF lists Tone Zone / Kristi at 9:15 — confirm"),
  S("Mon", "10:30 AM", "Drums Alive", "Kevin"),
  S("Mon", "10:30 AM", "Mat Pilates", "Jami"),
  S("Mon", "12:00 PM", "SilverSneakers Classic", "Kevin"),
  S("Mon", "1:00 PM",  "Basketball Open Gym", null, "open"),
  S("Mon", "4:30 PM",  "Body Burner", "Roxane"),
  S("Mon", "5:30 PM",  "Tone Zone", "Aubrie"),
  S("Mon", "5:30 PM",  "Spin", "Roxane"),
  S("Mon", "5:30 PM",  "Yoga", null),
  S("Mon", "6:00 PM",  "Basketball Open Gym", null, "open"),
  // ---- Tuesday (13)
  S("Tue", "5:30 AM",  "Hybrid", null, "class", "PDF lists Body Burner at 5:30 AM — confirm"),
  S("Tue", "6:00 AM",  "Stretch & Mobility", "Tami"),
  S("Tue", "6:00 AM",  "Spin", "Kris"),
  S("Tue", "7:15 AM",  "Tai Chi", "Kevin"),
  S("Tue", "8:15 AM",  "Barre Above", "Tami", "class", "Facebook advertises Barre M/W/F 9:00 with Maggie — confirm"),
  S("Tue", "9:20 AM",  "Yoga", "Sally"),
  S("Tue", "9:20 AM",  "Stretch & Mobility", "Tami"),
  S("Tue", "1:00 PM",  "Basketball Open Gym", null, "open"),
  S("Tue", "1:00 PM",  "SilverSneakers Cardio Circuit", "Kevin"),
  S("Tue", "5:30 PM",  "Kettlebell", null),
  S("Tue", "5:30 PM",  "Spin/Tone", "Roxane"),
  S("Tue", "5:45 PM",  "U-Jam", null),
  S("Tue", "6:30 PM",  "Pickleball League", null, "pickleball"),
  // ---- Wednesday (13)
  S("Wed", "6:00 AM",  "Spin", "Karla"),
  S("Wed", "7:15 AM",  "Tai Chi", "Kevin"),
  S("Wed", "8:15 AM",  "Zumba & Tone", "Tonnie"),
  S("Wed", "9:15 AM",  "Lean & Mean", "Aubrie"),
  S("Wed", "10:30 AM", "Drums Alive", "Kevin"),
  S("Wed", "10:30 AM", "Mat Pilates", "Jami"),
  S("Wed", "12:00 PM", "SilverSneakers Classic", "Kevin"),
  S("Wed", "1:00 PM",  "Basketball Open Gym", null, "open"),
  S("Wed", "4:30 PM",  "Body Burner", "Roxane"),
  S("Wed", "5:30 PM",  "Spin", "Roxane"),
  S("Wed", "5:30 PM",  "Tone Zone", "Kyle"),
  S("Wed", "5:45 PM",  "U-Jam", null),
  S("Wed", "6:00 PM",  "Basketball Open Gym", null, "open"),
  // ---- Thursday (10)
  S("Thu", "5:30 AM",  "Hybrid", null),
  S("Thu", "6:00 AM",  "Spin", "Debbie"),
  S("Thu", "6:00 AM",  "Stretch & Mobility", "Tami"),
  S("Thu", "7:15 AM",  "Tai Chi", "Kevin"),
  S("Thu", "8:30 AM",  "Spin", "Leslie"),
  S("Thu", "9:00 AM",  "Cardio Circuit", "Kevin"),
  S("Thu", "12:00 PM", "SilverSneakers Cardio Circuit", "Kevin"),
  S("Thu", "1:00 PM",  "Basketball Open Gym", null, "open"),
  S("Thu", "5:30 PM",  "Yoga Easy Flow", "Kathy", "class", "PDF lists AMRAP / Derek at 5:30 PM — confirm"),
  S("Thu", "5:30 PM",  "Kettlebell", "Ty"),
  // ---- Friday (12)
  S("Fri", "5:30 AM",  "Body Burner", "Roxane"),
  S("Fri", "6:00 AM",  "Spin", "Kris"),
  S("Fri", "7:15 AM",  "Tai Chi", "Kevin"),
  S("Fri", "8:15 AM",  "Zumba & Tone", "Tonnie"),
  S("Fri", "8:30 AM",  "Spin", null),
  S("Fri", "9:15 AM",  "Yoga", "Jami"),
  S("Fri", "9:30 AM",  "Lean & Mean", "Aubrie"),
  S("Fri", "10:30 AM", "Drums Alive", "Kevin"),
  S("Fri", "10:30 AM", "Mat Pilates", "Jami"),
  S("Fri", "12:00 PM", "SilverSneakers Classic", "Kevin", "class",
      "Calendar stamps this 12:00 AM — a feed bug. Noon assumed from Mon/Wed. CONFIRM."),
  S("Fri", "1:00 PM",  "Basketball Open Gym", null, "open"),
  S("Fri", "6:00 PM",  "Basketball Open Gym", null, "open"),
  // ---- Saturday (2)
  S("Sat", "8:00 AM",  "Pickleball League", null, "pickleball"),
  S("Sat", "8:30 AM",  "Spin", null),
  // ---- Sunday (0). Open 8–6 with nothing programmed. Named, not hidden.
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const DAYNAME = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday",
  Fri: "Friday", Sat: "Saturday", Sun: "Sunday" };

export const mins = t => {
  const [, h, m, ap] = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let H = +h % 12; if (/pm/i.test(ap)) H += 12;
  return H * 60 + +m;
};
export const counts = {
  total: sessions.length,
  classes: sessions.filter(s => s.kind === "class").length,
  basketball: sessions.filter(s => s.kind === "open").length,
  pickleball: sessions.filter(s => s.kind === "pickleball").length,
  byDay: Object.fromEntries(DAYS.map(d => [d, sessions.filter(s => s.day === d).length])),
};

// Childcare overlay — every session knows whether the kids' room is open at that hour.
const CC = { Mon: [[480, 780], [960, 1200]], Tue: [[480, 780], [960, 1200]],
  Wed: [[480, 780], [960, 1200]], Thu: [[480, 780], [960, 1200]],
  Fri: [[480, 780]], Sat: [[480, 780]], Sun: [] };
export const CHILDCARE_WINDOWS = CC;
// Most classes run 45–60 min; open gym and league blocks run long. Used to size
// the blocks on the weekly grid. Confirm real lengths at the desk.
export const lengthOf = s =>
  s.kind === "open" ? 90 : s.kind === "pickleball" ? 150 :
  /tai chi|stretch|silversneakers/i.test(s.name) ? 45 : 55;

export const childcareOpenAt = (day, time) => {
  const m = mins(time);
  return (CC[day] || []).some(([a, b]) => m >= a && m < b);
};

/* ------------------------------------------------------------------ */
export const instructors = (() => {
  const map = new Map();
  for (const s of sessions) {
    if (!s.who) continue;
    if (!map.has(s.who)) map.set(s.who, new Set());
    map.get(s.who).add(s.name);
  }
  const extra = ["Amie", "Aubrie", "Debbie", "Jami", "Karla", "Kathy", "Kevin", "Kris",
    "Kyle", "Leslie", "Roxane", "Sally", "Tami", "Tonnie", "Ty"];
  for (const n of extra) if (!map.has(n)) map.set(n, new Set());
  return [...map.entries()]
    .map(([name, set]) => ({ name, teaches: [...set].sort() }))
    .sort((a, b) => b.teaches.length - a.teaches.length || a.name.localeCompare(b.name));
})();

export const staff = { frontDesk: "Courtney", childcare: "Alma" };

/* ------------------------------------------------------------------ *
 * THE TEAM — one page each.
 *
 * The only thing here that is invented is nothing: names and what they
 * teach come straight off the live calendar, roles from the published
 * ownership sources. `bio` and `portrait` stay null until the front desk
 * gives us words and the shoot gives us faces — see
 * client/PHOTO-SHOT-LIST.md. A missing portrait renders as a monogram,
 * never as a stock face and never as a generated one: these are real
 * people in a town of fourteen thousand and their neighbours would know.
 * ------------------------------------------------------------------ */
const ROLES = {
  Karla:    { full: "Karla Stroman",  role: "Owner",            desk: false },
  Aubrie:   { full: "Aubrie Thomas",  role: "Co-owner",         desk: false },
  Kyle:     { full: "Kyle Tingley",   role: "Co-owner",         desk: false },
  Kevin:    { full: "Kevin",          role: "Instructor",       desk: false },
  Tonnie:   { full: "Tonnie",         role: "Instructor",       desk: false },
  Jami:     { full: "Jami",           role: "Instructor",       desk: false },
  Roxane:   { full: "Roxane",         role: "Instructor",       desk: false },
  Tami:     { full: "Tami",           role: "Instructor",       desk: false },
  Kris:     { full: "Kris",           role: "Instructor",       desk: false },
  Amie:     { full: "Amie",           role: "Instructor",       desk: false },
  Sally:    { full: "Sally",          role: "Instructor",       desk: false },
  Debbie:   { full: "Debbie",         role: "Instructor",       desk: false },
  Leslie:   { full: "Leslie",         role: "Instructor",       desk: false },
  Kathy:    { full: "Kathy",          role: "Instructor",       desk: false },
  Ty:       { full: "Ty",             role: "Instructor",       desk: false },
};

export const slugify = n => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const team = [
  ...instructors.map(i => {
    const meta = ROLES[i.name] || { full: i.name, role: "Instructor" };
    return {
      slug: slugify(i.name),
      first: i.name,
      name: meta.full,
      role: meta.role,
      teaches: i.teaches,
      sessions: sessions.filter(s => s.who === i.name),
      portrait: null,          // set once the shoot lands
      bio: null,               // ask the front desk
      desk: false,
    };
  }),
  { slug: "courtney", first: staff.frontDesk, name: staff.frontDesk, role: "Front desk",
    teaches: [], sessions: [], portrait: null, bio: null, desk: true,
    blurb: "The first person you meet, and the one who answers when you call." },
  { slug: "alma", first: staff.childcare, name: staff.childcare, role: "Childcare",
    teaches: [], sessions: [], portrait: null, bio: null, desk: true,
    blurb: "Runs the kids\u2019 room, and the reason a lot of parents can train at all." },
];


/* ------------------------------------------------------------------ *
 * CLASSES — only classes that actually appear on the calendar.
 *
 * Every class on the board now earns its own URL. `feature: true` marks the
 * six people actually type into a search box; they get the cards at the top
 * of /classes/. The rest are linked from the table underneath.
 *
 * `match` is the exact session name(s) on the calendar. Do NOT go back to
 * prefix matching: "tone" pulls in Zumba & Tone and Spin/Tone, "silversneakers"
 * pulls in both SilverSneakers classes, and "yoga" pulls in Yoga Easy Flow —
 * so three pages quietly showed each other's times.
 *
 * `what` describes the class type honestly. Where the club's own graphics say
 * something specific (the Barre flyer, the Spin flyer), that is quoted and
 * sourced in `flyer` — and where a flyer disagrees with the live calendar the
 * conflict is named on the page, never silently resolved.
 * ------------------------------------------------------------------ */
export const classes = [
  { slug: "spin", hero: "spin", hero2: "cardio", name: "Spin", feature: true, room: "Spin Room",
    blurb: "Indoor cycling in the dedicated spin room. Eleven sessions a week, most of them before 9 AM.",
    what: "Stationary bikes, an instructor calling climbs and sprints, and a clock. You set your own resistance, so the same class works for a first-timer and a racer.",
    bring: "Water and a towel. Shoes clip in or strap on — the desk will show you.",
    flyer: { src: "the club's own spin graphic (@tehamafamilyfitness)",
      says: "Spin with Karla, Roxane & Kris — Monday 6:00 AM and 5:30 PM, Tuesday 5:30 PM, Wednesday 6:00 AM and 5:30 PM, Friday 6:00 AM.",
      conflict: "The live calendar also lists spin at 8:30 AM Monday and Thursday and 8:30 AM Saturday, which the graphic does not mention. Confirm which is current." } },
  { slug: "yoga", hero: "yoga", hero2: "reformer", name: "Yoga", feature: true, room: "Yoga/Pilates/Dance Studio",
    blurb: "Three sessions a week — plus the gentler Yoga Easy Flow on Thursday evening, which has its own page.",
    what: "Mat work, breathing, and held postures in the studio. Monday evening, Tuesday and Friday morning. Yoga Easy Flow on Thursday evening is the slower one and is listed separately.",
    bring: "A mat if you have one; the studio has them if you don't." },
  { slug: "barre", hero: "barre", hero2: "studio", name: "Barre Above", feature: true, room: "Studio",
    blurb: "Small, precise movements at the barre — legs, seat, core.",
    what: "Ballet-derived positions held and pulsed, usually with light weights and a band. Low impact, high burn.",
    bring: "Grip socks if you have them.",
    benefits: [
      ["Tone & strengthen", "Build lean muscle and improve endurance."],
      ["Improve posture", "Strengthen your core and support better alignment."],
      ["Increase flexibility", "Lengthen, stretch and move with greater ease."],
      ["Low impact, high results", "Effective, joint-friendly, and sustainable."],
      ["All levels welcome", "Modifications for every body and every goal."],
    ],
    benefitsSrc: "the club's own barre flyer",
    flyer: { src: "the club's own “New Barre Class” flyer",
      says: "Barre Basics Mon/Wed/Fri 8:45 AM, Barre Burn Mon/Wed/Fri 9:30 AM, Barre 30 Tue/Thu 12:15 PM — with Maggie. “Strength. Lengthen. Empower.” Included with your membership.",
      conflict: "The live calendar lists one barre session, Tuesday 8:15 AM with Tami, under the name Barre Above. Facebook has advertised Mon/Wed/Fri 9:00 with Maggie. Three sources, three answers — call the desk before you plan around it." } },
  { slug: "zumba", hero: "studio", hero2: "barre", name: "Zumba & Tone", feature: true, room: "Studio",
    blurb: "Latin-dance cardio with a toning block. Three mornings a week with Tonnie.",
    what: "Choreographed dance cardio — follow along, nobody's watching you. The tone half adds light weights.",
    bring: "Shoes that pivot. Water." },
  { slug: "pilates", hero: "yoga", hero2: "reformer", name: "Mat Pilates", feature: true, room: "Studio",
    blurb: "Core and control on the mat, three mornings a week with Jami.",
    what: "Slow, exact movement from the centre. We also have a Pilates Reformer out on the floor.",
    bring: "A mat, or use the studio's." },
  { slug: "tai-chi", hero: "studio", hero2: "stretch", name: "Tai Chi", feature: true, room: "Studio",
    blurb: "Every weekday morning at 7:15 with Kevin. Five days a week, no exceptions.",
    what: "Slow weight-shifting forms, standing the whole time. Easy on joints, hard on balance — which is the point.",
    bring: "Flat shoes. Nothing else." },

  /* ── the rest of the board. Same treatment, one page each. ───────────── */
  { slug: "tone-zone", hero: "dumbbells", hero2: "studio", name: "Tone Zone", room: "Studio",
    blurb: "Full-body toning with weights.",
    what: "Light-to-moderate dumbbells worked through timed sets, top to bottom. Higher reps than the strength floor, shorter rests, and the instructor keeps the room on the clock.",
    bring: "Water and a towel. The weights, bands and mats are already in the studio." },
  { slug: "body-burner", hero: "crosstrain", hero2: "circuit", name: "Body Burner", room: "Studio",
    blurb: "Conditioning circuit, early or late.",
    what: "A conditioning circuit — work, move, repeat. It runs at 5:30 AM Friday and 4:30 PM Monday and Wednesday, so it is built for people fitting it either side of a shift.",
    bring: "Water, a towel, and shoes you can move sideways in." },
  { slug: "lean-and-mean", hero: "nautilus", hero2: "gymfloor", name: "Lean & Mean", room: "Studio",
    blurb: "Mid-morning strength-and-cardio mix.",
    what: "Strength blocks alternated with cardio blocks, mid-morning, with Aubrie — who is also one of the owners. Weights are light enough to keep moving and heavy enough to count.",
    bring: "Water and a towel." },
  { slug: "hybrid", hero: "crosstrain", hero2: "dumbbells", name: "Hybrid", room: "Studio",
    blurb: "5:30 AM strength-and-cardio combo, Tue/Thu.",
    what: "Strength and cardio in one 5:30 AM block, Tuesday and Thursday. The earliest class on the board, and the room is unlocked before it.",
    bring: "Water. The building opens at 5:00, so there is no rush at the door.",
    flyer: { src: "the printed schedule sheet", says: null,
      conflict: "The printed sheet lists Body Burner in this 5:30 AM Tuesday slot, not Hybrid. Confirm at the desk." } },
  { slug: "u-jam", hero: "studio", hero2: "gymfloor", name: "U-Jam", room: "Studio",
    blurb: "Dance-fitness, hip-hop and world beats.",
    what: "Dance fitness set to hip-hop and world beats — choreographed, loud, and taught to be followed rather than learned. Tuesday and Wednesday at 5:45 PM.",
    bring: "Shoes that pivot, and water." },
  { slug: "cardio-circuit", hero: "circuit", hero2: "cardio", name: "Cardio Circuit", room: "Circuit Training Room",
    blurb: "Stations, rotating, on the clock.",
    what: "The circuit room is a ring of air-pressure machines. You rotate through the stations on a timer with cardio between them, so you are never queuing for a piece of kit.",
    bring: "Water and a towel. Nothing to set up — the machines adjust as you sit down." },
  { slug: "stretch-and-mobility", hero: "stretch", hero2: "studio", name: "Stretch & Mobility", room: "Studio",
    blurb: "Range-of-motion work with Tami.",
    what: "Range-of-motion work with Tami — held stretches, joint circles, and the hips-and-shoulders end of things. Three sessions a week, two of them at 6:00 AM.",
    bring: "Nothing. Mats, rollers and straps are in the studio." },
  { slug: "drums-alive", hero: "studio", hero2: "kettlebells", name: "Drums Alive", room: "Studio",
    blurb: "Drumsticks, stability balls, cardio. Three mornings.",
    what: "Drumsticks on a stability ball, to music, for the length of a cardio class. It looks unserious and it is not — arms and shoulders know about it the next day. Mon/Wed/Fri at 10:30 with Kevin.",
    bring: "Water. Sticks and balls are provided." },
  { slug: "kettlebell", hero: "kettlebells", hero2: "freeweights", name: "Kettlebell", room: "Freeweight Room",
    blurb: "Swings, cleans, carries.",
    what: "Swings, cleans and carries in the freeweight room. Technique first — the hinge is the whole class the first time you come, and the bells stay light until it looks right.",
    bring: "Flat shoes. Water." },
  { slug: "spin-tone", hero: "spin", hero2: "dumbbells", name: "Spin/Tone", room: "Spin Room",
    blurb: "Half the class on the bike, half off it.",
    what: "Half on the bike, half off it — intervals on the spin bike, then dumbbell and band work beside it. Tuesday at 5:30 PM with Roxane.",
    bring: "Water and a towel. The desk will set your bike up the first time." },
  { slug: "silversneakers-classic", hero: "studio", hero2: "stretch", name: "SilverSneakers Classic", room: "Studio",
    blurb: "Standing and seated strength for older adults.",
    what: "Standing and seated strength for older adults, with a chair used for support rather than as a fallback. Hand weights, bands and a ball. Noon, Monday, Wednesday and Friday, with Kevin.",
    bring: "Nothing. If your plan covers SilverSneakers, the class is covered too — bring the card the first time.",
    more: ["/silversneakers/", "How SilverSneakers works here"] },
  { slug: "silversneakers-cardio-circuit", hero: "circuit", hero2: "stretch", name: "SilverSneakers Cardio Circuit", room: "Circuit Room",
    blurb: "Low-impact circuit for older adults.",
    what: "Low-impact cardio worked in blocks, with a chair for standing support and upper-body work between rounds. Thursday at noon and Tuesday at 1:00 PM, with Kevin.",
    bring: "Nothing. Bring your SilverSneakers card the first time.",
    more: ["/silversneakers/", "How SilverSneakers works here"] },
  { slug: "yoga-easy-flow", hero: "yoga", hero2: "studio", name: "Yoga Easy Flow", room: "Studio",
    blurb: "The gentler evening yoga, Thursdays with Kathy.",
    what: "The slower of the two yoga classes — longer holds, more transitions explained, and no expectation that you have done it before. Thursday at 5:30 PM with Kathy.",
    bring: "A mat if you have one; the studio has them if you don't.",
    flyer: { src: "the printed schedule sheet", says: null,
      conflict: "The printed sheet lists AMRAP with Derek in this Thursday 5:30 PM slot. Confirm at the desk." } },
];

/* ------------------------------------------------------------------ *
 * AMENITIES — verbatim from their own /amenities page.
 * ------------------------------------------------------------------ */
export const amenities = [
  "Full Court Basketball Gymnasium", "Racquetball", "Spin Room",
  "Yoga/Pilates/Dance Studio", "Circuit Training Room", "Women's Weight Room",
  "Freeweight Room with Olympic Platform", "30+ Pieces of Cardio Equipment", "Cardio Theater",
  "TRX Training Station", "Stretching Stations", "Cross Training Box", "Pilates Reformer",
  "Full Service Locker Rooms with Sauna", "Childcare", "Complementary Group Classes",
  "Tehama Nutrition Center/Café", "Personal Training", "Bootcamps", "On-Site Esthetician",
  "Tanning", "SilverSneakers", "Kids Fit", "Corporate Wellness",
];

/* Fuel Bar — pulled live from their own menu API. */
export const fuelBar = [
  { group: "Gas Up!", items: [
    ["Pre-Workout", "$2", "Bucked Up, RYSE"], ["Energy Drinks", "$3.50", null],
    ["Elevated Energy", "$5", null], ["Vida Juice Bar", "$7", null]] },
  { group: "Power Shakes", items: [
    ["Protein Shake", "$7", "Vanilla / Chocolate / Cookies & Cream — pick 2"],
    ["Spinach", "+$1", null], ["Creatine", "+$1", null], ["Almond Milk", "+$0.50", null]] },
  { group: "Recharge!", items: [
    ["Recharge Smoothie", "$5 / 16oz", "$6 / 24oz"], ["Clear Protein", "$6 / 24oz", null],
    ["LMNT packet", "$2", null], ["LMNT ready-to-drink", "$3.50", null]] },
  { group: "Snacks", items: [
    ["Protein Bars", "$3.50", null], ["Banana", "$1", null],
    ["Coffee", "FREE until 9 AM", "$1.25 after"]] },
];

/* ------------------------------------------------------------------ *
 * IMAGERY
 *
 * `real: true`  — an actual photograph of this business.
 * `real: false` — commissioned imagery generated 2026-08-25 (Higgsfield /
 *   nano-banana). These depict the RIGHT SUBJECT in the club's real material
 *   language — drop-tile ceilings, fluorescent troffers, speckled rubber
 *   floor, block walls, clean community rec, never boutique — but they are
 *   NOT photographs of these specific rooms. Every one is people-free by
 *   design: no synthetic members, and no synthetic children anywhere.
 *
 * These are placeholders with a job to do. The moment the 19-shot
 * walkthrough lands, swap the file and flip `real` — nothing else changes.
 * ------------------------------------------------------------------ */
export const photos = {
  exterior:   { src: "/assets/hero/exterior.jpg", real: false, w: 2000, h: 848,
                alt: "Tehama Family Fitness Center on South Main Street, Red Bluff, at golden hour",
                note: "Generated from the club's own photograph of the building — same massing, arched bays, gable and metal roof, re-lit in colour." },
  exteriorReal:{src: "/assets/exterior-pano.jpg", real: true, w: 1024, h: 451,
                alt: "The Tehama Family Fitness Center building on South Main Street" },
  strength:   { src: "/assets/strength-floor.jpg", real: true, w: 1080, h: 290,
                alt: "New Matrix strength machines on the rubber floor at Tehama Family Fitness Center" },
  taichi:     { src: "/assets/tai-chi.jpg", real: true, w: 320, h: 240,
                alt: "A tai chi class in progress at Tehama Family Fitness Center" },
  basketball: { src: "/assets/hero/basketball.jpg", real: false, w: 2000, h: 848,
                alt: "A full-size indoor basketball court" },
  pickleball: { src: "/assets/hero/pickleball.jpg", real: false, w: 2000, h: 848,
                alt: "Indoor pickleball courts with permanent lines on sealed concrete" },
  childcare:  { src: "/assets/hero/childcare.jpg", real: false, w: 2000, h: 848,
                alt: "A bright childcare playroom with a slide, foam mats and a number rug" },
  studio:     { src: "/assets/hero/studio.jpg", real: false, w: 2000, h: 848,
                alt: "A group fitness studio with a mirrored wall and barre" },
  spin:       { src: "/assets/hero/spin.jpg", real: false, w: 2000, h: 848,
                alt: "Rows of stationary bikes in an indoor cycling studio" },
  yoga:       { src: "/assets/hero/yoga.jpg", real: false, w: 2000, h: 848,
                alt: "A yoga and pilates studio with a wood floor and mirrored wall" },
  fuelbar:    { src: "/assets/hero/fuelbar.jpg", real: false, w: 2000, h: 848,
                alt: "The Fuel Bar counter with blenders, coffee and a drinks fridge" },
  womens:     { src: "/assets/hero/womens.jpg", real: false, w: 2000, h: 848,
                alt: "The women's weight room with strength machines and dumbbells" },
  cardio:     { src: "/assets/hero/cardio.jpg", real: false, w: 2000, h: 848,
                alt: "A row of treadmills and ellipticals on the cardio floor" },
  locker:     { src: "/assets/hero/locker.jpg", real: false, w: 2000, h: 848,
                alt: "A locker room with a wooden bench and the cedar sauna door" },
  frontdesk:  { src: "/assets/hero/frontdesk.jpg", real: false, w: 2000, h: 848,
                alt: "The front desk and entry lobby" },
  barre:      { src: "/assets/hero/barre.jpg", real: false, w: 2000, h: 848,
                alt: "A studio with a ballet barre along a mirrored wall" },
  racquetball:{ src: "/assets/hero/racquetball.jpg", real: false, w: 2000, h: 848,
                alt: "An indoor racquetball court" },
  freeweights:{ src: "/assets/hero/freeweights.jpg", real: false, w: 2000, h: 848,
                alt: "The freeweight room with racks and an Olympic platform" },
  sauna:      { src: "/assets/hero/sauna.jpg", real: false, w: 2000, h: 848,
                alt: "Inside the cedar sauna" },
  gymfloor:   { src: "/assets/hero/gymfloor.jpg", real: false, w: 2000, h: 848,
                alt: "A wide view of the main gym floor" },
  exteriorDay:{ src: "/assets/hero/exterior-day.jpg", real: false, w: 2000, h: 848,
                alt: "Tehama Family Fitness Center on South Main Street on a clear morning" },
  corridor:   { src: "/assets/hero/corridor.jpg", real: false, w: 2000, h: 848,
                alt: "The corridor connecting the lobby to the studios" },
  /* NO POOL / SPA / POOL-LANE ENTRY HERE, DELIBERATELY. There is no pool at this
     address — see the retracted list above. Images for one were generated early,
     before that was known, and were never wired up; they are now deleted from
     assets/ so a future pass can't reintroduce the claim by finding the file. */

  /* ── second pass: the site was reusing gymfloor eight times and studio six. ── */
  platform:   { src: "/assets/hero/platform.jpg", real: false, w: 2000, h: 1116,
                alt: "The Olympic platform with a loaded bar, rack behind it" },
  nautilus:   { src: "/assets/hero/nautilus.jpg", real: false, w: 2000, h: 1116,
                alt: "The line of new Nautilus and Matrix strength machines" },
  dumbbells:  { src: "/assets/hero/dumbbells.jpg", real: false, w: 2000, h: 1116,
                alt: "The dumbbell rack running light to heavy, benches in front" },
  kettlebells:{ src: "/assets/hero/kettlebells.jpg", real: false, w: 2000, h: 1116,
                alt: "Kettlebells, medicine balls and bands on the class equipment rack" },
  stretch:    { src: "/assets/hero/stretch.jpg", real: false, w: 2000, h: 1116,
                alt: "The stretching area with mats, foam rollers and TRX straps" },
  crosstrain: { src: "/assets/hero/crosstraining.jpg", real: false, w: 2000, h: 1116,
                alt: "The cross-training rig, boxes, rope and turf lane" },
  circuit:    { src: "/assets/hero/circuit.jpg", real: false, w: 2000, h: 1116,
                alt: "The circuit training room, air-pressure machines in a ring" },
  cardioTheater:{src:"/assets/hero/cardiotheater.jpg", real: false, w: 2000, h: 1116,
                alt: "The cardio theater — treadmills facing a wall of screens, lights down" },
  reformer:   { src: "/assets/hero/reformer.jpg", real: false, w: 2000, h: 1116,
                alt: "Pilates reformers lined up in the mind-body studio" },
  courtLines: { src: "/assets/hero/courtlines.jpg", real: false, w: 2000, h: 1116,
                alt: "The hardwood court from floor level, painted lines running to the hoop" },
  paddles:    { src: "/assets/hero/paddles.jpg", real: false, w: 2000, h: 1116,
                alt: "A pickleball net set up on the permanent painted lines" },
  kidsroom:   { src: "/assets/hero/kidsroom.jpg", real: false, w: 2000, h: 1116,
                alt: "The Kids Fit room — slide, number mat and soft blocks" },
  lobby:      { src: "/assets/hero/lobby.jpg", real: false, w: 2000, h: 1116,
                alt: "The lobby and waiting area by the front windows" },
  coffee:     { src: "/assets/hero/coffee.jpg", real: false, w: 2000, h: 1116,
                alt: "The Fuel Bar counter — blender, coffee and the drinks fridge" },
  saunaDoor:  { src: "/assets/hero/saunadoor.jpg", real: false, w: 2000, h: 1116,
                alt: "The cedar sauna door and bench in the locker room" },
  tanning:    { src: "/assets/hero/tanning.jpg", real: false, w: 2000, h: 1116,
                alt: "The tanning booth off the service corridor" },
  exteriorDusk:{src: "/assets/hero/exterior-dusk.jpg", real: false, w: 2000, h: 1116,
                alt: "The building on South Main at dusk, arched windows lit" },

  kidsfit:    { src: "/assets/kids-fit.jpg", real: true, w: 1920, h: 450, hold: true,
                alt: "The Kids Fit room at Tehama Family Fitness Center",
                note: "HELD — identifiable children. Signed release required before publish." },
};
// Everything generated, for the disclosure line and the swap-list.
export const generatedShots = Object.entries(photos)
  .filter(([, p]) => p.real === false).map(([k]) => k);

/* What survives scrutiny as unique in Red Bluff. Checked against both
   competitors. No claim here that hasn't been verified on both sides. */
export const onlyHere = [
  ["A full basketball court", "Open gym twice a day, Monday through Friday. Nobody else in town has one."],
  ["Racquetball", "The only court in Red Bluff."],
  ["Three indoor pickleball courts", "Permanent lines, concrete, climate controlled \u2014 playable in August and in January."],
  ["Childcare while you train", "No other gym in Red Bluff offers it at all."],
  [`${sessions.filter(s => s.kind === "class").length} classes a week`, "Across 15 instructors, included with membership."],
  ["Sauna in both locker rooms", "Plus a full-service locker room on each side."],
];

/* ------------------------------------------------------------------ *
 * LEAD CAPTURE
 *
 * A static site has no server, so the form needs a posting endpoint. This is
 * the one value to change if you move providers.
 *
 * Default is FormSubmit's AJAX endpoint: no account, no key — but the FIRST
 * submission sends a one-time confirmation email to `to`, and nothing is
 * delivered until somebody clicks it. Do that before the site goes live, or
 * the first real enquiry is lost.
 *
 * Set `endpoint: null` to fall back to opening the visitor's own mail/SMS app.
 * ------------------------------------------------------------------ */
export const leadForm = {
  endpoint: "https://formsubmit.co/ajax/frontdesk@clubtehama.com",
  to: "frontdesk@clubtehama.com",
  subject: "Membership rate request \u2014 tehamafamilyfitness.com",
  confirmed: false,   // flip once the confirmation email has been clicked
};

/* ------------------------------------------------------------------ *
 * OWNERSHIP — the trust signal their own /about page throws away.
 * Their site says "locally owned and operated" and names nobody, in a
 * town of 14,000 where everyone already knows these people.
 *
 * Sources: Enjoy Magazine, "Physical Therapy and Wellness Center, Inc.
 * and Tehama Family Fitness Center," Melissa Mendonca, Jan 2019 issue
 * (pub. 12/28/2018); North State Parent, "Karla Stroman Enriches Lives
 * through Literacy." Both third-party and seven years old — CONFIRM
 * before publish, and let the family choose how they're named.
 *
 * The kicker: Karla, Aubrie and Kyle are all on the 2026 class schedule.
 * The people who own the building teach the 6 AM spin class.
 * ------------------------------------------------------------------ */
export const owners = {
  verify: true,
  founded: "September 2001",
  people: [
    { name: "Ed Stroman", role: "Opened the doors in September 2001",
      note: "Also CEO of the Physical Therapy and Wellness Center next door at 2490 S Main. Moved to Red Bluff in 1986." },
    { name: "Karla Stroman", role: "Owner", teaches: "Spin",
      note: "Teaches the 6:00 AM spin class Monday and Wednesday. A career teacher before this." },
    { name: "Aubrie Thomas", role: "Co-owner", teaches: "Lean & Mean, Tone Zone",
      note: "Ed and Karla's daughter. On the floor most weekday mornings." },
    { name: "Kyle Tingley", role: "Co-owner", teaches: "Tone Zone",
      note: "Wednesday evenings in the studio." },
  ],
  // The line the site should be making, once the family signs off on it:
  line: "The person taking your 6 AM spin class owns the building.",
};

/* Pickleball — organised play is run by the Red Bluff pickleball community
   on TFFC's three indoor courts. Sourced from Places2Play (USA Pickleball),
   Bounce and Pickleheads. TFFC's own calendar shows Tue 6:30 PM and Sat 8 AM;
   Places2Play also lists Thursday. Reconcile before publish. */
export const pickleball = {
  courts: 3, indoor: true, surface: "concrete", lines: "permanent",
  nets: "portable nets go up for play",
  dropIn: "$5", dropInSrc: "Places2Play",
  play: [["Saturday", "8:00–11:30 AM"], ["Tuesday", "6:30–9:00 PM"], ["Thursday", "6:30–9:00 PM"]],
  clubContact: { name: "Jody Johnson", phone: "530-526-7508", site: "pickleballredbluff.com" },
  listedOn: ["Pickleheads", "Places2Play", "Bounce", "Pickleballify"],
  levels: "2.5–4.0, beginners welcome",
  verify: true,
};

/* Their online join flow, checked live 2026-08-25. Two SKUs, no prices,
   no family option — at a business with "Family" in its name. */
export const joinFlow = {
  checked: "2026-08-25",
  skus: ["SINGLE MEMBERSHIP 12 MONTH", "SINGLE MEMBERSHIP MONTHLY"],
  pricesShown: false,
  familySku: false,
};

/* ------------------------------------------------------------------ *
 * NEWSLETTER
 *
 * Same mechanism as the rate form: a plain POST to formsubmit.co, which
 * relays to a real inbox. IT DOES NOT WORK UNTIL SOMEBODY CLICKS THE
 * CONFIRMATION EMAIL formsubmit sends on the first submission. Do that
 * before launch or every sign-up is silently lost.
 *
 * This is a holding pattern, not a mailing list. It collects addresses to
 * an inbox; it does not manage subscriptions, and it cannot unsubscribe
 * anybody. `tbd.newsletterList` is the question that replaces it — the
 * moment the club picks Mailchimp or Constant Contact, swap `endpoint`
 * for the list's form action and delete this note.
 *
 * Set `endpoint: null` and it degrades to the visitor's own mail app.
 * ------------------------------------------------------------------ */
export const newsletter = {
  endpoint: "https://formsubmit.co/ajax/frontdesk@clubtehama.com",
  to: "frontdesk@clubtehama.com",
  subject: "Newsletter sign-up — tehamafamilyfitness.com",
  confirmed: false,   // flip once the confirmation email has been clicked
  cadence: "About twice a month",
  topics: [
    "Schedule changes before they hit the board",
    "A recipe with the macros already worked out",
    "What is new in the building",
  ],
};

/* ------------------------------------------------------------------ *
 * THE BLOG
 *
 * Three shelves: routines (fitting training into a real week), workouts
 * (what to actually do in this building), food (what to eat around it).
 *
 * SOURCING. The recipes are Kristi Havlin's — KH Macro Coach & Trainer —
 * transcribed from her own graphics, macros and all, and credited to her
 * on every one. Her photographs are NOT reproduced: the posts run without
 * an image rather than borrow one (see tbd.khPhotos). Her direct contact
 * and her $250 partner-coaching price are deliberately not published here
 * (see tbd.khAffiliation) — a personal phone number on the club's website
 * is the club's call to make, not this build's.
 *
 * Everything else is house-written and grounded in facts this repo already
 * holds: the real hours, the real childcare windows, the real equipment
 * list, the real Fuel Bar menu, the real calendar. No invented studies, no
 * invented member stories, no numbers that are not in data.mjs.
 *
 * Nothing here is medical advice, and every post says so at the bottom.
 * ------------------------------------------------------------------ */
export const authors = {
  kh:   { name: "Kristi Havlin", role: "Macro coach and trainer",
          bio: "Coaches macros and trains in Tehama County. The recipes here are hers — macros already worked out, five servings at a time.",
          verify: true },
  desk: { name: "The front desk", role: `${"Tehama Family Fitness Center"}`,
          bio: "Written in the building, about the building. If something here is wrong, tell us and we will fix it." },
};

export const CATS = [
  { slug: "routines", name: "Routines",
    dek: "Fitting training into a week that is already full — built around our actual hours and the actual childcare windows." },
  { slug: "workouts", name: "Workouts",
    dek: "What to do once you are in the door, on the equipment that is genuinely here." },
  { slug: "food", name: "Food",
    dek: "Meal prep and macros from Kristi Havlin, plus what is worth ordering at the Fuel Bar." },
];

const R = (o) => o;   // recipe marker, for readability below

export const posts = [
  /* ---------------------------------------------------------------- FOOD */
  { slug: "korean-ground-turkey-bowls", cat: "food", date: "2026-08-19", author: "kh",
    title: "Korean ground turkey bowls",
    dek: "Five containers, 322 calories each, 30 grams of protein. The one people ask for again.",
    kicker: "Prep once, eat well all week",
    source: "Recipe and macros: Kristi Havlin, KH Macro Coach & Trainer. Published here with the numbers exactly as she wrote them.",
    lede: "This is the meal prep that converts people. It takes one pan, one rice cooker and about forty minutes, and it comes out of the fridge for five days without turning into a chore.",
    recipe: R({
      makes: "5 servings", serving: "1 bowl",
      macros: [["322", "calories"], ["30g", "protein"], ["28g", "carbs"], ["10g", "fat"]],
      ingredients: [
        "2 pounds ground turkey (93/7)",
        "1/2 cup lightly-packed brown sugar",
        "1/4 cup soy sauce",
        "1 tablespoon sriracha sauce",
        "1 cup basmati rice",
        "2 cups water",
        "1 tablespoon salt",
        "2 carrots, diced (150g)",
        "1 cucumber, diced (300g)",
        "Small bunch of green onions, diced",
        "8–10 ounces spinach",
      ],
      steps: [
        "Rinse your rice well and put it in the rice cooker with the water and salt. If cooking over the stove, follow the directions on the back of the bag of rice.",
        "Cook turkey in a skillet over medium heat until no longer pink.",
        "Drain fat then return the skillet to the stove.",
        "Over medium low heat, stir in the brown sugar, soy sauce, and sriracha. Simmer for about 10–15 minutes until the sauce thickens.",
        "Steam your spinach and carrots separately, until soft.",
        "Lay out 5 meal prep containers. To each container add 3 ounces of cooked rice, 1/5 of the diced cucumbers (1/2 cup), 1/5 of the cooked carrots (1/4 cup), a scoop of the spinach, and 1/5 of the ground turkey (about 3/4 cup). Top with green onions and extra sriracha if you like spicy.",
        "Cover with lids and store in the refrigerator up to 5 days.",
      ],
      keeps: "Up to 5 days in the fridge.",
    }),
    body: `
### Why this one works after a class

Thirty grams of protein and a real carb portion, in something you can eat cold at a desk. If you
train at 6 AM and eat this at noon, you are not making a decision about lunch on four hours of
sleep — the decision was made on Sunday.

### The two places people go wrong

- **Under-cooking the sauce.** Ten to fifteen minutes is not a suggestion. It has to thicken or the
  rice turns to soup by Wednesday.
- **Building it hot.** Let everything cool before the lids go on, or you get condensation and,
  by day three, sad rice.

### Scaling it

The macros above are per bowl, at five bowls. If you split it into four, everything goes up by a
quarter — about 400 calories and 37 grams of protein. Weigh the turkey rather than eyeballing it;
93/7 and 85/15 are a 90-calorie difference per serving.
`,
  },

  { slug: "chicken-parmesan-gnocchi", cat: "food", date: "2026-08-12", author: "kh",
    title: "Chicken parmesan gnocchi",
    dek: "325 calories, 33 grams of protein, and it tastes like the thing you would order.",
    kicker: "High protein, comforting, easy prep",
    source: "Recipe and macros: Kristi Havlin, KH Macro Coach & Trainer.",
    lede: "The reason most meal prep fails in week three is that it stops being food you want. This is the answer to that — baked, cheesy, and still 325 calories.",
    recipe: R({
      makes: "5 servings", serving: "1 bowl",
      macros: [["325", "calories"], ["33.4g", "protein"], ["30g", "carbs"], ["9.3g", "fat"]],
      ingredients: [
        "1 & 1/2 pounds boneless, skinless chicken breasts or tenders",
        "10 ounces package gnocchi",
        "10 grams butter",
        "1 cup chicken broth",
        "1 cup marinara sauce (or stewed tomatoes + 1/2 tbsp Italian seasoning)",
        "1/4 cup shredded parmesan (21g)",
        "3/4 cup reduced fat mozzarella (84g)",
        "Salt & pepper to taste",
      ],
      steps: [
        "Arrange 5 oven safe containers on a cookie sheet. Lightly spray with cooking spray.",
        "Cut chicken into 1 inch cubes. Cook over medium heat with salt and pepper until no longer pink. Remove and set aside.",
        "In the same pan add butter. Once melted, add gnocchi and sauté a few minutes until golden brown. If they begin to stick to the bottom of the pan add the broth.",
        "Let the gnocchi simmer in the broth for about 5 minutes, until it thickens up.",
        "Turn off heat and add the marinara sauce and chicken.",
        "Evenly distribute into your containers (about 1 cup each). Top with cheeses.",
        "Broil on high or bake 3–5 minutes until the cheese melts and the top gets nice and crispy.",
      ],
      keeps: "Store in the fridge up to 4 days. Reheat and enjoy.",
    }),
    body: `
### The trick is the gnocchi, not the chicken

Gnocchi browns. That is the whole thing. Give it a few minutes in the butter before any liquid goes
near it and you get a crisp edge that survives being reheated; skip that and you get a bowl of
dumplings. The broth goes in after, and only if they start to stick.

### Weigh the cheese

Twenty-one grams of parmesan and 84 grams of mozzarella is what these macros are built on. Cheese
is where a 325-calorie meal quietly becomes a 500-calorie one — it is the single ingredient most
worth putting on a scale.

### If you want it higher protein

Push the chicken to two pounds and leave everything else alone: about 39 grams of protein a serving,
for roughly 30 more calories. That is the cheapest trade in the recipe.
`,
  },

  { slug: "pork-enchilada-bowls", cat: "food", date: "2026-08-05", author: "kh",
    title: "Pork enchilada bowls",
    dek: "455 calories and 45 grams of protein. The big one, for the days you actually trained hard.",
    kicker: "Savory, cheesy and comforting",
    source: "Recipe and macros: Kristi Havlin, KH Macro Coach & Trainer.",
    lede: "Layered like a lasagna, built like an enchilada, and the Greek yogurt is doing the work that sour cream usually does — which is where the protein number comes from.",
    recipe: R({
      makes: "5 servings", serving: "1 bowl",
      macros: [["455", "calories"], ["45.6g", "protein"], ["36.5g", "carbs"], ["14.1g", "fat"]],
      ingredients: [
        "20 ounces cooked pork loin",
        "28 ounce can red enchilada sauce",
        "1 cup plain non fat Greek yogurt (227g)",
        "10 corn tortillas",
        "5 ounces Monterey Jack cheese",
        "5 teaspoons cotija cheese",
      ],
      steps: [
        "Preheat oven to 350°F and arrange oven safe containers on a cookie sheet. Spray lightly with cooking spray.",
        "Warm corn tortillas in the microwave for 30 seconds, or over the gas burner until crispy.",
        "In a bowl mix Greek yogurt with about 1/2 cup of the enchilada sauce.",
        "Begin layering in all ingredients in this order: about 1/4 cup enchilada sauce, 1 corn tortilla, 2 ounces pork, 1/8 cup Greek yogurt mixture, 1/2 ounce Monterey jack cheese. Repeat. Top with cotija and bake for 30 minutes.",
        "Let cool before covering with lids and placing in the refrigerator up to 5 days.",
      ],
      keeps: "Airtight containers, up to 5 days in the fridge.",
    }),
    body: `
### Yogurt instead of sour cream

A cup of plain non-fat Greek yogurt carries about 22 grams of protein and almost no fat. Cut with
half a cup of enchilada sauce it stops reading as yogurt entirely — this is the swap that turns a
comfort meal into a 45-gram-protein one, and nobody at the table notices.

### It is a layer cake, so build it in order

Sauce, tortilla, pork, yogurt, cheese. Repeat. The bottom layer of sauce is what stops the first
tortilla welding itself to the glass.

### Where this one fits

455 calories is the biggest of the three recipes on this blog, and deliberately so. This is the
container for a day you did something hard — a Body Burner at 4:30, a spin class and the strength
floor after it. On a rest day, the [turkey bowls](/blog/korean-ground-turkey-bowls/) are the
better fit.
`,
  },

  { slug: "what-to-order-at-the-fuel-bar", cat: "food", date: "2026-07-29", author: "desk",
    classes: ["body-burner"],
    title: "What to order at the Fuel Bar, and what it costs",
    dek: "The whole menu, the actual prices, and which one is right for what you just did.",
    kicker: "Every price on the board",
    hero: "coffee",
    lede: "The Fuel Bar is in the lobby and the coffee is free until 9 AM. Beyond that, here is the honest version of what to order — including when the answer is water and a banana.",
    body: `
### After a class

**A protein shake, $7.** Vanilla, chocolate or cookies and cream, pick two. Spinach, creatine or
almond milk are a dollar or fifty cents on top. This is the one that does a job — if you trained
before work and lunch is three hours out, that is the gap it closes.

If $7 is not the move every day, it is not meant to be. Most people do it two or three times a week
after the harder sessions and drink water the rest of the time.

### When you are hot and it is 105 outside

**Recharge smoothie, $5 for 16oz or $6 for 24oz.** Or an **LMNT packet at $2** — electrolytes,
no sugar, mixes into your own bottle. In a Red Bluff July the packet is genuinely the better buy,
and the ready-to-drink is $3.50 if you would rather not mix it.

### Before a 6 AM class

**Coffee is free until 9 AM**, and $1.25 after. That is the entire recommendation. Pre-workout is
$2 for a single serve of Bucked Up or RYSE if you want it, energy drinks are $3.50, and the
elevated energy is $5 — but a lot of people at the 6 AM spin class are running on the free coffee
and doing fine.

### The snack shelf

Protein bars are $3.50 and a banana is $1. If you came straight from work and you are about to do
Body Burner on nothing, the banana is the correct answer and it costs a dollar.

### The full board

Everything above, with the rest of it, is on the [Fuel Bar page](/fuel-bar/) — pulled from the
menu itself, so it is current.
`,
  },

  { slug: "five-containers-one-sunday", cat: "food", date: "2026-07-22", author: "desk",
    title: "Five containers, one Sunday",
    dek: "A meal-prep hour that survives contact with a real week — and the three recipes to run it on.",
    kicker: "The 60-minute version",
    hero: "lobby",
    lede: "Nobody keeps up a meal prep that takes a whole afternoon. The version that lasts is one hour, one protein, five containers, and no decisions left over.",
    body: `
### The hour

1. **Rice or gnocchi on first.** Whatever needs a timer starts before anything else does.
2. **One protein, one pan.** Two pounds of ground turkey, a pound and a half of chicken, or a pork
   loin. One. Not three.
3. **Vegetables while the protein cooks.** Steam, roast, or dice raw — raw cucumber holds up
   better across five days than anything you cook.
4. **Five containers in a row on the counter.** Build them all at once, in one pass. Building one
   at a time is how an hour becomes three.
5. **Cool before the lids go on.** This is the step everybody skips and it is the reason day four
   tastes wrong.

### Rotate three, not one

The reason meal prep dies in week three is repetition, not effort. Three recipes on rotation is
enough that none of them wears out:

- [Korean ground turkey bowls](/blog/korean-ground-turkey-bowls/) — 322 cal, 30g protein
- [Chicken parmesan gnocchi](/blog/chicken-parmesan-gnocchi/) — 325 cal, 33g protein
- [Pork enchilada bowls](/blog/pork-enchilada-bowls/) — 455 cal, 46g protein

All three are Kristi's, all three make five servings, and all three keep four to five days. Two of
them at once gives you ten containers and a week where lunch is not a question.

### The containers matter more than you would think

Glass, oven-safe, same size, lids that actually seal. The enchilada bowls and the gnocchi both go
under a broiler in the container they are stored in — which removes a whole washing-up step, and
that step is where the habit usually dies.
`,
  },

  /* ------------------------------------------------------------- WORKOUTS */
  { slug: "your-first-spin-class", cat: "workouts", date: "2026-08-26", author: "desk",
    classes: ["spin", "spin-tone"],
    title: "Your first spin class",
    dek: "Eleven sessions a week, most of them before 9 AM. Here is what actually happens in the room.",
    kicker: "Come early, sit at the back",
    hero: "spin",
    lede: "Spin is the class people are most nervous about and least need to be. You control the resistance the whole time, which means the class is exactly as hard as you decide it is.",
    body: `
### Turn up ten minutes early

Not five. Ten. The bike has to be set for your leg length, and somebody at the desk or the
instructor will do it in about ninety seconds — seat height, seat forward-and-back, handlebar
height. A badly set bike is the entire reason people say spin hurt their knees.

Say it is your first one. Every instructor in this building would rather know.

### The dial is yours

The instructor calls a climb; you decide what a climb means today. Nobody can see your resistance
and nobody is checking. The first class is about staying on the bike for the whole class, not about
matching the person in front.

### What to bring

Water — more than you think. A towel. Shoes either clip in or strap onto the pedal, and the desk
will show you which. Regular trainers are fine to start.

### Sitting down is allowed

You will get out of the saddle at some point and you can sit back down whenever you want. This is
not a test.

### When it runs

Eleven sessions a week, most before 9 AM, in the dedicated spin room — the full list of times is on
the [spin page](/classes/spin/), and every row there tells you whether the kids' room is open at
that hour.

### After

Water first, then food within an hour or two. If you want the shortcut, the
[Fuel Bar](/blog/what-to-order-at-the-fuel-bar/) is in the lobby and the coffee is free before 9.
`,
  },

  { slug: "strength-floor-first-three-weeks", cat: "workouts", date: "2026-08-15", author: "desk",
    classes: ["kettlebell", "tone-zone", "lean-and-mean"],
    title: "The strength floor: your first three weeks",
    dek: "A plain three-day plan on the equipment that is actually in this building.",
    kicker: "Two sets, six movements, done",
    hero: "nautilus",
    lede: "Walking onto a strength floor with no plan is why most people never come back to one. This is a plan. It fits in forty minutes and it uses machines and dumbbells that are genuinely here.",
    body: `
### The rules for three weeks

- **Two sets of everything.** Not four. You are learning movements, not chasing a number.
- **Stop two reps short.** If you could do ten, do eight.
- **Same weight until it is easy for both sets.** Then go up one notch.
- **Three days a week, never two in a row.**

### Day A — push

1. Chest press machine — 2 × 10
2. Shoulder press machine — 2 × 10
3. Dumbbell bench press — 2 × 10
4. Triceps pushdown — 2 × 12
5. Leg press — 2 × 12
6. Plank — 2 × 30 seconds

### Day B — pull

1. Lat pulldown — 2 × 10
2. Seated row — 2 × 10
3. Dumbbell row, one arm at a time — 2 × 10 each
4. Dumbbell curl — 2 × 12
5. Leg curl — 2 × 12
6. Dead bug — 2 × 8 each side

### Day C — legs and carrying things

1. Goblet squat with a dumbbell — 2 × 10
2. Leg press — 2 × 12
3. Dumbbell Romanian deadlift — 2 × 10
4. Step-up onto a bench — 2 × 8 each leg
5. Farmer's carry, one length of the floor and back — 2 rounds
6. Calf raise — 2 × 15

### What is here to do it on

The strength floor runs new Matrix and Nautilus machines, a full dumbbell rack light to heavy,
benches, a freeweight room with an Olympic platform, a cross-training rig, TRX and stretching
stations. Nothing above needs anything the building does not have.

If you would rather not decide any of this yourself, that is what
[personal training](/personal-training/) is for — and the
[women's weight room](/womens-weight-room/) is a separate room if the main floor feels like a lot
in week one.

### Week four

Add a third set to the first two movements of each day. That is the whole progression. Do not
redesign it.
`,
  },

  { slug: "twenty-minutes-in-the-circuit-room", cat: "workouts", date: "2026-08-08", author: "desk",
    classes: ["cardio-circuit", "silversneakers-cardio-circuit"],
    title: "Twenty minutes in the circuit room",
    dek: "A ring of air-pressure machines, a timer, and no queuing. The best-value room in the building on a short day.",
    kicker: "When you have half an hour",
    hero: "circuit",
    lede: "The circuit training room is the room people walk past. It is also the one that solves the specific problem of having twenty-five minutes and no plan.",
    body: `
### Why the room works

The machines are arranged in a ring and set by air pressure, which means resistance changes with a
dial rather than a pin and a stack. You sit down, you go, you move on. There is no setup, no
plate-loading, and — crucially — no waiting for somebody to finish.

### The twenty-minute version

Two laps of the ring. Forty-five seconds on each machine, fifteen seconds to move to the next one.
Somewhere between machines, thirty seconds of walking, marching or stepping, then carry on.

That is it. Two laps is roughly twenty minutes, and it hits everything.

### The half-hour version

Three laps, and add sixty seconds of harder cardio between each lap — the cardio floor is next
door and has thirty-plus pieces to pick from.

### If you would rather be told what to do

**Cardio Circuit** runs the same room on a timer with an instructor calling it, Thursday mornings
with Kevin. **SilverSneakers Cardio Circuit** runs a lower-impact version at midday Tuesday and
Thursday. Both are included — [times are here](/classes/cardio-circuit/).

### What to bring

Water and a towel. Everything else is in the room.
`,
  },

  { slug: "what-barre-actually-does", cat: "workouts", date: "2026-08-01", author: "desk",
    classes: ["barre"],
    title: "What barre actually does",
    dek: "Small movements, light weights, and legs that shake. Here is what is going on and why it is worth it.",
    kicker: "Strength. Lengthen. Empower.",
    hero: "barre",
    source: "The five benefits below are the club's own, quoted from our barre flyer.",
    lede: "Barre looks gentle from the doorway and is not. The movements are small on purpose: hold a position, pulse inside it, and the muscle never gets the rest it is waiting for.",
    body: `
### The five things it is for

In the club's own words, from our barre flyer:

- **Tone and strengthen** — build lean muscle and improve endurance.
- **Improve posture** — strengthen your core and support better alignment.
- **Increase flexibility** — lengthen, stretch and move with greater ease.
- **Low impact, high results** — effective, joint-friendly, and sustainable.
- **All levels welcome** — modifications for every body and every goal.

### Why the shaking is the point

A barre class holds a position and then pulses an inch inside it. Because the muscle never fully
lengthens, it never gets the half-second of rest a full rep gives you. The shake is fatigue arriving
faster than it does under a heavy bar — with a fraction of the load on the joint. That trade is
the entire argument for the class.

### Nothing here lands hard

No jumping, no impact. Which is why it works for people coming back from a knee, and why it also
works for people who lift four days a week and want the fifth day to not be another heavy one.

### What to bring

Grip socks if you have them. Weights, bands and mats are already in the studio.

### One honest note about the schedule

Barre times have moved. Our own flyer, the live calendar and Facebook currently give three different
answers — so if you are coming for barre specifically,
[call the desk on 530-528-8656](tel:+15305288656) first. The [barre page](/classes/barre/) lays out
all three versions rather than picking one.
`,
  },

  /* ------------------------------------------------------------- ROUTINES */
  { slug: "the-five-am-hour", cat: "routines", date: "2026-08-22", author: "desk",
    classes: ["hybrid", "body-burner", "stretch-and-mobility", "tai-chi"],
    title: "The 5 AM hour",
    dek: "The doors open at five. Here is how to make the early hour a habit instead of a heroic act.",
    kicker: "Mon–Fri from 5:00 AM",
    hero: "exteriorDay",
    lede: "The building unlocks at 5:00 AM Monday to Friday. The first class is 5:30. If mornings are the only hour you actually control, this is how to make that hour stick.",
    body: `
### Decide the night before, not at 4:50

Bag packed, shoes by the door, bottle filled. The decision at 4:50 AM is not a fair fight — so do
not have it. Everything you can move to the night before, move.

### Start with two days, not five

The people who go from nothing to five mornings a week last about nine days. Two mornings is a
schedule you can keep in a bad week, and a bad week is the one that decides whether a habit
survives.

### What is actually on at that hour

- **5:30 AM** — Hybrid, Tuesday and Thursday. Strength and cardio in one block.
- **5:30 AM** — Body Burner, Friday.
- **6:00 AM** — Spin, Monday through Friday. The busiest early class in the building.
- **6:00 AM** — Stretch & Mobility, Tuesday and Thursday.
- **7:15 AM** — Tai Chi, every single weekday.

Or nothing at all: the floor is open from five and there is nobody on it.

### The 5 AM floor is a different building

Between five and six the strength floor is close to empty. No waiting for a rack, no waiting for a
bench. If group classes are not your thing, this is the hour that makes the membership worth it.

### Coffee is free until 9

It is in the lobby, it costs nothing before 9 AM, and on a February morning in Red Bluff that is a
more effective motivator than anything else on this page.

### Give it three weeks

The first week is unpleasant, the second is tolerable, the third is when the alarm stops being an
argument. Nearly everybody who quits, quits inside the first two.
`,
  },

  { slug: "training-around-the-kids-room", cat: "routines", date: "2026-08-18", author: "desk",
    title: "Training around the kids' room",
    dek: "The childcare hours, laid against the class board, so you can see what is genuinely possible.",
    kicker: "The window is the whole plan",
    hero: "childcare",
    lede: "For a lot of parents the question is not what to train. It is whether there is anybody to watch the kids while you do. So here are the windows, in plain terms.",
    body: `
### When the kids' room is open

| Day | Morning | Evening |
|---|---|---|
| Monday–Thursday | 8:00 AM – 1:00 PM | 4:00 PM – 8:00 PM |
| Friday | 8:00 AM – 1:00 PM | closed |
| Saturday | 8:00 AM – 1:00 PM | closed |
| Sunday | closed | closed |

### What that opens up

**The 8:15 and 8:30 block.** Zumba & Tone at 8:15 Monday, Wednesday and Friday. Spin at 8:30
Monday and Thursday. Barre Above at 8:15 Tuesday. All of them start inside the morning window with
time either side to sign in and get out.

**The 10:30 block.** Mat Pilates and Drums Alive both run at 10:30 on Monday, Wednesday and Friday
— comfortably mid-window, which makes them the least stressful classes on the board for a parent.

**Monday to Thursday evenings.** The room reopens at four. Body Burner at 4:30 Monday and Wednesday,
then the 5:30 block — Tone Zone, spin, yoga, kettlebell.

### What it rules out

Friday and Saturday evenings, all of Sunday, and anything before 8 AM. If mornings before eight are
your only hour, that is a two-adult problem, not a scheduling one — and worth saying out loud when
you plan the week.

### Every schedule row tells you

Every session on our [schedule](/schedule/) and on every class page shows whether the kids' room is
open at that hour. That was the single most useful thing we could put on this website, and it is on
every page that lists a time.

### Still to confirm

Ages, registration and how the first visit works are the questions we get most, and we would rather
you got the real answer from the desk than a guess from a website:
[call 530-528-8656](tel:+15305288656). The [childcare page](/childcare/) has what we can confirm.
`,
  },

  { slug: "a-week-that-actually-fits", cat: "routines", date: "2026-08-11", author: "desk",
    classes: ["zumba", "pilates", "drums-alive", "yoga-easy-flow", "u-jam", "tone-zone"],
    title: "A week that actually fits",
    dek: "Three real weekly templates built from the class board — for the early riser, the parent, and the after-work crowd.",
    kicker: "Four days, not seven",
    hero: "corridor",
    lede: "Most training plans fail on the calendar, not in the gym. So here are three weeks built out of classes that genuinely run, at times the building is genuinely open.",
    body: `
### If you train before work

| Day | What |
|---|---|
| Monday | 6:00 AM Spin |
| Tuesday | 6:00 AM Stretch & Mobility |
| Wednesday | 6:00 AM Spin |
| Thursday | Strength floor, 5:00–6:00 — the floor is empty |
| Friday | 5:30 AM Body Burner |
| Weekend | Saturday 8:30 AM Spin, or nothing |

Four hard days, one easy one, and the weekend genuinely off.

### If you train inside the childcare window

| Day | What |
|---|---|
| Monday | 8:15 AM Zumba & Tone |
| Tuesday | 8:15 AM Barre Above |
| Wednesday | 10:30 AM Mat Pilates |
| Thursday | 8:30 AM Spin |
| Friday | 10:30 AM Drums Alive |

All five sit inside the 8:00 AM – 1:00 PM window, with room either side. Drop two of them in a
bad week and it still works.

### If you train after work

| Day | What |
|---|---|
| Monday | 5:30 PM Tone Zone or Spin |
| Tuesday | 5:30 PM Spin/Tone, or 6:30 PM pickleball |
| Wednesday | 5:30 PM Tone Zone |
| Thursday | 5:30 PM Yoga Easy Flow |
| Friday | 6:00 PM basketball open gym |

### The rule underneath all three

**Four days is the number.** Not seven, not two. Seven collapses the first week something goes
wrong; two never builds enough momentum to feel different. Four leaves room for a bad Tuesday.

Build yours off the [full schedule](/schedule/) — every row tells you the day, the time, who is
teaching and whether the kids' room is open.
`,
  },
];

/* Newest first, everywhere. */
posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const postsIn = cat => posts.filter(p => p.cat === cat);
export const catOf = slug => CATS.find(c => c.slug === slug);

/* ------------------------------------------------------------------ *
 * SPECIALS
 *
 * THE RULE HERE IS THE RULE EVERYWHERE: nothing renders as an offer
 * until somebody confirms it. `running` is the promotions menu, every
 * one of them `on: false`. The front desk flips one to true, fills in
 * `ends`, and it takes over the top bar and the top of /specials/.
 *
 * An expired special on a website is worse than no specials page, so
 * `ends` is checked at build time and a lapsed promo will not render.
 *
 * `standing` is the other half, and the more honest one: things that
 * are permanently true and already verified elsewhere in this file.
 * They were scattered across nine pages with no single place that said
 * "here is everything you get without paying extra." That IS the offer
 * at this business, and it has never been collected in one place.
 * ------------------------------------------------------------------ */
export const specials = {
  /* Promotions. All off. Flip `on` and set `ends` to publish one. */
  running: [
    { id: "joinFeeWaived", on: false, ends: null,
      name: "Enrollment fee waived",
      bar: "Enrollment fee waived this month",
      blurb: "No joining fee — you pay the monthly rate and nothing else to start.",
      ask: "Confirm the normal enrollment fee first (call sheet A8)." },
    { id: "firstMonth", on: false, ends: null,
      name: "First month",
      bar: "A deal on your first month",
      blurb: "A reduced or free first month for new members.",
      ask: "Needs the real rate confirmed before it can say a number." },
    { id: "bringAFriend", on: false, ends: null,
      name: "Bring a friend",
      bar: "Bring a friend free this week",
      blurb: "Bring somebody with you at no charge — they train on your membership for the visit.",
      ask: "How many visits, and do they need to sign a waiver at the desk?" },
    { id: "backToSchool", on: false, ends: null,
      name: "Back to school",
      bar: "The kids are back in school — now it's your turn",
      blurb: "The late-August window when the mornings free up and the 8:15 classes fill.",
      ask: "Seasonal. Worth running late August; the childcare window covers it either way." },
    { id: "corporate", on: false, ends: null,
      name: "Corporate rate",
      bar: "Corporate rates for Red Bluff employers",
      blurb: "A rate for local employers who put staff on the membership.",
      ask: "Confirm the rate and who at the club handles the enquiry (call sheet F7)." },
  ],

  /* Permanently true, and every one already sourced elsewhere in this file. */
  standing: [
    { id: "classes", name: "Every class, included",
      line: "No class fee, no booking, no app",
      body: "All 54 group classes a week are part of the membership — spin, yoga, barre, Zumba, Pilates, tai chi, kettlebell, Drums Alive and the rest. You do not book, you do not pay per class, and there is no app to download. Turn up.",
      href: "/classes/", cta: "See all 19 classes" },
    { id: "building", name: "The whole building",
      line: "One membership, no separate charges",
      body: "The full basketball court, three indoor pickleball courts, racquetball, the strength floor, the women's weight room, the circuit room, cardio theater and the sauna. There is no court fee and no room that costs extra.",
      href: "/amenities/", cta: "What's in the building" },
    { id: "coffee", name: "Coffee is free until 9 AM",
      line: "Every day, no purchase",
      body: "In the lobby, free before nine, $1.25 after. On a February morning that is a more effective motivator than anything else we could put on this page.",
      href: "/fuel-bar/", cta: "The Fuel Bar menu" },
    { id: "tour", name: "A tour costs nothing",
      line: "Walk in, no appointment",
      body: "Ten minutes, no pressure, and nobody will put you through a sales process. Come any day we are open and ask at the desk.",
      href: "/tour/", cta: "Take the tour first" },
    { id: "silversneakers", name: "SilverSneakers",
      line: "At no cost on qualifying plans",
      body: "If your Medicare Advantage or supplement plan includes SilverSneakers, your membership here is covered by it. Bring the card the first time.",
      href: "/silversneakers/", cta: "How it works here" },
    { id: "pickleball", name: "Pickleball drop-in",
      line: "$5 for non-members",
      body: "Three indoor courts with permanent lines, climate controlled. Members play at no extra charge.",
      href: "/pickleball/", cta: "Play times", srcKey: "pickleballFee" },
  ],

  /* The top bar. A live promo wins it; otherwise this, which is simply true. */
  standingBar: "All 54 classes included — no class fee, no booking",
};

/* Live promos only — an `ends` date in the past disqualifies one, so a
   forgotten special expires itself instead of lying on the homepage.
   `today` is passed in by the build; this file never reads the clock. */
export const liveSpecials = today =>
  specials.running.filter(s => s.on && (!s.ends || s.ends >= today));

/* ------------------------------------------------------------------ *
 * MANAGING AN EXISTING MEMBERSHIP
 *
 * Every gym website is built for people who are not members yet, and
 * then a member who wants to cancel, upgrade, freeze or change a card
 * cannot find a single link — so they call, and the desk absorbs it.
 *
 * We do not know the answers yet (tbd.cancelHow, tbd.memberPortal), and
 * a cancellation policy is the LAST thing to guess at, so every route
 * below goes to a real human with the subject line already filled in.
 * The moment `portal` gets a URL, it becomes a button.
 * ------------------------------------------------------------------ */
export const manage = {
  portal: null,          // tbd.memberPortal — ABC clubs usually have one
  reasons: [
    { id: "upgrade", label: "Upgrade or add someone",
      note: "Going from single to a couple or a family, or adding a child.",
      subject: "Membership change — upgrade or add someone" },
    { id: "edit", label: "Update card or contact details",
      note: "New bank card, new phone number, new address.",
      subject: "Membership change — update my details" },
    { id: "freeze", label: "Freeze it for a while",
      note: "Travel, injury, deployment. Ask what is possible before you cancel.",
      subject: "Membership change — freeze my membership" },
    { id: "cancel", label: "Cancel",
      note: "We would rather you told us why, but you do not have to.",
      subject: "Membership change — cancel my membership" },
  ],
};

/* ------------------------------------------------------------------ *
 * THE MEMBER APP
 *
 * This answers tbd.trainerize, which has been open since the first
 * build: yes, there is an app, and it is Trainerize white-labelled —
 * the Android package name says so outright
 * (com.trainerize.tehamahealthandfitness).
 *
 * The App Store link supplied was a Mexican storefront with en-GB
 * (apps.apple.com/mx/...?l=en-GB). Same app id, wrong region: a Red
 * Bluff member tapping it lands in the wrong store. Normalised to /us/.
 * ------------------------------------------------------------------ */
export const app = {
  name: "Tehama Family Fitness Center",
  platform: "Trainerize",
  ios: "https://apps.apple.com/us/app/tehama-family-fitness-center/id6469085639",
  iosId: "6469085639",
  android: "https://play.google.com/store/apps/details?id=com.trainerize.tehamahealthandfitness",
  androidId: "com.trainerize.tehamahealthandfitness",
  // What it does is NOT confirmed — Trainerize supports all of this, but
  // which parts this club has switched on is a question for the desk.
  does: null,
  verify: true,
};

/* ------------------------------------------------------------------ *
 * COMMUNITY DONATION REQUESTS
 *
 * A locally owned club in a town of 14,000 gets asked constantly —
 * raffle baskets, sports boosters, school auctions, fundraisers. Right
 * now every one of those arrives as a phone call to the front desk.
 *
 * Nothing here promises anybody anything: what they give, how much and
 * how often is theirs to decide, and none of it is confirmed. The form
 * exists to get the ask off the desk and into an inbox with the details
 * already attached.
 * ------------------------------------------------------------------ */
export const donations = {
  endpoint: "https://formsubmit.co/ajax/frontdesk@clubtehama.com",
  to: "frontdesk@clubtehama.com",
  subject: "Community donation request — tehamafamilyfitness.com",
  confirmed: false,
  lead: null,        // tbd.donationLead — how much notice they need
  gives: null,       // tbd.donationGives — what they actually donate
  types: ["School or sports fundraiser", "Raffle or silent auction",
          "Non-profit event", "Youth program", "Something else"],
};

/* ------------------------------------------------------------------ *
 * LEGAL
 *
 * These pages describe what THIS WEBSITE does, which is unusually
 * little: no cookies, no analytics, no tracking pixels, nothing kept in
 * your browser. That is verified against the built output on every
 * build, not asserted — see the privacy scan in build.mjs.
 *
 * They are NOT lawyer-drafted and nobody with a law licence has read
 * them (tbd.legalReview). They are an honest, specific description of
 * real behaviour, which is a far better starting point for a solicitor
 * than a template full of clauses about cookies this site does not set.
 * ------------------------------------------------------------------ */
export const legal = {
  updated: "2026-08-28",
  // Every third party the built pages actually reach out to, and why.
  thirdParties: [
    { name: "Google Fonts", host: "fonts.googleapis.com, fonts.gstatic.com",
      why: "Loads the three typefaces the site is set in.",
      gets: "Your IP address and browser user-agent, as with any file a browser fetches." },
    { name: "FormSubmit", host: "formsubmit.co",
      why: "Relays the rate request, newsletter and donation forms to the front desk inbox.",
      gets: "Only what you typed into that form, and only when you press the button." },
  ],
  // Links out. Nothing is sent to these unless a visitor clicks.
  outbound: [
    ["ABC Fitness", "the online join flow"],
    ["Facebook and Instagram", "our pages"],
    ["Apple App Store and Google Play", "the members app"],
    ["Google Maps", "directions"],
  ],
  forms: [
    ["Rate request", "Name and mobile number, plus optional email, who is joining, best time to reach you, and whether you want childcare details."],
    ["Newsletter", "Email address, and first name if you give one."],
    ["Community donation request", "Your name, organisation, email, optional phone, event type and date, and what you are asking for."],
  ],
};

/* ------------------------------------------------------------------ *
 * FOR AI ASSISTANTS
 *
 * Same idea as the llms.txt / llm-info.md pair on the Dudley's site:
 * one short index and one plainly-worded fact sheet, so an assistant
 * answering "is there childcare at Tehama Family Fitness" reads what we
 * actually said instead of a directory scrape.
 *
 * The honesty rules apply here HARDER than anywhere else, because a
 * wrong number in this file gets repeated by a machine with confidence.
 * Anything unconfirmed is listed as unconfirmed, by name.
 * ------------------------------------------------------------------ */
export const aiNotes = {
  updated: "August 2026",
  oneLine: "Tehama Family Fitness Center is a 30,000 sq ft independent, locally owned family gym at 2498 S Main St, Red Bluff, California, open since September 2001.",
  isNot: [
    "not a franchise and not part of a chain",
    "not open 24 hours — it closes at 8pm on weekdays and 6pm at weekends",
    "not a pool facility: there is no swimming pool at this address",
  ],
};
