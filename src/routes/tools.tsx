import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FolderKanban, KeyRound, RefreshCcw } from "lucide-react";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CtaSection } from "@/components/CtaSection";
import { Reveal } from "@/components/Reveal";
import { Toaster } from "@/components/ui/sonner";
import { toolGroups } from "@/lib/tools";

export const Route = createFileRoute("/tools")({
  component: ToolsPage,
  head: () => ({
    meta: [
      { title: "Tools — BrandLux" },
      {
        name: "description",
        content:
          "Every BrandLux tool in one place: logo maker, palettes, typography, brand guidelines, website builder, business cards, menu cards, packaging, mockups, email signatures, QR codes, post maker, captions, marketing copy, auto-post and AI chat.",
      },
      { property: "og:title", content: "Tools — BrandLux" },
      {
        property: "og:description",
        content:
          "Sixteen AI tools, one brand kit. See what every BrandLux tool does — and how they stay on-brand together.",
      },
    ],
  }),
});

const perks = [
  {
    icon: RefreshCcw,
    title: "Simple credits",
    desc: "Every AI action costs 1–10 credits — from 1 for palettes and copy to 10 for packaging and mockups. Credits reset each billing period and don't roll over.",
  },
  {
    icon: KeyRound,
    title: "No API keys, ever",
    desc: "You never manage AI accounts or keys — BrandLux runs the models, so there's nothing to set up before you create.",
  },
  {
    icon: FolderKanban,
    title: "One project per brand",
    desc: "Each brand keeps its own kit, assets and history — manage them all from your projects dashboard.",
  },
];

function ToolsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="px-4 pt-14 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                Tools
              </span>
              <h1 className="mt-3 text-4xl font-bold sm:text-6xl">
                Sixteen tools. <span className="text-gradient">One brand.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Every BrandLux tool reads from the same brand kit — your colors, fonts, logo
                and tone of voice. Build the identity once, and everything you make comes
                out looking like you.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/"
                  hash="wishlist"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
                >
                  Join the wishlist
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/"
                  hash="pricing"
                  className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-6 py-2.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-muted/70"
                >
                  See pricing
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl space-y-14 sm:space-y-16">
            {toolGroups.map((group, gi) => (
              <div key={group.id} id={group.id} className="scroll-mt-24">
                <Reveal>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-sm font-bold text-gradient">0{gi + 1}</span>
                    <h2 className="text-2xl font-bold sm:text-3xl">{group.title}</h2>
                    <p className="text-sm text-muted-foreground">{group.desc}</p>
                  </div>
                </Reveal>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {group.items.map((tool, i) => (
                    <Reveal key={tool.slug} delay={i * 60} className="h-full">
                      <article
                        id={tool.slug}
                        className="glass card-lift gradient-ring flex h-full scroll-mt-28 items-start gap-4 rounded-2xl p-5"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-sm">
                          <tool.icon className="h-5 w-5" strokeWidth={2.2} />
                        </span>
                        <div>
                          <h3 className="text-base font-semibold">{tool.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{tool.desc}</p>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-20 sm:pb-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="glass rounded-3xl p-6 sm:p-8">
                <div className="grid gap-6 sm:grid-cols-3">
                  {perks.map((p) => (
                    <div key={p.title} className="flex items-start gap-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                        <p.icon className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold">{p.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <CtaSection />
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
