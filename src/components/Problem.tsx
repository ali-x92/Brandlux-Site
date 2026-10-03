import { Reveal } from "@/components/Reveal";
import { Parallax, Tilt } from "@/components/Parallax";
import {
  ArrowRight,
  PenTool,
  Globe,
  FileText,
  Palette,
  CreditCard,
  Boxes,
  ShieldCheck,
} from "lucide-react";

const scattered = [
  { icon: PenTool, label: "Logo from a designer" },
  { icon: Globe, label: "Site from an agency" },
  { icon: FileText, label: "Copy from a freelancer" },
  { icon: Palette, label: "Posts in a template tool" },
  { icon: CreditCard, label: "Cards from a printer" },
  { icon: Boxes, label: "Mockups… somewhere" },
];

export function Problem() {
  return (
    <section id="problem" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Parallax speed={0.1}>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                The problem
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                A designer. An agency. A copywriter.{" "}
                <span className="text-gradient">None of it matches.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Business owners assemble a brand from separate vendors and tools — and it
                never quite lines up. BrandLux replaces the pile with one workspace.
              </p>
            </div>
          </Reveal>
        </Parallax>

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              {scattered.map((s, i) => (
                <div
                  key={s.label}
                  className="glass animate-drift flex items-center gap-3 rounded-2xl border-dashed p-3.5 opacity-80"
                  style={{ animationDelay: `${i * 320}ms` }}
                >
                  <s.icon className="h-4.5 w-4.5 shrink-0 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="flex justify-center">
              <div className="animate-pulse-glow flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-white">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="perspective">
              <Tilt max={8}>
                <div className="glass gradient-ring tilt-sheen group relative overflow-hidden rounded-3xl p-7">
                  <div className="icon-badge flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-[var(--shadow-glow)]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">
                    One workspace. <span className="text-gradient">One brand kit.</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Every tool reads from the same brand kit — so a business card always
                    matches the website, and the posts match both.
                  </p>
                  <ul className="mt-5 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    {["Shared logo", "Shared palette", "Shared type", "Shared voice"].map(
                      (t) => (
                        <li key={t} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
                          {t}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </Tilt>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
