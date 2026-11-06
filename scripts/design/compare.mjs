#!/usr/bin/env node
/**
 * Сверка блока лендинга с макетом: снимок в 390px @2x, попиксельная сверка арта
 * и числовая сверка каждого текстового слоя (координаты, кегль, строки) со спецификацией.
 *
 *   node scripts/design/compare.mjs --block 01-hero
 *     [--url http://localhost:3000/]   страница с блоком (по умолчанию — главная)
 *     [--base http://localhost:3000] [--out design/.check/01-hero]
 *
 * Результат: <out>/site@2x.png, <out>/compare.png (макет Figma | сайт | расхождения арта),
 * <out>/report.json и краткий отчёт в консоли. Код выхода 1, если есть расхождения.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const REF = path.join(ROOT, "design/reference");
const SCALE = 2;
const TOL = { bounds: 0.6, fontSize: 0.05, leading: 0.05, lineX: 1, baseline: 0.8, lineWidth: 1 };

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) args[key.slice(2)] = true;
    else {
      args[key.slice(2)] = next;
      i += 1;
    }
  }
  return args;
}

const round = (value) => Math.round(value * 100) / 100;
const normFamily = (name) => name.toLowerCase().replace(/[^a-zа-я]/g, "");
const normText = (text) =>
  text
    .replace(/[\u00a0\u2028\u2029\n\r\t]+/g, " ")
    .replace(/\u2022/g, "")
    .replace(/\s+/g, " ")
    .trim();

function rgbToHex(color) {
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (!match) return color;
  const [r, g, b] = match[1].split(",").map((part) => Number.parseFloat(part));
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

async function loadRgb(file) {
  const { data, info } = await sharp(file)
    .flatten({ background: "#F6F5F1" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

function checkTexts(spec, measured) {
  const problems = [];
  const byFig = new Map();
  for (const item of measured.items ?? []) {
    if (!byFig.has(item.fig)) byFig.set(item.fig, []);
    byFig.get(item.fig).push(item);
  }
  const specFigs = new Set(spec.texts.map((text) => text.fig));
  let checked = 0;
  for (const text of spec.texts) {
    if (text.ghost) continue;
    const label = `${text.fig} «${normText(text.characters).slice(0, 28)}»`;
    const found = byFig.get(text.fig);
    if (!found) {
      problems.push({
        fig: text.fig,
        kind: "missing",
        message: `${label}: слоя нет на странице (data-fig)`,
      });
      continue;
    }
    const item = found[0];
    checked += 1;
    const add = (kind, message) =>
      problems.push({ fig: text.fig, kind, message: `${label}: ${message}` });
    if (!item.text) {
      add("text", "элемент найден, но в нём нет текста");
      continue;
    }
    const b = item.bounds;
    const e = text.bounds;
    const delta = {
      x: b.x - e.x,
      y: b.y - e.y,
      width: b.width - e.width,
      height: b.height - e.height,
    };
    if (Object.values(delta).some((value) => Math.abs(value) > TOL.bounds)) {
      add(
        "bounds",
        `габариты x/y/w/h = ${b.x}/${b.y}/${b.width}/${b.height}, по макету ${e.x}/${e.y}/${e.width}/${e.height} (Δ ${round(delta.x)}/${round(delta.y)}/${round(delta.width)}/${round(delta.height)})`,
      );
    }
    const t = item.text;
    if (Math.abs(t.fontSize - text.size) > TOL.fontSize)
      add("font-size", `кегль ${t.fontSize}, нужен ${text.size}`);
    if (t.lineHeight === "normal" || Math.abs(t.lineHeight - text.leading) > TOL.leading) {
      add("line-height", `интервал ${t.lineHeight}, нужен ${text.leading}`);
    }
    const family = normFamily(t.fontFamily.split(",")[0]);
    const expectedFamily = normFamily(text.font.family);
    const familyOk =
      family.startsWith(expectedFamily) &&
      (expectedFamily !== "playfair" || !family.startsWith("playfairdisplay"));
    if (!familyOk)
      add("font-family", `шрифт ${t.fontFamily.split(",")[0]}, нужен ${text.font.family}`);
    if (Number(t.fontWeight) !== text.font.weight)
      add("font-weight", `насыщенность ${t.fontWeight}, нужна ${text.font.weight}`);
    if ((t.fontStyle === "italic") !== text.font.italic)
      add("font-style", `курсив ${t.fontStyle}, нужен ${text.font.italic ? "italic" : "normal"}`);
    if (rgbToHex(t.color) !== text.color.toUpperCase())
      add("color", `цвет ${rgbToHex(t.color)}, нужен ${text.color}`);
    const align = t.textAlign === "start" ? "left" : t.textAlign === "end" ? "right" : t.textAlign;
    if (align !== text.align) add("align", `выравнивание ${align}, нужно ${text.align}`);
    const spacing = t.letterSpacing === "normal" ? 0 : Number.parseFloat(t.letterSpacing);
    const expectedSpacing = (text.tracking ?? 0) * text.size;
    if (Math.abs(spacing - expectedSpacing) > 0.03)
      add(
        "tracking",
        `трекинг ${spacing}px, нужен ${round(expectedSpacing)}px (${text.tracking ?? 0}em)`,
      );
    if (text.shadow && !t.textShadow) add("shadow", `нет тени текста, нужна ${text.shadow}`);
    if (item.opacity !== 1 || item.visible === false)
      add("visibility", `прозрачность ${item.opacity}, видимость ${item.visible}`);

    const expectedChars = normText(text.lines.map((line) => line.text).join(" "));
    const actualChars = normText(t.characters);
    if (expectedChars !== actualChars)
      add(
        "characters",
        `текст «${actualChars.slice(0, 60)}», в макете «${expectedChars.slice(0, 60)}»`,
      );

    if (t.lines.length !== text.lines.length) {
      add(
        "lines",
        `строк ${t.lines.length}, в макете ${text.lines.length} (переносы должны совпадать с макетом)`,
      );
    } else {
      text.lines.forEach((line, index) => {
        const actual = t.lines[index];
        const dx = actual.x - line.x;
        const dw = actual.width - line.width;
        const db = actual.baselineY === null ? 0 : actual.baselineY - line.baselineY;
        // Inter на сайте версии 4 (Google Fonts), в макете — 3.19: ширина строк расходится до ~2.5%.
        // Владелец сайта решил оставить Inter 4, поэтому для него допуск шире.
        const widthTol = Math.max(
          TOL.lineWidth,
          line.width * (text.font.family === "Inter" ? 0.03 : 0.012),
        );
        if (
          Math.abs(dx) > TOL.lineX + widthTol / 2 ||
          Math.abs(dw) > widthTol ||
          Math.abs(db) > TOL.baseline
        ) {
          add(
            "line",
            `строка ${index + 1} «${line.text.slice(0, 24)}»: x ${actual.x} (нужно ${line.x}), ширина ${actual.width} (нужно ${line.width}), базовая линия ${actual.baselineY} (нужно ${line.baselineY})`,
          );
        }
      });
    }
  }
  const extra = [...byFig.keys()].filter((fig) => !specFigs.has(fig));
  const required = spec.texts.filter((text) => !text.ghost).length;
  const ghostsRendered = spec.texts
    .filter((text) => text.ghost && byFig.has(text.fig))
    .map((text) => text.fig);
  return { problems, checked, total: required, extra, ghostsRendered };
}

async function checkArt(spec, measured, siteFile, artFile, figmaFile, outFile) {
  const [site, art, figma] = await Promise.all([
    loadRgb(siteFile),
    loadRgb(artFile),
    loadRgb(figmaFile),
  ]);
  const result = {
    siteSize: `${site.width}x${site.height}`,
    expectedSize: `${art.width}x${art.height}`,
  };
  if (site.width !== art.width || site.height !== art.height) {
    return { ...result, sizeMismatch: true };
  }
  const { width, height } = art;
  const mask = new Uint8Array(width * height);
  const cover = (rect, pad) => {
    const x0 = Math.max(0, Math.floor((rect.x - pad) * SCALE));
    const x1 = Math.min(width, Math.ceil((rect.x + rect.width + pad) * SCALE));
    const y0 = Math.max(0, Math.floor((rect.y - pad) * SCALE));
    const y1 = Math.min(height, Math.ceil((rect.y + rect.height + pad) * SCALE));
    for (let y = y0; y < y1; y += 1) mask.fill(1, y * width + x0, y * width + x1);
  };
  for (const text of spec.texts) if (!text.ghost) cover(text.bounds, 3 + text.size * 0.35);
  for (const deviation of spec.deviations ?? []) cover(deviation.rect, 2);
  for (const item of measured.items ?? []) cover(item.bounds, 3);

  const TILE = 30 * SCALE;
  const cols = Math.ceil(width / TILE);
  const rows = Math.ceil(height / TILE);
  const tiles = Array.from({ length: cols * rows }, () => ({ sum: 0, count: 0, over: 0 }));
  const heat = Buffer.alloc(width * height * 3);
  let sum = 0;
  let count = 0;
  let over16 = 0;
  let over40 = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = y * width + x;
      const p = i * 3;
      const gray = Math.round((site.data[p] + site.data[p + 1] + site.data[p + 2]) / 3) * 0.4 + 140;
      if (mask[i]) {
        heat[p] = gray * 0.75;
        heat[p + 1] = gray * 0.85;
        heat[p + 2] = Math.min(255, gray * 1.15);
        continue;
      }
      const d = Math.max(
        Math.abs(site.data[p] - art.data[p]),
        Math.abs(site.data[p + 1] - art.data[p + 1]),
        Math.abs(site.data[p + 2] - art.data[p + 2]),
      );
      sum += d;
      count += 1;
      if (d > 16) over16 += 1;
      if (d > 40) over40 += 1;
      const tile = tiles[Math.floor(y / TILE) * cols + Math.floor(x / TILE)];
      tile.sum += d;
      tile.count += 1;
      if (d > 24) tile.over += 1;
      if (d > 40) {
        heat[p] = 255;
        heat[p + 1] = 0;
        heat[p + 2] = 160;
      } else if (d > 16) {
        heat[p] = 255;
        heat[p + 1] = 170;
        heat[p + 2] = 0;
      } else {
        heat[p] = gray;
        heat[p + 1] = gray;
        heat[p + 2] = gray;
      }
    }
  }
  const badTiles = [];
  tiles.forEach((tile, index) => {
    if (tile.count < 40) return;
    const mean = tile.sum / tile.count;
    const overPct = (100 * tile.over) / tile.count;
    if (mean > 6 || overPct > 6) {
      badTiles.push({
        x: (index % cols) * 30,
        y: Math.floor(index / cols) * 30,
        mean: round(mean),
        overPct: round(overPct),
      });
    }
  });
  badTiles.sort((a, b) => b.mean - a.mean);

  const half = async (buffer) =>
    sharp(buffer, { raw: { width, height, channels: 3 } })
      .resize({ width: Math.round(width / SCALE) })
      .png()
      .toBuffer();
  const panelWidth = Math.round(width / SCALE);
  const gap = 12;
  const panels = await Promise.all([half(figma.data), half(site.data), half(heat)]);
  await sharp({
    create: {
      width: panelWidth * 3 + gap * 2,
      height: Math.round(height / SCALE),
      channels: 3,
      background: "#ff00ff",
    },
  })
    .composite(panels.map((input, index) => ({ input, left: index * (panelWidth + gap), top: 0 })))
    .png()
    .toFile(outFile);

  return {
    ...result,
    meanDiff: round(sum / Math.max(1, count)),
    over16Pct: round((100 * over16) / Math.max(1, count)),
    over40Pct: round((100 * over40) / Math.max(1, count)),
    comparedPct: round((100 * count) / (width * height)),
    badTiles: badTiles.slice(0, 25),
    badTilesTotal: badTiles.length,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (typeof args.block !== "string") throw new Error("Нужен --block, например --block 01-hero");
  const block = args.block;
  const specFile = path.join(REF, "spec", `${block}.json`);
  if (!fs.existsSync(specFile)) throw new Error(`Нет спецификации ${specFile}`);
  const spec = JSON.parse(fs.readFileSync(specFile, "utf8"));
  // блок перекомпонован на сайте (например, под крупный шрифт): макет ему больше не образец
  if (spec.redesigned) {
    console.log(`== ${block}: ПЕРЕКОМПОНОВАН НА САЙТЕ, с макетом не сверяется ==`);
    console.log(spec.redesigned);
    return;
  }
  const base = typeof args.base === "string" ? args.base : "http://localhost:3000";
  const url = typeof args.url === "string" ? args.url : `${base}/`;
  // состояние, нарисованное в макете (например, третий шаг слайдера): клики перед снимком
  const setupClicks = spec.setup?.click ?? [];
  const outDir = path.resolve(
    typeof args.out === "string" ? args.out : path.join(ROOT, "design/.check", block),
  );
  fs.mkdirSync(outDir, { recursive: true });
  const siteFile = path.join(outDir, "site@2x.png");
  const measureFile = path.join(outDir, "measure.json");

  const shot = spawnSync(
    process.execPath,
    [
      path.join(ROOT, "scripts/design/shot.mjs"),
      "--url",
      url,
      "--selector",
      `[data-block="${block}"]`,
      "--out",
      siteFile,
      "--measure",
      measureFile,
      "--hide",
      "header",
      ...(setupClicks.length ? ["--click", setupClicks.join(",")] : []),
    ],
    { encoding: "utf8" },
  );
  if (shot.status !== 0) {
    console.log(`СНИМОК НЕ ПОЛУЧЕН (${url}): ${(shot.stderr || shot.stdout).trim()}`);
    process.exit(2);
  }
  const shotInfo = JSON.parse(shot.stdout.trim().split("\n").pop());
  const measured = JSON.parse(fs.readFileSync(measureFile, "utf8"));

  const pageProblems = [];
  if (shotInfo.brokenImages?.length)
    pageProblems.push(`битые картинки: ${shotInfo.brokenImages.join(", ")}`);
  if (shotInfo.failedFonts?.length)
    pageProblems.push(`не загрузились шрифты: ${shotInfo.failedFonts.join(", ")}`);
  if (measured.page.width > 390)
    pageProblems.push(`горизонтальная прокрутка: ширина страницы ${measured.page.width}px`);
  const expectedSize = `390x${spec.height}`;
  const actualSize = `${round(measured.origin.width)}x${round(measured.origin.height)}`;
  if (actualSize !== expectedSize)
    pageProblems.push(`размер секции ${actualSize}, по макету ${expectedSize}`);

  const texts = checkTexts(spec, measured);
  const art = await checkArt(
    spec,
    measured,
    siteFile,
    path.join(REF, "art", `${block}@2x.png`),
    path.join(REF, "figma", `${block}@2x.png`),
    path.join(outDir, "compare.png"),
  );
  const artOk =
    !art.sizeMismatch && art.meanDiff <= 2.5 && art.over40Pct <= 0.6 && art.badTilesTotal === 0;
  const ok = pageProblems.length === 0 && texts.problems.length === 0 && artOk;

  const report = { block, url, ok, page: { problems: pageProblems, size: actualSize }, texts, art };
  fs.writeFileSync(path.join(outDir, "report.json"), `${JSON.stringify(report, null, 1)}\n`);

  const lines = [];
  lines.push(`== ${block}: ${ok ? "СОВПАДАЕТ С МАКЕТОМ" : "ЕСТЬ РАСХОЖДЕНИЯ"} ==  (${url})`);
  lines.push(
    `секция: ${actualSize} (макет ${expectedSize})${pageProblems.length ? `  ПРОБЛЕМЫ: ${pageProblems.join("; ")}` : ""}`,
  );
  lines.push(
    art.sizeMismatch
      ? `арт: размер снимка ${art.siteSize}, ожидался ${art.expectedSize} — сверка невозможна`
      : `арт: ${artOk ? "ok" : "РАСХОЖДЕНИЕ"} — среднее отличие ${art.meanDiff}, пикселей с отличием >16: ${art.over16Pct}%, >40: ${art.over40Pct}%, плохих участков 30×30: ${art.badTilesTotal}`,
  );
  for (const tile of art.badTiles?.slice(0, 12) ?? []) {
    lines.push(`   участок x=${tile.x} y=${tile.y}: среднее ${tile.mean}, >24: ${tile.overPct}%`);
  }
  lines.push(
    `тексты: проверено ${texts.checked} из ${texts.total}, расхождений ${texts.problems.length}`,
  );
  for (const problem of texts.problems) lines.push(`   [${problem.kind}] ${problem.message}`);
  if (texts.ghostsRendered.length)
    lines.push(
      `   выведены служебные слои макета (ghost) — убедитесь, что это осознанно: ${texts.ghostsRendered.join(", ")}`,
    );
  if (texts.extra.length)
    lines.push(`   элементы с data-fig, которых нет в спецификации: ${texts.extra.join(", ")}`);
  lines.push(
    `файлы: ${path.relative(ROOT, outDir)}/compare.png (макет Figma | сайт | расхождения арта), site@2x.png, report.json`,
  );
  console.log(lines.join("\n"));
  process.exit(ok ? 0 : 1);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(2);
});
