import { NextResponse } from "next/server";

// Live market data with graceful fallbacks. No API key required for the default sources.
// To plug in a premium provider later, read process.env.MARKET_API_KEY here and swap the URLs.

const FALLBACK = {
  usdInr: 83.5,
  gold24kPer10g: 73000,
  nifty: 24100,
  sensex: 79300,
};

const OZ_TO_GRAM = 31.1035;

async function safeJson(url: string, opts?: RequestInit) {
  try {
    const res = await fetch(url, { ...opts, next: { revalidate: 300 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function GET() {
  // 1) FX rates (USD base) — open.er-api.com is free, no key.
  const fxData = await safeJson("https://open.er-api.com/v6/latest/USD");
  const rates: Record<string, number> =
    fxData && fxData.result === "success" && fxData.rates ? fxData.rates : {};
  const fxLive = Object.keys(rates).length > 0;
  const usdInr = rates.INR || FALLBACK.usdInr;

  // 2) Gold spot (USD / troy ounce) — gold-api.com is free, no key.
  const goldData = await safeJson("https://api.gold-api.com/price/XAU");
  let gold24kPer10g = FALLBACK.gold24kPer10g;
  let goldLive = false;
  if (goldData && typeof goldData.price === "number") {
    gold24kPer10g = Math.round((goldData.price / OZ_TO_GRAM) * 10 * usdInr);
    goldLive = true;
  }

  // 3) NIFTY 50 & SENSEX — Yahoo Finance public chart endpoint (best-effort).
  async function yahoo(symbol: string): Promise<number | null> {
    const data = await safeJson(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    return typeof price === "number" ? price : null;
  }
  const niftyVal = await yahoo("^NSEI");
  const sensexVal = await yahoo("^BSESN");

  return NextResponse.json(
    {
      updatedAt: new Date().toISOString(),
      fx: { base: "USD", rates, live: fxLive, usdInr },
      gold: {
        per10g24k: gold24kPer10g,
        per10g22k: Math.round((gold24kPer10g * 22) / 24),
        live: goldLive,
      },
      nifty: { value: niftyVal ?? FALLBACK.nifty, live: niftyVal !== null },
      sensex: { value: sensexVal ?? FALLBACK.sensex, live: sensexVal !== null },
    },
    { headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" } }
  );
}
