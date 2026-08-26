/* gen/images.mjs — turn raw generations in gen-img/ into web-sized files in assets/hero/.
   Raw PNGs are ~8 MB each and gitignored; only the output here is committed.
   Run: node gen/images.mjs            (only converts what's missing)
        node gen/images.mjs --force    (redo everything)
   Needs macOS `sips`, which is already on the box — no npm dependency. */

import { readdirSync, existsSync, statSync, mkdirSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

// fileURLToPath, not url.pathname — the repo path has a space in it.
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "gen-img");
const DST = join(ROOT, "assets", "hero");
/* Two widths, not one. Everything used to ship at 2000px even in the tour grid,
   where it renders about 335px wide on a phone — so a single page could pull
   ~10 MB and every lazy image arrived late, which reads as blank space while
   you scroll. The 800px variant is what almost every non-hero slot actually
   needs; srcset in build.mjs picks between them. */
const SIZES = [[2000, 62], [800, 66]];   // [width, jpeg quality]
const force = process.argv.includes("--force");

mkdirSync(DST, { recursive: true });

const src = readdirSync(SRC).filter(f => /\.(png|jpe?g)$/i.test(f)).sort();
let made = 0, kept = 0;

for (const f of src) {
  const name = basename(f, extname(f));

  for (const [w, q] of SIZES) {
    const out = join(DST, w === 2000 ? `${name}.jpg` : `${name}-${w}.jpg`);
    if (existsSync(out) && !force) { kept++; continue; }

    const tmp = join(DST, `.tmp-${name}-${w}.jpg`);
    execFileSync("sips", ["-s", "format", "jpeg",
                          "-s", "formatOptions", String(q),
                          "--resampleWidth", String(w),
                          join(SRC, f), "--out", tmp], { stdio: "ignore" });
    execFileSync("mv", [tmp, out]);
    console.log(`  + ${basename(out)}  ${Math.round(statSync(out).size / 1024)} KB`);
    made++;
  }
}

// Anything in assets/hero with no source left behind is stale.
for (const f of readdirSync(DST).filter(f => f.startsWith(".tmp-"))) unlinkSync(join(DST, f));

console.log(`\nassets/hero: ${made} written, ${kept} already current, ${src.length} sources.`);
