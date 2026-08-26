// Tehama Family Fitness Center — static site generator.
//   node gen/build.mjs            → docs/ for a custom domain
//   BASE=/tehama node gen/build.mjs → docs/ for project Pages
//
// Design brief (PLAN.md §6): institutional, teal, legible from six feet. The reference is
// their printed schedule, not a boutique gym. Clean community rec. Do not Equinox it.
import { writeFileSync, readFileSync, mkdirSync, cpSync, readdirSync, statSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import {
  biz, tbd, has, val, askFor, sessions, DAYS, DAYNAME, mins, counts, childcareOpenAt,
  instructors, staff, classes, amenities, fuelBar, photos, onlyHere, owners, pickleball,
  CHILDCARE_WINDOWS, lengthOf, leadForm,
  joinFlow, retracted,
} from "./data.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const OUT = join(ROOT, "docs");
const BASE = process.env.BASE ?? "";
// PREVIEW=1 builds a staging copy: search engines are told to stay out and the
// canonical points at the preview itself. This site carries facts the front desk
// has not confirmed yet (ownership, schedule, imagery) — it must not be indexed
// alongside, or instead of, the real business until they sign it off.
const PREVIEW = process.env.PREVIEW === "1";
const SITE = PREVIEW
  ? (process.env.PREVIEW_URL ?? "https://bannisterderik-tech.github.io/tehama-family-fitness")
  : "https://www.tehamafamilyfitness.com";
// Ownership is sourced to published interviews, not to the club's own site — so it is
// attributed inline and can be switched off in one place with NAMES=0 until the family
// signs off on how they want to be named.
const NAMES = process.env.NAMES !== "0";

const u = p => (p === "/" ? (BASE || "/") : `${BASE}${p}`);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ------------------------------- tokens -------------------------------- */
// --teal / --deep sampled from their own graphics. --lime is the Kids Fit room wall,
// sampled from their own photograph and reserved for actions only.
const CSS = `
/* ── TFFC design system ───────────────────────────────────────────────
   Logo mark (the ink and the action — never a film over photographs):
     #182880  royal navy      (the figure in the mark, ~10% of it, sat .81)
     #B8D0E0  pale ice blue   (the disc, ~20% — the mark's largest area)
     #88A8C8  mid steel blue  (~15%)
     #101830  near-black navy (~6%)
   The action colour #2A44CC is that same royal navy raised in value until it
   clears AA on white (7.5:1) — the mark's own blue, not a new one.
   Valley gold is the dry grass at the kerb in assets/hero/exterior.jpg
   (sunlit #BA803D, laid as a paper #EAD9C5). A warm neutral, not a third
   brand hue — used only where the valley/refuge argument is the point.
   Type: Archivo 900 on one statement per page, capped at 5.5rem.
   Instrument Serif italic: temperature line, the Karla sentence, captions.
   Source Sans 3 for reading.
   ──────────────────────────────────────────────────────────────────── */
:root{
--void:#080E20; --ground:#101830; --ground-2:#18234A; --ground-3:#233064;
--navy:#182880; --navy-lt:#22368F;
--volt:#2A44CC; --volt-lt:#7B93F4; --volt-dk:#1B2E9E;
--ice:#B8D0E0; --steel:#88A8C8;
--grass:#EAD9C5; --grass-2:#F3E8D8; --grass-ink:#734E21;
--ink:#101830; --ink-2:#48527A; --ink-3:#69739B;
--paper:#FFFFFF; --paper-2:#F5F7FC; --paper-3:#E8ECF6;
--line:#DAE0EE; --line-2:#BDC6DC;
--warn:#8A4B00; --warn-bg:#FFF6E8;
--disp:'Bricolage Grotesque','Archivo',system-ui,-apple-system,sans-serif;
--ser:'Instrument Serif',Georgia,serif;
--body:'Source Sans 3',system-ui,-apple-system,sans-serif;
--wrap:1320px; --r:2px;
--ease:cubic-bezier(.16,.84,.44,1);
}
*{margin:0;padding:0;box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}
*{animation:none!important;transition:none!important}
.js .rv{opacity:1!important;transform:none!important}
.mq__t{animation:none!important}}
body{font-family:var(--body);font-size:18px;line-height:1.62;color:var(--ink);background:var(--paper);
-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{max-width:100%;display:block;height:auto}
a{color:var(--navy);text-underline-offset:3px}
a:hover{color:var(--volt)}
h1,h2,h3,h4{font-family:var(--disp);font-weight:800;line-height:.98;letter-spacing:-.045em;color:var(--ground)}
h1{font-size:clamp(2.4rem,6.4vw,5.5rem);font-weight:800;text-transform:uppercase;overflow-wrap:break-word;font-variation-settings:'opsz' 96}
h2{font-size:clamp(1.85rem,4.4vw,3.4rem);font-weight:800;text-transform:uppercase;letter-spacing:-.045em;overflow-wrap:break-word;hyphens:auto}
h3{font-size:clamp(1.15rem,1.8vw,1.45rem);font-weight:800;letter-spacing:-.025em;line-height:1.1}
h4{font-size:1rem;font-weight:700}
p{max-width:64ch}
.wrap{max-width:var(--wrap);margin:0 auto;padding:0 clamp(20px,4.5vw,52px)}
.narrow{max-width:820px}
:focus-visible{outline:3px solid var(--volt);outline-offset:3px}
.skip{position:absolute;left:-9999px;top:0;background:var(--volt);color:#fff;padding:12px 18px;z-index:200}
.skip:focus{left:0}
.js .rv{opacity:0;transform:translateY(18px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
/* staggered entrance for the first screen — fires once, on load */
.js .hero .kick,.js .hero h1,.js .hero .lede,.js .hero .acts,.js .hero .under{
opacity:0;transform:translateY(20px);animation:heroIn .9s var(--ease) forwards}
.js .hero .kick{animation-delay:.05s}
.js .hero h1{animation-delay:.16s}
.js .hero .lede{animation-delay:.30s}
.js .hero .acts{animation-delay:.42s}
.js .hero .under{animation-delay:.52s}
@keyframes heroIn{to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.js .hero .kick,.js .hero h1,.js .hero .lede,
.js .hero .acts,.js .hero .under{opacity:1;transform:none;animation:none}}
.js .rv.in{opacity:1;transform:none}
.ser{font-family:var(--ser);font-style:italic;font-weight:400;letter-spacing:-.01em}

/* ── header ── */
.top{background:var(--void);color:var(--steel);font-size:.78rem;letter-spacing:.04em}
.top .wrap{display:flex;flex-wrap:wrap;gap:4px 20px;align-items:center;justify-content:center;padding:9px 0;text-align:center}
.top a{color:#fff;font-weight:700;text-decoration:none}
.top a:hover{color:var(--volt-lt)}
.top .dot{color:var(--ground-3)}
@media(max-width:640px){.top .dot{display:none}.top .wrap{gap:2px 16px}}
.hdr{position:sticky;top:0;z-index:60;background:rgba(255,255,255,.9);backdrop-filter:blur(18px) saturate(1.4);
border-bottom:1px solid var(--line);transition:background .3s,border-color .3s}
.hdr .wrap{display:flex;align-items:center;gap:22px;padding-top:12px;padding-bottom:12px}
.brand{display:flex;align-items:center;gap:13px;text-decoration:none;flex:0 0 auto}
.brand img{width:52px;height:auto}
.brand b{font-family:var(--disp);font-weight:800;font-size:1.02rem;line-height:.94;color:var(--ground);
letter-spacing:-.05em;display:block;text-transform:uppercase}
.brand span{display:block;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--volt);
font-weight:700;margin-top:6px}
.nav{margin-left:auto;display:flex;align-items:center;gap:clamp(6px,1.2vw,17px)}
.nav a{font-size:.85rem;font-weight:600;color:var(--ink-2);text-decoration:none;padding:8px 2px;
position:relative;white-space:nowrap}
.nav a::after{content:"";position:absolute;left:0;right:100%;bottom:2px;height:2px;background:var(--volt);
transition:right .32s var(--ease)}
.nav a:hover{color:var(--ground)}
.nav a:hover::after,.nav a.on::after{right:0}
.nav a.on{color:var(--ground);font-weight:700}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;font-family:var(--disp);font-weight:800;
font-size:.98rem;padding:15px 26px;border-radius:var(--r);text-decoration:none;border:2px solid transparent;
cursor:pointer;letter-spacing:-.015em;position:relative;overflow:hidden;
transition:transform .2s var(--ease),background .2s,color .2s,border-color .2s,box-shadow .2s}
.btn:hover{transform:translateY(-2px)}
.btn-volt{background:var(--volt);color:#fff;box-shadow:0 6px 22px -8px rgba(61,90,254,.8)}
.btn-volt:hover{background:var(--volt-dk);color:#fff;box-shadow:0 12px 30px -8px rgba(61,90,254,.9)}
.btn-dark{background:var(--ground);color:#fff}
.btn-dark:hover{background:var(--navy);color:#fff}
.btn-out{background:transparent;color:var(--ground);border-color:var(--line-2)}
.btn-out:hover{border-color:var(--volt);color:var(--volt)}
.btn-ghost{background:transparent;color:#fff;border-color:rgba(180,204,216,.4)}
.btn-ghost:hover{background:#fff;color:var(--ground);border-color:#fff}
.btn-sm{padding:11px 17px;font-size:.87rem}
.hdr .btn{flex:0 0 auto}
.burger{display:none;margin-left:auto;background:none;border:1px solid var(--line-2);border-radius:var(--r);
width:50px;height:48px;position:relative;cursor:pointer}
.burger i,.burger i::before,.burger i::after{content:"";position:absolute;left:13px;right:13px;height:2px;
background:var(--ground);transition:.26s var(--ease)}
.burger i{top:23px}.burger i::before{top:-7px;left:0;right:0}.burger i::after{top:7px;left:0;right:0}
@media(max-width:1180px){
 .nav{display:none;position:fixed;inset:0;background:var(--void);flex-direction:column;align-items:stretch;
 gap:0;padding:96px clamp(20px,6vw,48px) 48px;overflow-y:auto;z-index:70}
 .nav.open{display:flex}
 .nav a{font-family:var(--disp);font-weight:800;font-size:clamp(1.8rem,7vw,2.4rem);letter-spacing:-.045em;
 padding:15px 0;border-bottom:1px solid rgba(180,204,216,.14);color:#fff;text-transform:uppercase}
 .nav a::after{display:none}
 .nav a.on{color:var(--volt-lt)}
 .nav .m-cta{display:flex;flex-direction:column;gap:12px;margin-top:32px;border:0}
 .nav .m-cta .btn{width:100%;font-size:1.1rem}
 .burger{display:block;z-index:80}
 body.menu-open{overflow:hidden}
 body.menu-open .hdr{backdrop-filter:none;-webkit-backdrop-filter:none;background:var(--void);border-color:transparent}
 body.menu-open .burger{border-color:rgba(255,255,255,.35)}
 body.menu-open .burger i{background:transparent}
 body.menu-open .burger i::before{top:0;transform:rotate(45deg);background:#fff}
 body.menu-open .burger i::after{top:0;transform:rotate(-45deg);background:#fff}
 .hdr .btn.d-only{display:none}
}
@media(min-width:1181px){.nav .m-cta{display:none}}

/* ── hero ── */
.hero{position:relative;background:var(--void);color:#fff;overflow:hidden;isolation:isolate;
min-height:min(92vh,880px);display:flex;align-items:flex-end}
@media(max-width:700px){.hero{min-height:auto}}
.hero-media{position:absolute;inset:0;z-index:0}
.hero-media img{width:100%;height:100%;object-fit:cover;object-position:center 62%;
filter:saturate(1.02) contrast(1.04)}
/* Gradient only, so type holds — the photograph keeps its own colour and light. */
.hero-media::before{content:"";position:absolute;inset:0;z-index:2;background:
linear-gradient(100deg,rgba(8,14,32,.93) 0%,rgba(8,14,32,.8) 30%,rgba(8,14,32,.34) 60%,rgba(8,14,32,.16) 100%),
linear-gradient(to top,rgba(8,14,32,.88) 0%,rgba(8,14,32,.3) 34%,transparent 62%)}
.hero .wrap{position:relative;z-index:3;padding-top:clamp(70px,12vw,150px);padding-bottom:clamp(46px,6vw,74px);width:100%}
.hero h1{color:#fff;max-width:13ch}
.kick{font-family:var(--disp);font-weight:700;font-size:.72rem;letter-spacing:.3em;text-transform:uppercase;
color:var(--volt-lt);margin-bottom:26px;display:flex;align-items:flex-start;gap:15px}
.kick::before{content:"";width:44px;height:2px;background:var(--volt);flex:0 0 auto;margin-top:.6em}
@media(max-width:520px){.kick{letter-spacing:.18em;gap:11px}.kick::before{width:24px}}
.hero .lede{font-size:clamp(1.05rem,1.55vw,1.28rem);color:#C9D3E4;margin-top:30px;max-width:48ch;line-height:1.58}
.hero .acts{display:flex;flex-wrap:wrap;gap:13px;margin-top:38px}
.hero .under{margin-top:26px;font-size:.92rem;color:var(--steel)}
.hero .under b{color:#fff}
.hero-sm{min-height:0;display:block}
.hero-sm .wrap{padding-top:clamp(56px,8vw,104px);padding-bottom:clamp(56px,8vw,104px)}
.hero-sm h1{font-size:clamp(2.2rem,5.6vw,4.6rem)}


/* ── kinetic marquee ── */
.mq{background:var(--volt);color:#fff;padding:clamp(16px,2vw,26px) 0;overflow:hidden;
border-top:1px solid rgba(255,255,255,.16);border-bottom:1px solid rgba(255,255,255,.16)}
.mq__t{display:flex;width:max-content;animation:mqs 44s linear infinite}
.mq:hover .mq__t{animation-play-state:paused}
.mq span{font-family:var(--disp);font-weight:800;font-size:clamp(1.5rem,3.4vw,2.9rem);letter-spacing:-.04em;
text-transform:uppercase;padding-right:clamp(26px,3vw,48px);white-space:nowrap;display:inline-flex;align-items:center;gap:clamp(26px,3vw,48px)}
.mq span::after{content:"";width:9px;height:9px;background:#fff;border-radius:50%;flex:0 0 auto}
@keyframes mqs{to{transform:translateX(-50%)}}
.mq-dark{background:var(--ground);color:#fff}

/* ── sections ── */
.sec{padding:clamp(40px,8.5vw,132px) 0;position:relative}
/* Two stacked sections used to put 128px of dead band between them on a phone,
   because the clamp floor never dropped below the desktop-ish 64px. */
.sec+.sec{padding-top:clamp(28px,8.5vw,132px)}
.sec:has(+.sec){padding-bottom:clamp(28px,8.5vw,132px)}
.sec-tint{background:var(--paper-2)}
.sec-dark{background:var(--ground);color:#B9C3DA}
.sec-void{background:var(--void);color:#B9C3DA}
.sec-cool{background:var(--ice);color:var(--ink)}
.sec-hot{background:var(--grass);color:var(--ink)}
.sec-dark h2,.sec-dark h3,.sec-dark h4,.sec-void h2,.sec-void h3,.sec-void h4{color:#fff}
.sec-cool h2,.sec-cool h3,.sec-cool h4,.sec-hot h2,.sec-hot h3,.sec-hot h4{color:var(--ground)}
.eyebrow{font-family:var(--disp);font-weight:700;font-size:.71rem;letter-spacing:.28em;text-transform:uppercase;
color:var(--volt);margin-bottom:22px;display:flex;align-items:flex-start;gap:14px}
.eyebrow::before{content:"";width:34px;height:2px;background:var(--volt);flex:0 0 auto;margin-top:.6em}
@media(max-width:520px){.eyebrow{letter-spacing:.16em;gap:10px}.eyebrow::before{width:22px}}
.sec-dark .eyebrow,.sec-void .eyebrow{color:var(--volt-lt)}
.sec-dark .eyebrow::before,.sec-void .eyebrow::before{background:var(--volt-lt)}
.sec-cool .eyebrow{color:var(--navy)}
.sec-cool .eyebrow::before{background:var(--navy)}
.sec-hot .eyebrow{color:var(--grass-ink)}
.sec-hot .eyebrow::before{background:var(--grass-ink)}
.lede{font-size:1.16rem;color:var(--ink-2);margin-top:20px;line-height:1.62}
.sec-dark .lede,.sec-void .lede{color:#A9B4CE}
.sec-cool .lede,.sec-hot .lede{color:var(--ink)}
.grid{display:grid;gap:clamp(16px,2.2vw,28px)}
.g2{grid-template-columns:repeat(auto-fit,minmax(320px,1fr))}
/* The room gallery: two-up on a phone. One-up stacked 25 full-width images
   into a column so tall it read as mostly blank space between captions. */
@media(max-width:700px){.gal{grid-template-columns:1fr 1fr;gap:14px 12px}
.gal figcaption{font-size:.78rem;line-height:1.35;padding-left:10px;margin-top:8px}
.gal figcaption b{font-size:.88rem!important;letter-spacing:-.01em!important}}
.g3{grid-template-columns:repeat(auto-fit,minmax(285px,1fr))}
.g4{grid-template-columns:repeat(auto-fit,minmax(215px,1fr))}
.split{display:grid;grid-template-columns:minmax(0,.88fr) minmax(0,1.12fr);gap:clamp(28px,5.5vw,90px);align-items:start}
@media(max-width:920px){.split{grid-template-columns:1fr}}

/* cards */
.card{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:clamp(24px,2.8vw,34px);
position:relative;overflow:hidden}
.card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--volt);
transform:scaleY(0);transform-origin:top;transition:transform .4s var(--ease)}
.card:hover::before{transform:scaleY(1)}
.card h3{margin-bottom:11px}
.card p{color:var(--ink-2);font-size:.98rem}
a.card{text-decoration:none;display:block;transition:border-color .3s var(--ease)}
a.card:hover{border-color:var(--volt)}
a.card .more{display:inline-flex;align-items:center;gap:8px;margin-top:18px;font-family:var(--disp);font-weight:800;
color:var(--volt);font-size:.9rem;letter-spacing:-.01em}
.sec-dark .card,.sec-void .card{background:rgba(255,255,255,.04);border-color:rgba(180,204,216,.14)}
.sec-dark .card p,.sec-void .card p{color:#A9B4CE}

/* editorial feature rows */
.feats{display:grid;gap:0;border-top:1px solid var(--line)}
.sec-dark .feats,.sec-void .feats{border-color:rgba(180,204,216,.18)}
.feat{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:clamp(18px,3.4vw,52px);align-items:baseline;
padding:clamp(24px,3.2vw,40px) 0;border-bottom:1px solid var(--line);text-decoration:none;
transition:padding .35s var(--ease),background .35s}
.sec-dark .feat,.sec-void .feat{border-color:rgba(180,204,216,.18)}
.feat:hover{padding-left:clamp(8px,1.4vw,20px)}
.feat .n{font-family:var(--ser);font-style:italic;font-size:1.15rem;color:var(--volt);min-width:2.2em}
.sec-dark .feat .n,.sec-void .feat .n{color:var(--volt-lt)}
.feat h3{font-size:clamp(1.5rem,3.6vw,2.7rem);font-weight:800;letter-spacing:-.045em;margin:0;text-transform:uppercase}
.sec-dark .feat h3,.sec-void .feat h3{color:#fff}
.feat p{color:var(--ink-2);font-size:1rem;margin-top:10px;max-width:52ch}
.sec-dark .feat p,.sec-void .feat p{color:#99A5C2}
.feat .arw{font-family:var(--disp);font-weight:800;color:var(--volt);opacity:.3;transition:.32s var(--ease);font-size:1.5rem}
.feat:hover .arw{opacity:1;transform:translateX(9px)}

/* architectural numbers */
.figs{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:0;border-top:2px solid var(--volt)}
.figs div{padding:clamp(28px,3.4vw,46px) clamp(18px,2vw,28px) clamp(24px,3vw,38px);
border-right:1px solid rgba(180,204,216,.16);border-bottom:1px solid rgba(180,204,216,.16)}
.figs div:last-child{border-right:0}
.figs b{display:block;font-family:var(--disp);font-weight:800;font-size:clamp(3.2rem,7.5vw,6.2rem);
color:#fff;line-height:.84;letter-spacing:-.06em;font-variant-numeric:tabular-nums}
.figs b.word{font-size:clamp(1.4rem,2.6vw,2.1rem);line-height:1.05;letter-spacing:-.035em;overflow-wrap:anywhere}
.figs span{display:block;font-family:var(--ser);font-style:italic;font-size:1.02rem;color:var(--steel);margin-top:18px}
.figs.on-light{border-top-color:var(--volt)}
.figs.on-light div{border-right-color:var(--line);border-bottom-color:var(--line)}
.figs.on-light b{color:var(--ground)}
.figs.on-light span{color:var(--ink-2)}
@media(max-width:620px){.figs div{border-right:0}}

/* ── tables ── */
.tw{overflow-x:auto;border:1px solid var(--line);border-radius:var(--r);background:#fff}
table{border-collapse:collapse;width:100%;font-size:.97rem}
caption{text-align:left;padding:20px 22px;font-family:var(--disp);font-weight:800;font-size:1.25rem;
letter-spacing:-.04em;text-transform:uppercase;color:var(--ground);border-bottom:2px solid var(--ground)}
caption .sub{font-family:var(--ser);font-style:italic;font-weight:400;text-transform:none;letter-spacing:0;
color:var(--ink-3);font-size:.95rem;margin-left:10px}
th{background:var(--ground);color:#fff;font-family:var(--disp);font-weight:700;text-align:left;padding:13px 20px;
font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap}
td{padding:14px 20px;border-top:1px solid var(--line);vertical-align:top}
tbody tr{transition:background .15s}
tbody tr:nth-child(even) td{background:var(--paper-2)}
tbody tr:hover td{background:#EEF1FF}
.t-time{font-variant-numeric:tabular-nums;font-weight:800;color:var(--ground);white-space:nowrap;font-family:var(--disp);letter-spacing:-.02em}
.tag{display:inline-block;font-size:.66rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
padding:4px 9px;border-radius:2px;white-space:nowrap;font-family:var(--disp)}
.tag-cc{background:#E4E9FF;color:var(--volt-dk)}
.tag-ph{background:var(--ice);color:var(--ground)}
.tag-no{background:var(--paper-3);color:var(--ink-3)}
.tag-open{background:var(--ground);color:#fff}
.tag-pb{background:#FFEFD8;color:var(--warn)}

/* Live dry-bulb from NWS Red Bluff (KRBL). Real number or the element never shows. */
.wx{display:inline-flex;align-items:baseline;gap:9px;text-decoration:none;color:var(--ice);
padding:2px 0;border-bottom:1px solid transparent;font-family:var(--ser);font-style:italic}
.wx:hover{border-color:var(--volt-lt)}
.wx b{font-family:var(--ser);font-style:italic;font-weight:400;font-size:1.18rem;letter-spacing:-.01em;color:#fff}
.wx span{color:var(--steel);font-style:italic}
@media(max-width:640px){.wx span{display:none}}

/* ── today strip ── */
.td-live{margin-top:20px;padding:14px 18px;border-left:3px solid var(--volt);
background:rgba(42,68,204,.06);color:var(--ink-2);font-size:1rem;max-width:44ch}
.td-live b{color:var(--ground)}
.td-list li.is-past{opacity:.42}
.td-list li.is-past .tag{opacity:.7}
.td-list li.is-now{background:var(--volt);margin:0 -14px;padding-left:14px;padding-right:14px;
border-top-color:rgba(255,255,255,.22);position:relative}
.td-list li.is-now-first{border-top-color:transparent;border-radius:var(--r) var(--r) 0 0;margin-top:4px}
.td-list li.is-now:not(:has(+ .is-now)){border-radius:0 0 var(--r) var(--r);margin-bottom:4px}
.td-list li.is-now-first:not(:has(+ .is-now)){border-radius:var(--r)}
.td-list li.is-now .td-t,.td-list li.is-now .td-n b{color:#fff}
.td-list li.is-now .td-n i{color:rgba(255,255,255,.8)}
.td-list li.is-now .tag{background:rgba(255,255,255,.2);color:#fff}
.td-list li.is-now-first::after{content:"On now";position:absolute;top:-9px;left:14px;
font-family:var(--disp);font-weight:800;font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;
background:var(--ground);color:#fff;padding:3px 8px;border-radius:2px}
.td-bar{display:grid!important;grid-template-columns:auto minmax(0,1fr);gap:12px;align-items:center;
padding:0!important;border:0!important;margin:10px 0}
.td-bar-t{font-family:var(--disp);font-weight:800;font-size:.68rem;letter-spacing:.06em;
color:var(--volt);font-variant-numeric:tabular-nums;white-space:nowrap}
.td-bar-l{height:2px;background:var(--volt);border-radius:2px;position:relative}
.td-bar-l::before{content:"";position:absolute;left:0;top:50%;width:7px;height:7px;border-radius:50%;
background:var(--volt);transform:translateY(-50%)}

.td-wrap{border-top:2px solid var(--volt)}
.td-h{font-family:var(--disp);font-weight:800;font-size:1.5rem;letter-spacing:-.04em;
text-transform:uppercase;color:var(--ground);padding:20px 0 14px}
.td-list{list-style:none;display:grid;gap:0}
.td-list li{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:16px;align-items:center;
padding:13px 0;border-top:1px solid var(--line)}
.td-t{font-family:var(--disp);font-weight:800;font-variant-numeric:tabular-nums;color:var(--ground);
font-size:.95rem;min-width:3.6em}
.td-n b{display:block;font-weight:700;color:var(--ground);letter-spacing:-.01em}
.td-n i{font-style:normal;font-size:.88rem;color:var(--ink-3)}
.td-none{padding:18px 0 4px;color:var(--ink-2)}
@media(max-width:560px){.td-list li{grid-template-columns:auto minmax(0,1fr)}.td-c{grid-column:2}}

/* ── comparison ── */
.cmp{overflow-x:auto}
.cmp table{min-width:640px}
.cmp td:first-child{font-weight:700;color:var(--ground)}
.cmp .yes{color:var(--volt);font-weight:800}
.cmp .no{color:var(--ink-3)}

/* ── rate request form ── */
.rf-form{grid-template-columns:1fr 1fr;display:grid;gap:18px 16px;align-content:start}
.rf-form>label,.rf-form>.rf-check,.rf-form>.rf-note,.rf-form>.rf-msg,.rf-form>button{grid-column:1/-1}
.rf-row{display:contents}
.rf-row>label{grid-column:auto}
@media(max-width:620px){.rf-form{grid-template-columns:1fr}.rf-row>label{grid-column:1/-1}}
.rf-opt{font-weight:400;letter-spacing:0;text-transform:none;color:var(--steel);opacity:.75}
.rf-form input.is-bad,.rf-form select.is-bad{border-color:#F0A428;background:rgba(240,164,40,.1)}
.rf-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.rf-msg{margin-top:4px;font-size:.98rem;padding:14px 16px;border-radius:var(--r);max-width:46ch}
.rf-msg.is-ok{background:rgba(184,208,224,.14);color:#fff;border-left:3px solid var(--volt-lt)}
.rf-msg.is-err{background:rgba(240,164,40,.14);color:#FFE0AE;border-left:3px solid #F0A428}
.rf-form button[disabled]{opacity:.55;cursor:default;transform:none}

.rf-form{display:grid;gap:18px;align-content:start}
.rf-form label{display:grid;gap:9px;align-content:start;font-family:var(--disp);font-weight:700;font-size:.76rem;
letter-spacing:.16em;text-transform:uppercase;color:var(--steel)}
.rf-form input[type=text],.rf-form input[type=tel],.rf-form input[type=email],.rf-form select{
font-family:var(--body);font-size:1.05rem;line-height:1.2;height:54px;padding:0 16px;
border-radius:var(--r);border:1px solid rgba(184,208,224,.28);background:rgba(255,255,255,.06);
color:#fff;width:100%;letter-spacing:0;text-transform:none;font-weight:400;
appearance:none;-webkit-appearance:none;box-sizing:border-box}
.rf-form select{background-image:linear-gradient(45deg,transparent 50%,var(--steel) 50%),linear-gradient(135deg,var(--steel) 50%,transparent 50%);
background-position:calc(100% - 21px) 25px,calc(100% - 15px) 25px;background-size:6px 6px,6px 6px;
background-repeat:no-repeat;padding-right:44px}
.rf-form option{color:#101830}
.rf-form input:focus,.rf-form select:focus{outline:2px solid var(--volt-lt);outline-offset:1px;background:rgba(255,255,255,.1)}
.rf-check{display:flex!important;flex-direction:row;align-items:center;gap:11px;
text-transform:none;letter-spacing:0;font-family:var(--body);font-weight:400;font-size:1rem;color:#C6D0E4}
.rf-check input{width:19px;height:19px;accent-color:var(--volt-lt);flex:0 0 auto}
.rf-form .btn{justify-self:start;margin-top:4px}
.rf-note{font-size:.9rem;color:var(--steel);max-width:44ch}
.rf-note a{color:#fff;font-weight:700}

/* ── rates ── */
.rates{border-top:2px solid var(--volt);padding-top:24px}
.rates-k{font-family:var(--disp);font-weight:700;font-size:.72rem;letter-spacing:.24em;
text-transform:uppercase;color:var(--ink-3);margin-bottom:18px}
.rates-l{list-style:none;display:grid;gap:0}
.rates-l li{font-family:var(--disp);font-weight:800;letter-spacing:-.03em;
font-size:clamp(1.15rem,2.2vw,1.6rem);color:var(--ground);padding:11px 0;border-bottom:1px solid var(--line)}
.rates-n{margin-top:24px;color:var(--ink-2);font-size:1rem}

.pvw{background:#F0A428;color:#3A2400;font-size:.82rem;letter-spacing:.01em}
.pvw span{display:block;max-width:var(--wrap);margin:0 auto;padding:9px clamp(20px,4.5vw,52px)}
.pvw b{font-family:var(--disp);font-weight:800;text-transform:uppercase;letter-spacing:.08em}

/* ── proof band ── */
.pf-h{max-width:14ch}
.pf-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:clamp(22px,3vw,44px)}
.pf-grid div{border-top:2px solid var(--volt);padding-top:20px}
.pf-grid b{display:block;font-family:var(--disp);font-weight:800;font-size:clamp(2.6rem,5.5vw,4.2rem);
line-height:.9;letter-spacing:-.05em;color:var(--ground)}
.pf-grid span{display:block;margin-top:14px;color:var(--ink-2);font-size:1rem;max-width:26ch}
.pf-note{margin-top:clamp(28px,3vw,42px);font-family:var(--ser);font-style:italic;
font-size:clamp(1.15rem,2.1vw,1.6rem);color:var(--ground);letter-spacing:-.015em}
.pf-note a{font-family:var(--body);font-style:normal;font-weight:700;font-size:.95rem;
display:inline-block;margin-left:10px;vertical-align:middle}
.ask-acts{display:flex;flex-wrap:wrap;gap:10px;position:relative}

/* hero film — decorative only; every claim it illustrates is also in the copy */
.hero-media video{width:100%;height:100%;object-fit:cover;object-position:center 60%;
filter:saturate(1.02) contrast(1.04);position:absolute;inset:0;opacity:0;transition:opacity 1.1s var(--ease)}
.hero-media video.up{opacity:1}
.vtoggle{position:absolute;right:clamp(16px,3vw,34px);bottom:clamp(16px,3vw,30px);z-index:5;
display:inline-flex;align-items:center;gap:9px;background:rgba(8,14,32,.55);backdrop-filter:blur(10px);
border:1px solid rgba(184,208,224,.32);color:#fff;border-radius:99px;padding:9px 16px;cursor:pointer;
font-family:var(--disp);font-weight:700;font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;transition:.22s var(--ease)}
.vtoggle:hover{background:rgba(8,14,32,.85);border-color:var(--volt)}
.vtoggle .d{width:7px;height:7px;border-radius:50%;background:var(--volt-lt);flex:0 0 auto}

/* ── atmosphere ── */
/* A very fine grain over dark grounds. Stops large navy fields reading as dead
   flat fill, the way ink sits on uncoated stock. */
.sec-dark,.sec-void,.band,.hero,.ftr{position:relative;isolation:isolate}
.sec-dark::before,.sec-void::before,.band::before,.ftr::before{
content:"";position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.16;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E")}
.sec-dark>*,.sec-void>*,.band>*,.ftr>*{position:relative;z-index:1}
/* a soft light source, so dark sections have a direction */
.sec-dark::after,.sec-void::after{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;
background:radial-gradient(120% 80% at 12% -10%,rgba(122,146,244,.16),transparent 60%),
radial-gradient(90% 70% at 100% 110%,rgba(24,40,128,.5),transparent 62%)}

/* ── body components ── */
.sp-grid{display:grid;grid-template-columns:minmax(0,1.06fr) minmax(0,1fr);gap:clamp(28px,5vw,72px);align-items:center}
.sp-flip .sp-grid{direction:rtl}
.sp-flip .sp-grid>*{direction:ltr}
.sp-img{margin:0;position:relative}
.sp-img img{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:var(--r)}
.sp-img::after{content:"";position:absolute;inset:0;border-radius:var(--r);
box-shadow:inset 0 0 0 1px rgba(16,24,48,.09)}
.sp-txt h2{margin-bottom:4px}
@media(max-width:880px){.sp-grid{grid-template-columns:1fr;gap:26px}
.sp-flip .sp-grid{direction:ltr}
.sp-img img{aspect-ratio:16/9}}

.fb{margin:0;position:relative;line-height:0}
.fb img{width:100%;height:clamp(230px,34vw,430px);object-fit:cover}
.fb-cap{position:absolute;left:0;right:0;bottom:0;padding:44px 0 20px;line-height:1.4;
background:linear-gradient(to top,rgba(8,14,32,.82),transparent);border:0;margin:0}
.fb-cap span{display:block;color:#fff;font-family:var(--ser);font-style:italic;
font-size:clamp(1rem,1.7vw,1.35rem);letter-spacing:-.01em;max-width:var(--wrap);margin:0 auto;
padding:0 clamp(20px,4.5vw,52px)}

.st{text-align:left}
.st-q{font-family:var(--disp);font-style:normal;font-weight:800;color:#fff;
font-size:clamp(1.7rem,4.2vw,3.2rem);line-height:1.12;letter-spacing:-.035em;max-width:22ch}
.st-sub{margin-top:clamp(16px,2.2vw,28px);color:var(--steel);font-size:1.06rem;max-width:52ch}
.sec-cool .st-q,.sec-hot .st-q{color:var(--ground)}
.sec-cool .st-sub,.sec-hot .st-sub{color:var(--ink)}
h2.said,.said{font-family:var(--ser);font-style:italic;font-weight:400;
font-size:clamp(1.8rem,4.4vw,3.4rem);line-height:1.15;letter-spacing:-.02em;color:#fff;max-width:16ch}

.steps{list-style:none;counter-reset:st;display:grid;gap:0;margin-top:34px;border-top:1px solid var(--line)}
.sec-dark .steps,.sec-void .steps{border-color:rgba(184,208,224,.2)}
.steps li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:clamp(18px,3vw,40px);
align-items:baseline;padding:clamp(20px,2.6vw,30px) 0;border-bottom:1px solid var(--line)}
.sec-dark .steps li,.sec-void .steps li{border-color:rgba(184,208,224,.2)}
.s-n{font-family:var(--ser);font-style:italic;font-size:1.2rem;color:var(--volt);min-width:2.1em}
.sec-dark .s-n,.sec-void .s-n{color:var(--volt-lt)}
.s-b b{display:block;font-family:var(--disp);font-weight:800;letter-spacing:-.03em;
font-size:clamp(1.1rem,1.9vw,1.4rem);color:var(--ground);margin-bottom:6px}
.sec-dark .s-b b,.sec-void .s-b b{color:#fff}
.s-b>span{color:var(--ink-2);font-size:1rem}
.sec-dark .s-b>span,.sec-void .s-b>span{color:#A6B2CE}

/* ── the weekly grid ── */
.wrap-wide{max-width:1680px;margin:0 auto;padding:0 clamp(14px,2.5vw,32px)}
.wg{display:grid;grid-template-columns:44px minmax(0,1fr);gap:10px;background:#fff;
border:1px solid var(--line);border-radius:var(--r);padding:16px 16px 20px;overflow:visible}
.wg-railbody{position:relative}
.wg-rail span{position:absolute;right:0;transform:translateY(-50%);font-family:var(--disp);
font-weight:700;font-size:.68rem;color:var(--ink-3);letter-spacing:.04em}
.wg-days{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:5px;position:relative;overflow:visible}
.wg-head{display:flex;align-items:baseline;justify-content:space-between;gap:5px;padding:0 2px 9px;
border-bottom:2px solid var(--ground);margin-bottom:6px}
.wg-head b{font-family:var(--disp);font-weight:800;font-size:.82rem;letter-spacing:-.02em;
text-transform:uppercase;color:var(--ground)}
.wg-head i{font-style:normal;font-family:var(--disp);font-weight:700;font-size:.68rem;color:var(--ink-3)}
.wg-col{position:relative;background:var(--paper-2);border-radius:2px}
.wg-day[data-day="Sun"] .wg-col{background:var(--grass)}
.wg-day.is-today .wg-head{border-bottom-color:var(--volt)}
.wg-day.is-today .wg-head b{color:var(--volt)}
.wg-day.is-today .wg-col{box-shadow:inset 0 0 0 1px var(--volt)}
.wg-sun{position:absolute;left:8px;right:8px;top:42%;margin:0;
font-family:var(--ser);font-style:italic;font-size:.78rem;line-height:1.3;color:var(--ground)}
.wg-now{position:absolute;left:0;right:0;height:1px;background:var(--steel);z-index:8;
pointer-events:none;margin:0;border:0}
.wg-now b{position:absolute;right:0;top:0;transform:translate(0,-50%);
font-family:var(--disp);font-weight:800;font-size:.68rem;letter-spacing:.06em;
color:var(--ground);background:var(--ice);padding:2px 7px;white-space:nowrap}
.wg-s.parent::before{content:"";position:absolute;top:4px;right:4px;width:6px;height:6px;
border-radius:50%;background:var(--ice);box-shadow:0 0 0 1px rgba(8,14,32,.28)}
.wg-line{position:absolute;left:0;right:0;height:1px;background:var(--line);opacity:.85}
.wg-cc{position:absolute;left:0;right:0;background:rgba(61,90,254,.075);
border-left:2px solid rgba(61,90,254,.3)}
.wg-s{position:absolute;border-radius:2px;padding:5px 6px;cursor:default;
display:flex;flex-direction:column;gap:2px;line-height:1.12;transition:transform .16s var(--ease),box-shadow .16s}
.wg-s:hover{transform:scale(1.035);z-index:6;box-shadow:0 10px 24px -10px rgba(10,13,30,.5)}
.wg-s.dim{opacity:.13;filter:grayscale(1);pointer-events:none}
/* a session that continues past the end of the grid — fade the cut edge so it
   reads as "keeps going", not "stops at 8" */
.wg-s.runs-on{border-bottom-left-radius:0;border-bottom-right-radius:0;
-webkit-mask-image:linear-gradient(to bottom,#000 calc(100% - 22px),transparent);
mask-image:linear-gradient(to bottom,#000 calc(100% - 22px),transparent)}
.wg-s::after{content:attr(data-tip) " — " attr(data-when);position:absolute;left:50%;bottom:calc(100% + 8px);
transform:translate(-50%,4px);background:var(--void);color:#fff;font-family:var(--body);font-size:.78rem;
font-weight:600;line-height:1.3;letter-spacing:0;padding:9px 12px;border-radius:3px;white-space:nowrap;
pointer-events:none;opacity:0;transition:opacity .16s var(--ease),transform .16s var(--ease);
box-shadow:0 10px 28px -10px rgba(6,7,15,.85);z-index:20;max-width:none}
.wg-s:hover::after,.wg-s:focus::after,.wg-s:focus-visible::after{opacity:1;transform:translate(-50%,0)}
.wg-day:first-child .wg-s::after{left:0;transform:translate(0,4px)}
.wg-day:first-child .wg-s:hover::after,.wg-day:first-child .wg-s:focus::after{transform:translate(0,0)}
.wg-day:nth-last-child(-n+2) .wg-s::after{left:auto;right:0;transform:translate(0,4px)}
.wg-day:nth-last-child(-n+2) .wg-s:hover::after,.wg-day:nth-last-child(-n+2) .wg-s:focus::after{transform:translate(0,0)}
.wg-s:first-child::after{bottom:auto;top:calc(100% + 8px)}
.wg-s b,.wg-s span{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.wg-s b{font-family:var(--disp);font-weight:800;font-size:.68rem;letter-spacing:-.015em}
.wg-s span{font-size:.6rem;opacity:.82;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.wg-s.sm b{font-size:.63rem}.wg-s.sm span{display:none}
.k-class{background:var(--volt);color:#fff}
.k-open{background:var(--ground);color:#fff}
.k-pickleball{background:#F0A428;color:#3A2400}
.wg-key{display:flex;flex-wrap:wrap;gap:9px 22px;margin-top:18px;font-size:.84rem;color:var(--ink-2)}
.wg-key span{display:inline-flex;align-items:center;gap:8px}
.wg-key i{width:14px;height:14px;border-radius:2px;flex:0 0 auto}
.wg-key i.k-cc{background:rgba(61,90,254,.14);border-left:2px solid rgba(61,90,254,.45)}
.wg-key i.k-ph{background:var(--ice);border-radius:50%;width:8px;height:8px;box-shadow:0 0 0 1px rgba(8,14,32,.28)}
.wg-wrap{display:block}
.wg-tables{display:none}
@media(max-width:900px){.wg-wrap{display:none}.wg-tables{display:grid;gap:26px}}

/* ── callouts ── */
.note{background:var(--warn-bg);border-left:3px solid #E5A54B;padding:20px 24px;font-size:.96rem;color:#5C3B10}
.note b{color:#40290A}
.ask{background:var(--ground);color:#fff;border-radius:var(--r);padding:clamp(28px,3.4vw,42px);
position:relative;overflow:hidden}
.ask::after{content:"";position:absolute;right:-60px;top:-60px;width:240px;height:240px;border-radius:50%;
background:radial-gradient(circle,rgba(61,90,254,.42),transparent 68%)}
.ask b{display:block;font-family:var(--disp);font-weight:800;font-size:clamp(1.3rem,2.4vw,1.85rem);
letter-spacing:-.04em;text-transform:uppercase;color:#fff;margin-bottom:14px;position:relative}
.ask p{color:#A9B4CE;font-size:.99rem;margin-bottom:24px;position:relative}
.ask .btn{position:relative}
.quote{border-left:3px solid var(--volt);padding:6px 0 6px 30px;font-family:var(--ser);font-style:italic;
font-weight:400;font-size:clamp(1.6rem,3.6vw,2.7rem);line-height:1.2;letter-spacing:-.02em;color:var(--ground);max-width:22ch}
.sec-dark .quote,.sec-void .quote{color:#fff}
.list{list-style:none;display:grid;gap:15px;margin-top:24px}
.list li{padding-left:32px;position:relative;color:var(--ink-2)}
.list li::before{content:"";position:absolute;left:0;top:.62em;width:16px;height:2px;background:var(--volt)}
.sec-dark .list li,.sec-void .list li{color:#A9B4CE}
.chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}
.chip{background:#fff;border:1px solid var(--line);border-radius:2px;padding:9px 16px;font-size:.9rem;
color:var(--ink-2);transition:.22s var(--ease)}
.chip:hover{border-color:var(--volt);color:var(--volt)}
.hold{background:var(--paper-2);border:1px dashed var(--line-2);border-radius:var(--r);padding:38px 26px;
text-align:center;color:var(--ink-3);font-size:.9rem;display:flex;flex-direction:column;justify-content:center;min-height:160px}
.hold b{display:block;font-family:var(--disp);font-weight:800;color:var(--ink-2);margin-bottom:9px;
font-size:1rem;letter-spacing:-.025em;text-transform:uppercase}

/* cta band */
.band{background:var(--void);color:#fff;padding:clamp(38px,8vw,110px) 0;position:relative;overflow:hidden}
.band::after{content:"";position:absolute;inset:0;background:
radial-gradient(ellipse at 8% 6%,rgba(61,90,254,.34),transparent 52%),
radial-gradient(ellipse at 92% 96%,rgba(24,36,120,.6),transparent 56%)}
.band .wrap{position:relative;z-index:2}
.band h2{color:#fff;max-width:16ch}
.band p{color:#A9B4CE;margin-top:18px;font-size:1.12rem}
.band .acts{display:flex;flex-wrap:wrap;gap:13px;margin-top:34px}

figure{margin:0}
figure img{border-radius:var(--r)}
figcaption{font-family:var(--ser);font-style:italic;font-size:.95rem;color:var(--ink-3);margin-top:14px;
padding-left:16px;border-left:2px solid var(--line-2)}
.sec-dark figcaption,.sec-void figcaption{color:var(--steel);border-color:rgba(180,204,216,.28)}
.sec-cool figcaption,.sec-hot figcaption{color:var(--ink);border-color:rgba(16,24,48,.18)}
.sec-cool .steps,.sec-hot .steps{border-color:rgba(16,24,48,.14)}
.sec-cool .steps li,.sec-hot .steps li{border-color:rgba(16,24,48,.14)}
.sec-cool .s-n,.sec-hot .s-n{color:var(--navy)}
.sec-cool .s-b b,.sec-hot .s-b b{color:var(--ground)}
.sec-cool .s-b>span,.sec-hot .s-b>span{color:var(--ink)}
.sec-cool .feats,.sec-hot .feats{border-color:rgba(16,24,48,.16)}
.sec-cool .feat,.sec-hot .feat{border-color:rgba(16,24,48,.16)}
.sec-cool .feat h3,.sec-hot .feat h3{color:var(--ground)}
.sec-cool .feat p,.sec-hot .feat p{color:var(--ink)}
.sec-cool .list li,.sec-hot .list li{color:var(--ink)}

/* filters */
.filters{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:clamp(18px,3vw,30px)}
.filters button{font-family:var(--disp);font-weight:800;font-size:.85rem;padding:11px 20px;border-radius:2px;
border:1px solid var(--line-2);background:#fff;color:var(--ink-2);cursor:pointer;transition:.22s var(--ease);
letter-spacing:-.015em;text-transform:uppercase}
.filters button[aria-pressed="true"]{background:var(--volt);border-color:var(--volt);color:#fff}
.filters button:hover{border-color:var(--volt);color:var(--volt)}
.filters button[aria-pressed="true"]:hover{color:#fff}

/* footer */
.ftr{background:var(--void);color:var(--steel);padding:clamp(44px,7vw,104px) 0 32px;font-size:.95rem}
.ftr h4{color:#fff;font-size:.68rem;letter-spacing:.24em;text-transform:uppercase;margin-bottom:20px;font-weight:700}
.ftr a{color:var(--ice);text-decoration:none;transition:color .2s}
.ftr a:hover{color:var(--volt-lt)}
.ftr .cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:clamp(30px,3vw,52px)}
.ftr ul{list-style:none;display:grid;gap:11px}
.ftr .big{font-family:var(--disp);font-weight:800;font-size:1.7rem;color:#fff;letter-spacing:-.055em;
line-height:.95;display:block;text-transform:uppercase}
.ftr .bot{margin-top:clamp(30px,5vw,52px);padding-top:26px;border-top:1px solid rgba(180,204,216,.14);display:flex;
flex-wrap:wrap;gap:10px 28px;justify-content:space-between;font-size:.83rem;color:#7C87A8}
.ftr .honest{border-left:3px solid var(--volt);padding:18px 0 18px 26px;margin-top:clamp(30px,5vw,52px);color:#C9D3E4;
font-family:var(--ser);font-style:italic;font-size:clamp(1.15rem,2vw,1.5rem);letter-spacing:-.015em;max-width:52ch;line-height:1.35}
`;



/* ------------------------------- nav ----------------------------------- */
const NAV = [
  ["/schedule/", "Schedule"], ["/classes/", "Classes"], ["/amenities/", "The Building"],
  ["/pickleball/", "Pickleball"], ["/childcare/", "Childcare"], ["/fuel-bar/", "Fuel Bar"],
  ["/membership/", "Membership"], ["/about/", "About"], ["/contact/", "Contact"],
];

const jsonld = page => {
  const base = {
    "@context": "https://schema.org", "@type": ["HealthClub", "LocalBusiness"],
    name: biz.name, url: "https://www.tehamafamilyfitness.com/", telephone: biz.phone,
    email: biz.email, foundingDate: "2001",
    address: { "@type": "PostalAddress", streetAddress: biz.street, addressLocality: biz.city,
      addressRegion: biz.state, postalCode: biz.zip, addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: biz.geo.lat, longitude: biz.geo.lng },
    openingHoursSpecification: biz.hours.map(([d, o, c]) => ({
      "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${d}`,
      opens: to24(o), closes: to24(c) })),
    amenityFeature: amenities.map(a => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
    sameAs: [biz.facebook, biz.instagram],
  };
  return `<script type="application/ld+json">${JSON.stringify(page ? { ...base, ...page } : base)}</script>`;
};
function to24(t) { const m = mins(t); return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; }

/* ------------------------------ layout --------------------------------- */
const layout = ({ path, title, desc, body, og, schema }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${path}">
${PREVIEW ? '<meta name="robots" content="noindex,nofollow">' : ""}
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${SITE}${u(og || "/assets/exterior-pano.jpg")}">
<meta name="theme-color" content="#0A0D1E">
<link rel="icon" href="${u("/assets/logo.png")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Instrument+Serif:ital@0;1&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
<script>document.documentElement.className+=' js'</script>
<style>${CSS}</style>
${jsonld(schema)}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${PREVIEW ? `<div class="pvw"><span class="wrap"><b>Preview</b> \u2014 work in progress for
Tehama Family Fitness Center. Rates, schedule and some photography are still being confirmed with
the front desk. Not the live site.</span></div>` : ""}
<div class="top"><div class="wrap">
  <a class="wx" id="wx" href="${u("/amenities/")}" hidden><b id="wxT"></b><span>in Red&nbsp;Bluff. It is climate controlled in here.</span></a>
  <span>Open today ${todayHours()}</span><span class="dot">·</span>
  <a href="tel:${biz.tel}">${biz.phone}</a><span class="dot">·</span>
  <span>${biz.street}, ${biz.city}</span>
</div></div>
<header class="hdr"><div class="wrap">
  <a class="brand" href="${u("/")}">
    <img src="${u("/assets/logo.png")}" alt="" width="46" height="45">
    <span><b>Tehama Family Fitness</b><span>Red&nbsp;Bluff · since 2001</span></span>
  </a>
  <nav class="nav" id="nav" aria-label="Main">
    ${NAV.map(([h, l]) => `<a href="${u(h)}"${path === h ? ' class="on" aria-current="page"' : ""}>${l}</a>`).join("")}
    <div class="m-cta">
      <a class="btn btn-volt" href="tel:${biz.tel}">Call ${biz.phone}</a>
      <a class="btn btn-out" href="${u("/day-pass/")}">Come see the building</a>
    </div>
  </nav>
  <a class="btn btn-volt btn-sm d-only" href="tel:${biz.tel}">Call ${biz.phone}</a>
  <button class="burger" id="burger" aria-label="Menu" aria-expanded="false" aria-controls="nav"><i></i></button>
</div></header>
<main id="main">
${body}
</main>
<footer class="ftr"><div class="wrap">
  <div class="cols">
    <div>
      <span class="big">Tehama Family&nbsp;Fitness</span>
      <p style="margin-top:10px">${biz.street}<br>${biz.city}, ${biz.state} ${biz.zip}</p>
      <p style="margin-top:10px"><a href="tel:${biz.tel}"><b>${biz.phone}</b></a><br>
      <a href="mailto:${biz.email}">${biz.email}</a></p>
      <p style="margin-top:10px"><a href="${biz.facebook}">Facebook</a> · <a href="${biz.instagram}">Instagram</a></p>
    </div>
    <div><h4>Hours</h4><ul>
      <li>Mon–Fri &nbsp;5:00a – 8:00p</li><li>Sat–Sun &nbsp;8:00a – 6:00p</li></ul>
      <h4 style="margin-top:22px">Childcare</h4><ul>
      <li>Mon–Thu &nbsp;8a–1p, 4p–8p</li><li>Fri–Sat &nbsp;8a–1p</li><li>Sun &nbsp;closed</li></ul>
    </div>
    <div><h4>Get moving</h4><ul>
      <li><a href="${u("/schedule/")}">Class schedule</a></li>
      <li><a href="${u("/classes/")}">All classes</a></li>
      <li><a href="${u("/instructors/")}">Instructors</a></li>
      <li><a href="${u("/silversneakers/")}">SilverSneakers</a></li>
      <li><a href="${u("/personal-training/")}">Personal training</a></li>
      <li><a href="${u("/corporate-wellness/")}">Corporate wellness</a></li>
    </ul></div>
    <div><h4>The building</h4><ul>
      <li><a href="${u("/basketball/")}">Basketball &amp; racquetball</a></li>
      <li><a href="${u("/pickleball/")}">Pickleball</a></li>
      <li><a href="${u("/strength-floor/")}">Strength floor</a></li>
      <li><a href="${u("/womens-weight-room/")}">Women's weight room</a></li>
      <li><a href="${u("/childcare/")}">Childcare</a></li>
      <li><a href="${u("/fuel-bar/")}">Fuel Bar</a></li>
      <li><a href="${u("/amenities/")}">Everything else</a></li>
    </ul></div>
    <div><h4>Join</h4><ul>
      <li><a href="${u("/membership/")}">Membership</a></li>
      <li><a href="${u("/day-pass/")}">Day pass &amp; drop-in</a></li>
      <li><a href="${u("/tour/")}">Take the tour</a></li>
      <li><a href="${u("/faq/")}">FAQ</a></li>
      <li><a href="${u("/gym-red-bluff/")}">Gyms in Red Bluff</a></li>
      <li><a href="${u("/about/")}">About us</a></li>
    </ul></div>
  </div>
  <p class="honest">Mon&ndash;Fri 5a&ndash;8p &middot; Sat&ndash;Sun 8a&ndash;6p &middot; Childcare from 8.</p>
  <div class="bot">
    <span>© ${new Date().getFullYear()} ${biz.name} · Locally owned in Red Bluff since 2001</span>
    <span>${biz.sqft} sq ft · Tehama County</span>
  </div>
</div></footer>
<script>

/* The valley is the argument. Pull the real reading; if it fails, show nothing —
   never invent a temperature. */
(function(){
  var el=document.getElementById('wx'),t=document.getElementById('wxT'); if(!el) return;
  try{
    var c=sessionStorage.getItem('tffc_wx');
    if(c){ var o=JSON.parse(c); if(Date.now()-o.at<1800000){ t.textContent=o.f+'\u00b0'; el.hidden=false; return; } }
  }catch(e){}
  fetch('https://api.weather.gov/stations/KRBL/observations/latest',{headers:{'Accept':'application/geo+json'}})
    .then(function(r){ return r.ok?r.json():null; })
    .then(function(j){
      var v=j&&j.properties&&j.properties.temperature&&j.properties.temperature.value;
      if(v===null||v===undefined||isNaN(v)) return;
      var f=Math.round(v*9/5+32);
      t.textContent=f+'\u00b0'; el.hidden=false;
      try{ sessionStorage.setItem('tffc_wx',JSON.stringify({f:f,at:Date.now()})); }catch(e){}
    }).catch(function(){});
})();
/* Hero film. Decorative, muted, never autoplays on a data-saver, reduced-motion
   or small screen. The poster is the frame the film opens on, so the swap is invisible. */
(function(){
var v=document.getElementById('hv'),t=document.getElementById('vt'),l=document.getElementById('vtl');
if(!v||!t)return;
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,
    small=matchMedia('(max-width:700px)').matches,
    src=small?'${u("/assets/video/tour-720.mp4")}':'${u("/assets/video/tour-1280.mp4")}',
    loaded=false,playing=false;
function load(cb){ if(loaded){cb&&cb();return;} loaded=true;
  v.src=src; v.loop=true; v.load();
  v.addEventListener('canplay',function(){cb&&cb()},{once:true}); }
function play(){ load(function(){ v.play().then(function(){
    v.classList.add('up');playing=true;l.textContent='Pause the film';
  }).catch(function(){ l.textContent='Play the film'; }); }); }
function pause(){ v.pause();v.classList.remove('up');playing=false;l.textContent='Play the film'; }
t.hidden=false;
t.addEventListener('click',function(){ playing?pause():play(); });
if('IntersectionObserver' in window){
  new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting&&playing){v.pause();} else if(e.isIntersecting&&playing){v.play().catch(function(){});}
  })},{threshold:0.15}).observe(v);
}
function slowNow(){var k=navigator.connection||{};
  return k.saveData===true||/^(slow-)?2g$/.test(k.effectiveType||'');}
