import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Parallax";
import { Layers3, Folder, KeyRound, Globe } from "lucide-react";

const stats = [
  { icon: Layers3, value: "16", label: "AI tools, one workspace" },
  { icon: Folder, value: "1", label: "Brand kit behind them all" },
  { icon: KeyRound, value: "0", label: "API keys to manage" },
  { icon: Globe, value: "4", label: "Social platforms covered" },
];

export function Stats() {
  return (
    <section className="px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="perspective grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <Tilt max={10} className="h-full">
                <div className="glass card-lift gradient-ring tilt-sheen group relative h-full overflow-hidden rounded-3xl p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-[var(--shadow-glow)] icon-badge">
                    <s.icon className="h-6 w-6" strokeWidth={2.2} />
                  </div>
                  <div className="mt-4 font-display text-4xl font-bold text-gradient sm:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                  <s.icon className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 text-primary/5" />
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
