/* gen/photos.mjs — the real photo shoot → assets/photos/.
   Reads the SHOOT mapping in data.mjs (slot → camera filename), finds each
   file in SHOOT_DIR, and writes <slot>.jpg (up to 2400px) and <slot>-800.jpg.
   Dimensions land in gen/photos.json, which data.mjs reads, so a higher-res
   re-export changes nothing but this one command:

     SHOOT_DIR=~/Downloads/<shoot>/Highlights node gen/photos.mjs

   The September 2026 download was the gallery's WEB-size export (1024px on
   the short side). Ask the photographer for the full-resolution files and
   rerun this — heroes are shown full-width and want ~2400px.

   Separate from gen/images.mjs on purpose: that one rewrites assets/hero/
   from generated stills with --force, and must never touch a real photo. */
import { existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { SHOOT } from "./data.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = process.env.SHOOT_DIR;
const DST = join(ROOT, "assets", "photos");
if (!SRC || !existsSync(SRC)) { console.error("Set SHOOT_DIR to the folder holding the DSC*.jpg files."); process.exit(1); }
mkdirSync(DST, { recursive: true });

const dims = p => {
  const o = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", p]).toString();
  return { w: +o.match(/pixelWidth: (\d+)/)[1], h: +o.match(/pixelHeight: (\d+)/)[1] };
};
const out = {};
for (const [slot, { shot }] of Object.entries(SHOOT)) {
  const src = join(SRC, shot);
  if (!existsSync(src)) { console.log(`  ! ${slot}: ${shot} not in SHOOT_DIR — left as is`); continue; }
  const { w, h } = dims(src);
  const big = join(DST, `${slot}.jpg`), small = join(DST, `${slot}-800.jpg`);
  // Long edge to 2400 at most; never upscale.
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "74", "-Z", String(Math.min(2400, Math.max(w, h))), src, "--out", big], { stdio: "ignore" });
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "72", "--resampleWidth", String(Math.min(800, w)), src, "--out", small], { stdio: "ignore" });
  out[slot] = dims(big);
  console.log(`  + ${slot.padEnd(14)} ${shot}  ${out[slot].w}×${out[slot].h}  ${Math.round(statSync(big).size / 1024)} KB`);
}
writeFileSync(join(ROOT, "gen", "photos.json"), JSON.stringify(out, null, 1) + "\n");
console.log(`\nassets/photos: ${Object.keys(out).length} slots written. Rebuild the site to pick up the new sizes.`);
