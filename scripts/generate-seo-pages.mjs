import fs from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const distDir = path.join(root, "dist")
const dataPath = path.join(root, "src/site/seo-routes.json")
const siteUrl = "https://shynliofficecleaning.com"
const quoteUrl = "https://shynlicleaningservice.com/quote"

const data = JSON.parse(await fs.readFile(dataPath, "utf8"))
const shell = await fs.readFile(path.join(distDir, "index.html"), "utf8")

const cityServices = data.services.filter((service) => service.cityEnabled)
const cityIndustries = data.industries.filter((industry) => industry.cityEnabled)
const businessId = `${siteUrl}/#business`
const websiteId = `${siteUrl}/#website`

function cityHubRoute(city) {
  return `cleaning-services-${city.slug}`
}

function cityServiceRoute(city, service) {
  return `${service.slug}-${city.slug}`
}

function cityIndustryRoute(city, industry) {
  return `${industry.slug}-facility-cleaning-${city.slug}`
}

function nearbyCities(city) {
  const index = data.cities.findIndex((item) => item.slug === city.slug)
  return [-2, -1, 1, 2]
    .map((offset) => data.cities[(index + offset + data.cities.length) % data.cities.length])
    .filter((item) => item.slug !== city.slug)
}

function supportDescription(support) {
  return `${support.intent}, written for Chicago suburbs businesses comparing scope, schedule, and walkthrough-based service.`
}

