import { Reveal } from "@/components/Reveal";
import { Parallax, Tilt } from "@/components/Parallax";
import { Folder, LayoutDashboard, Users, BarChart3 } from "lucide-react";

const perks = [
  {
    icon: Folder,
    title: "One project per brand",
    desc: "Each project stores its own brand kit — logo, palette, type and voice.",
  },
  {
    icon: LayoutDashboard,
    title: "Projects dashboard",
    desc: "Jump between brands without losing context or assets.",
  },
  {
    icon: Users,
    title: "Team management",
    desc: "Invite editors and viewers, with seat limits per plan.",
  },
  {
    icon: BarChart3,
    title: "Insights",
    desc: "Track credits usage and activity across your workspace.",
  },
];

export function Workspace() {
  return (
    <section id="workspace" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Parallax speed={0.1}>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                Workspace
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                Every brand in <span className="text-gradient">its own project</span>.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Projects keep brands separate, while every tool reads from the same brand kit —
                so a business card always matches the website.
              </p>
            </div>
          </Reveal>
        </Parallax>

        <div className="perspective mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <Tilt max={8} className="h-full">
                <div className="glass card-lift gradient-ring tilt-sheen group h-full rounded-2xl p-6">
                  <div className="icon-badge flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white">
                    <p.icon className="h-5 w-5" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="glass mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl p-7 sm:flex-row sm:p-9">
            <div>
              <h3 className="text-xl font-semibold">Room to grow</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Studio covers 20 projects and 10 seats — enough for a full client roster.
              </p>
            </div>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
            >
              See pricing
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
