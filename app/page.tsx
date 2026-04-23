"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";
const LIGHT_BLUE = "#e8f0fe";

const LOAN_TYPES = [
  {
    key: "home-loan",
    icon: "🏠",
    title: "Home Loan",
    desc: "Finance your dream home with competitive rates, flexible tenure up to 30 years, and expert guidance from application to disbursement.",
    features: ["Up to ₹5 Crore", "Tenure up to 30 years", "Rate from 8.5% p.a."],
    color: "#e8f0fe",
    border: "#bfdbfe",
    accent: "#1565C0",
  },
  {
    key: "personal-loan",
    icon: "👤",
    title: "Personal Loan",
    desc: "Instant personal loans for any need — medical, travel, education, or emergency — with minimal documentation and quick disbursal.",
    features: ["Up to ₹50 Lakh", "Tenure up to 7 years", "Rate from 10.5% p.a."],
    color: "#f0fdf4",
    border: "#bbf7d0",
    accent: "#15803d",
  },
  {
    key: "business-loan",
    icon: "🏢",
    title: "Business Loan",
    desc: "Fuel your MSME growth with working capital, term loans, and machinery finance from 50+ banks and NBFCs across India.",
    features: ["Up to ₹10 Crore", "Tenure up to 10 years", "Secured & Unsecured"],
    color: "#fff7ed",
    border: "#fed7aa",
    accent: "#c2410c",
  },
  {
    key: "car-loan",
    icon: "🚗",
    title: "Car Loan",
    desc: "Drive home your favourite car with affordable EMIs, quick approval, and financing for both new and pre-owned vehicles.",
    features: ["Up to 100% on-road", "Tenure up to 7 years", "Rate from 8.75% p.a."],
    color: "#fdf4ff",
    border: "#e9d5ff",
    accent: "#7c3aed",
  },
  {
    key: "loan-against-property",
    icon: "🏗️",
    title: "Loan Against Property",
    desc: "Unlock the value in your property to meet large financial needs — business expansion, education, or debt consolidation.",
    features: ["Up to ₹25 Crore", "Tenure up to 20 years", "Rate from 9.5% p.a."],
    color: "#fefce8",
    border: "#fde68a",
    accent: "#b45309",
  },
];

const BANKS = [
  "HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Bajaj Finserv",
  "Tata Capital", "IDFC First", "Kotak Mahindra", "Bank of Baroda",
  "Punjab National Bank", "Canara Bank", "IIFL Finance", "Manappuram",
  "Muthoot Finance", "L&T Finance", "Aditya Birla Capital", "Piramal Finance",
];

const PARTNER_CONTENT = [
  {
    icon: "⚡",
    title: "Lightning-Fast Payouts",
    desc: "Experience ultra-fast payout processing powered by secure infrastructure. Get your funds when you need them — with zero delays, zero friction, and complete peace of mind.",
  },
  {
    icon: "🎯",
    title: "Expert-Led Solutions",
    desc: "Work with seasoned professionals who understand your business. Our tailored financial solutions are designed for efficiency, accuracy, and long-term success.",
  },
  {
    icon: "🔍",
    title: "Complete Transparency",
    desc: "No surprises, no hidden costs. Enjoy a fully transparent process with real-time visibility, clear terms, and payouts you can track every step of the way.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Precision Engine",
    desc: "Leverage cutting-edge Machine Learning and AI to drive lightning-fast, highly accurate decisioning. Our intelligent systems minimize errors, optimize outcomes, and deliver unmatched reliability at scale.",
  },
];

const CUSTOMER_CONTENT = [
  { icon: "🏛️", title: "15+ Years Banking", desc: "Founded by ex-bankers with deep credit expertise from PSU & private banks" },
  { icon: "🌐", title: "Pan-India Network", desc: "50+ banks and NBFCs for maximum approval chances across the country" },
  { icon: "⚡", title: "Faster Approvals", desc: "AI-powered lead scoring reduces processing time from weeks to days" },
  { icon: "🛡️", title: "End-to-End Support", desc: "From application to disbursement — we handle every step with care" },
];

