export const config = { runtime: "edge" };

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxGWiBIeJoMD-IPuvc7YqMsqBq8bKEgtjLVp396Sl_BTIvYPsgk5UUrhMZqE3ijSt_kPw/exec";
const API_KEY = "p001_careers_z5m8kx3q";

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ status: "error", message: "Method not allowed" }), { status: 405 });
  }
  try {
    const body = await req.json();
    const upstream = await fetch(`${SCRIPT_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });
    const data = await upstream.text();
    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch {
    return new Response(JSON.stringify({ status: "error", message: "Upstream error" }), { status: 500 });
  }
}
