# Manvi & Shivam — Wedding Invitation

A React + Vite single-page wedding invitation site, deployed on Vercel.

## Run Locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

## Build

```bash
npm run build    # outputs to ./dist
npm run preview  # preview the production build locally
```

## Configuration

Nearly every piece of content on the site — names, date, venue, RSVP form target,
share message, etc. — is driven from a single file: `src/lib/weddingConfig.js`.
Edit values there rather than in individual components.

## Deployment

Deployed on Vercel. Pushing to `main` triggers a new deployment automatically;
Vercel runs `npm run build` and serves the `dist/` output.
