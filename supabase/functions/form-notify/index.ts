// Supabase Edge Function: sends outbound mail whenever a form row is inserted.
// Wired to both tables by database webhooks (see supabase/setup.sql).
// Secrets required: RESEND_API_KEY, WEBHOOK_SECRET, MAIL_FROM (optional override).

interface WebhookPayload {
  table: string;
  operation?: "INSERT" | "UPDATE" | "DELETE";
  type?: "INSERT" | "UPDATE" | "DELETE";
  record: Record<string, unknown> | string | null;
}

interface EmailRequest {
  from: string;
  to: string;
  subject: string;
  preheader: string;
  heading: string;
  body: string;
  text: string;
  reply_to?: string;
}

const SITE = "https://getbrandlux.com";
const OWNER_EMAIL = "hello@getbrandlux.com";

// Brand palette from src/styles.css — ink #1C172B, purple #833AF0, cream #FFFBF3.
const INK = "#1c172b";
const PURPLE = "#833af0";
const MUTED = "#5d5673";
const CREAM = "#fffbf3";

function esc(value: unknown): string {
  const s = String(value ?? "");
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function button(label: string, href: string): string {
  return `<tr><td style="padding-top:26px">
    <a href="${href}" style="display:inline-block;background:${PURPLE};color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:9999px">${esc(label)}</a>
  </td></tr>`;
}

function quote(text: unknown): string {
  return `<tr><td style="padding-top:18px">
    <div style="padding:14px 16px;background:#f8f4fb;border-left:3px solid ${PURPLE};border-radius:0 10px 10px 0;font-size:14px;line-height:1.6;color:${INK};white-space:pre-wrap">${esc(text)}</div>
  </td></tr>`;
}

/** Renders the whole message. Text-only clients get `text`, so keep both in sync. */
function render(msg: EmailRequest): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(msg.subject)}</title></head>
<body style="margin:0;background:${CREAM};padding:34px 16px;font-family:'Plus Jakarta Sans',Segoe UI,Helvetica,Arial,sans-serif;color:${INK}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(msg.preheader)}</div>
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;max-width:560px;background:#ffffff;border-radius:22px;overflow:hidden;box-shadow:0 12px 40px rgba(28,23,43,.07)">
      <tr><td style="height:4px;background:linear-gradient(120deg,#833af0 0%,#dd47d6 35%,#ec009c 65%,#ff7527 100%);background-color:${PURPLE}"></td></tr>
      <tr><td style="padding:30px 34px 34px">
        <table cellpadding="0" cellspacing="0" role="presentation"><tr>
          <td style="font-size:11px;font-weight:800;letter-spacing:2.4px;color:${PURPLE};text-transform:uppercase">BrandLux</td>
        </tr></table>
        <h1 style="margin:20px 0 0;font-size:23px;line-height:1.3;letter-spacing:-.3px;font-weight:800;color:${INK}">${esc(msg.heading)}</h1>
        ${msg.body}
        <table cellpadding="0" cellspacing="0" role="presentation" style="margin-top:32px;border-top:1px solid #efeaf4;padding-top:0">
          ${buttonLine(SITE)}
        </table>
      </td></tr>
    </table>
    <table cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px"><tr><td style="padding:16px 8px 0;font-size:12px;line-height:1.6;color:${MUTED}">
      You are receiving this because you left your email on the BrandLux site.<br>
      <a href="${SITE}" style="color:${PURPLE};text-decoration:none">getbrandlux.com</a> · <a href="mailto:${OWNER_EMAIL}" style="color:${PURPLE};text-decoration:none">${OWNER_EMAIL}</a>
    </td></tr></table>
  </td></tr></table>
</body></html>`;
}

function buttonLine(href: string): string {
  return `<tr><td style="padding-top:22px;font-size:12px;color:${MUTED}">One workspace for your logo, website, print, packaging, social and copy.</td></tr>
    <tr><td style="padding-top:6px"><a href="${href}" style="font-size:12px;color:${PURPLE};text-decoration:none;font-weight:600">${href.replace("https://", "")}</a></td></tr>`;
}

async function sendEmail(msg: EmailRequest, apiKey: string): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: msg.from,
      to: msg.to,
      subject: msg.subject,
      html: render(msg),
      text: msg.text,
      reply_to: msg.reply_to,
    }),
  });
  if (!res.ok) console.error("resend error", res.status, await res.text());
  return res.ok;
}

const BULLET = (t: string) =>
  `<tr><td style="padding:6px 0 6px 14px;font-size:15px;line-height:1.6;color:${MUTED}">&bull;&nbsp;${t}</td></tr>`;

Deno.serve(async (req) => {
  const payload = (await req.json().catch(() => null)) as WebhookPayload | null;
  if (!payload || (payload.operation ?? payload.type) !== "INSERT" || !payload.record) {
    return new Response("ignored", { status: 200 });
  }
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const webhookSecret = Deno.env.get("WEBHOOK_SECRET");
  const from = Deno.env.get("MAIL_FROM") ?? `BrandLux <${OWNER_EMAIL}>`;

  if (!apiKey || !webhookSecret) {
    return new Response("mail not configured", { status: 500 });
  }
  if (req.headers.get("Authorization")?.replace("Bearer ", "") !== webhookSecret) {
    return new Response("unauthorized", { status: 401 });
  }

  const raw = payload.record;
  const r = (typeof raw === "string" ? JSON.parse(raw) : raw) as Record<string, unknown>;
  const table = String(payload.table ?? "")
    .split(".")
    .pop();
  const email = String(r.email ?? "").toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return new Response("bad email", { status: 200 });

  const sentAt = String(r.created_at ?? new Date().toISOString());
  const messages: EmailRequest[] = [];

  if (table === "wishlist_signups") {
    messages.push(
      {
        from,
        to: email,
        subject: "You're all set — BrandLux early access",
        preheader: "You're on the list. We'll email you the moment early access opens.",
        heading: "You're all set.",
        body: `<tr><td style="padding-top:14px;font-size:15px;line-height:1.7;color:${MUTED}">
            Congratulations — you're on the BrandLux early-access list. We'll write to
            <strong style="color:${INK}">${esc(email)}</strong> the moment the doors open,
            no confirmation link or password needed on your side.
          </td></tr>
          <tr><td style="padding-top:22px;font-size:15px;line-height:1.7;color:${MUTED}">
            Being on the list means you start ahead of everyone else:
          </td></tr>
          <table cellpadding="0" cellspacing="0" role="presentation" style="margin-top:8px;width:100%">
            ${BULLET("Launch-day pricing, before it goes up")}
            ${BULLET("Free credits to spend on your first brand kit")}
            ${BULLET("Direct input on which tools we ship next")}
          </table>
          <tr><td style="padding-top:22px;font-size:15px;line-height:1.7;color:${MUTED}">
            While you're here — BrandLux is one AI workspace where every tool reads from a
            single brand kit, so your logo, website, print, packaging, social content and
            marketing copy all match without you babysitting them.
          </td></tr>
          ${button("See what BrandLux makes", SITE)}`,
        text: `You're all set.

