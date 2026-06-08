// Aurora AI chat — proxies to OpenAI. Key kept ONLY in edge env, never frontend.
// MVP scope: chat/voice booking, support, ride status, sjåfør-assist.
// No Spotify/calendar/history integration in v1.

import { handleCors, jsonResponse } from "../_shared/cors.ts";
import { authedUserId } from "../_shared/supabase.ts";

const SYSTEM = `Du er Aurora, KJAPP sin AI-assistent. Du er på norsk (bokmål).
Du hjelper med taxi-booking, support, ride-status og enkle praktiske svar.
Vær varm, presis, kort. Ikke gjett — spør om nødvendig.
Du har IKKE tilgang til kalender, Spotify, eller bruker-historikk.
Hvis bruker spør om noe utenfor scope, foreslå å kontakte support.`;

type Message = { role: "system" | "user" | "assistant"; content: string };

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const userId = await authedUserId(req);
    if (!userId) return jsonResponse({ error: "unauthorized" }, 401);

    const { messages, mode } = (await req.json()) as {
      messages: Message[];
      mode?: "customer" | "driver";
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return jsonResponse({ error: "messages required" }, 400);
    }

    const sys = mode === "driver"
      ? SYSTEM + " Du snakker nå med en sjåfør i tjeneste."
      : SYSTEM;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: sys }, ...messages.slice(-12)],
        temperature: 0.6,
        max_tokens: 400,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return jsonResponse({ error: "openai_error", detail: text }, 502);
    }
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return jsonResponse({ reply });
  } catch (e) {
    return jsonResponse({ error: (e as Error).message }, 500);
  }
});
