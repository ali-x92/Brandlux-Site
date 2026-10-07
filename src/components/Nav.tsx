import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/BrandMark";
import { cn } from "@/lib/utils";

const sectionLinks = [
  { href: "#features", label: "Features" },
  { href: "#usecases", label: "Use cases" },
  { href: "#workspace", label: "Teams" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const itemClass = (active: boolean) =>
  cn(
    "rounded-full px-3.5 py-1.5 text-sm transition-colors",
    active
      ? "bg-muted/70 font-medium text-foreground"
      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
  );

const mobileItemClass =
  "rounded-2xl px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <div
          className={`flex w-full items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 ${
            scrolled
              ? "glass border-border/60 shadow-[var(--shadow-glass)]"
              : "border-transparent bg-transparent"
          }`}
        >
          <a
            href={isHome ? "#top" : "/"}
            className="flex items-center pl-1"
            aria-label="BrandLux home"
          >
            <BrandWordmark />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            <Link to="/tools" className={itemClass(pathname === "/tools")}>
              Tools
            </Link>
            {sectionLinks.map((l) => (
              <a
                key={l.href}
                href={isHome ? l.href : `/${l.href}`}
                className={itemClass(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={isHome ? "#wishlist" : "/#wishlist"}
              className="hidden rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.04] sm:inline-flex"
            >
              Join wishlist
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="rounded-full p-2 text-foreground/80 hover:bg-muted lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl px-4 lg:hidden">
          <div className="glass flex flex-col gap-1 rounded-3xl p-3">
            <Link
              to="/tools"
              onClick={() => setOpen(false)}
              className={mobileItemClass}
            >
              Tools
            </Link>
            {sectionLinks.map((l) => (
              <a
                key={l.href}
                href={isHome ? l.href : `/${l.href}`}
                onClick={() => setOpen(false)}
                className={mobileItemClass}
              >
                {l.label}
              </a>
            ))}
            <a
              href={isHome ? "#wishlist" : "/#wishlist"}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-2xl bg-gradient-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Join wishlist
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
