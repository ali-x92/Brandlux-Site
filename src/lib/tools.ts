import {
  PenTool,
  Palette,
  Type,
  BookOpen,
  Globe,
  CreditCard,
  UtensilsCrossed,
  Package,
  Boxes,
  Mail,
  QrCode,
  Instagram,
  Hash,
  FileText,
  FileSpreadsheet,
  UserRound,
  Send,
  Bot,
  type LucideIcon,
} from "lucide-react";

export type Tool = {
  slug: string;
  title: string;
  desc: string;
  icon: LucideIcon;
};

export type ToolGroup = {
  id: string;
  title: string;
  desc: string;
  items: Tool[];
};

export const toolGroups: ToolGroup[] = [
  {
    id: "identity",
    title: "Build the identity",
    desc: "Start with a complete brand kit — every other tool reads from it.",
    items: [
      {
        slug: "logo-maker",
        title: "Logo Maker",
        icon: PenTool,
        desc: "AI logo concepts from your business description — iterate with prompts until it feels right.",
      },
      {
        slug: "palettes",
        title: "Palettes",
        icon: Palette,
        desc: "Color systems that work in print, web and social alike.",
      },
      {
        slug: "typography",
        title: "Typography",
        icon: Type,
        desc: "Font pairings and a type scale, locked to your brand.",
      },
      {
        slug: "brand-guidelines",
        title: "Brand Guidelines",
        icon: BookOpen,
        desc: "A living rulebook — colors, type and voice, on one page.",
      },
    ],
  },
  {
    id: "web-print",
    title: "Ship web & print",
    desc: "Everything your brand shows up on, generated on-brand.",
    items: [
      {
        slug: "website",
        title: "Website",
        icon: Globe,
        desc: "A full site from your brand kit — prompt-based builder with history, restore and ZIP export.",
      },
      {
        slug: "business-cards",
        title: "Business Cards",
        icon: CreditCard,
        desc: "Print-ready cards, front and back, in your palette.",
      },
      {
        slug: "menu-cards",
        title: "Menu Cards",
        icon: UtensilsCrossed,
        desc: "Café, salon or studio menus that match the brand.",
      },
      {
        slug: "packaging",
        title: "Packaging Design",
        icon: Package,
        desc: "Labels and packaging mockups, render-ready.",
      },
      {
        slug: "mockups",
        title: "Mockups",
        icon: Boxes,
        desc: "See the brand on apparel, devices and packaging.",
      },
      {
        slug: "email-signatures",
        title: "Email Signatures",
        icon: Mail,
        desc: "On-brand signatures for the whole team.",
      },
      {
        slug: "qr-codes",
        title: "QR Codes",
        icon: QrCode,
        desc: "Branded QR codes for menus, links and packaging.",
      },
      {
        slug: "invoice-stationery",
        title: "Invoice & Stationery",
        icon: FileSpreadsheet,
        desc: "Print-ready A4 invoices and letterheads in your palette, fonts and contact block.",
      },
    ],
  },
  {
    id: "grow",
    title: "Market & grow",
    desc: "Content and copy, consistent across every channel.",
    items: [
      {
        slug: "post-maker",
        title: "Post Maker",
        icon: Instagram,
        desc: "Feed posts, stories and covers, sized correctly for each platform.",
      },
      {
        slug: "captions-tags",
        title: "Captions & Tags",
        icon: Hash,
        desc: "Captions and hashtags tuned to your tone of voice.",
      },
      {
        slug: "marketing-copy",
        title: "Marketing Copy",
        icon: FileText,
        desc: "Headlines, launch emails and bios in your brand's voice.",
      },
      {
        slug: "social-profile-kit",
        title: "Social Profile Kit",
        icon: UserRound,
        desc: "Correctly-sized avatars and cover images for every platform, drawn from your kit.",
      },
      {
        slug: "auto-post",
        title: "Auto-Post",
        icon: Send,
        desc: "Schedule on-brand posts straight to your socials.",
      },
      {
        slug: "ai-chat",
        title: "AI Chat",
        icon: Bot,
        desc: "Ask anything about your brand — the chat knows your kit.",
      },
    ],
  },
];

export const toolCount = toolGroups.reduce((n, g) => n + g.items.length, 0);
