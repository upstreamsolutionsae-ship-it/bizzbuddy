"use client";
import Link from "next/link";
import { useState } from "react";

const NAVY = "#0f2d5e";
const GREEN = "#2ecc71";

export default function InvestorPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", ticket: "" });
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, leadType: "INVESTOR" }) });
    setDone(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ background: NAVY, padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Link href="/" style={{ textDecoration: "none" }}><span style={{ fontWeight: 800, fontSize: 20, color: "#fff" }}>Bizz<span style={{ color: GREEN }}>Buddy</span></span></Link>
        <Link href="/auth/login" style={{ background: GREEN, color: "#fff", padding: "9px 20px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Login / Register</Link>
      </nav>

      <section style={{ background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, padding: "60px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(46,204,113,0.2)", color: GREEN, padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 16 }}>INVESTOR PLATFORM — PHASE 2 READY</div>
            <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>Invest in India&apos;s Growing<br /><span style={{ color: GREEN }}>MSME Ecosystem</span></h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>Deploy capital into vetted, growing MSMEs through debt and equity instruments. Curated opportunities with full due diligence support.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {[["14–20%", "Target IRR"], ["₹25L+", "Min. Ticket"], ["60+ Days", "Avg. Deal Closure"]].map(([v, l]) => (
                <div key={l}><div style={{ fontSize: 22, fontWeight: 900, color: GREEN }}>{v}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{l}</div></div>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 20, padding: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 6 }}>Register as Investor</h3>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Get curated MSME investment opportunities</p>
            {done ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <h3 style={{ color: NAVY, fontWeight: 800 }}>Registered!</h3>
                <p style={{ color: "#64748b", fontSize: 13, marginTop: 8 }}>Our investment team will reach out within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {([["name", "text", "Full Name *", true], ["email", "email", "Email Address *", true], ["phone", "tel", "Mobile *", true]] as [keyof typeof form, string, string, boolean][]).map(([name, type, ph, req]) => (
                  <input key={name} type={type} placeholder={ph} required={req} value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))} style={{ padding: "11px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "'Inter', sans-serif" }} />
                ))}
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} style={{ padding: "11px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                  <option value="">Investor Type</option>
                  {["HNI / Individual", "Family Office", "Angel Investor", "PE / VC Fund", "Corporate"].map(o => <option key={o}>{o}</option>)}
                </select>
                <select value={form.ticket} onChange={e => setForm(p => ({ ...p, ticket: e.target.value }))} style={{ padding: "11px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                  <option value="">Investment Ticket Size</option>
                  {["₹25L–₹1Cr", "₹1Cr–₹5Cr", "₹5Cr–₹25Cr", "₹25Cr+"].map(o => <option key={o}>{o}</option>)}
                </select>
                <button type="submit" style={{ padding: "13px", background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Get Curated Opportunities →</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: NAVY, textAlign: "center", marginBottom: 40 }}>Investment Categories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "📊", title: "Non-listed Equity", desc: "Invest in high-growth MSMEs pre-IPO. Expected IRR: 18–25%", tag: "Available" },
              { icon: "📜", title: "Non-listed Debt", desc: "Secured and unsecured debt instruments with 12–16% returns", tag: "Available" },
              { icon: "📈", title: "Listed Equity", desc: "SME IPO and listed equity via our broker network", tag: "Coming Soon" },
              { icon: "🏦", title: "Listed Debt", desc: "Corporate bonds and debentures from growing companies", tag: "Coming Soon" },
              { icon: "🌱", title: "Mutual Funds", desc: "MSME-focused debt mutual funds via registered AMCs", tag: "Redirect" },
              { icon: "🤝", title: "Co-lending", desc: "Participate alongside banks in MSME loans", tag: "Coming Soon" },
            ].map(c => (
              <div key={c.title} style={{ border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{c.icon}</span>
                  <span style={{ background: c.tag === "Available" ? "#f0fdf4" : "#f8fafc", color: c.tag === "Available" ? "#166534" : "#94a3b8", padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{c.tag}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 6 }}>{c.title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
