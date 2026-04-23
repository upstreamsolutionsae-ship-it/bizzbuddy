"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const NAVY = "#0f2d5e";
const GREEN = "#2ecc71";

const STATUS_COLORS: Record<string, string> = {
  New: "#3b82f6", "In Process": "#f59e0b", Approved: "#10b981", Disbursed: "#8b5cf6", Rejected: "#ef4444"
};
const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  SME: { bg: "#f0fdf4", color: "#166534" },
  INVESTOR: { bg: "#eff6ff", color: "#1d4ed8" },
  CHANNEL_PARTNER: { bg: "#fdf4ff", color: "#7c3aed" },
  ADMIN: { bg: "#fef2f2", color: "#dc2626" },
};

const INITIAL_USERS = [
  { id: "U001", name: "Rahul Kumar", email: "rahul@abc.com", phone: "9876543210", role: "SME", business: "ABC Enterprises", pan: "AABCA1234P", gst: "07AABCA1234P1Z5", status: "Active", joined: "2025-01-05", city: "Delhi" },
  { id: "U002", name: "Priya Singh", email: "priya@psexports.com", phone: "8765432109", role: "SME", business: "PS Exports", pan: "BCDPS5678S", gst: "27BCDPS5678S1Z3", status: "Active", joined: "2025-01-08", city: "Mumbai" },
  { id: "U003", name: "Amit Verma", email: "amit@avmfg.com", phone: "7654321098", role: "SME", business: "AV Manufacturing", pan: "CDEPV9012T", gst: "27CDEPV9012T1Z1", status: "Active", joined: "2025-01-12", city: "Pune" },
  { id: "U004", name: "Rajesh Kumar", email: "rajesh@dsa.com", phone: "6543210987", role: "CHANNEL_PARTNER", business: "Rajesh DSA", pan: "DEFKR3456U", gst: "", status: "Active", joined: "2024-12-20", city: "Delhi" },
  { id: "U005", name: "Ramesh Gupta", email: "ramesh@invest.com", phone: "5432109876", role: "INVESTOR", business: "RG Capital", pan: "EFGRG7890V", gst: "", status: "Active", joined: "2025-02-10", city: "Mumbai" },
  { id: "U006", name: "Suresh Sharma", email: "suresh@sharma.com", phone: "9871234560", role: "SME", business: "Sharma Traders", pan: "FGHSS1234W", gst: "07FGHSS1234W1Z2", status: "Pending", joined: "2025-03-14", city: "Delhi" },
];

const INITIAL_LEADS = [
  { id: "L001", name: "Suresh Sharma", business: "Sharma Traders", amount: 5000000, type: "WC", status: "New", partner: "Unassigned", score: 78, date: "2025-03-14", pan: "FGHSS1234W", gst: "07FGHSS1234W1Z2", duplicate: false },
  { id: "L002", name: "Priya Singh", business: "PS Exports", amount: 20000000, type: "TL", status: "In Process", partner: "Rajesh DSA", score: 85, date: "2025-03-12", pan: "BCDPS5678S", gst: "27BCDPS5678S1Z3", duplicate: false },
  { id: "L003", name: "Amit Verma", business: "AV Manufacturing", amount: 50000000, type: "LAP", status: "Approved", partner: "Priya DSA", score: 90, date: "2025-03-08", pan: "CDEPV9012T", gst: "27CDEPV9012T1Z1", duplicate: false },
  { id: "L004", name: "Kavitha R.", business: "KR Services", amount: 3000000, type: "BL", status: "Disbursed", partner: "Rajesh DSA", score: 82, date: "2025-02-28", pan: "DEFKR3456U", gst: "", duplicate: false },
  { id: "L005", name: "Rahul Kumar", business: "ABC Enterprises", amount: 5000000, type: "WC", status: "New", partner: "Unassigned", score: 78, date: "2025-03-15", pan: "AABCA1234P", gst: "07AABCA1234P1Z5", duplicate: true },
];

