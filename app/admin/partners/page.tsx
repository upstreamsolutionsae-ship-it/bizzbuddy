"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

type Partner = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  partnerType?: string;
  city?: string;
  experience?: string;
  source?: string;
  status: string;
  createdAt: string;
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  New: { bg: "#dbeafe", color: "#1d4ed8" },
  Contacted: { bg: "#fef3c7", color: "#b45309" },
  Onboarded: { bg: "#dcfce7", color: "#15803d" },
  Active: { bg: "#ede9fe", color: "#7c3aed" },
  Rejected: { bg: "#fee2e2", color: "#dc2626" },
};

export default function PartnersAdminPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchPartners = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/partners");
      const data = await res.json();
      setPartners((data.partners || []).reverse());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/partners", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchPartners();
  };

  const types = Array.from(
    new Set(partners.map((p) => p.partnerType).filter(Boolean) as string[])
  ).sort();

  const filtered = partners.filter((p) => {
    const matchStatus = filter === "All" || p.status === filter;
    const matchType = typeFilter === "All" || p.partnerType === typeFilter;
    const matchSearch =
      !search ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.phone?.includes(search) ||
      (p.city || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.partnerType || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchType && matchSearch;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Top bar */}
      <div style={{ background: NAVY, padding: "0 5%", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>BizzBuddy Admin — Channel Partners</div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/admin/leads" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13 }}>Leads</Link>
          <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13 }}>View Site</Link>
        </div>
      </div>

      <div style={{ padding: "32px 5%" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, marginBottom: 28 }}>
          {["All", ...Object.keys(STATUS_COLORS)].map((s) => {
            const count = s === "All" ? partners.length : partners.filter((p) => p.status === s).length;
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

        {/* Search + filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
          <input
            placeholder="Search by name, phone, city, type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: "10px 16px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }}
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", color: NAVY, fontWeight: 600, cursor: "pointer" }}
          >
            <option value="All">All Partner Types</option>
            {types.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
          <button
            onClick={fetchPartners}
            style={{ background: NAVY, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
          >
            Refresh
          </button>
        </div>

        {/* Table */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "48px", textAlign: "center", color: "#94a3b8" }}>Loading partners...</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center", color: "#94a3b8" }}>
              No partner registrations yet. Submit the form on /become-our-partner to see them here.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  {["ID", "Date", "Name", "Phone", "Email", "Partner Type", "City", "Experience", "Status", "Action"].map((h) => (
                    <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const sc = STATUS_COLORS[p.status] || STATUS_COLORS["New"];
                  return (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>{p.id}</td>
                      <td style={{ padding: "12px 14px", fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>
                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" }) : "—"}
                      </td>
                      <td style={{ padding: "12px 14px", fontSize: 14, fontWeight: 600, color: NAVY }}>{p.name}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{p.phone}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{p.email || "—"}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ background: "#eef2ff", color: "#4338ca", padding: "3px 9px", borderRadius: 16, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                          {p.partnerType || "—"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{p.city || "—"}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{p.experience || "—"}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ background: sc.bg, color: sc.color, padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <select
                          value={p.status}
                          onChange={(e) => updateStatus(p.id, e.target.value)}
                          style={{ padding: "5px 10px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 12, fontFamily: "'Inter', sans-serif", cursor: "pointer", color: BLUE, fontWeight: 600 }}
                        >
                          {Object.keys(STATUS_COLORS).map((s) => (<option key={s} value={s}>{s}</option>))}
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
          Showing {filtered.length} of {partners.length} partners • Admin route: <code>/admin/partners</code>
        </div>
      </div>
    </div>
  );
}
