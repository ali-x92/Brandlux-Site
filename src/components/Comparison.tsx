import { Reveal } from "@/components/Reveal";
import { Parallax, Tilt } from "@/components/Parallax";
import { Check, X } from "lucide-react";

const rows = [
  "One brand kit behind every asset",
  "Logo, website & print in one place",
  "Marketing copy included",
  "Same palette & type everywhere",
  "Team seats & projects",
  "No design skills needed",
];

export function Comparison() {
  return (
    <section id="compare" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Parallax speed={0.1}>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                The difference
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                BrandLux vs <span className="text-gradient">the old way</span>.
              </h2>
            </div>
          </Reveal>
        </Parallax>

        <div className="perspective mt-14">
          <Reveal>
            <Tilt max={5}>
              <div className="glass tilt-sheen overflow-hidden rounded-3xl">
                <div className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-2 border-b border-border/60 p-5 text-sm font-semibold sm:p-6">
                  <span className="text-muted-foreground">What you get</span>
                  <span className="text-center text-gradient">BrandLux</span>
                  <span className="text-center text-muted-foreground">The old way</span>
                </div>
                {rows.map((r, i) => (
                  <div
                    key={r}
                    className={`grid grid-cols-[1.6fr_1fr_1fr] items-center gap-2 p-5 text-sm sm:p-6 ${
                      i !== rows.length - 1 ? "border-b border-border/40" : ""
                    }`}
                  >
                    <span className="font-medium">{r}</span>
                    <span className="flex justify-center">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-white">
                        <Check className="h-4 w-4" strokeWidth={2.6} />
                      </span>
                    </span>
                    <span className="flex justify-center">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <X className="h-4 w-4" strokeWidth={2.6} />
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