function maybeAuto(){ if(!reduce&&!small&&!slowNow()){ play(); } }
if(document.readyState==='complete'){setTimeout(maybeAuto,120);}
else{addEventListener('load',function(){setTimeout(maybeAuto,120)});}
})();
/* Scroll reveals. The CSS has always had ".js .rv{opacity:0}" and
   ".js .rv.in{opacity:1}" — but nothing ever added .in, so every .rv block on
   every page rendered as a blank space exactly its own height. That was the
   "lots of blank space on mobile". Failsafe first, cleverness second: if
   anything at all goes wrong here, the content must end up visible. */
(function(){
  var rv=[].slice.call(document.querySelectorAll('.rv'));
  if(!rv.length) return;
  var show=function(e){e.classList.add('in');};
  var revealAll=function(){rv.forEach(show);};

  if(!('IntersectionObserver' in window)){revealAll();return;}

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){show(e.target);io.unobserve(e.target);} });
  },{rootMargin:'200px 0px',threshold:0.01});
  try{ rv.forEach(function(e){io.observe(e);}); }catch(err){ revealAll(); return; }

  // Belt and braces: nothing stays invisible for more than a few seconds,
  // whatever the observer does. Cheap, and it makes the failure mode "no
  // animation" rather than "no content".
  setTimeout(revealAll,4000);
  addEventListener('pageshow',function(ev){ if(ev.persisted) revealAll(); });
})();
(function(){var b=document.getElementById('burger'),n=document.getElementById('nav');
b.addEventListener('click',function(){var o=n.classList.toggle('open');
document.body.classList.toggle('menu-open',o);b.setAttribute('aria-expanded',o);});})();
</script>
</body></html>`;

function todayHours() {
  // Was printing both ranges every day, which is simply wrong on a weekend.
  const d = new Date().getDay();                       // 0 = Sunday
  const [, open, close] = biz.hours[(d + 6) % 7];      // biz.hours starts Monday
  return `${open.replace(":00", "").toLowerCase()}–${close.replace(":00", "").toLowerCase()}`;
}

/* --------------------------- shared blocks ----------------------------- */
const acts = (primary = true) => `<div class="acts">
  <a class="btn btn-volt" href="tel:${biz.tel}">Call ${biz.phone}</a>
  <a class="btn ${primary ? "btn-ghost" : "btn-out"}" href="${u("/day-pass/")}">Walk in — open till 8</a>
