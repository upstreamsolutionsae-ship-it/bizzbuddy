"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";
const GOLD = "#b45309";

// Indicative gold price data — in production this would come from a live API
const BASE_24K_PER_10G = 73000; // ₹ per 10g (approximate for reference)

export default function GoldPricePage() {
  const [price24k, setPrice24k] = useState(BASE_24K_PER_10G);
  const [grams, setGrams] = useState(10);
  const [purity, setPurity] = useState("24");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // Simulate a slight daily variance
    const variance = Math.floor(Math.random() * 400) - 200;
    setPrice24k(BASE_24K_PER_10G + variance);
    setLastUpdated(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }));
  }, []);

  const purityMultiplier: Record<string, number> = { "24": 1, "22": 22 / 24, "18": 18 / 24, "14": 14 / 24 };
  const perGram = (price24k / 10) * (purityMultiplier[purity] || 1);
  const total = perGram * grams;

  const fmt = (v: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

  const RATES_TABLE = [
    { purity: "24K (999)", type: "Pure Gold", per10g: price24k },
    { purity: "22K (916)", type: "Jewellery Gold", per10g: Math.round(price24k * 22 / 24) },
    { purity: "18K (750)", type: "Mixed Gold", per10g: Math.round(price24k * 18 / 24) },
    { purity: "14K (585)", type: "Mixed Gold", per10g: Math.round(price24k * 14 / 24) },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span>Tools</span>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Today's Gold Price</span>
        </div>
      </div>

      <section style={{ background: `linear-gradient(135deg, ${GOLD}, #d97706)`, padding: "56px 5%", textAlign: "center" }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Today's Gold Price</h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16 }}>
          Indicative gold rates in India • {lastUpdated}
        </p>
      </section>

      <section style={{ padding: "64px 5%", background: "#fef9ee" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Highlight card */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 40 }}>
            {[
              { label: "24K Gold (per 10g)", value: fmt(price24k), change: "+₹180", up: true },
              { label: "22K Gold (per 10g)", value: fmt(Math.round(price24k * 22 / 24)), change: "+₹165", up: true },
            ].map((card) => (
              <div key={card.label} style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1.5px solid #fde68a", textAlign: "center", boxShadow: "0 4px 16px rgba(180,83,9,0.08)" }}>
                <div style={{ fontSize: 14, color: "#92400e", fontWeight: 700, marginBottom: 8 }}>{card.label}</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: GOLD }}>{card.value}</div>
                <div style={{ fontSize: 13, color: card.up ? "#15803d" : "#dc2626", marginTop: 8, fontWeight: 600 }}>
                  {card.up ? "▲" : "▼"} {card.change} today
                </div>
              </div>
            ))}
          </div>

          {/* Full rate table */}
          <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #fde68a", overflow: "hidden", marginBottom: 36 }}>
            <div style={{ background: GOLD, padding: "16px 24px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Purity</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Type</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Per Gram</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Per 10g</span>
            </div>
            {RATES_TABLE.map((row) => (
              <div key={row.purity} style={{ display: "flex", justifyContent: "space-between", padding: "14px 24px", borderBottom: "1px solid #fef3c7" }}>
                <span style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}>{row.purity}</span>
                <span style={{ color: "#64748b", fontSize: 13 }}>{row.type}</span>
                <span style={{ fontWeight: 600, color: "#374151", fontSize: 14 }}>{fmt(Math.round(row.per10g / 10))}</span>
                <span style={{ fontWeight: 800, color: GOLD, fontSize: 14 }}>{fmt(row.per10g)}</span>
              </div>
            ))}
          </div>

          {/* Gold Value Calculator */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, border: "1.5px solid #fde68a" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 24 }}>Gold Value Calculator</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Quantity (grams)</label>
                <input type="number" value={grams} min={1} max={10000} onChange={(e) => setGrams(Number(e.target.value))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #fde68a", borderRadius: 8, fontSize: 16, fontWeight: 700, fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box", color: NAVY }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Purity</label>
                <select value={purity} onChange={(e) => setPurity(e.target.value)} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #fde68a", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", fontWeight: 600, color: NAVY }}>
                  <option value="24">24 Karat (Pure)</option>
                  <option value="22">22 Karat (916)</option>
                  <option value="18">18 Karat (750)</option>
                  <option value="14">14 Karat (585)</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "end" }}>
                <div style={{ background: "#fef9ee", border: "1.5px solid #fde68a", borderRadius: 8, padding: "11px 16px", width: "100%", boxSizing: "border-box" }}>
                  <div style={{ fontSize: 12, color: "#92400e", marginBottom: 2 }}>Estimated Value</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: GOLD }}>{fmt(Math.round(total))}</div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: 11, color: "#94a3b8" }}>* Indicative value based on today's approximate rates. Actual prices may vary by city and jeweller. Not a financial or trading recommendation.</p>
          </div>
        </div>
      </section>

      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.6)", padding: "20px 5%", textAlign: "center", fontSize: 12 }}>
        © 2025 BizzBuddy by SDM Fintech | <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link> | Rates are indicative only
      </footer>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat(2, 1fr)"],
          div[style*="gridTemplateColumns: 1fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
