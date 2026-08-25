# Tehama Family Fitness Center — website

Static site for Tehama Family Fitness Center, 2498 S Main St, Red Bluff, CA.
28 pages, generated from one data file. No framework, no build toolchain.

**⚠️ This is a work-in-progress preview, not the live site.** Some facts on it are still
waiting on confirmation from the front desk — see `client/FRONT-DESK-CALL-SHEET.md`.

## Build

```
node gen/build.mjs                       # custom-domain build → docs/
BASE=/tehama-family-fitness PREVIEW=1 node gen/build.mjs   # GitHub Pages preview
```

`docs/` is wiped and regenerated on every run. Never edit it by hand.

| flag | effect |
|---|---|
| `BASE` | path prefix for project Pages hosting |
| `PREVIEW=1` | `noindex`, `robots: Disallow`, preview banner, canonical → preview URL |
| `NAMES=0` | hides owner names until the family signs off on how they're described |

## Layout

- `gen/data.mjs` — every fact, plus the `tbd` registry. Anything unconfirmed renders as an
  honest ask ("text us and we'll send the number"), never as a made-up value.
- `gen/build.mjs` — the generator. All markup, CSS and JS live here.
- `assets/` — web-sized imagery actually served by the site.
- `client/FRONT-DESK-CALL-SHEET.md` — the open questions blocking launch.
- `research/` — source data, adversarial reviews, the live-calendar parse.

## What still blocks launch

1. **Prices.** Nothing is published anywhere, and the online sign-up shows no dollar figure
   and no family option — at a business with "Family" in its name.
2. **The schedule**, reconciled on paper. The printed sheet, the live calendar and Facebook
   disagree; rows marked ⚑ are the conflicts.
3. **Childcare specifics** — ages, registration, first visit, pickup.
4. **Photography.** Only three real photographs of this business exist. Everything else is
   commissioned stand-in imagery, people-free by design. Swap the file and flip `real: true`
   in `photos` when the walkthrough lands.
5. **Ownership**, confirmed with the family, and how they want to be named.

## Standing rules

No invented facts. No synthetic people in imagery, and never children. No comparative claim
that hasn't been checked against both competitors. A neighbouring business's website is not a
source about this one.
