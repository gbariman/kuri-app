export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: "API ključ ni nastavljen." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Napaka pri branju zahteve." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8192,
      stream: true,
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }],
      system: body.system,
      messages: body.messages
    })
  });

  if (!response.ok) {
    const data = await response.json();
    return new Response(JSON.stringify({ error: data.error?.message || "Napaka pri generiranju." }), {
      status: response.status,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache"
    }
  });
};
