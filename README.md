# ShynliOfficeCleaning.com Site Prototype

## Status

- Date: `2026-05-10`
- Status: `created / not launched`
- Stack: `Vite + React + Tailwind CSS + shadcn`
- Production domain: `shynliofficecleaning.com`
- Previous working name: `ShinyOfficeCleaning.com`
- GitHub repo: `https://github.com/miralitys/shynliofficecleaning`
- Hosting: Render static site created
- Purpose: separate B2B site prototype for office / commercial cleaning, not a live site and not a `Shynli.com` route.

## Separation Decision

`ShynliOfficeCleaning.com` is its own website / brand contour.

It should be treated as:

- separate domain;
- separate project folder;
- separate office-cleaning positioning;
- separate launch gate.

It should not be treated as:

- a service page inside `Shynli.com`;
- a route of the residential cleaning prototype;
- a renamed residential booking flow.

## Direction

This prototype is not a residential cleaning page with renamed copy.

It is built around:

- walkthrough quote;
- facility type;
- commercial cleaning frequency;
- after-hours scheduling;
- custom checklist;
- insured crews;
- quality-control process.

## Redesign Pass `2026-05-10`

The first version looked too close to a regular residential cleaning landing page.

The current version was rebuilt as a separate `ShynliOfficeCleaning.com` B2B site direction:

- no side hero quote card;
- first viewport uses commercial office positioning;
- quote flow is a horizontal walkthrough bar;
- service section is written as facility programs;
- industry tabs show facility fit;
- quality section sells supervision, documentation, consistency;
- competitor section explicitly shows what was borrowed from `Office Pride`, `ServiceMaster`, `Second City Shine`, `Restore`, and `Cleanway`;
- final launch gate keeps the site in `created / not launched` mode.
- footer added with services, facility types, contact, prototype status, and legal/status row.

## Section Polish Pass `2026-05-10`

- quote block separated from hero without negative overlap;
- quote fields expanded into a responsive grid so labels do not feel squeezed;
- header and footer tap targets improved;
- desktop / laptop / tablet / mobile viewports rechecked for section overlap and horizontal overflow.

## Service Areas Update `2026-05-10`

- added all `42` cities from `https://shynlicleaningservice.com/service-areas`;
- source groups preserved as `A-D`, `E-L`, `M-S`, `V-Y`;
- added `Service areas` section and footer/nav anchors.

## Legal Pages Update `2026-05-10`

- added footer links for `Privacy Policy`, `Terms of Service`, and `Cancellation Policy`;
- created separate hash pages: `#privacy-policy`, `#terms-of-service`, `#cancellation-policy`;
- adapted legal content from `https://shynlicleaningservice.com/privacy-policy`, `https://shynlicleaningservice.com/terms-of-service`, and `https://shynlicleaningservice.com/cancellation-policy`;
- kept SHYNLI LLC contact details and cancellation fee structure while presenting the pages under `ShynliOfficeCleaning.com`.

## Deployment Context `2026-05-11`

- bought domain: `shynliofficecleaning.com`;
- GitHub repository created: `https://github.com/miralitys/shynliofficecleaning`;
- Render static site created;
- production canonical base updated to `https://shynliofficecleaning.com`;
- sitemap, robots, generated route HTML, canonical URLs, and JSON-LD schema should be generated against the production domain.

Render settings:

- Build command: `npm run build`
- Publish directory: `dist`

## Full SEO Layer Update `2026-05-10`

- added a full programmatic SEO route manifest for `459` total pages:
  - `12` service pages;
  - `12` industry pages;
  - `42` city hub pages;
  - `252` city-service pages;
  - `126` city-industry pages;
  - `10` support / checklist / FAQ pages;
  - `3` legal pages;
- added `src/site/seo-routes.json` as the source of truth for cities, services, industries, and support pages;
- added `src/site/seo-pages.tsx` to render SEO pages with intent-specific scope, FAQ blocks, nearby city links, and internal linking;
- added `scripts/generate-seo-pages.mjs` to generate route HTML files, static meta shells, `sitemap.xml`, `robots.txt`, and `seo-page-manifest.json` during `npm run build`.

## Pre-Hosting SEO QA `2026-05-10`

- removed public-facing technical / internal copy from the homepage and generated SEO routes;
- strengthened generated pages with sales-oriented cleaning-plan copy, included-scope sections, related pages, FAQ blocks, nearby links, and quote CTAs;
- added static HTML fallback content for crawlers before JavaScript render;
- added JSON-LD schema for `ProfessionalService`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, and `FAQPage`;
- added walkthrough-based pricing logic into route schema through `PriceSpecification` descriptions;
- routed all quote / walkthrough / request CTAs to the single lead collection page: `https://shynlicleaningservice.com/quote`;
- verified all `459` pages are present in `sitemap.xml`;
- verified self-canonical URLs, titles, meta descriptions, static link counts, and non-thin static content;
- manually reviewed top-30 priority SEO pages for doorway-risk, local relevance, pricing logic, FAQ, nearby links, and schema;
- browser-crawled all `459` routes at mobile width with no horizontal overflow and no forbidden internal text.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Verification

Validated on:

- `1440 x 900`
- `820 x 1180`
- `430 x 932`
- `390 x 844`

Checks passed:

- no horizontal overflow;
- no section overlap across header, hero, quote, services, industries, quality, footer;
- no small tap-target warnings from visible links / buttons;
- desktop first screen renders with full quote panel;
- mobile stacks hero and quote form cleanly;
- footer renders on desktop / tablet / mobile;
- legal pages render from footer links on desktop / tablet / mobile;
- representative SEO routes render on mobile without horizontal overflow:
  - `/office-cleaning-services`
  - `/cleaning-services-naperville-il`
  - `/office-cleaning-naperville-il`
  - `/medical-office-facility-cleaning-naperville-il`
- full browser-render crawl passed across all `459` routes;
- full static HTML SEO QA passed across all `459` routes;
- JSON-LD schema validation script passed across all `459` routes;
- quote CTA routing validation passed across all `459` routes;
- top-30 priority SEO page review passed;
- `npm run build` passes;
- `npm run lint` passes.

## Screenshots

- `screenshots/desktop-home-2026-05-10.png`
- `screenshots/tablet-home-2026-05-10.png`
- `screenshots/mobile-home-2026-05-10.png`
- `screenshots/desktop-cancellation-policy-2026-05-10.png`
- `screenshots/tablet-cancellation-policy-2026-05-10.png`
- `screenshots/mobile-cancellation-policy-2026-05-10.png`
