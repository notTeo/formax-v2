// Post-build step: snapshots every known route in a headless browser and writes the
// fully-rendered HTML to disk, so crawlers get real markup instead of an empty <div id="root">.
// Runs after `vite build` (see package.json "build" script).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projects.js";

// Vercel's build image is missing several shared libraries (libnspr4.so and friends) that
// Puppeteer's own bundled Chrome needs, so on Vercel we launch @sparticuz/chromium (a Chromium
// build made for exactly this kind of minimal serverless/build environment) via puppeteer-core
// instead. Locally (e.g. this Mac) that binary isn't available for the platform, so we fall back
// to the regular `puppeteer` package, which already bundles a working Chrome for macOS.
async function launchBrowser() {
  if (process.env.VERCEL) {
    const { default: chromium } = await import("@sparticuz/chromium");
    const { default: puppeteerCore } = await import("puppeteer-core");
    return puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  const { default: puppeteer } = await import("puppeteer");
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");
const SITE_URL = "https://formax.group";

const STATIC_ROUTES = ["/", "/about", "/projects", "/careers", "/contact", "/privacy-policy"];
const PROJECT_ROUTES = projects.map((project) => `/projects/${project.slug}`);
const ROUTES = [...STATIC_ROUTES, ...PROJECT_ROUTES];

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const SEO_FALLBACK_BLOCK = /\s*<!-- seo-fallback:[\s\S]*?-->[\s\S]*?<!-- \/seo-fallback -->/;

function startServer(shellHtml) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      const filePath = path.join(distDir, urlPath);

      if (!filePath.startsWith(distDir)) {
        res.writeHead(403);
        res.end();
        return;
      }

      fs.stat(filePath, (err, stat) => {
        if (!err && stat.isFile()) {
          res.writeHead(200, {
            "Content-Type": MIME_TYPES[path.extname(filePath)] || "application/octet-stream",
          });
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(shellHtml);
      });
    });

    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

function outputPathForRoute(route) {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, route.slice(1), "index.html");
}

async function main() {
  const shellHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
  const server = await startServer(shellHtml);
  const port = server.address().port;

  const browser = await launchBrowser();

  const captured = new Map();

  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      // Force the English locale for this isolated headless snapshot only (the site defaults to
      // English) — real visitors keep whatever language they land on / pick via the toggle, this
      // never touches their browser.
      await page.evaluateOnNewDocument(() => {
        try {
          window.localStorage.setItem("formax-lang", "en");
        } catch {
          /* ignore */
        }
      });

      await page.goto(`http://127.0.0.1:${port}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Projects/ProjectDetail show a spinner behind an artificial setTimeout before real
      // content mounts — wait it out instead of snapshotting the loader.
      await page
        .waitForFunction(() => !document.querySelector(".loader-container"), { timeout: 5000 })
        .catch(() => {});

      const html = await page.content();
      captured.set(route, html.replace(SEO_FALLBACK_BLOCK, ""));
      console.log(`prerendered ${route}`);
    } catch (err) {
      console.error(`failed to prerender ${route}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await new Promise((resolve) => server.close(resolve));

  for (const [route, html] of captured) {
    const outPath = outputPathForRoute(route);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
  }

  const today = new Date().toISOString().slice(0, 10);
  const urlEntries = ROUTES.map(
    (route) => `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
  ).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);

  console.log(`Prerendered ${captured.size}/${ROUTES.length} routes, wrote sitemap.xml`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
