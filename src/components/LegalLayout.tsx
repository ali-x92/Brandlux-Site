import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function LegalLayout({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="px-4 pb-20 pt-12 sm:pt-16">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            {eyebrow}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{updated}</p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{intro}</p>

          <div className="glass mt-10 space-y-8 rounded-3xl p-6 sm:p-10">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
