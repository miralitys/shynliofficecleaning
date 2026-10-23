# Office cleaning migration

Version: 2026-10-23.1.

The original 480-page website, application source, assets and committed dist directory are preserved for rollback. Public web-domain bindings move from Render Static Site `srv-d80vhc9j2pic73bibvg0` to existing Docker Node service `srv-d80u9tnlk1mc739ucneg`. Keep DNS unchanged. Do not edit the main site.

`redirects.mjs` maps the home page, all 420 city pages and other commercial pages to /services/commercial-cleaning. It handles the requested service-areas, post-construction, legal, quote, sitemap and robots exceptions. The byte-identical deployed copy is `office-redirects.mjs` in `miralitys/shynlicom`. The Node handler returns an empty HTTP 301 before static or API handlers. It matches the public apex/www hostnames and the reserved /__office_redirect/ prefix only on shynlicom.onrender.com.

The HTTPS apex redirects directly to a final main-site URL. Render's HTTP upgrade and www normalization may add hops for other variants. Query strings retain encoding, order, repeated keys and empty values.

The retained Static Site keeps its original `npm ci && npm run build` command and dist publication directory. Add X-Robots-Tag: noindex on /* only to that retained site after moving the public domains. Public 301 responses do not add noindex. The local render.yaml records the retained-origin header; the actual Render header is configured separately.

## Verification

- `npm run test:redirects`: all 480 sitemap mappings, all 420 city patterns, normalization, query strings, booking and discovery files.
- `npm run audit:redirects`: full live-domain CSV and JSON, ten additional paths, sitemap.xml, robots.txt and all four host/protocol variants.
- Set AUDIT_SITEMAP to the archived old sitemap for post-deployment checks.
- Set AUDIT_ORIGIN=http://127.0.0.1:4188 and AUDIT_HOST=shynliofficecleaning.com for local Node checks, or AUDIT_ORIGIN=https://shynlicom.onrender.com/__office_redirect for origin checks.

## Rollback

Remove the office apex/www bindings from the shared Node service and reattach the apex to preserved Static Site `srv-d80vhc9j2pic73bibvg0`. Verify www and wait for both certificates. Remove the retained-origin noindex header. Keep the original build and publication settings. Check old pages return 200. No DNS change is needed.

Pre-migration source revision: `35932a267aef8e20cca40ce1b08ceb0c85941424`.

OFFICE_REDIRECT_ENABLED=false disables this handler; restoring old content requires the Static Site domain bindings. Cached redirects may persist for the one-hour cache lifetime. Other migrated domains have independent handlers.
