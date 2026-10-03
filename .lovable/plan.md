## Brand Maker — Landing Page

A minimal, soft-gradient landing page introducing Brand Maker (AI-powered brand asset generator) with a wishlist signup backed by Lovable Cloud.

### Visual Style
- Light orange → purple soft gradients with glassy/blurred cards
- Minimal typography, generous whitespace
- Lucide icons, subtle scroll-reveal & hover animations
- Fully responsive

### Page Sections (single route `/`)

1. **Sticky Nav** — Brand Maker wordmark + small gradient mark, anchor links, "Join Wishlist" CTA.
2. **Hero** — Headline "Your entire brand. Made in minutes.", subtext describing what it does, inline email field + "Join Wishlist" button, soft animated gradient blob background.
3. **What It Makes (Features Grid)** — Glass cards with icons for: Websites, Logos, Instagram posts, Facebook creatives, X (Twitter) posts, WhatsApp graphics, plus "& more". Hover lift effect.
4. **How It Works** — 3 steps: Tell your idea → AI generates your brand kit → Publish & share. Numbered gradient circles.
5. **FAQ** — Accordion with 4–5 common questions (what it is, when launching, is it free, what formats, can I edit).
6. **Wishlist CTA Section** — Repeat email capture with reassurance copy ("No spam. Early access perks.").
7. **Footer** — Minimal: logo, copyright, small social icons.

### Wishlist Functionality
- Lovable Cloud table `wishlist_signups` (id, email unique, source, created_at)
- Server function validates email with zod, inserts row, handles duplicates gracefully
- Toast feedback on success/error; button shows loading state
- RLS: insert allowed for anyone; select restricted (admin-only later)

### Animations
- Scroll-reveal fade-in-up on each section using IntersectionObserver
- Slow floating gradient blobs in hero
- Hover scale on feature cards and buttons
- Smooth scroll for nav anchors

### Technical Notes
- Enable Lovable Cloud; create `wishlist_signups` table via migration
- `createServerFn` `joinWishlist` with zod validation (trimmed email, max 255)
- Update `src/styles.css` light theme tokens to orange/purple palette; keep oklch
- Components: `Hero`, `Features`, `HowItWorks`, `Faq`, `WishlistForm`, `Footer`, `RevealOnScroll` wrapper
- Replace placeholder in `src/routes/index.tsx`; update root `head()` meta (title, description, og)
