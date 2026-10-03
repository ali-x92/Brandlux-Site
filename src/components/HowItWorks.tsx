import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Parallax";
import { PenLine, Wand2, Rocket } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: PenLine,
    title: "Answer a few questions",
    desc: "Tell BrandLux about your business — what you do and who it's for.",
  },
  {
    n: "02",
    icon: Wand2,
    title: "AI builds your brand kit",
    desc: "A complete identity is generated and stored in your project.",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Create everywhere",
    desc: "Every tool reads the same kit — website, print, packaging, social and copy.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              How it works
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
              From idea to launch in <span className="text-gradient">3 steps</span>.
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-brand opacity-30 md:block" />

          <div className="perspective grid gap-6 pt-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 130}>
                <Tilt max={9} className="h-full">
                  <div className="glass card-lift gradient-ring tilt-sheen group relative h-full rounded-3xl p-7 pt-12">
                    {/* Icon node on the line */}
                    <div className="absolute -top-7 left-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-[var(--shadow-glow)] icon-badge">
                      <s.icon className="h-7 w-7" strokeWidth={2.1} />
                    </div>
                    <span className="pointer-events-none absolute right-6 top-5 font-display text-6xl font-bold text-primary/10">
                      {s.n}
                    </span>
                    <h3 className="text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