function allRoutes() {
  const servicePages = data.services.map((service) => ({
    kind: "service",
    route: service.route,
    title: `${service.name} for Chicago Suburbs Businesses`,
    description: `${service.name} built around walkthroughs, written scopes, recurring schedules, and quality control for commercial facilities.`,
    bullets: [service.intent, "Written cleaning scopes", "Commercial walkthrough quote"],
    service,
  }))

  const industryPages = data.industries.map((industry) => ({
    kind: "industry",
    route: industry.route,
    title: `${industry.name} Cleaning Services`,
    description: `Cleaning programs for ${industry.intent}, with a walkthrough-first quote and a written service scope.`,
    bullets: [industry.intent, "Facility-specific checklist", "Recurring service planning"],
    industry,
  }))

  const cityPages = data.cities.map((city) => ({
    kind: "city",
    route: cityHubRoute(city),
    title: `Commercial Cleaning Services in ${city.name}, IL`,
    description: `Office cleaning, janitorial services, and commercial cleaning support for businesses in ${city.name} and nearby ${city.county} communities.`,
    bullets: [`Commercial cleaning in ${city.name}`, `Coverage near ${city.county}`, "Walkthrough quote process"],
    city,
    nearby: nearbyCities(city),
  }))

  const serviceAreasPage = {
    kind: "service-areas",
    route: "service-areas",
    title: "Commercial Cleaning Service Areas",
    description: "Office cleaning, janitorial services, and commercial cleaning coverage across 42 Chicago suburbs service areas.",
    bullets: ["Office cleaning coverage across Chicago suburbs communities", "Local pages for service, city, and facility needs", "Walkthrough quotes for commercial spaces"],
  }

  const cityServicePages = data.cities.flatMap((city) =>
    cityServices.map((service) => ({
      kind: "city-service",
      route: cityServiceRoute(city, service),
      title: `${service.name} in ${city.name}, IL`,
      description: `${service.name} for ${city.name} businesses that need a clear scope, reliable schedule, and walkthrough-based quote.`,
      bullets: [service.intent, `${city.name} local scheduling`, nearbyCities(city).map((item) => item.name).join(", ")],
      city,
      service,
      nearby: nearbyCities(city),
    })),
  )

  const cityIndustryPages = data.cities.flatMap((city) =>
    cityIndustries.map((industry) => ({
      kind: "city-industry",
      route: cityIndustryRoute(city, industry),
      title: `${industry.name} Cleaning in ${city.name}, IL`,
      description: `Cleaning support for ${industry.intent} in ${city.name}, with local scheduling and a facility-specific checklist.`,
      bullets: [industry.intent, `${city.name} commercial facilities`, "Facility-specific cleaning scope"],
      city,
      industry,
      nearby: nearbyCities(city),
    })),
  )

  const supportPages = data.supportPages.map((support) => ({
    kind: "support",
    route: support.route,
    title: support.name,
    description: supportDescription(support),
    bullets: [support.intent, "Commercial cleaning planning", "Walkthrough-first quote"],
    support,
  }))

  const legalPages = [
    {
      kind: "legal",
      route: "privacy-policy",
      title: "Privacy Policy",
      description: "How SHYNLI LLC handles information for ShynliOfficeCleaning.com quote requests, bookings, service communications, and website use.",
      bullets: ["Personal information", "Website analytics", "Contact choices"],
    },
    {
      kind: "legal",
      route: "terms-of-service",
      title: "Terms of Service",
      description: "Terms for SHYNLI LLC cleaning services, estimates, bookings, invoices, cancellations, service responsibilities, and legal notices.",
      bullets: ["Service scope", "Payments and claims", "Legal notices"],
    },
    {
      kind: "legal",
      route: "cancellation-policy",
      title: "Cancellation Policy",
      description: "Cancellation, rescheduling, no-show, no-access, refund, and late-arrival rules for SHYNLI LLC bookings.",
      bullets: ["Cancellation windows", "No-access rules", "Refund handling"],
    },
  ]

  return [...servicePages, ...industryPages, serviceAreasPage, ...cityPages, ...cityServicePages, ...cityIndustryPages, ...supportPages, ...legalPages]
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function jsonLdSafe(value) {
  return JSON.stringify(value).replaceAll("</script", "<\\/script")
}

function cityNames(route) {
  if (route.city) {
    return [route.city.name, ...route.nearby.map((city) => city.name)]
  }

  return data.cities.map((city) => city.name)
}

function routeFaqs(route) {
  const area = route.city ? ` in ${route.city.name}` : " for Chicago suburbs businesses"
  const service = route.service?.name || route.industry?.name || route.title.replace(/ in .+$/, "")

  return [
    {
      question: `How is ${service.toLowerCase()} priced${area}?`,
      answer:
        "Pricing is based on a walkthrough, the number of rooms and restrooms, traffic level, floor needs, access rules, cleaning frequency, and the written scope agreed before service starts.",
    },
    {
      question: `Can service be scheduled after business hours${area}?`,
      answer:
        "Yes. Evening, early morning, and weekend schedules can be planned around staff, visitors, alarms, keys, and building access requirements.",
    },
    {
      question: "What makes the cleaning plan specific to the facility?",
      answer:
        "The scope can separate reception areas, private offices, conference rooms, kitchens, restrooms, floors, glass, trash removal, high-touch surfaces, and recurring quality notes.",
    },
  ]
}

function routeSchema(route) {
  const canonical = `${siteUrl}/${route.route}`
  const areaServed = cityNames(route).map((name) => ({
    "@type": "City",
    name,
    addressRegion: "IL",
  }))
  const faqEntities = route.kind === "legal" ? [] : routeFaqs(route)
  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: "ShynliOfficeCleaning.com",
      url: siteUrl,
      telephone: "+1-630-812-7077",
      email: "info@shynli.com",
      priceRange: "Quote-based commercial cleaning plans",
      areaServed,
      serviceType: "Commercial office cleaning and janitorial services",
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${siteUrl}/`,
      name: "ShynliOfficeCleaning.com",
      publisher: { "@id": businessId },
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: route.title,
      description: route.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": `${canonical}#service` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: route.title,
          item: canonical,
        },
      ],
    },
  ]

  if (route.kind !== "legal") {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: route.title,
      serviceType: route.service?.name || route.industry?.name || "Commercial cleaning services",
      provider: { "@id": businessId },
      areaServed,
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          description: "Walkthrough-based quote depending on facility size, frequency, access, room mix, restroom count, floor care, and cleaning scope.",
        },
      },
    })

    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faqEntities.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    })
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}

