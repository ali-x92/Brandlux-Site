import { Reveal } from "@/components/Reveal";
import { faqs } from "@/lib/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