const AUDIT_LOGS = [
  { id: "AL001", user: "Rajesh DSA", action: "Lead L002 status updated to In Process", time: "2 min ago", type: "lead", ip: "192.168.1.10" },
  { id: "AL002", user: "System", action: "Duplicate PAN detected: AABCA1234P (L005 vs U001)", time: "15 min ago", type: "security", ip: "system" },
  { id: "AL003", user: "Admin", action: "User U006 approved and activated", time: "1 hr ago", type: "user", ip: "10.0.0.1" },
  { id: "AL004", user: "Priya DSA", action: "Application APP003 marked Disbursed — ₹5 Cr", time: "2 hr ago", type: "lead", ip: "192.168.1.22" },
  { id: "AL005", user: "System", action: "New user registered: Suresh Sharma (SME)", time: "3 hr ago", type: "user", ip: "system" },
  { id: "AL006", user: "Admin", action: "Lead L001 assigned to Rajesh DSA", time: "4 hr ago", type: "lead", ip: "10.0.0.1" },
  { id: "AL007", user: "Ramesh Gupta", action: "EOI submitted for GreenTech Manufacturing", time: "5 hr ago", type: "investor", ip: "192.168.1.45" },
  { id: "AL008", user: "System", action: "Automated lead score calculated for L005: 78", time: "6 hr ago", type: "system", ip: "system" },
];

const monthlyData = [
  { month: "Oct", leads: 18, disbursed: 8, commission: 2.8 },
  { month: "Nov", leads: 22, disbursed: 10, commission: 3.5 },
  { month: "Dec", leads: 28, disbursed: 14, commission: 4.2 },
  { month: "Jan", leads: 35, disbursed: 16, commission: 5.1 },
  { month: "Feb", leads: 42, disbursed: 19, commission: 6.4 },
  { month: "Mar", leads: 47, disbursed: 23, commission: 7.8 },
];

