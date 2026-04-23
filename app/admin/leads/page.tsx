"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

type Lead = {
  id: string;
  name: string;
  phone: string;
  business: string;
  city: string;
  loan: string;
  loanType: string;
  source: string;
  status: string;
  createdAt: string;
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  New: { bg: "#dbeafe", color: "#1d4ed8" },
  "In Process": { bg: "#fef3c7", color: "#b45309" },
  Approved: { bg: "#dcfce7", color: "#15803d" },
  Disbursed: { bg: "#ede9fe", color: "#7c3aed" },
  Rejected: { bg: "#fee2e2", color: "#dc2626" },
};

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads((data.leads || []).reverse());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchLeads();
  };

  const filtered = leads.filter((l) => {
    const matchStatus = filter === "All" || l.status === filter;
    const matchSearch =
      !search ||
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.includes(search) ||
      l.city?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Top bar */}
      <div
        style={{
          background: NAVY,
          padding: "0 5%",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>BizzBuddy Admin — Leads</div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/dashboard/admin" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13 }}>
            Dashboard
          </Link>
          <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13 }}>
            View Site
          </Link>
        </div>
      </div>

      <div style={{ padding: "32px 5%" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 28 }}>
          {["All", ...Object.keys(STATUS_COLORS)].map((s) => {
            const count = s === "All" ? leads.length : leads.filter((l) => l.status === s).length;
            const sc = s === "All" ? { bg: "#e0eeff", color: NAVY } : STATUS_COLORS[s];
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  background: filter === s ? sc.bg : "#fff",
                  border: `2px solid ${filter === s ? sc.color : "#e2e8f0"}`,
                  borderRadius: 12,
                  padding: "14px 16px",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 900, color: sc.color }}>{count}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>{s}</div>
              </button>
            );
          })}
        </div>

        {/* Search + refresh */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
          <input
            placeholder="Search by name, phone, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "1.5px solid #e2e8f0",
              borderRadius: 8,
              fontSize: 14,
              fontFamily: "'Inter', sans-serif",
              outline: "none",
            }}
          />
          <button
            onClick={fetchLeads}
            style={{
              background: NAVY,
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Refresh
          </button>
        </div>

        {/* Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: "48px", textAlign: "center", color: "#94a3b8" }}>Loading leads...</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center", color: "#94a3b8" }}>
              No leads found. Submit a form on the website to see leads here.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  {["ID", "Date", "Name", "Phone", "Business", "City", "Loan Amt", "Loan Type", "Source", "Status", "Action"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 14px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => {
                  const sc = STATUS_COLORS[lead.status] || STATUS_COLORS["New"];
                  return (
                    <tr
                      key={lead.id}
                      style={{ borderBottom: "1px solid #f1f5f9" }}
                    >
                      <td style={{ padding: "12px 14px", fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>{lead.id}</td>
                      <td style={{ padding: "12px 14px", fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })}
                      </td>
                      <td style={{ padding: "12px 14px", fontSize: 14, fontWeight: 600, color: NAVY }}>{lead.name}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{lead.phone}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{lead.business || "—"}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{lead.city || "—"}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{lead.loan || "—"}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{lead.loanType || "—"}</td>
                      <td style={{ padding: "12px 14px", fontSize: 12, color: "#64748b" }}>{lead.source}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span
                          style={{
                            background: sc.bg,
                            color: sc.color,
                            padding: "4px 10px",
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                          style={{
                            padding: "5px 10px",
                            border: "1px solid #e2e8f0",
                            borderRadius: 6,
                            fontSize: 12,
                            fontFamily: "'Inter', sans-serif",
                            cursor: "pointer",
                            color: BLUE,
                            fontWeight: 600,
                          }}
                        >
                          {Object.keys(STATUS_COLORS).map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: "#94a3b8" }}>
          Showing {filtered.length} of {leads.length} leads • Admin route: <code>/admin/leads</code>
        </div>
      </div>
    </div>
  );
}
