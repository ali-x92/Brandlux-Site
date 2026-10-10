import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Parallax";
import { Sparkles, Users, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Consistent by default",
    desc: "One brand kit drives every tool, so assets match without effort.",
  },
  {
    icon: Users,
    title: "Built for small teams",
    desc: "Solo founders, freelancers and agencies — with seats when you need them.",
  },
  {
    icon: ShieldCheck,
    title: "Humans stay in the loop",
    desc: "AI output is a starting point. Review, refine, then publish.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                About
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                Branding shouldn't take <span className="text-gradient">four vendors</span>.
              </h2>
              <p className="mt-5 text-muted-foreground">
                Building a brand used to mean a designer, a web agency, a copywriter and a printer —
                four timelines, four invoices, and a result that never quite matched.
              </p>
              <p className="mt-3 text-muted-foreground">
                BrandLux replaces the pile with one workspace: a brand kit every tool reads from, so
                your brand looks like one brand — everywhere.
              </p>
            </div>
          </Reveal>

          <div className="perspective grid gap-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <Tilt max={7}>
                  <div className="glass card-lift gradient-ring tilt-sheen group flex items-start gap-4 rounded-2xl p-5">
                    <div className="icon-badge flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
                      <v.icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{v.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
                    </div>
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
