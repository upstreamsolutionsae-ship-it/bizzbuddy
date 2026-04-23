"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

const FOOTER_CONTACT = {
  address: "305, 3rd Floor, Suneja Tower 1, Janakpuri District Center, Janakpuri West, New Delhi 110078",
  phones: ["+91 9910850208", "+91 9899630125"],
  email: "sdmfintechconsultants@gmail.com",
};

const SERVICES = [
  {
    id: "loan-assistance",
    icon: "🏦",
    title: "Loan Assistance",
    tagline: "End-to-end loan support from 50+ lenders",
    desc: "We help individuals and businesses access the right loan — from identifying the best lender to documentation and disbursement. Our network of 50+ banks and NBFCs ensures maximum approval chances.",
    features: ["Home Loan", "Business Loan", "Personal Loan", "Car Loan", "Loan Against Property"],
    cta: "Apply for Loan",
    ctaHref: "/loans/business-loan",
    color: "#eff6ff",
    border: "#bfdbfe",
    accent: BLUE,
  },
  {
    id: "financial-advisory",
    icon: "💡",
    title: "Financial Advisory",
    tagline: "AI-powered insights for smarter financial decisions",
    desc: "Get a comprehensive financial health check for your business. Our AI analyses profitability, debt ratios, cash flow, and growth — giving you a clear picture and expert guidance.",
    features: ["Profit Margin Analysis", "ROA & ROE Assessment", "Debt-Equity Evaluation", "Cash Flow Health Check", "Growth Trend Analysis"],
    cta: "Free Health Check",
    ctaHref: "/financial-health-check",
    color: "#fef9ee",
    border: "#fde68a",
    accent: "#b45309",
  },
  {
    id: "credit",
    icon: "📊",
    title: "Credit Improvement",
    tagline: "Boost your CIBIL score for better loan chances",
    desc: "A low credit score can block loan approvals. Our experts analyze your credit report, identify issues, and create a customised action plan to improve your score within 90–180 days.",
    features: ["CIBIL Score Analysis", "Dispute Resolution", "Credit Building Plan", "90-day Improvement Strategy", "Ongoing Monitoring"],
    cta: "Check Credit Report",
    ctaHref: "/credit-report",
    color: "#f0fdf4",
    border: "#bbf7d0",
    accent: "#15803d",
  },
  {
    id: "documentation",
    icon: "📋",
    title: "Documentation Support",
    tagline: "Complete paperwork assistance for faster approvals",
    desc: "Incomplete or incorrect documentation is the #1 reason for loan rejections. Our team helps you prepare CMA data, ITR, balance sheets, projections, and all bank-specific requirements.",
    features: ["CMA Data Preparation", "Financial Statement Review", "Business Projection Reports", "Bank-specific Documentation", "Application Filing"],
    cta: "Talk to an Advisor",
    ctaHref: "/contact",
    color: "#fdf4ff",
    border: "#e9d5ff",
    accent: "#7c3aed",
  },
];

export default function OurServicesPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Our Services</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3f7a 55%, ${BLUE} 100%)`, padding: "64px 5%", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontSize: 44, fontWeight: 900, color: "#fff", marginBottom: 16 }}>Our Services</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
            Comprehensive financial solutions for MSMEs, individuals, and businesses — all in one place.
          </p>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              id={svc.id}
              style={{
                background: "#fff",
                borderRadius: 24,
                overflow: "hidden",
                border: `1.5px solid ${svc.border}`,
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1.2fr 1fr" : "1fr 1.2fr",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  background: svc.color,
                  padding: "48px 44px",
                  order: i % 2 === 0 ? 0 : 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: 56, marginBottom: 16 }}>{svc.icon}</div>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: svc.accent, marginBottom: 10 }}>{svc.title}</h2>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#475569", marginBottom: 14 }}>{svc.tagline}</p>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8 }}>{svc.desc}</p>
              </div>
              <div style={{ padding: "48px 44px", order: i % 2 === 0 ? 1 : 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#94a3b8", marginBottom: 20, textTransform: "uppercase" as const, letterSpacing: 1 }}>What We Cover</h3>
                {svc.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, fontSize: 14, fontWeight: 600, color: NAVY }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: svc.accent, flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
                <Link
                  href={svc.ctaHref}
                  style={{ display: "inline-block", marginTop: 24, background: svc.accent, color: "#fff", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}
                >
                  {svc.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "64px 5%", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Need Help Choosing the Right Service?</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>Our advisors are available Mon–Sat, 9 AM – 7 PM</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" style={{ background: "#fff", color: NAVY, padding: "13px 32px", borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: "none" }}>Talk to an Advisor</Link>
          <Link href="/financial-health-check" style={{ background: "transparent", color: "#fff", padding: "13px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", border: "2px solid rgba(255,255,255,0.35)" }}>Free Health Check</Link>
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
          div[style*="gridTemplateColumns: 1.2fr 1fr"],
          div[style*="gridTemplateColumns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="order: 1"] { order: 0 !important; }
        }
      `}</style>
    </div>
  );
}
