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

const PRODUCTS = [
  {
    href: "/investments/mutual-funds",
    icon: "📈",
    title: "Mutual Funds",
    desc: "Invest in equity, debt, hybrid, or liquid funds through SIP or lumpsum with expert-guided fund selection.",
    color: "#eff6ff", border: "#bfdbfe", accent: BLUE,
  },
  {
    href: "/investments/fixed-deposits",
    icon: "🔒",
    title: "Fixed Deposits",
    desc: "Compare FD rates from leading banks and NBFCs and book the highest-yielding deposits with full safety.",
    color: "#f0fdf4", border: "#bbf7d0", accent: "#15803d",
  },
  {
    href: "/investments/insurance",
    icon: "🛡️",
    title: "Insurance Plans",
    desc: "Life, health, auto, and term insurance from leading insurers — compare and buy with expert advice.",
    color: "#fdf4ff", border: "#e9d5ff", accent: "#7c3aed",
  },
  {
    href: "/investments/equity",
    icon: "📊",
    title: "Invest in Equity",
    desc: "Expert guidance on listed and unlisted equity opportunities, structured to your goals and risk appetite.",
    color: "#fef9ee", border: "#fde68a", accent: "#b45309",
  },
];

export default function InvestmentsHubPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Investments / Insurance</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #eef5ff 0%, #ffffff 60%, #f5f9ff 100%)", padding: "64px 5%", borderBottom: "1px solid #e8eef7" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: 44, fontWeight: 900, color: NAVY, marginBottom: 16 }}>Investments &amp; Insurance</h1>
          <p style={{ fontSize: 18, color: "#475569", maxWidth: 620, margin: "0 auto" }}>
            Grow your wealth, protect your future. Choose a product below and an expert advisor will reach out within 2 hours.
          </p>
        </div>
      </section>

      {/* Product cards */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28 }}>
          {PRODUCTS.map((p) => (
            <Link key={p.href} href={p.href} style={{ textDecoration: "none" }}>
              <div style={{ background: p.color, border: `1.5px solid ${p.border}`, borderRadius: 20, padding: 36, height: "100%" }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 12 }}>{p.title}</h3>
                <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 14, marginBottom: 20 }}>{p.desc}</p>
                <span style={{ display: "inline-block", background: p.accent, color: "#fff", padding: "10px 22px", borderRadius: 8, fontWeight: 700, fontSize: 13 }}>
                  Get Started →
                </span>
              </div>
            </Link>
          ))}
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
            <Link href="/contact" style={{ display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Contact Us</Link>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 24, paddingTop: 16, fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
          © 2025 BizzBuddy by SDM Fintech. All rights reserved.
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="gridTemplateColumns: repeat(2"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