const FOOTER_CONTACT = {
  address: "305, 3rd Floor, Suneja Tower 1, Janakpuri District Center, Janakpuri West, New Delhi 110078",
  phones: ["+91 9910850208", "+91 9899630125", "+91 9217541553", "+91 9413823781"],
  email: "sdmfintechconsultants@gmail.com",
};

export default function HomePage() {
  const [leadForm, setLeadForm] = useState({
    name: "", phone: "", business: "", loan: "", city: "", loanType: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeLoan, setActiveLoan] = useState(0);
  const [whyTab, setWhyTab] = useState<"customer" | "partner">("customer");
  const [partnerTab, setPartnerTab] = useState(0);
  const [tickerPaused, setTickerPaused] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...leadForm, source: "homepage" }),
    });
    setSubmitted(true);
  };

  // Auto-cycle loan tabs
  useEffect(() => {
    const t = setInterval(() => setActiveLoan((p) => (p + 1) % LOAN_TYPES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #1a3f7a 55%, #1565C0 100%)`,
          padding: "70px 5% 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                marginBottom: 22,
                border: "1px solid rgba(255,255,255,0.2)",
                letterSpacing: 1,
              }}
            >
              BUILT BY BANKERS • DESIGNED FOR GROWTH
            </div>
            <h1 style={{ fontSize: 46, fontWeight: 900, color: "#fff", lineHeight: 1.18, marginBottom: 18 }}>
              Your Financial <span style={{ color: "#93c5fd" }}>Buddy</span> for<br />MSME Growth
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 10 }}>
              Debt • Equity • Advisory • Analytics
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 36 }}>
              15+ years of banking expertise at your service. Pan-India lender network.<br />Faster approvals. End-to-end support.
            </p>
            <div style={{ display: "flex", gap: 32, marginTop: 8 }}>
              {(
                [
                  ["500+", "MSMEs Funded"],
                  ["₹200Cr+", "Loans Facilitated"],
                  ["50+", "Lender Partners"],
                ] as [string, string][]
              ).map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#93c5fd" }}>{num}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Lead Form */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 32,
              boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
            }}
          >
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
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Apply for Loan</h3>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
                  Get matched to the best lender in 2 hours
                </p>
                <form onSubmit={handleLeadSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {(
                    [
                      ["name", "text", "Your Full Name *", true],
                      ["phone", "tel", "Mobile Number *", true],
                      ["business", "text", "Business Name", false],
                      ["city", "text", "City", false],
                    ] as [keyof typeof leadForm, string, string, boolean][]
                  ).map(([name, type, placeholder, req]) => (
                    <input
                      key={name}
                      type={type}
                      placeholder={placeholder}
                      required={req}
                      value={leadForm[name]}
                      onChange={(e) => setLeadForm((p) => ({ ...p, [name]: e.target.value }))}
                      style={{
                        padding: "11px 14px",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: 8,
                        fontSize: 14,
                        outline: "none",
                        fontFamily: "'Inter', sans-serif",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = BLUE)}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                  ))}
                  <select
                    value={leadForm.loan}
                    onChange={(e) => setLeadForm((p) => ({ ...p, loan: e.target.value }))}
                    style={{
                      padding: "11px 14px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 14,
                      color: leadForm.loan ? "#1a202c" : "#9ca3af",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <option value="">Loan Requirement</option>
                    {["Under ₹25L", "₹25L–₹1Cr", "₹1Cr–₹5Cr", "₹5Cr–₹25Cr", "₹25Cr+"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <select
                    value={leadForm.loanType}
                    onChange={(e) => setLeadForm((p) => ({ ...p, loanType: e.target.value }))}
                    style={{
                      padding: "11px 14px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 14,
                      color: leadForm.loanType ? "#1a202c" : "#9ca3af",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <option value="">Type of Loan</option>
                    {["Home Loan", "Personal Loan", "Business Loan", "Car Loan", "Loan Against Property"].map((o) => (
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

      {/* ── LOAN PRODUCTS ── */}
      <section style={{ padding: "80px 5%", background: "#f8fafc" }}>
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
              Our Offerings and Services
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: NAVY }}>Loan Products for Every Need</h2>
            <p style={{ color: "#64748b", fontSize: 16, marginTop: 10 }}>
              Choose from a wide range of loan products tailored for individuals and businesses
            </p>
          </div>

          {/* Tab row */}
          <div
            style={{
              display: "flex",
              gap: 10,
              overflowX: "auto",
              marginBottom: 32,
              paddingBottom: 4,
            }}
          >
            {LOAN_TYPES.map((loan, i) => (
              <button
                key={loan.key}
                onClick={() => setActiveLoan(i)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 50,
                  border: `2px solid ${i === activeLoan ? loan.accent : "#e2e8f0"}`,
                  background: i === activeLoan ? loan.color : "#fff",
                  color: i === activeLoan ? loan.accent : "#64748b",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {loan.icon} {loan.title}
              </button>
            ))}
          </div>

          {/* Active loan card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              border: `2px solid ${LOAN_TYPES[activeLoan].border}`,
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              minHeight: 320,
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            }}
          >
            <div
              style={{
                background: LOAN_TYPES[activeLoan].color,
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: 56, marginBottom: 16 }}>{LOAN_TYPES[activeLoan].icon}</div>
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: LOAN_TYPES[activeLoan].accent,
                  marginBottom: 14,
                }}
              >
                {LOAN_TYPES[activeLoan].title}
              </h3>
              <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.75 }}>
                {LOAN_TYPES[activeLoan].desc}
              </p>
            </div>
            <div
              style={{
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "#94a3b8", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>
                Key Highlights
              </h4>
              {LOAN_TYPES[activeLoan].features.map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                    fontSize: 15,
                    fontWeight: 600,
                    color: NAVY,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: LOAN_TYPES[activeLoan].accent,
                      flexShrink: 0,
                    }}
                  />
                  {f}
                </div>
              ))}
              <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
                <Link
                  href={`/loans/${LOAN_TYPES[activeLoan].key}`}
                  style={{
                    background: LOAN_TYPES[activeLoan].accent,
                    color: "#fff",
                    padding: "12px 28px",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  Apply Now →
                </Link>
                <Link
                  href={`/loans/${LOAN_TYPES[activeLoan].key}`}
                  style={{
                    border: `2px solid ${LOAN_TYPES[activeLoan].border}`,
                    color: LOAN_TYPES[activeLoan].accent,
                    padding: "12px 24px",
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section style={{ padding: "80px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
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
              Our Services
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: NAVY }}>Everything Your MSME Needs</h2>
            <p style={{ color: "#64748b", fontSize: 16, marginTop: 10 }}>
              One platform for all your financial growth needs
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28, maxWidth: 800, margin: "0 auto" }}>
            {[
              {
                icon: "🏦",
                title: "Raise Debt",
                desc: "Working capital, term loans, LAP, bank guarantees, LCs. Secured & unsecured options from 50+ banks and NBFCs.",
                cta: "Apply for Loan",
                href: "/loans/business-loan",
                color: "#eff6ff",
                border: "#bfdbfe",
                accent: BLUE,
              },
              {
                icon: "💡",
                title: "Financial Advisory",
                desc: "AI-powered financial health check. Profit margins, ROA, debt ratios, cash flow analysis with expert guidance.",
                cta: "Free Health Check",
                href: "/financial-health-check",
                color: "#fef9ee",
                border: "#fde68a",
                accent: "#b45309",
              },
            ].map((c) => (
              <div
                key={c.title}
                style={{
                  background: c.color,
                  border: `1.5px solid ${c.border}`,
                  borderRadius: 20,
                  padding: 36,
                }}
              >
                <div style={{ fontSize: 44, marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 12 }}>{c.title}</h3>
                <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 14, marginBottom: 24 }}>{c.desc}</p>
                <Link
                  href={c.href}
                  style={{
                    display: "inline-block",
                    background: c.accent,
                    color: "#fff",
                    padding: "11px 24px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: "none",
                  }}
                >
                  {c.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BIZZBUDDY ── */}
      <section style={{ padding: "80px 5%", background: "#f0f7ff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: NAVY }}>Why BizzBuddy?</h2>
            <p style={{ color: "#64748b", fontSize: 16, marginTop: 10, marginBottom: 28 }}>
              Built by bankers who understand your needs
            </p>
            {/* Toggle */}
            <div
              style={{
                display: "inline-flex",
                background: "#e0eeff",
                borderRadius: 50,
                padding: 4,
                gap: 4,
              }}
            >
              {(["customer", "partner"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setWhyTab(tab)}
                  style={{
                    padding: "10px 28px",
                    borderRadius: 50,
                    border: "none",
                    background: whyTab === tab ? NAVY : "transparent",
                    color: whyTab === tab ? "#fff" : "#64748b",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    transition: "all 0.25s",
                  }}
                >
                  {tab === "customer" ? "For Customers" : "For Partners"}
                </button>
              ))}
            </div>
          </div>

          {/* Customer content */}
          {whyTab === "customer" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
              {CUSTOMER_CONTENT.map((w) => (
                <div
                  key={w.title}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: 28,
                    border: "1.5px solid #dbeafe",
                    boxShadow: "0 2px 12px rgba(21,101,192,0.07)",
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{w.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: NAVY, marginBottom: 10 }}>{w.title}</h3>
                  <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Partner content */}
          {whyTab === "partner" && (
            <div>
              {/* Partner tab pills */}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: 28,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {PARTNER_CONTENT.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPartnerTab(i)}
                    style={{
                      padding: "9px 20px",
                      borderRadius: 50,
                      border: `2px solid ${partnerTab === i ? NAVY : "#dbeafe"}`,
                      background: partnerTab === i ? NAVY : "#fff",
                      color: partnerTab === i ? "#fff" : "#374151",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      transition: "all 0.2s",
                    }}
                  >
                    {p.icon} {p.title}
                  </button>
                ))}
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "44px 48px",
                  border: "1.5px solid #dbeafe",
                  boxShadow: "0 4px 20px rgba(21,101,192,0.08)",
                  maxWidth: 720,
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 56, marginBottom: 16 }}>{PARTNER_CONTENT[partnerTab].icon}</div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: NAVY, marginBottom: 16 }}>
                  {PARTNER_CONTENT[partnerTab].title}
                </h3>
                <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.8 }}>
                  {PARTNER_CONTENT[partnerTab].desc}
                </p>
                <Link
                  href="/become-our-partner"
                  style={{
                    display: "inline-block",
                    marginTop: 28,
                    background: NAVY,
                    color: "#fff",
                    padding: "12px 32px",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  Become a Partner →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: NAVY, marginBottom: 12 }}>How It Works</h2>
          <p style={{ color: "#64748b", fontSize: 16, marginBottom: 52 }}>Get funded in 3 simple steps</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {[
              {
                step: "01",
                title: "Share Details",
                desc: "Fill a simple form with your business info and funding requirement — under 5 minutes",
                color: "#eff6ff",
                border: "#bfdbfe",
              },
              {
                step: "02",
                title: "Get Matched",
                desc: "Our AI scores your profile and matches you to the best lenders",
                color: "#f0fdf4",
                border: "#bbf7d0",
              },
              {
                step: "03",
                title: "Get Funded",
                desc: "A dedicated advisor handles documentation to disbursement",
                color: "#fef9ee",
                border: "#fde68a",
              },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  background: s.color,
                  borderRadius: 20,
                  padding: 32,
                  border: `1.5px solid ${s.border}`,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: NAVY,
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 20,
                    margin: "0 auto 20px",
                  }}
                >
                  {s.step}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`,
          padding: "70px 5%",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 36, fontWeight: 900, color: "#fff", marginBottom: 12 }}>
          Ready to Grow Your Business?
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>
          Join 500+ MSMEs who trust BizzBuddy for their financial needs
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/auth/register"
            style={{
              background: "#fff",
              color: NAVY,
              padding: "14px 36px",
              borderRadius: 10,
              fontWeight: 800,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            Create your account now →
          </Link>
          <Link
            href="/contact"
            style={{
              background: "transparent",
              color: "#fff",
              padding: "14px 36px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.4)",
            }}
          >
            Talk to an Advisor
          </Link>
        </div>
      </section>

      {/* ── PARTNER BANKS TICKER ── */}
      <section style={{ padding: "36px 0", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Partner Banks / Institutions
          </span>
        </div>
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div
            onMouseEnter={() => setTickerPaused(true)}
            onMouseLeave={() => setTickerPaused(false)}
            style={{
              display: "flex",
              gap: 48,
              animation: tickerPaused ? "none" : "ticker 25s linear infinite",
              width: "max-content",
            }}
          >
            {[...BANKS, ...BANKS].map((bank, i) => (
              <span
                key={i}
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: NAVY,
                  opacity: 0.65,
                  whiteSpace: "nowrap",
                }}
              >
                {bank}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.7)", padding: "52px 5% 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1.4fr",
              gap: 40,
              marginBottom: 44,
            }}
          >
            {/* Brand */}
            <div>
              <div style={{ fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 4 }}>BizzBuddy</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>by SDM Fintech</div>
              <p style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>
                Your Growth Partner for MSMEs – Built by Bankers. Designed for Growth.
              </p>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                📍 {FOOTER_CONTACT.address}
              </div>
              {/* Social links */}
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {[
                  { label: "f", title: "Facebook", href: "#facebook" },
                  { label: "in", title: "LinkedIn", href: "#linkedin" },
                  { label: "X", title: "Twitter/X", href: "#twitter" },
                  { label: "▶", title: "YouTube", href: "#youtube" },
                  { label: "📷", title: "Instagram", href: "#instagram" },
                ].map((s) => (
                  <a
                    key={s.title}
                    href={s.href}
                    title={s.title}
                    style={{
                      width: 34,
                      height: 34,
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 700,
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: 18, fontSize: 14 }}>Services</div>
              {[
                ["Business Loans", "/loans/business-loan"],
                ["Home Loan", "/loans/home-loan"],
                ["Personal Loan", "/loans/personal-loan"],
                ["Loan Against Property", "/loans/loan-against-property"],
                ["Financial Advisory", "/financial-health-check"],
                ["Channel Partner", "/become-our-partner"],
              ].map(([label, href]) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <Link
                    href={href}
                    style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Company */}
            <div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: 18, fontSize: 14 }}>Company</div>
              {[
                ["About Us", "/about"],
                ["Our Services", "/our-services"],
                ["Become a Partner", "/become-our-partner"],
                ["Credit Report", "/credit-report"],
                ["Contact", "/contact"],
                ["Login", "/auth/login"],
              ].map(([label, href]) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <Link
                    href={href}
                    style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: 18, fontSize: 14 }}>Contact</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 10 }}>
                📧 {FOOTER_CONTACT.email}
              </div>
              {FOOTER_CONTACT.phones.map((ph) => (
                <div key={ph} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
                  📞 {ph}
                </div>
              ))}
              <a
                href={`https://wa.me/919910850208`}
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  background: "#25d366",
                  color: "#fff",
                  padding: "8px 18px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 12,
                  textDecoration: "none",
                }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <span>© 2025 BizzBuddy by SDM Fintech. All rights reserved.</span>
            <span>RBI Registered | MSME Certified</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 900px) {
          section > div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section > div[style*="gridTemplateColumns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          section > div[style*="gridTemplateColumns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          footer > div > div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          section > div[style*="gridTemplateColumns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
          footer > div > div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
