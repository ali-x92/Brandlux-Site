# BrandLux

Pre-launch marketing site for **BrandLux** — an AI brand studio that turns one idea into a complete
brand: logo, website, print, packaging, social content and marketing copy, all drawn from one brand kit.

The site collects early-access wishlist signups and contact messages, stores them in Supabase, and
emails the submitter an auto-reply plus a notification to `hello@getbrandlux.com`.

## Stack

- React 19 + TanStack Start (SSR) + Vite 7, deployed to Netlify (nitro `netlify` preset)
- Tailwind CSS v4 + the shadcn/ui primitives the site actually uses (accordion, toaster)
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

Production domain: `https://getbrandlux.com`

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
4. Add `getbrandlux.com` as a custom domain in Netlify, then point DNS at it:
   - Apex `A` record → `75.2.60.5` **only**. Any extra apex A record (a registrar parking or
     forwarding IP, for example) silently steals traffic: visitors and Googlebot then get a parking
     page that 404s `/robots.txt`, `/sitemap.xml` and the Search Console file.
   - `www` → `CNAME` to `<site>.netlify.app`.
   - Turn on the HTTPS certificate in Netlify (**Domain management → HTTPS**) and wait for it to
     issue. Until then the edge serves `*.netlify.app`, every visit to `https://getbrandlux.com`
     fails hostname verification, and Google cannot crawl or index a single page.

## Email: receiving, and the auto-replies

Two independent things, both under `getbrandlux.com`:

**A. The `hello@getbrandlux.com` mailbox (receiving).** Sign up for a mail host (Google Workspace,
Zoho Mail, Fastmail), then add the **MX records** it gives you for `getbrandlux.com` at your
registrar. Until those exist, nothing sent to `hello@` arrives anywhere.

**B. Outbound mail (auto-reply + notification).** Handled by the Supabase Edge Function
`supabase/functions/form-notify`, triggered by database webhooks on both tables — the browser forms
are unchanged.

> **Status: live and verified on `zupjwqtzhckpfguhzqnq` (2026-10-08).** Both paths were tested with
> real submissions and Resend reported `delivered`. The steps below are kept as the redeploy recipe.
> The webhook shared secret is NOT in this repo — it is in `.env.notify` (git-ignored) and in the
> project's Edge Function secrets; they must always match.

Setup, in order:

1. Create a [Resend](https://resend.com) account and verify the domain `getbrandlux.com`. Resend's
   automated setup puts a CNAME + SPF `TXT` + MX on the `send` subdomain (targets under `rmta.net`)
   and the DKIM key at `resend._domainkey.getbrandlux.com`, so it does not clash with the inbox MX
   records from step A. — **done 2026-10-08, domain shows `verified`.**
2. Generate one long random string. It is used twice and must match in both places:
   `npx supabase secrets set WEBHOOK_SECRET=<that-string> RESEND_API_KEY=<key> MAIL_FROM="BrandLux <hello@getbrandlux.com>"`
   (or Dashboard → Edge Functions → Secrets). Replace `REPLACE_WEBHOOK_SECRET` in
   `supabase/setup.sql` / `supabase/migrations/20261007000000_form_notify_webhooks.sql` with it.
3. Run the "EMAIL NOTIFICATIONS + AUTO-REPLIES" block of `supabase/setup.sql` in the SQL editor.
4. Deploy the function: `npx supabase functions deploy form-notify --no-verify-jwt`.
5. Submit the contact form once. Two emails should arrive — an auto-reply to the address used, and a
   notification to `hello@getbrandlux.com` with `Reply-To` set to the sender, so replying from the
   mailbox answers them directly.
6. If nothing arrives, check the webhook call log:
   `select id, status_code, error_msg, created from net._http_response order by created desc limit 10;`

A failed or missing email never blocks a submission — the row is already committed, and signups stay
readable in the Table Editor regardless.

## Regenerating the OG image

```sh
node scripts/generate-og-image.cjs   # writes public/og-image.png from the brand logo
```
