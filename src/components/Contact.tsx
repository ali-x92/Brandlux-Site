import { useRef, useState, type FormEvent } from "react";
import { Mail, MessageSquare, Send, Loader2, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/Reveal";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(3, "Please enter your email")
    .max(255, "Email is too long")
    .email("That doesn't look like a valid email"),
  message: z
    .string()
    .trim()
    .min(1, "Please write a message")
    .max(1000, "Message is too long (max 1000 characters)"),
});

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypotRef.current?.value) return;

    const parsed = contactSchema.safeParse({ name, email, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        message: parsed.data.message,
      });
      if (error) throw error;
      setDone(true);
      toast.success("Message sent — we'll get back to you soon.");
    } catch (err) {
      console.error("contact submit", err);
      toast.error("Something went wrong. Please try again or email hello@brandlux.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              Contact
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
              Got a question? <span className="text-gradient">Say hi</span>.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Partnerships, press, feedback or just curious — drop us a line and we'll
              reply within a day.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass gradient-ring relative mt-12 overflow-hidden rounded-3xl p-6 sm:p-10">
            {/* soft glow accents */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" />

            {done ? (
              <div className="relative flex flex-col items-center gap-3 py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-secondary" />
                <h3 className="text-xl font-semibold">Message sent</h3>
                <p className="text-sm text-muted-foreground">
                  Thanks {name.trim().split(" ")[0]}! We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="relative grid gap-8 md:grid-cols-5">
                {/* Honeypot — hidden from humans, catches naive bots */}
                <input
                  ref={honeypotRef}
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />

                <div className="md:col-span-2">
                  <p className="text-lg font-semibold">Let's talk</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We read every message and love hearing from builders.
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-white/40 px-4 py-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Email</div>
                        <a
                          href="mailto:hello@brandlux.com"
                          className="text-sm font-medium transition-colors hover:text-primary"
                        >
                          hello@brandlux.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-white/40 px-4 py-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Support</div>
                        <div className="text-sm font-medium">Reply in under 24h</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:col-span-3">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="text-xs font-medium text-muted-foreground">
                        Your name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={80}
                        required
                        autoComplete="name"
                        className="mt-1.5 w-full rounded-xl border border-border bg-white/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-xs font-medium text-muted-foreground">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={255}
                        required
                        autoComplete="email"
                        inputMode="email"
                        className="mt-1.5 w-full rounded-xl border border-border bg-white/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="you@brand.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="text-xs font-medium text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={1000}
                      required
                      rows={5}
                      className="mt-1.5 w-full resize-none rounded-xl border border-border bg-white/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="Tell us what's on your mind…"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:scale-[1.01] disabled:opacity-70"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
