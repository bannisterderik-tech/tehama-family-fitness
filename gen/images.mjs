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
const WIDTH = 2000;          // matches the existing heroes
const QUALITY = 62;          // sips 0-100; the 21:9 heroes land ~150-300 KB here
const force = process.argv.includes("--force");

mkdirSync(DST, { recursive: true });

const src = readdirSync(SRC).filter(f => /\.(png|jpe?g)$/i.test(f)).sort();
let made = 0, kept = 0;

for (const f of src) {
  const name = basename(f, extname(f));
  const out = join(DST, `${name}.jpg`);
  if (existsSync(out) && !force) { kept++; continue; }

  const tmp = join(DST, `.tmp-${name}.jpg`);
  execFileSync("sips", ["-s", "format", "jpeg",
                        "-s", "formatOptions", String(QUALITY),
                        "--resampleWidth", String(WIDTH),
                        join(SRC, f), "--out", tmp], { stdio: "ignore" });
  execFileSync("mv", [tmp, out]);
  const kb = Math.round(statSync(out).size / 1024);
  console.log(`  + ${name}.jpg  ${kb} KB`);
  made++;
}

// Anything in assets/hero with no source left behind is stale.
for (const f of readdirSync(DST).filter(f => f.startsWith(".tmp-"))) unlinkSync(join(DST, f));

console.log(`\nassets/hero: ${made} written, ${kept} already current, ${src.length} sources.`);
