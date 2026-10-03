import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import {
  ChevronLeft,
  ChevronRight,
  Store,
  Sparkles,
  Briefcase,
} from "lucide-react";

const slides = [
  {
    icon: Store,
    tag: "Solo founders & small businesses",
    title: "A professional brand, without agency costs",
    desc: "One project holds your whole identity — generate the logo, launch the site, print the cards.",
    assets: ["Logo suite", "Business website", "Business cards", "Branded QR codes"],
  },
  {
    icon: Sparkles,
    tag: "Creators & freelancers",
    title: "Client-ready assets, fast",
    desc: "Mockups, posts and captions that stay on brand while you stay in flow.",
    assets: ["Post Maker", "Mockups", "Captions & tags", "Marketing copy"],
  },
  {
    icon: Briefcase,
    tag: "Agencies",
    title: "Every client brand in one place",
    desc: "Projects keep each client separate, with roles and usage insights on top.",
    assets: ["20 projects", "10 seats", "Editor & viewer roles", "Usage insights"],
  },
];

export function UseCases() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (d: number) => setI((p) => (p + d + slides.length) % slides.length);

  return (
    <section id="usecases" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Parallax speed={0.1}>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                Who it's for
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                From first logo to{" "}
                <span className="text-gradient">full agency roster</span>.
              </h2>
              <p className="mt-4 text-muted-foreground">
                However your brand grows, the workspace grows with it.
              </p>
            </div>
          </Reveal>
        </Parallax>

        <Reveal delay={120}>
          <div
            className="perspective relative mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${i * 100}%)` }}
              >
                {slides.map((s) => (
                  <div key={s.tag} className="w-full shrink-0 px-1">
                    <div className="glass gradient-ring group relative overflow-hidden rounded-3xl p-7 sm:p-10">
                      <div className="grid gap-8 md:grid-cols-[auto_1fr]">
                        <div className="icon-badge animate-float-slow flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-brand text-white shadow-[var(--shadow-glow)]">
                          <s.icon className="h-7 w-7" strokeWidth={2} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                            {s.tag}
                          </span>
                          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                            {s.title}
                          </h3>
                          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                            {s.desc}
                          </p>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {s.assets.map((a) => (
                              <span
                                key={a}
                                className="rounded-full border border-border bg-white/60 px-3 py-1.5 text-xs font-medium"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                aria-label="Previous use case"
                onClick={() => go(-1)}
                className="glass flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {slides.map((s, idx) => (
                  <button
                    key={s.tag}
                    aria-label={`Go to ${s.tag}`}
                    onClick={() => setI(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === i ? "w-8 bg-gradient-brand" : "w-3 bg-border"
                    }`}
                  />
                ))}
              </div>
              <button
                aria-label="Next use case"
                onClick={() => go(1)}
                className="glass flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
