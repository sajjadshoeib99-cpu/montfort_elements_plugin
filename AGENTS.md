# Horizon — Real Estate site

## What this is
A Vite + React + Tailwind v4 landing page, reconstructed from the `website.zip`
export (which shipped only the site's `styles.css`, 4 images, and shadcn ui
primitives — the page component itself was not included).

## Layout / source notes
- `src/index.css` is the original site stylesheet (from `styles.css`). The page is
  built with its plain custom classes (`.hero`, `.about-section`, `.property-track`,
  `.why-section`, `.services-section`, `.final-cta`, `.site-footer`, ...) — not
  utility classes. Keep those class names when editing.
- `src/App.tsx` is the reconstructed page. Content text is placeholder copy.
- The `property-triptych` image is split into three cards via `.crop-left`,
  `.crop-center`, `.crop-right` (the image is 300% wide and translated).
- `src/components/ui/` holds the exported shadcn primitives. They are NOT imported
  by the page and their Radix deps are not installed; `tsconfig.json` excludes them
  from type-checking. Install the deps only if you start using them.
- Images live in `src/assets/` and are imported in `src/App.tsx`.

## Run
`docker compose -f docker-compose.base44.yml up -d --build`
Serves Vite dev on container port 5173 mapped to host 3000.
`npm install` runs on container start (deps are in a named `node_modules` volume).

## Verify
`curl -s localhost:3000 | head` should return the Vite HTML shell with `/src/main.tsx`.