</div>`;

// Photographic page hero. Duotoned into the mark's navy so every page reads as
// one brand regardless of what the underlying photograph is doing.
/* ── responsive images ─────────────────────────────────────────────────
   Every generated still exists at 2000px and 800px (see gen/images.mjs).
   Before this, the 2000px file was served everywhere — including the tour
   grid, where it paints about 335px wide on a phone. That made a single
   page worth ~10 MB and every lazy image land late, which reads to a
   visitor as a screen full of blank space. `sizes` is what the browser
   actually needs; only the real photographs (which have no 800px twin)
   fall back to a plain src. */
const srcset = photo => {
  const small = photo.src.replace(/\.jpg$/, "-800.jpg");
  return photo.src.startsWith("/assets/hero/")
    ? ` srcset="${u(small)} 800w, ${u(photo.src)} 2000w"` : "";
};
const pimg = (photo, { sizes, alt = null, cls = "", eager = false, style = "" } = {}) =>
  `<img src="${u(photo.src)}"${srcset(photo)} sizes="${sizes}"` +
  ` alt="${alt === null ? esc(photo.alt) : alt}" width="${photo.w}" height="${photo.h}"` +
  (cls ? ` class="${cls}"` : "") +
  (eager ? ` fetchpriority="high"` : ` loading="lazy" decoding="async"`) +
  (style ? ` style="${style}"` : "") + `>`;

const phero = (photo, { kick, h1, lede, acts: a = true, sm = true } = {}) => `
<section class="hero${sm ? " hero-sm" : ""}">
  <div class="hero-media">${pimg(photo, { sizes: "100vw", alt: "", eager: true })}</div>
  <div class="wrap">
    ${kick ? `<p class="kick">${kick}</p>` : ""}
    <h1>${String(h1).replace(/<\/?em>/g, "")}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ""}
    ${a ? acts() : ""}
  </div>
</section>`;

/* ── body components ───────────────────────────────────────────────
   Built because the pages were leaning on one card grid for everything.
   These give a page an actual rhythm: image, statement, numbers, steps. */

// Alternating image / text spread. The workhorse for a page body.
const spread = (photo, { eyebrow, h2, body, list, cta, flip = false, dark = false, tone = "" } = {}) => `
<section class="sec ${dark ? "sec-dark" : tone ? "sec-" + tone : ""} sp${flip ? " sp-flip" : ""}"><div class="wrap">
  <div class="sp-grid">
    <figure class="sp-img rv">${pimg(photo, { sizes: "(max-width:880px) 92vw, min(50vw, 680px)" })}</figure>
    <div class="sp-txt">
      ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
      ${h2 ? `<h2>${h2}</h2>` : ""}
      ${body ? `<p class="lede">${body}</p>` : ""}
      ${list ? `<ul class="list">${list.map(i => `<li>${i}</li>`).join("")}</ul>` : ""}
      ${cta ? `<p style="margin-top:28px"><a class="btn btn-volt" href="${u(cta[0])}">${cta[1]}</a></p>` : ""}
    </div>
  </div>
</div></section>`;

// Edge-to-edge photographic rule between sections. Gives a page air.
const fullBleed = (photo, caption) => `
<figure class="fb">${pimg(photo, { sizes: "100vw" })}
${caption ? `<figcaption class="fb-cap"><span class="wrap">${caption}</span></figcaption>` : ""}</figure>`;

// A single sentence, given the room a single sentence deserves.
const statement = (text, sub, tone = "void") => `
<section class="sec sec-${tone} st"><div class="wrap">
  <p class="st-q rv">${text}</p>
  ${sub ? `<p class="st-sub">${sub}</p>` : ""}
