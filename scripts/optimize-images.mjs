/**
 * scripts/optimize-images.mjs
 *
 * Generates compressed WebP variants of the hero background image for fast
 * web delivery. Run once before deploying:
 *   node scripts/optimize-images.mjs
 *
 * Outputs (written to public/images/):
 *   couple-portrait.webp          — desktop, up to 1920 px wide, quality 82
 *   couple-portrait-mobile.webp   — mobile,  up to  900 px wide, quality 82
 *
 * Quality 82 is visually indistinguishable from the original JPEG at normal
 * viewing distances while cutting file size by ~85-90%.
 */

import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(root, "public", "images", "couple-portrait.jpg");
const outDir = path.join(root, "public", "images");

async function run() {
  if (!fs.existsSync(src)) {
    console.error(`Source image not found: ${src}`);
    process.exit(1);
  }

  const meta = await sharp(src).metadata();
  console.log(`Source: ${meta.width}×${meta.height} px  (${(fs.statSync(src).size / 1024).toFixed(0)} KB)`);

  // --- Desktop WebP (max 1920 px wide) ---
  const desktopOut = path.join(outDir, "couple-portrait.webp");
  await sharp(src)
    .resize({
      width: 1920,
      withoutEnlargement: true, // never upscale
    })
    .webp({ quality: 82, effort: 6 })
    .toFile(desktopOut);

  const desktopSize = (fs.statSync(desktopOut).size / 1024).toFixed(0);
  console.log(`✓ couple-portrait.webp       ${desktopSize} KB`);

  // --- Mobile WebP (max 900 px wide) ---
  const mobileOut = path.join(outDir, "couple-portrait-mobile.webp");
  await sharp(src)
    .resize({
      width: 900,
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 6 })
    .toFile(mobileOut);

  const mobileSize = (fs.statSync(mobileOut).size / 1024).toFixed(0);
  console.log(`✓ couple-portrait-mobile.webp ${mobileSize} KB`);

  console.log("\nDone. Commit the generated .webp files to your repo.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
