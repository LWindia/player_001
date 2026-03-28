import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiUrl = process.env.VITE_COUNTER_API_URL;
  const apiKey = process.env.VITE_COUNTER_API_KEY;

  if (!apiUrl || !apiKey) {
    return res.status(500).json({ status: "error", message: "Not configured" });
  }

  const key = req.query.key as string;
  if (!key || key !== apiKey) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  try {
    const upstream = await fetch(`${apiUrl}?key=${apiKey}&_=${Date.now()}`, {
      redirect: "follow",
    });
    const data = await upstream.json();
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ status: "error", message: "Upstream error" });
  }
}
