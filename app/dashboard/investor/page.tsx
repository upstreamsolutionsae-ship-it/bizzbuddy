"use client";
import { useState } from "react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const NAVY = "#0f2d5e";
const GREEN = "#2ecc71";

const ALL_OPPORTUNITIES = [
  { id: 1, name: "GreenTech Manufacturing", sector: "Manufacturing", revenue: 8500000, ebitda: 18, vintage: 2016, type: "Non-listed Equity", stake: "15%", ask: 2500000, score: 88, city: "Pune", employees: 120, pat: 12, growth: 22, description: "Leading manufacturer of eco-friendly packaging solutions with Pan-India distribution." },
  { id: 2, name: "Agro Exports India", sector: "Agriculture", revenue: 22000000, ebitda: 14, vintage: 2012, type: "Non-listed Debt", stake: "—", ask: 5000000, score: 82, city: "Nagpur", employees: 85, pat: 8, growth: 15, description: "Export-oriented agri-processing company with 10+ years of banking relationships." },
  { id: 3, name: "HealthCare Services Pvt.", sector: "Healthcare", revenue: 4200000, ebitda: 22, vintage: 2019, type: "Non-listed Equity", stake: "20%", ask: 1800000, score: 76, city: "Hyderabad", employees: 45, pat: 14, growth: 35, description: "Diagnostic chain expanding to tier-2 cities with strong unit economics." },
  { id: 4, name: "TechRetail Solutions", sector: "Retail / Tech", revenue: 15000000, ebitda: 11, vintage: 2017, type: "Non-listed Debt", stake: "—", ask: 3000000, score: 79, city: "Bangalore", employees: 200, pat: 6, growth: 18, description: "Omnichannel retail platform serving 500+ SME merchants with SaaS + credit offering." },
  { id: 5, name: "Logix Freight Pvt.", sector: "Logistics", revenue: 35000000, ebitda: 9, vintage: 2014, type: "Non-listed Debt", stake: "—", ask: 8000000, score: 85, city: "Mumbai", employees: 340, pat: 5, growth: 12, description: "Last-mile logistics company with proprietary routing tech serving FMCG brands." },
  { id: 6, name: "EduTech Academy", sector: "Education", revenue: 6000000, ebitda: 28, vintage: 2020, type: "Non-listed Equity", stake: "25%", ask: 2000000, score: 80, city: "Delhi", employees: 60, pat: 18, growth: 55, description: "EdTech platform focused on vocational skilling with government partnerships." },
];

const PORTFOLIO = [
  { company: "GreenTech Mfg.", type: "Equity", invested: 2500000, current: 3100000, irr: 18, status: "Active", date: "Jan 2024" },
  { company: "Agro Exports", type: "Debt", invested: 3000000, current: 3300000, irr: 12, status: "Active", date: "Mar 2024" },
  { company: "HealthPlus Chain", type: "Equity", invested: 1500000, current: 1950000, irr: 22, status: "Active", date: "Jun 2023" },
  { company: "PrintMasters", type: "Debt", invested: 1300000, current: 1300000, irr: 14, status: "Exited", date: "Dec 2022" },
];

const PIE_COLORS = ["#0f2d5e", "#3b82f6", "#10b981", "#f59e0b"];

