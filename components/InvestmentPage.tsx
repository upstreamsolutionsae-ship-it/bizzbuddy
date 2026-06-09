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

export type FieldDef =
  | { kind: "text"; name: string; placeholder: string; required?: boolean }
  | { kind: "select"; name: string; placeholder: string; options: string[]; required?: boolean; specifyOn?: string };

export type InvestConfig = {
  key: string;
  title: string;
  icon: string;
  tagline: string;
  desc: string;
  features: string[];
  color: string;
  accent: string;
  border: string;
  /** Extra fields shown after Full Name + Mobile Number. */
  fields: FieldDef[];
};

export default function InvestmentPage({ config }: { config: InvestConfig }) {
  const [form, setForm] = useState<Record<string, string>>({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const set = (name: string, value: string) => setForm((p) => ({ ...p, [name]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((form.phone || "").length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, loanType: `Investment: ${config.title}`, source: `investment-${config.key}` }),
    });
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8,
    fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", width: "100%",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/investments" style={{ color: BLUE, textDecoration: "none" }}>Investments / Insurance</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>{config.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #eef5ff 0%, #ffffff 60%, #f5f9ff 100%)", padding: "56px 5%", borderBottom: "1px solid #e8eef7" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{config.icon}</div>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: NAVY, marginBottom: 14 }}>{config.title}</h1>
          <p style={{ fontSize: 17, color: config.accent, maxWidth: 640, margin: "0 auto", fontWeight: 600 }}>{config.tagline}</p>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "64px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Info card */}
          <div style={{ background: config.color, border: `2px solid ${config.border}`, borderRadius: 24, padding: "40px 36px" }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: config.accent, marginBottom: 14 }}>{config.title}</h2>
            <p style={{ color: "#475569", fontSize: 15.5, lineHeight: 1.8, marginBottom: 26 }}>{config.desc}</p>
            {config.features.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: NAVY, fontWeight: 600 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: config.accent, flexShrink: 0 }} />
                {f}
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 64, height: 64, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Thank You!</h3>
                <p style={{ color: "#64748b", fontSize: 14 }}>Our investment advisor will contact you within 2 hours.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Get Expert Advice on {config.title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Free consultation — no hidden charges</p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input placeholder="Full Name *" required value={form.name || ""} onChange={(e) => set("name", e.target.value)} style={inputStyle} />
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone || ""}
                    onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    style={inputStyle}
                  />
                  {config.fields.map((f) =>
                    f.kind === "text" ? (
                      <input
                        key={f.name}
                        placeholder={f.placeholder + (f.required ? " *" : "")}
                        required={f.required}
                        value={form[f.name] || ""}
                        onChange={(e) => set(f.name, e.target.value)}
                        style={inputStyle}
                      />
                    ) : (
                      <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <select
                          required={f.required}
                          value={form[f.name] || ""}
                          onChange={(e) => set(f.name, e.target.value)}
                          style={{ ...inputStyle, color: form[f.name] ? "#1a202c" : "#9ca3af" }}
                        >
                          <option value="">{f.placeholder}</option>
                          {f.options.map((o) => <option key={o}>{o}</option>)}
                        </select>
                        {f.specifyOn && form[f.name] === f.specifyOn && (
                          <input
                            placeholder="Please specify"
                            value={form[`${f.name}_specify`] || ""}
                            onChange={(e) => set(`${f.name}_specify`, e.target.value)}
                            style={inputStyle}
                          />
                        )}
                      </div>
                    )
                  )}
                  <button type="submit" style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", marginTop: 4 }}>
                    Get Free Consultation →
                  </button>
                </form>
                <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>🔒 100% Confidential • No spam</p>
              </>
            )}
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
            {FOOTER_CONTACT.phones.map((p) => <div key={p} style={{ fontSize: 13, marginBottom: 6 }}>📞 {p}</div>)}
            <div style={{ fontSize: 13 }}>📧 {FOOTER_CONTACT.email}</div>
          </div>
          <div>
            <Link href="/" style={{ display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13, marginBottom: 8 }}>Home</Link>
            <Link href="/investments" style={{ display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13, marginBottom: 8 }}>All Investments</Link>
            <Link href="/contact" style={{ display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Contact Us</Link>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 24, paddingTop: 16, fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
          © 2025 BizzBuddy by SDM Fintech. All rights reserved.
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
