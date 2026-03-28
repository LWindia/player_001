export const config = { runtime: "edge" };

export default async function handler() {
  const url = "https://script.google.com/macros/s/AKfycbxzIzU8Qc7g8Gq8jgmGT0OC_UMJI33z9XCBngFcSx9AUOQazLCxycx5Nug9vMzkkGnABw/exec?key=p001_live_k9x2mz7q";
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
