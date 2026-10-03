import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const emailSchema = z
  .string()
  .trim()
  .min(3, "Please enter your email")
  .max(255, "Email is too long")
  .email("That doesn't look like a valid email");

export function WishlistForm({
  source = "landing",
  size = "md",
  className,
}: {
  source?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypotRef.current?.value) return;
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase
        .from("wishlist_signups")
        .insert({ email: parsed.data.toLowerCase(), source });
      if (error) {
        if (error.code === "23505") {
          setDone(true);
          toast.success("You're already on the list — see you soon!");
        } else {
          throw error;
        }
      } else {
        setDone(true);
        toast.success("You're on the wishlist! We'll be in touch.");
      }
    } catch (err) {
      console.error("wishlist submit", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tall = size === "lg";

  if (done) {
    return (
      <div
        className={cn(
          "glass flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-medium",
          className,
        )}
      >
        <CheckCircle2 className="h-5 w-5 text-secondary" />
        <span>Thanks! We've added <strong>{email}</strong> to the wishlist.</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={onSubmit}
        className="glass flex w-full flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center"
      >
        {/* Honeypot — hidden from humans, catches naive bots */}
        <input
          ref={honeypotRef}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <input
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@brand.com"
          maxLength={255}
          className={cn(
            "min-w-0 flex-1 rounded-xl bg-transparent px-4 text-foreground placeholder:text-muted-foreground/70 focus:outline-none",
            tall ? "py-4 text-base" : "py-3 text-sm",
          )}
        />
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:scale-[1.02] active:scale-[0.99] disabled:opacity-70",
            tall ? "px-6 py-4 text-base" : "px-5 py-3 text-sm",
          )}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Join wishlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>
      <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
        No spam, ever. By joining you agree to our{" "}
        <Link to="/privacy" className="underline transition-colors hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
