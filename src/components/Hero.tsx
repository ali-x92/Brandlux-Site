import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { WishlistForm } from "@/components/WishlistForm";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Floating glow blobs with scroll parallax depth */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Parallax speed={0.45}>
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-float-slow" />
        </Parallax>
        <Parallax speed={-0.35}>
          <div className="absolute -right-20 top-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl animate-float-slower" />
        </Parallax>
        <Parallax speed={0.25}>
          <div className="absolute left-1/2 top-72 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/25 blur-3xl animate-float-slow" />
        </Parallax>
      </div>


      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:pt-28 md:pb-20 md:pt-32">
        <Reveal>
          <div className="flex justify-center">
            <div className="animate-pulse-glow inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Coming soon · Join the early access list
            </div>
          </div>
        </Reveal>


        <Reveal delay={120}>
          <h1 className="mx-auto mt-6 max-w-3xl text-center text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Your brand, <span className="text-shimmer">radiant.</span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
            BrandLux is an AI brand studio. Answer a few questions about your business
            and get a complete identity — logo, website, print, packaging, social content
            and copy — consistent everywhere, from one workspace.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div id="wishlist" className="mx-auto mt-10 max-w-xl scroll-mt-24">
            <WishlistForm size="lg" source="hero" />
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No spam. Early-access perks for everyone on the list.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
