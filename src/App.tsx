import { useEffect, useState, type ComponentType } from "react"

const QUOTE_URL = "https://shynlicleaningservice.com/quote"
const SITE_NAME = "ShynliOfficeCleaning.com"
type SeoRouteComponent = ComponentType<{ pathname: string }>

const trustSignals = [
  { value: "24h", label: "quote response target" },
  { value: "After-hours", label: "cleaning without interrupting work" },
  { value: "Checklist", label: "scope written before crews start" },
]

const quoteFields = ["Business name", "Facility type", "City / ZIP", "Cleaning frequency", "Contact"]

function cityServiceAreaHref(city: string) {
  const slug = city.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-")
  return `/cleaning-services-${slug}-il`
}

const serviceAreaGroups = [
  {
    label: "A-D",
    cities: ["Addison", "Aurora", "Bartlett", "Batavia", "Bolingbrook", "Bristol", "Burr Ridge", "Carol Stream", "Clarendon Hills", "Darien", "Downers Grove"],
  },
  {
    label: "E-L",
    cities: ["Elmhurst", "Geneva", "Glen Ellyn", "Hinsdale", "Homer Glen", "Itasca", "Lemont", "Lisle", "Lockport", "Lombard"],
  },
  {
    label: "M-S",
    cities: ["Montgomery", "Naperville", "North Aurora", "Oak Brook", "Oswego", "Plainfield", "Romeoville", "St. Charles", "Streamwood", "Sugar Grove"],
  },
  {
    label: "V-Y",
    cities: ["Villa Park", "Warrenville", "Wayne", "West Chicago", "Westmont", "Wheaton", "Willowbrook", "Winfield", "Wood Dale", "Woodridge", "Yorkville"],
  },
]

const industries = [
  {
    value: "offices",
    label: "Offices",
    title: "Office buildings and shared workspaces",
    copy: "Reception areas, conference rooms, kitchens, restrooms, private offices, shared desks, glass, and high-touch surfaces.",
    checklist: ["Nightly or weekly cleaning", "Restroom and breakroom standards", "Trash, floors, dusting, and glass", "Issue reporting after each visit"],
  },
  {
    value: "medical",
    label: "Medical",
    title: "Medical and dental offices",
    copy: "Waiting rooms, staff zones, exam rooms, restrooms, and the high-touch areas that make a facility feel safe and maintained.",
    checklist: ["High-touch surface focus", "Waiting room reset", "Staff area cleaning", "Patient-ready presentation"],
  },
  {
    value: "retail",
    label: "Retail",
    title: "Retail and customer-facing spaces",
    copy: "Storefronts, counters, fitting rooms, glass, public restrooms, back rooms, and floors that need to look ready every morning.",
    checklist: ["Storefront presentation", "Glass and counters", "Customer restroom cleaning", "Opening-ready schedule"],
  },
  {
    value: "managed",
    label: "Managed",
    title: "Common areas and managed properties",
    copy: "Lobbies, stairwells, hallways, elevators, leasing offices, shared restrooms, and building touchpoints.",
    checklist: ["Common area route", "Tenant-facing standards", "Supervisor walkthroughs", "Recurring service plan"],
  },
]

const services = [
  ["Routine janitorial", "Recurring service for offices and commercial spaces that need the same standard kept week after week."],
  ["Office cleaning", "After-hours cleaning for workspaces, meeting rooms, break rooms, restrooms, and reception areas."],
  ["Day porter", "Visible daytime support for busy buildings, restrooms, lobbies, trash, spills, and quick resets."],
  ["Floor care", "Scheduled floor work, high-traffic maintenance, detail cleaning, and specialty project coordination."],
  ["Disinfection", "High-touch cleaning and targeted sanitizing for busy facilities, medical offices, and seasonal needs."],
  ["Move-in reset", "Commercial space reset before a new team, tenant, showroom, or office opening."],
]

const operatingSystem = [
  ["Walkthrough", "We inspect the facility, traffic, surfaces, restrooms, access rules, and schedule."],
  ["Scope", "The cleaning plan becomes a written checklist, not a vague promise."],
  ["Crew", "The team works around your business hours with clear access and communication rules."],
  ["Control", "Misses, notes, supervisor checks, and schedule changes feed back into the plan."],
]

