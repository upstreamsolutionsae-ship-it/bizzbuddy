"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Speedometer, { bucketOf } from "@/components/Speedometer";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

const FOOTER_CONTACT = {
  address: "305, 3rd Floor, Suneja Tower 1, Janakpuri District Center, Janakpuri West, New Delhi 110078",
  phones: ["+91 9910850208", "+91 9899630125"],
  email: "sdmfintechconsultants@gmail.com",
};

export default function FinancialHealthCheckPage() {
  const [form, setForm] = useState({ revenue: "", profit: "", prevRevenue: "", assets: "", liabilities: "", cash: "" });
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" });
  const [leadSent, setLeadSent] = useState(false);

  const r = Number(form.revenue) || 0;
  const p = Number(form.profit) || 0;
  const pr = Number(form.prevRevenue) || 0;
  const a = Number(form.assets) || 0;
  const l = Number(form.liabilities) || 0;
  const c = Number(form.cash) || 0;

  const profitMargin = r > 0 ? (p / r) * 100 : 0;
  const roa = a > 0 ? (p / a) * 100 : 0;
  const debtRatio = a > 0 ? l / a : 0;
  const cashRatio = l > 0 ? c / l : 0;
  const growth = pr > 0 ? ((r - pr) / pr) * 100 : 0;

  const score =
    r > 0
      ? Math.min(
          100,
          Math.round(
            (profitMargin > 10 ? 20 : profitMargin > 5 ? 12 : 6) +
              (roa > 8 ? 20 : roa > 4 ? 12 : 6) +
              (debtRatio < 0.5 ? 20 : debtRatio < 0.7 ? 12 : 6) +
              (cashRatio > 1.5 ? 20 : cashRatio > 1 ? 14 : 6) +
              (growth > 20 ? 20 : growth > 10 ? 14 : growth > 0 ? 10 : 4)
          )
        )
      : 0;

  const scoreColor = score >= 75 ? "#15803d" : score >= 50 ? "#b45309" : "#dc2626";
  const scoreLabel = score >= 75 ? "Strong" : score >= 50 ? "Moderate" : score > 0 ? "Needs Improvement" : "—";

  const metrics = [
    { label: "Profit Margin", value: r > 0 ? profitMargin : null, display: r > 0 ? `${profitMargin.toFixed(1)}%` : "—", good: profitMargin > 10, hint: "Benchmark: > 10%" },
    { label: "Return on Assets", value: r > 0 ? roa : null, display: r > 0 ? `${roa.toFixed(1)}%` : "—", good: roa > 8, hint: "Benchmark: > 8%" },
    { label: "Debt / Assets Ratio", value: r > 0 ? debtRatio : null, display: r > 0 ? debtRatio.toFixed(2) : "—", good: debtRatio < 0.6, hint: "Safe: < 0.60" },
    { label: "Cash Liquidity Ratio", value: r > 0 ? cashRatio : null, display: r > 0 ? `${cashRatio.toFixed(2)}x` : "—", good: cashRatio > 1, hint: "Safe: > 1.0x" },
    { label: "YoY Revenue Growth", value: r > 0 && pr > 0 ? growth : null, display: r > 0 && pr > 0 ? `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%` : "—", good: growth > 15, hint: "Strong: > 15%" },
  ];

  // Normalised 0–100 scores for the speedometers (3 equal buckets: Low / Medium / High)
  const clamp = (n: number) => Math.min(100, Math.max(0, n));
  const gauges =
    r > 0
      ? [
          {
            key: "growth",
            label: "Growth",
            score: pr > 0 ? clamp(growth * 2.5) : 0,
            display: pr > 0 ? `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%` : "—",
            analysis: {
              Low: "Revenue growth is slow or flat. Focus on new customers, pricing and expanding your sales channels to grow your top line.",
              Medium: "You are growing steadily. Keep the momentum with consistent marketing and by retaining existing customers.",
              High: "Excellent growth. Make sure your cash flow and team can keep up with the increasing demand.",
            },
          },
          {
            key: "profitability",
            label: "Profitability",
            score: clamp(profitMargin * 4),
            display: `${profitMargin.toFixed(1)}% margin`,
            analysis: {
              Low: "Your profit margin is thin. Review pricing, cut avoidable costs and drop low-margin products to keep more of every rupee earned.",
              Medium: "Healthy profitability. Small improvements in pricing or cost control can push you into the strong zone.",
              High: "Strong profit margins. You have room to reinvest in growth or build a cash reserve.",
            },
          },
          {
            key: "asset",
            label: "Asset Efficiency",
            score: clamp(roa * 6),
            display: `${roa.toFixed(1)}% ROA`,
            analysis: {
              Low: "Your assets are not generating enough profit. Use idle assets better or reduce capital tied up in slow-moving stock.",
              Medium: "Reasonable use of assets. Improving sales without adding assets will lift this further.",
              High: "You are generating strong returns from your assets — a sign of an efficient business.",
            },
          },
          {
            key: "debt",
            label: "Debt Safety",
            score: clamp((1 - debtRatio) * 100),
            display: `Debt/Assets ${debtRatio.toFixed(2)}`,
            analysis: {
              Low: "Debt is high relative to your assets. Avoid fresh borrowing and prioritise repaying existing loans to lower risk.",
              Medium: "Your debt level is manageable. Keep an eye on it before taking on major new loans.",
              High: "Low debt and a strong balance sheet. You have comfortable capacity to borrow for growth if needed.",
            },
          },
          {
            key: "liquidity",
            label: "Liquidity",
            score: clamp(cashRatio * 50),
            display: `${cashRatio.toFixed(2)}x cover`,
            analysis: {
              Low: "Cash is tight against your obligations. Build a buffer and speed up collections to avoid cash-flow stress.",
              Medium: "You have adequate cash cover. Maintain a steady reserve for unexpected expenses.",
              High: "Strong liquidity. You can meet short-term obligations comfortably and handle surprises.",
            },
          },
        ]
      : [];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...leadForm, category: "Financial Health Check", loanType: "Financial Advisory / Health Check", source: "health-check-page", score }),
    });
    setLeadSent(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />

      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/our-services" style={{ color: BLUE, textDecoration: "none" }}>Our Services</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Free Financial Health Check</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "56px 5%", textAlign: "center" }}>
        <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Free Financial Health Check</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, maxWidth: 600, margin: "0 auto" }}>
          AI-powered analysis of your business financials. Get instant insights on profitability, debt, liquidity, and growth — completely free.
        </p>
      </section>

      {/* Form + Results */}
      <section style={{ padding: "64px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 40, alignItems: "start" }}>
            {/* Input form */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 36, border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 6 }}>Enter Your Financials</h2>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>Enter figures in ₹ Lakhs (e.g. 50 for ₹50 Lakhs)</p>

              {[
                { key: "revenue", label: "Annual Revenue (₹ L)", placeholder: "e.g. 120" },
                { key: "profit", label: "Net Profit (₹ L)", placeholder: "e.g. 18" },
                { key: "prevRevenue", label: "Previous Year Revenue (₹ L)", placeholder: "e.g. 95" },
                { key: "assets", label: "Total Assets (₹ L)", placeholder: "e.g. 200" },
                { key: "liabilities", label: "Total Debt (₹ L)", placeholder: "e.g. 90" },
                { key: "cash", label: "Cash & Bank Balance (₹ L)", placeholder: "e.g. 25" },
              ].map(({ key, label, placeholder }) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
                  <input
                    type="number"
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => (e.target.style.borderColor = BLUE)}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>
              ))}
            </div>

            {/* Results */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Score */}
              <div style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid #e2e8f0", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 14, color: "#94a3b8", fontWeight: 600, marginBottom: 8 }}>OVERALL HEALTH SCORE</div>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: r > 0 ? `conic-gradient(${scoreColor} 0% ${score}%, #e2e8f0 ${score}% 100%)` : "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    position: "relative",
                  }}
                >
                  <div style={{ width: 88, height: 88, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <span style={{ fontSize: 28, fontWeight: 900, color: r > 0 ? scoreColor : "#e2e8f0" }}>{r > 0 ? score : "—"}</span>
                    <span style={{ fontSize: 9, color: "#94a3b8" }}>/100</span>
                  </div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: r > 0 ? scoreColor : "#94a3b8" }}>{scoreLabel}</div>
              </div>

              {/* Metrics */}
              <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Key Metrics</h3>
                {metrics.map((m) => (
                  <div key={m.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid #f1f5f9" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>{m.hint}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: NAVY }}>{m.display}</span>
                      {m.value !== null && (
                        <span style={{ fontSize: 16 }}>{m.good ? "✅" : "⚠️"}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Speedometers */}
              {r > 0 && gauges.length > 0 && (
                <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #e2e8f0" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Your Business Health Meters</h3>
                  <p style={{ fontSize: 12.5, color: "#64748b", marginBottom: 18 }}>Each meter has 3 zones — Low, Medium, High.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 18 }}>
                    {gauges.map((g) => (
                      <Speedometer key={g.key} label={g.label} value={g.score} display={g.display} />
                    ))}
                  </div>
                </div>
              )}

              {/* Per-parameter expert analysis */}
              {r > 0 && gauges.length > 0 && (
                <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #e2e8f0" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 16 }}>Expert Analysis — In Simple Words</h3>
                  {gauges.map((g) => {
                    const b = bucketOf(g.score);
                    const dot = b === "High" ? "#16a34a" : b === "Medium" ? "#f59e0b" : "#ef4444";
                    return (
                      <div key={g.key} style={{ display: "flex", gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #f1f5f9" }}>
                        <span style={{ width: 10, height: 10, borderRadius: "50%", background: dot, flexShrink: 0, marginTop: 5 }} />
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: 700, color: NAVY, marginBottom: 3 }}>
                            {g.label} — <span style={{ color: dot }}>{b}</span>
                          </div>
                          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.65, margin: 0 }}>{g.analysis[b]}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Expert Analysis CTA — prominent */}
              {r > 0 && (
                <div style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, borderRadius: 20, padding: 32, boxShadow: "0 12px 36px rgba(21,101,192,0.28)", color: "#fff" }}>
                  <span style={{ display: "inline-block", background: "rgba(255,255,255,0.18)", color: "#fff", padding: "4px 14px", borderRadius: 20, fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 12, border: "1px solid rgba(255,255,255,0.25)" }}>
                    👨‍💼 FREE EXPERT ANALYSIS
                  </span>
                  <h3 style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 8 }}>Talk to a Financial Expert</h3>
                  <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.85)", marginBottom: 20, lineHeight: 1.6 }}>
                    Our advisor will personally review your numbers and give you a tailored action plan to improve each parameter above.
                  </p>
                  {leadSent ? (
                    <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "16px 18px", color: "#fff", fontWeight: 700, fontSize: 15 }}>✅ Request received! Our expert will contact you within 2 working hours.</div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <input placeholder="Your Name *" required value={leadForm.name} onChange={(e) => setLeadForm((p) => ({ ...p, name: e.target.value }))} style={{ flex: 1, minWidth: 150, padding: "13px 16px", border: "none", borderRadius: 10, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }} />
                      <input type="tel" inputMode="numeric" maxLength={10} placeholder="Mobile *" required value={leadForm.phone} onChange={(e) => setLeadForm((p) => ({ ...p, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} style={{ flex: 1, minWidth: 130, padding: "13px 16px", border: "none", borderRadius: 10, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }} />
                      <button type="submit" style={{ background: "#fff", color: NAVY, padding: "13px 26px", borderRadius: 10, fontWeight: 800, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>Get Free Advice →</button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.7)", padding: "36px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 6 }}>BizzBuddy</div>
            <div style={{ fontSize: 12 }}>📍 {FOOTER_CONTACT.address}</div>
          </div>
          <div>
            {FOOTER_CONTACT.phones.map((ph) => (<div key={ph} style={{ fontSize: 13, marginBottom: 6 }}>📞 {ph}</div>))}
            <div style={{ fontSize: 13 }}>📧 {FOOTER_CONTACT.email}</div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 24, paddingTop: 16, fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
          © 2025 BizzBuddy by SDM Fintech. All rights reserved.
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          section > div > div[style*="gridTemplateColumns: 1fr 1.5fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