const fmt = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(1)} Cr` : `₹${(n / 100000).toFixed(0)} L`;

export default function InvestorDashboard() {
  const [view, setView] = useState<"chooser" | "dashboard">("chooser");
  const [selectedType, setSelectedType] = useState("");
  const [tab, setTab] = useState("opportunities");
  const [filter, setFilter] = useState({ sector: "", type: "", minRevenue: "", vintage: "" });
  const [eoi, setEoi] = useState<number[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<typeof ALL_OPPORTUNITIES[0] | null>(null);

  const filtered = ALL_OPPORTUNITIES.filter(o =>
    (!filter.sector || o.sector.toLowerCase().includes(filter.sector.toLowerCase())) &&
    (!filter.type || o.type === filter.type) &&
    (!filter.vintage || o.vintage >= Number(filter.vintage)) &&
    (!filter.minRevenue || o.revenue >= Number(filter.minRevenue) * 100000)
  );

  const totalInvested = PORTFOLIO.reduce((s, p) => s + p.invested, 0);
  const totalCurrent = PORTFOLIO.reduce((s, p) => s + p.current, 0);
  const avgIRR = (PORTFOLIO.reduce((s, p) => s + p.irr, 0) / PORTFOLIO.length).toFixed(1);

  const pieData = [
    { name: "Equity", value: PORTFOLIO.filter(p => p.type === "Equity").reduce((s, p) => s + p.invested, 0) },
    { name: "Debt", value: PORTFOLIO.filter(p => p.type === "Debt").reduce((s, p) => s + p.invested, 0) },
  ];

  const barData = PORTFOLIO.map(p => ({ company: p.company, Invested: p.invested / 100000, Current: p.current / 100000 }));

  const navItems = [["opportunities", "🔍", "Opportunities"], ["portfolio", "💼", "My Portfolio"], ["watchlist", "⭐", "Watchlist"], ["profile", "👤", "Profile"]];

  // Investment Type Chooser
  if (view === "chooser") {
    const types = [
      { key: "mutual-funds", icon: "📊", title: "Mutual Funds", desc: "SIPs, lump sum investments via AMCs", tag: "Redirects to partner", color: "#eff6ff" },
      { key: "listed-equity", icon: "📈", title: "Listed Equity", desc: "BSE/NSE listed stocks & ETFs", tag: "Redirects to broker", color: "#f0fdf4" },
      { key: "Non-listed Equity", icon: "🏢", title: "Non-listed Equity", desc: "Equity stake in private MSMEs", tag: "Available on platform", color: "#fdf4ff", active: true },
      { key: "listed-debt", icon: "🏛️", title: "Listed Debt", desc: "Government bonds, listed NCDs", tag: "Redirects to exchange", color: "#fef9ee" },
      { key: "Non-listed Debt", icon: "💳", title: "Non-listed Debt", desc: "Private lending to MSMEs (12–18%)", tag: "Available on platform", color: "#f0fdf4", active: true },
    ];
    return (
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <nav style={{ background: NAVY, height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>Bizz<span style={{ color: GREEN }}>Buddy</span> <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>Investor Dashboard</span></div>
          <Link href="/auth/login" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Logout</Link>
        </nav>
        <div style={{ background: "#f8fafc", minHeight: "calc(100vh - 68px)", padding: "60px 24px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
          <div style={{ maxWidth: 800, width: "100%" }}>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: NAVY, marginBottom: 8, textAlign: "center" }}>Where would you like to invest?</h1>
            <p style={{ color: "#64748b", textAlign: "center", marginBottom: 40 }}>Choose your investment category to get started</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {types.map(t => (
                <button key={t.key} onClick={() => {
                  if (t.key === "mutual-funds") { alert("Redirecting to partner Mutual Fund platform..."); return; }
                  if (t.key === "listed-equity") { alert("Redirecting to integrated stockbroker platform..."); return; }
                  if (t.key === "listed-debt") { alert("Redirecting to bond exchange platform..."); return; }
                  setSelectedType(t.key);
                  setFilter(p => ({ ...p, type: t.key }));
                  setView("dashboard");
                }}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "#fff", border: `2px solid ${t.active ? "#bfdbfe" : "#e2e8f0"}`, borderRadius: 14, cursor: "pointer", textAlign: "left", fontFamily: "'Inter', sans-serif", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ fontSize: 28 }}>{t.icon}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>{t.title}</div>
                      <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{t.desc}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, background: t.active ? "#eff6ff" : "#f1f5f9", color: t.active ? "#1d4ed8" : "#64748b", padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{t.tag}</span>
                    <span style={{ fontSize: 20, color: "#94a3b8" }}>→</span>
                  </div>
                </button>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button onClick={() => { setSelectedType(""); setView("dashboard"); }} style={{ color: "#64748b", fontSize: 13, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                Browse all opportunities →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ background: NAVY, height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>Bizz<span style={{ color: GREEN }}>Buddy</span> <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>Investor Dashboard</span></div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => setView("chooser")} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 12, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>← Investment Types</button>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Ramesh Gupta</span>
          <Link href="/auth/login" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Logout</Link>
        </div>
      </nav>

      <div style={{ display: "flex" }}>
        <div style={{ width: 220, background: NAVY, minHeight: "calc(100vh - 68px)", padding: "24px 0", flexShrink: 0 }}>
          <div style={{ padding: "0 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${GREEN}, #27ae60)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, marginBottom: 8 }}>R</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>Ramesh Gupta</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>HNI Investor</div>
          </div>
          {navItems.map(([id, icon, lbl]) => (
            <button key={id} onClick={() => setTab(id)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 20px", background: tab === id ? "rgba(46,204,113,0.15)" : "transparent", border: "none", borderLeft: tab === id ? `3px solid ${GREEN}` : "3px solid transparent", color: tab === id ? "#fff" : "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: tab === id ? 600 : 400 }}>
              <span>{icon}</span>{lbl}
              {id === "watchlist" && <span style={{ marginLeft: "auto", background: GREEN, color: "#fff", borderRadius: 10, fontSize: 10, padding: "2px 6px", fontWeight: 700 }}>{eoi.length}</span>}
            </button>
          ))}
        </div>

        <main style={{ flex: 1, padding: 32, background: "#f8fafc", minHeight: "calc(100vh - 68px)", overflowY: "auto" }}>

          {/* OPPORTUNITIES */}
          {tab === "opportunities" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                  <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Investment Opportunities</h1>
                  <p style={{ color: "#64748b" }}>{selectedType ? `Showing: ${selectedType}` : "Curated MSME opportunities matching your profile"}</p>
                </div>
                <button onClick={() => setView("chooser")} style={{ padding: "9px 18px", background: NAVY, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Change Type</button>
              </div>

              {/* Filters */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 24, background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 4, textTransform: "uppercase" }}>Sector</label>
                  <input placeholder="e.g. Manufacturing" value={filter.sector} onChange={e => setFilter(p => ({ ...p, sector: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 4, textTransform: "uppercase" }}>Type</label>
                  <select value={filter.type} onChange={e => setFilter(p => ({ ...p, type: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, background: "#fff", color: filter.type ? "#1e293b" : "#94a3b8" }}>
                    <option value="">All Types</option>
                    <option>Non-listed Equity</option>
                    <option>Non-listed Debt</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 4, textTransform: "uppercase" }}>Min Revenue (₹L)</label>
                  <input type="number" placeholder="e.g. 500" value={filter.minRevenue} onChange={e => setFilter(p => ({ ...p, minRevenue: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 4, textTransform: "uppercase" }}>Vintage (After)</label>
                  <select value={filter.vintage} onChange={e => setFilter(p => ({ ...p, vintage: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, background: "#fff", color: filter.vintage ? "#1e293b" : "#94a3b8" }}>
                    <option value="">Any Year</option>
                    {[2010, 2012, 2015, 2017, 2019, 2020].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>{filtered.length} opportunities found</div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                {filtered.map(o => (
                  <div key={o.id} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: eoi.includes(o.id) ? `2px solid ${GREEN}` : "2px solid transparent", transition: "border 0.2s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: NAVY }}>{o.name}</div>
                        <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{o.sector} • {o.city} • Est. {o.vintage}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        <div style={{ background: o.score >= 85 ? "#f0fdf4" : "#eff6ff", color: o.score >= 85 ? "#166534" : "#1d4ed8", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Score: {o.score}</div>
                        {eoi.includes(o.id) && <span style={{ fontSize: 11, color: GREEN, fontWeight: 600 }}>✓ Interest Sent</span>}
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#64748b", marginBottom: 14, lineHeight: 1.5 }}>{o.description}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                      {[["Revenue", fmt(o.revenue)], ["EBITDA", `${o.ebitda}%`], ["PAT Margin", `${o.pat}%`], ["YoY Growth", `+${o.growth}%`], ["Ask", fmt(o.ask)], ["Type", o.type.split(" ")[1]]].map(([k, v]) => (
                        <div key={k} style={{ background: "#f8fafc", borderRadius: 8, padding: "8px 10px" }}>
                          <div style={{ fontSize: 10, color: "#94a3b8" }}>{k}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginTop: 2 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={() => setSelectedOpp(o)} style={{ flex: 1, padding: "9px", background: "#f8fafc", color: NAVY, border: "1.5px solid #e2e8f0", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>View Profile</button>
                      <button onClick={() => setEoi(prev => prev.includes(o.id) ? prev.filter(x => x !== o.id) : [...prev, o.id])}
                        style={{ flex: 2, padding: "9px", background: eoi.includes(o.id) ? "#f0fdf4" : NAVY, color: eoi.includes(o.id) ? "#166534" : "#fff", border: eoi.includes(o.id) ? "2px solid #bbf7d0" : "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                        {eoi.includes(o.id) ? "✓ Interest Sent" : "Express Interest →"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PORTFOLIO */}
          {tab === "portfolio" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 24 }}>My Portfolio</h1>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 28 }}>
                {[["Total Invested", fmt(totalInvested), "#eff6ff", "#bfdbfe"], ["Current Value", fmt(totalCurrent), "#f0fdf4", "#bbf7d0"], ["Avg. IRR", `${avgIRR}%`, "#fef9ee", "#fde68a"], ["Active Deals", String(PORTFOLIO.filter(p => p.status === "Active").length), "#fdf4ff", "#e9d5ff"]].map(([l, v, bg, border]) => (
                  <div key={l} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 16, padding: 20 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: NAVY }}>{v}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 24, marginBottom: 24 }}>
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Invested vs Current Value (₹ Lakhs)</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="company" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip formatter={(v: unknown) => `₹${v}L`} />
                      <Bar dataKey="Invested" fill={NAVY} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Current" fill={GREEN} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Asset Allocation</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={false} style={{ fontSize: 11 }}>
                        {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v: unknown) => fmt(Number(v))} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Holdings</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr style={{ background: "#f8fafc" }}>{["Company", "Type", "Invested", "Current Value", "P&L", "IRR", "Date", "Status"].map(h => <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {PORTFOLIO.map(p => {
                      const pnl = p.current - p.invested;
                      return (
                        <tr key={p.company} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 700, color: NAVY }}>{p.company}</td>
                          <td style={{ padding: "12px 12px" }}><span style={{ background: p.type === "Equity" ? "#eff6ff" : "#f0fdf4", color: p.type === "Equity" ? "#1d4ed8" : "#166534", padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{p.type}</span></td>
                          <td style={{ padding: "12px 12px", fontSize: 13, color: "#64748b" }}>{fmt(p.invested)}</td>
                          <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 600, color: NAVY }}>{fmt(p.current)}</td>
                          <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 700, color: pnl > 0 ? "#10b981" : "#ef4444" }}>{pnl > 0 ? "+" : ""}{fmt(pnl)}</td>
                          <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 700, color: GREEN }}>{p.irr}%</td>
                          <td style={{ padding: "12px 12px", fontSize: 12, color: "#94a3b8" }}>{p.date}</td>
                          <td style={{ padding: "12px 12px" }}><span style={{ background: p.status === "Active" ? "#dcfce7" : "#f1f5f9", color: p.status === "Active" ? "#166534" : "#64748b", padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{p.status}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* WATCHLIST */}
          {tab === "watchlist" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 24 }}>Watchlist — Expressions of Interest</h1>
              {eoi.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 16 }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 8 }}>No EOIs yet</h3>
                  <p style={{ color: "#64748b", marginBottom: 20 }}>Browse opportunities and click &ldquo;Express Interest&rdquo; to add them here</p>
                  <button onClick={() => setTab("opportunities")} style={{ padding: "10px 24px", background: NAVY, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Browse Opportunities</button>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                  {ALL_OPPORTUNITIES.filter(o => eoi.includes(o.id)).map(o => (
                    <div key={o.id} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `2px solid ${GREEN}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: NAVY }}>{o.name}</div>
                          <div style={{ fontSize: 12, color: "#64748b" }}>{o.sector} • {o.city}</div>
                        </div>
                        <span style={{ fontSize: 12, background: "#f0fdf4", color: "#166534", padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>✓ EOI Sent</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                        {[["Ask", fmt(o.ask)], ["Type", o.type.split(" ")[1]], ["Score", String(o.score)]].map(([k, v]) => (
                          <div key={k} style={{ background: "#f8fafc", borderRadius: 8, padding: "8px 10px" }}>
                            <div style={{ fontSize: 10, color: "#94a3b8" }}>{k}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", padding: "10px 12px", background: "#eff6ff", borderRadius: 8 }}>
                        📧 Our team will connect you with this business within 48 hours.
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PROFILE */}
          {tab === "profile" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 24 }}>Investor Profile</h1>
              <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", maxWidth: 560 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  {[["Name", "Ramesh Gupta"], ["Email", "investor@demo.com"], ["Investor Type", "HNI / Family Office"], ["Min Ticket Size", "₹50 Lakhs"], ["Max Ticket Size", "₹5 Crore"], ["Risk Appetite", "Moderate–High"]].map(([l, v]) => (
                    <div key={l}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>{l}</label>
                      <div style={{ fontSize: 14, fontWeight: 600, color: NAVY, padding: "10px 12px", background: "#f8fafc", borderRadius: 8 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Preferred Sectors</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Manufacturing", "Healthcare", "Logistics", "Agriculture", "Technology"].map(s => (
                      <span key={s} style={{ background: "#eff6ff", color: "#1d4ed8", padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Opportunity Modal */}
      {selectedOpp && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setSelectedOpp(null)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, maxWidth: 560, width: "100%", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: NAVY }}>{selectedOpp.name}</h2>
              <button onClick={() => setSelectedOpp(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#94a3b8" }}>✕</button>
            </div>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 20 }}>{selectedOpp.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[["Sector", selectedOpp.sector], ["City", selectedOpp.city], ["Vintage", String(selectedOpp.vintage)], ["Employees", String(selectedOpp.employees)], ["Revenue", fmt(selectedOpp.revenue)], ["EBITDA Margin", `${selectedOpp.ebitda}%`], ["PAT Margin", `${selectedOpp.pat}%`], ["YoY Growth", `+${selectedOpp.growth}%`], ["Investment Ask", fmt(selectedOpp.ask)], ["Type", selectedOpp.type]].map(([k, v]) => (
                <div key={k} style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
            <button onClick={() => { setEoi(prev => prev.includes(selectedOpp.id) ? prev : [...prev, selectedOpp.id]); setSelectedOpp(null); }}
              style={{ width: "100%", padding: "13px", background: eoi.includes(selectedOpp.id) ? "#f0fdf4" : NAVY, color: eoi.includes(selectedOpp.id) ? "#166534" : "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
              {eoi.includes(selectedOpp.id) ? "✓ Interest Already Sent" : "Express Interest →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
