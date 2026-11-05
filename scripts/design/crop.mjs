#!/usr/bin/env node
/**
 * Увеличенный фрагмент блока для разглядывания деталей: макет Figma | сайт | арт-эталон.
 * Берёт последний снимок из design/.check/<block>/site@2x.png (сначала запустите compare.mjs).
 *
 *   node scripts/design/crop.mjs --block 01-hero --rect 40,230,310,110 [--zoom 3] [--out file.png]
 *
 * --rect x,y,w,h — в px макета от верха блока.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SCALE = 2;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 2) args[argv[i].slice(2)] = argv[i + 1];
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.block || !args.rect) throw new Error("Нужны --block и --rect x,y,w,h");
  const [x, y, w, h] = args.rect.split(",").map(Number);
  const zoom = Number(args.zoom ?? 3);
  const checkDir = path.join(ROOT, "design/.check", args.block);
  const sources = [
    path.join(ROOT, "design/reference/figma", `${args.block}@2x.png`),
    path.join(checkDir, "site@2x.png"),
    path.join(ROOT, "design/reference/art", `${args.block}@2x.png`),
  ];
  if (!fs.existsSync(sources[1]))
    throw new Error(`Нет снимка ${sources[1]} — сначала запустите compare.mjs`);
  const outWidth = Math.round(w * zoom);
  const outHeight = Math.round(h * zoom);
  const gap = 8;
  const panels = [];
  for (const source of sources) {
    const meta = await sharp(source).metadata();
    const left = Math.max(0, Math.round(x * SCALE));
    const top = Math.max(0, Math.round(y * SCALE));
    const width = Math.min(meta.width - left, Math.round(w * SCALE));
    const height = Math.min(meta.height - top, Math.round(h * SCALE));
    panels.push(
      await sharp(source)
        .extract({ left, top, width, height })
        .flatten({ background: "#F6F5F1" })
        .resize(outWidth, outHeight, { kernel: zoom > SCALE ? "nearest" : "lanczos3", fit: "fill" })
        .png()
        .toBuffer(),
    );
  }
  const out = path.resolve(args.out ?? path.join(checkDir, `crop-${x}-${y}-${w}-${h}.png`));
  await sharp({
    create: {
      width: outWidth * 3 + gap * 2,
      height: outHeight,
      channels: 3,
      background: "#ff00ff",
    },
  })
    .composite(panels.map((input, index) => ({ input, left: index * (outWidth + gap), top: 0 })))
    .png()
    .toFile(out);
  console.log(
    `${path.relative(ROOT, out)}  (макет Figma | сайт | арт-эталон, увеличение ×${zoom})`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
