"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

const FOOTER_CONTACT = {
  address: "305, 3rd Floor, Suneja Tower 1, Janakpuri District Center, Janakpuri West, New Delhi 110078",
  phones: ["+91 9910850208", "+91 9899630125"],
  email: "sdmfintechconsultants@gmail.com",
};

const SCORE_RANGES = [
  { range: "750 – 900", label: "Excellent", desc: "Best loan rates. Fast approvals. Most lenders welcome you.", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
  { range: "700 – 749", label: "Good", desc: "Good approval chances with competitive interest rates.", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  { range: "650 – 699", label: "Fair", desc: "Approvals possible, but rates may be higher. Improvement recommended.", color: "#b45309", bg: "#fef9ee", border: "#fde68a" },
  { range: "600 – 649", label: "Poor", desc: "Limited lender options. Work on improving score before applying.", color: "#c2410c", bg: "#fff7ed", border: "#fed7aa" },
  { range: "Below 600", label: "Very Poor", desc: "Most lenders will decline. Requires credit repair first.", color: "#dc2626", bg: "#fee2e2", border: "#fca5a5" },
];

const TIPS = [
  { icon: "💳", tip: "Pay all EMIs and credit card bills on time — even a single missed payment hurts your score." },
  { icon: "📊", tip: "Keep your credit utilization below 30% — if limit is ₹1 Lakh, use under ₹30,000." },
  { icon: "🚫", tip: "Avoid applying for multiple loans/credit cards simultaneously — each inquiry reduces score." },
  { icon: "🔍", tip: "Check your credit report regularly and dispute any incorrect information immediately." },
  { icon: "📅", tip: "Maintain old credit accounts — longer credit history improves your score over time." },
  { icon: "🎯", tip: "Diversify your credit mix — a combination of secured and unsecured credit is viewed positively." },
];

export default function CreditReportPage() {
  const [form, setForm] = useState({ name: "", phone: "", pan: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, loanType: "Credit Report Request", source: "credit-report-page" }),
    });
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Credit Report</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "64px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "#fff", padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, marginBottom: 20, border: "1px solid rgba(255,255,255,0.2)", letterSpacing: 1 }}>
              FREE CREDIT HEALTH CHECK
            </div>
            <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>
              Know Your Credit Score
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 32 }}>
              Your CIBIL/credit score determines your loan eligibility and interest rate. Check your credit health for free and get expert advice on improving it.
            </p>
            <div style={{ display: "flex", gap: 32 }}>
              {[["Free", "Report Request"], ["Expert", "Score Analysis"], ["90 Days", "Improvement Plan"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#93c5fd" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 64, height: 64, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Request Received!</h3>
                <p style={{ color: "#64748b", fontSize: 14 }}>Our credit expert will contact you within 24 hours with your free credit health report and improvement recommendations.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Get Free Credit Report</h3>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Our expert will analyse and share insights within 24 hours</p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input placeholder="Your Full Name *" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }} />
                  <input type="tel" placeholder="Mobile Number *" required value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }} />
                  <input placeholder="PAN Number (optional, for accurate report)" value={form.pan} onChange={(e) => setForm((p) => ({ ...p, pan: e.target.value.toUpperCase() }))} maxLength={10} style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }} />
                  <button type="submit" style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", marginTop: 4 }}>
                    Get Free Credit Report →
                  </button>
                </form>
                <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>🔒 Your data is secure. No hard inquiry on your credit.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Score Ranges */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>Understanding Your Credit Score</h2>
            <p style={{ color: "#64748b", fontSize: 16, marginTop: 10 }}>CIBIL scores range from 300 to 900. Higher is better.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {SCORE_RANGES.map((s) => (
              <div key={s.label} style={{ background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: 14, padding: "20px 28px", display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ minWidth: 110, textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.range}</div>
                </div>
                <div style={{ background: s.color, color: "#fff", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.label}</div>
                <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section style={{ padding: "72px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>How to Improve Your Credit Score</h2>
            <p style={{ color: "#64748b", fontSize: 16, marginTop: 10 }}>Follow these expert tips to improve your score in 90–180 days</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {TIPS.map((t) => (
              <div key={t.tip} style={{ background: "#f0f7ff", borderRadius: 16, padding: 24, border: "1.5px solid #bfdbfe" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{t.icon}</div>
                <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7 }}>{t.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "64px 5%", textAlign: "center" }}>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Ready to Improve Your Credit Score?</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>Our experts help you create a personalised credit improvement plan</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <Link href="/contact" style={{ background: "#fff", color: NAVY, padding: "13px 32px", borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: "none" }}>Talk to an Expert</Link>
          <Link href="/tools/eligibility" style={{ background: "transparent", color: "#fff", padding: "13px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", border: "2px solid rgba(255,255,255,0.35)" }}>Check Loan Eligibility</Link>
        </div>
      </section>

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
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 24, paddingTop: 16, fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
          © 2025 BizzBuddy by SDM Fintech. All rights reserved.
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="gridTemplateColumns: repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
