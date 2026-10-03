import { Reveal } from "@/components/Reveal";
import { WishlistForm } from "@/components/WishlistForm";

export function CtaSection() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-14 text-center">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />

            <h2 className="text-3xl font-bold sm:text-5xl">
              Your brand, <span className="text-gradient">radiant</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join the wishlist for early access and free credits at launch — and be
              first to build your brand kit.
            </p>
            <div className="mx-auto mt-8 max-w-lg">
              <WishlistForm size="lg" source="cta" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
