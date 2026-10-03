# Horizon Properties

## What this is
A production-style real estate marketing site: Vite + React 18 + TypeScript + Tailwind v4 SPA
at the repository root. Three routes: `/` (home), `/properties` (search + filters), and
`/properties/:slug` (detail with gallery).

`montfort-elementor-widgets/` is an unrelated WordPress plugin that ships in this repo — it is
NOT part of the running app and nothing here loads it.

## Run
```bash
docker compose -f docker-compose.base44.yml up -d
```
- Single `web` service (`node:22`), repo bind-mounted at `/app`, Vite dev server on container
  port `5173` mapped to host `3000`.
- `npm install` runs on container start into the named `node_modules` volume, so a fresh clone
  boots without a manual install step.
- Vite is configured with `host: true`, `allowedHosts: true`, file-watch polling, and the
  `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` env passthrough, because the preview is proxied.

## Verify
```bash
curl -s localhost:3000 | head          # Vite HTML shell referencing /src/main.tsx
docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit   # type check
```

## Layout of the source
- `src/data/properties.ts` — the single source of truth for listings: typed `Property` records
  (price, beds, baths, sqft, features, amenities, images, `agentId`). Swap this module for an API
  or database call and the cards, filters, detail pages and similar-property logic all follow.
- `src/data/agents.ts`, `src/data/content.ts` — team, services, reasons, stats, CTA copy.
- `src/components/` — reusable primitives (Button, PropertyCard, PropertyCarousel,
  PropertyGallery, LeadModal, SiteHeader/Footer, SmartImage).
- `src/sections/` — the homepage bands; `src/pages/` — the three routes.
- `src/index.css` — Tailwind v4 `@theme` tokens. The palette is `navy` / `navy-deep` / `ink` /
  `body` / `gold` / `gold-soft` / `ivory` / `mist` / `line`; use those token names rather than raw
  hex values. Scroll reveals are `[data-reveal]` + `.is-visible` (see `src/lib/useScrollReveal.ts`).

## Imagery
The hero, About and first property photo are bundled in `src/assets/` (they came from the original
site export). Every other photo is fetched from `images.unsplash.com` through `src/lib/images.ts`,
which builds `srcSet` candidates so small screens never download desktop files. Swapping a photo
means changing the Unsplash id in the data files — no component changes.

## Not wired to a backend yet
`LeadModal` (contact agent / schedule a viewing), the footer newsletter and the favourite button
persist to `localStorage` (`horizon:leads`, `horizon:newsletter`, `horizon:favorites`). They are
fully validated and give real feedback, but no request leaves the browser — point them at an API
when one exists.
