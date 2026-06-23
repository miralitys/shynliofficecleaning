import fs from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const distDir = path.join(root, "dist")
const dataPath = path.join(root, "src/site/seo-routes.json")
const articleGuidesPath = path.join(root, "src/site/article-guides.json")
const siteUrl = "https://shynliofficecleaning.com"
const quoteUrl = "https://shynlicleaningservice.com/quote"

const data = JSON.parse(await fs.readFile(dataPath, "utf8"))
const articleGuides = JSON.parse(await fs.readFile(articleGuidesPath, "utf8"))
const shell = await fs.readFile(path.join(distDir, "index.html"), "utf8")

const cityServices = data.services.filter((service) => service.cityEnabled)
const cityIndustries = data.industries.filter((industry) => industry.cityEnabled)
const businessId = `${siteUrl}/#business`
const websiteId = `${siteUrl}/#website`
const legalDocuments = {
  "privacy-policy": {
    updated: "Last Updated: February 16, 2026",
    sections: [
      ["Information we collect", [
        "Contact, service, access, scheduling, billing, and business representative details you provide.",
        "Website/device data such as IP address, browser type, pages visited, clicks, referring URLs, cookies, pixels, and similar technologies.",
        "Service delivery records including internal notes, quality-control photos when applicable, and call recordings where permitted after notice.",
        "Limited data from service providers such as scheduling/CRM tools, payment processors, communications tools, and review platforms.",
      ]],
      ["How we use information", [
        "To provide quotes, schedule service, coordinate access, complete cleaning work, process payments, prevent fraud, and send service updates.",
        "To support clients, improve the website and operations, maintain quality standards, train teams, resolve disputes, and keep business records.",
        "To manage consent, opt-outs, transactional messages, marketing where permitted, and legal compliance.",
      ]],
      ["Cookies, analytics, advertising, and sharing", [
        "Essential cookies keep the website working; analytics and advertising technologies may measure site performance and ad effectiveness.",
        "SHYNLI LLC does not sell personal information, but advertising/analytics partners may collect cookie or pixel data that can be considered targeted-advertising sharing under some state laws.",
        "Information may be shared with vendors such as payment processors, GoHighLevel, Twilio, hosting, analytics, email, insurance, legal, or dispute-resolution providers when needed to operate the business.",
      ]],
      ["Your choices and contact", [
        "You may request access, correction, deletion, portability, or opt-out where applicable by contacting SHYNLI LLC.",
        "Marketing SMS opt-out is available by replying STOP; marketing email opt-out is available through unsubscribe links or by contacting info@shynli.com.",
        "Questions: info@shynli.com | +1 (630) 812-7077 | Legal notices: P.O. Box 2492, Naperville IL 60566.",
      ]],
    ],
  },
  "terms-of-service": {
    updated: "Last Updated: February 16, 2026",
    sections: [
      ["Acceptance, scope, and client responsibilities", [
        "Booking online, approving an estimate, requesting service, clicking Book/Confirm, paying an invoice, or using services constitutes acceptance.",
        "Services are limited to the confirmed package, checklist, proposal, estimate, invoice, or written scope; extra tasks need approval and may add charges.",
        "Clients must provide accurate property details, service conditions, special surfaces, pets, access, parking, building rules, working utilities, and a safe work environment.",
      ]],
      ["Safety, quality, and service limits", [
        "SHYNLI LLC may refuse, suspend, or terminate service for unsafe conditions, biohazards, pests, hostile conduct, weapons, illegal substances, or other prohibited conditions.",
        "Standard cleaning does not include restoration, hazardous cleanup, biohazard remediation, mold/asbestos/lead work, pest extermination, hauling, heavy furniture moving, or unsafe ladder work unless separately agreed.",
        "Quality concerns should be reported within 48 hours with photos and details; re-clean, spot correction, credit, or discount may be chosen as the reasonable resolution.",
      ]],
      ["Payments, cancellations, claims, and liability", [
        "Payment is due upon completion or final invoice unless otherwise agreed; a valid card may be required to reserve the appointment.",
        "Cancellation/no-show fees may apply: more than 48 hours is $0, 24-48 hours is $50, 12-24 hours is 50%, and less than 12 hours or same-day cancellation is 100% of the booked price.",
        "Damage or missing-item claims must be reported promptly; missing-item liability is capped as described in the source Terms unless law requires otherwise.",
        "Liability limits, arbitration, jury-trial waiver, class-action waiver, non-solicitation, force majeure, governing law, and venue provisions apply under the full Terms.",
      ]],
      ["Legal notices", [
        "Illinois law governs. If arbitration does not apply, disputes are heard in DuPage County, Illinois, or the county where services were performed, to the fullest extent permitted by law.",
        "Legal notices and arbitration opt-outs: SHYNLI LLC, P.O. Box 2492, Naperville IL 60566.",
        "Email: info@shynli.com | Phone: +1 (630) 812-7077 | Website: ShynliOfficeCleaning.com.",
      ]],
    ],
  },
  "cancellation-policy": {
    updated: "Last Updated: February 13, 2026",
    sections: [
      ["How to cancel or reschedule", [
        "Reply to the confirmation or reminder SMS/text.",
        "Email info@shynli.com.",
        "Call or text +1 (630) 812-7077.",
        "Requests are effective when received; processing may be delayed outside normal operating hours.",
      ]],
      ["Cancellation and reschedule fees", [
        "More than 48 hours before the appointment: $0.",
        "24-48 hours before the appointment: $50 flat fee.",
        "12-24 hours before the appointment: 50% of the booked price.",
        "Less than 12 hours before the appointment, same-day cancellation, or same-day reschedule: 100% of the booked price.",
      ]],
      ["No-show, no-access, refunds, and late arrival", [
        "A booking may be treated as a 100% no-show/no-access charge if the team cannot enter because of locked doors, incorrect codes, missing keys, denied building access, unavailable property, guests not checked out, or unreachable contacts.",
        "If entry cannot be obtained within 15 minutes of arrival because of access issues, the appointment may be treated as a no-show; optional waiting may be billed at $45/hour, prorated, if available.",
        "If a cancelled/rescheduled slot is successfully rebooked, the cancellation fee is reduced by recovered labor revenue, excluding non-refundable dispatch or processing costs.",
        "If SHYNLI LLC arrives more than 60 minutes late for reasons within reasonable control and cannot complete the booked scope, SHYNLI LLC may reschedule at no charge or issue a proportional credit for the unperformed portion.",
      ]],
      ["Unsafe or unsuitable conditions", [
        "If service is refused or terminated because of unsafe conditions, prohibited conditions, or conduct issues, SHYNLI LLC may retain amounts tied to reserved labor time, dispatch/travel, costs incurred, and work performed, subject to refunds required by law.",
        "Questions: info@shynli.com | +1 (630) 812-7077.",
      ]],
    ],
  },
}

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

