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

const TOOLS = [
  { icon: "✅", title: "Eligibility Check", desc: "Find out how much loan you qualify for based on your income, age, and credit score.", href: "/tools/eligibility", color: "#eff6ff", border: "#bfdbfe", accent: BLUE },
  { icon: "🧮", title: "EMI Calculator", desc: "Calculate your exact monthly EMI for any loan amount, rate, and tenure.", href: "/tools/emi-calculator", color: "#f0fdf4", border: "#bbf7d0", accent: "#15803d" },
  { icon: "💱", title: "Currency Converter", desc: "Convert between 15+ currencies with live indicative exchange rates.", href: "/tools/currency-converter", color: "#fdf4ff", border: "#e9d5ff", accent: "#7c3aed" },
  { icon: "🏦", title: "IFSC Locator", desc: "Find any bank branch details by entering the IFSC code.", href: "/tools/ifsc-locator", color: "#fff7ed", border: "#fed7aa", accent: "#c2410c" },
  { icon: "🥇", title: "Today's Gold Price", desc: "Check today's gold rates in India — 24K, 22K, 18K with value calculator.", href: "/tools/gold-price", color: "#fefce8", border: "#fde68a", accent: "#b45309" },
];

export default function ToolsPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Tools</span>
        </div>
      </div>

      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "64px 5%", textAlign: "center" }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Financial Tools</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17 }}>Free tools to help you make smarter financial decisions</p>
      </section>

      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {TOOLS.map((tool) => (
              <Link key={tool.title} href={tool.href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: tool.color,
                    border: `1.5px solid ${tool.border}`,
                    borderRadius: 20,
                    padding: "36px 32px",
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>{tool.icon}</div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: tool.accent, marginBottom: 10 }}>{tool.title}</h2>
                  <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{tool.desc}</p>
                  <span style={{ fontSize: 13, fontWeight: 700, color: tool.accent }}>Open Tool →</span>
                </div>
              </Link>
            ))}
          </div>
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
          div[style*="gridTemplateColumns: repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          div[style*="gridTemplateColumns: repeat(3, 1fr)"],
          div[style*="gridTemplateColumns: repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