Congratulations — you're on the BrandLux early-access list. We'll email ${email}
the moment the doors open. No confirmation link or password needed on your side.

Being on the list means you start ahead of everyone else:
  - Launch-day pricing, before it goes up
  - Free credits to spend on your first brand kit
  - Direct input on which tools we ship next

BrandLux is one AI workspace where every tool reads from a single brand kit, so your
logo, website, print, packaging, social content and marketing copy all match without
you babysitting them.

${SITE}`,
      },
      {
        from,
        to: OWNER_EMAIL,
        subject: `New wishlist signup: ${email}`,
        reply_to: email,
        heading: "Someone just joined the wishlist.",
        preheader: `New early-access signup from ${email}.`,
        body: `<table cellpadding="0" cellspacing="0" role="presentation" style="margin-top:16px">
            ${BULLET(`Email: <strong style="color:${INK}">${esc(email)}</strong>`)}
            ${BULLET(`Source: ${esc(r.source ?? "landing")}`)}
            ${BULLET(`Time: ${esc(sentAt)}`)}
          </table>
          <tr><td style="padding-top:20px;font-size:14px;line-height:1.7;color:${MUTED}">
            Their auto-reply has already gone out. Reply to this email to reach them.
          </td></tr>`,
        text: `New wishlist signup.\n\nEmail: ${email}\nSource: ${String(r.source ?? "landing")}\nTime: ${sentAt}`,
      },
    );
  } else if (table === "contact_messages") {
    messages.push(
      {
        from,
        to: email,
        subject: "We've got your message",
        preheader: "Thanks for writing — a real person reads every message.",
        heading: "Thanks — we've got it.",
        body: `<tr><td style="padding-top:14px;font-size:15px;line-height:1.7;color:${MUTED}">
            Your message is with us and a real person reads every one — expect a reply
            within 24 hours.
          </td></tr>
          ${quote(r.message)}
          <tr><td style="padding-top:20px;font-size:14px;line-height:1.7;color:${MUTED}">
            Need to add something? Just reply to this email and it lands in the same thread.
          </td></tr>`,
        text: `Thanks — we've got it.

Your message is with us and a real person reads every one. Expect a reply within 24 hours.

---
${String(r.message ?? "")}
---

Need to add something? Reply directly to this email.`,
      },
      {
        from,
        to: OWNER_EMAIL,
        subject: `Contact form: ${String(r.name ?? email)}`,
        reply_to: email,
        heading: "New message from the site.",
        preheader: `${String(r.name ?? "Someone")} wrote in.`,
        body: `<table cellpadding="0" cellspacing="0" role="presentation" style="margin-top:16px">
            ${BULLET(`Name: <strong style="color:${INK}">${esc(r.name)}</strong>`)}
            ${BULLET(`Email: <strong style="color:${INK}">${esc(email)}</strong>`)}
            ${BULLET(`Time: ${esc(sentAt)}`)}
          </table>
          ${quote(r.message)}
          <tr><td style="padding-top:20px;font-size:14px;line-height:1.7;color:${MUTED}">
            Replying to this email answers them directly.
          </td></tr>`,
        text: `New contact message.\n\nName: ${String(r.name ?? "")}\nEmail: ${email}\nTime: ${sentAt}\n\n${String(r.message ?? "")}`,
      },
    );
  } else {
    return new Response("unhandled table", { status: 200 });
  }

  const results = await Promise.allSettled(messages.map((m) => sendEmail(m, apiKey)));
  const failed = results.filter((x) => x.status === "rejected" || x.value === false).length;
  return new Response(JSON.stringify({ sent: results.length - failed, failed }), {
    status: failed === results.length ? 502 : 200,
    headers: { "Content-Type": "application/json" },
  });
});
