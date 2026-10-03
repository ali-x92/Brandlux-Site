# BrandLux

Pre-launch marketing site for **BrandLux** — an AI tool that turns one idea into a complete brand: website, logo and ready-to-post creatives for Instagram, Facebook, X, WhatsApp and more.

The site collects early-access wishlist signups and contact messages, stored in Supabase.

## Stack

- React 19 + TanStack Start (SSR) + Vite 7, deployed to Netlify (nitro `netlify` preset)
- Tailwind CSS v4 + shadcn/ui components
- Supabase (Postgres) for `wishlist_signups` and `contact_messages`

## Development

```sh
npm install
cp .env.example .env   # fill in your Supabase keys
npm run dev
```

## Database changes

Migrations live in `supabase/migrations/`. Apply new ones to your Supabase project (SQL editor or `supabase db push`), e.g. `20260829120000_create_contact_messages.sql` for the contact form table.

## Build & deploy (Netlify)

Production domain: `https://brandlux.com`

```sh
npm run build          # static assets -> dist/, SSR handler -> .netlify/functions-internal/server
```

`netlify.toml` sets the build command, the publish directory (`dist`) and the Node version.
Nitro's `netlify` preset writes the SSR function to `.netlify/functions-internal`, which Netlify
picks up automatically, plus `_headers`/`_redirects` inside `dist`.

1. Push the repo to GitHub and create a Netlify site from it (or use `netlify deploy` from the CLI).
2. Under **Site configuration → Environment variables**, add the Supabase keys. They are inlined at
   build time, so trigger a redeploy after changing them:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Apply the migrations in `supabase/migrations/` to your Supabase project.
4. Add `brandlux.com` as a custom domain in Netlify and point DNS at it.

## Regenerating the OG image

```sh
node scripts/generate-og-image.cjs   # writes public/og-image.png from the brand logo
```
