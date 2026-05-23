import { useEffect } from "react"

const SITE_NAME = "ShynliOfficeCleaning.com"

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

export type LegalSlug = keyof typeof legalDocuments
type LegalDocument = (typeof legalDocuments)[LegalSlug]

function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-3.5 shrink-0 rounded-full border-2 border-sky-500 bg-sky-50 ring-2 ring-sky-100 ${className}`}
    />
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

export function LegalRoutePage({ slug }: { slug: string }) {
  const legalDocument = legalDocuments[slug as LegalSlug]

  useEffect(() => {
    if (!legalDocument) return
    document.title = `${legalDocument.label} | ${SITE_NAME}`
    document.querySelector("meta[name='description']")?.setAttribute("content", legalDocument.intro)
  }, [legalDocument])

  if (!legalDocument) return null
  return <LegalPage document={legalDocument} />
}
