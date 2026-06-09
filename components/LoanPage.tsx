"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

export type FAQ = { q: string; a: string };
export type SEOSection = { heading: string; body?: string; bullets?: string[] };
export type DocGroup = { heading: string; items: string[] };

export type LoanConfig = {
  key: string;
  title: string;
  icon: string;
  tagline: string;
  desc: string;
  color: string;
  accent: string;
  border: string;
  features: { icon: string; title: string; desc: string }[];
  eligibility: string[];
  documents: string[];
  /** Optional grouped documents (e.g. Salaried vs Self-Employed). When set, rendered instead of the flat documents list. */
  documentGroups?: DocGroup[];
  /** Optional heading override for the Documents Required block. */
  documentsHeading?: string;
  highlights: { label: string; value: string }[];
  faqs?: FAQ[];
  seo?: SEOSection[];
  disclaimer?: string;
};

const FOOTER_CONTACT = {
  address: "305, 3rd Floor, Suneja Tower 1, Janakpuri District Center, Janakpuri West, New Delhi 110078",
  phones: ["+91 9910850208", "+91 9899630125"],
  email: "sdmfintechconsultants@gmail.com",
};

export default function LoanPage({ config }: { config: LoanConfig }) {
  const [form, setForm] = useState({ name: "", phone: "", business: "", city: "", loan: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, loanType: config.title, source: `loan-page-${config.key}` }),
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
          <Link href="/loans/business-loan" style={{ color: BLUE, textDecoration: "none" }}>Loans</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>{config.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #eef5ff 0%, #ffffff 60%, #f5f9ff 100%)",
          padding: "64px 5%",
          borderBottom: "1px solid #e8eef7",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                background: config.color,
                color: config.accent,
                padding: "5px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                marginBottom: 20,
                border: `1px solid ${config.border}`,
                letterSpacing: 1,
              }}
            >
              BIZZBUDDY {config.title.toUpperCase()}
            </div>
            <h1 style={{ fontSize: 42, fontWeight: 900, color: NAVY, lineHeight: 1.2, marginBottom: 16 }}>
              {config.icon} {config.title}
            </h1>
            <p style={{ fontSize: 18, color: config.accent, marginBottom: 12, fontWeight: 700 }}>
              {config.tagline}
            </p>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, marginBottom: 32 }}>
              {config.desc}
            </p>
            {/* Key numbers */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {config.highlights.map((h) => (
                <div key={h.label}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: config.accent }}>{h.value}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{h.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Application form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 18px 50px rgba(21,101,192,0.15)", border: "1px solid #e2e8f0" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    background: "#dcfce7",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    margin: "0 auto 16px",
                  }}
                >
                  ✅
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Thank You!</h3>
                <p style={{ color: "#64748b", fontSize: 14 }}>Our advisor will contact you within 2 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: 16,
                    background: "none",
                    border: `1px solid ${BLUE}`,
                    color: BLUE,
                    padding: "8px 20px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 4 }}>
                  Apply for {config.title}
                </h3>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
                  Free consultation within 2 hours
                </p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {(
                    [
                      ["name", "text", "Your Full Name *", true],
                      ["phone", "tel", "Mobile Number *", true],
                      ["email", "email", "Email Address", false],
                      ["business", "text", "Business / Employer Name", false],
                      ["city", "text", "City", false],
                    ] as [keyof typeof form, string, string, boolean][]
                  ).map(([name, type, placeholder, req]) => (
                    <input
                      key={name}
                      type={type}
                      placeholder={placeholder}
                      required={req}
                      value={form[name]}
                      inputMode={name === "phone" ? "numeric" : undefined}
                      maxLength={name === "phone" ? 10 : undefined}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          [name]:
                            name === "phone"
                              ? e.target.value.replace(/\D/g, "").slice(0, 10)
                              : e.target.value,
                        }))
                      }
                      style={{
                        padding: "11px 14px",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: 8,
                        fontSize: 14,
                        outline: "none",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = BLUE)}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                  ))}
                  <select
                    value={form.loan}
                    onChange={(e) => setForm((p) => ({ ...p, loan: e.target.value }))}
                    style={{
                      padding: "11px 14px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 14,
                      color: form.loan ? "#1a202c" : "#9ca3af",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <option value="">Loan Amount Required</option>
                    {["Under ₹25L", "₹25L–₹1Cr", "₹1Cr–₹5Cr", "₹5Cr–₹25Cr", "₹25Cr+"].map((o) => (
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
                <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>
                  🔒 100% Confidential • No spam
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                color: BLUE,
                fontWeight: 700,
                fontSize: 12,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Why Choose Us
            </div>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>
              Benefits of {config.title} with BizzBuddy
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {config.features.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 28,
                  border: `1.5px solid ${config.border}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility + Documents */}
      <section style={{ padding: "72px 5%", background: "#fff" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
          }}
        >
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: NAVY, marginBottom: 24 }}>
              Eligibility Criteria
            </h2>
            {config.eligibility.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 14,
                  fontSize: 14,
                  color: "#374151",
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    background: "#dcfce7",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: NAVY, marginBottom: 24 }}>
              {config.documentsHeading || "Documents Required"}
            </h2>
            {(config.documentGroups
              ? config.documentGroups
              : [{ heading: "", items: config.documents }]
            ).map((group, gi) => (
              <div key={gi} style={{ marginBottom: config.documentGroups ? 22 : 0 }}>
                {group.heading && (
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: config.accent,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      marginBottom: 14,
                    }}
                  >
                    {group.heading}
                  </h3>
                )}
                {group.items.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      marginBottom: 14,
                      fontSize: 14,
                      color: "#374151",
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        background: "#eff6ff",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        flexShrink: 0,
                        marginTop: 1,
                        color: BLUE,
                        fontWeight: 700,
                      }}
                    >
                      📄
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {config.faqs && config.faqs.length > 0 && (
        <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div
                style={{
                  color: BLUE,
                  fontWeight: 700,
                  fontSize: 12,
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                FAQs
              </div>
              <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>
                Frequently Asked Questions
              </h2>
            </div>
            {config.faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 12,
                  marginBottom: 12,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "18px 22px",
                    textAlign: "left",
                    fontSize: 15,
                    fontWeight: 700,
                    color: NAVY,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {faq.q}
                  <span style={{ color: config.accent, fontSize: 18, flexShrink: 0 }}>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    style={{
                      padding: "0 22px 20px",
                      fontSize: 14,
                      color: "#475569",
                      lineHeight: 1.75,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SEO Content */}
      {config.seo && config.seo.length > 0 && (
        <section style={{ padding: "72px 5%", background: "#fff" }}>
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            {config.seo.map((sec, i) => (
              <div key={i} style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, marginBottom: 14 }}>
                  {sec.heading}
                </h2>
                {sec.body && (
                  <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: sec.bullets ? 14 : 0 }}>
                    {sec.body}
                  </p>
                )}
                {sec.bullets && (
                  <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
                    {sec.bullets.map((b) => (
                      <li
                        key={b}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          marginBottom: 10,
                          fontSize: 15,
                          color: "#374151",
                          lineHeight: 1.7,
                        }}
                      >
                        <span style={{ color: config.accent, fontWeight: 900, flexShrink: 0 }}>›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {config.disclaimer && (
              <p
                style={{
                  fontSize: 12,
                  color: "#94a3b8",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: 20,
                  marginTop: 8,
                }}
              >
                {config.disclaimer}
              </p>
            )}
          </div>
        </section>
      )}

      {/* CTA Strip */}
      <section
        style={{
          background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`,
          padding: "52px 5%",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", marginBottom: 10 }}>
          Ready to apply for {config.title}?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>
          Our experts will find you the best deal from 50+ lenders
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "#fff",
              color: NAVY,
              padding: "12px 32px",
              borderRadius: 10,
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Apply Now →
          </a>
          <Link
            href="/contact"
            style={{
              background: "transparent",
              color: "#fff",
              padding: "12px 32px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.35)",
            }}
          >
            Talk to an Advisor
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.7)", padding: "36px 5%" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 6 }}>BizzBuddy</div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>by SDM Fintech</div>
            <div style={{ fontSize: 12 }}>📍 {FOOTER_CONTACT.address}</div>
          </div>
          <div>
            {FOOTER_CONTACT.phones.map((p) => (
              <div key={p} style={{ fontSize: 13, marginBottom: 6 }}>📞 {p}</div>
            ))}
            <div style={{ fontSize: 13 }}>📧 {FOOTER_CONTACT.email}</div>
          </div>
          <div>
            <div style={{ marginBottom: 8 }}>
              <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Home</Link>
            </div>
            <div style={{ marginBottom: 8 }}>
              <Link href="/contact" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Contact Us</Link>
            </div>
            <div>
              <Link href="/auth/login" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Login</Link>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginTop: 28,
            paddingTop: 16,
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
          }}
        >
          © 2025 BizzBuddy by SDM Fintech. All rights reserved. | RBI Registered | MSME Certified
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section > div[style*="gridTemplateColumns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
