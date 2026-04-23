"use client";
import { useState } from "react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const NAVY = "#0f2d5e";
const GREEN = "#2ecc71";

const STEPS_DEBT = ["Funding Details", "Security", "Debt Type", "End Use", "Review"];

const statusColor: Record<string, string> = {
  "New": "#94a3b8", "In Process": "#f59e0b", "Approved": "#3b82f6", "Disbursed": "#10b981", "Rejected": "#ef4444"
};

const input = (extra?: React.CSSProperties): React.CSSProperties => ({
  width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8,
  fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "'Inter', sans-serif",
  background: "#fff", color: "#1e293b", ...extra
});
const label: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 };
const card: React.CSSProperties = { background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" };

export default function SMEDashboard() {
  const [tab, setTab] = useState("overview");
  const [debtStep, setDebtStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [debtForm, setDebtForm] = useState({
    amount: "", source: "Bank", secured: "unsecured", secType: "", secValue: "",
    debtType: "short-term", fundType: "fund-based", endUse: "Expansion", customEndUse: ""
  });

  // Financial Advisory State
  const [advisory, setAdvisory] = useState({
    revenue: "", profit: "", prevRevenue: "", assets: "", liabilities: "", cash: ""
  });
  const r = Number(advisory.revenue) || 0;
  const p = Number(advisory.profit) || 0;
  const pr = Number(advisory.prevRevenue) || 0;
  const a = Number(advisory.assets) || 0;
  const l = Number(advisory.liabilities) || 0;
  const c = Number(advisory.cash) || 0;
  const profitMargin = r > 0 ? (p / r) * 100 : 0;
  const roa = a > 0 ? (p / a) * 100 : 0;
  const debtRatio = a > 0 ? (l / a) : 0;
  const cashRatio = l > 0 ? (c / l) : 0;
  const growth = pr > 0 ? ((r - pr) / pr) * 100 : 0;
  const healthScore = r > 0 ? Math.min(100, Math.round(
    (profitMargin > 10 ? 20 : profitMargin > 5 ? 12 : 6) +
    (roa > 8 ? 20 : roa > 4 ? 12 : 6) +
    (debtRatio < 0.5 ? 20 : debtRatio < 0.7 ? 12 : 6) +
    (cashRatio > 1.5 ? 20 : cashRatio > 1 ? 14 : 6) +
    (growth > 20 ? 20 : growth > 10 ? 14 : growth > 0 ? 10 : 4)
  )) : 0;

  // Lead scoring based on debt form
  const leadScore = debtForm.amount ? Math.min(100, Math.round(
    (Number(debtForm.amount) > 5000000 ? 20 : 10) +
    (debtForm.secured === "secured" ? 25 : 15) +
    (debtForm.debtType === "long-term" ? 20 : 15) +
    (debtForm.source === "Bank" ? 20 : debtForm.source === "Both" ? 18 : 15) +
    (debtForm.endUse === "Expansion" || debtForm.endUse === "Asset Purchase" ? 15 : 10)
  )) : 0;

  // Equity state
  const [equityForm, setEquityForm] = useState({
    revenue: "", ebitda: "", pat: "", stake: "", valuation: "", useOfFunds: ""
  });
  const eqRev = Number(equityForm.revenue) || 0;
  const eqEbitda = Number(equityForm.ebitda) || 0;
  const eqPat = Number(equityForm.pat) || 0;
  const eqVal = Number(equityForm.valuation) || 0;
  const ebitdaMargin = eqRev > 0 ? ((eqEbitda / eqRev) * 100).toFixed(1) : "—";
  const patMargin = eqRev > 0 ? ((eqPat / eqRev) * 100).toFixed(1) : "—";
  const revenueMultiple = eqRev > 0 && eqVal > 0 ? (eqVal / eqRev).toFixed(1) : "—";

  // Profile form
  const [profileForm, setProfileForm] = useState({
    legalName: "ABC Enterprises Pvt. Ltd.", businessName: "ABC Enterprises", industry: "Manufacturing",
    category: "MSME", yearOfIncorporation: "2015", operationsStartDate: "2016-01-01",
    panNumber: "AABCA1234P", gstNumber: "07AABCA1234P1Z5", city: "Delhi", state: "Delhi",
    revenue1: "8500000", ebitda1: "1600000", pat1: "1200000",
    revenue2: "10200000", ebitda2: "1950000", pat2: "1500000",
    revenue3: "12000000", ebitda3: "2400000", pat3: "1800000",
    existingLoans: "2500000", totalAssets: "18000000", totalLiabilities: "7000000", cashBalance: "1500000"
  });

  const apps = [
    { id: "APP001", type: "Working Capital", amount: "₹50 Lakhs", status: "In Process", partner: "Rajesh Kumar (HDFC)", date: "2025-01-10", score: 78 },
    { id: "APP002", type: "Term Loan", amount: "₹1.5 Crore", status: "Approved", partner: "Priya DSA (ICICI)", date: "2024-12-05", score: 85 },
    { id: "APP003", type: "LAP", amount: "₹3 Crore", status: "Disbursed", partner: "Amit Finance", date: "2024-11-20", score: 90 },
  ];

  const barData = r > 0 ? [
    { metric: "Profit Margin", value: parseFloat(profitMargin.toFixed(1)), benchmark: 10 },
    { metric: "ROA", value: parseFloat(roa.toFixed(1)), benchmark: 8 },
    { metric: "Growth %", value: parseFloat(growth.toFixed(1)), benchmark: 15 },
  ] : [];

  const radarData = r > 0 ? [
    { metric: "Profitability", value: Math.min(100, profitMargin * 4), fullMark: 100 },
    { metric: "Assets", value: Math.min(100, roa * 6), fullMark: 100 },
    { metric: "Debt Safety", value: Math.min(100, (1 - debtRatio) * 100), fullMark: 100 },
    { metric: "Liquidity", value: Math.min(100, cashRatio * 50), fullMark: 100 },
    { metric: "Growth", value: Math.min(100, growth * 3), fullMark: 100 },
  ] : [];

  const navItems = [
    ["overview", "📊", "Overview"],
    ["raise-debt", "🏦", "Raise Debt"],
    ["raise-equity", "📈", "Raise Equity"],
    ["advisory", "💡", "Financial Advisory"],
    ["documents", "📁", "Documents"],
    ["profile", "👤", "My Profile"],
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Nav */}
      <nav style={{ background: NAVY, height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>
          Bizz<span style={{ color: GREEN }}>Buddy</span>{" "}
          <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>SME Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Welcome, Rahul 👋</span>
          <Link href="/auth/login" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Logout</Link>
        </div>
      </nav>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: 240, background: NAVY, minHeight: "calc(100vh - 68px)", padding: "24px 0", flexShrink: 0 }}>
          <div style={{ padding: "0 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 8 }}>
            <div style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${GREEN}, #27ae60)`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18, marginBottom: 10 }}>R</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Rahul Kumar</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>ABC Enterprises</div>
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 60, height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3 }}>
                <div style={{ width: "82%", height: "100%", background: GREEN, borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 11, color: GREEN }}>Score: 82</span>
            </div>
          </div>
          {navItems.map(([id, icon, lbl]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 20px", background: tab === id ? "rgba(46,204,113,0.15)" : "transparent", border: "none", borderLeft: tab === id ? `3px solid ${GREEN}` : "3px solid transparent", color: tab === id ? "#fff" : "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: tab === id ? 600 : 400, transition: "all 0.2s" }}>
              <span>{icon}</span>{lbl}
            </button>
          ))}
          <div style={{ padding: "20px", marginTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, textDecoration: "none" }}>← Back to Home</Link>
          </div>
        </div>

        <main style={{ flex: 1, padding: 32, background: "#f8fafc", minHeight: "calc(100vh - 68px)", overflowY: "auto" }}>

          {/* ───── OVERVIEW ───── */}
          {tab === "overview" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Good morning, Rahul! 👋</h1>
              <p style={{ color: "#64748b", marginBottom: 28 }}>Here&apos;s your funding overview</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
                {[
                  { label: "Total Funds Raised", value: "₹4.5 Cr", icon: "💰", color: "#eff6ff", border: "#bfdbfe" },
                  { label: "Active Applications", value: "2", icon: "📋", color: "#f0fdf4", border: "#bbf7d0" },
                  { label: "Lead Score", value: "82/100", icon: "⭐", color: "#fef9ee", border: "#fde68a" },
                  { label: "Partners Assigned", value: "3", icon: "🤝", color: "#fdf4ff", border: "#e9d5ff" },
                ].map(c => (
                  <div key={c.label} style={{ background: c.color, border: `1.5px solid ${c.border}`, borderRadius: 16, padding: 20 }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: NAVY }}>{c.value}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{c.label}</div>
                  </div>
                ))}
              </div>

              {/* Spend Purpose */}
              <div style={{ ...card, marginBottom: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Funds by Purpose</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[["Expansion", "₹2 Cr", "44%"], ["Working Capital", "₹1.5 Cr", "33%"], ["Asset Purchase", "₹1 Cr", "22%"]].map(([purpose, amount, pct]) => (
                    <div key={purpose} style={{ background: "#f8fafc", borderRadius: 10, padding: 14 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{purpose}</div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: GREEN, margin: "4px 0" }}>{amount}</div>
                      <div style={{ height: 5, background: "#e2e8f0", borderRadius: 3 }}>
                        <div style={{ width: pct, height: "100%", background: GREEN, borderRadius: 3 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={card}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 20 }}>Applications</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["ID", "Type", "Amount", "Status", "Partner", "Score", "Date"].map(h => (
                        <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {apps.map(a => (
                      <tr key={a.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px 12px", fontSize: 13, color: "#94a3b8" }}>{a.id}</td>
                        <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 600, color: NAVY }}>{a.type}</td>
                        <td style={{ padding: "12px 12px", fontSize: 13 }}>{a.amount}</td>
                        <td style={{ padding: "12px 12px" }}>
                          <span style={{ background: statusColor[a.status] + "22", color: statusColor[a.status], padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{a.status}</span>
                        </td>
                        <td style={{ padding: "12px 12px", fontSize: 13, color: "#64748b" }}>{a.partner}</td>
                        <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 700, color: GREEN }}>{a.score}</td>
                        <td style={{ padding: "12px 12px", fontSize: 13, color: "#94a3b8" }}>{a.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ───── RAISE DEBT ───── */}
          {tab === "raise-debt" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Raise Debt Funding</h1>
              <p style={{ color: "#64748b", marginBottom: 28 }}>Fill the form to get matched with the best lenders</p>

              {/* Progress Steps */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: 32, overflowX: "auto", gap: 0 }}>
                {STEPS_DEBT.map((s, i) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS_DEBT.length - 1 ? 1 : "unset" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: i < debtStep ? GREEN : i === debtStep ? NAVY : "#e2e8f0", color: i <= debtStep ? "#fff" : "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                        {i < debtStep ? "✓" : i + 1}
                      </div>
                      <span style={{ fontSize: 12, fontWeight: i === debtStep ? 700 : 400, color: i === debtStep ? NAVY : "#94a3b8", whiteSpace: "nowrap" }}>{s}</span>
                    </div>
                    {i < STEPS_DEBT.length - 1 && <div style={{ flex: 1, height: 2, background: i < debtStep ? GREEN : "#e2e8f0", margin: "0 10px" }} />}
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
                <div style={{ ...card }}>
                  {/* Step 0 */}
                  {debtStep === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>Funding Details</h3>
                      <div>
                        <label style={label}>Amount Required (₹) *</label>
                        <input type="number" value={debtForm.amount} onChange={e => setDebtForm(p => ({ ...p, amount: e.target.value }))} placeholder="e.g. 5000000 (50 Lakhs)" style={input()} />
                        {debtForm.amount && <div style={{ marginTop: 6, fontSize: 12, color: GREEN, fontWeight: 600 }}>= ₹{(Number(debtForm.amount) / 100000).toFixed(1)} Lakhs</div>}
                      </div>
                      <div>
                        <label style={label}>Preferred Source</label>
                        <div style={{ display: "flex", gap: 12 }}>
                          {["Bank", "NBFC", "Both"].map(s => (
                            <button key={s} onClick={() => setDebtForm(p => ({ ...p, source: s }))}
                              style={{ flex: 1, padding: "12px 8px", border: debtForm.source === s ? `2px solid ${NAVY}` : "2px solid #e2e8f0", borderRadius: 10, background: debtForm.source === s ? "#eff6ff" : "#f8fafc", fontWeight: 600, fontSize: 13, cursor: "pointer", color: debtForm.source === s ? NAVY : "#64748b", fontFamily: "'Inter', sans-serif", transition: "all 0.2s" }}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 1 */}
                  {debtStep === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>Security Details</h3>
                      <div style={{ display: "flex", gap: 12 }}>
                        {[["secured", "🔒 Secured"], ["unsecured", "🔓 Unsecured"]].map(([v, l]) => (
                          <button key={v} onClick={() => setDebtForm(p => ({ ...p, secured: v }))}
                            style={{ flex: 1, padding: "14px", border: debtForm.secured === v ? `2px solid ${NAVY}` : "2px solid #e2e8f0", borderRadius: 10, background: debtForm.secured === v ? "#eff6ff" : "#f8fafc", fontWeight: 700, fontSize: 14, cursor: "pointer", color: debtForm.secured === v ? NAVY : "#64748b", fontFamily: "'Inter', sans-serif" }}>
                            {l}
                          </button>
                        ))}
                      </div>
                      {debtForm.secured === "secured" && (
                        <>
                          <div>
                            <label style={label}>Type of Security</label>
                            <select value={debtForm.secType} onChange={e => setDebtForm(p => ({ ...p, secType: e.target.value }))} style={{ ...input(), color: debtForm.secType ? "#1e293b" : "#94a3b8" }}>
                              <option value="">Select security type</option>
                              {["Property", "Inventory", "Receivables", "Plant & Machinery", "FD / Gold"].map(o => <option key={o}>{o}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={label}>Estimated Value (₹)</label>
                            <input type="number" value={debtForm.secValue} onChange={e => setDebtForm(p => ({ ...p, secValue: e.target.value }))} placeholder="e.g. 10000000" style={input()} />
                          </div>
                          {debtForm.secValue && <div style={{ padding: 12, background: "#f0fdf4", borderRadius: 8, fontSize: 13, color: "#166534" }}>LTV eligibility (up to 70%): <strong>₹{(Number(debtForm.secValue) * 0.7 / 100000).toFixed(1)} Lakhs</strong></div>}
                        </>
                      )}
                    </div>
                  )}

                  {/* Step 2 */}
                  {debtStep === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>Debt Type</h3>
                      <div>
                        <label style={label}>Tenure</label>
                        <div style={{ display: "flex", gap: 12 }}>
                          {[["short-term", "Short Term\n< 3 Years"], ["long-term", "Long Term\n3+ Years"]].map(([v, l]) => (
                            <button key={v} onClick={() => setDebtForm(p => ({ ...p, debtType: v }))}
                              style={{ flex: 1, padding: "14px", border: debtForm.debtType === v ? `2px solid ${NAVY}` : "2px solid #e2e8f0", borderRadius: 10, background: debtForm.debtType === v ? "#eff6ff" : "#f8fafc", fontSize: 13, fontWeight: 600, cursor: "pointer", color: debtForm.debtType === v ? NAVY : "#64748b", fontFamily: "'Inter', sans-serif", whiteSpace: "pre-line", textAlign: "center" }}>
                              {l}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label style={label}>Credit Facility Type</label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                          {[["fund-based", "Fund Based", "Term Loan, CC, OD, WCDL"], ["non-fund-based", "Non-Fund Based", "LC, BG, Bill Discounting"]].map(([v, title, sub]) => (
                            <button key={v} onClick={() => setDebtForm(p => ({ ...p, fundType: v }))}
                              style={{ padding: "12px", border: debtForm.fundType === v ? `2px solid ${NAVY}` : "2px solid #e2e8f0", borderRadius: 10, background: debtForm.fundType === v ? "#eff6ff" : "#f8fafc", cursor: "pointer", fontFamily: "'Inter', sans-serif", textAlign: "left" }}>
                              <div style={{ fontSize: 13, fontWeight: 700, color: debtForm.fundType === v ? NAVY : "#374151" }}>{title}</div>
                              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>{sub}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {debtStep === 3 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>End Use of Funds</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {["Expansion", "Asset Purchase", "Marketing & Sales", "Working Capital", "Export Finance", "Debt Refinancing", "R&D / Innovation", "Custom"].map(eu => (
                          <button key={eu} onClick={() => setDebtForm(p => ({ ...p, endUse: eu }))}
                            style={{ padding: "12px", border: debtForm.endUse === eu ? `2px solid ${NAVY}` : "2px solid #e2e8f0", borderRadius: 10, background: debtForm.endUse === eu ? "#eff6ff" : "#f8fafc", fontSize: 13, fontWeight: 600, cursor: "pointer", color: debtForm.endUse === eu ? NAVY : "#64748b", fontFamily: "'Inter', sans-serif" }}>
                            {eu}
                          </button>
                        ))}
                      </div>
                      {debtForm.endUse === "Custom" && (
                        <textarea value={debtForm.customEndUse} onChange={e => setDebtForm(p => ({ ...p, customEndUse: e.target.value }))} placeholder="Describe the specific end use of funds..." rows={3}
                          style={{ ...input(), resize: "vertical" }} />
                      )}
                    </div>
                  )}

                  {/* Step 4 — Review */}
                  {debtStep === 4 && !submitted && (
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 20 }}>Review & Submit</h3>
                      {[
                        ["Amount Required", `₹${Number(debtForm.amount).toLocaleString("en-IN")} (₹${(Number(debtForm.amount) / 100000).toFixed(1)} Lakhs)`],
                        ["Preferred Source", debtForm.source],
                        ["Security", debtForm.secured === "secured" ? `${debtForm.secType || "Not specified"} — Est. Value ₹${Number(debtForm.secValue).toLocaleString("en-IN")}` : "Unsecured"],
                        ["Tenure", debtForm.debtType === "short-term" ? "Short Term (< 3 years)" : "Long Term (3+ years)"],
                        ["Credit Facility", debtForm.fundType === "fund-based" ? "Fund Based" : "Non-Fund Based"],
                        ["End Use", debtForm.endUse === "Custom" ? debtForm.customEndUse : debtForm.endUse],
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f1f5f9", gap: 16 }}>
                          <span style={{ fontSize: 13, color: "#64748b", flexShrink: 0 }}>{k}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, textAlign: "right" }}>{v}</span>
                        </div>
                      ))}
                      <div style={{ marginTop: 20, padding: 14, background: "#eff6ff", borderRadius: 10, border: "1px solid #bfdbfe", fontSize: 13, color: "#1d4ed8", lineHeight: 1.7 }}>
                        <strong>Lead Score: {leadScore}/100</strong><br />
                        Your application will be scored and auto-routed to the best channel partner within 2 hours. You&apos;ll receive a confirmation on your registered email & WhatsApp.
                      </div>
                    </div>
                  )}

                  {submitted && (
                    <div style={{ textAlign: "center", padding: "40px 20px" }}>
                      <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                      <h3 style={{ fontSize: 20, fontWeight: 800, color: "#166534", marginBottom: 8 }}>Application Submitted!</h3>
                      <p style={{ color: "#64748b", marginBottom: 20 }}>Lead Score: <strong style={{ color: GREEN }}>{leadScore}/100</strong> — A channel partner will contact you within 2 hours.</p>
                      <button onClick={() => { setSubmitted(false); setDebtStep(0); setDebtForm({ amount: "", source: "Bank", secured: "unsecured", secType: "", secValue: "", debtType: "short-term", fundType: "fund-based", endUse: "Expansion", customEndUse: "" }); }}
                        style={{ padding: "10px 24px", background: NAVY, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                        Submit Another Application
                      </button>
                    </div>
                  )}

                  {!submitted && (
                    <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                      {debtStep > 0 && <button onClick={() => setDebtStep(s => s - 1)} style={{ flex: 1, padding: "12px", border: `2px solid ${NAVY}`, borderRadius: 10, background: "#fff", color: NAVY, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>← Back</button>}
                      {debtStep < 4
                        ? <button onClick={() => setDebtStep(s => s + 1)} style={{ flex: 2, padding: "12px", background: NAVY, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Next →</button>
                        : <button onClick={() => setSubmitted(true)} style={{ flex: 2, padding: "12px", background: GREEN, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif", boxShadow: "0 4px 12px rgba(46,204,113,0.4)" }}>Submit Application ✓</button>
                      }
                    </div>
                  )}
                </div>

                {/* Lead Score Card */}
                <div style={{ ...card, textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Live Lead Score</div>
                  <div style={{ fontSize: 56, fontWeight: 900, color: leadScore >= 80 ? "#10b981" : leadScore >= 60 ? "#f59e0b" : "#94a3b8", lineHeight: 1 }}>{leadScore > 0 ? leadScore : "—"}</div>
                  {leadScore > 0 && <div style={{ fontSize: 12, color: "#64748b", margin: "8px 0" }}>{leadScore >= 80 ? "🟢 High Priority — Fast Track Eligible" : leadScore >= 60 ? "🟡 Good — Standard Processing" : "🔴 Low — Needs Improvement"}</div>}
                  <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden", marginTop: 8 }}>
                    <div style={{ height: "100%", width: `${leadScore}%`, background: leadScore >= 80 ? "#10b981" : leadScore >= 60 ? "#f59e0b" : "#ef4444", borderRadius: 4, transition: "width 0.5s" }} />
                  </div>
                  <div style={{ marginTop: 16, fontSize: 12, color: "#64748b", lineHeight: 1.7, textAlign: "left" }}>
                    <div>✅ Secured loan → Higher score</div>
                    <div>✅ Higher amount → More options</div>
                    <div>✅ Bank preferred → Faster processing</div>
                    <div>✅ Expansion use → Better terms</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ───── RAISE EQUITY ───── */}
          {tab === "raise-equity" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Raise Equity Funding</h1>
              <p style={{ color: "#64748b", marginBottom: 28 }}>Get connected with angel investors and PE funds</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
                <div style={card}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 20 }}>Business Financials</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[["revenue", "Annual Revenue (₹) *"], ["ebitda", "EBITDA (₹) *"], ["pat", "PAT / Net Profit (₹) *"], ["stake", "Equity Stake Offered (%) *"], ["valuation", "Expected Valuation (₹) *"]].map(([name, lbl]) => (
                      <div key={name}>
                        <label style={label}>{lbl}</label>
                        <input type="number" value={(equityForm as any)[name]} onChange={e => setEquityForm(p => ({ ...p, [name]: e.target.value }))} placeholder={`Enter ${lbl}`} style={input()} />
                      </div>
                    ))}
                    <div>
                      <label style={label}>Use of Equity Funds</label>
                      <textarea value={equityForm.useOfFunds} onChange={e => setEquityForm(p => ({ ...p, useOfFunds: e.target.value }))} placeholder="Describe how you plan to use the equity raised..." rows={3} style={{ ...input(), resize: "vertical" }} />
                    </div>
                    <div>
                      <label style={label}>Upload Documents</label>
                      {[["Last 3 Years Financials (Audited)", "PDF/XLSX"], ["12–18 Months Bank Statements", "PDF"], ["Pitch Deck", "PDF/PPTX"], ["CA Certificate", "PDF"]].map(([doc, format]) => (
                        <div key={doc} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#f8fafc", borderRadius: 8, marginBottom: 8 }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>📎 {doc}</div>
                            <div style={{ fontSize: 11, color: "#94a3b8" }}>{format} • Max 10MB</div>
                          </div>
                          <button style={{ padding: "6px 14px", background: NAVY, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Upload</button>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => alert("Equity application submitted! Investor summary will be generated and shared with qualified investors.")}
                      style={{ padding: "13px", background: NAVY, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif", boxShadow: "0 4px 12px rgba(15,45,94,0.3)" }}>
                      Submit for Investor Review →
                    </button>
                  </div>
                </div>

                {/* Auto-calculated ratios */}
                <div>
                  <div style={{ ...card, marginBottom: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Auto-Calculated Ratios</h3>
                    {[
                      ["EBITDA Margin", ebitdaMargin === "—" ? "—" : `${ebitdaMargin}%`, Number(ebitdaMargin) > 15],
                      ["PAT Margin", patMargin === "—" ? "—" : `${patMargin}%`, Number(patMargin) > 10],
                      ["Revenue Multiple", revenueMultiple === "—" ? "—" : `${revenueMultiple}x`, Number(revenueMultiple) < 5],
                    ].map(([lbl, val, good]) => (
                      <div key={String(lbl)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                        <span style={{ fontSize: 13, color: "#64748b" }}>{lbl}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 15, fontWeight: 800, color: String(val) === "—" ? "#94a3b8" : good ? "#10b981" : "#ef4444" }}>{String(val)}</span>
                          {String(val) !== "—" && <span>{good ? "✅" : "⚠️"}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ ...card, background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)` }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>📄 Auto-Generated Investor Summary</h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 16, lineHeight: 1.7 }}>
                      Once you submit, BizzBuddy will auto-generate a professional one-pager with your financials, ratios, and growth metrics — visible to qualified investors.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {["Business Overview & Financials", "Ratio Analysis", "Valuation Summary", "Investment Ask & Use of Funds"].map(item => (
                        <div key={item} style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", display: "flex", gap: 8 }}>
                          <span style={{ color: GREEN }}>✓</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ───── FINANCIAL ADVISORY ───── */}
          {tab === "advisory" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Financial Advisory</h1>
              <p style={{ color: "#64748b", marginBottom: 28 }}>Real-time financial health analysis with benchmarks</p>
              <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24, alignItems: "start" }}>
                {/* Input form */}
                <div style={card}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Enter Financial Data</h3>
                  {[
                    ["revenue", "Annual Revenue (₹)"],
                    ["profit", "Net Profit (₹)"],
                    ["prevRevenue", "Previous Year Revenue (₹)"],
                    ["assets", "Total Assets (₹)"],
                    ["liabilities", "Total Liabilities (₹)"],
                    ["cash", "Cash & Bank Balance (₹)"],
                  ].map(([name, lbl]) => (
                    <div key={name} style={{ marginBottom: 14 }}>
                      <label style={{ ...label, fontSize: 12 }}>{lbl}</label>
                      <input type="number" placeholder="₹ Enter amount" value={(advisory as any)[name]} onChange={e => setAdvisory(p => ({ ...p, [name]: e.target.value }))} style={{ ...input(), padding: "10px 12px", fontSize: 13 }} />
                    </div>
                  ))}
                  <div style={{ marginTop: 8, padding: 10, background: "#f0fdf4", borderRadius: 8, fontSize: 12, color: "#166534" }}>
                    💡 Updates live as you type
                  </div>
                </div>

                {/* Results */}
                <div>
                  {/* Health Score */}
                  <div style={{ ...card, marginBottom: 20, textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Financial Health Score</div>
                    <div style={{ fontSize: 72, fontWeight: 900, color: healthScore >= 80 ? "#10b981" : healthScore >= 60 ? "#f59e0b" : r > 0 ? "#ef4444" : "#94a3b8", lineHeight: 1 }}>
                      {r > 0 ? healthScore : "—"}
                    </div>
                    {r > 0 && <div style={{ fontSize: 13, color: "#64748b", margin: "8px 0" }}>{healthScore >= 80 ? "✅ Excellent — High loan eligibility" : healthScore >= 60 ? "⚠️ Good — Moderate eligibility" : "🔴 Needs improvement"}</div>}
                    <div style={{ height: 10, background: "#e2e8f0", borderRadius: 5, overflow: "hidden", marginTop: 10 }}>
                      <div style={{ height: "100%", width: `${r > 0 ? healthScore : 0}%`, background: healthScore >= 80 ? "#10b981" : healthScore >= 60 ? "#f59e0b" : "#ef4444", borderRadius: 5, transition: "width 0.6s ease" }} />
                    </div>
                  </div>

                  {/* Metric Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                    {[
                      { label: "Profit Margin", value: r > 0 ? `${profitMargin.toFixed(1)}%` : "—", good: profitMargin > 10, hint: "Benchmark: > 10%" },
                      { label: "Return on Assets", value: r > 0 ? `${roa.toFixed(1)}%` : "—", good: roa > 8, hint: "Benchmark: > 8%" },
                      { label: "Debt / Assets", value: r > 0 ? debtRatio.toFixed(2) : "—", good: debtRatio < 0.6, hint: "Safe: < 0.60" },
                      { label: "Cash Liquidity", value: r > 0 ? `${cashRatio.toFixed(2)}x` : "—", good: cashRatio > 1, hint: "Safe: > 1.0x" },
                      { label: "YoY Growth", value: r > 0 && pr > 0 ? `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%` : "—", good: growth > 15, hint: "Strong: > 15%" },
                    ].map(m => (
                      <div key={m.label} style={{ background: "#fff", border: `1.5px solid ${m.value !== "—" ? (m.good ? "#bbf7d0" : "#fecaca") : "#e2e8f0"}`, borderRadius: 12, padding: 16 }}>
                        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>{m.label}</div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: m.value === "—" ? "#94a3b8" : m.good ? "#10b981" : "#ef4444" }}>{m.value}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{m.hint}</div>
                        {m.value !== "—" && <div style={{ fontSize: 16, marginTop: 6 }}>{m.good ? "✅" : "⚠️"}</div>}
                      </div>
                    ))}
                  </div>

                  {/* Bar Chart */}
                  {barData.length > 0 && (
                    <div style={{ ...card, marginBottom: 20 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Your Metrics vs Benchmark</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="metric" tick={{ fontSize: 11, fill: "#64748b" }} />
                          <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                          <Tooltip />
                          <Bar dataKey="value" fill={NAVY} radius={[4, 4, 0, 0]} name="Your Value" />
                          <Bar dataKey="benchmark" fill="#10b981" radius={[4, 4, 0, 0]} name="Benchmark" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Radar Chart */}
                  {radarData.length > 0 && (
                    <div style={{ ...card, marginBottom: 20 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 8 }}>Financial Health Radar</h3>
                      <ResponsiveContainer width="100%" height={220}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "#64748b" }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
                          <Radar name="Financial Health" dataKey="value" stroke={NAVY} fill={NAVY} fillOpacity={0.25} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* PDF CTA */}
                  <button onClick={() => alert("PDF report generation — connect your backend to generate a downloadable report with full analysis.")}
                    style={{ width: "100%", padding: "14px", background: `linear-gradient(135deg, ${GREEN}, #27ae60)`, color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Inter', sans-serif", boxShadow: "0 4px 14px rgba(46,204,113,0.4)" }}>
                    📄 Download PDF Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ───── DOCUMENTS ───── */}
          {tab === "documents" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 28 }}>Documents</h1>
              <div style={card}>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Upload the required documents for your loan application. Verified documents improve your lead score.</p>
                {[
                  { name: "Audited Financials FY24", status: "Verified", date: "2025-01-05", required: true },
                  { name: "Audited Financials FY23", status: "Verified", date: "2025-01-05", required: true },
                  { name: "Audited Financials FY22", status: "Pending", date: "—", required: true },
                  { name: "Bank Statements (12 months)", status: "Verified", date: "2025-01-05", required: true },
                  { name: "GST Returns (Last 12 months)", status: "Pending", date: "—", required: true },
                  { name: "ITR (Last 2 years)", status: "Pending", date: "—", required: true },
                  { name: "MOA / AOA", status: "Pending", date: "—", required: false },
                  { name: "PAN Card (Company & Directors)", status: "Verified", date: "2025-01-05", required: true },
                  { name: "Aadhar / KYC (Directors)", status: "Pending", date: "—", required: true },
                  { name: "Property Papers (if secured)", status: "Pending", date: "—", required: false },
                ].map(d => (
                  <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>📄 {d.name}</span>
                        {d.required && <span style={{ fontSize: 10, background: "#fef2f2", color: "#dc2626", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>REQUIRED</span>}
                      </div>
                      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Uploaded: {d.date}</div>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ background: d.status === "Verified" ? "#dcfce7" : "#fef9c3", color: d.status === "Verified" ? "#166534" : "#854d0e", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{d.status}</span>
                      <button style={{ padding: "6px 14px", background: NAVY, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>{d.status === "Verified" ? "Re-upload" : "Upload"}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───── PROFILE ───── */}
          {tab === "profile" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Business Profile</h1>
              <p style={{ color: "#64748b", marginBottom: 28 }}>Complete your profile to improve your lead score and get better matches</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
                {/* Company Info */}
                <div style={card}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 18 }}>Company Information</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      ["legalName", "Legal Name *"],
                      ["businessName", "Business / Trading Name *"],
                      ["industry", "Industry / Sector *"],
                      ["category", "Category"],
                      ["yearOfIncorporation", "Year of Incorporation"],
                      ["panNumber", "PAN Number"],
                      ["gstNumber", "GST Number"],
                      ["city", "City"],
                      ["state", "State"],
                    ].map(([name, lbl]) => (
                      <div key={name}>
                        <label style={label}>{lbl}</label>
                        <input type={name === "operationsStartDate" ? "date" : "text"} value={(profileForm as any)[name]} onChange={e => setProfileForm(p => ({ ...p, [name]: e.target.value }))} style={input()} />
                      </div>
                    ))}
                    <div>
                      <label style={label}>Operations Start Date</label>
                      <input type="date" value={profileForm.operationsStartDate} onChange={e => setProfileForm(p => ({ ...p, operationsStartDate: e.target.value }))} style={input()} />
                    </div>
                  </div>
                </div>

                <div>
                  {/* 3-Year Financials */}
                  <div style={{ ...card, marginBottom: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 18 }}>Financials (Last 3 Years)</h3>
                    {[["FY 2024–25", "3"], ["FY 2023–24", "2"], ["FY 2022–23", "1"]].map(([yr, suffix]) => (
                      <div key={yr} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid #f1f5f9" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 10 }}>{yr}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                          {[["Revenue", `revenue${suffix}`], ["EBITDA", `ebitda${suffix}`], ["PAT", `pat${suffix}`]].map(([lbl, field]) => (
                            <div key={lbl}>
                              <label style={{ ...label, fontSize: 11 }}>{lbl} (₹)</label>
                              <input type="number" value={(profileForm as any)[field]} onChange={e => setProfileForm(p => ({ ...p, [field]: e.target.value }))} style={{ ...input(), padding: "8px 10px", fontSize: 12 }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Balance Sheet */}
                  <div style={card}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 18 }}>Balance Sheet Summary</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {[["totalAssets", "Total Assets (₹)"], ["totalLiabilities", "Total Liabilities (₹)"], ["cashBalance", "Cash & Bank Balance (₹)"], ["existingLoans", "Existing Loan Outstanding (₹)"]].map(([name, lbl]) => (
                        <div key={name}>
                          <label style={label}>{lbl}</label>
                          <input type="number" value={(profileForm as any)[name]} onChange={e => setProfileForm(p => ({ ...p, [name]: e.target.value }))} style={input()} />
                        </div>
                      ))}
                    </div>
                    <button onClick={() => alert("Profile saved successfully!")} style={{ marginTop: 24, width: "100%", padding: "13px", background: NAVY, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                      Save Profile ✓
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
