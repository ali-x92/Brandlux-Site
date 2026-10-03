import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { toolCount, toolGroups } from "@/lib/tools";

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Parallax speed={0.12}>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                {toolCount} AI tools · one brand kit
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                One idea in. <span className="text-gradient">A whole brand out.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Three stages, sixteen tools — all reading from the same brand kit, so
                everything you make looks like you.
              </p>
            </div>
          </Reveal>
        </Parallax>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {toolGroups.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 100} className="h-full">
              <div className="glass card-lift gradient-ring flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-gradient">0{gi + 1}</span>
                  <span className="rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {group.items.length} tools
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-bold">{group.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{group.desc}</p>

                <ul className="mt-5 flex-1 space-y-0.5 border-t border-border/60 pt-4">
                  {group.items.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        to="/tools"
                        hash={tool.slug}
                        className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted/70"
                      >
                        <span className="icon-badge flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-white">
                          <tool.icon className="h-4 w-4" strokeWidth={2.2} />
                        </span>
                        <span className="text-sm font-semibold">{tool.title}</span>
                        <ArrowRight className="ml-auto h-3.5 w-3.5 -translate-x-1 text-muted-foreground/60 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 text-center">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-6 py-2.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-muted/70"
            >
              See what every tool does
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
