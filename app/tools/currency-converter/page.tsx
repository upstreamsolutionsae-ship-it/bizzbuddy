"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

// Static rates relative to USD (approximate; in production these would come from a live API)
const RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.5, AED: 3.67,
  SGD: 1.34, CAD: 1.36, AUD: 1.53, JPY: 149.5, CHF: 0.89,
  CNY: 7.24, HKD: 7.82, MYR: 4.72, THB: 35.2, SAR: 3.75,
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", INR: "Indian Rupee",
  AED: "UAE Dirham", SGD: "Singapore Dollar", CAD: "Canadian Dollar",
  AUD: "Australian Dollar", JPY: "Japanese Yen", CHF: "Swiss Franc",
  CNY: "Chinese Yuan", HKD: "Hong Kong Dollar", MYR: "Malaysian Ringgit",
  THB: "Thai Baht", SAR: "Saudi Riyal",
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const a = parseFloat(amount);
    if (!isNaN(a) && RATES[from] && RATES[to]) {
      setResult((a / RATES[from]) * RATES[to]);
    } else {
      setResult(null);
    }
  }, [amount, from, to]);

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span>Tools</span>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Currency Converter</span>
        </div>
      </div>

      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "56px 5%", textAlign: "center" }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Currency Converter</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16 }}>Live indicative exchange rates</p>
      </section>

      <section style={{ padding: "64px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 40, border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 22, fontWeight: 700, fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box", color: NAVY }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "end", marginBottom: 28 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>From</label>
                <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "'Inter', sans-serif", color: NAVY, fontWeight: 600 }}>
                  {Object.keys(RATES).map((c) => <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>)}
                </select>
              </div>
              <button onClick={swap} style={{ width: 44, height: 44, borderRadius: "50%", background: NAVY, color: "#fff", border: "none", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>⇄</button>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>To</label>
                <select value={to} onChange={(e) => setTo(e.target.value)} style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "'Inter', sans-serif", color: NAVY, fontWeight: 600 }}>
                  {Object.keys(RATES).map((c) => <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>)}
                </select>
              </div>
            </div>

            {result !== null && (
              <div style={{ background: "#eff6ff", borderRadius: 16, padding: 28, textAlign: "center", border: "1.5px solid #bfdbfe" }}>
                <div style={{ fontSize: 13, color: "#64748b", marginBottom: 6 }}>{amount} {from} =</div>
                <div style={{ fontSize: 40, fontWeight: 900, color: NAVY }}>
                  {result.toLocaleString("en-IN", { maximumFractionDigits: 2 })} {to}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 10 }}>
                  1 {from} = {(RATES[to] / RATES[from]).toFixed(4)} {to} • Indicative rate, not a financial quote
                </div>
              </div>
            )}
          </div>

          {/* Quick reference */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", marginTop: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Common Rates vs INR</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["USD", "EUR", "GBP", "AED", "SGD", "JPY"].map((c) => (
                <div key={c} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#f8fafc", borderRadius: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>1 {c}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>₹{(RATES.INR / RATES[c]).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.6)", padding: "20px 5%", textAlign: "center", fontSize: 12 }}>
        © 2025 BizzBuddy by SDM Fintech | <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link> | Rates are indicative only
      </footer>
    </div>
  );
}
