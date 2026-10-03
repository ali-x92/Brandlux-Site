import { Instagram, Facebook, Twitter, MessageCircle, Globe, Mail, Printer } from "lucide-react";

const row = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "X" },
  { Icon: MessageCircle, label: "WhatsApp" },
  { Icon: Globe, label: "Web" },
  { Icon: Mail, label: "Email" },
  { Icon: Printer, label: "Print" },
];

export function Platforms() {
  const items = [...row, ...row];
  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          One brand, every surface
        </p>
        <div className="relative mt-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-10">
            {items.map((it, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-foreground/60"
              >
                <it.Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
