"use client";
import { useState } from "react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const NAVY = "#0f2d5e";
const GREEN = "#2ecc71";

type LeadStatus = "New" | "In Process" | "Approved" | "Disbursed" | "Rejected";

interface Lead {
  id: string; name: string; business: string; phone: string; amount: number;
  type: string; status: LeadStatus; city: string; score: number; date: string;
  bank: string; notes: string; pan: string; turnover: string;
}

const INITIAL_LEADS: Lead[] = [
  { id: "L001", name: "Suresh Sharma", business: "Sharma Traders Pvt. Ltd.", phone: "+91 98765 43210", amount: 5000000, type: "Working Capital", status: "New", city: "Delhi", score: 78, date: "2025-03-14", bank: "", notes: "", pan: "ABCPS1234R", turnover: "₹5–25 Cr" },
  { id: "L002", name: "Priya Singh", business: "PS Exports Pvt. Ltd.", phone: "+91 87654 32109", amount: 20000000, type: "Term Loan", status: "In Process", city: "Mumbai", score: 85, date: "2025-03-12", bank: "HDFC Bank", notes: "CAM submitted, awaiting credit team", pan: "BCDPS5678S", turnover: "₹25–100 Cr" },
  { id: "L003", name: "Amit Verma", business: "AV Manufacturing", phone: "+91 76543 21098", amount: 50000000, type: "LAP", status: "Approved", city: "Pune", score: 90, date: "2025-03-08", bank: "ICICI Bank", notes: "Sanctioned — disbursement pending", pan: "CDEPV9012T", turnover: "₹25–100 Cr" },
  { id: "L004", name: "Kavitha R.", business: "KR Services", phone: "+91 65432 10987", amount: 3000000, type: "Unsecured BL", status: "Disbursed", city: "Bangalore", score: 82, date: "2025-02-28", bank: "Axis Bank", notes: "Disbursed on 28-Feb", pan: "DEFKR3456U", turnover: "₹1–5 Cr" },
  { id: "L005", name: "Rohit Mehta", business: "Mehta & Co.", phone: "+91 54321 09876", amount: 10000000, type: "Term Loan", status: "New", city: "Ahmedabad", score: 72, date: "2025-03-15", bank: "", notes: "", pan: "EFGRM7890V", turnover: "₹5–25 Cr" },
];

const STATUS_COLORS: Record<string, string> = {
  New: "#3b82f6", "In Process": "#f59e0b", Approved: "#10b981", Disbursed: "#8b5cf6", Rejected: "#ef4444"
};

const BANKS = ["HDFC Bank", "ICICI Bank", "Axis Bank", "SBI", "Kotak Mahindra Bank", "IndusInd Bank", "Yes Bank", "Punjab National Bank", "Bank of Baroda", "IDFC First Bank"];

