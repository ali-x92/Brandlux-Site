import { Reveal } from "@/components/Reveal";
import { Parallax, Tilt } from "@/components/Parallax";
import { Wand2, MessagesSquare, BookOpen, KeyRound, Sparkles } from "lucide-react";

const cells = [
  {
    icon: Wand2,
    title: "One prompt, a whole brand",
    desc: "Describe your business once. BrandLux generates a complete identity — and every tool builds from it.",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    icon: MessagesSquare,
    title: "Edit the site by talking",
    desc: "“Make the hero headline punchier.” Prompt-based edits with history and restore — then export as a ZIP.",
    span: "",
  },
  {
    icon: BookOpen,
    title: "Guidelines that stick",
    desc: "Palette, type and voice — locked for every tool.",
    span: "",
  },
  {
    icon: KeyRound,
    title: "No API keys. Ever.",
    desc: "All 16 AI tools included. You never configure or pay a model provider — credits cover it.",
    span: "sm:col-span-2",
  },
];

export function Bento() {
  return (
    <section id="showcase" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Parallax speed={0.1}>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                Why BrandLux
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                One workspace. <span className="text-gradient">Every asset.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Logo, website, print, packaging, social and copy — generated from the
                same brand kit, so they all belong together.
              </p>
            </div>
          </Reveal>
        </Parallax>

        <div className="perspective mt-14 grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 sm:grid-cols-4">
          {cells.map((c, i) => (
            <Reveal key={c.title} delay={i * 70} className={c.span}>
              <Tilt max={8} className="h-full">
                <div className="glass card-lift gradient-ring tilt-sheen group relative h-full overflow-hidden rounded-3xl p-6">
                  <div className="icon-badge flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-[var(--shadow-glow)]">
                    <c.icon className="h-6 w-6" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                  <Sparkles className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 text-primary/10" />
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