</div></section>`;

// Reusable oversized numerals.
const numbers = (items, dark = true) => `
<div class="figs${dark ? "" : " on-light"}">
  ${items.map(([n, l, word]) => `<div class="rv"><b${word ? ' class="word"' : ""}>${n}</b><span>${l}</span></div>`).join("")}
</div>`;

// Numbered process rows — for anything sequential.
const steps = (items) => `
<ol class="steps">
  ${items.map(([t, d], i) => `<li class="rv"><span class="s-n">${String(i + 1).padStart(2, "0")}</span>
    <span class="s-b"><b>${t}</b><span>${d}</span></span></li>`).join("")}
</ol>`;

// The strongest number this business owns, and it was on one page out of 28.
const proof = () => `
<section class="sec sec-tint pf"><div class="wrap">
  <p class="eyebrow">What the town says</p>
  <h2 class="pf-h">Ask anyone<br>on South Main</h2>
  <div class="pf-grid" style="margin-top:clamp(30px,3.5vw,46px)">
    <div><b>${biz.social.fbRecommend}%</b><span>of ${biz.social.fbReviews} people on Facebook recommend this place</span></div>
    <div><b>${biz.social.fbFollowers}</b><span>followers in a town of about 14,000</span></div>
    <div><b>${new Date().getFullYear() - biz.founded}</b><span>years in the same building on South Main</span></div>
  </div>
  <p class="pf-note">That is not marketing. That is the neighbours.
  <a href="${biz.facebook}">Read the reviews \u2192</a></p>
</div></section>`;


// Grok round 3, kill-list #1 and #3: every CTA on the site was "call this number",
// and a large share of parents will not place a voice call to a gym. This is the
// one conversion mechanism the site was missing entirely.
const rateForm = () => `
<section class="sec sec-dark rf" id="rate"><div class="wrap">
  <div class="split">
    <div>
      <p class="eyebrow">One minute, no sales process</p>
      <h2>Get your rate</h2>
      <p class="lede">Leave your name and a number and we'll come back to you with what it costs
      for exactly who's joining. No queue, no pitch, no signing up for anything first.</p>
      <p class="lede" style="margin-top:20px"><b style="color:#fff">${staff.frontDesk}</b> is usually the
      one who answers.</p>
      <p class="lede" style="margin-top:20px">Would rather just ask?
      <a href="tel:${biz.tel}" style="color:#fff;font-weight:700">${biz.phone}</a></p>
    </div>

    <form class="rf-form" id="rateForm" novalidate
          ${leadForm.endpoint ? `action="${leadForm.endpoint}" method="post"` : ""}>
      <div class="rf-row">
        <label for="rfName">Your name <span aria-hidden="true">*</span>
          <input id="rfName" type="text" name="name" autocomplete="name" required
                 placeholder="Jen Alvarez"></label>
        <label for="rfPhone">Mobile number <span aria-hidden="true">*</span>
          <input id="rfPhone" type="tel" name="phone" autocomplete="tel" required
                 inputmode="tel" placeholder="530-555-0142"></label>
      </div>
      <label for="rfEmail">Email <span class="rf-opt">optional</span>
        <input id="rfEmail" type="email" name="email" autocomplete="email"
               placeholder="you@example.com"></label>
      <div class="rf-row">
        <label for="rfSize">Who's joining?
          <select id="rfSize" name="joining">
            <option>Just me</option><option>Two of us</option>
            <option>A family of 3&ndash;4</option><option>A family of 5+</option>
          </select></label>
        <label for="rfWhen">Best time to reach you
          <select id="rfWhen" name="best_time">
            <option>Any time today</option><option>This morning</option>
            <option>Early afternoon</option><option>After 4pm</option>
          </select></label>
      </div>
      <label class="rf-check"><input type="checkbox" name="childcare" value="yes">
        Send me the childcare details too &mdash; ages, sign-up, first visit</label>

      <!-- spam trap: real people never fill this in -->
      <div class="rf-hp" aria-hidden="true"><label>Leave this empty
        <input type="text" name="_honey" tabindex="-1" autocomplete="off"></label></div>
      <input type="hidden" name="_subject" value="${esc(leadForm.subject)}">
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="_template" value="table">

      <button type="submit" class="btn btn-volt" id="rfBtn">Send it &rarr;</button>
      <p class="rf-note" id="rfNote">We'll text or call you back the same day we're open.
      Your details go to the front desk and nowhere else.</p>
      <p class="rf-msg" id="rfMsg" role="status" aria-live="polite" hidden></p>
    </form>
  </div>
</div></section>
<script>
(function(){
  var f=document.getElementById('rateForm'); if(!f) return;
  var btn=document.getElementById('rfBtn'), msg=document.getElementById('rfMsg'),
      note=document.getElementById('rfNote');
  var ENDPOINT=${leadForm.endpoint ? `'${leadForm.endpoint}'` : 'null'};

  function say(text, ok){
    msg.hidden=false; msg.textContent=text;
    msg.className='rf-msg '+(ok?'is-ok':'is-err');
  }
  function invalid(){
    var bad=null;
    [['rfName','your name'],['rfPhone','a number we can reach you on']].forEach(function(pair){
      var el=document.getElementById(pair[0]);
      var empty=!el.value.trim();
      el.setAttribute('aria-invalid', empty?'true':'false');
      el.classList.toggle('is-bad', empty);
      if(empty && !bad) bad=pair;
    });
    return bad;
  }
  f.addEventListener('submit', function(e){
    e.preventDefault();
    if(f.querySelector('[name=_honey]').value) return;      // bot
    var bad=invalid();
    if(bad){ say('We just need '+bad[1]+'.', false); document.getElementById(bad[0]).focus(); return; }

    var d=new FormData(f); d.delete('_honey');
    btn.disabled=true; var label=btn.textContent; btn.textContent='Sending\u2026';

    if(!ENDPOINT){                                           // no endpoint configured yet
      var body='Name: '+d.get('name')+'\\nMobile: '+d.get('phone')+
        (d.get('email')?'\\nEmail: '+d.get('email'):'')+
        '\\nJoining: '+d.get('joining')+'\\nBest time: '+d.get('best_time')+
        (d.get('childcare')?'\\nAlso wants childcare details.':'');
      location.href='mailto:${leadForm.to}?subject='+encodeURIComponent('${leadForm.subject}')+
                    '&body='+encodeURIComponent(body);
      btn.disabled=false; btn.textContent=label; return;
    }

    fetch(ENDPOINT,{method:'POST',headers:{'Accept':'application/json'},body:d})
      .then(function(r){ return r.ok ? r.json().catch(function(){return{}}) : Promise.reject(r.status); })
      .then(function(){
        f.querySelectorAll('input,select,button').forEach(function(el){ el.disabled=true; });
        note.hidden=true;
        say("Thanks "+(d.get("name")||"").split(" ")[0]+". "+staffName+" will come back to you on "+
            d.get("phone")+". Rather not wait? The desk is on ${biz.phone}.", true);
      })
      .catch(function(){
        btn.disabled=false; btn.textContent=label;
        say("That did not send. Call the desk on ${biz.phone} and we will sort it in a minute.", false);
      });
  });
  var staffName='${staff.frontDesk}';
  ['rfName','rfPhone'].forEach(function(id){
    document.getElementById(id).addEventListener('input',function(){
      this.classList.remove('is-bad'); this.setAttribute('aria-invalid','false');
    });
  });
})();
</script>`;

const todayStrip = () => `
<section class="sec sec-tint" id="today"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">On the board today</p><h2>What's on<br>right now</h2>
      <p class="lede">Every session says whether the kids' room is open at that hour \u2014 which is
      usually the thing that decides whether you make it.</p>
      <p class="td-live" id="tdLive" hidden></p>
      <p style="margin-top:26px"><a class="btn btn-volt" href="${u("/schedule/")}">See the whole week \u2192</a></p></div>
    <div class="td-wrap">
      ${DAYS.map(d => {
        const rows = sorted(d);
        return `<div class="td-day" data-day="${d}" hidden>
          <p class="td-h">${DAYNAME[d]}</p>
          ${rows.length ? `<ol class="td-list">${rows.map(x => {
            const a = mins(x.time), b = a + lengthOf(x);
            return `<li data-start="${a}" data-end="${b}">
            <span class="td-t">${x.time.replace(":00", "").replace(" AM", "a").replace(" PM", "p")}</span>
            <span class="td-n"><b>${esc(x.name)}</b>${x.who ? `<i>${esc(x.who)}${
              owners.people.some(o => o.name.split(" ")[0] === x.who) && NAMES ? " \u00b7 owner" : ""}</i>` : ""}</span>
            <span class="td-c">${childcareOpenAt(d, x.time)
              ? '<span class="tag tag-cc">Kids open</span>' : '<span class="tag tag-no">Kids closed</span>'}</span>
          </li>`; }).join("")}</ol>`
          : `<p class="td-none">No classes today \u2014 the building is open ${d === "Sun" ? "8 to 6" : "as usual"}.
             The court, the weights and the cardio deck are all yours.</p>`}
        </div>`;
      }).join("")}
    </div>
  </div>
</div></section>
<script>
(function(){
  var KEY=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];
  var day=document.querySelector('.td-day[data-day="'+KEY+'"]')||document.querySelector('.td-day');
  if(!day) return;
  day.hidden=false;
  var list=day.querySelector('.td-list'), live=document.getElementById('tdLive');
  if(!list) return;
  var items=[].slice.call(list.children);

  // the moving marker
  var bar=document.createElement('li');
  bar.className='td-bar'; bar.setAttribute('aria-hidden','true');
  bar.innerHTML='<span class="td-bar-t"></span><span class="td-bar-l"></span>';

  function fmt(m){
    var h=Math.floor(m/60), mm=m%60, ap=h>=12?'p':'a', hh=h%12===0?12:h%12;
    return hh+(mm?':'+(mm<10?'0':'')+mm:'')+ap;
  }
  function tick(){
    var d=new Date(), now=d.getHours()*60+d.getMinutes();
    var running=null, next=null;
    items.forEach(function(li){
      var a=+li.dataset.start, b=+li.dataset.end;
      li.classList.remove('is-now','is-past','is-now-first');
      if(now>=b){ li.classList.add('is-past'); }
      else if(now>=a){ li.classList.add('is-now'); if(!running){ li.classList.add('is-now-first'); running=li; } }
      else if(!next){ next=li; }
    });
    // park the marker before whatever is up next; after the last one if the day is done
    bar.querySelector('.td-bar-t').textContent=fmt(now);
    if(running){ running.insertAdjacentElement('beforebegin',bar); }
    else if(next){ next.insertAdjacentElement('beforebegin',bar); }
    else { list.appendChild(bar); }

    if(live){
      live.hidden=false;
      if(running){
        var nm=running.querySelector('.td-n b').textContent;
        live.innerHTML='<b>On right now:</b> '+nm+', started '+fmt(+running.dataset.start)+'.';
      } else if(next){
        var nn=next.querySelector('.td-n b').textContent;
        live.innerHTML='<b>Up next:</b> '+nn+' at '+fmt(+next.dataset.start)+'.';
      } else {
        live.innerHTML='<b>That is the board for today.</b> The court and the weights are still open.';
      }
    }
  }
  tick();
  setInterval(tick, 60000);
})();
</script>`;

const marquee = (items, dark = false) => {
  const run = items.map(t => `<span>${t}</span>`).join("");
  return `<div class="mq${dark ? " mq-dark" : ""}" aria-hidden="true"><div class="mq__t">${run}${run}</div></div>`;
};

const band = (h, p, links) => `<section class="band"><div class="wrap">
  <h2>${h}</h2><p>${p}</p>
  <div class="acts">${links.map(([href, label, cls]) =>
    `<a class="btn ${cls || "btn-volt"}" href="${/^(tel:|mailto:|sms:|https?:|#)/.test(href) ? href : u(href)}">${label}</a>`).join("")}</div>
</div></section>`;

// Renders a confirmed value, or an honest ask. Never a made-up number.
const priceOrAsk = key => has(key)
  ? `<b>${val(key)}</b>`
  : `<span class="tag tag-open">${askFor(key) || "Call for the current rate"}</span>`;

const askBox = (title, key, extra = "", smsBody = "Hi \u2014 what are your membership rates?") => `<div class="ask">
  <b>${title}</b>
  <p>${extra || askFor(key) || "We'll give you the number over the phone today."}</p>
  <div class="ask-acts">
    <a class="btn btn-volt btn-sm" href="${biz.sms(smsBody)}">Text us \u2014 we'll send the number</a>
    <a class="btn btn-ghost btn-sm" href="tel:${biz.tel}">Or call ${biz.phone}</a>
  </div>
</div>`;

/* --------------------------- schedule blocks --------------------------- */
const sorted = d => sessions.filter(s => s.day === d).sort((a, b) => mins(a.time) - mins(b.time));

const kindTag = s => s.kind === "open" ? `<span class="tag tag-open">Open gym</span>`
  : s.kind === "pickleball" ? `<span class="tag tag-pb">Pickleball</span>` : "";

const ccTag = s => childcareOpenAt(s.day, s.time)
  ? `<span class="tag tag-ph">Parent hours</span>`
  : `<span class="tag tag-no">Kids closed</span>`;

const dayTable = (d, { childcare = true, notes = false } = {}) => {   // notes are internal only
  const rows = sorted(d);
  if (!rows.length) return `<div class="tw" data-day="${d}"><table><caption>${DAYNAME[d]}</caption>
    <tbody><tr class="empty"><td colspan="4" style="color:var(--ink-3)">No classes scheduled — but the building is open
    ${d === "Sun" ? "8:00 a.m. to 6:00 p.m." : ""}. Court, weights, cardio, all of it.</td></tr></tbody></table></div>`;
  return `<div class="tw" data-day="${d}"><table>
  <caption>${DAYNAME[d]} <span style="font-weight:400;color:var(--ink-3);font-size:.9rem">— ${rows.length} session${rows.length === 1 ? "" : "s"}</span></caption>
  <thead><tr><th scope="col">Time</th><th scope="col">Class</th><th scope="col">Instructor</th>${childcare ? '<th scope="col">Kids</th>' : ""}</tr></thead>
  <tbody>${rows.map(s => `<tr data-name="${esc(s.name.toLowerCase())}" data-who="${esc((s.who || "").toLowerCase())}"
    data-kind="${esc(s.kind)}" data-mins="${mins(s.time)}" data-cc="${childcareOpenAt(s.day, s.time) ? 1 : 0}">
    <td class="t-time">${s.time}</td>
    <td><b>${esc(s.name)}</b> ${kindTag(s)}${notes && s.note ? `<br><span style="font-size:.82rem;color:var(--warn)">⚑ ${esc(s.note)}</span>` : ""}</td>
    <td class="who">${s.who ? esc(s.who) : "—"}</td>
    ${childcare ? `<td>${ccTag(s)}</td>` : ""}</tr>`).join("")}
  </tbody></table></div>`;
};

/* ── The weekly grid ────────────────────────────────────────────────
   A real time-rail × day-column matrix: every session placed by when it
   actually starts and how long it runs, with the childcare windows drawn
   as bands behind the columns. Overlapping sessions are packed into
   side-by-side lanes, computed at build time. Falls back to the stacked
   day tables below 900px, where a 7-column grid stops being readable. */
const GRID_START = 5 * 60, GRID_END = 20 * 60;          // 5:00a – 8:00p
const PPM = 1.55;                                        // px per minute
const GRID_H = (GRID_END - GRID_START) * PPM;
const top = m => (m - GRID_START) * PPM;

// Pack overlapping sessions in a day into lanes so nothing sits on top of anything.
function lanes(day) {
  const list = sessions.filter(s => s.day === day)
    .map(s => ({ ...s, a: mins(s.time), b: mins(s.time) + lengthOf(s) }))
    .sort((x, y) => x.a - y.a || x.b - y.b);
  const out = [];
  let cluster = [], clusterEnd = -1;
  const flush = () => {
    if (!cluster.length) return;
    const ends = [];                                     // ends[i] = when lane i frees up
    for (const it of cluster) {
      let L = ends.findIndex(e => e <= it.a);
      if (L === -1) { L = ends.length; ends.push(0); }
      ends[L] = it.b; it.lane = L;
    }
    const n = ends.length;
    cluster.forEach(it => { it.of = n; });
    out.push(...cluster); cluster = []; clusterEnd = -1;
  };
  for (const it of list) {
    if (cluster.length && it.a >= clusterEnd) flush();
    cluster.push(it); clusterEnd = Math.max(clusterEnd, it.b);
  }
  flush();
  return out;
}

const HOURS = [];
for (let m = GRID_START; m <= GRID_END; m += 60) {
  const h = Math.floor(m / 60), ap = h >= 12 ? "p" : "a", hh = h % 12 === 0 ? 12 : h % 12;
  HOURS.push([m, `${hh}${ap}`]);
}

const weekGrid = () => `
<div class="wg" role="img" aria-label="Weekly schedule grid. The same ${counts.total} sessions are listed as tables below.">
  <div class="wg-rail" aria-hidden="true">
    <div class="wg-head" style="border-color:transparent"><b>&nbsp;</b></div>
    <div class="wg-railbody" style="height:${GRID_H}px">
      ${HOURS.map(([m, l]) => `<span style="top:${top(m)}px">${l}</span>`).join("")}
    </div>
  </div>
  <div class="wg-days">
    ${DAYS.map(d => {
      const items = lanes(d);
      const cc = (CHILDCARE_WINDOWS[d] || []);
      return `<div class="wg-day" data-day="${d}">
        <div class="wg-head"><b>${d}</b><i>${items.length || "—"}</i></div>
        <div class="wg-col" style="height:${GRID_H}px">
          ${cc.map(([a, b]) => `<div class="wg-cc" style="top:${top(a)}px;height:${(b - a) * PPM}px"></div>`).join("")}
          ${HOURS.map(([m]) => `<div class="wg-line" style="top:${top(m)}px"></div>`).join("")}
          ${d === "Sun" ? `<p class="wg-sun">Open. Nothing on the board. The court and the weights are still here.</p>` : ""}
          ${items.map(it => {
            const w = 100 / it.of, L = it.lane * w;
            const endsAfterGrid = it.b > GRID_END;
            const dur = Math.min(it.b, GRID_END) - it.a;
            const parent = childcareOpenAt(it.day, it.time);
            return `<div class="wg-s k-${it.kind}${dur < 50 ? " sm" : ""}${parent ? " parent" : ""}${endsAfterGrid ? " runs-on" : ""}"
              data-kind="${it.kind}" data-mins="${it.a}" data-cc="${parent ? 1 : 0}"
              style="top:${top(it.a)}px;height:${dur * PPM - 3}px;left:calc(${L}% + 2px);width:calc(${w}% - 4px)"
              tabindex="0"
              title="${esc(it.time)} ${esc(it.name)}${it.who ? " · " + esc(it.who) : ""}"
              data-tip="${esc(it.name)}${it.who ? " · " + esc(it.who) : ""}"
              data-when="${DAYNAME[it.day]} ${esc(it.time)}${endsAfterGrid ? " · runs past close" : ""} · ${parent ? "parent hours" : "kids closed"}">
              <b>${esc(it.name)}</b><span>${it.time.replace(":00", "").replace(" AM", "a").replace(" PM", "p")}${it.who ? ` · ${esc(it.who)}` : ""}</span>
            </div>`;
          }).join("")}
        </div></div>`;
    }).join("")}
    <div class="wg-now" hidden aria-hidden="true"><b></b></div>
  </div>
</div>
<div class="wg-key">
  <span><i class="k-class"></i>Class</span>
  <span><i class="k-open"></i>Basketball open gym</span>
  <span><i class="k-pickleball"></i>Pickleball</span>
  <span><i class="k-cc"></i>Kids' room open</span>
  <span><i class="k-ph"></i>Parent hours</span>
</div>`;

const provisionalNote = has("scheduleSignedOff") ? "" : `<div class="note" style="margin-bottom:26px">
  <b>Straight off our calendar.</b> Times occasionally move.
  <a href="tel:${biz.tel}">Call ${biz.phone}</a> if you are coming for one class in particular.</div>`;

/* ------------------------------- pages --------------------------------- */
const PAGES = [];
const P = (path, title, desc, body, extra = {}) => PAGES.push({ path, title, desc, body, ...extra });

/* ============================== HOME ================================== */
P("/", `${biz.name} — Gym in Red Bluff, CA`,
  `A 30,000 sq ft family gym on South Main in Red Bluff since 2001. Full basketball court, three indoor pickleball courts, racquetball, childcare, and ${counts.classes} classes a week.`,
  `
