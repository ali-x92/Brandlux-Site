import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What exactly is BrandLux?",
    a: "BrandLux is an AI brand studio. Each project holds one brand — its logo, palette, type and voice — and 16 tools build from that kit: website, print, packaging, social content and marketing copy.",
  },
  {
    q: "How do credits work?",
    a: "Every AI action costs credits — from 1 for palettes and copy to 10 for packaging and mockups. Credits reset each billing period and don't roll over.",
  },
  {
    q: "Do I need API keys or my own AI accounts?",
    a: "No. All AI models are included and managed for you — you never touch a key. Plans just differ in projects, credits and seats.",
  },
  {
    q: "How do I sign in?",
    a: "One-tap sign-in with Google or Facebook — no passwords to remember.",
  },
  {
    q: "Can I edit what it generates?",
    a: "Yes. The website builder is prompt-based — ask for changes in plain language, with full history and restore, then export the whole site as a ZIP.",
  },
  {
    q: "Is the AI output ready to publish as-is?",
    a: "It's a strong starting point, not a final say. Review and refine anything before it ships — you stay in control of your brand.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
              Questions, <span className="text-gradient">answered</span>.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass mt-10 rounded-2xl px-2 sm:px-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="border-b border-border/60 last:border-0"
                >
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
