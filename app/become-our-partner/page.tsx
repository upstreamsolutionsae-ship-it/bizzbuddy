"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

const FOOTER_CONTACT = {
  address: "305, 3rd Floor, Suneja Tower 1, Janakpuri District Center, Janakpuri West, New Delhi 110078",
  phones: ["+91 9910850208", "+91 9899630125", "+91 9217541553", "+91 9413823781"],
  email: "sdmfintechconsultants@gmail.com",
};

const BENEFITS = [
  { icon: "⚡", title: "Lightning-Fast Payouts", desc: "Ultra-fast payout processing powered by secure infrastructure. Zero delays, zero friction, complete peace of mind." },
  { icon: "🎯", title: "Expert-Led Solutions", desc: "Work with seasoned professionals. Tailored financial solutions designed for efficiency, accuracy, and long-term success." },
  { icon: "🔍", title: "Complete Transparency", desc: "No surprises, no hidden costs. Real-time visibility, clear terms, and payouts you can track every step of the way." },
  { icon: "🤖", title: "AI-Powered Engine", desc: "Cutting-edge ML and AI for lightning-fast, highly accurate decisioning. Minimize errors, optimize outcomes at scale." },
  { icon: "🌐", title: "Pan-India Network", desc: "Access to 50+ lenders across India. Maximum approval chances for every client you refer." },
  { icon: "📊", title: "Real-time Dashboard", desc: "Track all your referrals, approvals, and payouts in real-time through your dedicated partner dashboard." },
];

const STEPS = [
  { step: "01", title: "Register as Partner", desc: "Fill the simple registration form below. Our team verifies and onboards you within 24 hours." },
  { step: "02", title: "Refer Your Clients", desc: "Refer MSMEs, individuals, or businesses who need loans, insurance, or financial advisory." },
  { step: "03", title: "We Handle the Rest", desc: "Our experts process the application end-to-end — you just track progress on your dashboard." },
  { step: "04", title: "Earn Your Payout", desc: "Receive your commission directly in your bank account within days of disbursement." },
];

const PARTNER_TYPES = [
  { icon: "🤝", title: "DSA / Loan Agent", desc: "Refer loan clients and earn commission on every successful disbursement." },
  { icon: "🏢", title: "CA / Tax Consultant", desc: "Offer complete financial solutions to your clients — loans, investments, and advisory." },
  { icon: "🏦", title: "Bank / NBFC Rejects", desc: "Refer clients who were rejected elsewhere. We find alternative lenders for them." },
  { icon: "👔", title: "Real Estate Agent", desc: "Help your property buyers get the best home loan deals through BizzBuddy." },
];

export default function BecomePartnerPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", partnerType: "", city: "", experience: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, loanType: `Partner: ${form.partnerType}`, source: "partner-page" }),
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
          <span style={{ color: "#374151", fontWeight: 600 }}>Become Our Partner</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3f7a 55%, ${BLUE} 100%)`, padding: "64px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "#fff", padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, marginBottom: 20, border: "1px solid rgba(255,255,255,0.2)", letterSpacing: 1 }}>
              CHANNEL PARTNER PROGRAM
            </div>
            <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>
              Grow Your Income with BizzBuddy
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 32 }}>
              Join our growing network of DSAs, consultants, and agents. Refer clients, earn commissions, and build a sustainable income stream — backed by India's trusted MSME finance platform.
            </p>
            <div style={{ display: "flex", gap: 32 }}>
              {[["500+", "Active Partners"], ["₹10Cr+", "Payouts Made"], ["48 Hrs", "Fast Commission"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#93c5fd" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 64, height: 64, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Application Received!</h3>
                <p style={{ color: "#64748b", fontSize: 14 }}>Our partner team will contact you within 24 hours to complete onboarding.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Partner Registration</h3>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Join free — no upfront investment required</p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input placeholder="Your Full Name *" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }} />
                  <input type="tel" placeholder="Mobile Number *" required value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }} />
                  <input type="email" placeholder="Email Address *" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }} />
                  <select value={form.partnerType} onChange={(e) => setForm((p) => ({ ...p, partnerType: e.target.value }))} required style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: form.partnerType ? "#1a202c" : "#9ca3af", fontFamily: "'Inter', sans-serif" }}>
                    <option value="">Type of Partner *</option>
                    {["DSA / Loan Agent", "CA / Tax Consultant", "Real Estate Agent", "Financial Advisor", "Bank / NBFC Agent", "Other"].map((o) => (<option key={o}>{o}</option>))}
                  </select>
                  <input placeholder="City" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none" }} />
                  <select value={form.experience} onChange={(e) => setForm((p) => ({ ...p, experience: e.target.value }))} style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: form.experience ? "#1a202c" : "#9ca3af", fontFamily: "'Inter', sans-serif" }}>
                    <option value="">Years of Experience</option>
                    {["0–1 Years", "1–3 Years", "3–5 Years", "5–10 Years", "10+ Years"].map((o) => (<option key={o}>{o}</option>))}
                  </select>
                  <button type="submit" style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", marginTop: 4 }}>
                    Register as Partner →
                  </button>
                </form>
                <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>🔒 Your information is secure and confidential</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>Who Can Partner with Us?</h2>
            <p style={{ color: "#64748b", fontSize: 16, marginTop: 10 }}>We welcome professionals from all financial and allied sectors</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
            {PARTNER_TYPES.map((pt) => (
              <div key={pt.title} style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1.5px solid #dbeafe", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{pt.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 10 }}>{pt.title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "72px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>Why Partner with BizzBuddy?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {BENEFITS.map((b) => (
              <div key={b.title} style={{ background: "#f0f7ff", borderRadius: 16, padding: 28, border: "1.5px solid #bfdbfe" }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{b.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, marginBottom: 10 }}>{b.title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY, marginBottom: 12 }}>How to Get Started</h2>
          <p style={{ color: "#64748b", fontSize: 16, marginBottom: 48 }}>4 simple steps to start earning with BizzBuddy</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {STEPS.map((s) => (
              <div key={s.step} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1.5px solid #dbeafe" }}>
                <div style={{ width: 48, height: 48, background: NAVY, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18, margin: "0 auto 16px" }}>{s.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: NAVY, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
          section > div[style*="gridTemplateColumns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
          section > div[style*="gridTemplateColumns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
