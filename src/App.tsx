import { useEffect, useState } from "react"
import {
  ArrowRight,
  Building2,
  HeartPulse,
  Landmark,
  Phone,
  Sparkles,
  Store,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SeoLandingPage, findSeoPage, topSeoLinks } from "@/site/seo-pages"

const QUOTE_URL = "https://shynlicleaningservice.com/quote"
const SITE_NAME = "ShynliOfficeCleaning.com"

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
    icon: Building2,
    title: "Office buildings and shared workspaces",
    copy: "Reception areas, conference rooms, kitchens, restrooms, private offices, shared desks, glass, and high-touch surfaces.",
    checklist: ["Nightly or weekly cleaning", "Restroom and breakroom standards", "Trash, floors, dusting, and glass", "Issue reporting after each visit"],
  },
  {
    value: "medical",
    label: "Medical",
    icon: HeartPulse,
    title: "Medical and dental offices",
    copy: "Waiting rooms, staff zones, exam rooms, restrooms, and the high-touch areas that make a facility feel safe and maintained.",
    checklist: ["High-touch surface focus", "Waiting room reset", "Staff area cleaning", "Patient-ready presentation"],
  },
  {
    value: "retail",
    label: "Retail",
    icon: Store,
    title: "Retail and customer-facing spaces",
    copy: "Storefronts, counters, fitting rooms, glass, public restrooms, back rooms, and floors that need to look ready every morning.",
    checklist: ["Storefront presentation", "Glass and counters", "Customer restroom cleaning", "Opening-ready schedule"],
  },
  {
    value: "managed",
    label: "Managed",
    icon: Landmark,
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

const legalDocuments = {
  "privacy-policy": {
    label: "Privacy Policy",
    updated: "Last Updated: February 16, 2026",
    intro:
      `This Privacy Policy explains how SHYNLI LLC handles personal information for ${SITE_NAME}, quote requests, bookings, cleaning services, calls, SMS/text messages, and email communications.`,
    sections: [
      {
        title: "Information we collect",
        items: [
          "Contact, service, access, scheduling, billing, and business representative details you provide.",
          "Website/device data such as IP address, browser type, pages visited, clicks, referring URLs, cookies, pixels, and similar technologies.",
          "Service delivery records including internal notes, quality-control photos when applicable, and call recordings where permitted after notice.",
          "Limited data from service providers such as scheduling/CRM tools, payment processors, communications tools, and review platforms.",
        ],
      },
      {
        title: "How we use information",
        items: [
          "To provide quotes, schedule service, coordinate access, complete cleaning work, process payments, prevent fraud, and send service updates.",
          "To support clients, improve the website and operations, maintain quality standards, train teams, resolve disputes, and keep business records.",
          "To manage consent, opt-outs, transactional messages, marketing where permitted, and legal compliance.",
        ],
      },
      {
        title: "Cookies, analytics, advertising, and sharing",
        items: [
          "Essential cookies keep the website working; analytics and advertising technologies may measure site performance and ad effectiveness.",
          "SHYNLI LLC does not sell personal information, but advertising/analytics partners may collect cookie or pixel data that can be considered targeted-advertising sharing under some state laws.",
          "Information may be shared with vendors such as payment processors, GoHighLevel, Twilio, hosting, analytics, email, insurance, legal, or dispute-resolution providers when needed to operate the business.",
        ],
      },
      {
        title: "Your choices and contact",
        items: [
          "You may request access, correction, deletion, portability, or opt-out where applicable by contacting SHYNLI LLC.",
          "Marketing SMS opt-out is available by replying STOP; marketing email opt-out is available through unsubscribe links or by contacting info@shynli.com.",
          "Questions: info@shynli.com | +1 (630) 812-7077 | Legal notices: P.O. Box 2492, Naperville IL 60566.",
        ],
      },
    ],
  },
  "terms-of-service": {
    label: "Terms of Service",
    updated: "Last Updated: February 16, 2026",
    intro:
      "These Terms of Service are the operating agreement for using SHYNLI LLC cleaning services, quote requests, bookings, approvals, invoices, website, and communications.",
    sections: [
      {
        title: "Acceptance, scope, and client responsibilities",
        items: [
          "Booking online, approving an estimate, requesting service, clicking Book/Confirm, paying an invoice, or using services constitutes acceptance.",
          "Services are limited to the confirmed package, checklist, proposal, estimate, invoice, or written scope; extra tasks need approval and may add charges.",
          "Clients must provide accurate property details, service conditions, special surfaces, pets, access, parking, building rules, working utilities, and a safe work environment.",
        ],
      },
      {
        title: "Safety, quality, and service limits",
        items: [
          "SHYNLI LLC may refuse, suspend, or terminate service for unsafe conditions, biohazards, pests, hostile conduct, weapons, illegal substances, or other prohibited conditions.",
          "Standard cleaning does not include restoration, hazardous cleanup, biohazard remediation, mold/asbestos/lead work, pest extermination, hauling, heavy furniture moving, or unsafe ladder work unless separately agreed.",
          "Quality concerns should be reported within 48 hours with photos and details; re-clean, spot correction, credit, or discount may be chosen as the reasonable resolution.",
        ],
      },
      {
        title: "Payments, cancellations, claims, and liability",
        items: [
          "Payment is due upon completion or final invoice unless otherwise agreed; a valid card may be required to reserve the appointment.",
          "Cancellation/no-show fees may apply: more than 48 hours is $0, 24-48 hours is $50, 12-24 hours is 50%, and less than 12 hours or same-day cancellation is 100% of the booked price.",
          "Damage or missing-item claims must be reported promptly; missing-item liability is capped as described in the source Terms unless law requires otherwise.",
          "Liability limits, arbitration, jury-trial waiver, class-action waiver, non-solicitation, force majeure, governing law, and venue provisions apply under the full Terms.",
        ],
      },
      {
        title: "Legal notices",
        items: [
          "Illinois law governs. If arbitration does not apply, disputes are heard in DuPage County, Illinois, or the county where services were performed, to the fullest extent permitted by law.",
          "Legal notices and arbitration opt-outs: SHYNLI LLC, P.O. Box 2492, Naperville IL 60566.",
          `Email: info@shynli.com | Phone: +1 (630) 812-7077 | Website: ${SITE_NAME}.`,
        ],
      },
    ],
  },
  "cancellation-policy": {
    label: "Cancellation Policy",
    updated: "Last Updated: February 13, 2026",
    intro:
      "This Cancellation Policy applies to all bookings with SHYNLI LLC. All timing is based on America/Chicago Central Time, and the Terms of Service control if there is any inconsistency.",
    sections: [
      {
        title: "How to cancel or reschedule",
        items: [
          "Reply to the confirmation or reminder SMS/text.",
          "Email info@shynli.com.",
          "Call or text +1 (630) 812-7077.",
          "Requests are effective when received; processing may be delayed outside normal operating hours.",
        ],
      },
      {
        title: "Cancellation and reschedule fees",
        items: [
          "More than 48 hours before the appointment: $0.",
          "24-48 hours before the appointment: $50 flat fee.",
          "12-24 hours before the appointment: 50% of the booked price.",
          "Less than 12 hours before the appointment, same-day cancellation, or same-day reschedule: 100% of the booked price.",
        ],
      },
      {
        title: "No-show, no-access, refunds, and late arrival",
        items: [
          "A booking may be treated as a 100% no-show/no-access charge if the team cannot enter because of locked doors, incorrect codes, missing keys, denied building access, unavailable property, guests not checked out, or unreachable contacts.",
          "If entry cannot be obtained within 15 minutes of arrival because of access issues, the appointment may be treated as a no-show; optional waiting may be billed at $45/hour, prorated, if available.",
          "If a cancelled/rescheduled slot is successfully rebooked, the cancellation fee is reduced by recovered labor revenue, excluding non-refundable dispatch or processing costs.",
          "If SHYNLI LLC arrives more than 60 minutes late for reasons within reasonable control and cannot complete the booked scope, SHYNLI LLC may reschedule at no charge or issue a proportional credit for the unperformed portion.",
        ],
      },
      {
        title: "Unsafe or unsuitable conditions",
        items: [
          "If service is refused or terminated because of unsafe conditions, prohibited conditions, or conduct issues, SHYNLI LLC may retain amounts tied to reserved labor time, dispatch/travel, costs incurred, and work performed, subject to refunds required by law.",
          "Questions: info@shynli.com | +1 (630) 812-7077.",
        ],
      },
    ],
  },
} as const

type LegalSlug = keyof typeof legalDocuments
type LegalDocument = (typeof legalDocuments)[LegalSlug]

function getLegalSlug(): LegalSlug | null {
  const pathSlug = window.location.pathname.replace(/^\/+|\/+$/g, "")
  const slug = pathSlug || window.location.hash.replace("#", "")
  return slug in legalDocuments ? (slug as LegalSlug) : null
}

function scrollToHashTarget() {
  const slug = window.location.hash.replace("#", "")
  if (!slug) return

  if (slug in legalDocuments) {
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

function splitIntoColumns<T>(items: T[], columns: number) {
  const size = Math.ceil(items.length / columns)
  return Array.from({ length: columns }, (_, index) => items.slice(index * size, index * size + size)).filter((group) => group.length)
}

function Logo() {
  return (
    <a href="/#top" className="flex min-h-11 items-center gap-3" aria-label={`${SITE_NAME} home`}>
      <span className="flex size-10 items-center justify-center rounded-sm bg-[#091a2a] text-sky-200">
        <Sparkles className="size-5" />
      </span>
      <span className="text-lg font-black tracking-normal">Shynli Office Cleaning</span>
    </a>
  )
}

function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <section className="px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <a href="#top" className="inline-flex min-h-11 items-center text-sm font-black text-sky-700">
          Back to {SITE_NAME}
        </a>
        <div className="mt-8 border-y border-slate-200 py-10">
          <p className="text-sm font-black uppercase text-sky-600">Legal</p>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">{document.label}</h1>
          <p className="mt-4 text-sm font-black text-slate-500">{document.updated}</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{document.intro}</p>
        </div>

        <div className="mt-10 grid gap-8">
          {document.sections.map((section) => (
            <article key={section.title} className="border-b border-slate-200 pb-8">
              <h2 className="text-2xl font-black">{section.title}</h2>
              <ul className="mt-5 grid gap-4 text-base leading-7 text-slate-600">
                {section.items.map((item) => (
                  <li key={item} className="grid grid-cols-[1.5rem_1fr] gap-3">
                    <StatusDot className="mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function App() {
  const [legalSlug, setLegalSlug] = useState<LegalSlug | null>(() => getLegalSlug())
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const [activeIndustry, setActiveIndustry] = useState(() => industries[0].value)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const legalDocument = legalSlug ? legalDocuments[legalSlug] : null
  const seoPage = !legalDocument ? findSeoPage(pathname) : null
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
    const pageTitle = legalDocument?.label ?? seoPage?.title ?? SITE_NAME
    const pageDescription = legalDocument?.intro ?? seoPage?.description ?? "Commercial cleaning for offices and business facilities across Chicago suburbs."
    document.title = pageTitle === SITE_NAME ? pageTitle : `${pageTitle} | ${SITE_NAME}`
    document.querySelector("meta[name='description']")?.setAttribute("content", pageDescription)
  }, [legalDocument, seoPage])

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
          <Button asChild className="hidden bg-[#091a2a] text-white hover:bg-[#16324d] sm:inline-flex">
            <a href={QUOTE_URL}>Free walkthrough</a>
          </Button>
        </div>
      </header>

      {legalDocument ? (
        <LegalPage document={legalDocument} />
      ) : seoPage ? (
        <SeoLandingPage page={seoPage} />
      ) : (
        <div>
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
            <Badge className="rise-in mb-6 border-sky-200 bg-sky-50 px-3 py-1 text-[#0a6f9f]">
              {SITE_NAME}
            </Badge>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-normal sm:text-7xl lg:text-8xl">
              Commercial cleaning for offices that need to stay ready.
            </h1>
            <p className="rise-in-late mt-7 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
              Walkthrough-based office cleaning, janitorial service, and facility checklists for Chicago suburbs businesses.
            </p>
            <div className="rise-in-late mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-[#091a2a] text-white hover:bg-[#16324d]">
                <a href={QUOTE_URL}>
                  Get a free walkthrough <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-300 bg-white/86 text-[#091a2a] hover:bg-white">
                <a href="tel:+16308127077">
                  <Phone className="mr-2 size-4" /> Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="scroll-mt-28 bg-[#f6f9fc] px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/12 sm:p-5">
          <div className="grid gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-black uppercase text-sky-600">Walkthrough quote</p>
                <h2 className="mt-1 max-w-2xl text-2xl font-black">Start with the facility, schedule, and cleaning standard you need maintained.</h2>
              </div>
              <Button asChild className="h-12 bg-sky-500 px-7 font-black text-white hover:bg-sky-600">
                <a href={QUOTE_URL}>Request quote</a>
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {quoteFields.map((field) => (
                <Input key={field} placeholder={field} aria-label={field} className="h-12 min-w-0" />
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
            <p className="text-sm font-black uppercase text-sky-600">Services</p>
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
              {industries.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={activeIndustry === value}
                  aria-controls="industry-panel"
                  onClick={() => setActiveIndustry(value)}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-sm px-3 text-sm font-black text-white transition hover:bg-white/12 aria-selected:bg-white aria-selected:text-[#091a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  <Icon className="size-4" /> {label}
                </button>
              ))}
            </div>
            <div id="industry-panel" role="tabpanel" className="mt-6">
              <div className="grid overflow-hidden rounded-lg bg-white text-[#091a2a] lg:grid-cols-[0.95fr_1.05fr]">
                <div className="industry-image min-h-[360px] p-8 text-white">
                  <div className="flex h-full flex-col justify-end">
                    <span aria-hidden="true" className="mb-5 block size-10 rounded-full border-[6px] border-sky-200 bg-sky-500/20" />
                    <h3 className="max-w-xl text-4xl font-black leading-tight">{activeIndustryDetails.title}</h3>
                  </div>
                </div>
                <div className="p-7 sm:p-9">
                  <p className="max-w-2xl text-lg leading-8 text-slate-600">{activeIndustryDetails.copy}</p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
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
          <p className="text-sm font-black uppercase text-sky-600">Quality system</p>
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
              <p className="text-sm font-black uppercase text-sky-600">Service areas</p>
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
            <p className="text-sm font-black uppercase text-sky-600">Find service by location</p>
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
          {splitIntoColumns(topSeoLinks(), 4).map((group, index) => (
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
            <p className="text-sm font-black uppercase text-sky-600">Why businesses choose us</p>
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
          <p className="text-sm font-black uppercase text-sky-600">Commercial cleaning FAQ</p>
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

      <section className="bg-[#091a2a] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-sky-300">Free walkthrough quote</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">Ready for a cleaner office without managing every detail?</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-sky-300 text-[#091a2a] hover:bg-sky-200">
              <a href={QUOTE_URL}>
                Start quote <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/8 text-white hover:bg-white/14">
              <a href="#top">Back to top</a>
            </Button>
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
                <Badge className="bg-white/10 text-white hover:bg-white/10">Walkthrough quotes</Badge>
                <Badge className="bg-sky-300 text-[#071421] hover:bg-sky-300">Chicago suburbs</Badge>
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