<section class="hero">
  <div class="hero-media" id="hm">
    ${pimg(photos.exterior, { sizes: "100vw", alt: "", eager: true })}
    <video id="hv" playsinline muted preload="none" aria-hidden="true" width="1470" height="630"></video>
  </div>

  <button class="vtoggle" id="vt" hidden><span class="d"></span><span id="vtl">Play the film</span></button>
  <div class="wrap">
    <p class="kick">The only courts in Red Bluff \u00b7 Childcare in the building</p>
    <h1>Courts. Classes.<br>Kids' room.<br>All <em>included.</em></h1>
    <p class="lede">${biz.sqft} sq ft on South Main since 2001. A full basketball court, three indoor
    pickleball courts, racquetball, childcare and ${counts.classes} classes a week. Planet Fitness has
    none of those.</p>
    <div class="acts">
      <a class="btn btn-volt" href="${u("/membership/")}#rate">Get your rate</a>
      <a class="btn btn-ghost" href="${u("/day-pass/")}">Walk in today \u2014 open till 8</a>
    </div>
    <p class="under">${NAMES ? "Karla Stroman, an owner, teaches the 6:00 AM spin. <b>" + staff.frontDesk + "</b> is at the desk." : "<b>" + staff.frontDesk + "</b> is at the desk."} No sales process.</p>
  </div>
</section>


<section class="sec sec-dark"><div class="wrap">
  <div class="split">
    <div>
      <p class="eyebrow">The part nobody knows</p>
      <h2>More is going on here than the sign lets on</h2>
    </div>
    <div>
      <p class="lede">${counts.total} sessions a week \u2014 ${counts.classes} classes,
      ${counts.basketball} basketball open-gym blocks and ${counts.pickleball} pickleball sessions, across
      15 instructors. Every one of them included with your membership.</p>
    </div>
  </div>
  <div class="figs" style="margin-top:clamp(44px,5vw,76px)">
    <div class="rv"><b>${counts.total}</b><span>sessions a week</span></div>
    <div class="rv"><b>15</b><span>instructors</span></div>
    <div class="rv"><b>3</b><span>pickleball courts</span></div>
    <div class="rv"><b>${biz.sqft}</b><span>square feet</span></div>
  </div>
</div></section>

${rateForm()}

${todayStrip()}

<section class="sec"><div class="wrap">
  <p class="eyebrow">One building</p>
  <h2>Six things you can't get anywhere else in town</h2>
  <div class="feats" style="margin-top:44px">
    ${[["/basketball/", "A full court", "Open gym twice a day, Monday through Friday. Racquetball too."],
       ["/pickleball/", "Pickleball \u2014 $5 to drop in", "Three indoor courts. Permanent lines. Climate controlled."],
       ["/childcare/", "Childcare while you train", "In the building, most of the hours you'd actually use it."],
       ["/classes/", `${counts.classes} classes a week`, "Spin, yoga, barre, Zumba, Pilates, tai chi and more."],
       ["/strength-floor/", "The new iron", "Brand-new commercial Nautilus and Matrix. We call it the Wolf Cave."],
      ].map(([h, t, d], i) => `<a class="feat rv" href="${u(h)}">
        <span class="n">${String(i + 1).padStart(2, "0")}</span>
        <span><h3>${t}</h3><p>${d}</p></span>
        <span class="arw">→</span></a>`).join("")}
  </div>
</div></section>

${NAMES ? `
<section class="sec sec-void"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Who runs it</p>
      <h2 class="said rv">Karla Stroman owns this gym. She teaches the 6:00 AM spin.</h2></div>
    <div><p class="lede">Her daughter <b style="color:#fff">Aubrie</b> teaches Lean &amp; Mean most weekday
    mornings. <b style="color:#fff">Kyle Tingley</b>, co-owner, is in the studio on Wednesday evenings.
    You will not find that at a franchise, and you cannot buy it.</p>
    <p style="margin-top:26px"><a class="btn btn-volt" href="${u("/schedule/")}">See who's on the board this week \u2192</a></p></div>
  </div>
</div></section>` : ""}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Three gyms in this town</p><h2>What's actually<br>different</h2></div>
    <div><p class="lede">Everyone here already knows the other two. No adjectives \u2014 just what is in
    the buildings. Their price stays in, and so do our hours.</p></div>
  </div>
  <div class="tw cmp" style="margin-top:clamp(30px,3.5vw,46px)"><table>
    <caption>Red Bluff, compared <span class="sub">checked against both</span></caption>
    <thead><tr><th scope="col">&nbsp;</th><th scope="col">Tehama Family</th>
      <th scope="col">Planet Fitness</th><th scope="col">RB Health &amp; Fitness</th></tr></thead>
    <tbody>
      ${[["Childcare", "In the building", "None", "None"],
         ["Pickleball", "3 indoor courts, $5 drop-in", "None", "\u2014"],
         ["Basketball", "Full court, twice a day", "None", "None"],
         ["Racquetball", "Yes", "None", "None"],
         ["Classes", `${counts.classes} a week, included`, "None", "Some"],
         ["Published price", "Ask the desk", "$15/mo", "Not published"],
         ["Weeknights", "5a\u20138p", "Late / 24h", "To 10p"],
        ].map(([a, b, c, d]) => `<tr><td>${a}</td><td class="yes">${b}</td>
        <td class="no">${c}</td><td class="no">${d}</td></tr>`).join("")}
    </tbody></table></div>
  <p class="lede" style="margin-top:26px;max-width:46ch"><b>If you train after 8, we are the wrong gym.</b>
  If you need a court, a kids' room or a class that costs nothing extra, we are the only one.</p>
</div></section>

<section class="sec sec-dark" style="padding-bottom:0"><div class="wrap">
  <div class="split">
    <div>
      <p class="eyebrow">New on the floor</p>
      <h2>Brand-new, commercial-grade iron</h2>
    </div>
    <div>
      <p class="lede">A full replacement of the strength floor with commercial Nautilus and Matrix. The room
      we call the <b style="color:#fff">Wolf Cave</b> is lettered on the wall, so you'll
      know when you're in it.</p>
      <p style="margin-top:26px"><a class="btn btn-volt" href="${u("/strength-floor/")}">See the strength floor →</a></p>
    </div>
  </div>
</div>
<img src="${u("/assets/strength-floor.jpg")}" alt="New Matrix strength machines on the rubber floor at Tehama Family Fitness Center" width="1080" height="290" loading="lazy" style="width:100%;margin-top:clamp(40px,5vw,72px);object-fit:cover;max-height:340px">
</section>

<section class="sec"><div class="wrap narrow">
  <p class="eyebrow">Membership</p>
  <h2>What it costs</h2>
  <p class="lede">One membership covers the court, the pickleball courts, racquetball, the weights, the cardio
  deck, the sauna and every class on the schedule. There's no separate class fee and no per-court charge.</p>
  <div style="margin-top:26px">${askBox("We'll give you the number over the phone.", "priceSingle",
    "Rates aren't published online yet — call the desk and you'll have it in under a minute.")}</div>
  <p style="margin-top:22px"><a class="btn btn-out" href="${u("/membership/")}">What's included →</a></p>
</div></section>

${spread(photos.studio, { eyebrow: "SilverSneakers", flip: true,
  h2: "Your plan already<br>covers this gym",
  body: "If you are on SilverSneakers, bring the card to the desk. Classic Monday, Wednesday and Friday. Cardio Circuit Tuesday and Thursday. And tai chi every single weekday morning at 7:15, without exception.",
  cta: ["/silversneakers/", "SilverSneakers here \u2192"] })}

<section class="sec"><div class="wrap">
  <p class="eyebrow">Bring the kids</p>
  <h2>Childcare is in the building</h2>
  <p class="lede">Mornings 8 to 1 every day but Sunday, and evenings 4 to 8 Monday through Thursday. Every
  class on our schedule tells you whether the kids' room is open at that hour — because that's the only
  question that actually decides whether you make it in.</p>
  <div class="grid g2" style="margin-top:26px">
    <div class="tw"><table><caption>Childcare hours</caption>
      <thead><tr><th scope="col">Day</th><th scope="col">Open</th></tr></thead>
      <tbody>${biz.childcareHours.map(([d, h]) => `<tr><td class="t-time">${d}</td><td>${h}</td></tr>`).join("")}</tbody></table></div>
    <div>${askBox("Ages, sign-up and first visit", "childcareAges",
      "Call the desk and ask for the childcare room — they'll walk you through it.")}
      <p style="margin-top:16px"><a class="btn btn-volt" href="${u("/schedule/?cc=1")}">Classes you can make \u2192</a></p></div>
  </div>
</div></section>

${proof()}

${fullBleed(photos.basketball, "The only full court in Red Bluff \u2014 open gym at one and again at six, Monday to Friday.")}

${spread(photos.childcare, { eyebrow: "While you train", flip: true,
  h2: "Alma has<br>the kids",
  body: `Open 8 to 1 every day but Sunday, plus 4 to 8 Monday through Thursday. Every session on our schedule says whether the kids' room is open at that hour \u2014 which is usually the thing that decides whether you get here at all.`,
  cta: ["/schedule/?cc=1", "Classes you can actually make \u2192"] })}

${band("Come and look at it.",
  `Walk in any day we're open. Nobody's going to put you through a sales process — the front desk will hand you a towel and walk you round.`,
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/day-pass/", "Day pass &amp; drop-in", "btn-ghost"], ["/tour/", "Take the tour", "btn-ghost"]])}
`, { og: "/assets/exterior-pano.jpg" });

/* ============================ SCHEDULE ================================ */
P("/schedule/", `Class Schedule — ${counts.classes} Classes a Week | ${biz.short}`,
  `The full weekly class schedule at Tehama Family Fitness Center in Red Bluff: ${counts.classes} classes, ${counts.basketball} basketball open-gym blocks, pickleball, and childcare hours shown on every session.`,
  `
${phero(photos.studio, { kick: "Straight from our live calendar",
  h1: "The whole <em>week</em>",
  lede: "Every session shows whether childcare is open at that hour \u2014 the only question that decides whether you actually get here.", acts: false })}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">The whole week at once</p>
      <h2>${counts.total} sessions,<br>Monday to Saturday</h2></div>
    <div><p class="lede">${counts.classes} classes, ${counts.basketball} basketball open-gym blocks and
    ${counts.pickleball} pickleball sessions, across 15 instructors. Every one of them included with
    membership \u2014 there is no class fee and nothing to book.</p></div>
  </div>
  <div style="margin-top:clamp(30px,3.5vw,46px)">${provisionalNote}</div>
  <p id="ccNote" class="lede" style="margin-bottom:18px" hidden>These are the ones you can make if the kids are with you.</p>
  <div class="filters" role="group" aria-label="Filter the schedule">
    <button aria-pressed="true" data-f="all">All ${counts.total}</button>
    <button aria-pressed="false" data-f="class">Classes only</button>
    <button aria-pressed="false" data-f="childcare">Childcare open</button>
    <button aria-pressed="false" data-f="am">Before noon</button>
    <button aria-pressed="false" data-f="pm">Noon and after</button>
  </div>
</div></section>

<div class="wg-wrap wrap-wide">${weekGrid()}</div>

<section class="sec"><div class="wrap">
  <div id="sched" class="wg-tables" style="gap:26px">
    ${DAYS.map(d => dayTable(d)).join("")}
  </div>
  <p style="margin-top:30px;color:var(--ink-3);font-size:.94rem">Sunday we are open 8 to 6 with nothing
  on the board. The court and the weight floor are all yours.</p>
</div></section>

${statement("Sixty-four ways into this building every week.",
  "Spin before dawn, tai chi at 7:15, Zumba mid-morning, open gym at one and again at six, pickleball on Tuesday nights. All of it included, none of it booked.")}

${fullBleed(photos.gymfloor, "Sixty-four sessions a week, and every one of them is already paid for.")}

${band("Every one of these is included.",
  "No class fee, no booking, no app. Show up a few minutes early the first time and tell the instructor it's your first one.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/membership/", "Membership", "btn-ghost"], ["/instructors/", "Meet the instructors", "btn-ghost"]])}

<script>
(function(){
  var btns=[].slice.call(document.querySelectorAll('.filters button'));
  var rows=[].slice.call(document.querySelectorAll('#sched tbody tr'));
  var blocks=[].slice.call(document.querySelectorAll('.wg-s'));
  var note=document.getElementById('ccNote');
  function applyGrid(f){
    blocks.forEach(function(b){
      var isClass=b.dataset.kind==='class', cc=b.dataset.cc==='1', m=+b.dataset.mins;
      var show=f==='all'||(f==='class'&&isClass)||(f==='childcare'&&cc)||
               (f==='am'&&m<720)||(f==='pm'&&m>=720);
      b.classList.toggle('dim',!show);
    });
  }
  function apply(f){
    rows.forEach(function(r){
      if(r.className==='empty'){r.style.display=(f==='all')?'':'none';return}
      if(!r.cells.length||r.cells.length<3){return}
      var cc=r.dataset.cc==='1';
      var isClass=r.dataset.kind==='class';
      var m=+r.dataset.mins;
      var show=f==='all'||(f==='class'&&isClass)||(f==='childcare'&&cc)||(f==='am'&&m<720)||(f==='pm'&&m>=720);
      r.style.display=show?'':'none';
    });
    document.querySelectorAll('#sched .tw').forEach(function(w){
      var any=[].slice.call(w.querySelectorAll('tbody tr')).some(function(r){return r.style.display!=='none'});
      w.style.display=any?'':'none';
    });
  }
  function setFilter(f){
    btns.forEach(function(x){x.setAttribute('aria-pressed', x.dataset.f===f ? 'true' : 'false')});
    apply(f); applyGrid(f);
    if(note) note.hidden = f!=='childcare';
  }
  btns.forEach(function(b){b.addEventListener('click',function(){setFilter(b.dataset.f);});});
  var start='all';
  try{ if(new URLSearchParams(location.search).get('cc')==='1') start='childcare'; }catch(e){}
  setFilter(start);
})();
(function(){
  var days=document.querySelector('.wg-days'); if(!days) return;
  var line=days.querySelector('.wg-now'); if(!line) return;
  var label=line.querySelector('b');
  var col=days.querySelector('.wg-col'); if(!col) return;
  var START=${GRID_START}, END=${GRID_END}, PPM=${PPM};
  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var dayOrder=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  function fmt(m){
    var h=Math.floor(m/60), min=Math.round(m%60); if(min===60){h++;min=0;}
    var ap=h>=12?'p':'a', hh=h%12===0?12:h%12;
    return hh+':'+(min<10?'0':'')+min+ap;
  }
  function place(){
    var now=new Date();
    var m=now.getHours()*60+now.getMinutes()+now.getSeconds()/60;
    var today=dayOrder[(now.getDay()+6)%7];
    days.querySelectorAll('.wg-day').forEach(function(d){
      d.classList.toggle('is-today', d.getAttribute('data-day')===today);
    });
    if(m<START||m>=END){ line.hidden=true; return; }
    line.hidden=false;
    var yNow=col.offsetTop+(m-START)*PPM;
    var yNext=col.offsetTop+(Math.min(m+1,END)-START)*PPM;
    line.style.transition='none';
    line.style.top=yNow+'px';
    label.textContent=fmt(m);
    if(!reduce){
      line.getBoundingClientRect();
      line.style.transition='top 60s linear';
      line.style.top=yNext+'px';
    }
  }
  place();
  var wait=60000-(Date.now()%60000);
  setTimeout(function(){
    place();
    setInterval(place,60000);
  }, wait);
})();
</script>
`);

/* ============================ MEMBERSHIP ============================== */
P("/membership/", `Membership — What's Included | ${biz.short} Red Bluff`,
  `One membership at Tehama Family Fitness Center covers the full basketball court, racquetball, indoor pickleball, the new strength floor, all ${counts.classes} weekly classes, sauna and more.`,
  `
${phero(photos.gymfloor, { kick: "Membership",
  h1: "One membership.<br>The <em>whole building.</em>",
  lede: "There is no class fee. There is no court fee. There is no separate charge for anything in here. If it is in the building, it is in the membership." })}

<section class="sec"><div class="wrap">
  ${numbers([[biz.sqft, "square feet"], [String(counts.classes), "classes a week"],
             ["1", "racquetball court"], ["3", "pickleball courts"], ["0", "extra fees"]], false)}
</div></section>

${statement("Everything in this building is included. All of it.",
  "The full court, racquetball, the sauna, the three pickleball courts, the new strength floor, the women's weight room, the cardio deck and every class on the schedule. There is no tier system here and nothing behind a second paywall.")}

${fullBleed(photos.tanning, "Tanning, the esthetician room and the saunas are in the membership too.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">What's included</p><h2>All of it, actually</h2></div>
    <div><p class="lede">Most gyms this size run a tier system where the classes or the courts cost
    extra. This one does not \u2014 which is worth checking against whatever you are comparing it to.</p></div>
  </div>
  <div class="grid g3" style="margin-top:clamp(34px,4vw,52px)">
    ${[["Full basketball court", "Plus open gym twice a day, Monday through Friday."],
       ["Three indoor pickleball courts", "Concrete, permanent lines, climate controlled."],
       ["Racquetball", "The only court in town."],
       ["The new strength floor", "Commercial Nautilus and Matrix, plus an Olympic platform."],
       ["Women's weight room", "A separate room, not a corner of the main floor."],
       [`All ${counts.classes} classes`, "Spin, yoga, barre, Zumba, Pilates, tai chi and everything else on the board."],
       ["30+ pieces of cardio", "Plus the cardio theater, TRX, stretching stations and a cross-training box."],
       ["Locker rooms with sauna", "Full service, both sides."],
      ].map(([t, d]) => `<div class="card rv"><h3>${t}</h3><p>${d}</p></div>`).join("")}
  </div>
  <p style="margin-top:26px"><a href="${u("/amenities/")}">See the full amenity list \u2192</a></p>
</div></section>

${fullBleed(photos.freeweights, "The freeweight room and the Olympic platform \u2014 included, like everything else.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">What it costs</p><h2>Ask us and<br>we'll tell you</h2>
      <p class="lede">Text us and you will have it in about a minute. No form to fill in first, and
      nobody will put you through a pitch.</p></div>
    <div>${(() => {
      const known = [["priceSingle", "Single, monthly"], ["priceSingleYear", "Single, 12 month"], ["priceFamily", "Family"], ["priceCouple", "Couple"], ["priceStudent", "Student"], ["priceSenior", "Senior"], ["priceCorporate", "Corporate"]].filter(([k]) => has(k));
      // Seven rows each repeating "call for the rate" is weaker than saying it once.
      // Until real numbers land, list what exists and make ONE ask.
      if (!known.length) return `
        <div class="rates">
          <p class="rates-k">Membership types</p>
          <ul class="rates-l">${[["priceSingle", "Single, monthly"], ["priceSingleYear", "Single, 12 month"], ["priceFamily", "Family"], ["priceCouple", "Couple"], ["priceStudent", "Student"], ["priceSenior", "Senior"], ["priceCorporate", "Corporate"]].map(([, l]) => `<li>${l}</li>`).join("")}</ul>
          <p class="rates-n">Every one of these exists. None of them are published online \u2014 including
          by our online sign-up. Text us and you will have your number in about a minute.</p>
        </div>`;
      return `<div class="tw"><table><caption>Rates</caption>
        <thead><tr><th scope="col">Membership</th><th scope="col">Rate</th></tr></thead>
        <tbody>${[["priceSingle", "Single, monthly"], ["priceSingleYear", "Single, 12 month"], ["priceFamily", "Family"], ["priceCouple", "Couple"], ["priceStudent", "Student"], ["priceSenior", "Senior"], ["priceCorporate", "Corporate"]].map(([k, l]) =>
          `<tr><td><b>${l}</b></td><td>${priceOrAsk(k)}</td></tr>`).join("")}</tbody></table></div>`;
    })()}</div>
  </div>
  <div style="margin-top:34px">${askBox("Call and we'll tell you today's rate.", "priceSingle",
    "One phone call, under a minute, and nobody will put you through a sales process.")}</div>
  ${has("contractTerms") ? `<div style="margin-top:30px"><h3>The terms, in one sentence</h3><p class="lede">${val("contractTerms")}</p></div>` : ""}
</div></section>

<section class="sec sec-tint"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Joining</p><h2>Two ways in</h2></div>
    <div>${steps([
      ["Call the desk", `${biz.phone}. Fastest for a family, couple, student or senior rate, or anything with a question attached to it.`],
      ["Walk in", "No appointment. Somebody will show you the building first if you want to see it before deciding."],
      ["Or start a single membership online", "Our online sign-up handles single memberships. For a family, couple, student or senior rate, call or text \u2014 it is quicker."],
    ])}
    <p style="margin-top:28px"><a class="btn btn-volt" href="tel:${biz.tel}">Call ${biz.phone}</a>
    <a class="btn btn-out" href="${biz.join}" style="margin-left:10px">Join online</a></p></div>
  </div>
</div></section>

${rateForm()}

${proof()}

${band("Or just come and look at it first.", "Walk in any day we are open. Walk the floor, see the courts, decide after.",
  [["/day-pass/", "Day pass &amp; drop-in"], [`tel:${biz.tel}`, `Call ${biz.phone}`, "btn-ghost"]])}
`);

