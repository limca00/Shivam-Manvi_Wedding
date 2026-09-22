# AGENTS.md

## Project Context

A React + Vite single-page wedding invitation site, deployed on Vercel. Treat
it as user-owned application code, keep changes focused on the user's
request, and preserve existing project conventions.

Start with `README.md` for local setup and the deployment workflow.

## Key Files

- `src/`: frontend application source.
- `src/lib/weddingConfig.js`: single source of truth for site content (names,
  date, venue, RSVP config, etc.). Prefer editing this over hardcoding values
  in components.
- `vite.config.js`: Vite config.

## Working Notes

- Use `npm run dev` for local development, `npm run build` to verify a
  production build compiles before finishing changes.
- There is no backend — the RSVP form posts directly to whatever endpoint is
  configured in `weddingConfig.js` (e.g. a Google Form).
