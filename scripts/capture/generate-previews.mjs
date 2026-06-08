import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

import { siteContent } from "../../src/data/site.js";
import { captureConfig } from "./apps.config.mjs";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const VIEWPORT_WIDTH = 1140;
const VIEWPORT_HEIGHT = Math.round((VIEWPORT_WIDTH * 9) / 16);

function parseArgs(argv) {
  const onlyArg = argv.find((arg) => arg.startsWith("--only="));
  return {
    onlyIds: onlyArg
      ? onlyArg
          .split("=")[1]
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      : null,
  };
}

function getOutputPath(previewImagePath) {
  const cleanPath = previewImagePath.replace(/^\/+/, "");
  return path.join(publicDir, cleanPath);
}

function getCaptureTargets() {
  const appTargets = Object.values(siteContent.appsById)
    .filter((app) => app.previewImage && app.url)
    .map((app) => ({
      id: app.id,
      url: app.url,
      previewImage: app.previewImage,
    }));


  return [...appTargets];
}

function resolveTargets(allTargets, onlyIds) {
  const withPreview = allTargets;
  if (!onlyIds?.length) {
    return withPreview;
  }

  const targetById = new Map(withPreview.map((target) => [target.id, target]));
  const targets = onlyIds.map((id) => targetById.get(id)).filter(Boolean);

  const validIds = new Set(withPreview.map((target) => target.id));
  const missingIds = onlyIds.filter((id) => !validIds.has(id));
  if (missingIds.length) {
    console.warn(`Skipping unknown or non-preview ids: ${missingIds.join(", ")}`);
  }

  return targets;
}

async function runAction(page, action) {
  switch (action.type) {
    case "wait-for-selector":
      await page.waitForSelector(action.selector, {
        timeout: action.timeoutMs ?? 10000,
        state: action.state ?? "visible",
      });
      return;
    case "click":
      await page.click(action.selector, {
        timeout: action.timeoutMs ?? 10000,
      });
      return;
    case "fill":
      await page.fill(action.selector, action.value ?? "", {
        timeout: action.timeoutMs ?? 10000,
      });
      return;
    case "select-option":
      await page.selectOption(action.selector, action.value, {
        timeout: action.timeoutMs ?? 10000,
      });
      return;
    case "select-option-by-label-anywhere": {
      const select = page
        .locator("select")
        .filter({ has: page.getByRole("option", { name: action.label }) })
        .first();
      await select.selectOption({ label: action.label }, { timeout: action.timeoutMs ?? 10000 });
      return;
    }
    case "set-input-files": {
      const targetPath = path.resolve(rootDir, action.path);
      await page.setInputFiles(action.selector, targetPath, {
        timeout: action.timeoutMs ?? 10000,
      });
      return;
    }
    case "wait-for-timeout":
      await page.waitForTimeout(action.ms ?? 1000);
      return;
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

async function captureTarget(page, target) {
  const appOverrides = captureConfig[target.id] ?? {};
  const defaults = captureConfig.default ?? {};

  const targetUrl = appOverrides.url ?? target.url;
  const outPath = getOutputPath(target.previewImage);
  const outDir = path.dirname(outPath);
  const actions = [...(defaults.actions ?? []), ...(appOverrides.actions ?? [])];
  const waitAfterLoadMs = appOverrides.waitAfterLoadMs ?? defaults.waitAfterLoadMs ?? 0;

  await fs.mkdir(outDir, { recursive: true });

  console.log(`Capturing ${target.id} -> ${targetUrl}`);
  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

  try {
    await page.waitForLoadState("networkidle", { timeout: 10000 });
  } catch {
    // Some apps keep background requests open; continue with explicit waits/actions.
  }

  for (const action of actions) {
    await runAction(page, action);
  }

  if (waitAfterLoadMs > 0) {
    await page.waitForTimeout(waitAfterLoadMs);
  }

  await page.screenshot({
    path: outPath,
    fullPage: false,
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const allTargets = getCaptureTargets();
  const targets = resolveTargets(allTargets, args.onlyIds);

  if (!targets.length) {
    console.log("No apps to capture.");
    return;
  }

  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  try {
    for (const target of targets) {
      await captureTarget(page, target);
    }
  } finally {
    await context.close();
    await browser.close();
  }

  console.log("Preview capture complete.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
