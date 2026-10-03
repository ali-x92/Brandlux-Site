import { Link, useLocation } from "@tanstack/react-router";
import { BrandWordmark } from "@/components/BrandMark";

type FooterLink = { href: string; label: string; route?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/tools", label: "Tools", route: true },
      { href: "#features", label: "Features" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
      { href: "#wishlist", label: "Early access" },
    ],
  },
];

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <footer className="px-4 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="glass overflow-hidden rounded-3xl px-6 py-10 sm:px-10">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div className="max-w-sm">
              <BrandWordmark />
              <p className="mt-4 text-sm text-muted-foreground">
                An AI brand studio: one workspace for your logo, website, print,
                packaging, social content and marketing copy.
              </p>
              <p className="mt-5 text-sm text-muted-foreground">
                Questions?{" "}
                <a
                  href="mailto:hello@brandlux.com"
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  hello@brandlux.com
                </a>
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.route ? (
                        <Link to="/tools" className={linkClass}>
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={isHome ? l.href : `/${l.href}`}
                          className={linkClass}
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} BrandLux. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xs text-muted-foreground">
              <Link to="/privacy" className="transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