const clientBenefits = [
  ["Less daily follow-up", "A written scope, recurring checklist, and clear contact path make cleaning easier to manage."],
  ["Cleaner first impressions", "Reception areas, restrooms, floors, glass, and staff spaces stay ready for employees and visitors."],
  ["After-hours fit", "Cleaning can be planned around keys, alarms, parking, elevators, and building rules."],
  ["Facility-specific plan", "Office, medical, retail, and managed-property spaces get different priorities instead of one generic checklist."],
  ["Quality control", "Misses, notes, schedule changes, and walkthrough feedback feed back into the cleaning plan."],
]

const faqs = [
  ["Do you offer recurring office cleaning?", "Yes. The walkthrough is used to define the rooms, schedule, access rules, and recurring checklist before service begins."],
  ["Can cleaning happen after business hours?", "Yes. After-hours service can be planned around keys, alarms, elevators, parking, building rules, and the best contact for each visit."],
  ["What types of facilities do you clean?", "Office buildings, medical and dental offices, retail stores, managed properties, banks, coworking spaces, showrooms, and other commercial spaces."],
  ["How do we get a quote?", "Request a walkthrough with your facility type, city, preferred frequency, and contact details. The quote is based on the actual scope, not a generic online price."],
]

const homepageSeoLinks = [
  { label: "Office Cleaning", href: "/office-cleaning-services" },
  { label: "Commercial Cleaning", href: "/commercial-cleaning-services" },
  { label: "Janitorial Services", href: "/janitorial-services" },
  { label: "Medical Office Cleaning", href: "/medical-office-cleaning-services" },
  { label: "Dental Office Cleaning", href: "/dental-office-cleaning" },
  { label: "Retail Store Cleaning", href: "/retail-store-cleaning-services" },
  { label: "Montgomery commercial cleaning", href: "/cleaning-services-montgomery-il" },
  { label: "Naperville commercial cleaning", href: "/cleaning-services-naperville-il" },
  { label: "North Aurora commercial cleaning", href: "/cleaning-services-north-aurora-il" },
  { label: "Oak Brook commercial cleaning", href: "/cleaning-services-oak-brook-il" },
  { label: "Oswego commercial cleaning", href: "/cleaning-services-oswego-il" },
  { label: "Plainfield commercial cleaning", href: "/cleaning-services-plainfield-il" },
  { label: "Romeoville commercial cleaning", href: "/cleaning-services-romeoville-il" },
]

type LegalSlug = "privacy-policy" | "terms-of-service" | "cancellation-policy"
type LegalRouteComponent = ComponentType<{ slug: string }>

const legalSlugs = new Set(["privacy-policy", "terms-of-service", "cancellation-policy"])

function getLegalSlug(): LegalSlug | null {
  const pathSlug = window.location.pathname.replace(/^\/+|\/+$/g, "")
  const slug = pathSlug || window.location.hash.replace("#", "")
  return legalSlugs.has(slug) ? (slug as LegalSlug) : null
}

function scrollToHashTarget() {
  const slug = window.location.hash.replace("#", "")
  if (!slug) return

  if (legalSlugs.has(slug)) {
    window.scrollTo({ top: 0, behavior: "auto" })
    return
  }

  window.requestAnimationFrame(() => {
    document.getElementById(slug)?.scrollIntoView({ block: "start" })
  })
}

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

function InlineArrow() {
  return <span aria-hidden="true" className="ml-2 inline-block h-2.5 w-2.5 rotate-45 border-r-2 border-t-2" />
}

