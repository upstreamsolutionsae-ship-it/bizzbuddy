"use client";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

const FOOTER_CONTACT = {
  address: "305, 3rd Floor, Suneja Tower 1, Janakpuri District Center, Janakpuri West, New Delhi 110078",
  phones: ["+91 9910850208", "+91 9899630125"],
  email: "sdmfintechconsultants@gmail.com",
};

const ACCENT = "#7c3aed";
const ACCENT_BG = "#fdf4ff";
const ACCENT_BORDER = "#e9d5ff";

const SERVICE_OPTIONS = [
  "GST Registration",
  "LEI Certificate Generation",
  "UDYAM Registration",
  "Loan Documentation Service",
  "Other Services",
] as const;

type ServiceOption = (typeof SERVICE_OPTIONS)[number];

const CATEGORY_MAP: Record<ServiceOption, string> = {
  "GST Registration": "GST Registration",
  "LEI Certificate Generation": "LEI Certificate",
  "UDYAM Registration": "UDYAM Registration",
  "Loan Documentation Service": "Loan Documentation Service",
  "Other Services": "Other Documentation Service",
};

const SERVICE_CARDS = [
  { icon: "🧾", title: "GST Registration", desc: "Get your business GST-registered quickly with complete document handling and filing support." },
  { icon: "📜", title: "LEI Certificate Generation", desc: "Obtain your Legal Entity Identifier (LEI) for high-value transactions, hassle-free." },
  { icon: "🏭", title: "UDYAM Registration", desc: "Register as an MSME under UDYAM and unlock government benefits and easier loan access." },
  { icon: "📋", title: "Loan Documentation Service", desc: "We prepare and review CMA data, ITR, projections, and bank-specific paperwork for faster approvals." },
  { icon: "🗂️", title: "Other Services", desc: "Need something else? Tell us the documentation you need and our team will take care of it." },
];

const WHAT_WE_COVER = [
  "GST Registration",
  "LEI Certificate Generation",
  "UDYAM Registration",
  "Loan Documentation Service",
  "Application Filing & Follow-up",
];

type DocForm = {
  name: string;
  phone: string;
  email: string;
  business: string;
  city: string;
  service: string;
  otherText: string;
};

function DocumentationSupportInner() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const initialService =
    serviceParam && (SERVICE_OPTIONS as readonly string[]).includes(serviceParam) ? serviceParam : "";

  const [form, setForm] = useState<DocForm>({
    name: "",
    phone: "",
    email: "",
    business: "",
    city: "",
    service: initialService,
    otherText: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (name: keyof DocForm, value: string) => setForm((p) => ({ ...p, [name]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    const isOther = form.service === "Other Services";
    const category = CATEGORY_MAP[form.service as ServiceOption] ?? "Other Documentation Service";
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        business: form.business,
        city: form.city,
        category,
        details: isOther ? form.otherText : "",
        source: "documentation-support",
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

  const showOther = form.service === "Other Services";

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Documentation Support</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3f7a 55%, ${BLUE} 100%)`, padding: "64px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "#fff", padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, marginBottom: 20, border: "1px solid rgba(255,255,255,0.2)", letterSpacing: 1 }}>
              DOCUMENTATION SUPPORT
            </div>
            <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>
              Documentation Support
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
              Get expert help with GST Registration, LEI Certificate Generation, UDYAM Registration, loan documentation and more — we handle the paperwork so your approvals move faster.
            </p>
          </div>

          {/* Form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 64, height: 64, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Thank You!</h3>
                <p style={{ color: "#64748b", fontSize: 14 }}>We will get back to you within 2 working hours.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Request Documentation Help</h3>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Free consultation — we handle the paperwork</p>
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
                  <input placeholder="Location / City" value={form.city} onChange={(e) => set("city", e.target.value)} style={inputStyle} />
                  <select
                    required
                    value={form.service}
                    onChange={(e) => set("service", e.target.value)}
                    style={{ ...inputStyle, color: form.service ? "#1a202c" : "#9ca3af" }}
                  >
                    <option value="">Service Required *</option>
                    {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  {showOther && (
                    <textarea
                      placeholder="Please describe the service you are looking for"
                      required
                      value={form.otherText}
                      onChange={(e) => set("otherText", e.target.value)}
                      style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                    />
                  )}
                  <button type="submit" style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", marginTop: 4 }}>
                    Submit Request →
                  </button>
                </form>
                <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>🔒 Your information is secure and confidential</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Services We Cover */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>Services We Cover</h2>
            <p style={{ color: "#64748b", fontSize: 16, marginTop: 10 }}>Complete documentation assistance under one roof</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {SERVICE_CARDS.map((c) => (
              <div key={c.title} style={{ background: ACCENT_BG, borderRadius: 16, padding: 28, border: `1.5px solid ${ACCENT_BORDER}` }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{c.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, marginBottom: 10 }}>{c.title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section style={{ padding: "72px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div style={{ background: ACCENT_BG, border: `2px solid ${ACCENT_BORDER}`, borderRadius: 24, padding: "40px 36px" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: ACCENT, marginBottom: 14 }}>End-to-End Paperwork</h2>
            <p style={{ color: "#475569", fontSize: 15.5, lineHeight: 1.8 }}>
              Incomplete or incorrect documentation is one of the biggest reasons approvals get delayed. Our team handles registrations, certificates, and loan paperwork accurately — so your approvals move faster.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#94a3b8", marginBottom: 20, textTransform: "uppercase" as const, letterSpacing: 1 }}>What We Cover</h3>
            {WHAT_WE_COVER.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, fontSize: 14, fontWeight: 600, color: NAVY }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "64px 5%", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Let Us Handle the Paperwork</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>Share your details and we will get back to you within 2 working hours.</p>
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
          section > div[style*="gridTemplateColumns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default function DocumentationSupportPage() {
  return (
    <Suspense fallback={null}>
      <DocumentationSupportInner />
    </Suspense>
  );
}