const fmt = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(1)} Cr` : `₹${(n / 100000).toFixed(0)} L`;

export default function PartnerDashboard() {
  const [tab, setTab] = useState("leads");
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [search, setSearch] = useState("");

  const updateLead = (id: string, patch: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
    if (selectedLead?.id === id) setSelectedLead(prev => prev ? { ...prev, ...patch } : prev);
  };

  const filteredLeads = leads.filter(l =>
    (!filterStatus || l.status === filterStatus) &&
    (!search || l.business.toLowerCase().includes(search.toLowerCase()) || l.name.toLowerCase().includes(search.toLowerCase()))
  );

  const commissions = leads.filter(l => l.status === "Disbursed").map(l => ({
    business: l.business, amount: l.amount, rate: 1.5, earned: l.amount * 0.015, status: "Paid"
  }));

  const barData = ["Jan", "Feb", "Mar"].map((m, i) => ({ month: m, leads: [3, 5, 4][i], disbursed: [1, 2, 1][i], commission: [45000, 80000, 40000][i] / 1000 }));

  const navItems = [["leads", "📋", "My Leads"], ["commission", "💰", "Commission"], ["documents", "📁", "Documents"], ["profile", "👤", "Profile"]];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ background: NAVY, height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>Bizz<span style={{ color: GREEN }}>Buddy</span> <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>Partner Dashboard</span></div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ background: "#f59e0b20", color: "#f59e0b", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
            {leads.filter(l => l.status === "New").length} New Leads
          </span>
          <Link href="/auth/login" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Logout</Link>
        </div>
      </nav>

      <div style={{ display: "flex" }}>
        <div style={{ width: 240, background: NAVY, minHeight: "calc(100vh - 68px)", padding: "24px 0", flexShrink: 0 }}>
          <div style={{ padding: "0 16px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 8 }}>
            <div style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${GREEN}, #27ae60)`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18, marginBottom: 10 }}>R</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Rajesh Kumar DSA</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>HDFC & ICICI Certified</div>
            <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
              <div style={{ background: "#f0fdf4", color: "#166534", padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>Gold Partner</div>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 8 }}>
            {[["Total Leads", leads.length], ["Disbursed", leads.filter(l => l.status === "Disbursed").length], ["Commission", "₹1.65L"]].map(([l, v]) => (
              <div key={String(l)} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{l}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{v}</span>
              </div>
            ))}
          </div>

          {navItems.map(([id, icon, lbl]) => (
            <button key={id} onClick={() => setTab(id)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 20px", background: tab === id ? "rgba(46,204,113,0.15)" : "transparent", border: "none", borderLeft: tab === id ? `3px solid ${GREEN}` : "3px solid transparent", color: tab === id ? "#fff" : "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: tab === id ? 600 : 400 }}>
              <span>{icon}</span>{lbl}
              {id === "leads" && leads.filter(l => l.status === "New").length > 0 && (
                <span style={{ marginLeft: "auto", background: "#ef4444", color: "#fff", borderRadius: 10, fontSize: 10, padding: "2px 6px", fontWeight: 700 }}>{leads.filter(l => l.status === "New").length}</span>
              )}
            </button>
          ))}
          <div style={{ padding: "20px", marginTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, textDecoration: "none" }}>← Home</Link>
          </div>
        </div>

        <main style={{ flex: 1, padding: 32, background: "#f8fafc", minHeight: "calc(100vh - 68px)", overflowY: "auto" }}>

          {/* ─── LEADS ─── */}
          {tab === "leads" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 4 }}>My Leads</h1>
              <p style={{ color: "#64748b", marginBottom: 24 }}>Manage and track all assigned leads</p>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 28 }}>
                {(["All", "New", "In Process", "Approved", "Disbursed"] as const).map(s => {
                  const count = s === "All" ? leads.length : leads.filter(l => l.status === s).length;
                  return (
                    <button key={s} onClick={() => setFilterStatus(s === "All" ? "" : s)}
                      style={{ background: filterStatus === (s === "All" ? "" : s) ? NAVY : "#fff", border: `1.5px solid ${filterStatus === (s === "All" ? "" : s) ? NAVY : "#e2e8f0"}`, borderRadius: 12, padding: "14px 10px", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.2s" }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: filterStatus === (s === "All" ? "" : s) ? "#fff" : NAVY }}>{count}</div>
                      <div style={{ fontSize: 11, color: filterStatus === (s === "All" ? "" : s) ? "rgba(255,255,255,0.7)" : "#64748b", marginTop: 4 }}>{s}</div>
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <input placeholder="Search by business name or contact..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", background: "#fff" }} />
              </div>

              {/* Lead Cards for New leads */}
              {filteredLeads.filter(l => l.status === "New").length > 0 && !filterStatus && (
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#ef4444", marginBottom: 14 }}>🔴 Action Required — New Leads</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {filteredLeads.filter(l => l.status === "New").map(l => (
                      <div key={l.id} style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.08)", border: "2px solid #fee2e2" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: NAVY }}>{l.business}</div>
                            <div style={{ fontSize: 12, color: "#64748b" }}>{l.name} • {l.city}</div>
                          </div>
                          <div style={{ fontSize: 11, background: "#eff6ff", color: "#1d4ed8", padding: "4px 8px", borderRadius: 8, fontWeight: 700, height: "fit-content" }}>Score: {l.score}</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                          {[["Amount", fmt(l.amount)], ["Type", l.type], ["Turnover", l.turnover], ["Date", l.date]].map(([k, v]) => (
                            <div key={k} style={{ background: "#f8fafc", borderRadius: 8, padding: "6px 10px" }}>
                              <div style={{ fontSize: 10, color: "#94a3b8" }}>{k}</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => updateLead(l.id, { status: "Rejected" })}
                            style={{ flex: 1, padding: "9px", background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fecaca", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                            ✕ Reject
                          </button>
                          <button onClick={() => { setSelectedLead(l); updateLead(l.id, { status: "In Process" }); }}
                            style={{ flex: 2, padding: "9px", background: GREEN, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                            ✓ Accept & Process
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Table */}
              <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Lead", "Amount", "Type", "Score", "Status", "Bank Assigned", "Update Status", "Actions"].map(h => (
                        <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map(l => (
                      <tr key={l.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{l.business}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>{l.name} • {l.city}</div>
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600, color: NAVY }}>{fmt(l.amount)}</td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: "#64748b" }}>{l.type}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: GREEN }}>{l.score}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ background: STATUS_COLORS[l.status] + "22", color: STATUS_COLORS[l.status], padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{l.status}</span>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <select value={l.bank} onChange={e => updateLead(l.id, { bank: e.target.value })}
                            style={{ fontSize: 12, padding: "5px 8px", border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer", color: l.bank ? "#1e293b" : "#94a3b8", maxWidth: 160 }}>
                            <option value="">Assign Bank</option>
                            {BANKS.map(b => <option key={b}>{b}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <select value={l.status} onChange={e => updateLead(l.id, { status: e.target.value as LeadStatus })}
                            style={{ fontSize: 12, padding: "5px 8px", border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer" }}>
                            {(["New", "In Process", "Approved", "Disbursed", "Rejected"] as LeadStatus[]).map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <button onClick={() => setSelectedLead(l)} style={{ padding: "5px 12px", background: "#eff6ff", color: "#1d4ed8", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── COMMISSION ─── */}
          {tab === "commission" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 24 }}>Commission Tracking</h1>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 28 }}>
                {[["Total Earned", "₹1,65,000", "#f0fdf4", "#bbf7d0"], ["This Month", "₹42,000", "#eff6ff", "#bfdbfe"], ["Pending", "₹38,000", "#fef9ee", "#fde68a"], ["Avg / Lead", "₹27,500", "#fdf4ff", "#e9d5ff"]].map(([l, v, bg, border]) => (
                  <div key={l} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 16, padding: 20 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: NAVY }}>{v}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Monthly Performance</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="leads" fill={NAVY} radius={[4, 4, 0, 0]} name="Leads" />
                    <Bar yAxisId="left" dataKey="disbursed" fill={GREEN} radius={[4, 4, 0, 0]} name="Disbursed" />
                    <Bar yAxisId="right" dataKey="commission" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Commission (₹K)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Commission Breakdown</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr style={{ background: "#f8fafc" }}>{["Business", "Disbursed Amount", "Rate", "Commission Earned", "Status"].map(h => <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[...commissions, { business: "PS Exports Pvt.", amount: 20000000, rate: 1.0, earned: 200000, status: "Pending" }].map((c, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 700, color: NAVY }}>{c.business}</td>
                        <td style={{ padding: "12px 12px", fontSize: 13, color: "#64748b" }}>{fmt(c.amount)}</td>
                        <td style={{ padding: "12px 12px", fontSize: 13, color: "#64748b" }}>{c.rate}%</td>
                        <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 700, color: GREEN }}>₹{c.earned.toLocaleString("en-IN")}</td>
                        <td style={{ padding: "12px 12px" }}>
                          <span style={{ background: c.status === "Paid" ? "#dcfce7" : "#fef9c3", color: c.status === "Paid" ? "#166534" : "#854d0e", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── DOCUMENTS ─── */}
          {tab === "documents" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Documents</h1>
              <p style={{ color: "#64748b", marginBottom: 24 }}>Upload your KYC and compliance documents</p>
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", maxWidth: 640 }}>
                {[
                  { name: "DSA Agreement (Signed)", status: "Verified", required: true },
                  { name: "PAN Card", status: "Verified", required: true },
                  { name: "Aadhar Card", status: "Verified", required: true },
                  { name: "Bank Passbook / Cancelled Cheque", status: "Pending", required: true },
                  { name: "AMFI / IRDA Certificate (if applicable)", status: "Pending", required: false },
                  { name: "GST Registration (if applicable)", status: "Pending", required: false },
                  { name: "Office Address Proof", status: "Pending", required: false },
                ].map(d => (
                  <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>📄 {d.name}</span>
                        {d.required && <span style={{ fontSize: 10, background: "#fef2f2", color: "#dc2626", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>REQUIRED</span>}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ background: d.status === "Verified" ? "#dcfce7" : "#fef9c3", color: d.status === "Verified" ? "#166534" : "#854d0e", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{d.status}</span>
                      <button style={{ padding: "6px 14px", background: NAVY, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Upload</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── PROFILE ─── */}
          {tab === "profile" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 24 }}>Partner Profile</h1>
              <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", maxWidth: 560 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  {[["Name", "Rajesh Kumar"], ["Email", "partner@demo.com"], ["Phone", "+91 98765 43210"], ["City", "Delhi NCR"], ["Partner Type", "DSA / Broker"], ["Partner Tier", "Gold"], ["Commission Rate", "1.5%"], ["Affiliated Banks", "HDFC, ICICI"]].map(([l, v]) => (
                    <div key={l}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>{l}</label>
                      <div style={{ fontSize: 14, fontWeight: 600, color: NAVY, padding: "10px 12px", background: "#f8fafc", borderRadius: 8 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => alert("Profile updated!")} style={{ width: "100%", padding: "12px", background: NAVY, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Update Profile</button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setSelectedLead(null)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, maxWidth: 560, width: "100%", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: NAVY }}>{selectedLead.business}</h2>
              <button onClick={() => setSelectedLead(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#94a3b8" }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[["Contact", selectedLead.name], ["Phone", selectedLead.phone], ["PAN", selectedLead.pan], ["City", selectedLead.city], ["Amount", fmt(selectedLead.amount)], ["Type", selectedLead.type], ["Turnover", selectedLead.turnover], ["Lead Score", String(selectedLead.score)]].map(([k, v]) => (
                <div key={k} style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Assign Bank</label>
              <select value={selectedLead.bank} onChange={e => updateLead(selectedLead.id, { bank: e.target.value })}
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, background: "#fff", cursor: "pointer" }}>
                <option value="">Select Bank / NBFC</option>
                {BANKS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Update Status</label>
              <select value={selectedLead.status} onChange={e => updateLead(selectedLead.id, { status: e.target.value as LeadStatus })}
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, background: "#fff" }}>
                {(["New", "In Process", "Approved", "Disbursed", "Rejected"] as LeadStatus[]).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Notes / Remarks</label>
              <textarea value={selectedLead.notes} onChange={e => updateLead(selectedLead.id, { notes: e.target.value })} rows={3}
                placeholder="Add notes about this lead..." style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }} />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => { updateLead(selectedLead.id, { status: "Rejected" }); setSelectedLead(null); }}
                style={{ flex: 1, padding: "11px", background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fecaca", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Reject Lead</button>
              <button onClick={() => setSelectedLead(null)}
                style={{ flex: 2, padding: "11px", background: NAVY, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Save & Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