function staticFooter() {
  return `<footer>
  <p>ShynliOfficeCleaning.com</p>
  <p>Commercial cleaning, office cleaning, and janitorial service for Chicago suburbs businesses that need reliable recurring care.</p>
  <nav aria-label="Footer services">
    <h2>Services</h2>
    <a href="/janitorial-services">Routine janitorial</a>
    <a href="/office-cleaning-services">Office cleaning</a>
    <a href="/day-porter-services">Day porter</a>
    <a href="/floor-care-services">Floor care</a>
    <a href="/commercial-disinfection-services">Disinfection</a>
  </nav>
  <nav aria-label="Footer facilities">
    <h2>Facilities</h2>
    <a href="/office-building-cleaning">Offices</a>
    <a href="/medical-office-cleaning-services">Medical offices</a>
    <a href="/retail-store-cleaning-services">Retail spaces</a>
    <a href="/property-management-cleaning">Managed properties</a>
    <a href="/commercial-cleaning-checklist">Quality control</a>
    <a href="/service-areas">Service areas</a>
  </nav>
  <nav aria-label="Footer legal">
    <h2>Legal</h2>
    <a href="/privacy-policy">Privacy Policy</a>
    <a href="/terms-of-service">Terms of Service</a>
    <a href="/cancellation-policy">Cancellation Policy</a>
    <a href="mailto:info@shynli.com">info@shynli.com</a>
  </nav>
  <nav aria-label="Footer contact">
    <h2>Contact</h2>
    <a href="tel:+16308127077">(630) 812-7077</a>
    <a href="${quoteUrl}">Request walkthrough</a>
    <a href="${quoteUrl}">Quote</a>
  </nav>
  <p>Copyright 2026 ShynliOfficeCleaning.com.</p>
</footer>`
}

function staticBody(route) {
  const bullets = route.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
  const related = data.services
    .slice(0, 6)
    .map((service) => `<a href="/${service.route}">${escapeHtml(service.name)}</a>`)
    .join("")
  return `<main>
  <p>ShynliOfficeCleaning.com</p>
  <h1>${escapeHtml(route.title)}</h1>
  <p>${escapeHtml(route.description)}</p>
  <h2>Commercial cleaning planned around your facility</h2>
  <p>Every cleaning plan starts with the building itself: room types, traffic, restrooms, floors, access rules, preferred schedule, and the cleaning standard your team wants maintained.</p>
  <ul>${bullets}</ul>
  <h2>What can be included</h2>
  <p>Service can cover reception areas, private offices, conference rooms, staff kitchens, restrooms, high-touch surfaces, trash removal, glass touch-ups, floor attention, and recurring quality notes.</p>
  <h2>Related commercial cleaning services</h2>
  <nav>${related}</nav>
  <p><a href="${quoteUrl}">Request a commercial cleaning walkthrough quote</a> for Chicago suburbs facilities.</p>
</main>
${staticFooter()}`
}

function withMeta(route) {
  const canonical = `${siteUrl}/${route.route}`
  const schema = jsonLdSafe(routeSchema(route))
  let html = shell
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "")
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)} | ShynliOfficeCleaning.com</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s, `<meta name="description" content="${escapeHtml(route.description)}">`)
    .replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${staticBody(route)}</div>`)

  if (!html.includes('rel="canonical"')) {
    html = html.replace("</head>", `<link rel="canonical" href="${canonical}">\n</head>`)
  }

  html = html.replace("</head>", `<script type="application/ld+json">${schema}</script>\n</head>`)

  return html
}

const routes = allRoutes()

for (const route of routes) {
  const pageDir = path.join(distDir, route.route)
  await fs.mkdir(pageDir, { recursive: true })
  await fs.writeFile(path.join(pageDir, "index.html"), withMeta(route))
}

const sitemapUrls = [
  "",
  ...routes.map((route) => route.route),
].map((route) => {
  const loc = route ? `${siteUrl}/${route}` : `${siteUrl}/`
  return `<url><loc>${loc}</loc><changefreq>monthly</changefreq><priority>${route ? "0.7" : "1.0"}</priority></url>`
})

await fs.writeFile(
  path.join(distDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join("\n")}\n</urlset>\n`,
)

await fs.writeFile(
  path.join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
)

await fs.writeFile(
  path.join(distDir, "seo-page-manifest.json"),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      baseUrl: siteUrl,
      counts: {
        totalRoutes: routes.length + 1,
        servicePages: data.services.length,
        industryPages: data.industries.length,
        cityPages: data.cities.length,
        cityServicePages: data.cities.length * cityServices.length,
        cityIndustryPages: data.cities.length * cityIndustries.length,
        supportPages: data.supportPages.length,
        legalPages: 3,
      },
      routes: routes.map((route) => ({
        kind: route.kind,
        route: route.route,
        title: route.title,
        description: route.description,
      })),
    },
    null,
    2,
  ),
)

console.log(`Generated ${routes.length} SEO route files plus sitemap.xml and robots.txt.`)