function MiniMark({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-block size-3 rounded-full border-2 border-current ${className}`} />
}

function splitIntoColumns<T>(items: T[], columns: number) {
  const size = Math.ceil(items.length / columns)
  return Array.from({ length: columns }, (_, index) => items.slice(index * size, index * size + size)).filter((group) => group.length)
}

function Logo() {
  return (
    <a href="/#top" className="flex min-h-11 items-center gap-3" aria-label={`${SITE_NAME} home`}>
      <span className="flex size-10 items-center justify-center rounded-sm bg-[#091a2a] text-sky-200">
        <span aria-hidden="true" className="block size-4 rotate-45 border-2 border-current" />
      </span>
      <span className="text-lg font-black tracking-normal">Shynli Office Cleaning</span>
    </a>
  )
}

function App() {
  const [legalSlug, setLegalSlug] = useState<LegalSlug | null>(() => getLegalSlug())
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const [activeIndustry, setActiveIndustry] = useState(() => industries[0].value)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [SeoRoutePage, setSeoRoutePage] = useState<SeoRouteComponent | null>(null)
  const [LegalRoutePage, setLegalRoutePage] = useState<LegalRouteComponent | null>(null)
  const isHomePage = pathname === "/" || pathname === ""
  const shouldRenderLegalPage = Boolean(legalSlug)
  const shouldRenderSeoPage = !shouldRenderLegalPage && !isHomePage
  const activeIndustryDetails = industries.find((industry) => industry.value === activeIndustry) ?? industries[0]

  useEffect(() => {
    const syncLocation = () => {
      const nextLegalSlug = getLegalSlug()
      const nextPathname = window.location.pathname
      setLegalSlug((current) => (current === nextLegalSlug ? current : nextLegalSlug))
      setPathname((current) => (current === nextPathname ? current : nextPathname))
      if (window.location.hash) {
        scrollToHashTarget()
      }
    }

    window.addEventListener("hashchange", syncLocation)
    window.addEventListener("popstate", syncLocation)
    return () => {
      window.removeEventListener("hashchange", syncLocation)
      window.removeEventListener("popstate", syncLocation)
    }
  }, [])

  useEffect(() => {
    if (!shouldRenderLegalPage) return
    let isActive = true

    import("@/site/legal-pages").then((module) => {
      if (isActive) {
        setLegalRoutePage(() => module.LegalRoutePage)
      }
    })

    return () => {
      isActive = false
    }
  }, [shouldRenderLegalPage])

  useEffect(() => {
    if (!shouldRenderSeoPage) return
    let isActive = true

    import("@/site/seo-pages").then((module) => {
      if (isActive) {
        setSeoRoutePage(() => module.SeoRoutePage)
      }
    })

    return () => {
      isActive = false
    }
  }, [shouldRenderSeoPage])

  useEffect(() => {
    if (shouldRenderSeoPage || shouldRenderLegalPage) return
    document.title = SITE_NAME
    const pageDescription = "Commercial cleaning for offices and business facilities across Chicago suburbs."
    document.querySelector("meta[name='description']")?.setAttribute("content", pageDescription)
  }, [shouldRenderLegalPage, shouldRenderSeoPage])

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9fc] text-[#091a2a]">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/88 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-black text-slate-700 lg:flex">
            <a href="/#services" className="inline-flex min-h-11 items-center">Services</a>
            <a href="/#industries" className="inline-flex min-h-11 items-center">Industries</a>
            <a href="/#service-areas" className="inline-flex min-h-11 items-center">Areas</a>
            <a href="/#quality" className="inline-flex min-h-11 items-center">Quality</a>
            <a href={QUOTE_URL} className="inline-flex min-h-11 items-center">Quote</a>
          </nav>
          <a href={QUOTE_URL} className="hidden min-h-10 items-center rounded-sm bg-[#091a2a] px-4 py-2 text-sm font-black text-white transition hover:bg-[#16324d] sm:inline-flex">
            Free walkthrough
          </a>
        </div>
      </header>

      {shouldRenderLegalPage ? (
        LegalRoutePage && legalSlug ? <LegalRoutePage slug={legalSlug} /> : null
      ) : shouldRenderSeoPage ? (
        SeoRoutePage ? <SeoRoutePage pathname={pathname} /> : null
      ) : (
        <div className="homepage-content">
      <section id="top" className="relative min-h-[744px] scroll-mt-28">
        <img
          src="/hero-office.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/22" />
        <div className="relative mx-auto grid min-h-[744px] max-w-7xl content-center px-5 sm:px-8">
          <div className="max-w-4xl">
            <span className="rise-in mb-6 inline-flex min-h-7 items-center rounded-sm border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-black text-[#0a6f9f]">
              {SITE_NAME}
            </span>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-normal sm:text-7xl lg:text-8xl">
              Commercial cleaning for offices that need to stay ready.
            </h1>
            <p className="rise-in-late mt-7 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
              Walkthrough-based office cleaning, janitorial service, and facility checklists for Chicago suburbs businesses.
            </p>
            <div className="rise-in-late mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={QUOTE_URL} className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#091a2a] px-6 py-3 text-sm font-black text-white transition hover:bg-[#16324d]">
                Get a free walkthrough <InlineArrow />
              </a>
              <a href="tel:+16308127077" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-slate-300 bg-white/86 px-6 py-3 text-sm font-black text-[#091a2a] transition hover:bg-white">
                Call
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="scroll-mt-28 bg-[#f6f9fc] px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/12 sm:p-5">
          <div className="grid gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-black uppercase text-[#075985]">Walkthrough quote</p>
                <h2 className="mt-1 max-w-2xl text-2xl font-black">Start with the facility, schedule, and cleaning standard you need maintained.</h2>
              </div>
              <a href={QUOTE_URL} className="inline-flex h-12 items-center justify-center rounded-sm bg-[#075985] px-7 text-sm font-black text-white transition hover:bg-[#0369a1]">
                Request quote
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {quoteFields.map((field) => (
                <input key={field} placeholder={field} aria-label={field} className="h-12 min-w-0 rounded-sm border border-slate-300 bg-white px-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {trustSignals.map((signal) => (
            <div key={signal.value} className="flex items-center justify-between border-l-4 border-sky-300 bg-[#f7fbff] p-5">
              <div>
                <p className="text-2xl font-black">{signal.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">{signal.label}</p>
              </div>
              <StatusDot className="size-5 border-[3px]" />
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase text-[#075985]">Services</p>
            <h2 className="mt-3 max-w-xl text-4xl font-black leading-tight sm:text-5xl">Commercial cleaning services built around your building.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Choose the cleaning program that matches your rooms, traffic, hours, restrooms, floors, and level of daily visibility.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {services.map(([title, copy]) => (
              <article key={title} className="border-t border-slate-300 pt-5">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="scroll-mt-28 bg-[#091a2a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-sky-300">Industries</p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Cleaning plans for the spaces people notice first.</h2>
          </div>
          <div className="mt-10">
            <div className="grid h-auto w-full grid-cols-2 gap-2 bg-white/8 p-2 md:grid-cols-4" role="tablist" aria-label="Facility type">
              {industries.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  data-industry-tab={value}
                  role="tab"
                  aria-selected={activeIndustry === value}
                  aria-controls="industry-panel"
                  onClick={() => setActiveIndustry(value)}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-sm px-3 text-sm font-black text-white transition hover:bg-white/12 aria-selected:bg-white aria-selected:text-[#091a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  <MiniMark /> {label}
                </button>
              ))}
            </div>
            <div id="industry-panel" role="tabpanel" className="mt-6">
              <div className="grid overflow-hidden rounded-lg bg-white text-[#091a2a] lg:grid-cols-[0.95fr_1.05fr]">
                <div className="industry-image min-h-[360px] p-8 text-white">
                  <div className="flex h-full flex-col justify-end">
                    <span aria-hidden="true" className="mb-5 block size-10 rounded-full border-[6px] border-sky-200 bg-sky-500/20" />
                    <h3 data-industry-title className="max-w-xl text-4xl font-black leading-tight">{activeIndustryDetails.title}</h3>
                  </div>
                </div>
                <div className="p-7 sm:p-9">
                  <p data-industry-copy className="max-w-2xl text-lg leading-8 text-slate-600">{activeIndustryDetails.copy}</p>
                  <div data-industry-checklist className="mt-8 grid gap-3 sm:grid-cols-2">
                    {activeIndustryDetails.checklist.map((item) => (
                      <div key={item} className="border-l-4 border-sky-400 bg-sky-50 p-4 font-black">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quality" className="mx-auto grid max-w-7xl scroll-mt-28 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <p className="text-sm font-black uppercase text-[#075985]">Quality system</p>
          <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Supervision, documentation, and consistency for commercial facilities.</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Your team should not have to chase the same cleaning issues every week. The plan is documented, checked, and adjusted when the facility changes.
          </p>
        </div>
        <div className="grid gap-4">
          {operatingSystem.map(([title, copy], index) => (
            <div key={title} className="grid grid-cols-[3.5rem_1fr] gap-5 border-b border-slate-200 pb-5">
              <span className="flex size-12 items-center justify-center rounded-sm bg-[#091a2a] text-lg font-black text-white">{index + 1}</span>
              <div>
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="service-areas" className="scroll-mt-28 border-y border-slate-200 bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.58fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase text-[#075985]">Service areas</p>
              <h2 className="mt-3 max-w-xl text-4xl font-black leading-tight sm:text-5xl">Commercial cleaning coverage across Chicago suburbs.</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Request office cleaning, janitorial service, and commercial cleaning walkthroughs across the current Chicago suburbs service area.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {serviceAreaGroups.map((group) => (
                <div key={group.label} className="border-t border-slate-300 pt-5">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-sm bg-[#091a2a] text-sm font-black text-white">{group.label}</span>
                    <p className="font-black text-slate-500">{group.cities.length} cities</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.cities.map((city) => (
                      <a
                        key={city}
                        href={cityServiceAreaHref(city)}
                        className="inline-flex min-h-10 items-center gap-2 rounded-sm bg-[#f6f9fc] px-3 text-sm font-black text-[#091a2a] transition hover:bg-sky-50 hover:text-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                      >
                        <StatusDot className="size-2.5 border-[1.5px] ring-2" />
                        {city}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase text-[#075985]">Find service by location</p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Explore office cleaning coverage by service and city.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Browse commercial cleaning by facility type, service need, and nearby Chicago suburbs location.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Office cleaning", "Workspaces, conference rooms, kitchens, restrooms, reception, and shared desks."],
              ["Janitorial service", "Recurring cleaning routes for trash, floors, restrooms, surfaces, and supply needs."],
              ["Medical offices", "Patient areas, waiting rooms, staff spaces, restrooms, and high-touch surfaces."],
              ["Retail stores", "Storefronts, glass, counters, fitting rooms, floors, restrooms, and back rooms."],
              ["Managed properties", "Lobbies, hallways, stairwells, elevators, leasing offices, and common areas."],
              ["Local coverage", "City-specific service pages for businesses across the Chicago suburbs."],
            ].map(([label, copy]) => (
              <div key={label} className="border-t border-slate-300 pt-5">
                <p className="text-xl font-black">{label}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {splitIntoColumns(homepageSeoLinks, 4).map((group, index) => (
            <div key={index} className="grid gap-3">
              {group.map((link) => (
                <a key={link.href} href={link.href} className="flex min-h-14 items-center justify-between border-t border-slate-300 pt-4 font-black">
                  <span>{link.label}</span>
                  <LinkArrow />
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div className="operations-photo min-h-[520px] rounded-lg" />
          <div className="flex flex-col justify-center">
            <p className="text-sm font-black uppercase text-[#075985]">Why businesses choose us</p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">A cleaning plan that is easier to manage.</h2>
            <div className="mt-8 grid gap-4">
              {clientBenefits.map(([name, idea]) => (
                <div key={name} className="grid grid-cols-[8.5rem_1fr] gap-4 border-t border-slate-200 pt-4">
                  <p className="font-black">{name}</p>
                  <p className="leading-7 text-slate-600">{idea}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.78fr_1fr]">
        <div>
          <p className="text-sm font-black uppercase text-[#075985]">Commercial cleaning FAQ</p>
          <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Answers before you request a walkthrough.</h2>
        </div>
        <div className="w-full">
          {faqs.map(([question, answer], index) => (
            <details key={question} className="group border-b border-slate-200 py-5" open={openFaqIndex === index}>
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-black marker:content-none"
                onClick={(event) => {
                  event.preventDefault()
                  setOpenFaqIndex((current) => (current === index ? -1 : index))
                }}
              >
                <span>{question}</span>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-slate-100 text-base leading-none text-[#091a2a] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-base leading-7 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta bg-[#091a2a] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-sky-300">Free walkthrough quote</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">Ready for a cleaner office without managing every detail?</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={QUOTE_URL} className="inline-flex min-h-11 items-center justify-center rounded-sm bg-sky-300 px-6 py-3 text-sm font-black text-[#091a2a] transition hover:bg-sky-200">
              Start quote <InlineArrow />
            </a>
            <a href="#top" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/25 bg-white/8 px-6 py-3 text-sm font-black text-white transition hover:bg-white/14">
              Back to top
            </a>
          </div>
        </div>
      </section>
        </div>
      )}

      <footer className="bg-[#071421] px-5 py-14 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-b border-white/12 pb-10 lg:grid-cols-[1.1fr_0.72fr_0.72fr_0.72fr_0.74fr]">
            <div>
              <Logo />
              <p className="mt-5 max-w-sm leading-7 text-white/64">
                Commercial cleaning, office cleaning, and janitorial service for Chicago suburbs businesses that need reliable recurring care.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex min-h-6 items-center rounded-sm bg-white/10 px-2.5 py-0.5 text-xs font-black text-white">Walkthrough quotes</span>
                <span className="inline-flex min-h-6 items-center rounded-sm bg-sky-300 px-2.5 py-0.5 text-xs font-black text-[#071421]">Chicago suburbs</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase text-sky-300">Services</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-white/68">
                <li><a href="/janitorial-services" className="inline-flex min-h-9 items-center">Routine janitorial</a></li>
                <li><a href="/office-cleaning-services" className="inline-flex min-h-9 items-center">Office cleaning</a></li>
                <li><a href="/day-porter-services" className="inline-flex min-h-9 items-center">Day porter</a></li>
                <li><a href="/floor-care-services" className="inline-flex min-h-9 items-center">Floor care</a></li>
                <li><a href="/commercial-disinfection-services" className="inline-flex min-h-9 items-center">Disinfection</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase text-sky-300">Facilities</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-white/68">
                <li><a href="/office-building-cleaning" className="inline-flex min-h-9 items-center">Offices</a></li>
                <li><a href="/medical-office-cleaning-services" className="inline-flex min-h-9 items-center">Medical offices</a></li>
                <li><a href="/retail-store-cleaning-services" className="inline-flex min-h-9 items-center">Retail spaces</a></li>
                <li><a href="/property-management-cleaning" className="inline-flex min-h-9 items-center">Managed properties</a></li>
                <li><a href="/commercial-cleaning-checklist" className="inline-flex min-h-9 items-center">Quality control</a></li>
                <li><a href="/#service-areas" className="inline-flex min-h-9 items-center">Service areas</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase text-sky-300">Legal</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-white/68">
                <li><a href="/privacy-policy" className="inline-flex min-h-9 items-center">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="inline-flex min-h-9 items-center">Terms of Service</a></li>
                <li><a href="/cancellation-policy" className="inline-flex min-h-9 items-center">Cancellation Policy</a></li>
                <li><a href="mailto:info@shynli.com" className="inline-flex min-h-9 items-center">info@shynli.com</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase text-sky-300">Contact</h3>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-white/68">
                <li><a href="tel:+16308127077" className="inline-flex min-h-9 items-center">(630) 812-7077</a></li>
                <li>Chicago suburbs</li>
                <li><a href={QUOTE_URL} className="inline-flex min-h-9 items-center">Request walkthrough</a></li>
                <li>After-hours schedules</li>
                <li>Commercial quote required</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-8 text-sm font-semibold text-white/48 md:flex-row md:items-center md:justify-between">
            <p>Copyright 2026 {SITE_NAME}.</p>
            <div className="flex flex-wrap gap-5">
              <a href="/#top" className="inline-flex min-h-9 min-w-9 items-center">Top</a>
              <a href={QUOTE_URL} className="inline-flex min-h-9 items-center">Quote</a>
              <a href="/privacy-policy" className="inline-flex min-h-9 items-center">Privacy</a>
              <span>Commercial walkthrough quotes</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
