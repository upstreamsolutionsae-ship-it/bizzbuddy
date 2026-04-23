import Link from "next/link";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

const FOOTER_CONTACT = {
  address: "305, 3rd Floor, Suneja Tower 1, Janakpuri District Center, Janakpuri West, New Delhi 110078",
  phones: ["+91 9910850208", "+91 9899630125"],
  email: "sdmfintechconsultants@gmail.com",
};

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1a202c" }}>
      <Navbar />

      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>About Us</span>
        </div>
      </div>

      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "64px 5%", textAlign: "center" }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: "#fff", marginBottom: 12 }}>About BizzBuddy</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, maxWidth: 640, margin: "0 auto" }}>
          Built by bankers who lived the MSME credit challenge from both sides of the table
        </p>
      </section>

      <section style={{ padding: "72px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start", marginBottom: 64 }}>
            <div>
              <div style={{ color: BLUE, fontWeight: 700, fontSize: 12, marginBottom: 10, textTransform: "uppercase" as const, letterSpacing: 2 }}>Our Story</div>
              <h2 style={{ fontSize: 30, fontWeight: 900, color: NAVY, marginBottom: 20 }}>Why We Built BizzBuddy</h2>
              <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}>
                BizzBuddy was founded by a team of ex-bankers with 15+ years of combined experience in MSME lending at leading PSU and private banks. We saw firsthand how creditworthy businesses were being turned away due to documentation gaps, lack of financial awareness, or absence of the right intermediary.
              </p>
              <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.9 }}>
                We built BizzBuddy to bridge this gap — combining technology, banking expertise, and a wide lender network to make business finance accessible, transparent, and fast for every MSME in India.
              </p>
            </div>
            <div style={{ background: "#f0f7ff", borderRadius: 24, padding: 36, border: "1.5px solid #bfdbfe" }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 24 }}>Our Mission & Vision</h3>
              <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid #dbeafe" }}>
                <div style={{ fontWeight: 700, color: BLUE, fontSize: 12, marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: 1 }}>Mission</div>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.8 }}>
                  To democratize business finance for India&apos;s 63 million MSMEs by providing fast, fair, and technology-driven financial solutions.
                </p>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: BLUE, fontSize: 12, marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: 1 }}>Vision</div>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.8 }}>
                  To become India&apos;s most trusted MSME financial ecosystem — connecting businesses, investors, and lenders on a single intelligent platform.
                </p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: NAVY }}>Our Roadmap</h2>
            <p style={{ color: "#64748b", fontSize: 16, marginTop: 10 }}>Where we are and where we are going</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              {
                phase: "Phase 1",
                title: "Marketing & Lead Capture",
                status: "Live",
                statusColor: "#15803d",
                statusBg: "#f0fdf4",
                border: "#bbf7d0",
                items: ["Website launch", "Lead capture forms", "Financial calculator", "Admin dashboard"],
              },
              {
                phase: "Phase 2",
                title: "Platform & Dashboards",
                status: "In Progress",
                statusColor: "#b45309",
                statusBg: "#fef9ee",
                border: "#fde68a",
                items: ["Multi-role login", "SME debt/equity flows", "Partner dashboard", "Investor marketplace"],
              },
              {
                phase: "Phase 3",
                title: "AI & Analytics",
                status: "Upcoming",
                statusColor: "#6b7280",
                statusBg: "#f1f5f9",
                border: "#e2e8f0",
                items: ["AI-powered CAM generation", "Auto lender matching", "CIBIL API integration", "Subscription plans"],
              },
            ].map((p) => (
              <div key={p.phase} style={{ border: `2px solid ${p.border}`, borderRadius: 16, padding: 28, background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" }}>
                  <span style={{ fontWeight: 800, color: NAVY, fontSize: 15 }}>{p.phase}</span>
                  <span style={{ background: p.statusBg, color: p.statusColor, padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{p.status}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 14 }}>{p.title}</h3>
                {p.items.map((item) => (
                  <div key={item} style={{ fontSize: 13, color: "#64748b", padding: "5px 0", display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ color: BLUE, fontWeight: 700 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "64px 5%", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Ready to Work Together?</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>Whether you need a loan, advisory, or partnership — we are here.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" style={{ background: "#fff", color: NAVY, padding: "13px 32px", borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: "none" }}>Contact Us</Link>
          <Link href="/financial-health-check" style={{ background: "transparent", color: "#fff", padding: "13px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", border: "2px solid rgba(255,255,255,0.35)" }}>Free Health Check</Link>
        </div>
      </section>

      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.7)", padding: "36px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 6 }}>BizzBuddy</div>
            <div style={{ fontSize: 12 }}>📍 {FOOTER_CONTACT.address}</div>
          </div>
          <div>
            {FOOTER_CONTACT.phones.map((ph) => (<div key={ph} style={{ fontSize: 13, marginBottom: 6 }}>📞 {ph}</div>))}
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