/* ============================= DAY PASS =============================== */
P("/day-pass/", `Day Pass, Drop-In &amp; Walk-Ins | ${biz.short} Red Bluff`,
  `Visiting Red Bluff or trying us out? Walk in during open hours at Tehama Family Fitness Center. Pickleball drop-in is $5 for non-members.`,
  `
${phero(photos.frontdesk, { kick: "Just visiting",
  h1: "Walk <em>in.</em>",
  lede: "You do not need an appointment and you do not need to be a member to come and look at the place. The front desk is right inside the door, and somebody there will walk you around." })}

${statement("Nobody is going to put you through a sales process.",
  "Walk in, look around, ask whatever you want. If it is not for you, that is a fine answer and nobody will chase you about it.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">What it costs to visit</p><h2>Two ways to drop in</h2></div>
    <div class="grid g2">
      <div class="card"><h3>Gym day pass</h3>
        <p>Full run of the building for the day \u2014 court, weights, cardio, sauna and whatever class is
        on while you are here.</p>
        <p style="margin-top:16px">${priceOrAsk("dayPass")}</p></div>
      <div class="card"><h3>Pickleball drop-in</h3>
        <p>Three indoor courts with permanent lines.</p>
        <p style="margin-top:16px"><b style="font-size:1.5rem;font-family:var(--disp);letter-spacing:-.03em">${pickleball.dropIn}</b>
        <span style="color:var(--ink-3);font-size:.9rem;display:block;margin-top:6px">for non-members, per USA
        Pickleball's directory. Confirm at the desk.</span></p>
        <p style="margin-top:12px"><a href="${u("/pickleball/")}">Pickleball details \u2192</a></p></div>
    </div>
  </div>
  <div style="margin-top:34px">${askBox("Call for today's day-pass rate", "dayPass")}</div>
</div></section>

${spread(photos.corridor, { eyebrow: "Your first visit", flip: true,
  h2: "What actually<br>happens",
  body: "Come in the main doors on South Main. The desk is straight ahead. Tell them it is your first time and ask for the tour \u2014 it takes about ten minutes and covers the courts, which is the part most people have never seen.",
  list: ["Bring shoes you can train in, a towel and water",
         "Locker rooms are full service, with a sauna on both sides",
         "If a class is running, you are welcome in it \u2014 tell the instructor it is your first",
         "Coffee at the Fuel Bar is free until 9 a.m."] })}

${fullBleed(photos.lobby, "Walk in, and this is the room you stand in. Somebody will be at the desk.")}

${proof()}

${band("Open till eight on weeknights.", "Eight to six at weekends. Come by whenever it suits \u2014 no appointment.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/contact/", "Directions", "btn-ghost"]])}
`);

/* ========================= PERSONAL TRAINING ========================== */
P("/personal-training/", `Personal Training &amp; Bootcamps | ${biz.short} Red Bluff`,
  `Personal training, bootcamps and nutrition coaching at Tehama Family Fitness Center in Red Bluff, CA.`,
  `
${phero(photos.freeweights, { kick: "One on one",
  h1: "Personal <em>training</em>",
  lede: "Nationally accredited college graduates, personal trainers, exercise physiologists, strength and conditioning specialists, certified nutrition consultants, college athletes and certified instructors." })}

${statement("Most of the staff came up through the local high school programme.",
  "This is not a rotating cast of trainers passing through on their way somewhere else. People here tend to have been here a while, which is the whole reason the coaching is any good.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Three ways to work with someone</p><h2>Pick the one that<br>fits how you train</h2></div>
    <div class="grid" style="gap:0">${steps([
      ["Personal training", "One-on-one, on the new strength floor or wherever your programme takes you. Trainers set the schedules \u2014 the desk will match you to one."],
      ["Bootcamps", "Group training with a coach running it. Harder than a class, smaller than one."],
      ["Nutrition coaching", "Kristi Havlin runs KH Macro Coaching out of here."],
    ])}</div>
  </div>
  <div style="margin-top:34px">${askBox("Rates and availability", "priceSingle",
    "Tell the desk what you are trying to do and they will match you with the right trainer and give you the rate.")}</div>
</div></section>

${spread(photos.platform, { eyebrow: "Where you'll be working", flip: true,
  h2: "A full replacement<br>of the strength floor",
  body: "Commercial Nautilus and Matrix, a freeweight room with an Olympic platform, a Pilates reformer, a TRX station and a cross-training box. There is enough equipment here to run almost any programme without queuing for it.",
  cta: ["/strength-floor/", "See the strength floor \u2192"] })}

${fullBleed(photos.crosstrain, "The cross-training end — rig, boxes, rope and a turf lane to push a sled down.")}

${band("Start with a conversation.", "Call the desk and tell them what you are trying to do. They will point you at the right trainer.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/contact/", "Contact", "btn-ghost"]])}
`);

/* ======================== CORPORATE WELLNESS ========================== */
P("/corporate-wellness/", `Corporate Wellness for Red Bluff Employers | ${biz.short}`,
  `Corporate wellness memberships at Tehama Family Fitness Center — a 30,000 sq ft facility on South Main, minutes from St. Elizabeth Community Hospital and downtown Red Bluff.`,
  `
${phero(photos.cardioTheater, { kick: "For employers",
  h1: "Corporate <em>wellness</em>",
  lede: `If you employ people in Red Bluff, there is exactly one facility in this county with a full basketball court, racquetball, three indoor pickleball courts, childcare and ${counts.classes} classes a week.` })}

${statement("Four minutes from St. Elizabeth Community Hospital.",
  "About six from downtown. Nobody on your team has to drive to Redding, and there is only one location to administer.")}

${fullBleed(photos.stretch, "Somewhere for a shift to decompress that is not the break room.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Why it works here</p><h2>Benefits people<br>actually use</h2>
      <p class="lede">The failure mode of a corporate gym benefit is that nobody redeems it. Most of the
      reasons for that are solved by this building rather than by the paperwork.</p></div>
    <div>${steps([
      ["Shift workers can use it", "Open at five in the morning, closed at eight at night."],
      ["Childcare is on site", "Which is what actually decides whether a parent on your team uses a benefit at all."],
      ["Classes are included", "No second bill, no per-visit accounting, no reconciliation."],
      ["Low-impact options across the board", "Tai chi, stretch and mobility, SilverSneakers-style circuits, Pilates \u2014 it works for a whole workforce, not just the gym-fit end of it."],
      ["One location", "Nobody drives to Redding."],
    ])}</div>
  </div>
</div></section>

${spread(photos.circuit, { eyebrow: "The differentiator", flip: true, tone: "hot",
  h2: "One building,<br>every option",
  body: "Low-impact and high-impact under one roof \u2014 tai chi and stretch classes at one end, an Olympic platform at the other. It works for a whole workforce rather than just the gym-fit end of it.",
  cta: ["/amenities/", "What is in the building \u2192"] })}

<section class="sec sec-tint"><div class="wrap narrow">
  ${askBox("Set up a corporate rate", "priceCorporate",
    "Tell us roughly how many employees and we will put a number together.")}
</div></section>

${band("Talk to us about your team.", "Call the desk and ask about corporate wellness.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], [`mailto:${biz.email}`, "Email us", "btn-ghost"]])}
`);

/* ============================ PICKLEBALL ============================== */
P("/pickleball/", `Indoor Pickleball in Red Bluff — 3 Courts | ${biz.short}`,
  `Three indoor pickleball courts with permanent lines at Tehama Family Fitness Center, 2498 S Main St, Red Bluff. Non-member drop-in $5. League play Tuesday evenings and Saturday mornings.`,
  `
${phero(photos.pickleball, { sm: false, kick: "2498 S Main St · Red Bluff",
  h1: "$5 to play.",
  lede: "Three indoor courts, permanent lines, climate controlled. That's the drop-in if you're not a member. Included if you are." })}

<section class="sec"><div class="wrap">
  <div class="figs on-light">
    <div><b>${pickleball.dropIn}</b><span>to drop in if you are not a member</span></div>
    <div><b>${pickleball.courts}</b><span>indoor courts</span></div>
    <div><b class="word">Permanent</b><span>lines on the floor</span></div>
    <div><b class="word">2.5–4.0</b><span>and beginners welcome</span></div>
  </div>
  <p class="lede" style="margin-top:28px">Played today? Membership includes these courts, the weight floor and
  the kids' room. <a href="${u("/membership/")}#rate">Get your rate \u2192</a></p>
</div></section>

<section class="sec sec-tint"><div class="wrap">
  <h2>When play happens</h2>
  <p class="lede">Organised play is run by the Red Bluff pickleball community on our courts. Times move
  around — call before you drive out.</p>
  <div class="tw" style="margin-top:24px"><table><caption>Play times</caption>
    <thead><tr><th scope="col">Day</th><th scope="col">Time</th></tr></thead>
    <tbody>${pickleball.play.map(([d, t]) => `<tr><td class="t-time">${d}</td><td>${t}</td></tr>`).join("")}</tbody>
  </table></div>
  <div class="note" style="margin-top:20px"><b>Two sources, slightly different.</b> USA Pickleball's directory
  lists Tuesday <em>and</em> Thursday evenings; our calendar shows Tuesday evening and Saturday
  morning. <a href="tel:${biz.tel}">Call ${biz.phone}</a> to confirm this week before you drive out.</div>
</div></section>

<section class="sec"><div class="wrap">
  <h2>The details</h2>
  <div class="grid g3" style="margin-top:24px">
    ${[["Surface", "Indoor concrete with permanent lines — no taping, no chalk, no arguing about where the line was."],
       ["Nets", "Portable nets go up for play."],
       ["Cost", `${pickleball.dropIn} for non-members. Included for members.`],
       ["Reservations", "Drop in during posted play times. Call the desk for anything else."],
       ["Level", "2.5 through 4.0, and genuinely beginner-friendly."],
       ["While you're here", "Restrooms, water and the Fuel Bar are all a few steps off the court."],
      ].map(([t, d]) => `<div class="card"><h3>${t}</h3><p>${d}</p></div>`).join("")}
  </div>
</div></section>

${statement("Three indoor courts, and half the town still does not know.",
  "Pickleheads, Places2Play, Bounce and Pickleballify all list our courts. Most people in Red Bluff still have no idea they are here.")}

${fullBleed(photos.racquetball, "The same high-bay floor carries the racquetball court \u2014 the only one in town.")}

${spread(photos.paddles, { eyebrow: "Why indoors matters here", flip: true,
  h2: "A twelve-month season",
  body: "Red Bluff hits 110\u00b0F in the summer. Outdoor courts are unplayable from about eleven in the morning until evening for a good stretch of the year, and in winter you are waiting out the rain. Three courts under a roof means the season never stops.",
  list: ["Climate controlled, all year",
         "Permanent lines \u2014 no taping, no arguing about where the line was",
         "Sealed concrete, consistent bounce",
         `Also listed on ${pickleball.listedOn.join(", ")}`] })}


${band("Bring a paddle.",
  `${pickleball.dropIn} gets a non-member on the court. Members play for nothing.`,
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/membership/", "Membership", "btn-ghost"]])}
`, { schema: { "@type": ["HealthClub", "SportsActivityLocation"] } });

/* =========================== BASKETBALL =============================== */
P("/basketball/", `Full Court Basketball &amp; Racquetball, Red Bluff | ${biz.short}`,
  `A full-court basketball gymnasium with open gym twice a day Monday–Friday, plus racquetball, at Tehama Family Fitness Center in Red Bluff.`,
  `
${phero(photos.basketball, { kick: "Full court \u00b7 open gym twice a day",
  h1: "Basketball <em>&amp;</em> racquetball",
  lede: `A full-court gymnasium with open gym at 1:00 p.m. and 6:00 p.m., Monday through Friday. That is ${counts.basketball} blocks a week, included with membership, no sign-up.` })}

<section class="sec"><div class="wrap">
  ${numbers([["1", "full-size court"], [String(counts.basketball), "open-gym blocks a week"],
             ["2", "sessions every weekday"], ["1", "racquetball court in town"]], false)}
</div></section>

<section class="sec sec-tint"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Open gym</p><h2>Turn up and play</h2>
      <p class="lede">No sign-up sheet, no league fee, no team to join. It is included, and it runs
      twice a day so there is a slot whether you work mornings or evenings.</p></div>
    <div>${(() => {
      const rows = ["Mon","Tue","Wed","Thu","Fri"].map(d => {
        const t = sorted(d).filter(x => x.kind === "open").map(x => x.time).join(" &nbsp;\u00b7&nbsp; ");
        return `<tr><td class="t-time">${DAYNAME[d]}</td><td>${t || "\u2014"}</td></tr>`; }).join("");
      return `<div class="tw"><table><caption>Basketball open gym</caption>
        <thead><tr><th scope="col">Day</th><th scope="col">Times</th></tr></thead>
        <tbody>${rows}</tbody></table></div>`; })()}</div>
  </div>
</div></section>

${spread(photos.racquetball, { eyebrow: "Racquetball",
  h2: "The only court<br>in Red Bluff",
  body: "There is a racquetball court in this building and there is not another one in town. If you play, you already know how short that list is \u2014 and how far the next one is.",
  list: ["Included with membership",
         "Call the desk about court availability",
         "The same room carries the three pickleball courts"],
  flip: true })}

${statement("Nobody else in this county has a full court, and nobody else has racquetball.",
  "Planet Fitness has neither. Red Bluff Health & Fitness has neither. That is not marketing \u2014 it is just what is in the buildings.")}

${fullBleed(photos.courtLines, "Full size, properly lined, and the lights are on twice a day.")}

<section class="sec"><div class="wrap narrow">
  <h2>The floor works hard</h2>
  <p class="lede">Between open gym twice a day, pickleball league nights and everything else that gets
  wheeled onto it, the gymnasium is rarely empty. It is the busiest room in the building and the
  reason a lot of members are here.</p>
  <p style="margin-top:26px"><a class="btn btn-out" href="${u("/pickleball/")}">Pickleball on this floor \u2192</a></p>
</div></section>

${band("Run it at one, or run it at six.", "Open gym twice a day, five days a week, included.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/membership/", "Membership", "btn-ghost"]])}
`);

/* ========================= STRENGTH FLOOR ============================= */
P("/strength-floor/", `The Strength Floor — New Nautilus &amp; Matrix | ${biz.short}`,
  `A brand-new commercial-grade Nautilus and Matrix strength floor at Tehama Family Fitness Center in Red Bluff, plus a freeweight room with an Olympic platform.`,
  `
${phero(photos.nautilus, { kick: "Members named it the Wolf Cave",
  h1: "The <em>strength</em> floor",
  lede: "A full replacement with brand-new, commercial-grade Nautilus and Matrix. Not refurbished, not hand-me-down club equipment \u2014 new." })}

${statement("We call it the Wolf Cave. It is lettered on the wall.",
  "It stuck hard enough that we painted it on the wall.")}

<section class="sec"><div class="wrap">
  <figure>${pimg(photos.strength, { sizes: "(max-width:880px) 92vw, min(50vw, 680px)", style: "width:100%" })}
  <figcaption>The new Matrix floor, the week it went in.</figcaption></figure>
</div></section>

${spread(photos.freeweights, { eyebrow: "Freeweights", flip: true,
  h2: "There is a platform,<br>and you can drop a bar",
  body: "Racks, benches and an Olympic lifting platform. That last part matters: most gyms this size will not let you put a loaded bar on the floor, and a lot of them do not own a platform at all.",
  list: ["Power rack and an Olympic platform",
         "Full dumbbell run, light to heavy",
         "Bumper plates on vertical storage",
         "Dark speckled rubber throughout"] })}

<section class="sec sec-tint"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Not one room</p><h2>Six places to train</h2>
      <p class="lede">The strength side of this building is split across several rooms rather than
      crammed into one corner, which is mostly a function of having thirty thousand square feet to work with.</p></div>
    <div class="grid" style="gap:0">${steps([
      ["The machine floor", "New commercial Nautilus and Matrix, selectorised, with room to move between them."],
      ["Freeweight room", "Racks, benches and the Olympic platform."],
      ["Women's weight room", "A separate room. Not a partitioned corner."],
      ["Circuit training room", "Stations set up to run in order \u2014 also where Cardio Circuit meets."],
      ["Cross training", "A cross-training box, a TRX station and stretching stations."],
      ["Pilates reformer", "On the floor, and used in the studio programme too."],
    ])}</div>
  </div>
  <p style="margin-top:30px"><a class="btn btn-out" href="${u("/womens-weight-room/")}">The women's weight room \u2192</a></p>
</div></section>

${fullBleed(photos.dumbbells, "Dumbbells light to heavy, and benches enough that you are not waiting for one.")}

${band("Put your hands on it.", "Walk in and try the new equipment before you decide anything.",
  [["/day-pass/", "Day pass"], [`tel:${biz.tel}`, `Call ${biz.phone}`, "btn-ghost"]])}
`);

/* ======================= WOMEN'S WEIGHT ROOM ========================== */
P("/womens-weight-room/", `Women's Weight Room | ${biz.short} Red Bluff`,
  `A separate women's weight room at Tehama Family Fitness Center in Red Bluff — its own room, not a corner of the main floor.`,
  `
${phero(photos.womens, { kick: "Its own room",
  h1: "The women's <em>weight room</em>",
  lede: "A separate room with its own equipment. Not a rack pushed into a corner of the main floor and labelled \u2014 an actual room." })}

${statement("A room, not a corner.",
  "That distinction sounds small and is not. If the reason you do not lift is that you do not want to do it in front of the whole gym, a separate room with its own door is the difference between a membership you use and one you cancel.")}

${fullBleed(photos.dumbbells, "Its own dumbbells, its own benches, its own door.")}

${spread(photos.kettlebells, { eyebrow: "What's in it", flip: true,
  h2: "Its own equipment",
  body: "Selectorised strength machines, a full run of dumbbells, benches and a mirrored wall. You are not sharing a rack with the main floor and you are not waiting on it either.",
  list: ["A separate room off the main strength floor",
         "Its own machines, dumbbells and benches",
         "Included with membership, like everything else",
         "The cardio deck, the studios and the courts are all a few steps away"] })}

<section class="sec sec-tint"><div class="wrap narrow">
  <h2>Want to see it first?</h2>
  <p class="lede">Ask at the desk and somebody will walk you back there before you decide anything.
  No appointment, and nobody will chase you afterwards.</p>
  <div style="margin-top:26px">${askBox("Come and have a look", "priceSingle",
    "Ask at the desk and somebody will walk you back there. No appointment.")}</div>
</div></section>

${band("Come and look.", "The tour takes ten minutes and nobody will chase you afterwards.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/day-pass/", "Walk in", "btn-ghost"]])}
`);

/* ============================ CHILDCARE =============================== */
P("/childcare/", `Childcare While You Train | ${biz.short} Red Bluff`,
  `Childcare at Tehama Family Fitness Center, Red Bluff: mornings 8–1 Monday through Saturday and evenings 4–8 Monday through Thursday. Every class on our schedule shows whether the kids' room is open.`,
  `
${phero(photos.childcare, { kick: "In the building",
  h1: "<em>Childcare</em>",
  lede: `Most parents in this town skip the gym because there is nowhere for the kids to be. Here there is \u2014 and ${staff.childcare} runs it.` })}

${statement("Nowhere else in Red Bluff will take your kids while you train.",
  "Planet Fitness has no childcare. Red Bluff Health & Fitness has no childcare. For most parents in this town that is the whole decision, and it is why a lot of our members are here.")}

${fullBleed(photos.corridor, "The kids\u2019 room is off the main corridor \u2014 a short walk from wherever you are training.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">The hours</p><h2>Mornings every day but Sunday</h2>
      <p class="lede">Plus evenings Monday through Thursday, which is when most of the after-work
      classes run.</p></div>
    <div><div class="tw"><table><caption>Childcare hours</caption>
      <thead><tr><th scope="col">Day</th><th scope="col">Open</th></tr></thead>
      <tbody>${biz.childcareHours.map(([d, h]) => `<tr><td class="t-time">${d}</td><td>${h}</td></tr>`).join("")}</tbody>
    </table></div></div>
  </div>
</div></section>

${spread(photos.kidsroom, { eyebrow: "Which classes you can actually make", dark: true,
  h2: "Every session on our<br>schedule says so",
  body: `We mark all ${counts.total} sessions with whether the kids' room is open at that hour. It is the only question that decides whether you get here, so it is on every single row.`,
  cta: ["/schedule/?cc=1", "Classes you can make \u2192"] })}

<section class="sec sec-tint"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Before your first visit</p><h2>Ask these four things</h2>
      <p class="lede">You need real answers before you leave a two-year-old with anybody, and you
      should get them from a person rather than guess from a website.</p></div>
    <div>${steps([
      ["Ages accepted", has("childcareAges") ? esc(val("childcareAges")) : "Ask at the desk \u2014 call " + biz.phone + " and ask for the childcare room."],
      ["How to register", has("childcareSignup") ? esc(val("childcareSignup")) : "Whether you sign up in advance or just walk in with them the first time."],
      ["What to bring the first time", "Forms, immunisation records, a change of clothes \u2014 the desk will tell you exactly."],
      ["Time limits and pickup", "How long they can stay, and what happens if your class runs over."],
    ])}</div>
  </div>
  <div style="margin-top:34px">${askBox("Call and ask for the childcare room", "childcareSignup",
    "Ages, registration, first visit and the pickup policy \u2014 one phone call covers all of it.")}</div>
