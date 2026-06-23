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

const WHO_IS_IT_FOR = [
  { icon: "🚀", title: "Early-stage Startups", desc: "Validate, build, and scale with capital from angels and early-stage investors who back your vision." },
  { icon: "📈", title: "Growth-stage MSMEs", desc: "Fuel expansion, hiring, and new markets with growth capital from PE funds and strategic investors." },
  { icon: "🎯", title: "Founders Seeking Strategic Investors", desc: "Find investors who bring more than money — mentorship, networks, and industry expertise." },
  { icon: "💼", title: "Businesses Needing Growth Capital Without Debt", desc: "Raise funds without the burden of fixed EMIs or collateral — equity keeps your cash flow free." },
];

const BENEFITS = [
  { icon: "🤝", title: "Access to Vetted Investor Network", desc: "Tap into our curated network of angel investors, PE funds, and family offices actively looking to deploy capital." },
  { icon: "📊", title: "Investor-Ready Financial Summaries", desc: "We turn your financials into clean, professional summaries that investors actually want to read." },
  { icon: "💳", title: "No Fixed EMI / Non-Debt Capital", desc: "Raise growth capital without monthly repayments — equity funding keeps your operations cash-light." },
  { icon: "🧭", title: "Strategic Mentorship & Connections", desc: "Beyond capital, get access to mentors and strategic connections that accelerate your growth." },
  { icon: "🔒", title: "Confidential Process", desc: "Your business data and discussions stay private — we share details only with relevant, vetted investors." },
  { icon: "⚖️", title: "Valuation Guidance", desc: "Get expert help understanding and negotiating a fair valuation that works for you and your investors." },
];

const STEPS = [
  { step: "01", title: "Share Your Details", desc: "Fill the form with your business and funding requirement. It takes less than 2 minutes." },
  { step: "02", title: "We Prepare Investor Summary", desc: "Our team builds an investor-ready summary from your financials and business profile." },
  { step: "03", title: "Matched With Relevant Investors", desc: "We connect you with angels, PE funds, and family offices aligned to your stage and sector." },
  { step: "04", title: "Negotiation & Closure Support", desc: "We support you through valuation, negotiation, and closing — end-to-end." },
];

const FUNDING_OPTIONS = ["Under ₹50 Lakh", "₹50 Lakh – ₹2 Cr", "₹2 Cr – ₹10 Cr", "₹10 Cr – ₹50 Cr", "₹50 Cr+"];

const ACCENT = BLUE;
const ACCENT_BG = "#eff6ff";
const ACCENT_BORDER = "#bfdbfe";

type EquityForm = {
  name: string;
  phone: string;
  email: string;
  business: string;
  location: string;
  fundingRequirement: string;
  description: string;
  financials: string;
};

