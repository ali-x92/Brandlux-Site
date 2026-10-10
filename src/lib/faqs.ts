// Shared by the FAQ accordion and the FAQPage JSON-LD in the index route so the markup can't drift.
import { toolCount } from "./tools";

export const faqs = [
  {
    q: "What exactly is BrandLux?",
    a: `BrandLux is an AI brand studio. Each project holds one brand — its logo, palette, type and voice — and ${toolCount} tools build from that kit: website, print, packaging, social content and marketing copy.`,
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