</div></section>

<section class="sec"><div class="wrap narrow">
  <h2>Kids Fit</h2>
  <p class="lede">Kids Fit has its own room \u2014 the bright green one with the mats, the slide and the
  number line on the floor.</p>
  ${has("kidsFitRunning")
    ? `<p class="lede">${esc(val("kidsFitRunning"))}</p>`
    : `<div class="note" style="margin-top:22px"><b>Ask before you plan around it.</b> Call ${biz.phone} to
       check which Kids Fit sessions are running right now and the current age groups.</div>`}
  <div class="hold" style="margin-top:26px"><b>Photos of Kids Fit coming</b>
  We will not put a child on the internet without asking their family first. Once we have, they go up.</div>
</div></section>

${band("Bring them with you.",
  "Childcare is in the building, open most of the hours you would actually use it.",
  [["/schedule/?cc=1", "Classes you can make"], [`tel:${biz.tel}`, `Call ${biz.phone}`, "btn-ghost"]])}
`);

/* ============================= FUEL BAR =============================== */
P("/fuel-bar/", `The Fuel Bar — Shakes, Smoothies &amp; Free Morning Coffee | ${biz.short}`,
  `The Tehama Nutrition Center at Tehama Family Fitness Center: protein shakes, smoothies, pre-workout, LMNT — and coffee that's free until 9 a.m.`,
  `
${phero(photos.fuelbar, { kick: "Tehama Nutrition Center",
  h1: "The <em>Fuel Bar</em>",
  lede: "Just off the floor, by the lobby. Protein, smoothies, cold drinks, snacks \u2014 and coffee that costs nothing before nine." })}

<section class="sec"><div class="wrap">
  ${numbers([["Free", "coffee before 9am", true], ["$2", "pre-workout"],
             ["$5", "recharge smoothie"], ["$7", "protein shake"]], false)}
</div></section>

${statement("Coffee is free until nine.",
  "Which is a better argument for making the 6 a.m. spin than anything else we could put here. After nine it is a dollar twenty-five, which is still the cheapest cup on South Main.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">The menu</p><h2>Straight off<br>the board</h2>
      <p class="lede">Ask at the counter if something has moved. If you are not sure what you want
      after a session, the honest answer is usually the protein shake with two scoops and a banana.</p></div>
    <div><p class="lede">Pick two flavours in a protein shake at no extra cost. Spinach, creatine or
    almond milk go in for a little more \u2014 nobody is going to charge you for a scoop of ice.</p></div>
  </div>
  <div class="grid g2" style="margin-top:clamp(30px,3.5vw,46px)">
    ${fuelBar.map(g => `<div class="tw"><table><caption>${g.group}</caption>
      <thead><tr><th scope="col">Item</th><th scope="col">Price</th></tr></thead>
      <tbody>${g.items.map(([n, pr, note]) => `<tr><td><b>${n}</b>${note ? `<br><span style="font-size:.86rem;color:var(--ink-3)">${note}</span>` : ""}</td>
      <td class="t-time">${pr}</td></tr>`).join("")}</tbody></table></div>`).join("")}
  </div>
</div></section>

${spread(photos.coffee, { eyebrow: "Where it is", flip: true,
  h2: "A few steps<br>off the floor",
  body: "The counter sits by the lobby, which means it doubles as the place people stand around talking after a class. In a building this size that matters more than the menu does.",
  list: ["Open whenever the building is",
         "Card or cash at the counter",
         "Grab a bar on the way out \u2014 nobody minds",
         "Coffee free until 9 a.m., $1.25 after"] })}

<section class="sec sec-tint"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">What to have, when</p><h2>If you are<br>not sure</h2></div>
    <div>${steps([
      ["Before an early class", "Free coffee, and a pre-workout for $2 if you want one. Bucked Up or RYSE behind the counter."],
      ["Straight after lifting", "Protein shake, $7, pick two flavours. Add creatine for a dollar."],
      ["After a hard session in July", "Recharge smoothie or an LMNT packet. You lose more in that building than you think."],
      ["Bringing the kids", "Bananas are a dollar and the protein bars are $3.50. Both survive a gym bag."],
    ])}</div>
  </div>
</div></section>

${fullBleed(photos.frontdesk, "The counter is by the lobby \u2014 you pass it on the way in and on the way out.")}

<section class="sec"><div class="wrap narrow">
  <h2>Nutrition coaching</h2>
  <p class="lede">Kristi Havlin runs KH Macro Coaching out of here if you want more than a shake and
  a guess. Ask at the desk and we will point you at her.</p>
  <p style="margin-top:26px"><a class="btn btn-out" href="${u("/personal-training/")}">Training and coaching \u2192</a></p>
</div></section>

${band("Coffee is free until nine.", "Which is a decent reason to make the early class.",
  [["/schedule/", "The early classes"], [`tel:${biz.tel}`, `Call ${biz.phone}`, "btn-ghost"]])}
`);

/* ============================ AMENITIES =============================== */
P("/amenities/", `Everything in the Building | ${biz.short} Red Bluff`,
  `The full amenity list at Tehama Family Fitness Center, Red Bluff: 30,000 sq ft with a full basketball court, racquetball, indoor pickleball, sauna, childcare, tanning, esthetician and more.`,
  `
${phero(photos.locker, { kick: `${biz.sqft} square feet \u00b7 single storey`,
  h1: "Everything in <em>the building</em>",
  lede: "Twenty-five things under one roof, and one membership covers all of them." })}

<section class="sec"><div class="wrap">
  <div class="chips">${amenities.map(a => `<span class="chip">${a}</span>`).join("")}</div>
</div></section>

${statement("Twenty-five amenities. One membership. No tiers.",
  "There is no upgrade path here and nothing behind a second paywall. What is in the building is in the membership \u2014 which is worth checking against whatever else you are comparing.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">The big ones</p><h2>Rooms people<br>come here for</h2></div>
    <div><p class="lede">These are the reasons people drive past two other gyms to get here.</p></div>
  </div>
  <div class="grid g3" style="margin-top:clamp(34px,4vw,52px)">
    ${[["/basketball/", "Basketball &amp; racquetball", "Full court, open gym twice a day."],
       ["/pickleball/", "Pickleball", "Three indoor courts, permanent lines."],
       ["/strength-floor/", "Strength floor", "New commercial Nautilus and Matrix."],
       ["/womens-weight-room/", "Women's weight room", "A separate room, not a corner."],
       ["/childcare/", "Childcare", "In the building, most useful hours."],
       ["/fuel-bar/", "Fuel Bar", "Coffee free until nine."],
       ["/classes/", "Group classes", `All ${counts.classes}, included.`],
      ].map(([h, t, d]) => `<a class="card rv" href="${u(h)}"><h3>${t}</h3><p>${d}</p><span class="more">More \u2192</span></a>`).join("")}
  </div>
</div></section>

${spread(photos.saunaDoor, { eyebrow: "The recovery end", flip: true,
  h2: "Sauna in both<br>locker rooms",
  body: "Full-service locker rooms on each side, each with its own cedar sauna. For a community gym in a town of fourteen thousand, that is an unusually good recovery setup.",
  list: ["Cedar sauna on both sides",
         "Full-service lockers, showers and benches",
         "Tanning and an on-site esthetician"] })}

${fullBleed(photos.cardioTheater, "Thirty-plus pieces of cardio, plus the cardio theater, TRX and a cross-training box.")}

<section class="sec sec-tint"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">And the rest</p><h2>The things that<br>do not need a page</h2></div>
    <div class="grid g2">
      ${[["Cardio deck", "30+ pieces, plus a cardio theater if you would rather watch something than a wall."],
         ["Studios", "A spin room and a yoga, Pilates and dance studio, both purpose-built."],
         ["Cross training", "Cross-training box, TRX station, stretching stations, Pilates reformer."],
         ["Tanning &amp; esthetician", "Both on site."],
        ].map(([t, d]) => `<div class="card rv"><h3>${t}</h3><p>${d}</p></div>`).join("")}
    </div>
  </div>
</div></section>

${band("It's a lot of building.", "Ten-minute tour, any day we are open.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/tour/", "Take the tour", "btn-ghost"]])}
`);

/* ============================= CLASSES ================================ */
const sessionsFor = names => sessions.filter(s => names.some(n => s.name.toLowerCase().includes(n)))
  .sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || mins(a.time) - mins(b.time));

const miniTable = rows => rows.length ? `<div class="tw"><table>
  <thead><tr><th scope="col">Day</th><th scope="col">Time</th><th scope="col">Class</th><th scope="col">Instructor</th><th scope="col">Kids</th></tr></thead>
  <tbody>${rows.map(s => `<tr><td class="t-time">${DAYNAME[s.day]}</td><td class="t-time">${s.time}</td>
    <td><b>${esc(s.name)}</b></td><td class="who">${s.who ? esc(s.who) : "—"}</td><td>${ccTag(s)}</td></tr>`).join("")}</tbody>
</table></div>` : `<p class="lede">Not on the board right now — <a href="tel:${biz.tel}">call the desk</a> to check.</p>`;

const classPages = classes.filter(c => c.slug);
P("/classes/", `Group Classes — ${counts.classes} a Week, All Included | ${biz.short}`,
  `Every group class at Tehama Family Fitness Center in Red Bluff: spin, yoga, barre, Zumba, Pilates, tai chi, kettlebell, Drums Alive and more. ${counts.classes} a week, included with membership.`,
  `
${phero(photos.studio, { kick: "All included with membership",
  h1: `${counts.classes} classes <em>a week</em>`,
  lede: "Across 15 instructors, seven days of building hours and two studios. No class fee, no booking, no app. Turn up." })}

<section class="sec"><div class="wrap">
  ${numbers([[String(counts.classes), "classes a week"], ["15", "instructors"],
             ["2", "studios"], ["0", "booking required"]], false)}
</div></section>

${statement("Fifty-four classes a week, and not one of them costs extra.",
  "Spin, yoga, barre, Zumba, Pilates, tai chi, kettlebell, Drums Alive and the rest \u2014 turn up to any of them on the membership you already have.")}

${fullBleed(photos.reformer, "Reformers, barre and mats live in the studio \u2014 you do not bring any of it.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">The ones people search for</p><h2>Classes people<br>ask about most</h2></div>
    <div><p class="lede">These six are the ones people ask about most. Everything else runs just as often \u2014
    it is all on the board below.</p></div>
  </div>
  <div class="grid g3" style="margin-top:clamp(34px,4vw,52px)">
    ${classPages.map(c => `<a class="card rv" href="${u("/classes/" + c.slug + "/")}">
      <h3>${c.name}</h3><p>${c.blurb}</p><span class="more">More \u2192</span></a>`).join("")}
  </div>
</div></section>

${fullBleed(photos.barre, "Two purpose-built studios \u2014 a spin room and a yoga, Pilates and dance studio.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Everything else</p><h2>Also on the board<br>every week</h2></div>
    <div><p class="lede">These run just as often \u2014 they simply do not need a page.</p></div>
  </div>
  <div class="tw" style="margin-top:clamp(30px,3.5vw,44px)"><table>
    <thead><tr><th scope="col">Class</th><th scope="col">Where</th><th scope="col">What it is</th><th scope="col">Times a week</th></tr></thead>
    <tbody>${classes.filter(c => !c.slug).map(c => {
      const n = sessions.filter(x => x.name === c.name).length;
      return `<tr><td><b>${esc(c.name)}</b></td><td class="who">${esc(c.room || "\u2014")}</td>
      <td>${esc(c.blurb)}</td><td class="t-time">${n || "\u2014"}</td></tr>`; }).join("")}</tbody>
  </table></div>
</div></section>

<section class="sec sec-tint"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">First time</p><h2>How it works</h2></div>
    <div>${steps([
      ["Check the board", "Every session on our schedule shows whether childcare is open at that hour."],
      ["Turn up a few minutes early", "Tell the instructor it is your first one. That is the whole process."],
      ["Bring water and a towel", "Mats, blocks, bands and weights are in the studios already."],
      ["There is nothing to pay", "Classes are part of the membership. No class fee, no booking, no app."],
    ])}</div>
  </div>
</div></section>

${band("Your first one is on us \u2014 because they all are.",
  "Classes are included with membership. Come a few minutes early and tell the instructor it is your first.",
  [["/schedule/", "The schedule"], [`tel:${biz.tel}`, `Call ${biz.phone}`, "btn-ghost"]])}
`);

for (const c of classPages) {
  const rows = sessionsFor([c.name.toLowerCase().split(" ")[0]]);
  P(`/classes/${c.slug}/`, `${c.name} Classes in Red Bluff | ${biz.short}`,
    `${c.name} at Tehama Family Fitness Center, Red Bluff — ${rows.length} sessions a week, included with membership. ${c.blurb}`,
    `
${phero(photos[c.hero], { kick: `${rows.length} a week \u00b7 included with membership`,
  h1: `${c.name.replace(/ (.*)$/, " <em>$1</em>")}`,
  lede: c.blurb })}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">When it runs</p><h2>${rows.length} time${rows.length === 1 ? "" : "s"}<br>a week</h2>
      <p class="lede">Every row shows whether childcare is open at that hour \u2014 which is usually the
      thing that decides whether you make it.</p>
      ${has("scheduleSignedOff") ? "" : `<p style="margin-top:18px;color:var(--ink-3);font-size:.92rem">
      Straight from our live calendar. Call ${biz.phone} if you are coming for one class in particular.</p>`}</div>
    <div>${miniTable(rows)}</div>
  </div>
</div></section>

${statement(`Included. No class fee, nothing to book.`,
  `${c.name} is part of the membership, like every other class on the board. Turn up a few minutes early the first time and tell the instructor it is your first one \u2014 that is the whole process.`)}

${spread(photos[c.hero === "studio" ? "barre" : "studio"], { eyebrow: "What actually happens", flip: true,
  h2: "In the room",
  body: c.what,
  list: [`<b>Where:</b> ${c.room}`, `<b>Bring:</b> ${c.bring}`,
         "Mats, blocks, bands and weights are already in the studio",
         "Included with membership \u2014 there is nothing to pay"] })}

${fullBleed(photos[c.hero2] || photos.studio, `${c.room} \u2014 where ${c.name} runs.`)}

<section class="sec sec-tint"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">More on the board</p><h2>Other classes<br>you might like</h2></div>
    <div class="grid g2">
      ${classPages.filter(x => x.slug !== c.slug).slice(0, 4).map(x =>
        `<a class="card rv" href="${u("/classes/" + x.slug + "/")}"><h3>${x.name}</h3>
        <p>${x.blurb}</p><span class="more">More \u2192</span></a>`).join("")}
    </div>
  </div>
  <p style="margin-top:30px"><a class="btn btn-out" href="${u("/classes/")}">All ${counts.classes} classes \u2192</a></p>
</div></section>

${band("It's included. Just turn up.",
  `${c.name} is part of the membership \u2014 no class fee and nothing to book.`,
  [["/schedule/", "Full schedule"], ["/membership/", "Membership", "btn-ghost"], [`tel:${biz.tel}`, `Call ${biz.phone}`, "btn-ghost"]])}
`);
}

/* =========================== INSTRUCTORS ============================== */
P("/instructors/", `Meet the Instructors | ${biz.short} Red Bluff`,
  `The 15 instructors teaching ${counts.classes} classes a week at Tehama Family Fitness Center in Red Bluff, and what each of them teaches.`,
  `
${phero(photos.barre, { kick: "Fifteen people",
  h1: "The <em>instructors</em>",
  lede: `Between them they teach ${counts.classes} classes a week. Some of them own the place.` })}

${NAMES ? statement("Three of the people on this list own the building.",
  "Karla teaches the six o'clock spin class. Aubrie has Lean & Mean most weekday mornings. Kyle is in the studio on Wednesday evenings. You will not find that at a franchise.") : ""}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Who's on the board</p><h2>Fifteen names,<br>and what they teach</h2></div>
    <div><p class="lede">Most have been here for years. If you are nervous about walking into a class,
    pick a name, turn up a few minutes early and say it is your first one \u2014 that is all it takes.</p></div>
  </div>
  <div class="grid g3" style="margin-top:clamp(34px,4vw,52px)">
    ${instructors.map(i2 => {
      const n = sessions.filter(x => x.who === i2.name).length;
      const own = owners.people.find(o => o.name.split(" ")[0] === i2.name);
      return `<div class="card rv"><h3>${esc(i2.name)}${own && NAMES ? ` <span class="tag tag-cc">${own.role}</span>` : ""}</h3>
      <p>${i2.teaches.length ? esc(i2.teaches.join(" \u00b7 ")) : "On the schedule."}</p>
      <p style="margin-top:12px;color:var(--ink-3);font-size:.9rem">${n} session${n === 1 ? "" : "s"} a week</p></div>`;
    }).join("")}
  </div>
</div></section>

${spread(photos.frontdesk, { eyebrow: "And at the desk", flip: true,
  h2: "You'll also meet<br>Courtney and Alma",
  body: `<b>${staff.frontDesk}</b> is on the front desk and <b>${staff.childcare}</b> runs the childcare room. In a town of fourteen thousand, knowing who is going to be there when you walk in is most of the reason people pick one gym over another.`,
  cta: ["/schedule/", "Find their class \u2192"] })}

${fullBleed(photos.studio, "Most of them teach in this room, most weeks of the year.")}

<section class="sec sec-tint"><div class="wrap narrow">
  <div class="hold"><b>Photos coming</b>
  Fifteen real faces, not fifteen stock portraits. They go up as we take them.</div>
</div></section>

${band("Find their class on the board.", "Every instructor, every session, one page.",
  [["/schedule/", "The schedule"], ["/classes/", "All classes", "btn-ghost"]])}
`);

/* ========================== SILVERSNEAKERS =========================== */
P("/silversneakers/", `SilverSneakers in Red Bluff | ${biz.short}`,
  `SilverSneakers at Tehama Family Fitness Center, Red Bluff: Classic Monday/Wednesday/Friday, Cardio Circuit Tuesday/Thursday, and tai chi every weekday morning.`,
  `
${phero(photos.circuit, { kick: "SilverSneakers",
  h1: "Programming, not just a <em>card reader</em>",
  lede: "Plenty of places accept the card. The question is what is actually on when you get there." })}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">On the board for you</p><h2>Every weekday morning, all year</h2></div>
    <div><p class="lede">Tai chi runs at 7:15 five days a week without exception, and there is a
    SilverSneakers class most days on top of it. This is not a card the front desk swipes and forgets
    about \u2014 it is a standing part of the schedule.</p></div>
  </div>
  <div style="margin-top:clamp(34px,4vw,56px)">${miniTable(sessionsFor(["silversneakers", "tai chi"]))}</div>
</div></section>

${statement("Tai chi at 7:15. Five mornings a week. Every week.",
  "Standing the whole time, slow weight-shifting forms, easy on the joints and genuinely hard on your balance \u2014 which is the point. It is the most consistently scheduled thing in this building.")}

${spread(photos.stretch, { eyebrow: "Low impact", flip: true,
  h2: "Easy on the joints,<br>hard on your balance",
  body: "Tai chi is standing work, slow weight shifts, no impact at all. Stretch & Mobility, Mat Pilates and Yoga Easy Flow are the same idea. If a treadmill is out of the question, this is the corner of the building to start in.",
  cta: ["/classes/tai-chi/", "About tai chi \u2192"] })}

<section class="sec sec-tint"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Getting started</p><h2>It takes one visit</h2></div>
    <div>${steps([
      ["Bring your card to the front desk", "Whoever is on will take it from there. If you are not sure your plan includes SilverSneakers, call first and ask \u2014 the desk handles this every week."],
      ["Come a few minutes early to your first class", "Tell the instructor it is your first one. Tai chi at 7:15 is the easiest place to start."],
      ["Use the rest of the building", "The sauna, the cardio deck, the courts and the weight floor are all part of it."],
    ])}</div>
  </div>
  <div style="margin-top:34px">${askBox("Not sure if you're eligible?", "priceSenior",
    "Call the desk with your plan details and they will check for you.")}</div>
</div></section>

${fullBleed(photos.sauna, "A sauna in both locker rooms \u2014 the recovery end of this building is better equipped than most.")}

${band("Come at 7:15 and start with tai chi.", "Every weekday morning, all year.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/schedule/", "Full schedule", "btn-ghost"]])}
`);