function guideHubRoute() {
  return {
    kind: "guide-hub",
    route: "commercial-cleaning-guides",
    title: "Commercial Cleaning Guides for Chicago Suburbs Businesses",
    description: "Practical commercial cleaning guides for Chicago suburbs offices, property managers, facility teams, and small business owners preparing for a walkthrough.",
    bullets: ["Vendor selection and written scope", "Restrooms, break rooms, supplies, and desk rules", "Cleaning frequency, access, floors, odors, and vendor transitions"],
    articles: articleGuides,
  }
}

function articleGuideRoutes() {
  return articleGuides.map((article) => ({
    kind: "article-guide",
    route: article.route,
    title: article.title,
    description: article.metaDescription,
    bullets: [article.targetQuestion, article.audience, "Walkthrough-first commercial cleaning guidance"],
    article,
  }))
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

  return [...servicePages, ...industryPages, serviceAreasPage, ...cityPages, ...cityServicePages, ...cityIndustryPages, ...supportPages, guideHubRoute(), ...articleGuideRoutes(), ...legalPages]
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

function routeCanonical(route) {
  return `${siteUrl}/${route.route}`
}

function inboundArticleLinks(route, limit = 4) {
  if (route.kind === "article-guide" || route.kind === "guide-hub") return []

  const canonical = routeCanonical(route)
  return articleGuides
    .slice()
    .reverse()
    .filter((article) => article.inboundLinksFrom.includes(canonical))
    .slice(0, limit)
    .map((article) => ({
      label: article.seoTitle.replace(" | Shynli", ""),
      href: `/${article.route}`,
    }))
}

function dedupeLinkItems(items, limit = 8) {
  const seen = new Set()
  return items
    .filter((item) => {
      if (seen.has(item.href)) return false
      seen.add(item.href)
      return true
    })
    .slice(0, limit)
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
  const isArticle = route.kind === "article-guide"
  const isGuideHub = route.kind === "guide-hub"
  const faqEntities = route.kind === "legal" || isArticle || isGuideHub ? [] : routeFaqs(route)
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
      about: { "@id": isArticle || isGuideHub ? businessId : `${canonical}#service` },
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
        ...(isArticle
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: "Commercial Cleaning Guides",
                item: `${siteUrl}/commercial-cleaning-guides`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: route.title,
                item: canonical,
              },
            ]
          : [
              {
                "@type": "ListItem",
                position: 2,
                name: route.title,
                item: canonical,
              },
            ]),
      ],
    },
  ]

  if (isArticle) {
    graph.push({
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: route.title,
      description: route.description,
      mainEntityOfPage: { "@id": `${canonical}#webpage` },
      author: { "@id": businessId },
      publisher: { "@id": businessId },
      dateModified: route.article.lastUpdated,
      about: ["office cleaning", "commercial cleaning", "janitorial services"],
    })
  } else if (isGuideHub) {
    graph.push({
      "@type": "ItemList",
      "@id": `${canonical}#guides`,
      name: "Commercial Cleaning Guides",
      itemListElement: route.articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `${siteUrl}/${article.route}`,
      })),
    })
  } else if (route.kind !== "legal") {
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

function staticLogo() {
  return `<a href="/#top" class="flex min-h-11 items-center gap-3" aria-label="ShynliOfficeCleaning.com home">
  <span class="flex size-10 items-center justify-center rounded-sm bg-[#091a2a] text-sky-200"><span aria-hidden="true" class="block size-4 rotate-45 border-2 border-current"></span></span>
  <span class="text-lg font-black tracking-normal">Shynli Office Cleaning</span>
</a>`
}

function staticHeader() {
  return `<header class="sticky top-0 z-30 border-b border-slate-200/70 bg-white/88 backdrop-blur-md">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
    ${staticLogo()}
    <nav class="hidden items-center gap-8 text-sm font-black text-slate-700 lg:flex">
      <a href="/#services" class="inline-flex min-h-11 items-center">Services</a>
      <a href="/#industries" class="inline-flex min-h-11 items-center">Industries</a>
      <a href="/commercial-cleaning-guides" class="inline-flex min-h-11 items-center">Guides</a>
      <a href="/#service-areas" class="inline-flex min-h-11 items-center">Areas</a>
      <a href="/#quality" class="inline-flex min-h-11 items-center">Quality</a>
      <a href="${quoteUrl}" class="inline-flex min-h-11 items-center">Quote</a>
    </nav>
    <a href="${quoteUrl}" class="hidden min-h-10 items-center rounded-sm bg-[#091a2a] px-4 py-2 text-sm font-black text-white transition hover:bg-[#16324d] sm:inline-flex">Free walkthrough</a>
  </div>
</header>`
}

function staticFooter() {
  return `<footer class="bg-[#071421] px-5 py-14 text-white sm:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="grid gap-10 border-b border-white/12 pb-10 lg:grid-cols-[1.1fr_0.72fr_0.72fr_0.72fr_0.74fr]">
      <div>
        ${staticLogo()}
        <p class="mt-5 max-w-sm leading-7 text-white/64">Commercial cleaning, office cleaning, and janitorial service for Chicago suburbs businesses that need reliable recurring care.</p>
        <div class="mt-6 flex flex-wrap gap-2">
          <span class="inline-flex min-h-6 items-center rounded-sm bg-white/10 px-2.5 py-0.5 text-xs font-black text-white">Walkthrough quotes</span>
          <span class="inline-flex min-h-6 items-center rounded-sm bg-sky-300 px-2.5 py-0.5 text-xs font-black text-[#071421]">Chicago suburbs</span>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-black uppercase text-sky-300">Services</h3>
        <ul class="mt-5 space-y-3 text-sm font-semibold text-white/68">
          <li><a href="/janitorial-services" class="inline-flex min-h-9 items-center">Routine janitorial</a></li>
          <li><a href="/office-cleaning-services" class="inline-flex min-h-9 items-center">Office cleaning</a></li>
          <li><a href="/day-porter-services" class="inline-flex min-h-9 items-center">Day porter</a></li>
          <li><a href="/floor-care-services" class="inline-flex min-h-9 items-center">Floor care</a></li>
          <li><a href="/commercial-disinfection-services" class="inline-flex min-h-9 items-center">Disinfection</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-black uppercase text-sky-300">Facilities</h3>
        <ul class="mt-5 space-y-3 text-sm font-semibold text-white/68">
          <li><a href="/office-building-cleaning" class="inline-flex min-h-9 items-center">Offices</a></li>
          <li><a href="/medical-office-cleaning-services" class="inline-flex min-h-9 items-center">Medical offices</a></li>
          <li><a href="/retail-store-cleaning-services" class="inline-flex min-h-9 items-center">Retail spaces</a></li>
          <li><a href="/property-management-cleaning" class="inline-flex min-h-9 items-center">Managed properties</a></li>
          <li><a href="/commercial-cleaning-guides" class="inline-flex min-h-9 items-center">Commercial cleaning guides</a></li>
          <li><a href="/commercial-cleaning-checklist" class="inline-flex min-h-9 items-center">Quality control</a></li>
          <li><a href="/#service-areas" class="inline-flex min-h-9 items-center">Service areas</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-black uppercase text-sky-300">Legal</h3>
        <ul class="mt-5 space-y-3 text-sm font-semibold text-white/68">
          <li><a href="/privacy-policy" class="inline-flex min-h-9 items-center">Privacy Policy</a></li>
          <li><a href="/terms-of-service" class="inline-flex min-h-9 items-center">Terms of Service</a></li>
          <li><a href="/cancellation-policy" class="inline-flex min-h-9 items-center">Cancellation Policy</a></li>
          <li><a href="mailto:info@shynli.com" class="inline-flex min-h-9 items-center">info@shynli.com</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-black uppercase text-sky-300">Contact</h3>
        <ul class="mt-5 space-y-3 text-sm font-semibold text-white/68">
          <li><a href="tel:+16308127077" class="inline-flex min-h-9 items-center">(630) 812-7077</a></li>
          <li>Chicago suburbs</li>
          <li><a href="${quoteUrl}" class="inline-flex min-h-9 items-center">Request walkthrough</a></li>
          <li>After-hours schedules</li>
          <li>Commercial quote required</li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col gap-4 pt-8 text-sm font-semibold text-white/48 md:flex-row md:items-center md:justify-between">
      <p>Copyright 2026 ShynliOfficeCleaning.com.</p>
      <div class="flex flex-wrap gap-5">
        <a href="/#top" class="inline-flex min-h-9 min-w-9 items-center">Top</a>
        <a href="${quoteUrl}" class="inline-flex min-h-9 items-center">Quote</a>
        <a href="/privacy-policy" class="inline-flex min-h-9 items-center">Privacy</a>
        <span>Commercial walkthrough quotes</span>
      </div>
    </div>
  </div>
</footer>`
}

function staticDot() {
  return `<span aria-hidden="true" class="mt-1 inline-block size-3.5 shrink-0 rounded-full border-2 border-sky-500 bg-sky-50 ring-2 ring-sky-100"></span>`
}

function staticBody(route) {
  if (route.kind === "legal") return staticLegalBody(route)
  if (route.kind === "guide-hub") return staticGuideHubBody(route)
  if (route.kind === "article-guide") return staticArticleBody(route)

  const bullets = route.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
  const related = dedupeLinkItems([
    ...inboundArticleLinks(route),
    ...data.services.slice(0, 6).map((service) => ({
      label: service.name,
      href: `/${service.route}`,
    })),
  ])
    .map((item) => `<a href="${item.href}" class="flex min-h-14 items-center justify-between border-t border-slate-300 pt-4 font-black text-[#091a2a]"><span>${escapeHtml(item.label)}</span><span aria-hidden="true" class="ml-3 h-2.5 w-2.5 shrink-0 rotate-45 border-r-2 border-t-2 border-sky-500"></span></a>`)
    .join("")
  return `<main class="min-h-screen overflow-hidden bg-[#f6f9fc] text-[#091a2a]">
  ${staticHeader()}
  <section class="border-b border-slate-200 bg-white px-5 py-16 sm:px-8 lg:py-24">
    <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.76fr_1fr] lg:items-end">
      <div>
        <span class="inline-flex min-h-7 items-center rounded-sm border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-black text-[#0a6f9f]">${escapeHtml(route.kind === "city" ? "Local commercial cleaning" : "Walkthrough-first commercial cleaning")}</span>
        <h1 class="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">${escapeHtml(route.title)}</h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">${escapeHtml(route.description)}</p>
      </div>
      <div class="border-l-4 border-sky-300 bg-[#f6f9fc] p-6">
        <p class="text-sm font-black uppercase text-[#075985]">Walkthrough-first commercial cleaning</p>
        <p class="mt-3 text-2xl font-black">Get a cleaning plan matched to your rooms, traffic, restrooms, access rules, and schedule.</p>
        <a href="${quoteUrl}" class="mt-6 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#091a2a] px-4 py-2 text-sm font-black text-white transition hover:bg-[#16324d]">Request a walkthrough <span aria-hidden="true" class="ml-2 inline-block h-2.5 w-2.5 rotate-45 border-r-2 border-t-2"></span></a>
      </div>
    </div>
  </section>
  <section class="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.72fr_1fr]">
    <div>
      <p class="text-sm font-black uppercase text-[#075985]">Cleaning plan</p>
      <h2 class="mt-3 text-3xl font-black leading-tight sm:text-5xl">A better way to keep the facility ready.</h2>
    </div>
    <ul class="grid gap-4">${bullets.replaceAll("<li>", `<li class="grid grid-cols-[1.5rem_1fr] gap-3 border-b border-slate-200 pb-4">${staticDot()}<span class="leading-7 text-slate-600">`).replaceAll("</li>", "</span></li>")}</ul>
  </section>
  <section class="border-y border-slate-200 bg-white px-5 py-16 sm:px-8">
    <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr]">
      <div>
        <p class="text-sm font-black uppercase text-[#075985]">What can be included</p>
        <h2 class="mt-3 text-3xl font-black leading-tight sm:text-5xl">Details that make the cleaning feel consistent.</h2>
        <p class="mt-5 text-lg leading-8 text-slate-600">The exact checklist is finalized after the walkthrough, but these are the kinds of facility needs the service plan can cover.</p>
      </div>
      <div class="grid gap-4 sm:grid-cols-2">
        ${["Reception areas and entrances", "Private offices and shared workspaces", "Restrooms and break rooms", "Floors, glass, trash, and high-touch points"].map((item) => `<article class="border-t border-slate-300 pt-4"><p class="leading-7 text-slate-600">${item}</p></article>`).join("")}
      </div>
    </div>
  </section>
  <section class="px-5 py-16 sm:px-8">
    <div class="mx-auto max-w-7xl">
      <p class="text-sm font-black uppercase text-[#075985]">Explore related cleaning options</p>
      <h2 class="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">Choose the right service, guide, city, or facility type.</h2>
      <nav class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">${related}</nav>
    </div>
  </section>
  <section class="bg-[#091a2a] px-5 py-16 text-white sm:px-8">
    <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1fr]">
      <div>
        <p class="text-sm font-black uppercase text-sky-300">FAQ</p>
        <h2 class="mt-3 text-3xl font-black leading-tight sm:text-5xl">Questions businesses usually ask before a walkthrough.</h2>
      </div>
      <div class="grid gap-5">
        ${routeFaqs(route).map((faq) => `<article class="border-t border-white/15 pt-5"><h3 class="text-xl font-black">${escapeHtml(faq.question)}</h3><p class="mt-3 leading-7 text-white/68">${escapeHtml(faq.answer)}</p></article>`).join("")}
      </div>
    </div>
  </section>
  ${staticFooter()}
</main>`
}

function staticGuideHubBody(route) {
  return `<main class="min-h-screen overflow-hidden bg-[#f6f9fc] text-[#091a2a]">
  ${staticHeader()}
  <section class="border-b border-slate-200 bg-white px-5 py-16 sm:px-8 lg:py-24">
    <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.76fr_1fr] lg:items-end">
      <div>
        <span class="inline-flex min-h-7 items-center rounded-sm border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-black text-[#0a6f9f]">Commercial cleaning guides</span>
        <h1 class="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">${escapeHtml(route.title)}</h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">${escapeHtml(route.description)}</p>
      </div>
      <div class="border-l-4 border-sky-300 bg-[#f6f9fc] p-6">
        <p class="text-sm font-black uppercase text-[#075985]">Before the walkthrough</p>
        <p class="mt-3 text-2xl font-black">Use these guides to prepare the scope, schedule, restroom and break room rules, floor needs, odor concerns, access details, and quality-control questions before choosing a provider.</p>
        <a href="${quoteUrl}" class="mt-6 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#091a2a] px-4 py-2 text-sm font-black text-white transition hover:bg-[#16324d]">Request a walkthrough <span aria-hidden="true" class="ml-2 inline-block h-2.5 w-2.5 rotate-45 border-r-2 border-t-2"></span></a>
      </div>
    </div>
  </section>
  <section class="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-8 lg:grid-cols-2">
    ${route.articles.map((article) => `<article class="border-t border-slate-300 pt-6">
      <p class="text-sm font-black uppercase text-[#075985]">${escapeHtml(article.targetQuestion)}</p>
      <h2 class="mt-3 text-2xl font-black leading-tight"><a href="/${article.route}">${escapeHtml(article.title)}</a></h2>
      <p class="mt-4 leading-7 text-slate-600">${escapeHtml(article.excerpt)}</p>
      <a href="/${article.route}" class="mt-5 inline-flex min-h-10 items-center text-sm font-black text-sky-700">Read guide <span aria-hidden="true" class="ml-2 inline-block h-2.5 w-2.5 rotate-45 border-r-2 border-t-2"></span></a>
    </article>`).join("")}
  </section>
  ${staticFooter()}
</main>`
}

function staticArticleBody(route) {
  const related = route.article.internalLinks
    .filter((link) => link.startsWith(siteUrl))
    .filter((link) => link !== route.article.canonicalUrl)
    .slice(0, 6)
    .map((link) => {
      const label = link.replace(`${siteUrl}/`, "").replaceAll("-", " ")
      return `<a href="${link}" class="flex min-h-14 items-center justify-between border-t border-slate-300 pt-4 font-black text-[#091a2a]"><span>${escapeHtml(label)}</span><span aria-hidden="true" class="ml-3 h-2.5 w-2.5 shrink-0 rotate-45 border-r-2 border-t-2 border-sky-500"></span></a>`
    })
    .join("")

  return `<main class="min-h-screen overflow-hidden bg-[#f6f9fc] text-[#091a2a]">
  ${staticHeader()}
  <article class="bg-white px-5 py-16 sm:px-8 lg:py-24">
    <div class="mx-auto max-w-4xl">
      <nav class="text-sm font-black text-slate-500" aria-label="Breadcrumb">
        <a href="/" class="text-sky-700">Home</a>
        <span class="px-2">/</span>
        <a href="/commercial-cleaning-guides" class="text-sky-700">Commercial Cleaning Guides</a>
      </nav>
      <p class="mt-8 text-sm font-black uppercase text-[#075985]">Commercial cleaning guide</p>
      <h1 class="mt-3 text-4xl font-black leading-tight sm:text-6xl">${escapeHtml(route.title)}</h1>
      <p class="mt-6 max-w-3xl text-xl leading-8 text-slate-600">${escapeHtml(route.article.targetQuestion)}</p>
      <div class="mt-8 border-y border-slate-200 py-6 text-sm font-black text-slate-500">
        <span>Last updated ${escapeHtml(route.article.lastUpdated)}</span>
        <span class="px-3">/</span>
        <span>${escapeHtml(route.article.audience)}</span>
      </div>
      <div class="mt-10">${route.article.bodyHtml}</div>
    </div>
  </article>
  <section class="border-y border-slate-200 bg-[#f6f9fc] px-5 py-16 sm:px-8">
    <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1fr]">
      <div>
        <p class="text-sm font-black uppercase text-[#075985]">Related pages</p>
        <h2 class="mt-3 text-3xl font-black leading-tight sm:text-5xl">Use the guide with the right service page.</h2>
        <p class="mt-5 text-lg leading-8 text-slate-600">These links connect the article back to the walkthrough, scope, checklist, pricing, and service pages a business usually needs next.</p>
      </div>
      <nav class="grid gap-3 sm:grid-cols-2">${related}</nav>
    </div>
  </section>
  <section class="bg-[#091a2a] px-5 py-16 text-white sm:px-8">
    <div class="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm font-black uppercase text-sky-300">Walkthrough quote</p>
        <h2 class="mt-3 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">Ready to turn this into a cleaning scope?</h2>
      </div>
      <a href="${quoteUrl}" class="inline-flex min-h-11 items-center justify-center rounded-sm bg-sky-300 px-6 py-3 text-sm font-black text-[#091a2a] transition hover:bg-sky-200">Request a walkthrough <span aria-hidden="true" class="ml-2 inline-block h-2.5 w-2.5 rotate-45 border-r-2 border-t-2"></span></a>
    </div>
  </section>
  ${staticFooter()}
</main>`
}

function staticLegalBody(route) {
  const document = legalDocuments[route.route]
  const sections = (document?.sections || [])
    .map(
      ([title, items]) => `<article class="border-b border-slate-200 pb-8">
        <h2 class="text-2xl font-black">${escapeHtml(title)}</h2>
        <ul class="mt-5 grid gap-4 text-base leading-7 text-slate-600">
          ${items.map((item) => `<li class="grid grid-cols-[1.5rem_1fr] gap-3">${staticDot()}<span>${escapeHtml(item)}</span></li>`).join("")}
        </ul>
      </article>`,
    )
    .join("")

  return `<main class="min-h-screen overflow-hidden bg-[#f6f9fc] text-[#091a2a]">
  ${staticHeader()}
  <section class="px-5 py-16 sm:px-8 lg:py-24">
    <div class="mx-auto max-w-5xl">
      <a href="/#top" class="inline-flex min-h-11 items-center text-sm font-black text-sky-700">Back to ShynliOfficeCleaning.com</a>
      <div class="mt-8 border-y border-slate-200 py-10">
        <p class="text-sm font-black uppercase text-[#075985]">Legal</p>
        <h1 class="mt-3 text-4xl font-black leading-tight sm:text-6xl">${escapeHtml(route.title)}</h1>
        <p class="mt-4 text-sm font-black text-slate-500">${escapeHtml(document?.updated || "")}</p>
        <p class="mt-6 max-w-3xl text-lg leading-8 text-slate-600">${escapeHtml(route.description)}</p>
      </div>
      <div class="mt-10 grid gap-8">${sections}</div>
    </div>
  </section>
  ${staticFooter()}
</main>`
}

function withMeta(route) {
  const canonical = `${siteUrl}/${route.route}`
  const schema = jsonLdSafe(routeSchema(route))
  const pageTitle = route.kind === "article-guide" ? route.article.seoTitle : route.kind === "guide-hub" ? "Commercial Cleaning Guides | Shynli" : `${route.title} | ShynliOfficeCleaning.com`
  const keywordsMeta = route.kind === "article-guide" ? `<meta name="keywords" content="${escapeHtml(route.article.keywords)}">\n` : ""
  let html = shell
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "")
    .replace(/<link rel="modulepreload" crossorigin href="[^"]+">\n\s*/g, "")
    .replace(/<script type="module" crossorigin src="[^"]+"><\/script>\n\s*/g, "")
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s, `<meta name="description" content="${escapeHtml(route.description)}">`)
    .replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${staticBody(route)}</div>`)

  if (!html.includes('rel="canonical"')) {
    html = html.replace("</head>", `<link rel="canonical" href="${canonical}">\n</head>`)
  }

  html = html.replace("</head>", `${keywordsMeta}<script type="application/ld+json">${schema}</script>\n</head>`)

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
        guideHubPages: 1,
        articleGuidePages: articleGuides.length,
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
