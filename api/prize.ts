export const config = { runtime: "edge" };

export default async function handler() {
  const url = "https://script.google.com/macros/s/AKfycbwGSfkaGZ5pktJE6WQlxGQQvOyFyi_KziCQFV6saj7Wt6Wgb1SyCOytTGS30m2UZKmw/exec?key=p001_prize_m8y3nz5w";
  try {
    const res = await fetch(url, { redirect: "follow" });
    const data = await res.text();
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return new Response(JSON.stringify({ status: "error", message: "Upstream error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
