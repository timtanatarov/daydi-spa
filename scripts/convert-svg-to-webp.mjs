import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR = path.join(process.cwd(), "src/assets/course-landing");

function scaleForViewBox(width, height) {
  const minDim = Math.min(width, height);
  if (minDim >= 20) return 2;
  if (minDim < 1) return Math.ceil(8 / minDim);
  return Math.max(2, Math.ceil(4 / minDim));
}

async function convertSvg(fileName) {
  const svgPath = path.join(ASSETS_DIR, fileName);
  const content = await fs.readFile(svgPath, "utf8");
  const match = content.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!match) throw new Error(`No viewBox in ${fileName}`);

  const width = Number.parseFloat(match[1]);
  const height = Number.parseFloat(match[2]);
  const scale = scaleForViewBox(width, height);
  const outWidth = Math.max(1, Math.round(width * scale));
  const outHeight = Math.max(1, Math.round(height * scale));
  const webpPath = svgPath.replace(/\.svg$/i, ".webp");

  await sharp(svgPath, { density: 72 * scale })
    .resize(outWidth, outHeight, { fit: "fill" })
    .webp({ quality: 92, effort: 6 })
    .toFile(webpPath);

  console.log(`${fileName} -> ${path.basename(webpPath)} (${outWidth}x${outHeight})`);
}

const entries = await fs.readdir(ASSETS_DIR);
const svgs = entries.filter((name) => name.endsWith(".svg"));
await Promise.all(svgs.map(convertSvg));
