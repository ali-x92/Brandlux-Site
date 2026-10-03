import { Reveal } from "@/components/Reveal";
import { Check, Folder, Zap, Users, Sparkles } from "lucide-react";

type Tier = {
  name: string;
  price: string;
  period?: string;
  desc: string;
  stats: { icon: typeof Folder; label: string }[];
  features: string[];
  highlighted: boolean;
};

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    desc: "Generate your first brand kit and try every tool.",
    stats: [
      { icon: Folder, label: "1 project" },
      { icon: Zap, label: "15 credits / month" },
      { icon: Users, label: "1 seat" },
    ],
    features: [
      "Complete brand kit generation",
      "All 16 AI tools available",
      "Google & Facebook sign-in",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$59",
    period: "/mo",
    desc: "For small businesses launching their brand in earnest.",
    stats: [
      { icon: Folder, label: "5 projects" },
      { icon: Zap, label: "250 credits / month" },
      { icon: Users, label: "5 seats" },
    ],
    features: [
      "Everything in Free",
      "Room for multiple brands",
      "Seats for your team",
    ],
    highlighted: true,
  },
  {
    name: "Studio",
    price: "$249",
    period: "/mo",
    desc: "For agencies collaborating on client brands.",
    stats: [
      { icon: Folder, label: "20 projects" },
      { icon: Zap, label: "1,000 credits / month" },
      { icon: Users, label: "10 seats" },
    ],
    features: [
      "Everything in Pro",
      "A full client roster",
      "Bigger team, bigger output",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              Pricing
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
              Simple. <span className="text-gradient">Transparent</span>.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start free, upgrade as you grow. Wishlist members get launch-day discounts and free credits.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div
                className={`glass card-lift gradient-ring group relative h-full rounded-2xl p-7 ${
                  t.highlighted
                    ? "ring-2 ring-primary/60 shadow-[var(--shadow-glow)]"
                    : ""
                }`}
              >
                {t.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Most popular
                  </div>
                )}
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-gradient">
                    {t.price}
                  </span>
                  {t.period && (
                    <span className="text-sm text-muted-foreground">{t.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>

                <div className="mt-5 space-y-2 rounded-xl bg-white/50 p-3.5">
                  {t.stats.map((s) => (
                    <div key={s.label} className="flex items-center gap-2.5 text-sm">
                      <s.icon className="h-4 w-4 shrink-0 text-primary" />
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                <ul className="mt-5 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#wishlist"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] ${
                    t.highlighted
                      ? "bg-gradient-brand text-white shadow-[var(--shadow-glow)]"
                      : "border border-border bg-white/60 text-foreground hover:bg-white"
                  }`}
                >
                  Join wishlist
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="glass mt-6 flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
              <Sparkles className="h-5 w-5" strokeWidth={2.1} />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">How credits work.</span>{" "}
              Every AI action costs credits — from 1 for palettes and copy to 10 for packaging
              and mockups. Credits reset each billing period and don't roll over. You never
              manage AI keys, and billing runs on Paddle.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
