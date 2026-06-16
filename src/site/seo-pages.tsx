import { useEffect } from "react"
import { ArrowRight } from "lucide-react"
import seoData from "./seo-routes.json"
import articleGuides from "./article-guides.json"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type City = (typeof seoData.cities)[number]
type Service = (typeof seoData.services)[number]
type Industry = (typeof seoData.industries)[number]
type SupportPage = (typeof seoData.supportPages)[number]
type ArticleGuide = (typeof articleGuides)[number]

export type SeoPage =
  | { kind: "service"; route: string; title: string; description: string; service: Service }
  | { kind: "industry"; route: string; title: string; description: string; industry: Industry }
  | { kind: "city"; route: string; title: string; description: string; city: City; nearby: City[] }
  | { kind: "city-service"; route: string; title: string; description: string; city: City; service: Service; nearby: City[] }
  | { kind: "city-industry"; route: string; title: string; description: string; city: City; industry: Industry; nearby: City[] }
  | { kind: "service-areas"; route: string; title: string; description: string }
  | { kind: "support"; route: string; title: string; description: string; support: SupportPage }
  | { kind: "guide-hub"; route: string; title: string; description: string; articles: ArticleGuide[] }
  | { kind: "article-guide"; route: string; title: string; description: string; article: ArticleGuide }

const cityServices = seoData.services.filter((service) => service.cityEnabled)
const cityIndustries = seoData.industries.filter((industry) => industry.cityEnabled)
const QUOTE_URL = "https://shynlicleaningservice.com/quote"

