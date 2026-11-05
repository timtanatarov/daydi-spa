#!/usr/bin/env node
/**
 * Снимок страницы в headless Chrome (DevTools Protocol, без зависимостей) + замеры элементов.
 *
 *   node scripts/design/shot.mjs --url http://localhost:3000/ --out /tmp/page.png
 *     [--width 390] [--dpr 2] [--selector "main"] [--clip "x,y,w,h"]
 *     [--measure /tmp/measure.json] [--hide "header"] [--height 844] [--click "sel1,sel2"]
 *
 * --selector  снимать только этот элемент (иначе всю страницу)
 * --clip      прямоугольник в CSS-пикселях страницы (после --selector — относительно него)
 * --measure   сохранить геометрию и типографику всех элементов с атрибутом data-fig
 * --hide      CSS-селекторы, которые нужно скрыть на время снимка
 * --click     CSS-селекторы через запятую: кликнуть по очереди перед снимком
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME =
  process.env.CHROME_BIN ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith("--")) throw new Error(`Неожиданный аргумент: ${key}`);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      args[key.slice(2)] = true;
    } else {
      args[key.slice(2)] = next;
      i += 1;
    }
  }
  return args;
}

async function launchChrome() {
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "design-shot-"));
  const proc = spawn(
    CHROME,
    [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${profileDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      "--disable-extensions",
      "--mute-audio",
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  const wsUrl = await new Promise((resolve, reject) => {
    let log = "";
    const timer = setTimeout(
      () => reject(new Error(`Chrome не запустился: ${log.slice(-400)}`)),
      30000,
    );
    proc.stderr.on("data", (chunk) => {
      log += chunk;
      const match = log.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });
    proc.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Chrome завершился с кодом ${code}: ${log.slice(-400)}`));
    });
  });
  return { proc, profileDir, wsUrl };
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 0;
    this.pending = new Map();
    this.listeners = new Set();
    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== undefined && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(`${message.error.message} (${message.error.code})`));
        else resolve(message.result);
      } else if (message.method) {
        for (const listener of this.listeners) listener(message);
      }
    });
  }

  send(method, params = {}, sessionId) {
    this.nextId += 1;
    const id = this.nextId;
    this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  waitFor(method, sessionId, timeoutMs = 60000) {
    return new Promise((resolve, reject) => {
      const listener = (message) => {
        if (message.method !== method || (sessionId && message.sessionId !== sessionId)) return;
        clearTimeout(timer);
        this.listeners.delete(listener);
        resolve(message.params);
      };
      const timer = setTimeout(() => {
        this.listeners.delete(listener);
        reject(new Error(`Не дождался события ${method}`));
      }, timeoutMs);
      this.listeners.add(listener);
    });
  }
}

/** Выполняется в странице: ждёт шрифты и картинки, прячет служебные элементы. */
async function settlePage(hideSelectors) {
  const style = document.createElement("style");
  style.textContent = [
    "nextjs-portal, [data-nextjs-toast], [data-next-badge-root] { display: none !important; }",
    "*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }",
    hideSelectors ? `${hideSelectors} { visibility: hidden !important; }` : "",
  ].join("\n");
  document.head.append(style);

  // дождаться гидрации React: иначе смена атрибутов картинок даёт ложное предупреждение в dev
  const hydrated = () =>
    [...document.querySelectorAll("body *")].some((node) =>
      Object.keys(node).some((key) => key.startsWith("__reactFiber")),
    );
  const hydrationDeadline = performance.now() + 5000;
  while (!hydrated() && performance.now() < hydrationDeadline) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  for (const img of document.images) {
    if (img.loading === "lazy") img.loading = "eager";
  }
  await document.fonts.ready;
  const deadline = performance.now() + 20000;
  const pendingImages = () => [...document.images].filter((img) => !img.complete);
  while (pendingImages().length > 0 && performance.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await Promise.all([...document.images].map((img) => img.decode().catch(() => undefined)));
  await document.fonts.ready;
  await new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
  const broken = [...document.images]
    .filter((img) => img.complete && img.naturalWidth === 0)
    .map((img) => img.currentSrc || img.src);
  const failedFonts = [...document.fonts]
    .filter((face) => face.status === "error")
    .map((face) => `${face.family} ${face.weight} ${face.style}`);
  return {
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    brokenImages: broken,
    failedFonts,
    title: document.title,
  };
}

/** Выполняется в странице: геометрия и типографика элементов с data-fig. */
function measurePage(rootSelector) {
  const root = rootSelector ? document.querySelector(rootSelector) : document.documentElement;
  if (!root) return { error: `Не найден элемент ${rootSelector}` };
  const round = (value) => Math.round(value * 100) / 100;
  const originRect = root.getBoundingClientRect();
  const origin = { x: originRect.left, y: originRect.top };
  const NEUTRAL = ["transform", "rotate", "scale", "translate"];

  const withoutTransforms = (element, callback) => {
    const touched = [];
    for (let node = element; node && node !== document.documentElement; node = node.parentElement) {
      const cs = getComputedStyle(node);
      if (NEUTRAL.some((prop) => cs[prop] && cs[prop] !== "none")) {
        touched.push([node, node.getAttribute("style")]);
        for (const prop of NEUTRAL) node.style.setProperty(prop, "none", "important");
      }
    }
    try {
      return callback();
    } finally {
      for (const [node, style] of touched) {
        if (style === null) node.removeAttribute("style");
        else node.setAttribute("style", style);
      }
    }
  };

  /** Строки текста: прямоугольники по Range + базовые линии по зондам нулевого размера. */
  const textLines = (element) => {
    const box = element.getBoundingClientRect();
    const rects = [];
    const probes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.nodeValue || !node.nodeValue.trim()) continue;
      if (node.parentElement && node.parentElement.closest("[data-bullet]")) continue;
      textNodes.push(node);
    }
    for (const node of textNodes) {
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) {
        if (rect.width > 0 && rect.height > 0) rects.push(rect);
      }
      const probe = document.createElement("span");
      probe.style.cssText =
        "display:inline-block;width:0;height:0;margin:0;padding:0;border:0;vertical-align:baseline";
      node.parentNode.insertBefore(probe, node);
      probes.push(probe);
    }
    const baselines = [];
    for (const probe of probes) {
      const bottom = probe.getBoundingClientRect().bottom - box.top;
      if (!baselines.some((value) => Math.abs(value - bottom) < 0.6)) baselines.push(bottom);
    }
    for (const probe of probes) probe.remove();
    baselines.sort((a, b) => a - b);

    rects.sort((a, b) => a.top - b.top || a.left - b.left);
    const lines = [];
    for (const rect of rects) {
      const center = rect.top + rect.height / 2;
      const line = lines.find((item) => Math.abs(item.center - center) < rect.height * 0.45);
      if (line) {
        line.left = Math.min(line.left, rect.left);
        line.right = Math.max(line.right, rect.right);
      } else {
        lines.push({ center, left: rect.left, right: rect.right });
      }
    }
    return {
      localBox: {
        x: round(box.left - origin.x),
        y: round(box.top - origin.y),
        width: round(box.width),
        height: round(box.height),
      },
      lines: lines.map((line, index) => ({
        x: round(line.left - box.left),
        baselineY:
          baselines.length === lines.length && baselines[index] !== undefined
            ? round(baselines[index])
            : null,
        width: round(line.right - line.left),
      })),
    };
  };

  const items = [];
  for (const element of root.querySelectorAll("[data-fig]")) {
    const cs = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const item = {
      fig: element.dataset.fig,
      tag: element.tagName.toLowerCase(),
      bounds: {
        x: round(rect.left - origin.x),
        y: round(rect.top - origin.y),
        width: round(rect.width),
        height: round(rect.height),
      },
      opacity: Number(cs.opacity),
      visible: cs.visibility !== "hidden" && cs.display !== "none",
    };
    const text = element.innerText ?? element.textContent ?? "";
    if (text.trim() && element.dataset.figKind !== "box") {
      item.text = {
        characters: text,
        fontFamily: cs.fontFamily,
        textShadow: cs.textShadow === "none" ? null : cs.textShadow,
        fontSize: round(parseFloat(cs.fontSize)),
        lineHeight: cs.lineHeight === "normal" ? "normal" : round(parseFloat(cs.lineHeight)),
        fontWeight: cs.fontWeight,
        fontStyle: cs.fontStyle,
        letterSpacing: cs.letterSpacing,
        textAlign: cs.textAlign,
        color: cs.color,
        ...withoutTransforms(element, () => textLines(element)),
      };
    }
    items.push(item);
  }
  return {
    origin: { width: round(originRect.width), height: round(originRect.height) },
    items,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.url || !args.out) {
    throw new Error("Нужны --url и --out. См. описание в начале файла.");
  }
  const width = Number(args.width ?? 390);
  const height = Number(args.height ?? 844);
  const dpr = Number(args.dpr ?? 2);

  const chrome = await launchChrome();
  try {
    const ws = new WebSocket(chrome.wsUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true });
      ws.addEventListener("error", () => reject(new Error("Нет соединения с Chrome")), {
        once: true,
      });
    });
    const cdp = new Cdp(ws);
    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    const call = (method, params) => cdp.send(method, params, sessionId);
    const evaluate = async (fn, ...fnArgs) => {
      const expression = `(${fn.toString()})(${fnArgs.map((arg) => JSON.stringify(arg ?? null)).join(",")})`;
      const { result, exceptionDetails } = await call("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
      });
      if (exceptionDetails) {
        throw new Error(
          `Ошибка в странице: ${exceptionDetails.exception?.description ?? exceptionDetails.text}`,
        );
      }
      return result.value;
    };

    await call("Page.enable");
    await call("Runtime.enable");
    await call("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: dpr,
      mobile: false,
    });

    const loaded = cdp.waitFor("Page.loadEventFired", sessionId);
    const navigation = await call("Page.navigate", { url: args.url });
    if (navigation.errorText) throw new Error(`Не открылось ${args.url}: ${navigation.errorText}`);
    await loaded;

    const page = await evaluate(settlePage, typeof args.hide === "string" ? args.hide : "");

    // --click "sel1,sel2": последовательно кликнуть по элементам перед снимком (проверка состояний)
    if (typeof args.click === "string") {
      for (const selector of args.click
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)) {
        const clicked = await evaluate(async (target) => {
          const element = document.querySelector(target);
          if (!element) return false;
          element.click();
          await new Promise((resolve) => setTimeout(resolve, 450));
          return true;
        }, selector);
        if (!clicked) throw new Error(`--click: не найден элемент ${selector}`);
      }
    }

    let clip = { x: 0, y: 0, width: page.width, height: page.height };
    if (typeof args.selector === "string") {
      const rect = await evaluate((selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const box = element.getBoundingClientRect();
        return {
          x: box.left + window.scrollX,
          y: box.top + window.scrollY,
          width: box.width,
          height: box.height,
        };
      }, args.selector);
      if (!rect) throw new Error(`Не найден элемент ${args.selector}`);
      clip = rect;
    }
    if (typeof args.clip === "string") {
      const [x, y, w, h] = args.clip.split(",").map(Number);
      clip = { x: clip.x + x, y: clip.y + y, width: w, height: h };
    }

    const { data } = await call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { ...clip, scale: 1 },
    });
    fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
    fs.writeFileSync(args.out, Buffer.from(data, "base64"));

    let measured = null;
    if (typeof args.measure === "string") {
      measured = await evaluate(
        measurePage,
        typeof args.selector === "string" ? args.selector : null,
      );
      fs.mkdirSync(path.dirname(path.resolve(args.measure)), { recursive: true });
      fs.writeFileSync(
        args.measure,
        `${JSON.stringify({ url: args.url, page, clip, ...measured }, null, 1)}\n`,
      );
    }

    console.log(
      JSON.stringify({
        out: args.out,
        cssSize: `${Math.round(clip.width * 100) / 100}x${Math.round(clip.height * 100) / 100}`,
        pixelSize: `${Math.round(clip.width * dpr)}x${Math.round(clip.height * dpr)}`,
        page: { width: page.width, height: page.height },
        brokenImages: page.brokenImages,
        failedFonts: page.failedFonts,
        measured: measured ? (measured.items?.length ?? measured.error) : undefined,
      }),
    );
    ws.close();
  } finally {
    chrome.proc.kill("SIGKILL");
    fs.rmSync(chrome.profileDir, { recursive: true, force: true, maxRetries: 3 });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