const fmt = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(1)} Cr` : `₹${(n / 100000).toFixed(0)}L`;

export default function AdminDashboard() {
  const [tab, setTab] = useState("overview");
  const [users, setUsers] = useState(INITIAL_USERS);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [userSearch, setUserSearch] = useState("");
  const [leadSearch, setLeadSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState("");

  const filteredUsers = useMemo(() => users.filter(u =>
    (!roleFilter || u.role === roleFilter) &&
    (!userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()) || u.business.toLowerCase().includes(userSearch.toLowerCase()))
  ), [users, roleFilter, userSearch]);

  const filteredLeads = useMemo(() => leads.filter(l =>
    (!leadStatusFilter || l.status === leadStatusFilter) &&
    (!leadSearch || l.business.toLowerCase().includes(leadSearch.toLowerCase()) || l.name.toLowerCase().includes(leadSearch.toLowerCase()))
  ), [leads, leadStatusFilter, leadSearch]);

  const duplicates = leads.filter(l => l.duplicate);

  const navItems = [
    ["overview", "📊", "Overview"],
    ["users", "👥", "Users"],
    ["leads", "📋", "All Leads"],
    ["duplicates", "⚠️", "Duplicates"],
    ["audit", "📜", "Audit Logs"],
    ["reports", "📈", "Reports"],
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ background: NAVY, height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>
          Bizz<span style={{ color: GREEN }}>Buddy</span>{" "}
          <span style={{ fontSize: 12, background: "#ef4444", color: "#fff", padding: "3px 8px", borderRadius: 6, fontWeight: 700, marginLeft: 8 }}>ADMIN</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {duplicates.length > 0 && <span style={{ background: "#fef2f2", color: "#dc2626", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>⚠️ {duplicates.length} Duplicates</span>}
          <Link href="/auth/login" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, textDecoration: "none" }}>Logout</Link>
        </div>
      </nav>

      <div style={{ display: "flex" }}>
        <div style={{ width: 240, background: NAVY, minHeight: "calc(100vh - 68px)", padding: "24px 0", flexShrink: 0 }}>
          <div style={{ padding: "0 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, background: "#ef4444", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16, marginBottom: 8 }}>A</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>Super Admin</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>admin@demo.com</div>
          </div>
          {navItems.map(([id, icon, lbl]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 20px", background: tab === id ? "rgba(239,68,68,0.15)" : "transparent", border: "none", borderLeft: tab === id ? "3px solid #ef4444" : "3px solid transparent", color: tab === id ? "#fff" : "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: tab === id ? 600 : 400 }}>
              <span>{icon}</span>{lbl}
              {id === "duplicates" && duplicates.length > 0 && <span style={{ marginLeft: "auto", background: "#ef4444", color: "#fff", borderRadius: 10, fontSize: 10, padding: "2px 6px", fontWeight: 700 }}>{duplicates.length}</span>}
            </button>
          ))}
        </div>

        <main style={{ flex: 1, padding: 32, background: "#f8fafc", minHeight: "calc(100vh - 68px)", overflowY: "auto" }}>

          {/* ─── OVERVIEW ─── */}
          {tab === "overview" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 24 }}>Admin Overview</h1>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
                {[
                  ["Total Users", String(users.length), "#eff6ff", "#bfdbfe"],
                  ["Active Leads", String(leads.filter(l => l.status !== "Rejected").length), "#f0fdf4", "#bbf7d0"],
                  ["Disbursed", String(leads.filter(l => l.status === "Disbursed").length), "#fdf4ff", "#e9d5ff"],
                  ["Commission Pool", "₹7.8L", "#fef9ee", "#fde68a"],
                ].map(([l, v, bg, border]) => (
                  <div key={l} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 16, padding: 20 }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: NAVY }}>{v}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Monthly Leads & Disbursals</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="leads" fill={NAVY} radius={[4, 4, 0, 0]} name="Leads" />
                      <Bar dataKey="disbursed" fill={GREEN} radius={[4, 4, 0, 0]} name="Disbursed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Commission Trend (₹ Lakhs)</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v: unknown) => `₹${v}L`} />
                      <Line type="monotone" dataKey="commission" stroke={GREEN} strokeWidth={3} dot={{ r: 4, fill: GREEN }} name="Commission" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 16 }}>Recent Activity</h2>
                {AUDIT_LOGS.slice(0, 5).map(log => (
                  <div key={log.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 10 }}>
                      <span style={{ fontSize: 16 }}>{log.type === "security" ? "🔴" : log.type === "user" ? "👤" : log.type === "investor" ? "💼" : "📋"}</span>
                      <div>
                        <div style={{ fontSize: 13, color: "#374151" }}>{log.action}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>by {log.user}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap", marginLeft: 16 }}>{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── USERS ─── */}
          {tab === "users" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY }}>User Management</h1>
                <span style={{ fontSize: 13, color: "#64748b" }}>{filteredUsers.length} users</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <input placeholder="Search by name, email, or business..." value={userSearch} onChange={e => setUserSearch(e.target.value)}
                  style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", background: "#fff" }} />
                <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
                  style={{ padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, background: "#fff", color: roleFilter ? "#1e293b" : "#94a3b8" }}>
                  <option value="">All Roles</option>
                  <option value="SME">SME</option>
                  <option value="INVESTOR">Investor</option>
                  <option value="CHANNEL_PARTNER">Channel Partner</option>
                </select>
              </div>
              <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["User", "Role", "PAN", "GST", "City", "Status", "Joined", "Actions"].map(h => (
                        <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{u.name}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>{u.email}</div>
                          <div style={{ fontSize: 11, color: "#64748b" }}>{u.business}</div>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ background: ROLE_COLORS[u.role].bg, color: ROLE_COLORS[u.role].color, padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{u.role.replace("_", " ")}</span>
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: "#475569", fontFamily: "monospace" }}>{u.pan}</td>
                        <td style={{ padding: "12px 14px", fontSize: 11, color: "#94a3b8" }}>{u.gst || "—"}</td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: "#64748b" }}>{u.city}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ background: u.status === "Active" ? "#dcfce7" : "#fef9c3", color: u.status === "Active" ? "#166534" : "#854d0e", padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{u.status}</span>
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: "#94a3b8" }}>{u.joined}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            {u.status === "Pending" && (
                              <button onClick={() => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: "Active" } : x))}
                                style={{ padding: "4px 10px", background: "#f0fdf4", color: "#166534", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Approve</button>
                            )}
                            <button onClick={() => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: x.status === "Active" ? "Suspended" : "Active" } : x))}
                              style={{ padding: "4px 10px", background: u.status === "Active" ? "#fef2f2" : "#f0fdf4", color: u.status === "Active" ? "#dc2626" : "#166534", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                              {u.status === "Active" ? "Suspend" : "Reactivate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── LEADS ─── */}
          {tab === "leads" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY }}>All Leads</h1>
                <span style={{ fontSize: 13, color: "#64748b" }}>{filteredLeads.length} leads</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <input placeholder="Search leads..." value={leadSearch} onChange={e => setLeadSearch(e.target.value)}
                  style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", background: "#fff" }} />
                <select value={leadStatusFilter} onChange={e => setLeadStatusFilter(e.target.value)}
                  style={{ padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, background: "#fff", color: leadStatusFilter ? "#1e293b" : "#94a3b8" }}>
                  <option value="">All Statuses</option>
                  {["New", "In Process", "Approved", "Disbursed", "Rejected"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Lead", "PAN", "Amount", "Type", "Score", "Status", "Assigned To", "Assign Partner"].map(h => (
                        <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map(l => (
                      <tr key={l.id} style={{ borderBottom: "1px solid #f1f5f9", background: l.duplicate ? "#fef2f2" : "transparent" }}>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{l.business}</div>
                            {l.duplicate && <span style={{ fontSize: 10, background: "#fef2f2", color: "#dc2626", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>DUPLICATE</span>}
                          </div>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>{l.name}</div>
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: "#475569", fontFamily: "monospace" }}>{l.pan}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600, color: NAVY }}>{fmt(l.amount)}</td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: "#64748b" }}>{l.type}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: GREEN }}>{l.score}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ background: STATUS_COLORS[l.status] + "22", color: STATUS_COLORS[l.status], padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{l.status}</span>
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 13, color: l.partner === "Unassigned" ? "#94a3b8" : "#64748b" }}>{l.partner}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <select value={l.partner} onChange={e => setLeads(prev => prev.map(item => item.id === l.id ? { ...item, partner: e.target.value } : item))}
                            style={{ fontSize: 12, padding: "5px 8px", border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer" }}>
                            <option value="Unassigned">Assign Partner</option>
                            <option>Rajesh DSA</option>
                            <option>Priya DSA</option>
                            <option>Amit Finance</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── DUPLICATES ─── */}
          {tab === "duplicates" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Duplicate Detection</h1>
              <p style={{ color: "#64748b", marginBottom: 24 }}>Fuzzy match on PAN, GST, phone number, and business name</p>

              {duplicates.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 16 }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#166534" }}>No duplicates detected</h3>
                </div>
              ) : (
                <div>
                  <div style={{ background: "#fef2f2", border: "1.5px solid #fecaca", borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 13, color: "#dc2626", lineHeight: 1.7 }}>
                    ⚠️ <strong>{duplicates.length} potential duplicate(s) detected</strong> based on PAN/GST matching. Please review and merge or reject the duplicate lead.
                  </div>
                  {duplicates.map(d => {
                    const original = leads.find(l => l.pan === d.pan && !l.duplicate);
                    return (
                      <div key={d.id} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: 16, border: "2px solid #fecaca" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#dc2626" }}>⚠️ Duplicate Lead: {d.business}</h3>
                          <div style={{ display: "flex", gap: 10 }}>
                            <button onClick={() => setLeads(prev => prev.filter(l => l.id !== d.id))}
                              style={{ padding: "7px 16px", background: "#f0fdf4", color: "#166534", border: "1.5px solid #bbf7d0", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                              ✓ Merge & Remove
                            </button>
                            <button onClick={() => setLeads(prev => prev.map(l => l.id === d.id ? { ...l, duplicate: false } : l))}
                              style={{ padding: "7px 16px", background: "#eff6ff", color: "#1d4ed8", border: "1.5px solid #bfdbfe", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                              Keep as Separate
                            </button>
                          </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                          <div style={{ background: "#f8fafc", borderRadius: 10, padding: 16 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 10 }}>EXISTING LEAD</div>
                            {original && [["Lead ID", original.id], ["Business", original.business], ["PAN", original.pan], ["Amount", fmt(original.amount)], ["Status", original.status]].map(([k, v]) => (
                              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 13 }}>
                                <span style={{ color: "#64748b" }}>{k}</span>
                                <span style={{ fontWeight: 600, color: NAVY }}>{v}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{ background: "#fef2f2", borderRadius: 10, padding: 16 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#dc2626", marginBottom: 10 }}>DUPLICATE DETECTED</div>
                            {[["Lead ID", d.id], ["Business", d.business], ["PAN", d.pan], ["Amount", fmt(d.amount)], ["Status", d.status]].map(([k, v]) => (
                              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 13 }}>
                                <span style={{ color: "#64748b" }}>{k}</span>
                                <span style={{ fontWeight: 600, color: "#dc2626" }}>{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div style={{ marginTop: 12, padding: 10, background: "#fef9c3", borderRadius: 8, fontSize: 12, color: "#854d0e" }}>
                          🔍 Match reason: PAN number <strong>{d.pan}</strong> already exists in lead {original?.id}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ─── AUDIT LOGS ─── */}
          {tab === "audit" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Audit Logs</h1>
              <p style={{ color: "#64748b", marginBottom: 24 }}>Complete trail of all system and user actions</p>
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  {[["All", ""], ["Lead", "lead"], ["User", "user"], ["Security", "security"], ["System", "system"]].map(([label, val]) => (
                    <button key={val} style={{ padding: "6px 14px", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#64748b", fontFamily: "'Inter', sans-serif" }}>
                      {label}
                    </button>
                  ))}
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["#", "User", "Action", "Type", "IP Address", "Time"].map(h => (
                        <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {AUDIT_LOGS.map((log, i) => (
                      <tr key={log.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "10px 12px", fontSize: 12, color: "#94a3b8" }}>{i + 1}</td>
                        <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 600, color: NAVY }}>{log.user}</td>
                        <td style={{ padding: "10px 12px", fontSize: 13, color: "#374151" }}>{log.action}</td>
                        <td style={{ padding: "10px 12px" }}>
                          <span style={{ background: log.type === "security" ? "#fef2f2" : log.type === "user" ? "#eff6ff" : log.type === "investor" ? "#fdf4ff" : "#f0fdf4", color: log.type === "security" ? "#dc2626" : log.type === "user" ? "#1d4ed8" : log.type === "investor" ? "#7c3aed" : "#166534", padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                            {log.type}
                          </span>
                        </td>
                        <td style={{ padding: "10px 12px", fontSize: 12, color: "#94a3b8", fontFamily: "monospace" }}>{log.ip}</td>
                        <td style={{ padding: "10px 12px", fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}>{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── REPORTS ─── */}
          {tab === "reports" && (
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 24 }}>Reports & Analytics</h1>

              {/* KPI Summary */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
                {[["Total Loan Disbursed", fmt(leads.filter(l => l.status === "Disbursed").reduce((s, l) => s + l.amount, 0))], ["Conversion Rate", `${Math.round((leads.filter(l => l.status === "Disbursed").length / leads.length) * 100)}%`], ["Avg. Ticket Size", fmt(leads.reduce((s, l) => s + l.amount, 0) / leads.length)]].map(([l, v]) => (
                  <div key={l} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", textAlign: "center" }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: NAVY }}>{v}</div>
                    <div style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[["Monthly Lead Report", "All leads for this month with status, partner, and amount breakdown"], ["Commission Report", "Partner-wise commission summary with paid/pending split"], ["User Activity Report", "Login activity, user registrations, and role distribution"], ["Application Status Report", "Track applications across all status stages"], ["Disbursement Report", "Loan disbursement trends and amount analytics"], ["Duplicate & Fraud Report", "PAN/GST duplicates and flagged applications"]].map(([title, desc]) => (
                  <div key={title} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 8 }}>📊 {title}</h3>
                    <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16, lineHeight: 1.6 }}>{desc}</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => alert(`Generating ${title}...`)} style={{ padding: "8px 16px", background: NAVY, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Download Excel</button>
                      <button onClick={() => alert(`Generating PDF for ${title}...`)} style={{ padding: "8px 16px", background: "#f8fafc", color: NAVY, border: "1.5px solid #e2e8f0", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Download PDF</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
