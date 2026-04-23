"use client";
import { useState } from "react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";

const NAVY = "#0f2d5e";
const GREEN = "#2ecc71";

export default function CalculatorPage() {
  const [form, setForm] = useState({ revenue: "", profit: "", prevRevenue: "", assets: "", liabilities: "", cash: "" });

  const r = Number(form.revenue) || 0;
  const p = Number(form.profit) || 0;
  const pr = Number(form.prevRevenue) || 0;
  const a = Number(form.assets) || 0;
  const l = Number(form.liabilities) || 0;
  const c = Number(form.cash) || 0;

  const profitMargin = r > 0 ? (p / r) * 100 : 0;
  const roa = a > 0 ? (p / a) * 100 : 0;
  const debtRatio = a > 0 ? (l / a) : 0;
  const cashRatio = l > 0 ? (c / l) : 0;
  const growth = pr > 0 ? ((r - pr) / pr) * 100 : 0;

  const score = r > 0 ? Math.min(100, Math.round(
    (profitMargin > 10 ? 20 : profitMargin > 5 ? 12 : 6) +
    (roa > 8 ? 20 : roa > 4 ? 12 : 6) +
    (debtRatio < 0.5 ? 20 : debtRatio < 0.7 ? 12 : 6) +
    (cashRatio > 1.5 ? 20 : cashRatio > 1 ? 14 : 6) +
    (growth > 20 ? 20 : growth > 10 ? 14 : growth > 0 ? 10 : 4)
  )) : 0;

  const metrics = [
    { label: "Profit Margin", value: r > 0 ? profitMargin : null, display: r > 0 ? `${profitMargin.toFixed(1)}%` : "—", good: profitMargin > 10, hint: "Benchmark: > 10%" },
    { label: "Return on Assets", value: r > 0 ? roa : null, display: r > 0 ? `${roa.toFixed(1)}%` : "—", good: roa > 8, hint: "Benchmark: > 8%" },
    { label: "Debt / Assets Ratio", value: r > 0 ? debtRatio : null, display: r > 0 ? debtRatio.toFixed(2) : "—", good: debtRatio < 0.6, hint: "Safe: < 0.60" },
    { label: "Cash Liquidity Ratio", value: r > 0 ? cashRatio : null, display: r > 0 ? `${cashRatio.toFixed(2)}x` : "—", good: cashRatio > 1, hint: "Safe: > 1.0x" },
    { label: "YoY Revenue Growth", value: r > 0 && pr > 0 ? growth : null, display: r > 0 && pr > 0 ? `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%` : "—", good: growth > 15, hint: "Strong: > 15%" },
  ];

  const barData = r > 0 ? [
    { name: "Profit Margin", yours: parseFloat(profitMargin.toFixed(1)), benchmark: 10 },
    { name: "ROA", yours: parseFloat(roa.toFixed(1)), benchmark: 8 },
    { name: "YoY Growth", yours: pr > 0 ? parseFloat(growth.toFixed(1)) : 0, benchmark: 15 },
  ] : [];

  const radarData = r > 0 ? [
    { subject: "Profitability", A: Math.min(100, Math.max(0, profitMargin * 4)), fullMark: 100 },
    { subject: "Assets", A: Math.min(100, Math.max(0, roa * 6)), fullMark: 100 },
    { subject: "Debt Safety", A: Math.min(100, Math.max(0, (1 - debtRatio) * 100)), fullMark: 100 },
    { subject: "Liquidity", A: Math.min(100, Math.max(0, cashRatio * 50)), fullMark: 100 },
    { subject: "Growth", A: pr > 0 ? Math.min(100, Math.max(0, growth * 3)) : 0, fullMark: 100 },
  ] : [];

  const scoreColor = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* NAV */}
      <nav style={{ background: NAVY, padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${GREEN}, #27ae60)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#fff" }}>B</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>BizzBuddy</span>
        </Link>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/auth/login" style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, textDecoration: "none" }}>Login</Link>
          <Link href="/auth/register" style={{ background: GREEN, color: "#fff", padding: "9px 20px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Register Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, padding: "48px 5%", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(46,204,113,0.15)", border: "1px solid rgba(46,204,113,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 16, fontSize: 13, color: GREEN, fontWeight: 600 }}>FREE TOOL — No Sign-up Required</div>
        <h1 style={{ fontSize: 38, fontWeight: 900, color: "#fff", marginBottom: 12, lineHeight: 1.2 }}>Financial Health Check</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>Enter your business financials and get an instant health score, ratios, and loan eligibility estimate</p>
      </section>

      <section style={{ padding: "40px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "380px 1fr", gap: 32 }}>

          {/* INPUT FORM */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", height: "fit-content" }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Enter Your Financials</h2>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>Results update live as you type</p>
            {[
              ["revenue", "Annual Revenue (₹)", "e.g. 10000000 (1 Crore)"],
              ["profit", "Net Profit (₹)", "e.g. 1500000 (15 Lakhs)"],
              ["prevRevenue", "Previous Year Revenue (₹)", "For YoY growth calculation"],
              ["assets", "Total Assets (₹)", "e.g. 8000000"],
              ["liabilities", "Total Liabilities (₹)", "e.g. 4000000"],
              ["cash", "Cash & Bank Balance (₹)", "e.g. 1200000"],
            ].map(([name, label, hint]) => (
              <div key={name} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
                <input type="number" placeholder={hint} value={(form as any)[name]}
                  onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
                  style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                  onFocus={e => e.target.style.borderColor = "#3b82f6"}
                  onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                {name === "revenue" && r > 0 && <div style={{ fontSize: 12, color: GREEN, marginTop: 3, fontWeight: 600 }}>= ₹{(r / 100000).toFixed(1)} Lakhs</div>}
              </div>
            ))}
            <div style={{ padding: 14, background: "#f0fdf4", borderRadius: 10, border: "1px solid #bbf7d0", fontSize: 13, color: "#166534" }}>
              💡 All values in Indian Rupees. Enter without commas.
            </div>
          </div>

          {/* RESULTS */}
          <div>
            {/* Health Score + Gauge */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", marginBottom: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Financial Health Score</div>
                  <div style={{ fontSize: 80, fontWeight: 900, color: r > 0 ? scoreColor : "#94a3b8", lineHeight: 1 }}>{r > 0 ? score : "—"}</div>
                  <div style={{ fontSize: 13, color: "#64748b", margin: "8px 0" }}>
                    {r > 0 ? (score >= 80 ? "✅ Excellent — High Loan Eligibility" : score >= 60 ? "⚠️ Good — Moderate Eligibility" : "🔴 Needs Improvement") : "Enter your financials to get started"}
                  </div>
                  <div style={{ height: 12, background: "#e2e8f0", borderRadius: 6, overflow: "hidden", marginTop: 12 }}>
                    <div style={{ height: "100%", width: `${r > 0 ? score : 0}%`, background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}cc)`, borderRadius: 6, transition: "width 0.8s ease" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94a3b8", marginTop: 4 }}>
                    <span>Poor</span><span>Average</span><span>Good</span><span>Excellent</span>
                  </div>
                </div>
                {r > 0 && (
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 12 }}>Estimated Loan Eligibility</div>
                    {[
                      ["Working Capital (CC/OD)", `${(r * 0.25 / 100000).toFixed(0)}L`, "25% of Annual Revenue"],
                      ["Term Loan", a > 0 ? `${(a * 0.5 / 100000).toFixed(0)}L` : "—", "50% of Asset Value"],
                      ["LAP (if secured)", a > 0 ? `${(a * 0.65 / 100000).toFixed(0)}L` : "—", "Up to 65% LTV"],
                    ].map(([type, amount, note]) => (
                      <div key={String(type)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{type}</div>
                          <div style={{ fontSize: 10, color: "#94a3b8" }}>{note}</div>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: GREEN }}>₹{amount}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Metric Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
              {metrics.map(m => (
                <div key={m.label} style={{ background: "#fff", border: `1.5px solid ${m.value !== null ? (m.good ? "#bbf7d0" : "#fecaca") : "#e2e8f0"}`, borderRadius: 14, padding: "14px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: m.value === null ? "#94a3b8" : m.good ? "#10b981" : "#ef4444" }}>{m.display}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 6 }}>{m.hint}</div>
                  {m.value !== null && <div style={{ fontSize: 18, marginTop: 6 }}>{m.good ? "✅" : "⚠️"}</div>}
                </div>
              ))}
            </div>

            {/* Charts */}
            {barData.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Your Metrics vs Benchmark</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} />
                      <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="yours" fill={NAVY} radius={[4, 4, 0, 0]} name="Your Value" />
                      <Bar dataKey="benchmark" fill={GREEN} radius={[4, 4, 0, 0]} name="Benchmark" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 8 }}>Health Radar</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#64748b" }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Health" dataKey="A" stroke={NAVY} fill={NAVY} fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* CTA */}
            <div style={{ background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, borderRadius: 20, padding: 28 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Get Your Full Financial Report</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 0 }}>
                    Register free to download a detailed PDF report with:<br />
                    ✓ Complete ratio analysis &nbsp; ✓ Industry benchmarks &nbsp; ✓ Loan eligibility estimate &nbsp; ✓ Expert recommendations
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
                  <Link href="/auth/register" style={{ display: "block", background: GREEN, color: "#fff", padding: "13px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center", boxShadow: "0 4px 12px rgba(46,204,113,0.4)", whiteSpace: "nowrap" }}>
                    Register & Download PDF →
                  </Link>
                  <Link href="/auth/login" style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 12, textDecoration: "none", textAlign: "center" }}>
                    Already registered? Login →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "48px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, textAlign: "center", marginBottom: 32 }}>How BizzBuddy Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[["1", "Check Your Health", "Enter your financials and get instant score, ratios, and loan eligibility — free.", "#eff6ff"],
              ["2", "Apply for Funding", "Choose debt or equity, fill our smart form, and get matched to the right lender in hours.", "#f0fdf4"],
              ["3", "Get Funded", "Our channel partners process your application end-to-end with bank support.", "#fdf4ff"]].map(([step, title, desc, bg]) => (
              <div key={step} style={{ background: bg, borderRadius: 16, padding: 24 }}>
                <div style={{ width: 36, height: 36, background: NAVY, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, marginBottom: 14 }}>{step}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
