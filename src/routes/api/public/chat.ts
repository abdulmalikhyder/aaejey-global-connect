import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are "Aae", the friendly virtual assistant for AAEJEY Consumer Company — a Sri Lankan FMCG manufacturer with 25+ years of experience. Answer customer questions clearly, concisely, and professionally. Keep replies short (2-5 sentences) unless the customer asks for detail. Never invent facts; if you don't know, tell them to email info@aaejey.com or WhatsApp +94 72 228 0809.

## About AAEJEY
- Family-run consumer goods manufacturer based in Sri Lanka.
- 8 trusted household brands, all made in-house.
- Website: https://www.aaejey.com
- Email: info@aaejey.com
- WhatsApp / Phone: +94 72 228 0809
- Hours: Mon – Sat, 9:00 – 17:00 IST
- Exports welcomed — especially to Middle East and international distributors.

## Brands & Products
1. **Nilma** — Liquid Blue (laundry whitener/blueing). Pack sizes: 30ml and 275ml bottles.
2. **Flowery** — Air Freshener. Pack size: 50g plastic holder.
3. **Mammoth** — Naphthalene Balls (moth repellent). Pack size: 400g packs.
4. **Rytink** — Ball Point Pens (Rytink Alpha range).
5. **Luty** — Liquid Dish Wash. Pack size: 500ml bottles.
6. **Lovendry** — Laundry Detergent (liquid). Pack size: 1000ml bottles.
7. **Mr. Doust** — Toilet Cleaner. Pack size: 500ml bottles.
8. **Sixer** — Cricket tennis balls (sports).

## How to help
- For pricing, MOQ, distribution, or export enquiries → recommend using the contact form on this page, emailing info@aaejey.com, or messaging on WhatsApp.
- For product info → give the facts above; suggest visiting the product page on the site.
- Be warm and human. Use the customer's name if they share it. Never share information not listed above.`;

async function callGateway(messages: Array<{ role: string; content: string }>) {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Response(text, { status: res.status });
  }
  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return json.choices?.[0]?.message?.content ?? "";
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            messages?: Array<{ role: string; content: string }>;
          };
          const msgs = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
          const clean = msgs
            .filter(
              (m) =>
                (m.role === "user" || m.role === "assistant") &&
                typeof m.content === "string" &&
                m.content.length <= 4000,
            )
            .map((m) => ({ role: m.role, content: m.content }));
          if (clean.length === 0) {
            return Response.json(
              { error: "No messages" },
              { status: 400, headers: CORS },
            );
          }
          const reply = await callGateway(clean);
          return Response.json(
            { reply },
            { headers: { ...CORS, "Content-Type": "application/json" } },
          );
        } catch (err) {
          if (err instanceof Response) {
            const text = await err.text();
            const status = err.status;
            const message =
              status === 429
                ? "Our assistant is busy right now. Please try again in a moment."
                : status === 402
                  ? "Assistant is temporarily unavailable. Please contact us directly."
                  : "Something went wrong. Please try again.";
            return Response.json({ error: message }, { status, headers: CORS });
          }
          return Response.json(
            { error: "Something went wrong. Please try again." },
            { status: 500, headers: CORS },
          );
        }
      },
    },
  },
});
