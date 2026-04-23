"use client";
import Link from "next/link";
import { useState } from "react";

const NAVY = "#0f2d5e";
const GREEN = "#2ecc71";

export default function SolutionsPage() {
  const [form, setForm] = useState({ name: "", phone: "", business: "", city: "", loan: "", type: "" });
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setDone(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ background: NAVY, padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Link href="/" style={{ textDecoration: "none" }}><span style={{ fontWeight: 800, fontSize: 20, color: "#fff" }}>Bizz<span style={{ color: GREEN }}>Buddy</span></span></Link>
        <Link href="/auth/login" style={{ background: GREEN, color: "#fff", padding: "9px 20px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Login</Link>
      </nav>

      <section style={{ background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, padding: "60px 5%", textAlign: "center" }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", marginBottom: 12 }}>MSME Financial Solutions</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>Comprehensive debt and equity solutions for every stage of business growth</p>
      </section>

      {/* LOAN TYPES */}
      <section style={{ padding: "60px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: NAVY, marginBottom: 8, textAlign: "center" }}>Debt Solutions</h2>
          <p style={{ color: "#64748b", textAlign: "center", marginBottom: 40 }}>Secured & unsecured financing options for all business needs</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { icon: "⚡", title: "Working Capital Loan", desc: "Short-term funding to manage day-to-day operations, inventory, and receivables", range: "₹5L – ₹5Cr", time: "3–7 days" },
              { icon: "🏛️", title: "Term Loan", desc: "Long-term funding for business expansion, machinery purchase, and infrastructure", range: "₹25L – ₹50Cr", time: "7–14 days" },
              { icon: "🏠", title: "Loan Against Property (LAP)", desc: "Unlock the value of your commercial or residential property for business growth", range: "₹50L – ₹100Cr", time: "10–20 days" },
              { icon: "🔄", title: "Cash Credit / OD", desc: "Revolving credit limit against collateral or current assets for ongoing working capital", range: "₹10L – ₹25Cr", time: "7–14 days" },
              { icon: "🛡️", title: "Bank Guarantee / LC", desc: "Non-fund based facilities to support trade, tenders, and import/export transactions", range: "₹5L – ₹50Cr", time: "5–10 days" },
              { icon: "📦", title: "Inventory Finance", desc: "Finance against warehouse receipts, inventory pledges, and supply chain financing", range: "₹25L – ₹20Cr", time: "5–10 days" },
            ].map(s => (
              <div key={s.title} style={{ border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: NAVY, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>{s.desc}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ background: "#eff6ff", color: "#1d4ed8", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>Upto {s.range}</span>
                  <span style={{ background: "#f0fdf4", color: "#166534", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section style={{ background: "#f8fafc", padding: "60px 5%" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: NAVY, textAlign: "center", marginBottom: 8 }}>Apply Now</h2>
          <p style={{ color: "#64748b", textAlign: "center", marginBottom: 32 }}>Tell us your requirement and we&apos;ll get back within 2 hours</p>
          {done ? (
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 32, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY }}>Application Submitted!</h3>
              <p style={{ color: "#64748b", marginTop: 8 }}>Our advisor will contact you within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: 14 }}>
              {([["name", "text", "Full Name *", true], ["phone", "tel", "Mobile Number *", true], ["business", "text", "Business Name", false], ["city", "text", "City", false]] as [keyof typeof form, string, string, boolean][]).map(([name, type, ph, req]) => (
                <input key={name} type={type} placeholder={ph} required={req} value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))} style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif" }} />
              ))}
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                <option value="">Type of Loan</option>
                {["Working Capital", "Term Loan", "LAP", "Cash Credit / OD", "Bank Guarantee / LC", "Equity Funding"].map(o => <option key={o}>{o}</option>)}
              </select>
              <select value={form.loan} onChange={e => setForm(p => ({ ...p, loan: e.target.value }))} style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                <option value="">Loan Requirement</option>
                {["Under ₹25L", "₹25L–₹1Cr", "₹1Cr–₹5Cr", "₹5Cr–₹25Cr", "₹25Cr+"].map(o => <option key={o}>{o}</option>)}
              </select>
              <button type="submit" style={{ padding: "14px", background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Submit Application →</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
