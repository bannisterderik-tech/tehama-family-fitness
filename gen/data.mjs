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
  trainerize:       { v: null, ask: null,                            q: "Promote the Trainerize app?" },
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
 * `page: true` means it earns a URL (people type the name). The rest are
 * rows on /classes/, because a page nobody searches for is a thin page.
 * ------------------------------------------------------------------ */
export const classes = [
  { slug: "spin", hero: "spin", hero2: "cardio", name: "Spin", page: true, room: "Spin Room",
    blurb: "Indoor cycling in the dedicated spin room. Ten sessions a week, most of them before 9 AM.",
    what: "Stationary bikes, an instructor calling climbs and sprints, and a clock. You set your own resistance, so the same class works for a first-timer and a racer.",
    bring: "Water and a towel. Shoes clip in or strap on — the desk will show you." },
  { slug: "yoga", hero: "yoga", hero2: "reformer", name: "Yoga", page: true, room: "Yoga/Pilates/Dance Studio",
    blurb: "Four sessions a week, including an easy-flow evening class.",
    what: "Mat work, breathing, and held postures in the studio. Yoga Easy Flow on Thursday evening is the slower of the two.",
    bring: "A mat if you have one; the studio has them if you don't." },
  { slug: "barre", hero: "barre", hero2: "studio", name: "Barre Above", page: true, room: "Studio",
    blurb: "Small, precise movements at the barre — legs, seat, core.",
    what: "Ballet-derived positions held and pulsed, usually with light weights and a band. Low impact, high burn.",
    bring: "Grip socks if you have them." },
  { slug: "zumba", hero: "studio", hero2: "barre", name: "Zumba & Tone", page: true, room: "Studio",
    blurb: "Latin-dance cardio with a toning block. Four mornings a week with Tonnie.",
    what: "Choreographed dance cardio — follow along, nobody's watching you. The tone half adds light weights.",
    bring: "Shoes that pivot. Water." },
  { slug: "pilates", hero: "yoga", hero2: "reformer", name: "Mat Pilates", page: true, room: "Studio",
    blurb: "Core and control on the mat, three mornings a week with Jami.",
    what: "Slow, exact movement from the centre. We also have a Pilates Reformer out on the floor.",
    bring: "A mat, or use the studio's." },
  { slug: "tai-chi", hero: "studio", hero2: "stretch", name: "Tai Chi", page: true, room: "Studio",
    blurb: "Every weekday morning at 7:15 with Kevin. Five days a week, no exceptions.",
    what: "Slow weight-shifting forms, standing the whole time. Easy on joints, hard on balance — which is the point.",
    bring: "Flat shoes. Nothing else." },
  { slug: null, name: "Tone Zone", room: "Studio", blurb: "Full-body toning with weights." },
  { slug: null, name: "Body Burner", room: "Studio", blurb: "Conditioning circuit, early or late." },
  { slug: null, name: "Lean & Mean", room: "Studio", blurb: "Mid-morning strength-and-cardio mix." },
  { slug: null, name: "Hybrid", room: "Studio", blurb: "5:30 AM strength-and-cardio combo, Tue/Thu." },
  { slug: null, name: "U-Jam", room: "Studio", blurb: "Dance-fitness, hip-hop and world beats." },
  { slug: null, name: "Cardio Circuit", room: "Circuit Training Room", blurb: "Stations, rotating, on the clock." },
  { slug: null, name: "Stretch & Mobility", room: "Studio", blurb: "Range-of-motion work with Tami." },
  { slug: null, name: "Drums Alive", room: "Studio", blurb: "Drumsticks, stability balls, cardio. Three mornings." },
  { slug: null, name: "Kettlebell", room: "Freeweight Room", blurb: "Swings, cleans, carries." },
  { slug: null, name: "Spin/Tone", room: "Spin Room", blurb: "Half the class on the bike, half off it." },
  { slug: null, name: "SilverSneakers Classic", room: "Studio", blurb: "Standing and seated strength for older adults." },
  { slug: null, name: "SilverSneakers Cardio Circuit", room: "Circuit Room", blurb: "Low-impact circuit for older adults." },
  { slug: null, name: "Yoga Easy Flow", room: "Studio", blurb: "The gentler evening yoga, Thursdays with Kathy." },
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
