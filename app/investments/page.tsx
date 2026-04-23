"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

const FOOTER_CONTACT = {
  address: "305, 3rd Floor, Suneja Tower 1, Janakpuri District Center, Janakpuri West, New Delhi 110078",
  phones: ["+91 9910850208", "+91 9899630125"],
  email: "sdmfintechconsultants@gmail.com",
};

const PRODUCTS = [
  {
    id: "mutual-funds",
    icon: "📈",
    title: "Mutual Funds",
    tagline: "Grow your wealth through professionally managed funds",
    desc: "Invest in equity, debt, hybrid, or liquid funds. Get expert guidance on fund selection based on your goals and risk appetite.",
    features: ["SIP starting ₹500/month", "3000+ fund options", "Expert-guided selection", "Tax-saving ELSS options"],
    color: "#eff6ff",
    border: "#bfdbfe",
    accent: BLUE,
  },
  {
    id: "fixed-deposits",
    icon: "🔒",
    title: "Fixed Deposits",
    tagline: "Safe, guaranteed returns for your idle cash",
    desc: "Compare FD rates from leading banks and NBFCs. Book the highest-yielding FDs with full safety and flexibility.",
    features: ["Up to 8.5% p.a. returns", "7 days to 10 year tenure", "Senior citizen extra rate", "TDS management support"],
    color: "#f0fdf4",
    border: "#bbf7d0",
    accent: "#15803d",
  },
  {
    id: "insurance",
    icon: "🛡️",
    title: "Insurance Plans",
    tagline: "Protect your family, health, and assets",
    desc: "Life insurance, health insurance, term plans, and ULIP solutions from leading insurers — compare and buy with expert advice.",
    features: ["Term plans from ₹500/month", "Health cover for family", "ULIP investment + insurance", "Claim assistance support"],
    color: "#fdf4ff",
    border: "#e9d5ff",
    accent: "#7c3aed",
  },
  {
    id: "portfolio",
    icon: "💼",
    title: "Portfolio Management",
    tagline: "Holistic wealth management for growth",
    desc: "Comprehensive portfolio review, asset allocation advice, and goal-based planning for individuals and HNIs.",
    features: ["Goal-based planning", "Asset allocation advice", "Portfolio review & rebalancing", "Tax-efficient structuring"],
    color: "#fef9ee",
    border: "#fde68a",
    accent: "#b45309",
  },
];

export default function InvestmentsPage() {
  const [activeTab, setActiveTab] = useState("mutual-funds");
  const [form, setForm] = useState({ name: "", phone: "", interest: "", amount: "" });
  const [submitted, setSubmitted] = useState(false);

  const active = PRODUCTS.find((p) => p.id === activeTab) || PRODUCTS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, loanType: `Investment: ${active.title}`, source: "investments-page" }),
    });
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Investments / Insurance</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3f7a 55%, ${BLUE} 100%)`, padding: "64px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: 44, fontWeight: 900, color: "#fff", marginBottom: 16 }}>
            Investments & Insurance
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", maxWidth: 600, margin: "0 auto" }}>
            Grow your wealth, protect your future. Expert-guided investment and insurance solutions for individuals and businesses.
          </p>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Tab row */}
          <div style={{ display: "flex", gap: 10, overflowX: "auto", marginBottom: 36, justifyContent: "center", flexWrap: "wrap" }}>
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                style={{
                  padding: "10px 22px",
                  borderRadius: 50,
                  border: `2px solid ${p.id === activeTab ? p.accent : "#e2e8f0"}`,
                  background: p.id === activeTab ? p.color : "#fff",
                  color: p.id === activeTab ? p.accent : "#64748b",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {p.icon} {p.title}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div
              style={{
                background: active.color,
                border: `2px solid ${active.border}`,
                borderRadius: 24,
                padding: "44px 40px",
              }}
            >
              <div style={{ fontSize: 56, marginBottom: 16 }}>{active.icon}</div>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: active.accent, marginBottom: 12 }}>{active.title}</h2>
              <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>{active.desc}</p>
              <div>
                {active.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: NAVY, fontWeight: 600 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: active.accent, flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Interest form */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 36, border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 64, height: 64, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>✅</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Thank You!</h3>
                  <p style={{ color: "#64748b", fontSize: 14 }}>Our investment advisor will contact you within 2 hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 4 }}>
                    Get Expert Advice on {active.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Free consultation — no hidden charges</p>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <input
                      placeholder="Your Full Name *"
                      required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }}
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number *"
                      required
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }}
                    />
                    <select
                      value={form.interest}
                      onChange={(e) => setForm((p) => ({ ...p, interest: e.target.value }))}
                      style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: form.interest ? "#1a202c" : "#9ca3af", fontFamily: "'Inter', sans-serif" }}
                    >
                      <option value="">Investment Goal</option>
                      {["Wealth Creation", "Retirement Planning", "Children's Education", "Tax Saving", "Emergency Fund", "Other"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <select
                      value={form.amount}
                      onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
                      style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: form.amount ? "#1a202c" : "#9ca3af", fontFamily: "'Inter', sans-serif" }}
                    >
                      <option value="">Investment Amount (approx.)</option>
                      {["Under ₹1 Lakh", "₹1–5 Lakh", "₹5–25 Lakh", "₹25 Lakh–1 Cr", "₹1 Cr+"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      style={{
                        background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`,
                        color: "#fff",
                        padding: "13px",
                        borderRadius: 10,
                        fontWeight: 700,
                        fontSize: 15,
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                        marginTop: 4,
                      }}
                    >
                      Get Free Consultation →
                    </button>
                  </form>
                  <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>🔒 100% Confidential • No spam</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.7)", padding: "36px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 6 }}>BizzBuddy</div>
            <div style={{ fontSize: 12 }}>📍 {FOOTER_CONTACT.address}</div>
          </div>
          <div>
            {FOOTER_CONTACT.phones.map((p) => (<div key={p} style={{ fontSize: 13, marginBottom: 6 }}>📞 {p}</div>))}
            <div style={{ fontSize: 13 }}>📧 {FOOTER_CONTACT.email}</div>
          </div>
          <div>
            <Link href="/" style={{ display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13, marginBottom: 8 }}>Home</Link>
            <Link href="/contact" style={{ display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Contact Us</Link>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 24, paddingTop: 16, fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
          © 2025 BizzBuddy by SDM Fintech. All rights reserved.
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          section > div > div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
