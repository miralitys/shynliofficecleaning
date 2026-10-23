import { readFile, writeFile, mkdir } from "node:fs/promises"
import path from "node:path"
import { request as httpRequest } from "node:http"
import { getRedirect, REDIRECT_VERSION } from "../redirects.mjs"

const outputDir = process.env.AUDIT_OUTPUT_DIR || "reports/site-redirect-2026-10-23"
const sourceOrigin = process.env.AUDIT_ORIGIN || "https://shynliofficecleaning.com"
const phase = process.env.AUDIT_PHASE || "production"
const concurrency = Number(process.env.AUDIT_CONCURRENCY || 5)
const sitemapFile = process.env.AUDIT_SITEMAP || "dist/sitemap.xml"
const sitemap = await readFile(sitemapFile, "utf8")
const oldUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].replaceAll("&amp;", "&"))
const destinationCache = new Map()

async function request(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      if (process.env.AUDIT_HOST && url.startsWith(sourceOrigin)) {
        return await new Promise((resolve, reject) => {
          const request = httpRequest(url, { headers: { Host: process.env.AUDIT_HOST } }, (response) => {
            response.resume()
            response.once("end", () => resolve({ url, status: response.statusCode, location: response.headers.location || null, version: response.headers["x-shynli-redirect-version"] || null }))
          })
          request.setTimeout(25000, () => request.destroy(new Error("Origin request timeout")))
          request.once("error", reject)
          request.end()
        })
      }
      const response = await fetch(url, {
        redirect: "manual",
        signal: AbortSignal.timeout(25000),
        headers: { "User-Agent": "Shynli-Migration-Verification/1.0", "Cache-Control": "no-cache", ...(process.env.AUDIT_HOST && url.startsWith(sourceOrigin) ? { Host: process.env.AUDIT_HOST } : {}) },
      })
      const result = { url, status: response.status, location: response.headers.get("location"), version: response.headers.get("x-shynli-redirect-version") }
      await response.body?.cancel()
      if ([429, 502, 503, 504].includes(result.status) && attempt < 2) continue
      return result
    } catch (error) {
      if (attempt === 2) return { url, status: 0, location: null, error: error.message }
    }
  }
}

function checkDestination(url) {
  if (!destinationCache.has(url)) destinationCache.set(url, request(url))
  return destinationCache.get(url)
}

async function audit(oldUrl, overrideOrigin) {
  const parsed = new URL(oldUrl)
  const requestedUrl = `${overrideOrigin || sourceOrigin}${parsed.pathname}${parsed.search}`
  const expected = getRedirect(oldUrl)
  const response = await request(requestedUrl)
  let current = response
  let hops = 0
  const chain = [response]
  while ([301, 302, 303, 307, 308].includes(current.status) && current.location && hops < 10) {
    hops++
    const url = new URL(current.location, current.url).href
    current = await checkDestination(url)
    chain.push(current)
  }
  const locationStatus = chain.length > 1 ? chain[1].status : ""
  return {
    old_url: oldUrl,
    requested_url: requestedUrl,
    group: expected.group,
    http_code: response.status,
    location: response.location || "",
    expected_location: expected.location,
    location_status: locationStatus,
    final_status: current.status,
    hops,
    pass: response.status === 301 && response.location === expected.location && locationStatus === 200 && hops === 1,
    version: response.version || "",
    chain,
  }
}

async function mapLimit(items, fn) {
  const results = new Array(items.length)
  let cursor = 0
  let completed = 0
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await fn(items[index])
      completed++
      if (completed % 100 === 0) console.log(`${phase}: ${completed}/${items.length}`)
    }
  }))
  return results
}

const csvColumns = ["old_url", "requested_url", "group", "http_code", "location", "expected_location", "location_status", "final_status", "hops", "pass", "version"]
const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`
async function save(name, rows) {
  await writeFile(path.join(outputDir, `${phase}-${name}.json`), JSON.stringify(rows, null, 2) + "\n")
  await writeFile(path.join(outputDir, `${phase}-${name}.csv`), csvColumns.join(",") + "\n" + rows.map((row) => csvColumns.map((column) => csvCell(row[column])).join(",")).join("\n") + "\n")
}

await mkdir(outputDir, { recursive: true })
const rows = await mapLimit(oldUrls, (url) => audit(url))
await save("sitemap", rows)

// Reproducible sample: fixed paths cover normalization, ads, query encoding and fallbacks.
const extraPaths = [
  "/nonexistent-xyz", "/OFFICE-CLEANING-NAPERVILLE-IL", "/office-cleaning-naperville-il?gclid=test&utm_source=google&utm_campaign=redirect%20test",
  "/index.html", "/POST-CONSTRUCTION-OFFICE-CLEANING-PLAN/?gclid=abc%2fDEF&x=1&x=2",
  "/SERVICE-AREAS/?utm_medium=cpc", "/medical-office-facility-cleaning-burr-ridge-il/?utm_content=hello+world&empty=&flag",
  "/privacy-policy/", "/booking/new?utm_source=test", "/get-a-quote?gclid=quote-test",
]
const extras = await mapLimit(extraPaths, (route) => audit(`https://shynliofficecleaning.com${route}`))
await save("extra-paths", extras)
const discovery = await mapLimit(["/sitemap.xml", "/robots.txt"], (route) => audit(`https://shynliofficecleaning.com${route}`))
await save("discovery", discovery)

const variants = phase === "production"
  ? await mapLimit(["http://shynliofficecleaning.com", "http://www.shynliofficecleaning.com", "https://www.shynliofficecleaning.com", "https://shynliofficecleaning.com"], (origin) => audit(`${origin}/`, origin))
  : []
if (variants.length) await save("host-variants", variants)
const counts = {}
for (const row of rows) counts[row.group] = (counts[row.group] || 0) + 1
const summary = {
  captured_at_utc: new Date().toISOString(),
  version: REDIRECT_VERSION,
  source_origin: sourceOrigin,
  sitemap_count: rows.length,
  passed: rows.filter((row) => row.pass).length,
  failed: rows.filter((row) => !row.pass).length,
  counts,
  extra_paths_passed: extras.filter((row) => row.pass).length,
  discovery_passed: discovery.filter((row) => row.pass).length,
  host_variants: variants.map(({ old_url, http_code, location, location_status, final_status, hops, pass }) => ({ old_url, http_code, location, location_status, final_status, hops, pass })),
}
await writeFile(path.join(outputDir, `${phase}-summary.json`), JSON.stringify(summary, null, 2) + "\n")
console.log(JSON.stringify(summary, null, 2))
if (rows.some((row) => !row.pass) || extras.some((row) => !row.pass) || discovery.some((row) => !row.pass)) process.exitCode = 1
