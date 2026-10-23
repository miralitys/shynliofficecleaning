import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"
import { CITY_SLUGS, CITY_SERVICES, DEFAULT_TARGET, DESTINATION_ORIGIN, getRedirect } from "../redirects.mjs"

const expect = (source, target) => assert.equal(getRedirect(source).location, `${DESTINATION_ORIGIN}${target}`, source)

test("commercial targets, exceptions, quote paths and unknown paths preserve tracking and variants", () => {
  const cases = [["/", DEFAULT_TARGET], ["/index.html", DEFAULT_TARGET], ["/service-areas", "/service-areas"],
    ["/post-construction-office-cleaning-plan", "/services/post-construction-cleaning"],
    ["/privacy-policy", "/privacy-policy"], ["/terms-of-service", "/terms-of-service"], ["/cancellation-policy", "/cancellation-policy"],
    ["/quote", "/quote"], ["/booking/new", "/quote"], ["/request-a-quote", "/quote"], ["/api/quote/submit", "/quote"],
    ["/commercial-cleaning-faq", DEFAULT_TARGET], ["/office-cleaning-pricing", DEFAULT_TARGET],
    ["/nonexistent-xyz", DEFAULT_TARGET], ["/assets/app.js", DEFAULT_TARGET], ["/%zz", DEFAULT_TARGET], ["//evil.example/", DEFAULT_TARGET],
    ["/sitemap.xml", "/sitemap.xml"], ["/robots.txt", "/robots.txt"],
  ]
  const query = "?gclid=abc%2fDEF&utm_source=google+ads&x=1&x=2&empty=&flag"
  for (const [source, target] of cases) {
    expect(source, target)
    expect(`${source.toUpperCase()}/`, target)
    expect(`${source}${query}`, `${target}${query}`)
  }
  expect("/SERVICE%2DAREAS///", "/service-areas")
  expect("/quoted-text", DEFAULT_TARGET)
})

test("all 420 city pages keep commercial intent, including all four residential specialist cities", () => {
  assert.equal(CITY_SLUGS.length, 42)
  assert.equal(CITY_SERVICES.length, 10)
  for (const city of CITY_SLUGS) {
    for (const service of CITY_SERVICES) {
      const route = `/${service}-${city}-il`
      expect(route, DEFAULT_TARGET)
      expect(`${route.toUpperCase()}/?gclid=test`, `${DEFAULT_TARGET}?gclid=test`)
      assert.equal(getRedirect(route).group, "city")
    }
  }
})

test("all 480 sitemap entries match the independent user mapping and group counts", async () => {
  const xml = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8")
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  assert.equal(urls.length, 480)
  const counts = {}
  for (const url of urls) {
    const pathname = new URL(url).pathname
    const target = pathname === "/service-areas" || ["/privacy-policy", "/terms-of-service", "/cancellation-policy"].includes(pathname)
      ? pathname : pathname === "/post-construction-office-cleaning-plan" ? "/services/post-construction-cleaning" : DEFAULT_TARGET
    expect(url, target)
    const result = getRedirect(url)
    counts[result.group] = (counts[result.group] || 0) + 1
    assert.equal(new URL(result.location).origin, DESTINATION_ORIGIN)
    assert.ok(!new URL(result.location).pathname.endsWith("/"))
  }
  assert.deepEqual(counts, { home: 1, "commercial-default": 54, "service-areas": 1, city: 420, "post-construction": 1, legal: 3 })
})