export default function RaiseEquityPage() {
  const [form, setForm] = useState<EquityForm>({
    name: "",
    phone: "",
    email: "",
    business: "",
    location: "",
    fundingRequirement: "",
    description: "",
    financials: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (name: keyof EquityForm, value: string) => setForm((p) => ({ ...p, [name]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        business: form.business,
        city: form.location,
        loan: form.fundingRequirement,
        category: "Raise Equity",
        details: `${form.description} | Financials available: ${form.financials}`,
        source: "raise-equity-page",
      }),
    });
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    padding: "11px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    width: "100%",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Raise Equity</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3f7a 55%, ${BLUE} 100%)`, padding: "64px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "#fff", padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, marginBottom: 20, border: "1px solid rgba(255,255,255,0.2)", letterSpacing: 1 }}>
              EQUITY FUNDING
            </div>
            <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>
              Raise Equity for Your Business
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 32 }}>
              BizzBuddy connects MSMEs and founders with angel investors, PE funds, and family offices — and helps you generate investor-ready summaries straight from your financials. Raise growth capital without taking on debt.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Angel • PE • Family Offices", "Investor-Ready Summaries", "End-to-End Support"].map((chip) => (
                <div key={chip} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: "1px solid rgba(255,255,255,0.2)" }}>
                  {chip}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 64, height: 64, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Thank You!</h3>
                <p style={{ color: "#64748b", fontSize: 14 }}>Our team will review your details and get back to you within 2 working hours.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Request Equity Consultation</h3>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Free consultation — 100% confidential</p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input placeholder="Name *" required value={form.name} onChange={(e) => set("name", e.target.value)} style={inputStyle} />
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    style={inputStyle}
                  />
                  <input type="email" placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} style={inputStyle} />
                  <input placeholder="Business Name" value={form.business} onChange={(e) => set("business", e.target.value)} style={inputStyle} />
                  <input placeholder="Location" value={form.location} onChange={(e) => set("location", e.target.value)} style={inputStyle} />
                  <select
                    value={form.fundingRequirement}
                    onChange={(e) => set("fundingRequirement", e.target.value)}
                    style={{ ...inputStyle, color: form.fundingRequirement ? "#1a202c" : "#9ca3af" }}
                  >
                    <option value="">Funding Requirement / Expected Raise</option>
                    {FUNDING_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <textarea
                    placeholder="Brief Description / Purpose of Raising Equity"
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                  />
                  <select
                    value={form.financials}
                    onChange={(e) => set("financials", e.target.value)}
                    style={{ ...inputStyle, color: form.financials ? "#1a202c" : "#9ca3af" }}
                  >
                    <option value="">Any existing financials available?</option>
                    {["Yes", "No"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <button type="submit" style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", marginTop: 4 }}>
                    Request Equity Consultation →
                  </button>
                </form>
                <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>🔒 Your information is secure and confidential</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* What is Equity Raising */}
      <section style={{ padding: "72px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY, marginBottom: 20 }}>What is Equity Raising?</h2>
          <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.9, marginBottom: 18 }}>
            Equity raising is the process of generating capital by selling a stake in your business to investors — instead of borrowing money that has to be repaid with interest. In exchange for funds, investors receive a share of ownership and a stake in your future growth.
          </p>
          <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.9 }}>
            For MSMEs and founders, equity funding unlocks growth capital without the burden of fixed EMIs or collateral. BizzBuddy connects you with the right angel investors, PE funds, and family offices, prepares your investor-ready summaries, and supports you through valuation, negotiation, and closure.
          </p>
        </div>
      </section>

      {/* Who Is It For */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>Who Is It For?</h2>
            <p style={{ color: "#64748b", fontSize: 16, marginTop: 10 }}>Equity funding fits a wide range of growth-focused businesses</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
            {WHO_IS_IT_FOR.map((w) => (
              <div key={w.title} style={{ background: "#fff", borderRadius: 16, padding: 28, border: `1.5px solid ${ACCENT_BORDER}`, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{w.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 10 }}>{w.title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "72px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>Benefits of Raising Equity with BizzBuddy</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {BENEFITS.map((b) => (
              <div key={b.title} style={{ background: ACCENT_BG, borderRadius: 16, padding: 28, border: `1.5px solid ${ACCENT_BORDER}` }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{b.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, marginBottom: 10 }}>{b.title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY, marginBottom: 12 }}>Our Process</h2>
          <p style={{ color: "#64748b", fontSize: 16, marginBottom: 48 }}>From first conversation to closure — we are with you at every step</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {STEPS.map((s) => (
              <div key={s.step} style={{ background: "#fff", borderRadius: 16, padding: 24, border: `1.5px solid ${ACCENT_BORDER}` }}>
                <div style={{ width: 48, height: 48, background: ACCENT, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18, margin: "0 auto 16px" }}>{s.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: NAVY, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "64px 5%", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Ready to Raise Equity?</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>Share your details and our team will get back to you within 2 working hours.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" style={{ background: "#fff", color: NAVY, padding: "13px 32px", borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: "none" }}>Talk to an Advisor</Link>
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