/* ========================== GYM RED BLUFF ============================ */
P("/gym-red-bluff/", `Gyms in Red Bluff, CA — An Honest Comparison | ${biz.short}`,
  `Choosing a gym in Red Bluff? Here's what Tehama Family Fitness Center has that the alternatives don't — and where we're genuinely the wrong choice.`,
  `
${phero(photos.exteriorDay, { kick: "Choosing a gym in Red Bluff",
  h1: "What's actually <em>different</em>",
  lede: "There are three gyms in this town. We are going to tell you where we win and where we do not, because you are going to find out either way." })}

<section class="sec sec-hot"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Only here</p><h2>Six things you cannot<br>get anywhere else in town</h2></div>
    <div><p class="lede">Checked against both competitors. Every one of these is a fact about what is
    in the buildings, not a marketing claim.</p></div>
  </div>
  <div class="feats" style="margin-top:clamp(34px,4vw,52px)">
    ${onlyHere.map(([t, d], i2) => `<div class="feat rv" style="cursor:default">
      <span class="n">${String(i2 + 1).padStart(2, "0")}</span>
      <span><h3>${t}</h3><p>${d}</p></span><span class="arw">\u00b7</span></div>`).join("")}
  </div>
</div></section>

${statement("We close at eight. We are a family gym, not a 24-hour box.",
  "We close at eight because the people who work here are going home too. If you train later than that, we are not your gym \u2014 better you hear it now than find out on a Thursday night.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Being straight</p><h2>Where we are the<br>wrong choice</h2></div>
    <div>${steps([
      ["If you train after 8 p.m.", "Red Bluff Health & Fitness runs to 10 and Planet Fitness runs later still. That is a real difference and we are not going to pretend otherwise."],
      ["If price is the only thing that matters", "Planet Fitness publishes $15 a month. We do not have a $15 membership and we are not going to tell you we do."],
      ["If you want a Sunday class", "We are open 8 to 6 with the court and the weight floor available \u2014 but there is nothing on the board."],
    ])}
    <p class="lede" style="margin-top:30px">What you get for the difference is a court you can run at one o'clock, a room to leave the kids in, and ${counts.classes} classes
    that do not cost extra.</p></div>
  </div>
</div></section>

${fullBleed(photos.racquetball, "Racquetball \u2014 the only court in Red Bluff, and neither competitor has one.")}

${spread(photos.exterior, { eyebrow: "Coming from Corning?", flip: true, tone: "hot",
  h2: "Twenty minutes<br>up 99W",
  body: "Same county. There is no full basketball court, no racquetball and no childcare-plus-classes combination between here and there, so a fair number of Corning members make the drive a few times a week.",
  cta: ["/contact/", "Directions \u2192"] })}

${proof()}

${band("Come and compare it yourself.", "Walk in, see the building, then decide.",
  [["/day-pass/", "Day pass"], [`tel:${biz.tel}`, `Call ${biz.phone}`, "btn-ghost"]])}
`);

/* ============================== ABOUT ================================= */
P("/about/", `About — Locally Owned in Red Bluff Since 2001 | ${biz.short}`,
  `Tehama Family Fitness Center has been on South Main in Red Bluff since September 2001 — 30,000 square feet, locally owned, with the owners still teaching classes on the schedule.`,
  `
${phero(photos.exteriorDay, { kick: "South Main Street \u00b7 since September 2001",
  h1: "In the <em>same building</em> since 2001",
  lede: "Thirty thousand square feet on the south end of Red Bluff, opened in September 2001 and locally owned the whole time. Not a franchise, not a chain, no head office in another state." })}

<section class="sec"><div class="wrap">
  ${numbers([[String(new Date().getFullYear() - biz.founded), "years on South Main"],
             [biz.sqft, "square feet"], [String(counts.classes), "classes a week"],
             ["15", "instructors"]], false)}
</div></section>

${NAMES ? `
${statement("The person taking your six o'clock spin class owns the building.",
  "That is not a figure of speech. Look at the class schedule and you will find them on it \u2014 which is a thing that cannot be said of a single competitor in this county.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Who runs it</p><h2>A family, and they are<br>on the schedule</h2>
      <p class="lede">Karla, Aubrie and Kyle are on the board every week. In a town of fourteen thousand
      you already know who they are \u2014 here they are with their names on.</p></div>
    <div>${steps(owners.people.map(o => [
      `${esc(o.name)} \u2014 ${esc(o.role.toLowerCase().replace("opened the club in", "opened the doors in"))}`,
      `${esc(o.note)}${o.teaches ? ` Teaches ${esc(o.teaches)}.` : ""}`]))}
      <p style="margin-top:22px;color:var(--ink-3);font-size:.9rem">Ownership and founding details as
      reported in <em>Enjoy Magazine</em> (January 2019) and <em>North State Parent</em>.</p></div>
  </div>
</div></section>` : `
<section class="sec"><div class="wrap narrow">
  <h2>Locally owned and operated</h2><p class="lede">Same family, same building, since 2001.</p>
</div></section>`}

${spread(photos.frontdesk, { eyebrow: "What we're for", flip: true,
  h2: "Second to none in quality,<br>cleanliness and service",
  body: "That is what we are aiming at, every day. Our staff are nationally accredited college graduates, personal trainers, exercise physiologists, strength and conditioning specialists, certified nutrition consultants, college athletes and certified instructors.",
  list: [`You will meet <b>${staff.frontDesk}</b> at the front desk`,
         `<b>${staff.childcare}</b> runs the childcare room`,
         "Most of the instructors have been here for years"] })}

${fullBleed(photos.exteriorDusk, "Thirty thousand square feet, single storey, on the south end of town.")}

<section class="sec sec-tint"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Being straight with you</p><h2>We close at eight</h2></div>
    <div><p class="lede">We open at five on weekdays and close at eight. If you train later than that,
    we are not your gym, and you should know that before you join rather than after.</p>
    <div class="quote" style="margin-top:28px">We are a family gym, not a 24-hour box. We close at eight
    because the people who work here are going home too.</div>
    <p style="margin-top:26px"><a class="btn btn-out" href="${u("/gym-red-bluff/")}">How we compare, honestly \u2192</a></p></div>
  </div>
</div></section>

${proof()}

${band("Come and see the building.", "Walk in any day we are open. Ten-minute tour, no pressure.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/tour/", "Take the tour", "btn-ghost"], ["/contact/", "Directions", "btn-ghost"]])}
`);

/* ============================= CONTACT ================================ */
P("/contact/", `Contact &amp; Directions | ${biz.short} Red Bluff`,
  `Tehama Family Fitness Center, 2498 S Main St, Red Bluff CA 96080. Call 530-528-8656. Open Mon–Fri 5am–8pm, Sat–Sun 8am–6pm.`,
  `
${phero(photos.frontdesk, { kick: "2498 S Main St \u00b7 Red Bluff",
  h1: "Come and <em>find us</em>",
  lede: "Open at five on weekdays, eight at weekends. Walk in \u2014 the front desk is right inside the doors.",
  acts: false })}

<section class="sec"><div class="wrap">
  <div class="split">
    <div>
      <p class="eyebrow">Get in touch</p>
      <h2>Call, or just<br>turn up</h2>
      <p class="lede" style="margin-top:26px"><a href="tel:${biz.tel}" style="font-family:var(--disp);font-weight:800;font-size:clamp(1.8rem,3.4vw,2.6rem);letter-spacing:-.04em;text-decoration:none">${biz.phone}</a></p>
      <p class="lede"><a href="mailto:${biz.email}">${biz.email}</a></p>
      <p class="lede" style="margin-top:22px">${biz.street}<br>${biz.city}, ${biz.state} ${biz.zip}</p>
      <p style="margin-top:24px"><a class="btn btn-volt" href="https://maps.google.com/?q=${encodeURIComponent(biz.name + " " + biz.addr)}">Directions in Google Maps \u2192</a></p>
    </div>
    <div>
      <div class="tw"><table><caption>Building hours</caption>
        <thead><tr><th scope="col">Day</th><th scope="col">Open</th></tr></thead>
        <tbody>${biz.hours.map(([d, o, c]) => `<tr><td class="t-time">${d}</td><td>${o} \u2013 ${c}</td></tr>`).join("")}</tbody></table></div>
      <div class="tw" style="margin-top:22px"><table><caption>Childcare</caption>
        <thead><tr><th scope="col">Day</th><th scope="col">Open</th></tr></thead>
        <tbody>${biz.childcareHours.map(([d, h]) => `<tr><td class="t-time">${d}</td><td>${h}</td></tr>`).join("")}</tbody></table></div>
    </div>
  </div>
</div></section>

${spread(photos.exteriorDusk, { eyebrow: "Finding us", flip: true,
  h2: "South end of<br>South Main",
  body: "Set back off the road behind the parking lot, on the south end of town. The arched windows are lit from the inside, so it is easy to spot after dark.",
  list: ["Parking out front, no charge", "Level entry through the front doors",
         "About four minutes from St. Elizabeth"] })}

${fullBleed(photos.exterior, "South Main Street, on the south end of town. Parking out front.")}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">Getting here</p><h2>South end of town,<br>on South Main</h2></div>
    <div>${steps([
      ["From I-5", "Take the Red Bluff exits and head for South Main. A few minutes either way."],
      ["From downtown", "Straight down Main. About six minutes."],
      ["From Corning", "About twenty minutes up 99W, same county."],
      ["Parking", "In front of the building, and there is plenty of it."],
    ])}</div>
  </div>
</div></section>

${band("Or just walk in.", "No appointment, no form. The front desk is right inside the doors.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/day-pass/", "First visit", "btn-ghost"]])}
`);

/* =============================== FAQ ================================== */
const FAQ = [
  ["What does a membership cost?", has("priceSingle")
    ? `Single memberships are ${val("priceSingle")} a month.`
    : `Rates aren't published online yet. Call ${biz.phone} and the desk will tell you today's rate — it takes under a minute, and there's no sales process attached to it.`],
  ["Are classes included?", `Yes. All ${counts.classes} of them, every week. There is no class fee, nothing to book and no app to download. Turn up a few minutes early the first time and tell the instructor it's your first one.`],
  ["Do you have childcare?", `Yes, in the building. Mornings 8 to 1 Monday through Saturday, and evenings 4 to 8 Monday through Thursday. Sunday it's closed. Every session on our schedule shows whether the kids' room is open at that hour.`],
  ["Can I try it before I join?", `Walk in any day we're open and ask for a look around. It takes about ten minutes and nobody is going to chase you afterwards.`],
    ["Do you have pickleball?", `Three indoor courts with permanent lines on concrete. Non-member drop-in is ${pickleball.dropIn}. Organised play runs Tuesday evenings and Saturday mornings — call to confirm the week you're coming.`],
  ["What time do you close?", `Eight on weeknights, six on weekends. We're a family gym, not a 24-hour box. If you train after eight, we're honestly not the right gym for you.`],
  ["Do you take SilverSneakers?", `Yes. Bring your card to the front desk. There's SilverSneakers Classic on Monday, Wednesday and Friday, Cardio Circuit on Tuesday and Thursday, and tai chi every weekday morning at 7:15.`],
  ["Is there anything on Sunday?", `The building is open 8 to 6 — court, weights, cardio, all of it — but there are no classes on the board Sunday.`],
  ["How do I join?", `Call ${biz.phone}, or walk in. You can also start a single membership through our online sign-up. For a family, couple, student or senior rate, call — it's faster and you'll get a person.`],
  ["Where are you exactly?", `${biz.addr}, on the south end of town with parking out front.`],
];
P("/faq/", `Questions People Actually Ask | ${biz.short} Red Bluff`,
  `Straight answers about membership, classes, childcare, pickleball and hours at Tehama Family Fitness Center in Red Bluff.`,
  `
${phero(photos.corridor, { kick: "Straight answers",
  h1: "Questions people <em>actually ask</em>",
  lede: "Membership, classes, childcare, pickleball and the hours \u2014 answered plainly.",
  acts: false })}

<section class="sec"><div class="wrap">
  <div class="split">
    <div><p class="eyebrow">The short version</p><h2>Everything is<br>included</h2>
      <p class="lede">One membership, no tiers, no class fee, no court fee, no extras. The two
      things we genuinely cannot answer here are price and a few childcare specifics \u2014 both are one
      phone call away.</p>
      <p style="margin-top:26px"><a class="btn btn-volt" href="tel:${biz.tel}">Call ${biz.phone}</a></p></div>
    <div>${numbers([[String(counts.classes), "classes included"], ["1", "racquetball court"],
                    ["0", "class fees"], ["8pm", "weeknight close", true]], false)}</div>
  </div>
</div></section>

<section class="sec sec-tint"><div class="wrap narrow">
  ${FAQ.map(([q, a]) => `<div class="card rv" style="margin-bottom:16px"><h3>${q}</h3><p style="margin-top:10px">${a}</p></div>`).join("")}
</div></section>

${fullBleed(photos.lobby, "The lobby. Most of the building runs off the corridor behind it.")}

${band("Didn't answer it?", "Call the desk. Somebody there knows.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], [`mailto:${biz.email}`, "Email us", "btn-ghost"]])}
`, { schema: { "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({
  "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })) } });

/* =============================== TOUR ================================= */
P("/tour/", `Take a Look Around | ${biz.short} Red Bluff`,
  `A look inside Tehama Family Fitness Center in Red Bluff — 30,000 square feet, room by room.`,
  `
${phero(photos.exterior, { sm: false, kick: "Room by room",
  h1: "Have a look <em>around</em>",
  lede: "No list conveys thirty thousand square feet. Here is the building, room by room \u2014 then come and stand in it, because that is what actually decides it." })}


<section class="sec"><div class="wrap">
  ${numbers([[biz.sqft, "square feet"], ["1", "storey"], ["25", "amenities"], ["0", "of it behind a second paywall"]], false)}
</div></section>

<section class="sec"><div class="wrap">
  <figure>
  <div class="grid g2 gal">
    ${[
       [photos.basketball, "The court", "Full size, with open gym twice a day."],
       [photos.pickleball, "Pickleball", "Three courts, permanent lines, nets up for league nights."],
       [photos.racquetball, "Racquetball", "The only court in town."],
       [photos.freeweights, "Freeweights", "Racks, benches and an Olympic platform."],
       [photos.womens, "The women's weight room", "Its own room, off the main floor."],
       [photos.studio, "The studio", "Barre, Zumba, Pilates, yoga and most of the schedule."],
       [photos.spin, "The spin room", "Ten sessions a week, most of them before nine."],
       [photos.cardio, "The cardio deck", "Thirty-plus pieces and the cardio theater."],
       [photos.locker, "Locker rooms", "Full service both sides, sauna in each."],
       [photos.childcare, "The kids' room", "Open most of the hours you would actually use it."],
       [photos.fuelbar, "The Fuel Bar", "Coffee is free until nine."],
       [photos.nautilus, "The Wolf Cave", "The new Nautilus and Matrix line, in this year."],
       [photos.platform, "The platform", "You can put a loaded bar on the floor and drop it."],
       [photos.dumbbells, "Dumbbells", "Light to heavy, with benches enough to go round."],
       [photos.circuit, "The circuit room", "Air-pressure machines in a ring — where the SilverSneakers circuit runs."],
       [photos.cardioTheater, "The cardio theater", "Lights down, screens up, treadmills facing them."],
       [photos.crosstrain, "Cross-training", "Rig, boxes, rope and a turf lane for the sled."],
       [photos.stretch, "Stretching", "Mats, rollers and the TRX straps."],
       [photos.reformer, "Reformers", "Racked in the mind-body studio."],
       [photos.kettlebells, "Class kit", "Kettlebells, medicine balls and bands — all provided."],
       [photos.saunaDoor, "The sauna", "One in each locker room."],
       [photos.tanning, "Tanning", "Off the service corridor, included."],
       [photos.lobby, "The lobby", "Where a ten-minute tour starts."],
      ].map(([ph, t, d], gi) => `<figure class="rv">${pimg(ph, { sizes: "(max-width:700px) 46vw, min(46vw, 620px)", eager: gi < 4 })}
      <figcaption><b style="font-family:var(--disp);font-style:normal;color:var(--ink);display:block;font-size:1.05rem;letter-spacing:-.02em">${t}</b>${d}</figcaption></figure>`).join("")}
  </div>
  <figcaption>Three photographs of this building. The rest show rooms like ours \u2014 come stand in the real one.</figcaption>
  </figure>
</div></section>

${spread(photos.frontdesk, { eyebrow: "The fastest tour", flip: true,
  h2: "Is the real one",
  body: "Ten minutes, any day we are open. Somebody will walk you through all of it, the courts included. You will learn more in those ten minutes than we could ever put on a page.",
  cta: ["/day-pass/", "Plan a first visit \u2192"] })}

${proof()}

${band("Come and stand in it.", "Walk in any day. Open till eight weeknights, eight to six weekends.",
  [[`tel:${biz.tel}`, `Call ${biz.phone}`], ["/day-pass/", "First visit", "btn-ghost"], ["/contact/", "Directions", "btn-ghost"]])}
`);

/* ============================== WRITE ================================= */
// Wipe the output first. Without this a page that stops being generated silently
// survives from an earlier build and looks perfectly fine — which is exactly how
// /tour/ went missing for a while without the page count ever looking wrong.
if (existsSync(OUT)) {
  for (const e of readdirSync(OUT)) {
    if (e === ".git" || e === "CNAME") continue;          // keep deploy artefacts
    rmSync(join(OUT, e), { recursive: true, force: true });
  }
}
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, "assets"), join(OUT, "assets"), { recursive: true });

let bytes = 0;
for (const p of PAGES) {
  const dir = p.path === "/" ? OUT : join(OUT, p.path);
  mkdirSync(dir, { recursive: true });
  const html = layout(p);
  writeFileSync(join(dir, "index.html"), html);
  bytes += Buffer.byteLength(html);
}

// sitemap + robots
const HOST = SITE;
writeFileSync(join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  PAGES.map(p => `  <url><loc>${HOST}${p.path}</loc><changefreq>${p.path === "/schedule/" ? "weekly" : "monthly"}</changefreq><priority>${p.path === "/" ? "1.0" : "0.7"}</priority></url>`).join("\n") +
  `\n</urlset>\n`);
writeFileSync(join(OUT, "robots.txt"), PREVIEW
  ? "User-agent: *\nDisallow: /\n"
  : `User-agent: *\nAllow: /\nSitemap: ${HOST}/sitemap.xml\n`);
writeFileSync(join(OUT, ".nojekyll"), "");

// 404
writeFileSync(join(OUT, "404.html"), layout({
  path: "/404.html", title: `Page not found | ${biz.short}`, desc: "That page doesn't exist.",
  body: `<section class="sec"><div class="wrap narrow"><h1>That page isn't here</h1>
  <p class="lede">Try the <a href="${u("/schedule/")}">schedule</a>, the
  <a href="${u("/amenities/")}">building</a>, or just <a href="tel:${biz.tel}">call ${biz.phone}</a>.</p>
  </div></section>` }));

/* ============================= REPORT ================================= */
const du = d => readdirSync(d, { withFileTypes: true }).reduce((n, e) =>
  n + (e.isDirectory() ? du(join(d, e.name)) : statSync(join(d, e.name)).size), 0);
const open_ = Object.entries(tbd).filter(([, t]) => t.v == null || t.v === false);
const needConfirm = Object.entries(tbd).filter(([, t]) => t.verify);

console.log(`\n  Tehama Family Fitness — build complete`);
console.log(`  ${"─".repeat(58)}`);
console.log(`  pages           ${PAGES.length}  (+404, sitemap, robots)`);
console.log(`  html            ${(bytes / 1024).toFixed(0)} KB total, ${(bytes / PAGES.length / 1024).toFixed(1)} KB avg`);
console.log(`  docs/           ${(du(OUT) / 1024 / 1024).toFixed(2)} MB with assets`);
console.log(`  schedule        ${counts.total} sessions · ${counts.classes} classes · ${counts.basketball} basketball · ${counts.pickleball} pickleball`);
console.log(`  base path       ${BASE || "(none — custom domain)"}`);
console.log(`  owner names     ${NAMES ? "SHOWN (attributed)" : "hidden (NAMES=0)"}`);
console.log(`\n  ${open_.length} facts still open — every one renders as an honest ask, not a guess:`);
for (const [k, t] of open_) console.log(`     · ${t.q}`);
if (needConfirm.length) {
  console.log(`\n  ${needConfirm.length} found off-site — CONFIRM before launch:`);
  for (const [, t] of needConfirm) console.log(`     · ${t.q}  [${t.src}]`);
}
console.log(`\n  ${retracted.length} claims held back until the front desk confirms them.`);
// Guard: a retracted claim must not appear ANYWHERE in output — including inside
// meta descriptions and title attributes, which a tag-stripping check cannot see.
const BANNED = [/\bpool\b/i, /\bswim\w*\b/i, /\blap lane/i];
const offenders = [];
(function scan(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const fp = join(dir, e.name);
    if (e.isDirectory()) { scan(fp); continue; }
    if (!e.name.endsWith(".html")) continue;
    const raw = readFileSync(fp, "utf8").replace(/<!--[\s\S]*?-->/g, " ");
    for (const re of BANNED) if (re.test(raw)) { offenders.push(`${fp} :: ${re}`); break; }
  }
})(OUT);
if (offenders.length) {
  console.log(`\n  \u26a0  RETRACTED CLAIM IN OUTPUT (${offenders.length}):`);
  offenders.forEach(o => console.log("     " + o));
  process.exitCode = 1;
} else {
  console.log("  retracted-claim scan: clean");
}
console.log(`  Kids Fit photo held pending a signed release.`);
console.log(`  ${"─".repeat(58)}\n`);
