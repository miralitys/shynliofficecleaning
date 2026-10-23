export const REDIRECT_VERSION = "2026-10-23.1"
export const SOURCE_ORIGIN = "https://shynliofficecleaning.com"
export const DESTINATION_ORIGIN = "https://shynlicleaningservice.com"
export const DEFAULT_TARGET = "/services/commercial-cleaning"
export const CITY_SLUGS = Object.freeze([
  "addison", "aurora", "bartlett", "batavia", "bolingbrook", "bristol",
  "burr-ridge", "carol-stream", "clarendon-hills", "darien", "downers-grove",
  "elmhurst", "geneva", "glen-ellyn", "hinsdale", "homer-glen", "itasca",
  "lemont", "lisle", "lockport", "lombard", "montgomery", "naperville",
  "north-aurora", "oak-brook", "oswego", "plainfield", "romeoville",
  "st-charles", "streamwood", "sugar-grove", "villa-park", "warrenville",
  "wayne", "west-chicago", "westmont", "wheaton", "willowbrook", "winfield",
  "wood-dale", "woodridge", "yorkville",
])
export const CITY_SERVICES = Object.freeze([
  "office-cleaning", "commercial-cleaning", "cleaning-services", "janitorial-services",
  "medical-office-cleaning", "medical-office-facility-cleaning", "dental-office-cleaning",
  "office-building-facility-cleaning", "retail-store-cleaning", "retail-store-facility-cleaning",
])
const cityPaths = new Set(CITY_SERVICES.flatMap((service) => CITY_SLUGS.map((city) => `/${service}-${city}-il`)))

export function getRedirect(input = "/") {
  let url
  try {
    url = new URL(input.startsWith("/") ? `${SOURCE_ORIGIN}${input}` : input, SOURCE_ORIGIN)
  } catch {
    url = new URL(SOURCE_ORIGIN)
  }
  let pathname = url.pathname
  try { pathname = decodeURIComponent(pathname) } catch { /* Invalid escapes use the commercial fallback. */ }
  pathname = pathname.toLowerCase().replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/"
  if (pathname === "/index.html") pathname = "/"
  const result = (target, group) => ({ target, group, location: `${DESTINATION_ORIGIN}${target}${url.search}` })
  if (pathname === "/") return result(DEFAULT_TARGET, "home")
  if (pathname === "/sitemap.xml") return result("/sitemap.xml", "sitemap")
  if (pathname === "/robots.txt") return result("/robots.txt", "robots")
  if (pathname === "/service-areas") return result("/service-areas", "service-areas")
  if (pathname === "/post-construction-office-cleaning-plan") return result("/services/post-construction-cleaning", "post-construction")
  if (["/privacy-policy", "/terms-of-service", "/cancellation-policy"].includes(pathname)) return result(pathname, "legal")
  if (cityPaths.has(pathname)) return result(DEFAULT_TARGET, "city")
  const parts = pathname.split("/").filter(Boolean)
  if (parts.some((part) => /(?:^|-)(?:quote|quotes|booking|bookings|book)(?:-|$)/.test(part) || part === "schedule")) return result("/quote", "quote")
  return result(DEFAULT_TARGET, "commercial-default")
}