function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-3.5 shrink-0 rounded-full border-2 border-sky-500 bg-sky-50 ring-2 ring-sky-100 ${className}`}
    />
  )
}

function LinkArrow() {
  return (
    <span
      aria-hidden="true"
      className="ml-3 h-2.5 w-2.5 shrink-0 rotate-45 border-r-2 border-t-2 border-sky-500"
    />
  )
}

function cityHubRoute(city: City) {
  return `cleaning-services-${city.slug}`
}

function cityServiceRoute(city: City, service: Service) {
  return `${service.slug}-${city.slug}`
}

function cityIndustryRoute(city: City, industry: Industry) {
  return `${industry.slug}-facility-cleaning-${city.slug}`
}

function nearbyCities(city: City) {
  const index = seoData.cities.findIndex((item) => item.slug === city.slug)
  return [-2, -1, 1, 2]
    .map((offset) => seoData.cities[(index + offset + seoData.cities.length) % seoData.cities.length])
    .filter((item) => item.slug !== city.slug)
}

function supportDescription(support: SupportPage) {
  return `${support.intent}, written for Chicago suburbs businesses comparing scope, schedule, and walkthrough-based service.`
}

export function allSeoPages(): SeoPage[] {
  const servicePages = seoData.services.map((service) => ({
    kind: "service" as const,
    route: service.route,
    title: `${service.name} for Chicago Suburbs Businesses`,
    description: `${service.name} built around walkthroughs, written scopes, recurring schedules, and quality control for commercial facilities.`,
    service,
  }))

  const industryPages = seoData.industries.map((industry) => ({
    kind: "industry" as const,
    route: industry.route,
    title: `${industry.name} Cleaning Services`,
    description: `Cleaning programs for ${industry.intent}, with a walkthrough-first quote and a written service scope.`,
    industry,
  }))

  const cityPages = seoData.cities.map((city) => ({
    kind: "city" as const,
    route: cityHubRoute(city),
    title: `Commercial Cleaning Services in ${city.name}, IL`,
    description: `Office cleaning, janitorial services, and commercial cleaning support for businesses in ${city.name} and nearby ${city.county} communities.`,
    city,
    nearby: nearbyCities(city),
  }))

  const cityServicePages = seoData.cities.flatMap((city) =>
    cityServices.map((service) => ({
      kind: "city-service" as const,
      route: cityServiceRoute(city, service),
      title: `${service.name} in ${city.name}, IL`,
      description: `${service.name} for ${city.name} businesses that need a clear scope, reliable schedule, and walkthrough-based quote.`,
      city,
      service,
      nearby: nearbyCities(city),
    })),
  )

  const cityIndustryPages = seoData.cities.flatMap((city) =>
    cityIndustries.map((industry) => ({
      kind: "city-industry" as const,
      route: cityIndustryRoute(city, industry),
      title: `${industry.name} Cleaning in ${city.name}, IL`,
      description: `Cleaning support for ${industry.intent} in ${city.name}, with local scheduling and a facility-specific checklist.`,
      city,
      industry,
      nearby: nearbyCities(city),
    })),
  )

  const supportPages = seoData.supportPages.map((support) => ({
    kind: "support" as const,
    route: support.route,
    title: support.name,
    description: supportDescription(support),
    support,
  }))

  const serviceAreasPage = {
    kind: "service-areas" as const,
    route: "service-areas",
    title: "Commercial Cleaning Service Areas",
    description: "Office cleaning, janitorial services, and commercial cleaning coverage across 42 Chicago suburbs service areas.",
  }

  const guideHubPage = {
    kind: "guide-hub" as const,
    route: "commercial-cleaning-guides",
    title: "Commercial Cleaning Guides for Chicago Suburbs Businesses",
    description: "Practical commercial cleaning guides for Chicago suburbs offices, property managers, facility teams, and small business owners preparing for a walkthrough.",
    articles: articleGuides,
  }

  const articleGuidePages = articleGuides.map((article) => ({
    kind: "article-guide" as const,
    route: article.route,
    title: article.title,
    description: article.metaDescription,
    article,
  }))

  return [...servicePages, ...industryPages, serviceAreasPage, ...cityPages, ...cityServicePages, ...cityIndustryPages, ...supportPages, guideHubPage, ...articleGuidePages]
}

export const seoStats = {
  services: seoData.services.length,
  industries: seoData.industries.length,
  cities: seoData.cities.length,
  cityServices: seoData.cities.length * cityServices.length,
  cityIndustries: seoData.cities.length * cityIndustries.length,
  support: seoData.supportPages.length,
  guidePages: articleGuides.length + 1,
  total: allSeoPages().length + 1 + 3,
}

export function findSeoPage(pathname: string) {
  const route = pathname.replace(/^\/+|\/+$/g, "")
  if (!route) return null
  return allSeoPages().find((page) => page.route === route) ?? null
}

export function SeoRoutePage({ pathname }: { pathname: string }) {
  const page = findSeoPage(pathname)

  useEffect(() => {
    if (!page) return
    document.title = `${page.title} | ShynliOfficeCleaning.com`
    document.querySelector("meta[name='description']")?.setAttribute("content", page.description)
  }, [page])

  if (!page) return null
  return <SeoLandingPage page={page} />
}

export function topSeoLinks() {
  return [
    ...seoData.services.slice(0, 6).map((service) => ({ label: service.name, href: `/${service.route}` })),
    ...seoData.cities.slice(20, 27).map((city) => ({ label: `${city.name} commercial cleaning`, href: `/${cityHubRoute(city)}` })),
  ]
}

function pageBadge(page: SeoPage) {
  if ("city" in page) return `${page.city.name}, IL commercial cleaning`
  if (page.kind === "service") return "Commercial cleaning service"
  if (page.kind === "industry") return "Facility cleaning program"
  if (page.kind === "service-areas") return "Chicago suburbs service areas"
  if (page.kind === "guide-hub") return "Commercial cleaning guides"
  if (page.kind === "article-guide") return "Commercial cleaning guide"
  return "Commercial cleaning resource"
}

function pageScope(page: SeoPage) {
  if (page.kind === "city-service") {
    return [
      `${page.service.name} for offices, customer areas, restrooms, staff rooms, and shared spaces in ${page.city.name}.`,
      `A written cleaning scope built around ${page.service.intent}.`,
      "Recurring, after-hours, and project-based schedules planned around how your facility actually operates.",
      "Clear access notes, room-by-room priorities, and communication expectations before the first visit.",
    ]
  }

  if (page.kind === "city-industry") {
    return [
      `${page.industry.name} cleaning for ${page.city.name} facilities with customer-facing and staff-facing areas.`,
      `Checklist planning for ${page.industry.intent}.`,
      "Restroom, floor, trash, glass, and high-touch priorities shaped during the walkthrough.",
      "Recurring service planning for facilities that need consistent presentation week after week.",
    ]
  }

  if (page.kind === "city") {
    return [
      `Commercial cleaning services across ${page.city.name} for offices, medical offices, dental offices, retail spaces, and managed properties.`,
      "Office cleaning, janitorial services, high-touch cleaning, restroom care, floor care, trash removal, and breakroom cleaning.",
      `Nearby coverage across ${page.city.county} and surrounding suburbs.`,
      "A walkthrough quote process that turns your building layout, traffic, and schedule into a practical cleaning plan.",
    ]
  }

  if (page.kind === "service") {
    return [
      `${page.service.name} for commercial facilities that need dependable presentation, cleaner restrooms, and less day-to-day follow-up.`,
      `A service plan focused on ${page.service.intent}.`,
      "Written cleaning scopes before recurring work begins, so expectations are clear from the first visit.",
      "Supervisor notes, quality-control follow-up, and schedule adjustments when the facility changes.",
    ]
  }

  if (page.kind === "industry") {
    return [
      `${page.industry.name} cleaning for decision-makers who need the space to feel ready for staff, visitors, patients, tenants, or customers.`,
      `A facility-specific plan for ${page.industry.intent}.`,
      "Access planning, after-hours rules, high-touch areas, restrooms, trash, floors, and customer-facing presentation.",
      "Recurring programs for facilities where cleaning quality has to stay consistent, not just look good once.",
    ]
  }

  if (page.kind === "service-areas") {
    return [
      "Commercial cleaning coverage across 42 Chicago suburbs communities.",
      "Local service pages for office cleaning, janitorial services, medical office cleaning, dental office cleaning, commercial cleaning, and retail store cleaning.",
      "Nearby city links help businesses compare coverage and request a walkthrough for the right location.",
      "Every service-area page points back to core services, facility types, and quote paths.",
    ]
  }

  if (page.kind === "guide-hub") {
    return [
      "Commercial cleaning guides for businesses comparing providers, scopes, schedules, restrooms, supplies, after-hours access, day porter support, and recurring quality control.",
      "Built for office managers, facility managers, property managers, and small business owners preparing for a walkthrough.",
      "Each guide links back to service, checklist, quote, and scope pages so the content supports lead conversion instead of sitting alone.",
      "Use this hub as the main internal link target from the homepage, footer, FAQ, and city templates.",
    ]
  }

  if (page.kind === "article-guide") {
    return [
      page.article.excerpt,
      page.article.targetQuestion,
      `Written for ${page.article.audience}.`,
      "Connect this guide to the walkthrough quote flow when a business is ready to define scope, schedule, access, and quality expectations.",
    ]
  }

  return [
    page.support.intent,
    "Practical guidance for office managers, property managers, and business owners comparing commercial cleaning options.",
    "Clear next steps for turning a cleaning question into a walkthrough, scope, schedule, or checklist.",
    "Helpful links into related services, city coverage, and facility-type cleaning pages.",
  ]
}

function facilityDetails(page: SeoPage) {
  const cityText = "city" in page ? ` in ${page.city.name}` : ""
  const primary = page.kind === "service" || page.kind === "city-service" ? page.service.name : page.kind === "industry" || page.kind === "city-industry" ? page.industry.name : "Commercial cleaning"
  return [
    `${primary}${cityText} for reception areas, offices, conference rooms, breakrooms, restrooms, and shared walkways.`,
    "High-touch surfaces, door handles, counters, tables, fixtures, switches, railings, and other areas people notice first.",
    "Trash removal, liner replacement, dusting, glass touch-ups, restroom cleaning, and supply coordination when included in the scope.",
    "Floor attention based on traffic patterns, hard surfaces, entry points, mats, and visible soil areas.",
    "After-hours access planning for keys, alarms, building rules, parking, elevators, tenant rules, and contact escalation.",
    "Visit notes and scope adjustments when the building schedule, season, staffing, or traffic pattern changes.",
  ]
}

function relatedLinks(page: SeoPage) {
  const base = [
    { label: "Office Cleaning Services", href: "/office-cleaning-services" },
    { label: "Janitorial Services", href: "/janitorial-services" },
    { label: "Commercial Cleaning Checklist", href: "/commercial-cleaning-checklist" },
  ]

  if ("city" in page) {
    return [
      ...cityServices.slice(0, 4).map((service) => ({
        label: `${service.name} in ${page.city.name}`,
        href: `/${cityServiceRoute(page.city, service)}`,
      })),
      ...page.nearby.slice(0, 4).map((city) => ({
        label: `${city.name} cleaning services`,
        href: `/${cityHubRoute(city)}`,
      })),
    ]
  }

  if (page.kind === "guide-hub") {
    return articleGuides.map((article) => ({
      label: article.seoTitle.replace(" | Shynli", ""),
      href: `/${article.route}`,
    }))
  }

  if (page.kind === "article-guide") {
    return [
      { label: "Commercial Cleaning Guides", href: "/commercial-cleaning-guides" },
      ...page.article.internalLinks
        .filter((link) => link.startsWith("https://shynliofficecleaning.com/"))
        .filter((link) => link !== page.article.canonicalUrl)
        .slice(0, 7)
        .map((link) => ({
          label: link.replace("https://shynliofficecleaning.com/", "").replaceAll("-", " "),
          href: link.replace("https://shynliofficecleaning.com", ""),
        })),
    ]
  }

  if (page.kind === "service") {
    return seoData.cities.slice(20, 28).map((city) => ({
      label: `${page.service.name} in ${city.name}`,
      href: `/${cityServiceRoute(city, page.service)}`,
    }))
  }

  if (page.kind === "industry") {
    return seoData.cities.slice(20, 28).map((city) => ({
      label: `${page.industry.name} cleaning in ${city.name}`,
      href: `/${cityIndustryRoute(city, page.industry)}`,
    }))
  }

  return base
}

function faqItems(page: SeoPage) {
  const place = "city" in page ? page.city.name : "your facility"
  return [
    [`Do you provide a fixed online price for ${place}?`, "Most commercial spaces need a walkthrough first because size, access, restrooms, floor type, traffic, frequency, and after-hours rules change the scope and price."],
    ["Can the cleaning happen after business hours?", "Yes. After-hours office cleaning can be planned around keys, alarms, parking, elevators, building rules, and a clear point of contact for every visit."],
    ["What is included in the first walkthrough?", "The walkthrough reviews room types, traffic, surfaces, restrooms, trash, floors, access, schedule, current pain points, and the cleaning standard you want maintained."],
    ["Can this become a recurring cleaning plan?", "Yes. The goal is usually a recurring plan with a written checklist, consistent schedule, issue reporting, and quality follow-up."],
  ]
}

export function SeoLandingPage({ page }: { page: SeoPage }) {
  const scope = pageScope(page)
  const details = facilityDetails(page)
  const links = relatedLinks(page)

  return (
    <>
      <section className="border-b border-slate-200 bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.76fr_1fr] lg:items-end">
          <div>
            <Badge className="border-sky-200 bg-sky-50 text-[#0a6f9f]">{pageBadge(page)}</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">{page.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{page.description}</p>
          </div>
          <div className="border-l-4 border-sky-300 bg-[#f6f9fc] p-6">
            <p className="text-sm font-black uppercase text-[#075985]">Walkthrough-first commercial cleaning</p>
            <p className="mt-3 text-2xl font-black">Get a cleaning plan matched to your rooms, traffic, restrooms, access rules, and schedule.</p>
            <Button asChild className="mt-6 bg-[#091a2a] text-white hover:bg-[#16324d]">
              <a href={QUOTE_URL}>Request a walkthrough <ArrowRight className="ml-2 size-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.72fr_1fr]">
        <div>
          <p className="text-sm font-black uppercase text-[#075985]">Cleaning plan</p>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">A better way to keep the facility ready.</h2>
        </div>
        <div className="grid gap-4">
          {scope.map((item) => (
            <div key={item} className="grid grid-cols-[1.5rem_1fr] gap-3 border-b border-slate-200 pb-4">
              <StatusDot className="mt-1" />
              <p className="leading-7 text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase text-[#075985]">What can be included</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">Details that make the cleaning feel consistent.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The exact checklist is finalized after the walkthrough, but these are the kinds of facility needs the service plan can cover.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {details.map((item) => (
              <article key={item} className="border-t border-slate-300 pt-4">
                <p className="leading-7 text-slate-600">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase text-[#075985]">Explore related cleaning options</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">Choose the right service, city, or facility type.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="flex min-h-16 items-center justify-between border-t border-slate-300 pt-4 font-black text-[#091a2a]">
                <span>{link.label}</span>
                <LinkArrow />
              </a>
            ))}
          </div>
        </div>
      </section>

      {"nearby" in page ? (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="text-sm font-black uppercase text-[#075985]">Nearby commercial cleaning coverage</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {page.nearby.map((city) => (
              <a key={city.slug} href={`/${cityHubRoute(city)}`} className="inline-flex min-h-10 items-center gap-2 rounded-sm bg-white px-3 text-sm font-black text-[#091a2a]">
                <StatusDot className="size-2.5 border-[1.5px] ring-2" />
                {city.name}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-[#091a2a] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase text-sky-300">FAQ</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">Questions businesses usually ask before a walkthrough.</h2>
          </div>
          <div className="grid gap-5">
            {faqItems(page).map(([question, answer]) => (
              <article key={question} className="border-t border-white/15 pt-5">
                <h3 className="text-xl font-black">{question}</h3>
                <p className="mt-3 leading-7 text-white/68">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
