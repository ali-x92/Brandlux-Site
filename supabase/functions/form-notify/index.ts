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
  html: string;
  reply_to?: string;
}

const SITE = "https://getbrandlux.com";
const OWNER_EMAIL = "hello@getbrandlux.com";

function esc(value: unknown): string {
  const s = String(value ?? "");
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(heading: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;background:#fffbf3;padding:32px 16px;font-family:'Plus Jakarta Sans',Segoe UI,Helvetica,Arial,sans-serif;color:#3b3450">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;padding:36px 32px;max-width:560px">
      <tr><td style="font-size:20px;font-weight:800;color:#833af0;letter-spacing:-0.3px">BrandLux</td></tr>
      <tr><td style="padding-top:18px;font-size:19px;font-weight:700;line-height:1.35">${esc(heading)}</td></tr>
      <tr><td style="padding-top:12px;font-size:15px;line-height:1.65;color:#5d5673">${body}</td></tr>
      <tr><td style="padding-top:28px;font-size:12px;color:#9a93ad;border-top:1px solid #efeaf4">
        <a href="${SITE}" style="color:#833af0;text-decoration:none">${SITE.replace("https://", "")}</a>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}

async function sendEmail(msg: EmailRequest, apiKey: string): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: msg.from,
      to: msg.to,
      subject: msg.subject,
      html: msg.html,
      reply_to: msg.reply_to,
    }),
  });
  if (!res.ok) console.error("resend error", res.status, await res.text());
  return res.ok;
}

Deno.serve(async (req) => {
  const payload = await req.json().catch(() => null) as WebhookPayload | null;
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
  const table = String(payload.table ?? "").split(".").pop();
  const email = String(r.email ?? "").toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return new Response("bad email", { status: 200 });

  const messages: EmailRequest[] = [];

  if (table === "wishlist_signups") {
    messages.push(
      {
        from,
        to: email,
        subject: "You're on the BrandLux wishlist",
        html: shell(
          "You're on the list.",
          `Thanks for joining the BrandLux wishlist — we'll email <strong>${esc(email)}</strong> the moment early access opens.<br><br>
           BrandLux is one AI workspace for your whole brand: logo, website, print, packaging, social content and marketing copy.<br><br>
           <a href="${SITE}" style="color:#833af0;font-weight:700">Explore BrandLux &rarr;</a>`,
        ),
      },
      {
        from,
        to: OWNER_EMAIL,
        subject: `New wishlist signup: ${email}`,
        reply_to: email,
        html: shell("New wishlist signup", `Email: <strong>${esc(email)}</strong><br>Source: ${esc(r.source ?? "landing")}<br>Time: ${esc(r.created_at ?? new Date().toISOString())}<br>Total signups keep accruing in the wishlist_signups table.`),
      },
    );
  } else if (table === "contact_messages") {
    messages.push(
      {
        from,
        to: email,
        subject: "We got your message",
        html: shell(
          "Thanks for reaching out.",
          `We received your message and we reply to every one — usually within 24 hours.<br><br>
           Here's what you sent:<br><blockquote style="margin:16px 0;padding:14px 16px;background:#f8f4fb;border-left:3px solid #833af0;border-radius:0 10px 10px 0;font-size:14px">${esc(r.message)}</blockquote>
           Need a faster answer? Reply directly to this email.`,
        ),
      },
      {
        from,
        to: OWNER_EMAIL,
        subject: `Contact form: ${r.name} (${email})`,
        reply_to: email,
        html: shell("New contact message", `Name: <strong>${esc(r.name)}</strong><br>Email: <strong>${esc(email)}</strong><br>Time: ${esc(r.created_at ?? new Date().toISOString())}<br><br><blockquote style="margin:16px 0;padding:14px 16px;background:#f8f4fb;border-left:3px solid #833af0;border-radius:0 10px 10px 0;font-size:14px">${esc(r.message)}</blockquote>Replying to this email answers them directly.`),
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
